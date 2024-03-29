const projects = require("./models/dbHelpers");

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

// let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc');
let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);

const address = '0xd539558887b6744c52c595cb24fb9efa664ba814' // Mainnet
// const address = '0x8823b2e45fd716c395230500d9668816c141e1ce' // Testnet

const tokenABI = [
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
];

let topicItemCreated = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");
let topicItemSold = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");

let filterItemCreated = {
    address: address,
    topics: [ topicItemCreated ]
};

let filterItemSold = {
    address: address,
    topics: [ topicItemSold ]
};

const events = {
    sale: 1,
    create: 2,
};

async function dataProcessing(eventData, event) {
    console.log(eventData, event)
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

        contractNFTObject.tokenURI(tokenId[0].toNumber()).then(URI => {
            console.log(tokenId[0].toNumber(), URI)
            if (URI.slice(0,4) === 'ipfs') {
                console.log()
                URI = 'https://ipfs.io/ipfs/' + URI.substring(7)
                console.log(URI)
            }
            axios.get(URI).then(response => {
                if (response.data.image.slice(0,4) === 'ipfs') {
                    response.data.image = 'https://ipfs.io/ipfs/' + response.data.image.substring(7)
                }
                let nft = {
                    itemId: itemId[0].toNumber(),
                    nftContract: contract[0].toLowerCase(),
                    tokenId: tokenId[0].toNumber(),
                    seller: seller,
                    owner: owner,
                    category: category,
                    price: price.toString(),
                    isSold: isSold,
                    createdTimestamp: Date.now(),
                    name: response.data.name,
                    imgUrl: response.data.image,
                    description: response.data.description,
                };
                addNFT(nft);
            }).catch(error => {
                console.log(error);
                console.log("Error with getting token URI");
            });
        }).catch(error => {
            console.log(error);
            console.log("Error with getting token URI from contract");
        });
    } else {
        if (price.toString() === '0'){
            deleteNFT(itemId[0].toNumber()).catch(error => {
                console.log("Error deleting item");
            });
        } else {
            let nft = {
                itemId: itemId[0].toNumber(),
                owner: owner,
                isSold: isSold,
                soldTimestamp: Date.now(),
            }
            updateNFT(nft).catch(error => {
                console.log("Error updating item");
            });
        }
    }



}


provider.on(filterItemCreated, (result) => {
    dataProcessing(result, events.create).catch(() => {
        console.log('Error creating item');
    });
});

provider.on(filterItemSold, (result) => {
    dataProcessing(result, events.sale).catch(() => {
        console.log('Error creating item');
    });
});

// provider.on(filterItemCreated, (result) => {
//     let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], result.data);
//     let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[1.json]);
//     let contract = ethers.utils.defaultAbiCoder.decode(["address"], result.topics[2.json]);
//     let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[3.json]);
//
//     const contractNFTObject = new ethers.Contract(
//         contract[0.json],
//         tokenABI,
//         provider
//     );
//     contractNFTObject.tokenURI(tokenId[0.json].toNumber()).then(URI => {
//         axios.get(URI).then(response => {
//             let nft = {
//                 itemId: itemId[0.json].toNumber(),
//                 nftContract: contract[0.json].toLowerCase(),
//                 tokenId: tokenId[0.json].toNumber(),
//                 seller: seller,
//                 owner: owner,
//                 category: category,
//                 price: price.toString(),
//                 isSold: isSold,
//                 createdTimestamp: Date.now().toString(),
//                 name: response.data.name,
//                 imgUrl: response.data.image,
//                 description: response.data.description,
//             };
//             console.log("Add item");
//             console.log(nft);
//             addNFT(nft);
//         }).catch(error => {
//             console.log(error);
//             console.log("Error with getting token URI");
//         });
//     }).catch(error => {
//         console.log(error);
//         console.log("Error with getting token URI from contract");
//     });
//
//
// });
//
// provider.on(filterItemSold, (result) => {
//     let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], result.data);
//     let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[1.json]);
//     let contract = ethers.utils.defaultAbiCoder.decode(["address"], result.topics[2.json]);
//     let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[3.json]);
//     if (price.toString() === '0.json'){
//         console.log("Delete item", itemId[0.json].toNumber());
//         deleteNFT(itemId[0.json].toNumber());
//     } else {
//         let nft = {
//             itemId: itemId[0.json].toNumber(),
//             isSold: isSold,
//             soldTimestamp: Date.now().toString(),
//         }
//         console.log("Update item");
//         console.log(nft);
//         console.log(itemId[0.json].toNumber());
//         updateNFT(nft);
//     }
// });

// 3050,0xE42AC9Ff693d32e03732F1A4A96a916E792e39d9,241,0xF5793B348bA3BE64E6AC087e9c229DbBFC72f7Ac,0x0000000000000000000000000000000000000000,GODS,20000000000000000000000,false,3051,0xE42AC9Ff693d32e03732F1A4A96a916E792e39d9,202,0xc16EdA8352C7C9Dd16F9e2eb5f4Ca6Aa065bd4C9,0x0000000000000000000000000000000000000000,GODS,6000000000000000000000,false,3053,0xE42AC9Ff693d32e03732F1A4A96a916E792e39d9,549,0x16EEe09c1555aF67A3CD7DE2076D3f3C32Ebe8Aa,0x0000000000000000000000000000000000000000,GODS,4500000000000000000000,false,3064,0xE42AC9Ff693d32e03732F1A4A96a916E792e39d9,377,0x07C16eEb5afe9F1feb8dDdCf56f33ba54182a28A,0x0000000000000000000000000000000000000000,GODS,888000000000000000000,false