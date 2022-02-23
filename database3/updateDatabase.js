const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');
const projects = require("./models/dbHelpers3");

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


const address = "0xbb5f35d40132a0478f6aa91e79962e9f752167ea";
const baseUrl = "https://explorer.thetatoken.org:8443/api/accounttx/" + address +"?type=-1&pageNumber=";
const addUrl = "&limitNumber=20&isEqualType=true&types=[%227%22]";

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);

const tokenABI = [
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
];

const marketABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "feeAddress_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "WTFuelAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creatorAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "BasisFeePoints",
                "type": "uint256"
            }
        ],
        "name": "CreatorFeeChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "userPayout",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "feePayout",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "feeAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "creatorPayout",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creatorAddress",
                "type": "address"
            }
        ],
        "name": "FeeSplit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "category",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isSold",
                "type": "bool"
            }
        ],
        "name": "MarketItemCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "category",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isSold",
                "type": "bool"
            }
        ],
        "name": "MarketItemSale",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "category",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isSold",
                "type": "bool"
            }
        ],
        "name": "MarketItemUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousBidder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "OfferCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "highestOffer",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "bidder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "category",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "OfferPlaced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "BasisFeePoints",
                "type": "uint256"
            }
        ],
        "name": "PlatformFeeChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tier",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenBalance",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "marketFeeMultiplierSale",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "creatorFeeMultiplierSale",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "marketFeeMultiplierOffer",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "creatorFeeMultiplierOffer",
                "type": "uint256"
            }
        ],
        "name": "TierChanged",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "WTFuel",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "acceptMarketItemOfferTNT20",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "cancelMarketItemOfferTNT20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "createMarketCancel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "createMarketCancelAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "category",
                "type": "string"
            }
        ],
        "name": "createMarketItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "offerPrice",
                "type": "uint256"
            }
        ],
        "name": "createMarketItemOfferTNT20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "createMarketSale",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "flipListingState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "flipTiersState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getByMarketId",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "nftContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "highestOffer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "category",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isSold",
                        "type": "bool"
                    }
                ],
                "internalType": "struct OpenThetaNFTMarket.MarketItem",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "NFTAddress",
                "type": "address"
            }
        ],
        "name": "getCreatorFeeBasisPoints",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "feeBasisPoints",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OpenThetaNFTMarket.Creator",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getSalesFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tier",
                "type": "uint256"
            }
        ],
        "name": "getTier",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "marketFeeMultiplierSale",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "creatorFeeMultiplierSale",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "marketFeeMultiplierOffer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "creatorFeeMultiplierOffer",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OpenThetaNFTMarket.Tier",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "listingIsActive",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "openThetaToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "retrieveMoney",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "sellerTiers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "tokenBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "marketFeeMultiplierSale",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "creatorFeeMultiplierSale",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "marketFeeMultiplierOffer",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "creatorFeeMultiplierOffer",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "admin_",
                "type": "address"
            }
        ],
        "name": "setAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "feeBasisPoints",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "creatorAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "NFTAddress",
                "type": "address"
            }
        ],
        "name": "setCreatorFeeBasisPoints",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "feeAddress_",
                "type": "address"
            }
        ],
        "name": "setFeeAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "OTToken",
                "type": "address"
            }
        ],
        "name": "setOpenThetaTokenAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "feeBasisPoints",
                "type": "uint256"
            }
        ],
        "name": "setSalesFeeBasisPoints",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "superAdmin_",
                "type": "address"
            }
        ],
        "name": "setSuperAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tier",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tokenBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "marketFeeMultiplierSale",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "creatorFeeMultiplierSale",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "marketFeeMultiplierOffer",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "creatorFeeMultiplierOffer",
                "type": "uint256"
            }
        ],
        "name": "setTier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "wTFuel",
                "type": "address"
            }
        ],
        "name": "setWTFuelAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "superAdmin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tiersAreActive",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "updateMarketItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

const contractMarketObject = new ethers.Contract(
    address,
    marketABI,
    provider
);

async function getMarketItem(max) {
    let finalData = []
    let promiseCount = 100
    let itemPromises = []
    for(let i=0; i<=max; i++){
        itemPromises.push(contractMarketObject.getByMarketId(i))
        if(i === max || promiseCount === 0){
            let res = await Promise.all(itemPromises).catch(e =>{
                console.log("Error getting MarketItem", e);
            });
            for(let j=0; j<res.length;j++){
                if(!res[j].price.isZero() && res[j].isSold === false) {
                    finalData.push({
                        itemId: res[j].itemId,
                        nftContract: res[j].nftContract,
                        tokenId: res[j].tokenId,
                        seller: res[j].seller,
                        owner: res[j].owner,
                        category: res[j].category,
                        price: res[j].price,
                        isSold: res[j].isSold
                    })
                }
            }
            itemPromises = []
            promiseCount = 100
        }
        promiseCount--
    }
    return finalData
}

async function getCheckData() {
    let res = await axios.get("https://open-theta.de/api/nft");
    // let res = await axios.get("http://localhost:80/api/nft");
    res = res.data
    let secondMarketData = []
    for(let i=0; i<res.length; i++){
        if(res[i].marketAddress && res[i].isSold === 0){
            secondMarketData.push(res[i].itemId)
        }
    }
    console.log(secondMarketData.length)
    let final = []
    let blockchainData = await getMarketItem(775) //4277
    // console.log(blockchainData)
    for(let i=0; i<blockchainData.length; i++){
        if(!secondMarketData.includes(blockchainData[i].itemId.toNumber())){
            // console.log(blockchainData[i])
            final.push(blockchainData[i])
        }
    }
    return final

}

// getCheckData()

function getBlockData(block) {
    try{
        // let [seller, owner, category, price, isSold] = ethers.utils.defaultAbiCoder.decode(["address", "address", "string", "uint256", "bool"], block.data);
        return ethers.utils.defaultAbiCoder.decode(["uint256"], block.topics[1])[0].toNumber()
    } catch (e) {
        // console.log(e)
        return 0
    }

}

async function creatItem(itemId, contract, tokenId, seller, owner, category, price, timestamp){
    // console.log("Add item:",  itemId[0].toNumber());
    const contractNFTObject = new ethers.Contract(
        contract,
        tokenABI,
        provider
    );
    let URI = await contractNFTObject.tokenURI(tokenId.toNumber()).catch(error => {
        console.log("Error with getting token URI from contract");
    });

    if (URI.slice(0,4) === 'ipfs') {
        URI = 'https://ipfs.io/ipfs/' + URI.substring(7)
    }
    let timeout = true
    let metadata
    while(timeout){
        timeout = false
        metadata = await axios.get(URI, {timeout: 2000}).catch(error => {
            timeout = true
            console.log("Error with getting token URI");
        });
    }
    console.log("Add item:",  itemId);

    if (metadata.data.image.slice(0,4) === 'ipfs') {
        metadata.data.image = 'https://ipfs.io/ipfs/' + metadata.data.image.substring(7)
    }

    // console.log("Add item:",  itemId[0].toNumber());
    let nft = {
        itemId: itemId,
        nftContract: contract.toLowerCase(),
        tokenId: tokenId.toNumber(),
        seller: seller.toLowerCase(),
        owner: owner.toLowerCase(),
        category: category,
        price: price.toString(),
        isSold: false,
        createdTimestamp: timestamp*1000,
        name: metadata.data.name,
        imgUrl: metadata.data.image,
        description: metadata.data.description,
        marketAddress: address,
    };
    return nft
}

async function searchMissingData(totalPageNumber) {
    let missingData = await getCheckData()
    // let missingItemIds = []
    // missingData.forEach(item => {
    //     missingItemIds.push(item.itemId[0].toNumber())
    // })
    // let blocks = []
    console.log(missingData.length)
    for(let i=1; i<=totalPageNumber; i++){
        // console.log(i)
        let response = await axios.get(baseUrl+i.toString()+addUrl);
        for( let i=response.data.body.length-1; i>=0; i--) {
            let block = response.data.body[i].receipt.Logs[2]
            // let testData = response.data.body[i]
            let itemId = getBlockData(block)
            // console.log(itemId)
            for (const item of missingData) {
                if(item.itemId.toNumber() === itemId){
                    let nft = await creatItem(itemId, item.nftContract, item.tokenId, item.seller, item.owner, item.category, item.price, response.data.body[i].timestamp)
                    await addNFT(nft);
                    missingData = missingData.filter(function (item, index, arr) {
                        if (item.itemId.toNumber() !== itemId) {
                            return item
                        }
                    })
                    if(missingData.length === 0) {
                        return
                    }
                }
            }
        }
    }


}


async function getHighestId(startId) {
    let available = true;
    let id = startId
    while(available){
        await contractMarketObject.getByMarketId(id).catch(e => {
            available = false
        })
        console.log(id)
        id++
    }
    return id - 1
}
// 768
// getHighestId(350)

axios.get(baseUrl+"1"+addUrl, {timeout: 2000}).then(response => {
    searchMissingData(response.data.totalPageNumber)

});


//
// axios.get("https://open-theta.de/api/nft").then(res => {
//     console.log(res.data.length);
// })

// for(let i=1; i<100; i++){
//     getMarketItem(i)
// }

// let Contract = require('web3-eth-contract');
//
// // set provider for all later instances to use
// Contract.setProvider('https://eth-rpc-api.thetatoken.org/rpc');
//
// let contract = new Contract(marketABI, address);
// contract.methods.getByMarketId(355).call((err, result) => {
//     if (result){
//         console.log(result)
//     } else {
//         console.log(err)
//     }
// })
