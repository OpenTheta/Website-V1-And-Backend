const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);
let projectsAddress = "0x82bc05813ba10bdc12a469c3473104db1bcfcbfd";

const contractThetaPunksABI = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function approve(address to, uint256 tokenID)",
    "function getApproved(uint256 tokenId) view returns (address)",
    "event Approval(address indexed owner, address indexed to, uint256 tokenId)",
];

const contractNFTObject = new ethers.Contract(
    projectsAddress,
    contractThetaPunksABI,
    provider
);


contractNFTObject.tokenURI(100).then(uri => {
    console.log(uri)
    if (uri.slice(0,4) === 'ipfs') {
        uri = 'https://ipfs.io/ipfs/' + uri.substring(7)
    }
    axios.get(uri).then(response => {
        console.log(response.data)
    })
})