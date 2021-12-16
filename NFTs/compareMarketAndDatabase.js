const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');

// let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
// let provider = new ethers.providers.Web3Provider(currentProvider);
// let marketplaceAddress = "0xd539558887B6744C52C595Cb24fB9EFA664BA814";
//
// const contractNFTABI = [
//     "function balanceOf(address _owner) view returns (uint256)",
//     "function tokenURI(uint256 _tokenId) view returns (string memory)",
//     "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
//     "function ownerOf(uint256 tokenId) view returns (address)",
// ];
//
// const contractMarketABI = [
//     "event MarketItemCreated(uint256 indexed itemId, address indexed nftContract, uint256 indexed tokenId, address seller, address owner, string category, uint256 price, bool isSold)",
//     "function createMarketItem(address nftContract, uint256 tokenId, uint256 price, string category) payable",
//     "function createMarketSale(address nftContract, uint256 itemId) payable",
//     "function createMarketCancel(address nftContract, uint256 itemId) payable",
//     "function fetchCreateNFTs() view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
//     "function fetchPurchasedNFTs() view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
//     "function getItemsByCategory(string category) view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
//     "function getListingPrice() view returns (uint256)",
//     "function getMarketItems() view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
//     "function getSalesFee() view returns (uint256)",
//     "event MarketItemSale(uint256 itemId,address nftContract,uint256 tokenId,address seller,address owner,string category,uint256 price,bool isSold)"
// ];
//
// const contractMarketObject = new ethers.Contract(
//     marketplaceAddress,
//     contractMarketABI,
//     provider
// );
//
// contractMarketObject.getItemsByCategory("GODS").then( res => {
//     for(let i=0; i<res.length; i++){
//         console.log(res[i][3])
//     }
// })

axios.get("http://opentheta.de/api/projects/0x9791ddfefadb0b1bed5f35604de262506c6ee45c/nft/on-market").then(response => {
    console.log(response.data.length)
})

