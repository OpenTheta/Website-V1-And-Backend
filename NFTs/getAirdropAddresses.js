const Web3 = require('web3');
const ethers = require('ethers');
const axios = require('axios');

let currentProvider = new Web3.providers.HttpProvider('https://eth-rpc-api.thetatoken.org/rpc');
let provider = new ethers.providers.Web3Provider(currentProvider);
let marketplaceAddress = "0xd539558887B6744C52C595Cb24fB9EFA664BA814";
let projects = [
    {
        name: "SelfIllusion",
        address: "0x74767412cfd446dba5994bd9646a5669106246e4",
        tokenNumber: 50
    },
    {
        name: "ThetaverseImmersion",
        address: "0xc2c4cb5a9e50590e1e71f378d5fef744176b0459",
        tokenNumber: 100
    },
    {
        name: "TFuelDreams",
        address: "0x58bbda670702b8217c7428fe25c28c95a6e3963c",
        tokenNumber: 250
    },
    {
        name: "CleanupCrew",
        address: "0x44c9239b1d9562aae04574c97710207e68f74816",
        tokenNumber: 350
    },
    {
        name: "PluggedIn",
        address: "0x5bfcf20d4f141f03ffbbe009b193040cd63083b0",
        tokenNumber: 500
    }
];

let baseConfig = {
    address: "",
    "0x74767412cfd446dba5994bd9646a5669106246e4": 0,
    "0xc2c4cb5a9e50590e1e71f378d5fef744176b0459": 0,
    "0x58bbda670702b8217c7428fe25c28c95a6e3963c": 0,
    "0x44c9239b1d9562aae04574c97710207e68f74816": 0,
    "0x5bfcf20d4f141f03ffbbe009b193040cd63083b0": 0,
}

const contractThetaPunksABI = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
];
let owners = [];

// owners = [
//     {
//         address: '0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57',
//         '0x74767412cfd446dba5994bd9646a5669106246e4': 2,
//         '0xc2c4cb5a9e50590e1e71f378d5fef744176b0459': 3,
//         '0x58bbda670702b8217c7428fe25c28c95a6e3963c': 8,
//         '0x44c9239b1d9562aae04574c97710207e68f74816': 13,
//         '0x5bfcf20d4f141f03ffbbe009b193040cd63083b0': 20
//     },
// ]
let airdrop = []

    async function getAddress() {
    const contractNFTObject = new ethers.Contract(
        projects[0].address,
        contractThetaPunksABI,
        provider
    );
    for(let t = 0; t < projects[0].tokenNumber; t++) {
        let inOwners = false;
        let address = await contractNFTObject.ownerOf(t);

        for(let o=0; o<owners.length; o++){
            if(owners[o].address === address){
                owners[o][projects[0].address] += 1;
                inOwners = true
            }
        }
        if(!inOwners && address!==marketplaceAddress) {
            let owner = JSON.parse(JSON.stringify(baseConfig));
            owner.address = address;
            owner[projects[0].address] += 1
            owners.push(owner)
        }
    }

    // Search on marketplace

    let response = await axios.get(`http://opentheta.de/api/search/ALL?projects[]=[\"${projects[0].name}\"]`);
    let marketplaceData = response.data;
    for(let m=0; m<marketplaceData.length; m++) {
        let inOwners = false;

        for(let o=0; o<owners.length; o++){
            if(owners[o].address === marketplaceData[m].seller){
                owners[o][projects[0].address] += 1;
                inOwners = true
            }
        }
        if(!inOwners) {
            let owner = JSON.parse(JSON.stringify(baseConfig));
            owner.address = marketplaceData[m].seller;
            owner[projects[0].address] += 1
            owners.push(owner)
        }
    }

    // Get of first NFT holders the amount of the other NFTs

    for(let o=0; o<owners.length; o++){
        for(let p=1; p<projects.length;p++){
            const contractNFTObject = new ethers.Contract(
                projects[p].address,
                contractThetaPunksABI,
                provider
            );
            owners[o][projects[p].address] = (await contractNFTObject.balanceOf(owners[o].address)).toNumber();

        }
    }

    // Search on marketplace

    for(let p=1; p<projects.length;p++) {
        response = await axios.get(`http://opentheta.de/api/search/ALL?projects[]=[\"${projects[p].name}\"]`);
        marketplaceData = response.data;
        for(let m=0; m<marketplaceData.length; m++) {

            for(let o=0; o<owners.length; o++){
                if(owners[o].address === marketplaceData[m].seller){
                    owners[o][projects[p].address] += 1;
                }
            }
        }
    }

    console.log(owners);
    // console.log(owners.length);

    let totalAmount = 0;
    for(let o=0; o<owners.length;o++){
        let airdropAmount = 0;
        for(let c=1;c<=owners[o][projects[0].address]; c++){
            let holding = true;
            for(let p=1; p<projects.length; p++){
                if(owners[o][projects[p].address] > 0){
                    owners[o][projects[p].address] -= 1;
                } else{
                    holding = false;
                }
            }
            if(holding === true){
                airdropAmount += 1;
                totalAmount += 1;
                airdrop.push(owners[o].address)
            }
        }
        console.log(owners[o].address, airdropAmount)
    }
    console.log(totalAmount);

    let count = 0;
    let final = "[";
    for(let i = 0; i < airdrop.length; i++) {
        if(count === 60){
            final = final + "\"" + airdrop[i] + "\"" + "]";
            console.log(final);
            final = "[";
            count = 0;
        } else {
            final = final + "\"" + airdrop[i] + "\",";
            count +=1;
        }
    }
    console.log(final + "]");
    console.log(airdrop.length);


    }


getAddress()



["0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0945915005c496D52223A51b385EC049B244da7C","0xdb9C8295b95B17A1fcb27682D257eb460b926360","0xdb9C8295b95B17A1fcb27682D257eb460b926360","0x0aB70F4ecc1f3E7D51b6aE37eE14500Deff3D2b1","0xb37771edA952E963a0e66A08570764189f1c314A","0x4Cf168241cf20B725A1cb0198e41C50f9FA65587","0x3b464c069A714F4d9a12B349b6120AF74c817bAA","0x2ba14EC9FdDA2D0b67f8bD62Ce589F8310406Ba4","0x674a077aed96D2B9358fFB27996C411e9705D6dC","0x435BF47e91Fe2874E83a31Ded583702B9D18FDbb","0x435BF47e91Fe2874E83a31Ded583702B9D18FDbb","0x9B5d0426c6a11f835d2597D23c919da6e7fE1381","0x2B0Da3e19821975B697B47045C16B6fb75d56ad9","0x651556DA57658999e3c37EfADD0Bb853d8a3A446","0x99974fA28d5E7aA2875ce5D498dD514a8e52Cf59","0x45a55c9807a490220aDcb19997F921C8A7EB9732","0x857d418fD986449Abd4F8b01e6c19EE0B8f5BadB","0x5903C5c207B7B41CE595cB11Cf0faBdFb5180EB3","0x026Ae18F7eC4374dC88889d147D9689bf0FEde5E","0x026Ae18F7eC4374dC88889d147D9689bf0FEde5E","0xcdD97776F3A2f718bd1D5f8430eA048471eB9583","0x34389bA0567b32906aD729fF1104c80b510e66cF","0xd43F2feE4d3819Ea8d7bB46ff3B43B7776d11c78","0x083bB8D8732A98Efd4F45F41DEDb08f6f67c29a3","0xe3e7b5912Ba10674AEF6252B3c224509861341B3","0xcd873C11b20b9AF78750bd702582d5B1035508d0","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x37BA2C1Cb09fc05a317f9A16d42e76BF75BAAB9B","0x4f52e24a963CCCf77d66e91a8441d35dAF9Ac313"]
