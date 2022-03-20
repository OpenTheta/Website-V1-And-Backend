const Web3 = require('web3');
const ethers = require('ethers');
const axios = require('axios');

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);
let marketplaceAddresses = ["0x059377c014cfc12dd2612ebfe9cfd1a6fc1a8883", "0xbb5f35d40132a0478f6aa91e79962e9f752167ea","0xd539558887b6744c52c595cb24fb9efa664ba814"];

let owners = [];
let uniqueOwners = []
let traits = []
let traitOwners = []

const contractNFTABI = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
    "function tokenByIndex(uint256 _index) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
];

// Parameters to set
let tokenAddress = "0xc357a28c0285f6c45a7ff7e8c4cc92fad0b34114"
let uniqueAddresses = true
let disableMarketplaceCheck = false
let addressesPerArray = 40

async function getAddresses() {

    owners = []
    uniqueOwners = []
    const contractNFTObject = new ethers.Contract(
        tokenAddress,
        contractNFTABI,
        provider
    );

    let tokenAmount = await contractNFTObject.totalSupply()

    let awaitCounter = 100;
    let promisesTokenByIndex = []
    let promisesOwnerOf = []
    for(let i=0; i<tokenAmount; i++) {
        promisesTokenByIndex.push(contractNFTObject.tokenByIndex(i))
        if(awaitCounter===0 || i===tokenAmount-1){
            awaitCounter=100
            let tokenIds = await Promise.all(promisesTokenByIndex).catch(e =>{
                console.log("Error getting tokenByIndex", e)
                return;

            });
            promisesTokenByIndex = []
            for(let j=0; j<tokenIds.length; j++) {
                promisesOwnerOf.push(contractNFTObject.ownerOf(tokenIds[j]))
            }
            let addresses = await Promise.all(promisesOwnerOf).catch(e =>{
                console.log("Error getting token owner", e)
                return;
            });
            promisesOwnerOf = []
            for(let j=0; j<addresses.length; j++) {
                if(addresses[j].toLowerCase()!==marketplaceAddresses[0] && addresses[j].toLowerCase()!==marketplaceAddresses[1] && addresses[j].toLowerCase()!==marketplaceAddresses[2]) {
                    owners.push({"address": addresses[j], "tokenId": tokenIds[j].toNumber()})
                }
            }
        }
        awaitCounter--;
    }

    // Search on marketplace
    if(!disableMarketplaceCheck) {
        let response = await axios.get(`https://open-theta.de/api/projects/${tokenAddress.toLowerCase()}/nft/on-market/`);
        let marketplaceData = response.data;
        for(let m=0; m<marketplaceData.length; m++) {
            let address = marketplaceData[m].seller;
            let tokenId = marketplaceData[m].tokenId
            owners.push({"address": address, "tokenId": tokenId});
        }
    }

    if(uniqueAddresses) {
        getUniqueAddresses()
    }
}

function getUniqueAddresses() {
    uniqueOwners = []
    for(let i=0; i<owners.length; i++) {
        let isUnique = true;
        for(let j=0; j<uniqueOwners.length; j++) {
            if(owners[i].address.toLowerCase() === uniqueOwners[j].address.toLowerCase()) {
                isUnique = false
                uniqueOwners[j].tokenAmount += 1
            }
        }
        if(isUnique){
            uniqueOwners.push({"address": owners[i].address, "tokenAmount": 1})
        }
    }
    display(uniqueOwners)
}

function addTraitType(traitType, value) {
    traits.push({"trait_type": traitType, "value": value});
}

function resetTraits() {
    traits = []
}

async function lookupTraits(projectAddress) {
    traitOwners = []
    if(traits.length && owners.length){
        const contractNFTObject = new ethers.Contract(
            projectAddress,
            contractNFTABI,
            provider
        );
        let tokenAmount = owners.length

        let awaitCounter = 100;
        let promisesTokenURIs = []
        let tempOwners = []
        for(let i=0; i<tokenAmount; i++) {
            tempOwners.push(owners[i])
            promisesTokenURIs.push(contractNFTObject.tokenURI(owners[i].tokenId))
            if(awaitCounter===0 || i===tokenAmount-1){
                awaitCounter=100
                let URIs = await Promise.all(promisesTokenURIs).catch(e =>{
                    console.log("Error getting TokenURI", e)
                    return;
                });
                promisesTokenURIs = []
                let promisesMetadata = []
                for(let j=0; j<URIs.length; j++) {
                    promisesMetadata.push(axios.get(URIs[j]))
                }
                let metadata = await Promise.all(promisesMetadata).catch(e =>{
                    console.log("Error getting token owner", e)
                    return;
                });
                for(let j=0; j<metadata.length; j++){
                    let traitCount = 0
                    for(let t=0; t < traits.length; t++) {
                        if (metadata[j].data.attributes.some(attr => attr.trait_type === traits[t].trait_type && attr.value === traits[t].value)) {
                            traitCount += 1
                        }
                    }

                    if(traitCount === traits.length){
                        traitOwners.push({"address": tempOwners[j].address, "tokenId": tempOwners[j].tokenId})
                    }
                }
                tempOwners = []
            }
            awaitCounter--;
        }
        display(traitOwners)
    }
}

function display(owners) {
    console.log(owners.length)
    let final = "[";

    let totalCount = 0
    let count = 1;
    for(let i = 0; i < owners.length; i++) {
        if(count === addressesPerArray || totalCount === owners.length-1){
            final = final + "\"" + owners[i].address + "\"" + "] \n\n";
            console.log(final);
            final = "[";
            count = 1;
            totalCount += 1
        } else {
            final = final + "\"" + owners[i].address + "\",";
            count +=1;
            totalCount += 1
        }
    }
    console.log(final + "]");
}

function main() {
    getAddresses().then(()=>{

    })
}

main()