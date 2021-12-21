const dataProvider2 = require("../../database2/models/dbHelpers2");
// express api server
const express = require("express");

const ethers = require('ethers');
const Web3 = require('web3');
const axios = require('axios');

const currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
const provider = new ethers.providers.Web3Provider(currentProvider);

const ABI_NFT = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
];

const router = express.Router();

async function getNFTs(project, userAddress){
    let projectAddress = project.contract
    let NFTs = []
    const contractObject = new ethers.Contract(
        projectAddress,
        ABI_NFT,
        provider
    );

    let balance = await contractObject.balanceOf(userAddress);
    if (balance > 0) {
        for (let i = 0; i < balance; i++) {
            // let myNFT;
            let tokenID = await contractObject.tokenOfOwnerByIndex(userAddress, i).catch((error) => {
                console.log(error);
            });
            // console.log(tokenID);
            let nftURI = await contractObject.tokenURI(tokenID).catch((error) => {
                console.log(error);
            });
            if (nftURI.slice(0, 4) === 'ipfs') {
                nftURI = 'https://ipfs.io/ipfs/' + nftURI.substring(7)
            }
            let response = await axios.get(nftURI);
            if (response.data.image.slice(0,4) === 'ipfs') {
                response.data.image = 'https://ipfs.io/ipfs/' + response.data.image.substring(7)
            }
            NFTs.push({
                name: response.data.name,
                imgUrl: response.data.image,
                description: response.data.description,
                tokenId: tokenID,
                nftContract: projectAddress,
                owner: userAddress,
                projectName: project.name,
            });
        }
    }
    return NFTs
}

async function getUserNFTs (address) {
    let projects = await dataProvider2.getAllProjects()

    let myNFTs = [];
    let projectNFTs = []
    for(let j = 0; j < projects.length; j++ ) {
        projectNFTs.push(getNFTs(projects[j], address))
    }

    let NFTResult = await Promise.all(projectNFTs);

    for(let i=0; i<NFTResult.length;i++){
        // console.log(NFTResult[i].length)
        for(let j=0; j<NFTResult[i].length;j++) {

            myNFTs.push(NFTResult[i][j]);
        }
    }
    return myNFTs
}

// Returns newly listed Creators
router.get('/:userAddress', (req, res)=> {
    const {userAddress} = req.params;
    getUserNFTs(userAddress).then(result => {
        res.status(200).json(result);
    })

});

// Returns newly listed NFTs on the marketplace (number = number of NFTs)
router.get('/:userAddress/:contract', (req, res)=> {
    const {userAddress, contract} = req.params;

});


module.exports = router;