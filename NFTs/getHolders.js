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
    for(let i = 0; i < 159; i++) {
        let address = await contractNFTObject.ownerOf(i);
        if (address.toString().toLowerCase() === '0xd539558887b6744c52c595cb24fb9efa664ba814') {
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


// ["0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0xcEcf980fe14C13246fAd1dDf163E3Dc308323a89","0x7Cf07f7482910de324a0e61De4F591A88B1e0a09","0xDb7bEd8EB1629e6897CAae94B06F3356b44760e0","0xB3aEbd61490e163e33f3377a253E44725E5F07B1","0x45a2CD35777252CdaEEc79c0d135fAd5307E87f4","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x07C16eEb5afe9F1feb8dDdCf56f33ba54182a28A","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57"]

// ["0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x0c4dc2eC9dee0a294C07ABe622636f4b76b50A57","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x5618F33ee888968421E15823a8c7D8196aF88abD","0x1D6b0ce9D20B274232c812687aea4c69143a8CFe","0x1D6b0ce9D20B274232c812687aea4c69143a8CFe","0xba277B04Da2B829D40a2FC502772e4f10ff59Add","0x24533aA70e4E2fe20E1c0f8D31D71A31143679F5","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7Cf07f7482910de324a0e61De4F591A88B1e0a09","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7Cf07f7482910de324a0e61De4F591A88B1e0a09","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0xa8c4B3a4d25C201CC3B0B91F0D4B7cc8c4e0A78c","0x065a502634315b7b77efA5DE8E1c5dD957560EE0","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x4a5A044a75291CCaC3dF39B27a470251cF1149e0","0xa8c4B3a4d25C201CC3B0B91F0D4B7cc8c4e0A78c","0xa8c4B3a4d25C201CC3B0B91F0D4B7cc8c4e0A78c","0xdF1898936413aE0B0b0aa57957A72d617f87A80C","0x065a502634315b7b77efA5DE8E1c5dD957560EE0","0x76060b83cA1c55Ba363C3CBA126cc5F7AF3E9D9e","0xdF1898936413aE0B0b0aa57957A72d617f87A80C","0x098180520922E517aCe948890Fe623ebc12DEe7E","0xbD33FF25a38B9f3268A71366037D735626b55513","0x5a7FC5343F171Eb9A848ce056362E89FD2265F4F","0x1cA89DD09eB8FA5eAC5a38b645d64434a47162A8","0x5a7FC5343F171Eb9A848ce056362E89FD2265F4F","0x1cA89DD09eB8FA5eAC5a38b645d64434a47162A8","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0xbD33FF25a38B9f3268A71366037D735626b55513","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A"]

// ["0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x098180520922E517aCe948890Fe623ebc12DEe7E","0x88DC1C0267ac5F83C297C89579305FE46802629e","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x88DC1C0267ac5F83C297C89579305FE46802629e","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x88DC1C0267ac5F83C297C89579305FE46802629e","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x6E069A474cE3849572b71C7AD3DDC303e118a55C","0x00416C6d6B010A790424718447E7111Df85fE512","0xdb9C8295b95B17A1fcb27682D257eb460b926360","0xdb9C8295b95B17A1fcb27682D257eb460b926360","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x00416C6d6B010A790424718447E7111Df85fE512","0x00416C6d6B010A790424718447E7111Df85fE512","0x22F497E1e081775b969b99Fe0cD58D47723bde55","0x00416C6d6B010A790424718447E7111Df85fE512","0x57F94f3F4EDc64708A2Ba61F4E45302F69059e25","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x6E069A474cE3849572b71C7AD3DDC303e118a55C","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x03BDE53F500C1Dd186d5759e70fc37a8Dd09d75f","0xcd873C11b20b9AF78750bd702582d5B1035508d0","0x6b0090670f2Fc7B2365C06733B353Ee0F7041788","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x8058f5BFF0456957B8617CEDBc3dA1a53fE67400","0x00416C6d6B010A790424718447E7111Df85fE512","0x45a55c9807a490220aDcb19997F921C8A7EB9732","0x45a55c9807a490220aDcb19997F921C8A7EB9732","0xbAF9d909f323C19bdfCF070EE3C285caBCA5CEC8","0xE7dbe38d9c5dBC13619c708CB25EeF12eeE558BB","0x2Cbd320525C737153b4782d4D54762561Dd4acD4"]


// second airdrop
["0xcEcf980fe14C13246fAd1dDf163E3Dc308323a89","0x7Cf07f7482910de324a0e61De4F591A88B1e0a09","0xDb7bEd8EB1629e6897CAae94B06F3356b44760e0","0xB3aEbd61490e163e33f3377a253E44725E5F07B1","0x45a2CD35777252CdaEEc79c0d135fAd5307E87f4","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x40c782387a7bfE11E5918EaF23dAd3f19Cd1A884","0x07C16eEb5afe9F1feb8dDdCf56f33ba54182a28A","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x2C3DEc5DA47dF0898ca5BB6f34486AC5721aa4F8","0x5618F33ee888968421E15823a8c7D8196aF88abD","0x1D6b0ce9D20B274232c812687aea4c69143a8CFe","0x1D6b0ce9D20B274232c812687aea4c69143a8CFe","0xba277B04Da2B829D40a2FC502772e4f10ff59Add","0x24533aA70e4E2fe20E1c0f8D31D71A31143679F5","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x2D23Cf68907620Bc9f085fE7bd666C31f8AE208b","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7Cf07f7482910de324a0e61De4F591A88B1e0a09","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7Cf07f7482910de324a0e61De4F591A88B1e0a09","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0xa8c4B3a4d25C201CC3B0B91F0D4B7cc8c4e0A78c","0x065a502634315b7b77efA5DE8E1c5dD957560EE0","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x7879d2E656ce04e33348decD58B3C925EE5bfDBf","0x4a5A044a75291CCaC3dF39B27a470251cF1149e0","0xa8c4B3a4d25C201CC3B0B91F0D4B7cc8c4e0A78c","0xa8c4B3a4d25C201CC3B0B91F0D4B7cc8c4e0A78c","0xdF1898936413aE0B0b0aa57957A72d617f87A80C","0x065a502634315b7b77efA5DE8E1c5dD957560EE0","0x76060b83cA1c55Ba363C3CBA126cc5F7AF3E9D9e","0xdF1898936413aE0B0b0aa57957A72d617f87A80C","0x098180520922E517aCe948890Fe623ebc12DEe7E","0xbD33FF25a38B9f3268A71366037D735626b55513","0x5a7FC5343F171Eb9A848ce056362E89FD2265F4F","0x1cA89DD09eB8FA5eAC5a38b645d64434a47162A8","0x5a7FC5343F171Eb9A848ce056362E89FD2265F4F","0x1cA89DD09eB8FA5eAC5a38b645d64434a47162A8","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0xbD33FF25a38B9f3268A71366037D735626b55513","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104"]
["0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x098180520922E517aCe948890Fe623ebc12DEe7E","0x88DC1C0267ac5F83C297C89579305FE46802629e","0x651E1835BcF8Ebad79a3F23fe3607F1de1c93104","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x88DC1C0267ac5F83C297C89579305FE46802629e","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x88DC1C0267ac5F83C297C89579305FE46802629e","0x913Af897cd462c4627A9B1EED81Eb99BBD20a4e7","0x6E069A474cE3849572b71C7AD3DDC303e118a55C","0x00416C6d6B010A790424718447E7111Df85fE512","0xdb9C8295b95B17A1fcb27682D257eb460b926360","0xdb9C8295b95B17A1fcb27682D257eb460b926360","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x00416C6d6B010A790424718447E7111Df85fE512","0x00416C6d6B010A790424718447E7111Df85fE512","0x22F497E1e081775b969b99Fe0cD58D47723bde55","0x00416C6d6B010A790424718447E7111Df85fE512","0x57F94f3F4EDc64708A2Ba61F4E45302F69059e25","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x6E069A474cE3849572b71C7AD3DDC303e118a55C","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x03BDE53F500C1Dd186d5759e70fc37a8Dd09d75f","0xcd873C11b20b9AF78750bd702582d5B1035508d0","0x6b0090670f2Fc7B2365C06733B353Ee0F7041788","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0xBF7c8d6344f212BDEa2FCD636423EfF3C9053f7A","0x8058f5BFF0456957B8617CEDBc3dA1a53fE67400","0x00416C6d6B010A790424718447E7111Df85fE512","0x45a55c9807a490220aDcb19997F921C8A7EB9732","0x45a55c9807a490220aDcb19997F921C8A7EB9732","0xbAF9d909f323C19bdfCF070EE3C285caBCA5CEC8","0xE7dbe38d9c5dBC13619c708CB25EeF12eeE558BB","0x2Cbd320525C737153b4782d4D54762561Dd4acD4"]