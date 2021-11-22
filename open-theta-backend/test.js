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

const ThetaPermabull = {
    contract: '0xadc8fdca07ba7066c6e2d0efd7fe8cc35846ff3c',
    name: 'ThetaPermabull',
    creator: 'Fr0zenfir3',
    tokenNumber: 444,
    description: 'By holding one of the 444 Theta Permabull badges, it shows that you are Hardcore Theta Holder.',
    imgUrl:'https://arweave.net/SA4PXBTjqAa5ee7oTuCuvfwJkzR2LtaNdwBn_S-bOfU',
    hasMetadata: true,
}

// addProject(SemtexSamurai)
// addProject(MitchAlien)
// addProject(JieyiApe)
// addProject(KyleHuman)
// addProject(ThetaPugs);
// addProject(ThetaZilla);
addProject(ThetaPermabull);

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
//     itemId: 0.json,
//     tokenId: 1.json,
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
// let update = { isSold: true, soldTimestamp: '1635773132765' }
//
// projects.updateNFT(18, update).then(res => {
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
// projects.deleteNFT(1.json).then(res => {
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

// projects.getProjectsNFTsOnMarket('0x34f573de2416c8c4e968ca16a18b46c2a7d833c2').then(res => {
//     console.log(res);
// });