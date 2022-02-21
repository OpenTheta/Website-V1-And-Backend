const Web3 = require('web3');
const ethers = require('ethers');

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);
let projectsAddress = "0xf610fb0063c7fee8d5caae7e26d67c32dbc7d2d4";

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

owners = [];


async function getAddressToTokenId() {
    for(let i = 1; i < 116; i++) {
        let address = await contractNFTObject.ownerOf(i);
        if (address.toString().toLowerCase() === '0x059377c014cfc12DD2612EbfE9cFD1A6FC1A8883') {
            owners.push("marketplace");
            // owners.push({tokenID: i, address: "marketplace"});
            // console.log(i, "marketplace");
        } else if (address.toString().toLowerCase() === '0x0c4dc2ec9dee0a294c07abe622636f4b76b50a57') {

        } else {
            // owners.push({tokenID: i, address: address});
            // console.log(i, address);
            owners.push(address);
        }
    }
    let count = 0;
    let final = "[";
    for(let i = 0; i < owners.length; i++) {
        if(count === 60){
            final = final + "\"" + owners[i] + "\"" + "]";
            console.log(final);
            final = "[";
            count = 0;
        } else {
            final = final + "\"" + owners[i] + "\",";
            count +=1;
        }
    }
    console.log(final + "]");
    console.log(owners.length);

    // contractNFTObject.ownerOf(number).then(address => {
    //     owners.push({tokenID: number, address: address});
    //     console.log(number, address);
    // });
}

// for(let i = 0; i < 159; i++) {
//     getAddressToTokenId(i);
// }

getAddressToTokenId()