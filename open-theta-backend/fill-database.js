const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');
const projects = require("./models/dbHelpers");

async function addNFT(nft) {
    // console.log(nft)
    await projects.addNFT(nft).catch((error) => {
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

async function checkNFT(itemId) {
    let res = await projects.checkItemId(itemId);
    return res.length;
}


const address = "0xd539558887b6744c52c595cb24fb9efa664ba814";
const baseUrl = "https://explorer.thetatoken.org:8443/api/accounttx/" + address +"?type=-1&pageNumber=";
const addUrl = "&limitNumber=20&isEqualType=true&types=[%227%22]";

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);

let topicItemCreated = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");
let topicItemSold = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");

const tokenABI = [
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
];

let blocks = [];

async function addItem(itemId, contract, tokenId, seller, owner, category, price, isSold, timestamp){
    // console.log("Add item:",  itemId[0].toNumber());
    const contractNFTObject = new ethers.Contract(
        contract[0],
        tokenABI,
        provider
    );
    let URI = await contractNFTObject.tokenURI(tokenId[0].toNumber()).catch(error => {
        console.log(error);
        console.log("Error with getting token URI from contract");
    });

    if (URI.slice(0,4) === 'ipfs') {
        console.log()
        URI = 'https://ipfs.io/ipfs/' + URI.substring(7)
        console.log(URI)
    }
    console.log(URI)
    let timeout = true
    let metadata
    while(timeout){
        timeout = false
        metadata = await axios.get(URI, {timeout: 2000}).catch(error => {
            timeout = true
            console.log(error);
            console.log("Error with getting token URI");
        });
    }
    console.log("Add item:",  itemId[0].toNumber());

    if (metadata.data.image.slice(0,4) === 'ipfs') {
        metadata.data.image = 'https://ipfs.io/ipfs/' + metadata.data.image.substring(7)
    }

    // console.log("Add item:",  itemId[0].toNumber());
    let nft = {
        itemId: itemId[0].toNumber(),
        nftContract: contract[0].toLowerCase(),
        tokenId: tokenId[0].toNumber(),
        seller: seller.toLowerCase(),
        owner: owner.toLowerCase(),
        category: category,
        price: price.toString(),
        isSold: isSold,
        createdTimestamp: timestamp,

        name: metadata.data.name,
        imgUrl: metadata.data.image,
        description: metadata.data.description,
    };
    addNFT(nft).catch(error => {
        console.log("Error Adding item");
    });
}

async function updateItem(price, itemId, owner, isSold, timestamp) {
    if (price.toString() === '0') {
        console.log("delete item:",  itemId[0].toNumber());
        deleteNFT(itemId[0].toNumber()).catch(error => {
            console.log("Error deleting item");
        });
    } else {
        console.log("update item:",  itemId[0].toNumber());
        let nft = {
            itemId: itemId[0].toNumber(),
            owner: owner.toLowerCase(),
            isSold: isSold,
            soldTimestamp: timestamp,
        }
        updateNFT(nft).catch(error => {
            console.log("Error updating item");
        });
    }
}

async function fillDatabase(){
    console.log("fill Database")
    for( let i=0; i<blocks.length; i++) {
        console.log("Block:", blocks[i])
        for (let j = 0; j <= 1; j++) {
            let filterItem;
            if (j) {
                filterItem = {
                    address: address,
                    topics: [topicItemCreated],
                    fromBlock: blocks[i].block,
                    toBlock: blocks[i].block,
                };
            } else {
                filterItem = {
                    address: address,
                    topics: [topicItemSold],
                    fromBlock: blocks[i].block,
                    toBlock: blocks[i].block,
                };
            }

            let logs = await provider.getLogs(filterItem).catch(error => {
                console.log("ERROR");
                console.log(error);
            });

            for (let l = 0; l < logs.length; l++) {
                let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address", "address", "string", "uint256", "bool"], logs[l].data);
                let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[l].topics[1]);
                let contract = ethers.utils.defaultAbiCoder.decode(["address"], logs[l].topics[2]);
                let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[l].topics[3]);
                let check = await checkNFT(itemId[0].toNumber())
                if (j) {
                    if(check === 0) {
                        await addItem(itemId, contract, tokenId, seller, owner, category, price, isSold, blocks[i].timestamp);
                    }
                } else {
                    if(check === 1) {
                        await updateItem(price, itemId, owner, isSold, blocks[i].timestamp);
                    }
                }
            }
        }
    }
}

async function getPage(totalNumber) {
    for(let i=totalNumber; i>0; i--){
        // console.log(i)
        let response = await axios.get(baseUrl+i.toString()+addUrl);
        for( let i=response.data.body.length-1; i>=0; i--) {
            let block = parseInt(response.data.body[i].block_height, 10);
            let data = {
                block: block,
                timestamp: response.data.body[i].timestamp
            }
            blocks.push(data);
        }
    }
    console.log(blocks.length, blocks[0], blocks[blocks.length-1])
    axios.get(baseUrl+"1"+addUrl).then(response => {
        console.log(totalNumber, response.data.totalPageNumber)
        if(totalNumber === response.data.totalPageNumber){
            fillDatabase()
        }
    })
}


axios.get(baseUrl+"1"+addUrl, {timeout: 2000}).then(response => {
    getPage(response.data.totalPageNumber)
});


// let filterItemCreated = {
//     address: address,
//     topics: [ topicItemCreated ],
//     fromBlock: block-1,
//     toBlock: block+1,
// };
// // block = block + 5000;
// let logPromise = provider.getLogs(filterItemCreated);
// logPromise.then(function(logs) {
//     console.log(logs);
//     let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], logs[0].data);
//     let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[0].topics[1]);
//     let contract = ethers.utils.defaultAbiCoder.decode(["address"], logs[0].topics[2]);
//     let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[0].topics[3]);
//     let nft = {
//         itemId: itemId[0].toNumber(),
//         nftContract: contract[0],
//         tokenId: tokenId[0].toNumber(),
//         seller: seller,
//         owner: owner,
//         category: category,
//         price: price.toString(),
//         isSold: isSold,
//         createdTimestamp: response.data.body[15].timestamp,
//     };
//     console.log("Add item");
//     console.log(nft);
// }).catch(error => {
//     console.log("ERROR");
//     console.log(error);
// });

// let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
// let provider = new ethers.providers.Web3Provider(currentProvider);
//
// const address = '0xd539558887b6744c52c595cb24fb9efa664ba814' // Your account address goes here
//
// let topicItemCreated = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");
// let topicItemSold = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");
//
// let block = 12995343;
// // while(block<12995344) {
//     let filterItemCreated = {
//         address: address,
//         topics: [ topicItemCreated ],
//         fromBlock: 12762465,
//         toBlock: 12762468,
//     };
//     // block = block + 5000;
//     let logPromise = provider.getLogs(filterItemCreated);
//     logPromise.then(function(logs) {
//         console.log(logs);
//         let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], logs[0].data);
//         let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[0].topics[1]);
//         let contract = ethers.utils.defaultAbiCoder.decode(["address"], logs[0].topics[2]);
//         let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[0].topics[3]);
//         let nft = {
//             itemId: itemId[0].toNumber(),
//             nftContract: contract[0],
//             tokenId: tokenId[0].toNumber(),
//             seller: seller,
//             owner: owner,
//             category: category,
//             price: price.toString(),
//             isSold: isSold,
//             createdTimestamp: Date.now().toString(),
//         };
//         console.log("Add item");
//         console.log(nft);
//     }).catch(error => {
//         console.log("ERROR");
//         console.log(error);
//     });
// // }
//
//
// let filterItemSold = {
//     address: address,
//     topics: [ topicItemSold ],
//     fromBlock: 11023994
// };
// console.log('end');


// provider.on(filterItemCreated, (result) => {
//     let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], result.data);
//     let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[1.json]);
//     let contract = ethers.utils.defaultAbiCoder.decode(["address"], result.topics[2.json]);
//     let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[3.json]);
//     let nft = {
//         itemId: itemId[0.json].toNumber(),
//         nftContract: contract[0.json],
//         tokenId: tokenId[0.json].toNumber(),
//         seller: seller,
//         owner: owner,
//         category: category,
//         price: price.toString(),
//         isSold: isSold,
//         createdTimestamp: Date.now().toString(),
//     };
//     console.log("Add item");
//     console.log(nft);
//     // addNFT(nft);
// });

// provider.on(filterItemSold, (result) => {
//     let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], result.data);
//     let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[1.json]);
//     let contract = ethers.utils.defaultAbiCoder.decode(["address"], result.topics[2.json]);
//     let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[3.json]);
//     if (price.toString() === '0.json'){
//         console.log("Delete item", itemId[0.json].toNumber());
//         // deleteNFT(itemId[0.json].toNumber());
//     } else {
//         let nft = {
//             itemId: itemId[0.json].toNumber(),
//             nftContract: contract[0.json],
//             tokenId: tokenId[0.json].toNumber( ),
//             seller: seller,
//             owner: owner,
//             category: category,
//             price: price.toString(),
//             isSold: isSold,
//             soldTimestamp: Date.now().toString(),
//         }
//         console.log("Update item");
//         console.log(nft);
//         // updateNFT(nft);
//     }
// });