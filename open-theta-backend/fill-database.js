const ethers = require('ethers');
const Web3 = require('web3');


let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);

const address = '0x8823b2e45fd716c395230500d9668816c141e1ce' // Your account address goes here

let topicItemCreated = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");
let topicItemSold = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");

let block = 12995343;
// while(block<12995344) {
    let filterItemCreated = {
        address: address,
        topics: [ topicItemCreated ],
        fromBlock: 12995342,
        toBlock: 12995345,
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
            createdTimestamp: Date.now().toString(),
        };
        console.log("Add item");
        console.log(nft);
    }).catch(error => {
        console.log("ERROR");
        console.log(error);
    });
// }


let filterItemSold = {
    address: address,
    topics: [ topicItemSold ],
    fromBlock: 11023994
};
console.log('end');


// provider.on(filterItemCreated, (result) => {
//     let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address","address","string","uint256","bool"], result.data);
//     let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[1]);
//     let contract = ethers.utils.defaultAbiCoder.decode(["address"], result.topics[2]);
//     let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[3]);
//     let nft = {
//         itemId: itemId[0].toNumber(),
//         nftContract: contract[0],
//         tokenId: tokenId[0].toNumber(),
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
//     let itemId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[1]);
//     let contract = ethers.utils.defaultAbiCoder.decode(["address"], result.topics[2]);
//     let tokenId = ethers.utils.defaultAbiCoder.decode(["uint256"], result.topics[3]);
//     if (price.toString() === '0'){
//         console.log("Delete item", itemId[0].toNumber());
//         // deleteNFT(itemId[0].toNumber());
//     } else {
//         let nft = {
//             itemId: itemId[0].toNumber(),
//             nftContract: contract[0],
//             tokenId: tokenId[0].toNumber( ),
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