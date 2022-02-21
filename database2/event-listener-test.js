const projects = require("./models/dbHelpers2");

async function addNFT(nft) {
    console.log(nft)
    let x = await projects.addNFT(nft).catch((error) => {
        console.log(error);
    });
    console.log(x)
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

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc');
// let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);

// const address = '0xd539558887b6744c52c595cb24fb9efa664ba814' // Mainnet
const address = '0x8743bdae340f2c3757f2f98ab2d5ec54bee7f92a' // Testnet

const tokenABI = [
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
];

let topicItemCreated = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");
let topicItemSold = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");
let topicSplitFee = ethers.utils.id("FeeSplit(uint256, address, uint256, address)");

let filterItemCreated = {
    address: address,
    topics: [ topicItemCreated ]
};

let filterItemSold = {
    address: address,
    topics: [ topicItemSold ]
};

let filterSplitFee = {
    address: address,
    topics: [ topicSplitFee ]
};

const events = {
    sale: 1,
    create: 2,
};

async function dataProcessing(eventData, event) {
    // get data from event
    let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], eventData.data);
    let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], eventData.topics[1]);
    let contract = ethers.utils.defaultAbiCoder.decode(["address"], eventData.topics[2]);
    let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], eventData.topics[3]);

    if(event === events.create){
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
             URI = await contractNFTObject.tokenURI(tokenId[0].toNumber()).catch(error => {
                 count += 1
                 if(count < 10){
                     timeout = true
                 } else {
                     return;
                 }
                console.log("Error with getting token URI from contract");
            });
        }

        if (URI.slice(0,4) === 'ipfs') {
            console.log()
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
        }

        if (metadata.data.image.slice(0,4) === 'ipfs') {
            metadata.data.image = 'https://ipfs.io/ipfs/' + metadata.data.image.substring(7)
        }
        let nft = {
            itemId: itemId[0].toNumber(),
            nftContract: contract[0].toLowerCase(),
            tokenId: tokenId[0].toNumber(),
            seller: seller.toLowerCase(),
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
        addNFT(nft);
    } else {
        if (price.toString() === '0'){
            deleteNFT(itemId[0].toNumber()).catch(error => {
                console.log("Error deleting item");
            });
        } else {
            let nft = {
                itemId: itemId[0].toNumber(),
                owner: owner.toLowerCase(),
                isSold: isSold,
                soldTimestamp: Date.now(),
            }
            updateNFT(nft).catch(error => {
                console.log("Error updating item");
            });
        }
    }



}

provider.on(filterSplitFee, (result) => {
    console.log("split fee")
    let [userPayout, userAddress, ownerPayout, ownerAddress] = ethers.utils.defaultAbiCoder.decode(["uint256","address","uint256","address"], result.data);
    console.log(userPayout, userAddress, ownerPayout, ownerAddress)
});

provider.on(filterItemCreated, (result) => {
    dataProcessing(result, events.create).catch(() => {
        console.log('Error creating item');
    });
});

provider.on(filterItemSold, (result) => {
    console.log("sell")
    dataProcessing(result, events.sale).catch(() => {
        console.log('Error updating item');
    });
});
