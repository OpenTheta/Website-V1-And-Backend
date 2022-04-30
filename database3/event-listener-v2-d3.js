const projects = require("./models/dbHelpers3");

async function addNFT(nft) {
    // console.log(nft)
    let x = await projects.addNFT(nft).catch((error) => {
        console.log(error);
    });
    // console.log(x)
}

async function updateNFT(nft) {
    await projects.updateNFT(nft.itemId, nft);
}

async function deleteNFT(itemId) {
    await projects.deleteNFT(itemId);
}


const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');
const gr = require('graphql-request')
const { request, gql } = gr

// let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc');
let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);

const address = '0xbb5f35d40132a0478f6aa91e79962e9f752167ea' // Mainnet
// const address = '0x02209a3fda3a7ed321f0c9f7658818278b21d7a2' // Testnet

const tokenABI = [
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
];

let topicItemCreated = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");
let topicItemSold = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");
let topicItemUpdate = ethers.utils.id("MarketItemUpdated(uint256,address,uint256,address,address,string,uint256,bool)");

let filterItemCreated = {
    address: address,
    topics: [ topicItemCreated ]
};

let filterItemSold = {
    address: address,
    topics: [ topicItemSold ]
};

let filterItemUpdated = {
    address: address,
    topics: [ topicItemUpdate ]
};

const events = {
    sale: 1,
    create: 2,
    update: 3
};

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function dataProcessing(eventData, event) {

    if(event === events.create){
        // get data from event
        let [tokenId, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["uint256","address","string","uint256","bool"], eventData.data);
        let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], eventData.topics[1]);
        let contract = ethers.utils.defaultAbiCoder.decode(["address"], eventData.topics[2]);
        let seller = ethers.utils.defaultAbiCoder.decode(["address"], eventData.topics[3]);

        if(contract[0].toLowerCase() === "0xbb4d339a7517c81c32a01221ba51cbd5d3461a94"){
            // let labelHash = ethers.BigNumber.from(tokenId).toHexString()
            // const url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
            // const GET_LABEL_NAME = gql`
            //     query{
            //         domains(first:1, where:{labelhash:"${labelHash}"}){
            //             labelName
            //         }
            //     }`
            let count = 0
            let timeout = true
            let tnsName
            while(timeout){
                timeout = false
                let tnsResponse
                let url = 'https://opentheta.de/tns/' + tokenId.toString()
                tnsResponse = await axios.get(url).catch(error => {
                    count += 1
                    if(count < 30){
                        timeout = true
                    } else {
                        return;
                    }
                    console.log("Error with getting TNS name of Token from OpenTheta.de");
                });
                if(!tnsResponse) {
                    tnsResponse = await axios.get("https://thetaboard.io/tns-token-ids/" + tokenId.toString()).catch(() => {
                        console.log("Error with getting TNS from Thetaboard")
                    });
                    if(tnsResponse) {
                        tnsName = tnsResponse.data.data.attributes.name
                    }
                    // else {
                        // tnsResponse = await request(url, GET_LABEL_NAME).catch(error => {
                        //     timeout = true
                        //     console.log("Error with getting TNS name of Token");
                        // });
                        //
                    // }
                    if(tnsName) timeout = false
                } else {
                    tnsName = tnsResponse.data
                }

                if(timeout) {
                    await Sleep(500);
                }
            }
            // console.log(tnsName.domains[0].labelName)
            if(!tnsName) return;
            let nft = {
                itemId: itemId[0].toNumber(),
                nftContract: contract[0].toLowerCase(),
                tokenId: -1,
                seller: seller[0].toLowerCase(),
                owner: owner,
                category: category,
                price: price.toString(),
                isSold: isSold,
                createdTimestamp: Date.now(),
                name: tnsName,
                imgUrl: "https://open-theta.de/api/images/creators/TNS.jpg",
                description: tokenId.toString(),
                marketAddress: address,
            };
            addNFT(nft);
            return
        }

        const contractNFTObject = new ethers.Contract(
            contract[0],
            tokenABI,
            provider
        );
        let count = 0
        let timeout = true
        let URI;
        while(timeout){
            timeout = false
             URI = await contractNFTObject.tokenURI(tokenId.toNumber()).catch(error => {
                 count += 1
                 if(count < 30){
                     timeout = true
                 } else {
                     return;
                 }
                console.log("Error with getting token URI from contract");
            });
            if(timeout) {
                await Sleep(500);
            }
        }

        if (URI.slice(0,4) === 'ipfs') {
            URI = 'https://ipfs.io/ipfs/' + URI.substring(7)
        }
        count = 0
        timeout = true
        let metadata
        while(timeout){
            timeout = false
            metadata = await axios.get(URI, {timeout: 3000}).catch(error => {
                count += 1
                if(count < 20){
                    timeout = true
                } else {
                    return;
                }
                console.log("Error with getting token Metadata from URI");
            });
            if(timeout) {
                await Sleep(500);
            }
        }

        if (metadata.data.image.slice(0,4) === 'ipfs') {
            metadata.data.image = 'https://ipfs.io/ipfs/' + metadata.data.image.substring(7)
        }
        let nft = {
            itemId: itemId[0].toNumber(),
            nftContract: contract[0].toLowerCase(),
            tokenId: tokenId.toNumber(),
            seller: seller[0].toLowerCase(),
            owner: owner,
            category: category,
            price: price.toString(),
            isSold: isSold,
            createdTimestamp: Date.now(),
            name: metadata.data.name,
            imgUrl: metadata.data.image,
            description: metadata.data.description,
            marketAddress: address,
        };
        console.log(nft)
        addNFT(nft);
    }
    else if(event === events.sale) {
        // get data from event
        let [nftContract, tokenId, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","uint256","string","uint256","bool"], eventData.data);
        let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], eventData.topics[1]);
        let owner = ethers.utils.defaultAbiCoder.decode(["address"], eventData.topics[3]);
        // console.log(isSold, price, itemId[0], owner[0])
        if (price.toString() === '0'){
            deleteNFT(itemId[0].toNumber()).catch(error => {
                console.log("Error deleting item");
            });
        } else {
            let nft = {
                itemId: itemId[0].toNumber(),
                owner: owner[0].toLowerCase(),
                isSold: isSold,
                soldTimestamp: Date.now(),
            }
            updateNFT(nft).catch(error => {
                console.log("Error updating item (Sale)");
            });
        }
    }
    else if(event === events.update) {

        let [tokenId, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["uint256","address","string","uint256","bool"], eventData.data);
        let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], eventData.topics[1]);
        // console.log(itemId[0], price)
        let nft = {
            itemId: itemId[0].toNumber(),
            price: price.toString(),
        }
        updateNFT(nft).catch(error => {
            console.log(error)
            console.log("Error updating item (Update)");
        });
    }


}


provider.on(filterItemCreated, (result) => {
    dataProcessing(result, events.create).catch(() => {
        console.log('Error creating item');
    });
});

provider.on(filterItemSold, (result) => {
    dataProcessing(result, events.sale).catch(() => {
        console.log('Error updating item');
    });
});

provider.on(filterItemUpdated, (result) => {
    dataProcessing(result, events.update).catch(() => {
        console.log('Error updating item');
    });
});
