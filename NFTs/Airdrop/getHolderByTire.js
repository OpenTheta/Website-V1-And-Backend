const Web3 = require('web3');
const ethers = require('ethers');
const axios = require('axios');
const fs = require('fs');

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);
let marketplaceAddress = "0xd539558887B6744C52C595Cb24fB9EFA664BA814";
let marketplaceAddress2 = "0x059377c014cfc12DD2612EbfE9cFD1A6FC1A8883";
let marketplaceAddress3 = "0xbb5f35d40132a0478f6aa91e79962e9f752167ea";
let projects = [
    {
        name: "Healthy Meemop",
        address: "0x06b656c87f98ec1aadb2c6ad2fb68a748befc71e",
        tokenNumber: 73
    },
    {
        name: "TFuel Tonic",
        address: "0x358087474325ac1ffa13935c90f468e9fdc31044",
        tokenNumber: 116
    },
    {
        name: "MeemopMania",
        address: "0x38af6ddf4f3f3b044bd0ae1106d6726a011eefd1",
        tokenNumber: 888,
    }

];

let tires = [
    {
        name: "Healthy Meemop",
        address: "0x06b656c87f98ec1aadb2c6ad2fb68a748befc71e",
        tokenNumber: 73,
        addresses: []
    },
    {
        name: "TFuel Tonic",
        address: "0x358087474325ac1ffa13935c90f468e9fdc31044",
        tokenNumber: 116,
        addresses: []
    },
    {
        name: "MeemopMania",
        address: "0x38af6ddf4f3f3b044bd0ae1106d6726a011eefd1",
        tokenNumber: 888,
        addresses: []
    }
]

let baseConfig = {
    address: "",
    "0x06b656c87f98ec1aadb2c6ad2fb68a748befc71e": 0,
    "0x358087474325ac1ffa13935c90f468e9fdc31044": 0,
    "0x38af6ddf4f3f3b044bd0ae1106d6726a011eefd1": 0,
}

const contractThetaPunksABI = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
];
let owners = [];

let airdrop = []

async function getAddress() {
    const contractNFTObject = new ethers.Contract(
        projects[0].address,
        contractThetaPunksABI,
        provider
    );
    for(let t = 0; t <= projects[0].tokenNumber; t++) {
        let inOwners = false;
        try {
            let address = await contractNFTObject.ownerOf(t);

            for(let o=0; o<owners.length; o++){
                if(owners[o].address.toLowerCase() === address.toLowerCase()){
                    owners[o][projects[0].address] += 1;
                    inOwners = true
                }
            }
            if(!inOwners && address!==marketplaceAddress && address!==marketplaceAddress2 && address!==marketplaceAddress3) {
                let owner = JSON.parse(JSON.stringify(baseConfig));
                owner.address = address;
                owner[projects[0].address] += 1
                owners.push(owner)
            }
        } catch {
            console.log("Token Id doesn't exist:", t)
        }

    }

    console.log("test")

    // Search on marketplace

    let response = await axios.get(`http://open-theta.de/api/search/ALL?projects[]=[\"${projects[0].name}\"]`);
    let marketplaceData = response.data;
    for(let m=0; m<marketplaceData.length; m++) {
        let inOwners = false;
        if(marketplaceData[m].marketAddress === marketplaceAddress3) {
            for(let o=0; o<owners.length; o++){
                if(owners[o].address.toLowerCase() === marketplaceData[m].seller.toLowerCase()){
                    owners[o][projects[0].address] += 1;
                    inOwners = true
                }
            }
            if(!inOwners) {
                let owner = JSON.parse(JSON.stringify(baseConfig));
                owner.address = marketplaceData[m].seller;
                owner[projects[0].address] += 1
                owners.push(owner)
            }
        }
    }

    // console.log(owners)
    // select by tire
    for(let t=0; t<tires.length; t++){
        for(let o=0; o<owners.length; o++){
            for(let p=0; p<projects.length;p++){
                // while (owners[o][projects[p].address] > tires[t].tokenNumber) {
                //     tires[t].addresses.push(owners[o].address)
                //     owners[o][projects[p].address] -= tires[t].tokenNumber
                // }
                if (owners[o][projects[p].address] >= tires[t].tokenNumber) {
                    tires[t].addresses.push(owners[o].address)
                    // owners[o][projects[p].address] -= tires[t].tokenNumber
                }
            }
        }
    }

    console.log(tires[0].addresses)
    console.log(tires[0].addresses.length)

    fs.writeFile("logs.json", JSON.stringify(owners), function(err) {
        if (err) {
            console.log(err);
        }
    });
    fs.writeFile("logsFinal1.json", JSON.stringify(tires[0].addresses), function(err) {
        if (err) {
            console.log(err);
        }
    });
    // Get of first NFT holders the amount of the other NFTs

    for(let o=0; o<owners.length; o++){
        for(let p=1; p<projects.length;p++){
            const contractNFTObject = new ethers.Contract(
                projects[p].address,
                contractThetaPunksABI,
                provider
            );
            owners[o][projects[p].address] = (await contractNFTObject.balanceOf(owners[o].address)).toNumber();

        }
    }

    // Search on marketplace

    for(let p=1; p<projects.length;p++) {
        response = await axios.get(`http://opentheta.de/api/search/ALL?projects[]=[\"${projects[p].name}\"]`);
        marketplaceData = response.data;
        for(let m=0; m<marketplaceData.length; m++) {
            if (marketplaceData[m].marketAddress === marketplaceAddress3) {
                for (let o = 0; o < owners.length; o++) {
                    if (owners[o].address === marketplaceData[m].seller) {
                        owners[o][projects[p].address] += 1;
                    }
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
        console.log(owners[o].address, airdropAmount)
    }
    console.log(totalAmount);

    let count = 0;
    let final = "[";
    for(let i = 0; i < tires.length; i++) {
        if(count === 60){
            final = final + "\"" + tires[i] + "\"" + "]";
            console.log(final);
            final = "[";
            count = 0;
        } else {
            final = final + "\"" + tires[i] + "\",";
            count +=1;
        }
    }
    console.log(final.toString() + "]");
    console.log(tires.length);
    let total = 0
    for(let i=0; i<owners.length; i++){
        total += owners[i][projects[0].address]
    }
    console.log(total)
}


getAddress()