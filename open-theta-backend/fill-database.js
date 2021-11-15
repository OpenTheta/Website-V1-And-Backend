const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');


const address = "0xd539558887b6744c52c595cb24fb9efa664ba814";
const baseUrl = "https://explorer.thetatoken.org:8443/api/accounttx/" + address +"?type=-1&pageNumber=";
const addUrl = "&limitNumber=100&isEqualType=true&types=[%227%22]";

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);

let topicItemCreated = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");
let topicItemSold = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");

axios.get(baseUrl+"1"+addUrl).then(response => {
    let block = parseInt(response.data.body[15].block_height, 10);
        let filterItemCreated = {
        address: address,
        topics: [ topicItemCreated ],
        fromBlock: block,
        toBlock: block,
    };
    // block = block + 5000;
    let logPromise = provider.getLogs(filterItemCreated);
    logPromise.then(function(logs) {
        console.log(logs);
        let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], logs[0].data);
        let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[0].topics[1]);
        let contract = ethers.utils.defaultAbiCoder.decode(["address"], logs[0].topics[2]);
        let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], logs[0].topics[3]);
        let nft = {
            itemId: itemId[0].toNumber(),
            nftContract: contract[0],
            tokenId: tokenId[0].toNumber(),
            seller: seller,
            owner: owner,
            category: category,
            price: price.toString(),
            isSold: isSold,
            createdTimestamp: response.data.body[15].timestamp,
        };
        console.log("Add item");
        console.log(nft);
    }).catch(error => {
        console.log("ERROR");
        console.log(error);
    });
});

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