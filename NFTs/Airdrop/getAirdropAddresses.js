const Web3 = require('web3');
const ethers = require('ethers');
const axios = require('axios');

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);
let marketplaceAddress = "0x059377c014cfc12DD2612EbfE9cFD1A6FC1A8883";
let projects = [
    {
        name: "Goldzilla",
        address: "0xb8a427267d54c56d6e3763a068d83f6cfd43981e",
        tokenNumber: 26
    },
    {
        name: "Astrozilla",
        address: "0x9e2e3025a26a001d1d3857c70b36dcee82e7608d",
        tokenNumber: 33
    },
    {
        name: "Bobzilla",
        address: "0x74ae2ad6b214bec1a42d3ccd57204c8f9da59924",
        tokenNumber: 33
    },
    {
        name: "Zillarina",
        address: "0xcb58da80df801f000f59cebd9d51f4d50a9bb952",
        tokenNumber: 55
    },
    {
        name: "Firezilla",
        address: "0xb63a79d06ecbf137002832c7bb14266e25446982",
        tokenNumber: 55
    }
];

let baseConfig = {
    address: "",
    "0xb8a427267d54c56d6e3763a068d83f6cfd43981e": 0,
    "0x9e2e3025a26a001d1d3857c70b36dcee82e7608d": 0,
    "0x74ae2ad6b214bec1a42d3ccd57204c8f9da59924": 0,
    "0xcb58da80df801f000f59cebd9d51f4d50a9bb952": 0,
    "0xb63a79d06ecbf137002832c7bb14266e25446982": 0,
}

const contractThetaPunksABI = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
];
let owners = [];

// owners = [
//     {
//         address: '0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57',
//         '0x74767412cfd446dba5994bd9646a5669106246e4': 2,
//         '0xc2c4cb5a9e50590e1e71f378d5fef744176b0459': 3,
//         '0x58bbda670702b8217c7428fe25c28c95a6e3963c': 8,
//         '0x44c9239b1d9562aae04574c97710207e68f74816': 13,
//         '0x5bfcf20d4f141f03ffbbe009b193040cd63083b0': 20
//     },
// ]
let airdrop = []

    async function getAddress() {
    const contractNFTObject = new ethers.Contract(
        projects[0].address,
        contractThetaPunksABI,
        provider
    );
    for(let t = 1; t <= projects[0].tokenNumber; t++) {
        let inOwners = false;
        let address = await contractNFTObject.ownerOf(t);

        for(let o=0; o<owners.length; o++){
            if(owners[o].address.toLowerCase() === address.toLowerCase()){
                owners[o][projects[0].address.toLowerCase()] += 1;
                inOwners = true
            }
        }
        if(!inOwners && address.toLowerCase()!==marketplaceAddress.toLowerCase()) {
            let owner = JSON.parse(JSON.stringify(baseConfig));
            owner.address = address.toLowerCase();
            owner[projects[0].address.toLowerCase()] += 1
            owners.push(owner)
        }
    }

    // Search on marketplace

    let response = await axios.get(`https://open-theta.de/api/projects/${projects[0].address}/nft/on-market/`);
    let marketplaceData = response.data;
    for(let m=0; m<marketplaceData.length; m++) {
        let inOwners = false;

        for(let o=0; o<owners.length; o++){
            if(owners[o].address.toLowerCase() === marketplaceData[m].seller.toLowerCase()){
                owners[o][projects[0].address.toLowerCase()] += 1;
                inOwners = true
            }
        }
        if(!inOwners) {
            let owner = JSON.parse(JSON.stringify(baseConfig));
            owner.address = marketplaceData[m].seller.toLowerCase();
            owner[projects[0].address.toLowerCase()] += 1
            owners.push(owner)
        }
    }

    // Get of first NFT holders the amount of the other NFTs

    for(let o=0; o<owners.length; o++){
        for(let p=1; p<projects.length;p++){
            const contractNFTObject = new ethers.Contract(
                projects[p].address,
                contractThetaPunksABI,
                provider
            );
            owners[o][projects[p].address.toLowerCase()] = (await contractNFTObject.balanceOf(owners[o].address)).toNumber();

        }
    }

    // Search on marketplace

    for(let p=1; p<projects.length;p++) {
        response = await axios.get(`https://open-theta.de/api/projects/${projects[p].address}/nft/on-market/`);
        marketplaceData = response.data;
        for(let m=0; m<marketplaceData.length; m++) {

            for(let o=0; o<owners.length; o++){
                if(owners[o].address.toLowerCase() === marketplaceData[m].seller.toLowerCase()){
                    owners[o][projects[p].address.toLowerCase()] += 1;
                }
            }
        }
    }

    console.log(owners);
    // console.log(owners.length);

    let totalAmount = 0;
    for(let o=0; o<owners.length;o++){
        let airdropAmount = 0;
        for(let c=1;c<=owners[o][projects[0].address]; c++){
            let holding = true;
            for(let p=1; p<projects.length; p++){
                if(owners[o][projects[p].address] > 0){
                    // owners[o][projects[p].address] = 0;
                    owners[o][projects[p].address] -= 1;
                } else{
                    holding = false;
                }
            }
            if(holding === true){
                airdropAmount += 1;
                totalAmount += 1;
                airdrop.push(owners[o].address)
            }
        }
        // if(airdropAmount === 1){
        //     console.log(owners[o].address)
        // }
        console.log(owners[o].address, airdropAmount)
    }
    console.log(totalAmount);

    let count = 0;
    let final = "[";
    for(let i = 0; i < airdrop.length; i++) {
        if(count === 64){
            final = final + "\"" + airdrop[i] + "\"" + "]";
            console.log(final);
            final = "[";
            count = 0;
        } else {
            final = final + "\"" + airdrop[i] + "\",";
            count +=1;
        }
    }
    console.log(final + "]");
    console.log(airdrop.length);


    }


getAddress()