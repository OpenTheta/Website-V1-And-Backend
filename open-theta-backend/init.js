const projects = require("./models/dbHelpers");


function addProject (project) {
    projects.addProject((project)).then(res => {
        console.log(res);
    }).catch(error => {
        console.log('failed to add project');
    })
}


const thetaBoard = {
    contract: '0x34f573de2416c8c4e968ca16a18b46c2a7d833c2',
    name: 'Thetaboard',
    creator: 'Thetaboard',
    tokenNumber: 1000,
    description: 'Thetaboard Early Adopter',
    imgUrl:'https://nft.thetaboard.io/nft/assets/thetaboard/early_adopter.png',
    hasMetadata: true,
}

const thetaBoard2021 = {
    contract: '0x7500cbde64b1bf956351aa4ea2fa4ee1467a3428',
    name: 'Thetaboard 2021',
    creator: 'Thetaboard',
    tokenNumber: 1000,
    description: 'Thetaboard Early Adopter',
    imgUrl:'https://nft.thetaboard.io/nft/assets/thetaboard/badge_2021.png',
    hasMetadata: true,
}


const ThetaPunks = {
    contract: '0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473',
    name: 'ThetaPunks',
    creator: 'ThetaPunks',
    tokenNumber: 10000,
    description: 'Punks On Theta',
    imgUrl:"https://arweave.net/HVED6DphStDZzz0vhQgI_INO4qwfzEit-oQfih3k5DU",
    hasMetadata: true,
}


const SemtexSamurai = {
    contract: '0x9b68d13cc9dbd72dcae02b201420262e617ddb58',
    name: 'Semtex Samurai',
    creator: 'ThetaPunks',
    tokenNumber: 22,
    description: 'Special drop for holding ThetaPunks',
    imgUrl:'https://ipfs.io/ipfs/QmQ4XdXTwkHAUbvs7fpQtFvkioJVbCpHMSx5FWVzSwnfpe',
    hasMetadata: true,
}

const MitchAlien = {
    contract: '0x7cd383e28540c8e6439dc4cd46e70fbddeb7dc0e',
    name: 'Mitch Alien',
    creator: 'ThetaPunks',
    tokenNumber: 41,
    description: 'Special drop for holding ThetaPunks',
    imgUrl:'https://ipfs.io/ipfs/QmcXTWtKLR9kWHsMQ7yefp5FF54b6Bd1rN8G6vW9eJ1tDm',
    hasMetadata: true,
}

const WesZombie = {
    contract: '0xcfe69d80cc163ad1a786a75418d495cd26b0cc81',
    name: 'Wes Zombie',
    creator: 'ThetaPunks',
    tokenNumber: 69,
    description: 'Special drop for holding ThetaPunks',
    imgUrl:'https://ipfs.io/ipfs/QmUELjUHHqoZnUzw4ayi8ffMzHcfpapPNmWMDauCufW8mx',
    hasMetadata: true,
}
const JieyiApe = {
    contract: '0x050ce846802aab7b5f34d4efb1eeb72a83ef248c',
    name: 'JieyiApe',
    creator: 'ThetaPunks',
    tokenNumber: 25,
    description: 'Special drop for holding ThetaPunks',
    imgUrl:'https://ipfs.io/ipfs/QmQNLQUao7wUFaQ8FgFjRw7xMfrQngZ5m7Y9zKmjyjcRhb',
    hasMetadata: true,
}
const KyleHuman = {
    contract: '0xb700ca3044fef95e17e217fe3a4a53139895d790',
    name: 'Kyle Human',
    creator: 'ThetaPunks',
    tokenNumber: 71,
    description: 'Special drop for holding ThetaPunks',
    imgUrl:'https://ipfs.io/ipfs/QmV1B6sYGP7HmvSN9Zuj81zF55TACiUwRxBtqKzBMaxBhv',
    hasMetadata: true,
}
const ThetaPugs = {
    contract: '0x9791ddfefadb0b1bed5f35604de262506c6ee45c',
    name: 'ThetaPugs',
    creator: 'ThetaPugs',
    tokenNumber: 10000,
    description: 'A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain',
    imgUrl:'https://imqbmq3agtaqg35bmcztbw4bmccrocpnva4oifxiebu2tqsmpqba.arweave.net/QyAWQ2A0wQNvoWCzMNuBYIUXCe2oOOQW6CBpqcJMfAI',
    hasMetadata: true,
}
const ThetaZilla = {
    contract: '0x371a0a0c9aad38c2d5dd33a679aea4b5fb521089',
    name: 'ThetaZilla',
    creator: 'ThetaZillaClub',
    tokenNumber: 10000,
    description: 'A new era of technology has spawned a legendary generation of monsters. Can you capture these digital kings?',
    imgUrl:'https://if52rjzdj3s7sutnmzxffmeh43xbijkhopajzjenqupwdohaywwa.arweave.net/QXuopyNO5flSbWZuUrCH5u4UJUdzwJykjYUfYbjgxaw',
    hasMetadata: true,
}
const ThetaPermabull = {
    contract: '0xadc8fdca07ba7066c6e2d0efd7fe8cc35846ff3c',
    name: 'ThetaPermabull',
    creator: 'Fr0zenfir3',
    tokenNumber: 444,
    description: 'By holding one of the 444 Theta Permabull badges, it shows that you are Hardcore Theta Holder.',
    imgUrl:'https://arweave.net/SA4PXBTjqAa5ee7oTuCuvfwJkzR2LtaNdwBn_S-bOfU',
    hasMetadata: true,
}
const PluggedIn = {
    contract: '0x5bfcf20d4f141f03ffbbe009b193040cd63083b0',
    name: 'PluggedIn',
    creator: 'ThetaDiamond',
    tokenNumber: 500,
    description: 'Player 0369 has entered the Theta multiverse.',
    imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/PluggedIn.jpg',
    hasMetadata: true,
}

const CleanupCrew = {
    contract: '0x44c9239b1d9562aae04574c97710207e68f74816',
    name: 'CleanupCrew',
    creator: 'ThetaDiamond',
    tokenNumber: 350,
    description: 'Clean up in isle #07.',
    imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/CleanupCrew.jpg',
    hasMetadata: true,
}

const TFuelDreams = {
    contract: '0x58bbda670702b8217c7428fe25c28c95a6e3963c',
    name: 'TFuelDreams',
    creator: 'ThetaDiamond',
    tokenNumber: 250,
    description: 'Extracted and crystallized for your viewing pleasure.',
    imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/TFUELDreams.jpg',
    hasMetadata: true,
}

const ThetaverseImmersion = {
    contract: '0xc2c4cb5a9e50590e1e71f378d5fef744176b0459',
    name: 'ThetaverseImmersion',
    creator: 'ThetaDiamond',
    tokenNumber: 100,
    description: 'The Thetan you are trying to reach is unavailable, please leave a message.',
    imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/ThetaverseImmersion.jpg',
    hasMetadata: true,
}

const SelfIllusion = {
    contract: '0x74767412cfd446dba5994bd9646a5669106246e4',
    name: 'SelfIllusion',
    creator: 'ThetaDiamond',
    tokenNumber: 50,
    description: 'The timelines of self are limitless.',
    imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/SelfIllusion.jpg',
    hasMetadata: true,
}
const TheExtraction = {
    contract: '0xb5e52d9f80914843141d72430f52c404bf93ec3b',
    name: 'TheExtraction',
    creator: 'ThetaDiamond',
    tokenNumber: 31,
    description: 'Every world has its resources.',
    imgUrl:'https://arweave.net/zoI0FdzjbimnSDvngRlfdR3p2gRnGecd_WSumbNnGn4',
    hasMetadata: true,
}

const ThetaFusion = {
    contract: '0x212c4cf4ce07df918d41d3874c8733ccabd6b140',
    name: 'ThetaFusion',
    creator: 'ThetaDiamond',
    tokenNumber: 24,
    description: 'Fuse with your surroundings.',
    imgUrl:'https://arweave.net/AhxNpxvrQBTOvr4KiXDTx6AWBdXBFfZgNSizVUspvdU',
    hasMetadata: true,
}

const ThetaMan = {
    contract: '0xff290451c54a6ebd390287b4db18058a0e892cde',
    name: 'ThetaMan',
    creator: 'tStake.io',
    tokenNumber: 1000,
    description: 'Theta Man on the Moon',
    imgUrl:'https://www.tstake.io/images/nft_1.jpg',
    hasMetadata: true,
}

const ThetaMan2 = {
    contract: '0x3ce1b5615f5bd3a037211ba11c922b93c7c32068',
    name: 'ThetaMan2',
    creator: 'tStake.io',
    tokenNumber: 23,
    description: 'To reward our loyal stakers who are staking Theta and/or Tfuel to our nodes, we are distributed these three new staking NFTs featuring Theta Man!',
    imgUrl:'https://arweave.net/qMFbmVZ_ipKwipXlP0KvQAVnL3qZbOdQSpcPKH7N0Aw',
    hasMetadata: true,
}


const Earth = {
    contract: '0x82bc05813ba10bdc12a469c3473104db1bcfcbfd',
    name: 'EARTH',
    creator: 'TKETS',
    tokenNumber: 1000,
    description: 'Soon, TKETS will be used for all types of events, from concerts to live sports. Perhaps some day, we may even see a TKETS arena...',
    imgUrl:'https://ipfs.io/ipfs/QmecPustetgoWbuFtZN5BgDDKTmfyNGdYeaZgdhtRqD6aA',
    hasMetadata: true,
}

const Gods = {
    contract: '0xe42ac9ff693d32e03732f1a4a96a916e792e39d9',
    name: 'GODS',
    creator: 'TKETS',
    tokenNumber: 1000,
    description: 'The first known tickets ever used were in Ancient Greece. The first known NFT tickets on the Theta Network are now on TKETS.',
    imgUrl:'https://ipfs.io/ipfs/QmfJ14xDpBWCGDHMJKf7uorr4nJwyvEpMQQCX9fyXtddag',
    hasMetadata: true,
}

const ThetiansGalaxy = {
    contract: '0xef6399f5cacfd30c2d2ec1ed86bd39d33741643b',
    name: 'Thetians Galaxy I.',
    creator: 'ThetaNostra',
    tokenNumber: 222,
    description: 'Discover the Galaxy of the ancient Theatians.',
    imgUrl:'https://arweave.net/10Kkbj5yrZW-Yq4aLXEvVHvL6tflWLKDwCVn6fqdrl0',
    hasMetadata: true,
}

addProject(ThetaPunks);
addProject(SemtexSamurai);
addProject(WesZombie);
addProject(MitchAlien);
addProject(JieyiApe);
addProject(KyleHuman);
addProject(ThetaPugs);
addProject(ThetaZilla);
addProject(ThetaPermabull);
addProject(PluggedIn);
addProject(CleanupCrew);
addProject(TFuelDreams);
addProject(ThetaverseImmersion);
addProject(SelfIllusion);
addProject(ThetaFusion);
addProject(TheExtraction);
addProject(ThetaMan);
addProject(ThetaMan2);
addProject(Earth);
addProject(Gods);
addProject(ThetiansGalaxy);
addProject(thetaBoard);
addProject(thetaBoard2021);




// const thetaBoard2021 = {
//     contract: '0x7500cbde64b1bf956351aa4ea2fa4ee1467a3428',
//     name: 'Thetaboard 2021',
//     creator: 'Thetaboard',
//     tokenNumber: 1000,
//     description: 'Thetaboard Early Adopter',
//     imgUrl:'https://nft.thetaboard.io/nft/assets/thetaboard/badge_2021.png',
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

// const thetaBoard = {
//     contract: '0x34f573de2416c8c4e968ca16a18b46c2a7d833c2',
//     name: 'Thetaboard',
//     creator: 'Thetaboard',
//     tokenNumber: 1000,
//     description: 'Thetaboard Early Adopter',
//     imgUrl:'',
//     hasMetadata: true,
// }
//
// const thetaBoard2021 = {
//     contract: '0x7500cbde64b1bf956351aa4ea2fa4ee1467a3428',
//     name: 'Thetaboard 2021',
//     creator: 'Thetaboard',
//     tokenNumber: 1000,
//     description: 'Thetaboard Early Adopter',
//     imgUrl:'https://nft.thetaboard.io/nft/assets/thetaboard/badge_2021.png',
//     hasMetadata: true,
// }
//
// const ThetaPunks = {
//     contract: '0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473',
//     name: 'ThetaPunks',
//     creator: 'ThetaPunks',
//     tokenNumber: 10000,
//     description: 'Punks On Theta',
//     imgUrl:'',
//     hasMetadata: true,
// }
//
// const ThetaMan = {
//     contract: '0xff290451c54a6ebd390287b4db18058a0e892cde',
//     name: 'Theta Man',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man on the Moon',
//     imgUrl:'',
//     hasMetadata: true,
// }



