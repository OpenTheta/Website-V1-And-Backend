const projects = require("./models/dbHelpers");
//
// function addNFT (nft) {
//     projects.addNFT(nft).then(res => {
//         console.log(res);
//     }).catch(error => {
//         console.log('failed to add nft');
//         console.log(error);
//     });
// }
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
//     name: 'Theta Man',
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

const JieyiApe = {
    contract: '0x050ce846802aab7b5f34d4efb1eeb72a83ef248c',
    name: 'JieyiApe',
    creator: 'ThetaPunks',
    tokenNumber: 25,
    description: 'Special drop for holding ThetaPunks',
    imgUrl:'https://ipfs.io/ipfs/QmQNLQUao7wUFaQ8FgFjRw7xMfrQngZ5m7Y9zKmjyjcRhb',
    hasMetadata: true,
}

// const KyleHuman = {
//     contract: '0xb700ca3044fef95e17e217fe3a4a53139895d790',
//     name: 'Kyle Human',
//     creator: 'ThetaPunks',
//     tokenNumber: 71,
//     description: 'Special drop for holding ThetaPunks',
//     imgUrl:'https://ipfs.io/ipfs/QmV1B6sYGP7HmvSN9Zuj81zF55TACiUwRxBtqKzBMaxBhv',
//     hasMetadata: true,
// }

// addProject(SemtexSamurai)
// addProject(MitchAlien)
addProject(JieyiApe)
// addProject(KyleHuman)

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
//     itemId: 0,
//     tokenId: 1,
//     seller: "seller",
//     owner: "owner",
//     category: "category",
//     price: "100",
//     isSold: false,
//     createdTimestamp: "10020304",
//     name: 'test',
//     imgUrl:'opentheta.io',
//     nftContract: '1111',
// }
//
// const nft2 = {
//     itemId: 2,
//     tokenId: 1,
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
//     itemId: 3,
//     tokenId: 1,
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
//     tokenId: 1,
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
// let update = { isSold: true, soldTimestamp: '1635773132765' }
//
// projects.updateNFT(56, update).then(res => {
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
//
// projects.deleteNFT(1).then(res => {
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
// projects.getNFTsOnMarket().then(res => {
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
//
// projects.updateProject('2222', updateP).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
//
//
// projects.getAllProjects().then(res => {
//     console.log("getAllProjects");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to get all projects');
// });
//
//
// projects.deleteProject('2222').then(res => {
//     console.log("deleteProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to delete project');
// });
