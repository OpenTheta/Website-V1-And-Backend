const projects = require("./models/dbHelpers3");
const ethers = require("ethers");

// jsonAbi = `[
//     {
//         "inputs": [],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "userPayout",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "userAddress",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "ownerPayout",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "ownerAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "FeeSplit",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "itemId",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "nftContract",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "seller",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "category",
//                 "type": "string"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "price",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "bool",
//                 "name": "isSold",
//                 "type": "bool"
//             }
//         ],
//         "name": "MarketItemCreated",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "itemId",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "nftContract",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "seller",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "category",
//                 "type": "string"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "price",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "bool",
//                 "name": "isSold",
//                 "type": "bool"
//             }
//         ],
//         "name": "MarketItemSale",
//         "type": "event"
//     },
//     {
//         "stateMutability": "payable",
//         "type": "fallback"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "nftContract",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "itemId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "createMarketCancel",
//         "outputs": [],
//         "stateMutability": "payable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "nftContract",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "price",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "string",
//                 "name": "category",
//                 "type": "string"
//             }
//         ],
//         "name": "createMarketItem",
//         "outputs": [],
//         "stateMutability": "payable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "nftContract",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "itemId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "createMarketSale",
//         "outputs": [],
//         "stateMutability": "payable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "fetchCreateNFTs",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "uint256",
//                         "name": "itemId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address",
//                         "name": "nftContract",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "seller",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "owner",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "category",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "price",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "bool",
//                         "name": "isSold",
//                         "type": "bool"
//                     }
//                 ],
//                 "internalType": "struct NFTMarket.MarketItem[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "fetchPurchasedNFTs",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "uint256",
//                         "name": "itemId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address",
//                         "name": "nftContract",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "seller",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "owner",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "category",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "price",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "bool",
//                         "name": "isSold",
//                         "type": "bool"
//                     }
//                 ],
//                 "internalType": "struct NFTMarket.MarketItem[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "id",
//                 "type": "uint256"
//             }
//         ],
//         "name": "getByMarketId",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "uint256",
//                         "name": "itemId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address",
//                         "name": "nftContract",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "seller",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "owner",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "category",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "price",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "bool",
//                         "name": "isSold",
//                         "type": "bool"
//                     }
//                 ],
//                 "internalType": "struct NFTMarket.MarketItem",
//                 "name": "",
//                 "type": "tuple"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "category",
//                 "type": "string"
//             }
//         ],
//         "name": "getItemsByCategory",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "uint256",
//                         "name": "itemId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address",
//                         "name": "nftContract",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "seller",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "owner",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "category",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "price",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "bool",
//                         "name": "isSold",
//                         "type": "bool"
//                     }
//                 ],
//                 "internalType": "struct NFTMarket.MarketItem[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getListingPrice",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getMarketItems",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "uint256",
//                         "name": "itemId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address",
//                         "name": "nftContract",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "seller",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "owner",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "category",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "price",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "bool",
//                         "name": "isSold",
//                         "type": "bool"
//                     }
//                 ],
//                 "internalType": "struct NFTMarket.MarketItem[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getSalesFee",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "retrieveMoney",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setListingPrice",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "fee",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setSalesFee",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "stateMutability": "payable",
//         "type": "receive"
//     }
// ]`

// let data = "0x0000000000000000000000000000000000000000000000053444835ec580000000000000000000000000000007c16eeb5afe9f1feb8dddcf56f33ba54182a28a0000000000000000000000000000000000000000000000003782dace9d900000000000000000000000000000d52bbebce2052f77c0fda982ea7071f9326cc005"
//
// let [userPayout, userAddress, ownerPayout, ownerAddress] = ethers.utils.defaultAbiCoder.decode(["uint256","address","uint256","address"], data);
//
// console.log((ethers.BigNumber.from(userPayout).div(ethers.BigNumber.from("10000000000000000"))).toNumber()/100, userAddress, (ethers.BigNumber.from(ownerPayout).div(ethers.BigNumber.from("10000000000000000"))).toNumber()/100, ownerAddress)

// const iface = new ethers.utils.Interface(JSON.parse(jsonAbi));
// iface.format(ethers.utils.FormatTypes.minimal);

// console.log('Formatted ABI', iface.format(ethers.utils.FormatTypes.full));















//
function addNFT (nft) {
    projects.addNFT(nft).then(res => {
        console.log(res);
    }).catch(error => {
        console.log('failed to add nft');
        console.log(error);
    });
}
//
function addProject (project) {
    projects.addProject((project)).then(res => {
        console.log(res);
    }).catch(error => {
        console.log('failed to add project');
        console.log(error);
    })
}
//
async function updateNFT(nft) {
    await projects.updateNFT(nft.itemId, nft);
    console.log(nft.itemId)
}

// const update = {
//     itemId: 7798,
//     owner: "0x21dd9dae02e81b33329be0e62d78f392ab0d635e",
//     soldTimestamp: "1650813120000",
//     isSold: true
// }
// updateNFT(update)

//
//
// async function checkNFT(itemId) {
//     let res = await projects.checkItemId(itemId);
//     console.log(res)
// }
//
// checkNFT(3326)

//
// for(let i=1; i<3330; i++){
//     checkNFT(i).then(res => {
//         if(res.length === 1) {
//             const update = {
//                 itemId: i,
//                 nftContract: res[0].nftContract.toLowerCase(),
//                 seller: res[0].seller.toLowerCase(),
//                 owner: res[0].owner.toLowerCase(),
//             }
//             updateNFT(update)
//         }
//     })
// }



// projects.getNFTsOnMarketByCreators(["Thetaboard","ThetaPunks"]).then(nfts => {
//     console.log(nfts)
// }).catch(error => {
//     console.log(error);
// });








//
// const thetaBoard = {
//     contract: '0x983bc6758b206a30dc521520e4b202bb37ce3bb9',
//     name: 'Thetaboard',
//     creator: 'Thetaboard',
//     tokenNumber: 1000,
//     description: 'Thetaboard Early Adopter',
//     imgUrl:'',
//     hasMetadata: true,
// }
//
// const ThetaPunks = {
//     contract: '0xaef0091cd3615e4e1da6e35398011bd26bccb7cd',
//     name: 'ThetaPunks',
//     creator: 'ThetaPunks',
//     tokenNumber: 10000,
//     description: 'Punks On Theta',
//     imgUrl:'',
//     hasMetadata: true,
// }
//
// const ThetaMan = {
//     contract: '0xe17b6cd2a176d2db8d27d73a9b8abcb0d7cb9609',
//     name: 'ThetaMan',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man on the Moon',
//     imgUrl:'',
//     hasMetadata: true,
// }
// const SemtexSamurai = {
//     contract: '0x9b68d13cc9dbd72dcae02b201420262e617ddb58',
//     name: 'Semtex Samurai',
//     creator: 'ThetaPunks',
//     tokenNumber: 22,
//     description: 'Special drop for holding ThetaPunks',
//     imgUrl:'https://ipfs.io/ipfs/QmQ4XdXTwkHAUbvs7fpQtFvkioJVbCpHMSx5FWVzSwnfpe',
//     hasMetadata: true,
// }
//
// const MitchAlien = {
//     contract: '0x7cd383e28540c8e6439dc4cd46e70fbddeb7dc0e',
//     name: 'Mitch Alien',
//     creator: 'ThetaPunks',
//     tokenNumber: 41,
//     description: 'Special drop for holding ThetaPunks',
//     imgUrl:'https://ipfs.io/ipfs/QmcXTWtKLR9kWHsMQ7yefp5FF54b6Bd1rN8G6vW9eJ1tDm',
//     hasMetadata: true,
// }
//
// const WesZombie = {
//     contract: '0xcfe69d80cc163ad1a786a75418d495cd26b0cc81',
//     name: 'Wes Zombie',
//     creator: 'ThetaPunks',
//     tokenNumber: 69,
//     description: 'Special drop for holding ThetaPunks',
//     imgUrl:'https://ipfs.io/ipfs/QmUELjUHHqoZnUzw4ayi8ffMzHcfpapPNmWMDauCufW8mx',
//     hasMetadata: true,
// }
// const JieyiApe = {
//     contract: '0x050ce846802aab7b5f34d4efb1eeb72a83ef248c',
//     name: 'JieyiApe',
//     creator: 'ThetaPunks',
//     tokenNumber: 25,
//     description: 'Special drop for holding ThetaPunks',
//     imgUrl:'https://ipfs.io/ipfs/QmQNLQUao7wUFaQ8FgFjRw7xMfrQngZ5m7Y9zKmjyjcRhb',
//     hasMetadata: true,
// }
// const KyleHuman = {
//     contract: '0xb700ca3044fef95e17e217fe3a4a53139895d790',
//     name: 'Kyle Human',
//     creator: 'ThetaPunks',
//     tokenNumber: 71,
//     description: 'Special drop for holding ThetaPunks',
//     imgUrl:'https://ipfs.io/ipfs/QmV1B6sYGP7HmvSN9Zuj81zF55TACiUwRxBtqKzBMaxBhv',
//     hasMetadata: true,
// }
// const ThetaPugs = {
//     contract: '0x9791ddfefadb0b1bed5f35604de262506c6ee45c',
//     name: 'ThetaPugs',
//     creator: 'ThetaPugs',
//     tokenNumber: 10000,
//     description: 'A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain',
//     imgUrl:'https://imqbmq3agtaqg35bmcztbw4bmccrocpnva4oifxiebu2tqsmpqba.arweave.net/QyAWQ2A0wQNvoWCzMNuBYIUXCe2oOOQW6CBpqcJMfAI',
//     hasMetadata: true,
// }
// const ThetaZilla = {
//     contract: '0xf610fb0063c7fee8d5caae7e26d67c32dbc7d2d4',
//     name: 'ThetaZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 10000,
//     description: 'A new era of technology has spawned a legendary generation of monsters. Can you capture these digital kings?',
//     imgUrl:'https://if52rjzdj3s7sutnmzxffmeh43xbijkhopajzjenqupwdohaywwa.arweave.net/QXuopyNO5flSbWZuUrCH5u4UJUdzwJykjYUfYbjgxaw',
//     hasMetadata: true,
// }
// const ThetaPermabull = {
//     contract: '0xadc8fdca07ba7066c6e2d0efd7fe8cc35846ff3c',
//     name: 'ThetaPermabull',
//     creator: 'Fr0zenfir3',
//     tokenNumber: 444,
//     description: 'By holding one of the 444 Theta Permabull badges, it shows that you are Hardcore Theta Holder.',
//     imgUrl:'https://arweave.net/SA4PXBTjqAa5ee7oTuCuvfwJkzR2LtaNdwBn_S-bOfU',
//     hasMetadata: true,
// }
// const PluggedIn = {
//     contract: '0x5bfcf20d4f141f03ffbbe009b193040cd63083b0',
//     name: 'PluggedIn',
//     creator: 'ThetaDiamond',
//     tokenNumber: 500,
//     description: 'Player 0369 has entered the Theta multiverse.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/PluggedIn.jpg',
//     hasMetadata: true,
// }
//
// const CleanupCrew = {
//     contract: '0x44c9239b1d9562aae04574c97710207e68f74816',
//     name: 'CleanupCrew',
//     creator: 'ThetaDiamond',
//     tokenNumber: 350,
//     description: 'Clean up in isle #07.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/CleanupCrew.jpg',
//     hasMetadata: true,
// }
//
// const TFuelDreams = {
//     contract: '0x58bbda670702b8217c7428fe25c28c95a6e3963c',
//     name: 'TFuelDreams',
//     creator: 'ThetaDiamond',
//     tokenNumber: 250,
//     description: 'Extracted and crystallized for your viewing pleasure.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/TFUELDreams.jpg',
//     hasMetadata: true,
// }
//
// const ThetaverseImmersion = {
//     contract: '0xc2c4cb5a9e50590e1e71f378d5fef744176b0459',
//     name: 'ThetaverseImmersion',
//     creator: 'ThetaDiamond',
//     tokenNumber: 100,
//     description: 'The Thetan you are trying to reach is unavailable, please leave a message.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/ThetaverseImmersion.jpg',
//     hasMetadata: true,
// }
//
// const SelfIllusion = {
//     contract: '0x74767412cfd446dba5994bd9646a5669106246e4',
//     name: 'SelfIllusion',
//     creator: 'ThetaDiamond',
//     tokenNumber: 50,
//     description: 'The timelines of self are limitless.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/SelfIllusion.jpg',
//     hasMetadata: true,
// }
// const TheExtraction = {
//     contract: '0xb5e52d9f80914843141d72430f52c404bf93ec3b',
//     name: 'TheExtraction',
//     creator: 'ThetaDiamond',
//     tokenNumber: 31,
//     description: 'Every world has its resources.',
//     imgUrl:'https://arweave.net/zoI0FdzjbimnSDvngRlfdR3p2gRnGecd_WSumbNnGn4',
//     hasMetadata: true,
// }
// const ThetaMan2 = {
//     contract: '0x3ce1b5615f5bd3a037211ba11c922b93c7c32068',
//     name: 'ThetaMan2',
//     creator: 'tStake.io',
//     tokenNumber: 23,
//     description: 'To reward our loyal stakers who are staking Theta and/or Tfuel to our nodes, we are distributed these three new staking NFTs featuring Theta Man!',
//     imgUrl:'https://arweave.net/qMFbmVZ_ipKwipXlP0KvQAVnL3qZbOdQSpcPKH7N0Aw',
//     hasMetadata: true,
// }
// const ThetaFusion = {
//     contract: '0x212c4cf4ce07df918d41d3874c8733ccabd6b140',
//     name: 'ThetaFusion',
//     creator: 'ThetaDiamond',
//     tokenNumber: 24,
//     description: 'Fuse with your surroundings.',
//     imgUrl:'https://arweave.net/AhxNpxvrQBTOvr4KiXDTx6AWBdXBFfZgNSizVUspvdU',
//     hasMetadata: true,
// }

// const Earth = {
//     contract: '0x82bc05813ba10bdc12a469c3473104db1bcfcbfd',
//     name: 'EARTH',
//     creator: 'TKETS',
//     tokenNumber: 1000,
//     description: 'Soon, TKETS will be used for all types of events, from concerts to live sports. Perhaps some day, we may even see a TKETS arena...',
//     imgUrl:'https://ipfs.io/ipfs/QmecPustetgoWbuFtZN5BgDDKTmfyNGdYeaZgdhtRqD6aA',
//     hasMetadata: true,
// }

// const Gods = {
//     contract: '0xe42ac9ff693d32e03732f1a4a96a916e792e39d9',
//     name: 'GODS',
//     creator: 'TKETS',
//     tokenNumber: 1000,
//     description: 'The first known tickets ever used were in Ancient Greece. The first known NFT tickets on the Theta Network are now on TKETS.',
//     imgUrl:'https://ipfs.io/ipfs/QmfJ14xDpBWCGDHMJKf7uorr4nJwyvEpMQQCX9fyXtddag',
//     hasMetadata: true,
// }

// const ThetiansGalaxy = {
//     contract: '0xef6399f5cacfd30c2d2ec1ed86bd39d33741643b',
//     name: 'Thetians Galaxy I.',
//     creator: 'ThetaNostra',
//     tokenNumber: 222,
//     description: 'Discover the Galaxy of the ancient Theatians.',
//     imgUrl:'https://arweave.net/10Kkbj5yrZW-Yq4aLXEvVHvL6tflWLKDwCVn6fqdrl0',
//     hasMetadata: true,
// }

// const THETAVERSE = {
//     contract: '0x0478578c5e906afeb1bdbbf358929affbf1575c8',
//     name: 'THETAVERSE',
//     creator: 'TKETS',
//     tokenNumber: 1000,
//     description: 'Is this what the future of Theta looks like? A.. a THETAVERSE?!',
//     imgUrl:'https://ipfs.io/ipfs/QmXtqYW3VTEcDkSZA9gDJ8iYyhA1QQecfsz4ebcZ3Y2TDy',
//     hasMetadata: true,
// }

// const ThetaBulls = {
//     contract: '0xcb8f0b07ab79118014c8d6fa2ab2e2d88477305f',
//     name: 'ThetaBull',
//     creator: 'ThetaBulls',
//     tokenNumber: 10000,
//     description: 'Earth has failed. Wars, overpopulation and greed has has brought our old home to its knees. A group of brave explorers has set out to find a new, prosperous galaxy we can call home. After months of research Professor Lucas set out to explore the galaxy known as GOAT 888. Upon circling a planet, very similar to earth, he notices a mysterious glowing object and decides to land his ship. As he passed through a thick forrest, he finds himself at the shores of a lake and gazes upon something miraculous … the first encounter.',
//     imgUrl:'https://arweave.net/_MPa0zj-tTAYn5UcKHM_01yP7SLZD8dLYHltnbcE0L4',
//     hasMetadata: true,
// }

// const MeemopMania = {
//     contract: '0x38af6ddf4f3f3b044bd0ae1106d6726a011eefd1',
//     name: 'MeemopMania',
//     creator: 'CykoKO',
//     tokenNumber: 888,
//     description: 'Meemop Mania is a generative NFT project of 888 Meemop mints, each unique with vintage animation inspired faces, colors and accessories.',
//     imgUrl:'https://arweave.net/pPvox9jH66voJEWTP0mlDE7DPPFY9yJkt6IbLxPXWS0',
//     hasMetadata: true,
// }

// const TRSBulls = {
//     contract: '0x75ad7c8a882382b3e6132370bf317113c96248ac',
//     name: 'TRSBull',
//     creator: 'ThetaBulls',
//     tokenNumber: 44,
//     description: 'Theta Research Squad Bull represents those who never stop digging, finding, and sharing content in the hopes of advancing our mission: global adoption of Theta Network.',
//     imgUrl:'https://arweave.net/GEVHOyPMhoBdRfi7pDJB9RzFVi2ZlIbujGEGuBtDOFA',
//     hasMetadata: true,
// }
//
// const MysticGurus2021 = {
//     contract: '0xe48f6e05c119bae8e2a30f7637264c29255b061c',
//     name: 'MysticGurus2021',
//     creator: 'MysticGurus',
//     tokenNumber: 555,
//     description: 'Mystic Gurus 2021 Promo Drop. The journey begins.',
//     imgUrl:'https://arweave.net/AVsye9uQBGdmecHlkKkPIYWHt3KL5h1TZIppNVM2rGE',
//     hasMetadata: true,
// }
//
// const ThetaTeeth = {
//     contract: '0x23a185f6cf673d74f3dd69086f20136ee30e7129',
//     name: 'ThetaTeeth',
//     creator: 'ThetaTeeth',
//     tokenNumber: 3232,
//     description: 'ThetaTeeth is a collection of 3232 unique NFTs. In ancient times teeth were used as tokens by hunters and they were quite symbolic. This is very common and coincides with our vision that Theta blockchain is still in its infancy and we, just like ancient hunters, want to have something symbolic to remember about these early days.',
//     imgUrl:'https://arweave.net/biEkrXgvMtlumPZvFRGnTj4-E6dWTo2MTQpBufqYFqs',
//     hasMetadata: true,
// }
//
// const ThetaBetFirstEdition = {
//     contract: '0x875b7e0042629966eb73eff2e5e876229612d502',
//     name: 'ThetaBetFirstEdition',
//     creator: 'ThetaBet',
//     tokenNumber: 1380,
//     description: 'Collectable characters and numbers, a unique take on the alphabet. Everyone has a letter or number that’s personal to them and our aim is make NFTs as memorable as possible. Play our word games using your ThetaBet NFT letters to win TFUEL. Collect 10 or more ThetaBet for your chance to be airdropped a special animated NFT."',
//     imgUrl:'https://arweave.net/eWsnE1qVMUL_GgJv47XMD2mGB-Ri2byRCuYGJHTEJgE',
//     hasMetadata: true,
// }
//
// const ThetaSnow = {
//     contract: '0xebb704d36c14245ecacf167ac41fc26e02281cff',
//     name: 'ThetaSnow',
//     creator: 'ThetaBet',
//     tokenNumber: 100,
//     description: 'Celebrate the Holiday with our Thaterish Xmas NFT.',
//     imgUrl:'https://arweave.net/7qyaWKfGvLswrmMAngjHeTxYrm3tvyia-9CKmjnxK4Y/XMASTheta.png',
//     hasMetadata: true,
// }
//
// const XMAS = {
//     contract: '0xb884e3d5d83e154853ae02a3641e06e8309239ff',
//     name: 'XmasGreetings',
//     creator: 'ThetaBet',
//     tokenNumber: 100,
//     description: 'Seasons Greetings from Thetabet, to all the Theta community.',
//     imgUrl:'https://arweave.net/7qyaWKfGvLswrmMAngjHeTxYrm3tvyia-9CKmjnxK4Y/XMAS.png',
//     hasMetadata: true,
// }
//
// const RARE = {
//     contract: '0x70b31e3e3736fc17ed1d3e3446029d4a3626eeb8',
//     name: 'RARE',
//     creator: 'ThetaBet',
//     tokenNumber: 10,
//     description: 'Our RARE NFT is the first ever ThetaBet Word Edition. With only 10 minted, that makes it extremely RARE.',
//     imgUrl:'https://arweave.net/yonsYmu_7RQl-02dypNoAjUen9erHNnIDfyxymiYkZs',
//     hasMetadata: true,
// }
//
// const SantaBull = {
//     contract: '0x61ce58995a0aefb9e788a696ab302ebaffb03cb6',
//     name: 'SantaBull',
//     creator: 'ThetaBulls',
//     tokenNumber: 55,
//     description: 'The North Pole is in chaos; elves run from one end of the toy shoppe to the other looking for the man in the suit without avail—Santa’s gone AWOL. With no one to turn to, the elves and Mrs. Clause enlist the ThetaBulls to save Christmas. Fresh from the pasture, they’ve got Santa’s sack and the red suit in hoof, as the Bulls set forth to deliver Yuletide joy across the Thetaverse. But that velvet sack isn’t full of toys; no, it’s overflowing with bear traps, spray, and all the makings for a comfy bear fur rug. Sorry Bears, no toys this year, the ThetaBulls are back, and this time, you’re on the naughty list. It’s the running of the Christmas Bulls, leaving a wake of candy canes and pain.',
//     imgUrl:'https://arweave.net/vENF6V6wewbVytZcSfbRxNMFRmvm5XtD2mACtL5Ss4k',
//     hasMetadata: true,
// }
//
// const Goldzilla = {
//     contract: '0xb8a427267d54c56d6e3763a068d83f6cfd43981e',
//     name: 'Goldzilla',
//     creator: 'Barrizan',
//     tokenNumber: 26,
//     description: 'Goldzilla is not someone you would want to see across from you at the WPT poker table. Despite the fact that he could instantly annihilate any of his competitors with a single fiery breath, Goldzilla also has a special trick up his sleeve as he possesses a certain special Golden Chip ;). Collect Goldzilla for an instant chance to receive a custom made NFT of your choice from Zilla-Mania artist Barrizan.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Goldzilla.jpg',
//     hasMetadata: true,
// }
//
// const Bobzilla = {
//     contract: '0x74ae2ad6b214bec1a42d3ccd57204c8f9da59924',
//     name: 'Bobzilla',
//     creator: 'Barrizan',
//     tokenNumber: 33,
//     description: 'To quote the famous Bobzilla “there are no mistakes when you become involved with Theta and Tfuel, just happy accidents”.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Bobzilla.jpg',
//     hasMetadata: true,
// }
//
// const Astrozilla = {
//     contract: '0x9e2e3025a26a001d1d3857c70b36dcee82e7608d',
//     name: 'Astrozilla',
//     creator: 'Barrizan',
//     tokenNumber: 33,
//     description: 'Astrozilla will literally take Theta to the moon. Rocking the highest quality space gear that Theta has to offer, Astrozilla searches the moon for valuable Tfuel deposits.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Astrozilla.jpg',
//     hasMetadata: true,
// }
//
// const Firezilla = {
//     contract: '0xb63a79d06ecbf137002832c7bb14266e25446982',
//     name: 'Firezilla',
//     creator: 'Barrizan',
//     tokenNumber: 55,
//     description: 'With Theta set to ignite an inferno in 2022, Theta employ Firezilla to collect precious Tfuel flames to harness their power.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Firezilla.jpg',
//     hasMetadata: true,
// }
//
// const Zillarina = {
//     contract: '0xcb58da80df801f000f59cebd9d51f4d50a9bb952',
//     name: 'Zillarina',
//     creator: 'Barrizan',
//     tokenNumber: 55,
//     description: 'Like a true Renaissance-Zilla, Zillarina has no gender-roles. Zillarina stuns in each performance, executing mind bending flexibility, coordination, and grace.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Zillarina.jpg',
//     hasMetadata: true,
// }
//
// const WarmedByTFuel2021 = {
//     contract: '0x056651a953143236fdc2025b8e195ce61f286482',
//     name: 'WarmedByTFuel2021',
//     creator: 'WarmedByTFuel',
//     tokenNumber: 10000000,
//     description: 'The crypto winter descends upon the land. The wisest of #ThetaHodlers find refuge by the glowing hearth of Tfuel.',
//     imgUrl:'https://arweave.net/2IyAhsicHzyOu1__7AES7bYqFGs98ZaOKoEq3HJo3jE',
//     hasMetadata: true,
// }
//
// const ThetiansGalaxyII = {
//     contract: '0x2860c2e82967c2a79aa9d8b1a79421478843cc46',
//     name: 'Thetians Galaxy II.',
//     creator: 'ThetaNostra',
//     tokenNumber: 222,
//     description: 'Discover the Galaxy of the ancient Theatians.',
//     imgUrl:'https://arweave.net/TZSux8CJcgY-ImBIooaWWNn5mRewtSFdkSDvZjWsvCQ',
//     hasMetadata: true,
// }
//
// const EVENT_PROXIMA = {
//     contract: '0xc357a28c0285f6c45a7ff7e8c4cc92fad0b34114',
//     name: 'EVENT PROXIMA',
//     creator: 'ThetaDiamond',
//     tokenNumber: 1202,
//     description: '4 years ago the closest star to our Sun, Proxima Centauri went supernova. This is what\'s left, these are our memories..',
//     imgUrl:'https://arweave.net/FhYtnmPVr6KGrVz3NXweKdPluiH7WV9eE_wWhkwvhz4',
//     hasMetadata: true,
// }
//
// const BarrizanCustom = {
//     contract: '0x23b8b352ba1eb43fed713f4c718cc840669cdb5f',
//     name: 'BarrizanCustom',
//     creator: 'Barrizan',
//     tokenNumber: 0,
//     description: 'Custom NFTs and Airdrops from Barrizan',
//     imgUrl:'https://open-theta.de/api/images/creators/Barrizan.jpg',
//     hasMetadata: true,
// }
//
// const ThetaManSpacewalk = {
//     contract: '0xfcbb9f1962b9ae8a28ba38feffaa0a047ee97cd4',
//     name: 'ThetaManSpacewalk',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man teaches his dog how to move in space using a jetpack.',
//     imgUrl:'https://arweave.net/0-ipkmfrwZrPLLXnqc5dwzymTylmsS0u5G-KnXq8sww/Theta-Man-Space-Adventures-01-Spacewalk.jpg',
//     hasMetadata: true,
// }
//
// const ThetaManAsteroidBelt = {
//     contract: '0xc4b85cfaa74d6a107358932cf73fbfdc277106b2',
//     name: 'ThetaManAsteroidBelt',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man plays hide-and-seek with his dog in the asteroid belt.',
//     imgUrl:'https://arweave.net/2voMuUaJv7cU3BiV6PWcnTTNvaexFl7Cdn-Zj6jBAvU/Theta-Man-Space-Adventures-02-Asteroid-Belt.jpg',
//     hasMetadata: true,
// }
//
// const ThetaManIapetus = {
//     contract: '0xb64f92b841615ccc55b7d16a5fe1035323b5d775',
//     name: 'ThetaManIapetus',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man and his dog enjoy a visit to Iapetus, one of Saturn\'s moons.',
//     imgUrl:'https://arweave.net/WF-P3NCzr60K5a5hAVFnH2bpoqimRkCn-f94NPsAX5o/Theta-Man-Space-Adventures-03-Iapetus.jpg',
//     hasMetadata: true,
// }
//
// const PugGames = {
//     contract: '0x81e034a9dc071d1261631d8a21fb6144218f14b1',
//     name: 'PugGames',
//     creator: 'ThetaPugs',
//     tokenNumber: 7,
//     description: 'ThetaPugs - Pug Games Special NFT',
//     imgUrl:'https://arweave.net/WxCfM90J-Kc1tQYiKHa4drcMZhPUlhrXqi26wVE12ew',
//     hasMetadata: true,
// }
//
// const WarmedByTFuelBigDog = {
//     contract: '0x761f48c0cbc57323cd57cbc939131e5a1a56718f',
//     name: 'WarmedByTFuelWithBigDog1111',
//     creator: 'WarmedByTFuel',
//     tokenNumber: 130,
//     description: 'With a passion for all things freedom and Theta, Big Dog 1111 knows where to find warmth in the crypto Winter',
//     imgUrl:'https://arweave.net/1NLp_JO0gIwyyRjrPoVEBkc2i1PKv_74W8ATUwKbQmk',
//     hasMetadata: true,
// }
//
// const ThetaTime = {
//     contract: '0x0015bc623bc3020f36de90dc112c2c79e1a3f912',
//     name: 'ThetaTime',
//     creator: 'ThetaBet',
//     tokenNumber: 33,
//     description: 'Turn heads with our ThetaBet, Spinning Theta.',
//     imgUrl:'https://arweave.net/7qyaWKfGvLswrmMAngjHeTxYrm3tvyia-9CKmjnxK4Y/SpinningTheta.png',
//     hasMetadata: true,
// }

// const THETANET = {
//     contract: '0x81821cb1f7fd9857a76ddfb2640fba23e91eedd4',
//     name: 'THETANET',
//     creator: 'TKETS',
//     tokenNumber: 70,
//     description: 'The first ever GENESIS airdrop. NOT FOR SALE.',
//     imgUrl:'https://ipfs.io/ipfs/QmYq6h49L55nBXZF7585Vy73ob4oMH7Mr6HB8oG9STsmQG',
//     hasMetadata: true,
// }
//
// const GojiraIsland = {
//     contract: '0xa8ace2512b663decc712b09befedff14d1d2d693',
//     name: 'Gojira Island',
//     creator: 'THETHOVEN',
//     tokenNumber: 111,
//     description: 'Antarctica is one of the world\'s least explored & most mysterious places on earth. Fallen angels & underground alien bases .. Godzilla .. The Original THETA token ?? only one can imagine',
//     imgUrl:'https://arweave.net/94i3h_nnoFI-bIZJjJS2WdemIvg1qAiUx43ZWYMPHoA',
//     hasMetadata: true,
// }

// const GreekGodZilla = {
//     contract: '0x4e91be87a48f3c37e0f862021d0e24e501f50327',
//     name: 'Greek God Zilla',
//     creator: 'Barrizan',
//     tokenNumber: 11,
//     description: 'Only the most devoted Zilla-Mania holders will be able to possess Greek-God-Zilla and his powers. Collect all 5 Zilla-Mania NFT’s in order to receive the Greek-God-Zilla as an airdrop from Barrizan.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/GreekGodZilla.jpg',
//     hasMetadata: true,
// }

// const LiquidPulse = {
//     contract: '0x6ec41908f00f7a0b7bb94da2e4a08335abc25554',
//     name: 'LiquidPulse',
//     creator: 'ThetaDiamond',
//     tokenNumber: 100000,
//     description: 'I drop, you drop, we all drop for TDROP! Collect this one of a kind limited edition piece dedicated to NFT Liquidity mining on our favourite blockchain..',
//     imgUrl:'https://arweave.net/9BiZqGh0sfDMfVPnwkUm_4upzk3t-O2Dqbv9CT7z_To',
//     hasMetadata: true,
// }

// const PixZilla = {
//     contract: '0xc98c4cf17156d022fcc908779f360c86fe086753',
//     name: 'PixZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 10000,
//     description: 'Old School Art with New Capabilities.',
//     imgUrl:'https://arweave.net/FaQwrrmbm99AEJjAW-aDVdxuaFNXA2oLVVk3Du3gV-o',
//     hasMetadata: true,
// }

// const PINEAPPLE = {
//     contract: '0x5c2bf2f39b81f8e1e9e52a3cfe15bb4729cf8354',
//     name: 'PINEAPPLE',
//     creator: 'ThetaBet',
//     tokenNumber: 15,
//     description: 'This rare Pineapple is only the second ThetaBet word NFT to be created. There are only 15 first edition ThetaBet Pineapples minted.',
//     imgUrl:'https://arweave.net/99nUGrtKsoz52uQLfv-blNCfAg951gX5DaGoXzvClgo',
//     hasMetadata: true,
// }

// const SpacePunk = {
//     contract: '0x9f6b2bd41490d4597038acde77c638c861b021cf',
//     name: 'SpacePunk121',
//     creator: 'ThetaPunks',
//     tokenNumber: 121,
//     description: 'The "Space Punk 121" NFT airdropped in Q1 2022 to all Theta Punk OGs, owners of the very first independent NFTs on the Theta blockchain.  Only 121 of these very special hand-minted NFTs exist!',
//     imgUrl:'https://arweave.net/HAfI5kGJ4OB14vTldlqqMX5J2SewuYWgo965THVd0XE',
//     hasMetadata: true,
// }
//
// const NewYearZilla = {
//     contract: '0x222611b920fb97afe724610567e59ef11a8db049',
//     name: 'NewYearsZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla January 2022 Collection.',
//     imgUrl:'https://arweave.net/M7DUpHYA3kNjdHfjNUC4mqGjfxqE7jUM3c_tdnjA8FA',
//     hasMetadata: true,
// }

// const ZillaCustoms = {
//     contract: '0x247f457079f41e9134879c711016754cb07aa481',
//     name: 'ZillaCustoms',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 0,
//     description: 'Custom Zillas gifted from the ThetaZillaClub',
//     imgUrl:'https://arweave.net/2AJG94KKgSMivVY86j6gFC3_hmWZbHozzaRR5mjp_ms',
//     hasMetadata: true,
// }

// const TFuelTonic = {
//     contract: '0x358087474325ac1ffa13935c90f468e9fdc31044',
//     name: 'TFuel Tonic',
//     creator: 'CykoKO',
//     tokenNumber: 0,
//     description: 'TFuel Tonic to the rescue! This craftily concocted cocktail is sure to fix Meemop\'s multiplying mutation! With just the right twist of Tfuel, some bitters and a good dose of SuperEarth elixir, Meemop will be back to his regular happy, hopping self in no time!',
//     imgUrl:'https://arweave.net/_4QgVuZ0y70WVl6lMUiZdEVOc8Xb_gFFijpIidpyeW8',
//     hasMetadata: true,
// }

// const HealthyMeemop = {
//     contract: '0x06b656c87f98ec1aadb2c6ad2fb68a748befc71e',
//     name: 'Healthy Meemop',
//     creator: 'CykoKO',
//     tokenNumber: 73,
//     description: 'Yay! Meemop is cured thanks to you! Now back to his usual self, Meemop is now back in action with Cyko KO and Peachy Keen---just one happy SuperEarth family!!',
//     imgUrl:'https://arweave.net/IH-1nnPT30dRZEbIgQb_gtHF0rw3qyRu7oHtgGCwUWc',
//     hasMetadata: true,
// }

// const ThetaWords = {
//     contract: '0xcf8e4a8d4081c4eba6835c339eb5428889f164f9',
//     name: 'ThetaWords',
//     creator: 'ThetaBet',
//     tokenNumber: 610,
//     description: 'ThetaWords are a unique collectable take on Thetaish words. Punk, Bull, Hodl, Pineapple, Mint, 5X, 10X, WTF?, Pump and NFTS. Lookout for some hidden gems created especially for us by our NFT friends, the MysticGurus, Barrizan and ThetaTeeth. Find one and we\'ll create a personalised word NFT of your choice.',
//     imgUrl:'https://arweave.net/28UsNCWAOXpYW9hX-Aqn_brX8RFmp1J0r0mZ1BB6Cfk',
//     hasMetadata: true,
// }

// const TBILLMultiplier = {
//     contract: '0x172d0bd953566538f050aabfeef5e2e8143e09f4',
//     name: 'TBILL Multiplier',
//     creator: 'Gworld',
//     tokenNumber: 10000,
//     description: 'TIBILL Multiplier',
//     imgUrl:'https://arweave.net/B04aLg0WL99-GJ188x7qG32Yfx4Yh6YXncJIhELvFs8',
//     hasMetadata: true,
// }

// const DailyDiamond = {
//     contract: '0x66e93c5ebef7ebcc2fdf1b9a0da2b32e9a8730d2',
//     name: 'Daily Diamond',
//     creator: 'ThetaDiamond',
//     tokenNumber: 0,
//     description: 'Follow me on the DailyDiamond journey! 1/1 unique designs every day!',
//     imgUrl:'https://arweave.net/fAoWWPaO3BgCQARbLygE6FdKKJXicFj1U0RfYGwKu60',
//     hasMetadata: true,
// }

// const EVENTPROXIMAPostEvent = {
//     contract: '0xc45b3d5267a480a8aacea5b943e690d5ec097df0',
//     name: 'EVENT PROXIMA Post Event',
//     creator: 'ThetaDiamond',
//     tokenNumber: 111,
//     description: 'Humanity has all but been wiped out by the massive Supernova known as EVENT PROXIMA, you are our only hope!',
//     imgUrl:'https://arweave.net/wKtQqHTjbQKiRFJ7uMFne6rkFvPy8Zfg9a66zkgBmdg',
//     hasMetadata: true,
// }

// const OrbZilla = {
//     contract: '0xd5566b294050538370431f36a610798abb040626',
//     name: 'OrbZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla February 2022 Collection.',
//     imgUrl:'https://arweave.net/DxgjfQ3zCixc_F09UyZY8uNfkE5JljvFpzqlHofcnqo',
//     hasMetadata: true,
// }

// const CommunitySupport = {
//     contract: '0x4121dcc6eda2e8785a5cde3a830a3652082694a5',
//     name: 'Community support',
//     creator: 'Ukraine Relief',
//     tokenNumber: 0,
//     description: 'OpenTheta Community support for Ukraine. 100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/4oWnJ-MzCz87aNWy7kn36Jz5R_l7Vs_FgWkswekU5g0',
//     hasMetadata: true,
// }
//
// const Gurus4Ukraine = {
//     contract: '0x006eb841a7b036119d02ec1a06a1756f37decaab',
//     name: 'Gurus4Ukraine',
//     creator: 'Ukraine Relief',
//     tokenNumber: 0,
//     description: 'This Ukraine Angel Guru represents the blessings and protection the Mystic Gurus Community sends to our brethren in Ukraine. Each NFT carries with it blessings for those who support the cause, as well as for those we are supporting. 100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/Q8ewICC0S1YOG98OmUaG2IuhL89HCQsrNQozU6S8soY',
//     hasMetadata: true,
// }
//
// const WeStandWithUkraine = {
//     contract: '0xd32326e850218a7dc5842bf3657b55d2921177fa',
//     name: 'We stand with Ukraine',
//     creator: 'Ukraine Relief',
//     tokenNumber: 0,
//     description: 'We stand with Ukraine by ThetaDiamond, to promote peace not war. 100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/xYdiWEoxUzc4Ojai1b5poSD0-sk01GwlNq-aavST79s',
//     hasMetadata: true,
// }

// const HighFlyerClub = {
//     contract: '0x81fcd77c59cc469026e3bb8eef46a495581a495e',
//     name: 'High Flyer Club',
//     creator: 'ThetaPunks',
//     tokenNumber: 250,
//     description: 'Ownership of this Token grants membership to the "High Flyer Club!" Airdropped in Q1 2022 to all who owned twelve or more Thetapunks from the original collection on Theta Blockchain.',
//     imgUrl:'https://arweave.net/79b835EJBeBBP2Gl7wnbFOt1XAJR2lLZxb8JC7JOlfk',
//     hasMetadata: true,
// }

// const Metapass = {
//     contract: '0xa042fc0e5bd72d02c99b49ca8ca2bf7fa2ab3156',
//     name: 'TKETS x METAPASS',
//     creator: 'TKETS',
//     tokenNumber: 110,
//     description: 'The commemorative airdrop for our rebranding into Metapass. Airdrop only, not for direct mints.',
//     imgUrl:'https://ipfs.io/ipfs/QmWF7p5awoxWufvJdJyySXeTBwoUc7JXoAhqApFZgbAPsz',
//     hasMetadata: true,
// }

// const indientz = {
//     contract: '0x40f81be7f2f90961a7f9e53ff81de8bc37b1e227',
//     name: 'indientz',
//     creator: 'zenba',
//     tokenNumber: 111,
//     description: 'A collection of captures of interdimensional entities caught manifesting in satellite data of the sun. Catch a glimpse into the real metaverse across time, space, and dimensionality. This is not a generative project, it is a collision of scientific data and artistic flare.',
//     imgUrl:'https://arweave.net/hwscJlz4ATowkJXjd5Rzaiwbmy4uREMfClyU5OKRaCs',
//     hasMetadata: true,
// }

// const TrophyRoomxAirJordan1 = {
//     contract: '0xb3bce1f2fc49300825a4071d80dd921075dc78fa',
//     name: 'Trophy Room x Air Jordan 1',
//     creator: 'One Less Entertainment',
//     tokenNumber: 200,
//     description: 'These rare sneakers are mired in controversy. So WE BLEW THEM UP. All NFT holders will gain access to our full behind the scenes explosion video and receive a vote on future destruction events.',
//     imgUrl:'https://arweave.net/Cu-oLsstVKE8430rHcfkJkWvUNK_FjXd-CFqLAIxv6U',
//     hasMetadata: true,
// }

// const VideoEvidenceCards = {
//     contract: '0x6a568444675d6d6a096b083915196006552fc7f0',
//     name: 'Video Evidence Cards',
//     creator: 'One Less Entertainment',
//     tokenNumber: 10,
//     description: 'An upgraded version of the Trophy Room x Air Jordan 1\'s with original music from DEAR KITTY, holders receive five votes for future destruction events.',
//     imgUrl:'https://arweave.net/C-2tim9TncuyU5YFTQ01HWFcMlbvO-zu7SgHL7hPnOA',
//     hasMetadata: true,
// }
//
// const TheExplosion = {
//     contract: '0x9e04458e5585d94a09fb773b8be01b92a96cdf4a',
//     name: 'The Explosion',
//     creator: 'One Less Entertainment',
//     tokenNumber: 1,
//     description: 'These rare sneakers are mired in controversy. So WE BLEW THEM UP. All NFT holders will gain access to our full behind the scenes explosion video and receive a vote on future destruction events.',
//     imgUrl:'https://arweave.net/d3Qk6Rljy8tgg5fM6eNfnC48ZjJpels2t_xwi9Y1U-0',
//     hasMetadata: true,
// }
//
//
// const UkraineReliefAid = {
//     contract: '0xf484a4232944f31d2915ea7b37a8eb4735ae8646',
//     name: 'Ukraine Relief Aid',
//     creator: 'Ukraine Relief',
//     tokenNumber: 5,
//     description: 'Various one of one NFTs from different creators to support the Ukraine Relief aid OpenTheta fundraiser.  100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/ucDGcX8H38PWgHwFr-QiOQpkzOQ0O2ZmufxbKAtbFqo',
//     hasMetadata: true,
// }

// const MegaMeemop = {
//     contract: '0x441c01707404d61391fbbf69cb64e89389d842ae',
//     name: 'Mega Meemop',
//     creator: 'CykoKO',
//     tokenNumber: 72,
//     description: 'This Theta-fueled little guy is ready for some blockchain action! Meep!!!!',
//     imgUrl:'https://arweave.net/iFjj3AEvAMYjAG3OdOA30aPdhAXcr0DwmbOy9xWRg3s',
//     hasMetadata: true,
// }

// const TNS = {
//     contract: '0xbb4d339a7517c81c32a01221ba51cbd5d3461a94',
//     name: 'TNS',
//     creator: 'Thetaboard',
//     tokenNumber: 0,
//     description: 'This is a Theta Name Service (TNS) domain',
//     imgUrl:'https://open-theta.de/api/images/creators/TNS.jpg',
//     hasMetadata: false,
// }

// const ThRune = {
//     contract: '0x8dd63546c9d88d3822e3446ddecc3cca628f2768',
//     name: "Th'Rune",
//     creator: 'TSports',
//     tokenNumber: 50,
//     description: 'Theta Rune NFT in the character of Starry Night by Cesar Milan.',
//     imgUrl:'https://arweave.net/aITmrwR97llqB81h2iPtRESokVpURVlPmkf4eYl8jVE',
//     hasMetadata: true,
// }

// const ThEye = {
//     contract: '0x882161a50a95763a3ebd1cccd77b5ab04c0c1473',
//     name: "Th'Eye",
//     creator: 'TSports',
//     tokenNumber: 50,
//     description: 'A pro-peace NFT by Cesar Milan.',
//     imgUrl:'https://arweave.net/SBDZ8bhCKERWZxan8AiFd0wbcWZhUWrhIIwF3domFRM',
//     hasMetadata: true,
// }

// const AbsoluteGosu = {
//     contract: '0x6b9ece0e02870098846b209bbe653ea1de00fc48',
//     name: "Absolute Gosu",
//     creator: 'Satoshi Speaks',
//     tokenNumber: 520,
//     description: '"The Pandora"s Box cracks light unto the world as the God\'s and Goddesses awake from their slumber"',
//     imgUrl:'https://open-theta.de/api/images/launches/AbsoluteGosu.jpg',
//     hasMetadata: true,
// }


// const ZillaPatch = {
//     contract: '0xb690f33f586073e23bc4f368ac928ccffb51202b',
//     name: 'ZillaPatch',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla March 2022 Collection.',
//     imgUrl:'https://arweave.net/i6-uIASgZnYai3IwBQXeEtrikqNDjrrq11zh3Ix0c08',
//     hasMetadata: true,
// }

// const KingsArtwork = {
//     contract: '0x31223391e591b5a06581c2191a77ad69328384e3',
//     name: 'Kings Artwork',
//     creator: 'Team Fr0zenfir3',
//     tokenNumber: 1,
//     description: 'Redeemable NFTs by Team Fr0zenfir3',
//     imgUrl:'https://arweave.net/Du-RuMiX-hkLhK2TiKyVvXafW7oNx9Wwo0Kr_LPHgio',
//     hasMetadata: true,
// }

// const BigDog1111Sticker = {
//     contract: '0x3a8246be5efc8660a3618aefd9d767ae47df3c77',
//     name: 'BigDog1111 TBILL Sticker',
//     creator: 'Gworld',
//     tokenNumber: 0,
//     description: 'De Great Merge: BigDog1111 04/04 - 04/08',
//     imgUrl:'https://arweave.net/xo0RQHm4zJ4Yh4Dx2PiQEgbKrIxmTldVcB_TM3HcSF8',
//     hasMetadata: true,
// }

// const THETARocket = {
//     contract: '0x060572d097039ed40e23447d30957ff60d27d027',
//     name: 'THETA Rocket',
//     creator: 'Team Fr0zenfir3',
//     tokenNumber: 246,
//     description: 'The Foundation of Theta Blockchain',
//     imgUrl:'https://arweave.net/antg3bcl9Jt6RImO092tTcmOmC0ckYYy0xDPYRa4o0o',
//     hasMetadata: true,
// }

// const ThetaCon22 = {
//     contract: '0x53ae8cdc2e60c81f4a1967dc381452a203dee836',
//     name: 'ThetaCon 2022',
//     creator: 'ThetaCon',
//     tokenNumber: 2400,
//     description: 'ThetaCon 2022 Collection.',
//     imgUrl:'https://arweave.net/z5dFNIlpXj0YN6xwLM8rw-u9GbVy3Rv3UWb0xP1y3S8',
//     hasMetadata: true,
// }

// const AlienlikeSticker = {
//     contract: '0x4de555c77fddab5d40310e3cba254a41647c3af7',
//     name: 'Alienlike TBILL Sticker',
//     creator: 'Gworld',
//     tokenNumber: 0,
//     description: 'De Great Merge: Alienlike 04/11 - 04/15',
//     imgUrl:'https://arweave.net/QpfylHZF8Toh3X1-yiW90TaBchrUsrY2bu0u8hvnS-g',
//     hasMetadata: true,
// }

// const Thegon = {
//     contract: '0xee4ad23c12ab827b35a6796bc04ced750b206f73',
//     name: 'Thegon',
//     creator: 'ThetaPunks',
//     tokenNumber: 88,
//     description: 'A legendary creature in Theta mythology, the mighty Thegon symbolizes the fierce, all-encompassing power of Theta and TFuel - a bold reminder that global adoption is just on the horizon. Thegon was created by Theta community artist “Visioneer.” The NFT was airdropped in April 2022 to the owners of the 88 Zombies NFTs in the original Thetapunks collection on Theta Blockchain.',
//     imgUrl:'https://arweave.net/th-hyFDaTZjbNjshexe_XOQKmbSyOG0Td-ctiaAEv9Y',
//     hasMetadata: true,
// }

// const Whitedove = {
//     contract: '0x77a2d407363C2d68D8Cd1d71eC999667c2057c6a',
//     name: 'Michelle Whitedove TBILL Sticker',
//     creator: 'Gworld',
//     tokenNumber: 0,
//     description: 'De Great Merge: Michelle Whitedove 04/18 - 04/22',
//     imgUrl:'https://arweave.net/XywppsCmX_uSXNGaD3k1Hag6A5husDubW8nhT78VHq4',
//     hasMetadata: true,
// }

// const Wes = {
//     contract: '0xd32b3d836498c256f9011acfee644fc7cd137893',
//     name: 'Node Master: W3S',
//     creator: 'The Koan Circle',
//     tokenNumber: 20,
//     description: 'Apart from spreading the code to the nodes, this Node Master controls the energy flow of the main network, making it almost impossible to control externally.',
//     imgUrl:'https://arweave.net/P4UMjGLa1kzXsl1KbApduCweuee_zuK3R-YdTf40xxo',
//     hasMetadata: true,
// }
//
// const Mitch = {
//     contract: '0x3626ea43a4ca7a4396d13af26ccd6e6657cabb7f',
//     name: 'Node Master: M1TCH',
//     creator: 'The Koan Circle',
//     tokenNumber: 40,
//     description: 'Apart from coordinating the nodes efforts, this Node Master controls the refrigeration and cooling of the system, making it safe and stable to operate',
//     imgUrl:'https://arweave.net/rFc6-1wI_l4Hf_iWaMFkFF_VhI0E_UgWr2v023oxNFE',
//     hasMetadata: true,
// }
//
// const JieYi = {
//     contract: '0x8ff39c1c650bbbb59f75d1e8ffca0f8f87a07571',
//     name: 'Node Master: J13 Y1',
//     creator: 'The Koan Circle',
//     tokenNumber: 60,
//     description: 'Apart from securing the channels for node communication, this Node Master has the ability to start off or break the information code process and access the Dyson Sphere functions.',
//     imgUrl:'https://arweave.net/S-Kp1rS-ps6b0n7B5DrcyCOe6GbJsxbX4YcxHgICpU8',
//     hasMetadata: true,
// }
//
// const CargoShip = {
//     contract: '0x97f25c2ba702a93030fb64b31acd8a26c79d8c8f',
//     name: 'heta Cargo Ship',
//     creator: 'The Koan Circle',
//     tokenNumber: 100,
//     description: 'This automated and autosufficient cargo ship is designed to host up to 25 workfoce-cyborgs, who dig the minerals in the exo-colonies and recharge in the base-station deployed after landing. After the work is done, one of the cyborgs will drive the ship straight to the Dyson Sphere.',
//     imgUrl:'https://arweave.net/Iw5-RmS3BFxZUdFU0ViJdyhgh9HZJKUgnEPaDTGBimY',
//     hasMetadata: true,
// }
//
// const DysonSphere = {
//     contract: '0x054f16e2fc75fd6e187f8728f140b0db2c0fecbb',
//     name: 'Dyson Sphere',
//     creator: 'The Koan Circle',
//     tokenNumber: 100,
//     description: 'With this technological advance, designed upon information received long ago by the Theta Council, humanity will know a new era where energy scarcity will not longer be an issue. The different concentric rings are synchronised by the Node Masters to harness the energy provided by the sun, to later on send it in the shape of controlled solar flares to Earth.',
//     imgUrl:'https://arweave.net/I2mEtXQJKQPPMq3NlzR3e_CGCpqt6nPaXcELYvDHeA0',
//     hasMetadata: true,
// }

// const SUBCHAIN = {
//     contract: '0x98437D5F329D46282AAA075C7686cD1A2A1D7384',
//     name: 'SUBCHAIN INFERNO',
//     creator: 'Hinse',
//     tokenNumber: 1,
//     description: 'Theta Mainnet 4.0 brings a network of interconnected subchains.',
//     imgUrl:'https://arweave.net/dvOHddbpn0nbVPNbpHbUD4147LmmmR2gDRww8CQ7CrA',
//     hasMetadata: true,
// }
//
// const OvergrownThetahead = {
//     contract: '0x39d7ab633a7b2457241894b8b9a80ea9267b4298',
//     name: 'Overgrown Thetahead',
//     creator: 'Hinse',
//     tokenNumber: 11,
//     description: '',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/Overgrown.jpg',
//     hasMetadata: true,
// }
//
// const BloomingThetahead = {
//     contract: '0x78d06aadf688cdc15578bdbd37580743af5176ad',
//     name: 'Blooming Thetahead',
//     creator: 'Hinse',
//     tokenNumber: 11,
//     description: '',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/Blooming.jpg',
//     hasMetadata: true,
// }
//
// const FrozenThetahead = {
//     contract: '0x6d7354975376034feb11d218ba1ce6bf950adca6',
//     name: 'Frozen Thetahead',
//     creator: 'Hinse',
//     tokenNumber: 18,
//     description: '',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/Frozen.jpg',
//     hasMetadata: true,
// }
//
// const ChaoticThetahead = {
//     contract: '0x52d6063db78758700e5158664ba843a44ada4b38',
//     name: 'Chaotic Thetahead',
//     creator: 'Hinse',
//     tokenNumber: 2,
//     description: '',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/Chaotic.jpg',
//     hasMetadata: true,
// }
//
//
// const ValidatingThetahead = {
//     contract: '0xbb03a953cf475a05b0d428fd9a4a8e5549dd2b1a',
//     name: 'Validating Thetahead',
//     creator: 'Hinse',
//     tokenNumber: 6,
//     description: '',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/Validating.jpg',
//     hasMetadata: true,
// }
//
// const GuardianThetahead = {
//     contract: '0x501dbc08b61bcf71154fc67a347cd118f7869f51',
//     name: 'Guardian Thetahead',
//     creator: 'Hinse',
//     tokenNumber: 1,
//     description: '',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/Guardian.jpg',
//     hasMetadata: true,
// }
//
// const EdgyThetahead = {
//     contract: '0xdeba6df323b988bd1ad3fb5f9f5d4e00740beb48',
//     name: 'Edgy Thetahead',
//     creator: 'Hinse',
//     tokenNumber: 1,
//     description: '',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/Edgy.jpg',
//     hasMetadata: true,
// }
//
// const WinterThetaboard2022 = {
//     contract: '0x956156267de1de8896e9cbe14bf59c1bca0b1938',
//     name: 'Thetaboard 2022 Winter Badge',
//     creator: 'Thetaboard',
//     tokenNumber: 0,
//     description: 'Thetaboard 2022 Winter Badge in collaboration with Hinse',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/winter2022.jpg',
//     hasMetadata: true,
// }
//
// const ThetaNameServiceBadge = {
//     contract: '0x44a1bafa96b8b92785576f0dd7f6c88fd24e7d5c',
//     name: 'Theta Name Service Badge',
//     creator: 'Thetaboard',
//     tokenNumber: 10,
//     description: 'This collection of only 10 editions, designed by digital artist Hinse as part of a collaboration with Thetaboard, celebrates the launch of the blockchain based domains TNS. The NFTs were not for public sale, being awarded only to the winners of the TNS Caption Contest run by Thetaboard in March 2022.',
//     imgUrl:'https://arweave.net/ZEJaPoJ0jxkyAYo9CqJMRqfU4YdGrXsika0en2pNq5w/TNSBadge.jpg',
//     hasMetadata: true,
// }

// const TeddyB = {
//     contract: '0x7ed33985d23d39310c01d2becd934991dcedaf03',
//     name: 'TeddyB TBILL Sticker',
//     creator: 'Gworld',
//     tokenNumber: 0,
//     description: 'De Great Merge: TeddyB 04/25 - 04/29',
//     imgUrl:'https://open-theta.de/api/images/launches/TeddyB.jpg',
//     hasMetadata: true,
// }

// const ThomasOnTheta = {
//     contract: '0xe45610e578d4eb626121f55a61ab346a619b7d99',
//     name: 'ThetaMillion.com',
//     creator: 'ThomasOnTheta',
//     tokenNumber: 571,
//     description: 'Get your spot on ThetaMillion.com! Each NFT represents a spot on ThetaMillion.com. Owning the NFT allows you to change title, image and URL.',
//     imgUrl:'https://open-theta.de/api/images/launches/ThetaMillion.jpg',
//     hasMetadata: true,
// }

// const DailyDiamondPerks = {
//     contract: '0x10bc964bf2080f5aa87e6b0c55bfc7a5d3b08cee',
//     name: 'DailyDiamond Perks',
//     creator: 'ThetaDiamond',
//     tokenNumber: 0,
//     description: 'Enjoy the perks of being a DailyDiamond holder and collect some sweet unique rewards!',
//     imgUrl:'https://arweave.net/X4MHG_mkPQUQJwyG_HgI_jI9tYFP6JF9de-djVjRWFA',
//     hasMetadata: true,
// }

// const ThetaSkies = {
//     contract: '0x206149a3cce16bc3e36b9d332627ef1b35a67330',
//     name: 'ThetaSkies',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla April 2022 Collection.',
//     imgUrl:'https://arweave.net/bShdYzRBw-cTijQ-7TQl3xygeAkZHZe699aIatwnJQs',
//     hasMetadata: true,
// }
//
// const VixensKittens = {
//     contract: '0x36797b29403c5d527f03e5cefded355236afc652',
//     name: "Vixen's Kittens",
//     creator: 'Vintage Vixen',
//     tokenNumber: 555,
//     description: "A Portal has opened into the Thetaverse.. And I see Cats?! Wait a second these aren't ordinary cats.. These are VIXENS KITTENS!  We must collect these interdimensional Kittens and somehow get them back to the rift. Are you willing to help?!",
//     imgUrl:'https://open-theta.de/api/images/launches/VixensKittens.jpg',
//     hasMetadata: true,
// }

// const C4C = {
//     contract: '0x44edcfd52ea180c91d6ffb340b0bc2a8acb999c8',
//     name: 'C4C TBILL Sticker',
//     creator: 'Gworld',
//     tokenNumber: 0,
//     description: 'De Great Merge: C4C 05/02 - 05/06',
//     imgUrl:'https://open-theta.de/api/images/launches/C4C.jpg',
//     hasMetadata: true,
// }

// const Bullit = {
//     contract: '0x141046b84c57d1219fd7778777effbf51da7bf99',
//     name: 'Bullit collection v1',
//     creator: 'Bullit',
//     tokenNumber: 1000,
//     description: 'The first collection of Bullit NFTs.',
//     imgUrl:'https://open-theta.de/api/images/launches/BullitCollectionV1.png',
//     hasMetadata: true,
// }

// const QA = {
//     contract: '0xda05058a12541a18f45123e4f0475f93422445e1',
//     name: 'Q&A ThetaLabs x OpenTheta',
//     creator: 'ThetaLabs x OpenTheta',
//     tokenNumber: 0,
//     description: 'This NFT unlocks the prerecorded Q&A with ThetaLabs and OpenTheta. Its the first-ever use of Theta\'s NFT DRM technology.',
//     imgUrl:'https://arweave.net/dEVje-CfbWLgieedFfuXd5P1eoX6QvQAAkGiXqtkh1Q',
//     hasMetadata: true,
// }

// const INFLUX = {
//     contract: '0xbc366933abd429cbfea50c6ae21b001c0a2e871d',
//     name: 'INFLUX',
//     creator: 'Hinse',
//     tokenNumber: 50,
//     description: 'Random theta-phone, updating his guardian stake.',
//     imgUrl:'https://arweave.net/c8WlSXmw0iCLcWi8f_B4005GwDukt4_skH4RFxQvTRo',
//     hasMetadata: true,
// }
//
// const INFLOW = {
//     contract: '0xcdfd5b29ac62ebd458a21e83d3cf3ea7f3e9ef0d',
//     name: 'INFLOW',
//     creator: 'Hinse',
//     tokenNumber: 50,
//     description: 'Let Tfuel flow.',
//     imgUrl:'https://arweave.net/k0wOFK9uK_1uPsgcfmxS4PkVI1LKPbOFnXnCcom9sjo',
//     hasMetadata: true,
// }
//
// const COMPOUND = {
//     contract: '0x5e34a6c8c037e05fbb22163e78f8d0b3147c45ad',
//     name: 'COMPOUND',
//     creator: 'Hinse',
//     tokenNumber: 25,
//     description: 'Pepe Frog approves and stands with the OGs.',
//     imgUrl:'https://arweave.net/7HgmDOV3U3gY-6acKOCU6SmfR_P6puZ0IA1WmWBr7M0',
//     hasMetadata: true,
// }
//
// const PREBURNER = {
//     contract: '0x75fa996d64140730013e56034816cd43a4ef12a8',
//     name: 'PREBURNER',
//     creator: 'Hinse',
//     tokenNumber: 5,
//     description: 'The journey is the reward.',
//     imgUrl:'https://arweave.net/poKfzEecNXKuumijVEfCd45Nyo68jQ01FEbDtDtRbfg',
//     hasMetadata: true,
// }
//
// const DISMANTLE = {
//     contract: '0x84ef2b5e5753bd0015df6f5a276d6593fd070268',
//     name: 'DISMANTLE',
//     creator: 'Hinse',
//     tokenNumber: 20,
//     description: 'Luminous Tfuel of highest purity lies beneath ailing rocks.',
//     imgUrl:'https://arweave.net/LIbKz7ZwREnPOxSB7S-_sE2lpQyRLC2RH161u0udxHI',
//     hasMetadata: true,
// }
//
// const REBASE = {
//     contract: '0x2b3bad1d70a7ef63dabdbfcc121b66dc4470318c',
//     name: 'REBASE',
//     creator: 'Hinse',
//     tokenNumber: 1,
//     description: 'Under constant observation, we are keeping balance.',
//     imgUrl:'https://arweave.net/mrPLPjGe7J_EzNahZ4DG3PKvGf5JHletu2bViZ4SPlM',
//     hasMetadata: true,
// }

// const GuruPass = {
//     contract: '0x82ccdcd7f2e9da3a1a70277d22eb3a247850fae0',
//     name: 'GuruPass by Mystic Gurus',
//     creator: 'MysticGurus',
//     tokenNumber: 77,
//     description: 'A highly saught after way to get discounts on all things Mystic Gurus',
//     imgUrl:'https://arweave.net/33Wm119MtOf71zEnM3pzYJi0s53GZCrPSQn9IWhJ3H8',
//     hasMetadata: true,
// }

// const BangkokBuddhaBar = {
//     contract: '0x48ec2bac71c7035df3027d1fa703f5660154c52c',
//     name: 'Bangkok Buddha Bar',
//     creator: 'Micha',
//     tokenNumber: 444,
//     description: 'Bangkok Buddha Bar is the first generative profile picture collection made from acrylic paintings on the Theta blockchain. 444 Buddhas have been created from over 40 physical fine art paintings to illuminate the blockchain. Bangkok Buddha Bar can be seen as a bridge between traditional fine art and recent generative NFT art. The goal of our community is to support traditional artists and raise human consciousness.',
//     imgUrl:'https://open-theta.de/api/images/launches/BangkokBuddhaBar.jpg',
//     hasMetadata: true,
// }

// const MysticGurusVessel = {
//     contract: '0xb410e03f31c1a3bf944847c1a32775b6aab3c244',
//     name: 'THE CORE SET: Mystic Vessels',
//     creator: 'MysticGurus',
//     tokenNumber: 5081,
//     description: 'Come One, Come All, Take part in the Greatest Sale in Montavera! Mystic Gurus has ONCE AGAIN achieved a 1st in Theta History by giving the community TRUE NFT-Staking, and now you can get in on the Magic! Get your hands on the Mystic Vessel Container and use it to enter The Shrine. Unlock one of the 5000+ Generative Manifestations. Learn your Guru\'s Unique Name and Famed Reputation, and never forget to gleam from your Guru a bit of timeless philosophical wisdom. Perhaps you\'ll be one of the lucky few who unlocks a Rare Custom! To open your Mystic Vessel head to www.mysticgurus.club. On June 4th a snapshot will be taken and every 10 Gurus a wallet has will earn you a Personalized Custom Guru (PCG) to be included in the set.',
//     imgUrl:'https://open-theta.de/api/images/launches/MysticGurusVessel.jpg',
//     hasMetadata: true,
// }
//
// const MysticGurusCoreSet = {
//     contract: '0x8131c534c4cbed1b9873b8a7ae63cc1686087daf',
//     name: 'THE CORE SET: Gurus',
//     creator: 'MysticGurus',
//     tokenNumber: 6000,
//     description: 'The Great Guru of Yonder - Like all Spectral Gurus of Yesteryear - is a shape-shifting entity, and he chooses his form after a Seeker has read the Golden Words from the Mystic Vessel. Your guru is one of the Great Guru’s countless forms. He has chosen to appear to you in this way to teach you something about… You. Tell me, Seeker. What do YOU see? ',
//     imgUrl:'https://open-theta.de/api/images/launches/MysticGurus-CoreSet.jpg',
//     hasMetadata: true,
// }

// const SmokedFish = {
//     contract: '0x313ca37a19327c1df7b24bf95103e28f2dede466',
//     name: 'Smoked Fish',
//     creator: 'Max Theta',
//     tokenNumber: 69,
//     description: 'FISH YOUR WISH!  This first series of hand drawn Smoked Fish integrates fully into the Camp Theta project. One lucky mint will win a Metapass NFT ticket to Camp Theta \'22, valued at $1000 USD. Five rare Skully fish will be dropped redeemables for signed prints of their fish. All holders will receive a 1 of 6 badge enabled with DRM access to exclusive footage of Camp Theta \'22. Collect all 6 badges and win a ticket to Camp Theta \'23.',
//     imgUrl:'https://open-theta.de/api/images/launches/SmokedFish.jpg',
//     hasMetadata: true,
// }

// const VoxZilla = {
//     contract: '0x8e40f2556f6e24a30f88b4b796677fed485bec00',
//     name: 'VoxZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla May 2022 Collection.',
//     imgUrl:'https://open-theta.de/api/images/launches/VoxZilla.jpg',
//     hasMetadata: true,
// }

// const ThetaWisdomWeek1 = {
//     contract: '0x17268ec0a43bbbc66a1d1e8e2acad58e69ef1e2e',
//     name: 'Theta Wisdom May 29-June 4',
//     creator: 'NanaimoTrader',
//     tokenNumber: 0,
//     description: 'Ever wish you had more knowledge of the crypto markets and what the heck was happening?? Holders of each week’s NFT will have access to that week’s video of @NanaimoTrader using Technical Analysis and Volume Profile to explain REAL TIME how the price auction is unfolding in Theta and TFuel. If you have been following his postings over the last year in the official Theta trading discord room you already know the value. Each Sunday morning a video no longer than 15 mins will be uploaded to the Theta API and key levels discussed along with future scenarios of which direction Theta and TFuel prices could move to. Whether you are a minnow, whale, or somewhere in between, having access to robust information is helpful to ALL when making investment decisions. Each episode will finish with wisdom on markets, life, or wealth. Week #1 of the Pilot Project - We will discuss the NanaimoTrader Pilot Project, how it got started and why (along with a really good trading story!), followed by FRESH technical analysis of Theta and TFuel. Featured art by ThetaZilla and that Zilla is for sure holding some Theta! Visit: https://www.tradehealthy.com/vitamints',
//     imgUrl:'https://arweave.net/8tmzpFFJyeZvdFXwH5tGA5PcfzLdLcXsLtFJ5u9uQsE',
//     hasMetadata: true,
// }

// const ThetaWisdomWeek2 = {
//     contract: '0xdf41d8e965ad8f5dfb553e86e0d1298fab92a7d0',
//     name: 'Theta Wisdom June 5-June 11',
//     creator: 'NanaimoTrader',
//     tokenNumber: 0,
//     description: 'Week #2 of the Pilot Project offers FRESH technical analysis of Theta and TFuel. Some thoughts at the end of the pros and cons of holding crypto with “Diamond Hands”. To focus on the concept, the diamond hands art of ThetaDiamond will be featured! Visit: https://www.tradehealthy.com/vitamints',
//     imgUrl:'https://arweave.net/T0VGrw3ealYB-ZpCFKgrLhnncq4PiaCRRBVsgRCc8t8',
//     hasMetadata: true,
// }
//
//
// const PCG = {
//     contract: '0x3f52598d03c55a10394ce0bf5facf9c714eeadb2',
//     name: 'The Mystic Gurus: #PCG',
//     creator: 'MysticGurus',
//     tokenNumber: 0,
//     description: 'In the Great Guru’s Primordial Essence of Ego (aka P.E.E.) exists the potential to become anything the mind can design. As such, the Great Guru remains formless prior to the Conception of Creation, awaiting You, Seeker… Awaiting your design. Go and find your Headmaster. Share with him your dreams. The Great Guru awaits in bubbles.',
//     imgUrl:'https://arweave.net/Ba0EO0Uq1qjA7d1zck-BdAVPJ_V-D6dvlA-7qJloGS4',
//     hasMetadata: true,
// }

// const ThetaWisdomWeek3 = {
//     contract: '0xa4689893a0719a367fa2dc36a3aebd0f0bcc8707',
//     name: 'Theta Wisdom June 12-June 18',
//     creator: 'NanaimoTrader',
//     tokenNumber: 0,
//     description: 'Ever wish you had more knowledge of the crypto markets and what the heck was happening?? Holders of each week’s NFT will have access to that week’s video of @NanaimoTrader using Technical Analysis and Volume Profile to explain REAL TIME how the price auction is unfolding in Theta and TFuel. If you have been following his postings over the last year in the official Theta trading discord room you already know the value. Each Sunday morning a video no longer than 15 mins will be uploaded to the Theta API and key levels discussed along with future scenarios of which direction Theta and TFuel prices could move to. Whether you are a minnow, whale, or somewhere in between, having access to robust information is helpful to ALL when making investment decisions. Each episode will finish with wisdom on markets, life, or wealth. Week #3 of the Pilot Project provides more timely and FRESH technical analysis of Theta and TFuel. I’ll also share one of my favorite indications to “BUY BUY BUY!” This week\'s featured art leaps at us from ThetaFrogs. Visit: https://www.tradehealthy.com/vitamints',
//     imgUrl:'https://arweave.net/qnJxPzTTuQV9DiPImyR9dmQ-j_ECuSyHRHLKXjP8tz4',
//     hasMetadata: true,
// }

// const ArenaBulls = {
//     contract: '0x4ec2d9161f98ab2b44106495baacd236dfa1b67a',
//     name: 'ArenaBulls',
//     creator: 'ThetaBulls',
//     tokenNumber: 293,
//     description: 'After risking it all in the Arena, these Bulls have been claimed by those victorious! Forever Bullish, forever Theta!!!',
//     imgUrl:'https://arweave.net/wnJ3EhGPVWeqfA-abVWDoVi5nnUHW06ashaS_y6MPv0',
//     hasMetadata: true,
// }
//
// const King = {
//     contract: '0xf11e25ec1114bf61a360cf744fb7353b09aaba27',
//     name: 'King / All Inclusive Event Ticket',
//     creator: 'ThetaCon',
//     tokenNumber: 25,
//     description: 'One guest room with a King bed for the evenings of December 2 & 3, one ticket for the full weekend event, $250 food and beverage credit to utilize at any onsite dining/bar option. For more info visit https://thetacon.org',
//     imgUrl:'https://arweave.net/m8ggXje-gK-uT6pkVthKz2qq_DCjqYh7lkbCSr6ymBc',
//     hasMetadata: true,
// }
//
// const Queen = {
//     contract: '0x5bdc70774fa1bb0e076ee6c0720316ace75671d4',
//     name: 'Queen / All Inclusive Event Ticket',
//     creator: 'ThetaCon',
//     tokenNumber: 25,
//     description: 'One guest room with two Queen beds for the evenings of December 2 & 3, one ticket for the full weekend event, $250 food and beverage credit to utilize at any onsite dining/bar option. For more info visit https://thetacon.org',
//     imgUrl:'https://arweave.net/G-anO4TWzKJDHS0GKCH8dXZE1vo_5v2dO7Ap_dAB014',
//     hasMetadata: true,
// }
//
// const Person = {
//     contract: '0x5d814ddbafbbb0dad45f2b8f8aac98d3c82bda57',
//     name: 'In Person Event Ticket',
//     creator: 'ThetaCon',
//     tokenNumber: 50,
//     description: 'One In Person ticket for the full weekend event. For more info visit https://thetacon.org',
//     imgUrl:'https://arweave.net/Be0UeDuzwm4tf0XNeUAl4YVOtI_eqs-QDw-5i0wMTZU',
//     hasMetadata: true,
// }
//
// const MysticalMushrooms = {
//     contract: '0x1c27f9c425040592b4d39988f097e51c8e4bd587',
//     name: 'Mythical Mushrooms',
//     creator: 'Barrizan',
//     tokenNumber: 1111,
//     description: 'Mushrooms have long been an unsung hero which have significantly impacted humans throughout our history. Whether the mushroom\'s purpose has been to poison enemies, heal loved ones, enhance intimate experiences, bring us closer to the spiritual world, or elevate our taste buds, mushroom\'s deserve a folk-lore reputation in the modern era and we are ready to give it to them! Each Mythical Mushroom is created with elaborate artwork, passion and a unique narrative in which the scientific and mythical elements of art and story-telling collide.',
//     imgUrl:'https://arweave.net/vf9Ay703a4466DC_Aw3X8wfMvPKt324XN3Rh7iLWE6w',
//     hasMetadata: true,
// }
//
// const ThetaWisdomWeek4 = {
//     contract: '0x3028938de361ec872c1e59d406a4916ff7b403c3',
//     name: 'Theta Wisdom June 19-June 25',
//     creator: 'NanaimoTrader',
//     tokenNumber: 0,
//     description: 'Ever wish you had more knowledge of the crypto markets and what the heck was happening?? Holders of each week’s NFT will have access to that week’s video of @NanaimoTrader using Technical Analysis and Volume Profile to explain REAL TIME how the price auction is unfolding in Theta and TFuel. If you have been following his postings over the last year in the official Theta trading discord room you already know the value. Each Sunday morning a video no longer than 15 mins will be uploaded to the Theta API and key levels discussed along with future scenarios of which direction Theta and TFuel prices could move to. Whether you are a minnow, whale, or somewhere in between, having access to robust information is helpful to ALL when making investment decisions. Each episode will finish with wisdom on markets, life, or wealth. Week #4 of the Pilot Project continues with up to date and FRESH technical analysis of Theta and TFuel. A chat at the end of the session will be about “Whales” and how they “swim”. The featured art this week is from emerging artist Charlie Lawless. Visit: https://www.tradehealthy.com/vitamints',
//     imgUrl:'https://arweave.net/bVGLr2CtRUtBmyMOmmvrngeF063p5fOwc9I2rClVSz8',
//     hasMetadata: true,
// }

// const HexoDisko = {
//     contract: '0x05f5c820f274c2510d03d0ddd6a4e2564adedfa5',
//     name: 'Hexo Disko',
//     creator: 'CykoKO',
//     tokenNumber: 60,
//     description: 'Watch out Meepies! Blorto just unleashed his evil spawn on Headz Jungle Island: Hexo Disko!',
//     imgUrl:'https://arweave.net/LhnbYMUHb3dwYkT3YLaI1zJU8tESoBV9A60PDUKZsDc',
//     hasMetadata: true,
// }

// const ZillaChain = {
//     contract: '0xe499b9d3c2483798d303082fa5bd2272c31bea28',
//     name: 'ZillaChain',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla June 2022 Collection.',
//     imgUrl:'https://arweave.net/uwQ0n0GdNLjy1rfSD77sZtIl8c__YV9POdujPVTzfvs',
//     hasMetadata: true,
// }

// const ThetaWisdomWeek5 = {
//     contract: '0x1f8f9f3a85ca3295ee7d45723d5f5acfb8827424',
//     name: 'Theta Wisdom June 26-July 2',
//     creator: 'NanaimoTrader',
//     tokenNumber: 0,
//     description: 'Ever wish you had more knowledge of the crypto markets and what the heck was happening?? Holders of each week’s NFT will have access to that week’s video of @NanaimoTrader using Technical Analysis and Volume Profile to explain REAL TIME how the price auction is unfolding in Theta and TFuel. If you have been following his postings over the last year in the official Theta trading discord room you already know the value. Each Sunday morning a video no longer than 15 mins will be uploaded to the Theta API and key levels discussed along with future scenarios of which direction Theta and TFuel prices could move to. Whether you are a minnow, whale, or somewhere in between, having access to robust information is helpful to ALL when making investment decisions. Each episode will finish with wisdom on markets, life, or wealth. Week #5 of the Pilot Project provides FRESH technical analysis of Theta and TFuel and a chat about why it PAYS to be a little CRAZY sometimes. Don\'t miss this week\'s featured art by Cyko KO! Visit: https://www.tradehealthy.com/vitamints',
//     imgUrl:'https://arweave.net/8bLJwZKNcN7kuQAHeNBI6XvZ0_ZZLoaoH7wQOixZPrU',
//     hasMetadata: true,
// }

// const Ribbitz = {
//     contract: '0x2aa686cb74d593b68c3a198e5485e0e1aa3ff13d',
//     name: 'Ribbitz',
//     creator: 'Aliengirk & Theta Frogs',
//     tokenNumber: 555,
//     description: 'An interdimensional portal has been opened, and 555 unique and original 1 of 1 amphibians came spilling forth through the gate, across time and space!',
//     imgUrl:'https://arweave.net/iGfEltur1JvE0UT9_UJSxRnLhfs-TB7Id-mVmHf4DFs',
//     hasMetadata: true,
// }

// const Commemorative = {
//     contract: '0x58bf25d2be8b366c5dfa5995f33d6f164db2d611',
//     name: 'Commemorative ThetaCon22 NFT',
//     creator: 'ThetaCon',
//     tokenNumber: 300,
//     description: 'Theta community creators aboard the Theta Wagon en route to the first-ever Thetacon in Fort Lauderdale, Florida! This commemorative Thetacon22 NFT was created by Theta community artist “Visioneer” and airdropped in July 2022 to the owners of four ThetaCon22 Fundraiser NFTs. Thank you to the 24 creators for your active role in supporting the community! Only 300 of these NFTs exist.',
//     imgUrl:'https://arweave.net/YTdUfqSih-Uc1AxwIJGZ4OTS9dYEe905-fq0rmidaIk',
//     hasMetadata: true,
// }

// const DeBurn = {
//     contract: '0x43d9c938561fa739d2a44f082101a39e91d468dd',
//     name: 'DeBURN Commemorative',
//     creator: 'Gworld',
//     tokenNumber: 0,
//     description: 'Randomly issued Common, Rare and Ultra Rare NFTs to commemorate the July 4th, 2022 NFT Multiplier Burn Event',
//     imgUrl:'https://arweave.net/Ja6Ys1L_IXmbRloMySIqbjoJin_MXcVOycJSFGFnFiY',
//     hasMetadata: true,
// }

// const SkullyFish = {
//     contract: '0xc2fa3e13a6f755cac73492c19a68bc5b816f50ad',
//     name: 'Skully Fish Print',
//     creator: 'Max Theta',
//     tokenNumber: 5,
//     description: 'This token entitles the holder to an 8x8 inch signed metal print of a Skully fish. Redeem this token by sending it to wallet: 0x36011EB9c1C932f5616d91251a606b8889aA3AD5 and emailing your shipping details to etchasketchgenius@gmail.com',
//     imgUrl:'https://arweave.net/QyyXriowm60XWGYIc4D23LqspOKTaMTcxaKRON_yn70',
//     hasMetadata: true,
// }
//
// const Badge1 = {
//     contract: '0x4adda01241eb20eae7dcec686458333909465ad1',
//     name: 'Badge 1',
//     creator: 'Max Theta',
//     tokenNumber: 69,
//     description: 'Badge 1 of 6. Collect all 6 badges and you will be airdropped a ticket to CampTheta \'23! This badge will be enabled to unlock exclusive footage of CampTheta \'22. Stay tuned!',
//     imgUrl:'https://arweave.net/QiGKAPew5d0zu-YiJZCZybzrJJh9XKhRa6nJn5S-kNY',
//     hasMetadata: true,
// }

// const ThetaWisdomWeek6 = {
//     contract: '0x36ee3d58369e46ff51f7c7fbfe81d78f399aceb0',
//     name: 'Theta Wisdom July 3-July 9',
//     creator: 'NanaimoTrader',
//     tokenNumber: 0,
//     description: 'Ever wish you had more knowledge of the crypto markets and what the heck was happening?? Holders of each week’s NFT will have access to that week’s video of @NanaimoTrader using Technical Analysis and Volume Profile to explain REAL TIME how the price auction is unfolding in Theta and TFuel. If you have been following his postings over the last year in the official Theta trading discord room you already know the value. Each Sunday morning a video no longer than 15 mins will be uploaded to the Theta API and key levels discussed along with future scenarios of which direction Theta and TFuel prices could move to. Whether you are a minnow, whale, or somewhere in between, having access to robust information is helpful to ALL when making investment decisions. Each episode will finish with wisdom on markets, life, or wealth. Week #6 of the Pilot Project finishes strong with, you got it, more FRESH technical analysis of Theta and TFuel! In addition, I’ll talk about why I am bullish on the Theta project in the long term and will discuss a personal goal I\'ve established related to TradeHealthy. ThetaBulls art closes out the pilot project series with one tough bull! Visit: https://www.tradehealthy.com/vitamints',
//     imgUrl:'https://arweave.net/1wJok6Nqk-MX3Qx6a0No2cIljdAPrJOxq693IPjTjwU',
//     hasMetadata: true,
// }

// const ThetaDragons = {
//     contract: '0xc6a368bcdc89e0a9b776efc70f841995455c5a69',
//     name: 'Theta Dragons',
//     creator: 'Theta Dragons',
//     tokenNumber: 3333,
//     description: 'There are 8 distinct locations on Theta Island awaiting those brave enough to seek out the lost Relics. Do you dare embark on this adventure and attempt to tame a Dragon of your own? With 3,333 Dragons unleashed, The Lair is busier than ever... and the hunt to locate the Relics and activate the Gateway of the Dragons has just begun.',
//     imgUrl:'https://arweave.net/7PdSXUMN0_Uy576Fj61pqye542xvWLSHKOG_mQalzAE',
//     hasMetadata: true,
// }

// const Cyborg = {
//     contract: '0x75d5de34dad61b9f8d3e148d1b90530bc25b4088',
//     name: 'Theta Cyborg',
//     creator: 'The Koan Circle',
//     tokenNumber: 33,
//     description: 'Bust of a base-model cyborg use by Theta to extract materials from the exo-colonies and asteroids. They are resistant to oxide, high temperatures, gamma rays and toxic fumes as sulphur, present in some of the exo-colonies\' atmospheres.',
//     imgUrl:'https://arweave.net/gqNoPa7Ydmk-CMk2WOR0TS3j08E0GCfD_dsAg0E0ABA',
//     hasMetadata: true,
// }
//
// const Connection = {
//     contract: '0xd9384c41ddb39efb4f5c9f5d5ed8e46e7a8363cb',
//     name: 'Connection',
//     creator: 'The Koan Circle',
//     tokenNumber: 10,
//     description: 'This picture, shown at the great hall of Historic Theta Modules, represents the birth of Node technology that preceded The Dyson Sphere. It symbolises the union between the human race and the mysterious alien force that communicated with us centuries ago.',
//     imgUrl:'https://arweave.net/4RkyDjaa6dxnsypAhYzXZQwtuJZdMKSrILNbC_lRewo',
//     hasMetadata: true,
// }

// const ThetaConPunkCity = {
//     contract: '0x97ca4d44418eab268bb54cff1cac83ca3d3f20af',
//     name: 'ThetaCon Punk City',
//     creator: 'ThetaPunks',
//     tokenNumber: 36,
//     description: 'Tommy, Thance, and Ken were airdropped to a few lucky owners of the ThetaCon Punk City NFT from the ThetaCon22 Fundraiser collection on OpenTheta.',
//     imgUrl:'https://arweave.net/LjK_KeeepHXe0WYyMOl_APhXXe0mjcfVuXO55FBTeKc',
//     hasMetadata: true,
// }

// const Badge2 = {
//     contract: '0x0a5bbad7dcf2b7015edc9c28483713a7b3d74766',
//     name: 'Badge 2',
//     creator: 'Max Theta',
//     tokenNumber: 16,
//     description: 'Badge 2 of 6. Collect all 6 badges and you will be airdropped a ticket to CampTheta \'23!',
//     imgUrl:'https://arweave.net/8fgyIFLMd_Ukwf5oNcIdhipAKNNalo5J4AVuvJqbsM4',
//     hasMetadata: true,
// }
//
// const Badge3 = {
//     contract: '0xdce395baa164f5dd2110713f730910554bd65f17',
//     name: 'Badge 3',
//     creator: 'Max Theta',
//     tokenNumber: 8,
//     description: 'Badge 3 of 6. Collect all 6 badges and you will be airdropped a ticket to CampTheta \'23!',
//     imgUrl:'https://arweave.net/HiRWfLM0WiYvCOPOMnlMjRF29z_47t5K6BO_2GkGijs',
//     hasMetadata: true,
// }


// const ZillAI = {
//     contract: '0xa4c919e9c07c4e54283747e67afdf0cd8302183d',
//     name: 'Zill.A.I',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla July 2022 Collection.',
//     imgUrl:'https://arweave.net/psoP0gKi5WYFiIIL7V5xya9sy4KrSn2MwfFBmiP0460',
//     hasMetadata: true,
// }

// const Sheep = {
//     contract: '0x9e30fb175abacc42b93225e208e809968c23029e',
//     name: 'Computer Made Sheep: The Golden Sheep',
//     creator: 'dadbean & okdollface',
//     tokenNumber: 4242,
//     description: 'Computer Made Sheep is a unique multi-contract Profile Pic based gameified NFT experience. The sheep come first, then the wolves. The wolves generate rewards but must also eat rewards to survive. A dead wolf can be revived by eating a sheep. The last wolf(s) alive can claim the final reward.',
//     imgUrl:'https://arweave.net/ZBXtt8HbuGZtSGsayuUvTFvlBKOT2lL9TCjXAz7fzMo',
//     hasMetadata: true,
// }

// const ThetaWisdom = {
//     contract: '0x447839df51476fab87deb1a366cb095777ccabdc',
//     name: 'ThetaWisdom PP - Live Event',
//     creator: 'NanaimoTrader',
//     tokenNumber: 72,
//     description: 'Bonus drop for HODL’s of all six ThetaWisdom pilot project NFTs. This NFT gives exclusive access to a live event, and possibly future perks. Visit www.TradeHealthy.com/vitamints for more info',
//     imgUrl:'https://arweave.net/mY730wUtpe13q_pi3mdtcWJC2ukJCk03LYL993O02EI',
//     hasMetadata: true,
// }

// const ZillaRedeemable = {
//     contract: '0x58e1c408c72587a96b93ade59a5cf0e29226b393',
//     name: 'ZillaRedeemables',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 0,
//     description: 'Zilla Redeemables are physical NFTs received via an airdrop from The ThetaZillaClub. Redeem your items at https://thetazillaclub.com/ using the portal. NFTs are burnt upon redemption! For more information visit https://discord.gg/thetazillaclub',
//     imgUrl:'https://arweave.net/8r8oYMUoIkcGoeaBn0kjbyFKj_p2-0YN4942HxkCPRw',
//     hasMetadata: true,
// }

// const FightForCMC = {
//     contract: '0x6449f9e18f3afb470be2038b271090412890f264',
//     name: 'Fight for CMC',
//     creator: 'ThetaLands',
//     tokenNumber: 0,
//     description: 'FIGHT for Coinmarketcap!\n' +
//         'The crypto space, with its thousands of cryptocurrencies, projects, founders and brandings is a ready-made playground for all these different characters.\n' +
//         'As such, it has become a battle for volume of interest in order to climb the ranks of Coinmarketcap.\n' +
//         ' \n' +
//         'This collection features a mixture of anime and comic characters, each with different skills, skins, power levels, super and ultimate attacks. \n' +
//         'Of course, we keep Theta at heart and FIGHT for CMC has a strong focus on Theta Network, Theta Labs, and the community with a lot of powerful characters and ultimate attacks like „The Cutting Edge Technology“ just to mention one.\n' +
//         'We place a strong focus on collaborations with other NFT projects in order to bring the NFT community together.\n' +
//         'We have already been given the go ahead from most Theta NFT projects to create a suitable, unique and strong fighter for our collection and offer special ThetaLands NFT- rewards for holders of their own NFTs.\n' +
//         'This will increase their value with additional utilities and push the adoption of Theta NFTs.\n' +
//         'Over time, there will be consistent releases of additional characters to keep the scene fresh and exciting, as well as storyboard comics to progress the narrative.\n' +
//         'The fighters are shown and minted on limited character sheets and 3D avatars in the type “OG NFTs". There will be more different NFT art later on. \n' +
//         'OG NFTs offer a lot of different utilities like exclusive merch store access, making-off pics & videos via DRM and more special rewards through my.ThetaLands DApp. \n' +
//         'You also will be able to particpate in the legendary "AVATARI" airdrop if you are holding the character sheet and will receive a starter- package of 5 AVATARI NFT- attributes for your character including a NFT- body, -skin,- skill,- super and- ultimate attack, usable in the upcoming FIGHT for CMC- fighting game and future game- and metaverse developments.\n' +
//         'This is the beginning of ThetaLands\' FIGHT for CMC collection and game developments.\n' +
//         'A crossover of technology and art!',
//     imgUrl:'https://arweave.net/EfJen-CbAfsGaZetN3lKlmp_BRsqUS9SZTYZYgmWC-A',
//     hasMetadata: true,
// }

// const ThetaPonsS1 = {
//     contract: '0x7313341085efd1dcf197f233cff3253fa966f4c0',
//     name: 'ThetaPons S1',
//     creator: 'ThetaPons',
//     tokenNumber: 0,
//     description: 'Trading card game NFT project. Season 1 collection!',
//     imgUrl:'https://arweave.net/O7srX0plF8Ol8xODN9NG-CN7Cw-NpNNUGRWXRGsYc-s',
//     hasMetadata: true,
// }

// const BabyZilla = {
//     contract: '0x05f52f8185d4b07a10ec4b871ed3cdb63d329b49',
//     name: 'BabyZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla August 2022 Collection.',
//     imgUrl:'https://arweave.net/7_nLhWtdlgrvH9phyb_Spy1G0c2bW7teSRUFlb2QPBk/Cover.png',
//     hasMetadata: true,
// }

const GoldenMeepy = {
    contract: '0x04fe135f9aa102f8b17fe9c8f61d4cc8b26e4da7',
    name: 'Golden Meepy',
    creator: 'CykoKO',
    tokenNumber: 0,
    description: 'Behold the Golden Meepy! As a winner, the Golden Meepy will grant you powers never known!',
    imgUrl:'https://arweave.net/A2ubJyVgRpuBCIOCYjqtIS_Agnno8rIGcmRqU2epSq8',
    hasMetadata: true,
}

// addProject(SemtexSamurai)
// addProject(MitchAlien)
// addProject(JieyiApe)
// addProject(KyleHuman)
// addProject(ThetaPugs);
// addProject(ThetaZilla);
// addProject(ThetaPermabull);
// addProject(PluggedIn);
// addProject(CleanupCrew);
// addProject(TFuelDreams);
// addProject(ThetaverseImmersion);
// addProject(SelfIllusion);
// addProject(ThetaMan2);
// addProject(Earth);
// addProject(Gods);
// addProject(ThetiansGalaxy);
// addProject(THETAVERSE);
// addProject(ThetaBulls);
// addProject(MeemopMania);
// addProject(TRSBulls);
// addProject(MysticGurus2021);
// addProject(ThetaTeeth);
// addProject(ThetaBetFirstEdition);
// addProject(ThetaSnow);
// addProject(XMAS);
// addProject(RARE);
// addProject(SantaBull)
// addProject(Goldzilla)
// addProject(Bobzilla)
// addProject(Astrozilla)
// addProject(Firezilla)
// addProject(Zillarina)
// addProject(WarmedByTFuel2021)
// addProject(ThetiansGalaxyII)
// addProject(EVENT_PROXIMA)
// addProject(BarrizanCustom)
// addProject(ThetaManSpacewalk)
// addProject(ThetaManAsteroidBelt)
// addProject(ThetaManIapetus)
// addProject(PugGames)
// addProject(WarmedByTFuelBigDog)
// addProject(ThetaTime)
// addProject(THETANET)
// addProject(GojiraIsland)
// addProject(GreekGodZilla)
// addProject(LiquidPulse)
// addProject(PixZilla)
// addProject(PINEAPPLE)
// addProject(SpacePunk)
// addProject(NewYearZilla)
// addProject(ZillaCustoms)
// addProject(TFuelTonic)
// addProject(HealthyMeemop)
// addProject(ThetaWords)
// addProject(TBILLMultiplier)
// addProject(DailyDiamond)
// addProject(EVENTPROXIMAPostEvent)
// addProject(OrbZilla)
// addProject(CommunitySupport)
// addProject(Gurus4Ukraine)
// addProject(WeStandWithUkraine)
// addProject(HighFlyerClub)
// addProject(Metapass)
// addProject(indientz)
// addProject(TrophyRoomxAirJordan1)
// addProject(VideoEvidenceCards)
// addProject(TheExplosion)
// addProject(UkraineReliefAid)
// addProject(MegaMeemop)
// addProject(TNS)
// addProject(ThRune)
// addProject(ThEye)
// addProject(AbsoluteGosu)
// addProject(ZillaPatch)
// addProject(KingsArtwork)
// addProject(BigDog1111Sticker)
// addProject(THETARocket)
// addProject(ThetaCon22)
// addProject(AlienlikeSticker)
// addProject(Thegon)
// addProject(Whitedove)
// addProject(Wes)
// addProject(Mitch)
// addProject(JieYi)
// addProject(CargoShip)
// addProject(DysonSphere)
// addProject(SUBCHAIN)
// addProject(OvergrownThetahead)
// addProject(BloomingThetahead)
// addProject(FrozenThetahead)
// addProject(ChaoticThetahead)
// addProject(ValidatingThetahead)
// addProject(GuardianThetahead)
// addProject(EdgyThetahead)
// addProject(WinterThetaboard2022)
// addProject(ThetaNameServiceBadge)
// addProject(TeddyB)
// addProject(ThomasOnTheta)
// addProject(DailyDiamondPerks)
// addProject(ThetaSkies)
// addProject(VixensKittens)
// addProject(C4C)
// addProject(Bullit)
// addProject(QA)
// addProject(INFLUX)
// addProject(INFLOW)
// addProject(COMPOUND)
// addProject(DISMANTLE)
// addProject(PREBURNER)
// addProject(REBASE)
// addProject(GuruPass)
// addProject(BangkokBuddhaBar)
// addProject(MysticGurusCoreSet)
// addProject(MysticGurusVessel)
// addProject(SmokedFish)
// addProject(VoxZilla)
// addProject(ThetaWisdomWeek1)
// addProject(ThetaWisdomWeek2)
// addProject(PCG)
// addProject(ThetaWisdomWeek3)
// addProject(ArenaBulls)
// addProject(King)
// addProject(Queen)
// addProject(Person)
// addProject(MysticalMushrooms)
// addProject(ThetaWisdomWeek4)
// addProject(HexoDisko)
// addProject(ZillaChain)
// addProject(ThetaWisdomWeek5)
// addProject(Ribbitz)
// addProject(Commemorative)
// addProject(DeBurn)
// addProject(SkullyFish)
// addProject(Badge1)
// addProject(ThetaWisdomWeek6)
// addProject(ThetaDragons)
// addProject(Cyborg)
// addProject(Connection)
// addProject(ThetaConPunkCity)
// addProject(Badge2)
// addProject(Badge3)
// addProject(ZillAI)
// addProject(Sheep)
// addProject(ThetaWisdom)
// addProject(ZillaRedeemable)
// addProject(FightForCMC)
// addProject(ThetaPonsS1)
// addProject(BabyZilla)
addProject(GoldenMeepy)

// const URA1 = {
//     name: 'Mythical Mushrooms',
// }
//
// projects.updateProject('0x1c27f9c425040592b4d39988f097e51c8e4bd587', URA1).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });

// const URA2 = {
//     description: 'Ever wish you had more knowledge of the crypto markets and what the heck was happening?? Holders of each week’s NFT will have access to that week’s video of @NanaimoTrader using Technical Analysis and Volume Profile to explain REAL TIME how the price auction is unfolding in Theta and TFuel. If you have been following his postings over the last year in the official Theta trading discord room you already know the value. Each Sunday morning a video no longer than 15 mins will be uploaded to the Theta API and key levels discussed along with future scenarios of which direction Theta and TFuel prices could move to. Whether you are a minnow, whale, or somewhere in between, having access to robust information is helpful to ALL when making investment decisions. Each episode will finish with wisdom on markets, life, or wealth. Week #2 of the Pilot Project offers FRESH technical analysis of Theta and TFuel. Some thoughts at the end of the pros and cons of holding crypto with “Diamond Hands”. To focus on the concept, the diamond hands art of ThetaDiamond will be featured! Visit: https://www.tradehealthy.com/vitamints',
// }
//
// projects.updateProject('0xdf41d8e965ad8f5dfb553e86e0d1298fab92a7d0', URA2).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const URA3 = {
//     description:  'Your Companion In Cold Times.',
// }
//
// projects.updateProject('0x6d7354975376034feb11d218ba1ce6bf950adca6', URA3).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const URA4 = {
//     description:  'Get Soaked Into Chaotic Calmness.',
// }
//
// projects.updateProject('0x52d6063db78758700e5158664ba843a44ada4b38', URA4).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const URA5 = {
//     description:  'Pure Power Of Validating God.',
// }
//
// projects.updateProject('0xbb03a953cf475a05b0d428fd9a4a8e5549dd2b1a', URA5).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const URA6 = {
//     description:  'Pure Power Of Guardian Nodes.',
// }
//
// projects.updateProject('0x501dbc08b61bcf71154fc67a347cd118f7869f51', URA6).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const URA7 = {
//     description:  'Pure Computing Power.',
// }
//
// projects.updateProject('0xdeba6df323b988bd1ad3fb5f9f5d4e00740beb48', URA7).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });

//
// const TBILL = {
//     description:  'TBILL Multiplier increases the staking reward on TBILL.',
// }
//
// projects.updateProject('0x172d0bd953566538f050aabfeef5e2e8143e09f4', TBILL).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const CS = {
//     tokenNumber: 56,
// }
//
// projects.updateProject('0x4121dcc6eda2e8785a5cde3a830a3652082694a5', CS).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
//
// const G4U = {
//     tokenNumber: 17,
// }
//
// projects.updateProject('0x006eb841a7b036119d02ec1a06a1756f37decaab', G4U).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const WSU = {
//     tokenNumber: 2,
// }
//
// projects.updateProject('0xd32326e850218a7dc5842bf3657b55d2921177fa', WSU).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// const TRxAJ = {
//     imgUrl: "https://arweave.net/-iuKaSm7W1vxXz7XH6HvnDssmX9zRXDxbDj_Ob-LwIw",
// }
//
// projects.updateProject('0xb3bce1f2fc49300825a4071d80dd921075dc78fa', TRxAJ).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
// const p2 = {
//     contract: '2222',
//     name: 'hi',
//     creator: 'me',
//     tokenNumber: 10,
//     description: '....',
//     imgUrl:'',
//     hasMetadata: false,
// }

// const nft1 = {
//     itemId: 12252,
//     nftContract: "0x172d0bd953566538f050aabfeef5e2e8143e09f4",
//     tokenId: 88813,
//     seller: "0xf58840eae89d2d1833bb767df027fea21e82e4dc",
//     owner: "0xe169470146979a8ba6b5eb1f80f28a7d35b016d3",
//     category: "Utility",
//     price: "2750000000000000000000000",
//     isSold: true,
//     createdTimestamp: 1651258800000,
//     soldTimestamp: 1651260720000,
//     name: 'De Great Merge - 2M TBILL - 2X Multiplier',
//     imgUrl:'https://ipfs.io/ipfs/QmVTgE2W4v1KZviVHJDX55NyQLQhracy2EzXQrdevoh14K/2x/2M/TB.gif',
//     description:"Thank you for participating in De Great Merge.",
//     marketAddress: "0xbb5f35d40132a0478f6aa91e79962e9f752167ea"
// }
//
// const nft2 = {
//     itemId: 2.json,
//     tokenId: 1.json,
//     seller: "seller",
//     owner: "owner",
//     category: "category",
//     price: "1000",
//     isSold: true,
//     createdTimestamp: "10020304",
//     name: 'test2',
//     imgUrl:'opentheta.io',
//     nftContract: '2222',
// }
//
// const nft3 = {
//     itemId: 3.json,
//     tokenId: 1.json,
//     seller: "seller",
//     owner: "owner",
//     category: "category",
//     price: "100",
//     isSold: false,
//     createdTimestamp: "1002004",
//     name: 'test3',
//     imgUrl:'opentheta.io',
//     nftContract: '2222',
// }
//
// const nft4 = {
//     itemId: 4,
//     tokenId: 1.json,
//     seller: "seller",
//     owner: "owner",
//     category: "category",
//     price: "100",
//     isSold: false,
//     createdTimestamp: "1002004",
//     name: 'test4',
//     imgUrl:'opentheta.io',
//     nftContract: '2222',
// }
//
// const updateP = {
//     tokenNumber: 100,
//     description: 'Hi',
//     imgUrl:'opentheta'
// }
//
// const updateN = {
//     isSold: true
// }
//
// console.log("addProject");
// addProject(p1);
// addProject(p2);

// console.log("addNFT");
// addNFT(nft1);
// addNFT(nft2);
// addNFT(nft3);
// addNFT(nft4);


// projects.getAllProjects().then(res => {
//     console.log("getAllProjects");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to get all projects');
// });
//
//
// projects.getProjectByContract('1111').then(res => {
//     console.log("getProjectByContract");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to get project');
// });
//
//
// projects.getProjectsNFTs('2222').then(res => {
//     console.log("getProjectsNFTs");
//     console.log(res);
// });
//
//
// projects.getProjectsNFTsOnMarket('2222').then(res => {
//     console.log("getProjectsNFTsOnMarket");
//     console.log(res);
// });
//
//
// let update = { isSold: true, soldTimestamp: '1646126054000', owner: "0x1fa3d87e1c5e60055549a3135af15397d15d0448" }
// //
// projects.updateNFT(2133, update).then(res => {
//     console.log("updateNFT");
//     console.log(res);
// });
//
//
// projects.getProjectsNFTsSold('2222').then(res => {
//     console.log("getProjectsNFTsSold");
//     console.log(res);
// });
//

// projects.deleteNFT(8490).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log("deleteNFT");
//     console.log('failed to delete nft');
// });
//
// projects.deleteNFT(2982).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log("deleteNFT");
//     console.log('failed to delete nft');
// });
//
//
// projects.getNFTById(49).then(res => {
//     console.log("getNFTById");
//     console.log(res);
// })
//
//
// projects.getNFTById(503).then(res => {
//     console.log("getNFTsOnMarket");
//     console.log(res);
// })
//
//
// projects.deleteProject('1111').then(res => {
//     console.log("deleteProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to delete project');
// });
//
// const updateThetaBoard = {
//     imgUrl: "https://nft.thetaboard.io/nft/assets/thetaboard/early_adopter.png",
// }
//
// const updateThetaMan = {
//     imgUrl: "https://www.tstake.io/images/nft_1.jpg",
// }
//
// const updateThetaPunks = {
//     imgUrl: "https://arweave.net/HVED6DphStDZzz0vhQgI_INO4qwfzEit-oQfih3k5DU",
// }
//
// const updateThetaBoard2021 = {
//     image: "ThetaBoard 2021",
// }
// const updateThetaZilla = {
//     contract: "0x371a0a0c9aad38c2d5dd33a679aea4b5fb521089",
// }
//
//
// projects.updateProject('0xf610fb0063c7fee8d5caae7e26d67c32dbc7d2d4', updateThetaZilla).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
// projects.updateProject('0x34f573de2416c8c4e968ca16a18b46c2a7d833c2', updateThetaBoard).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// projects.updateProject('0x7500cbde64b1bf956351aa4ea2fa4ee1467a3428', updateThetaBoard2021).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// projects.updateProject('0xff290451c54a6ebd390287b4db18058a0e892cde', updateThetaMan).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
// projects.updateProject('0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473', updateThetaPunks).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
//

// projects.getAllNFTs().then(res => {
//     console.log("getAllProjects");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to get all projects');
// });
//
// projects.getAllProjects().then(res => {
//     console.log("getAllProjects");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to get all projects');
// });
//
//
// projects.deleteProject('0xe45610e578d4eb626121f55a61ab346a619b7d99').then(res => {
//     console.log("deleteProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to delete project');
// });

// projects.getProjectsNFTsOnMarket('0x34f573de2416c8c4e968ca16a18b46c2a7d833c2').then(res => {
//     console.log(res);
// });