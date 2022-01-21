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
// async function updateNFT(nft) {
//     await projects.updateNFT(nft.itemId, nft);
//     console.log(nft.itemId)
// }
//
//
// async function checkNFT(itemId) {
//     let res = await projects.checkItemId(itemId);
//     console.log(res)
// }
//
// checkNFT(3326)

//
// for(let i=1; i<3330; i++){
//     checkNFT(i).then(res => {
//         if(res.length === 1) {
//             const update = {
//                 itemId: i,
//                 nftContract: res[0].nftContract.toLowerCase(),
//                 seller: res[0].seller.toLowerCase(),
//                 owner: res[0].owner.toLowerCase(),
//             }
//             updateNFT(update)
//         }
//     })
// }



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
//     name: 'ThetaMan',
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
// const ThetaPermabull = {
//     contract: '0xadc8fdca07ba7066c6e2d0efd7fe8cc35846ff3c',
//     name: 'ThetaPermabull',
//     creator: 'Fr0zenfir3',
//     tokenNumber: 444,
//     description: 'By holding one of the 444 Theta Permabull badges, it shows that you are Hardcore Theta Holder.',
//     imgUrl:'https://arweave.net/SA4PXBTjqAa5ee7oTuCuvfwJkzR2LtaNdwBn_S-bOfU',
//     hasMetadata: true,
// }
// const PluggedIn = {
//     contract: '0x5bfcf20d4f141f03ffbbe009b193040cd63083b0',
//     name: 'PluggedIn',
//     creator: 'ThetaDiamond',
//     tokenNumber: 500,
//     description: 'Player 0369 has entered the Theta multiverse.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/PluggedIn.jpg',
//     hasMetadata: true,
// }
//
// const CleanupCrew = {
//     contract: '0x44c9239b1d9562aae04574c97710207e68f74816',
//     name: 'CleanupCrew',
//     creator: 'ThetaDiamond',
//     tokenNumber: 350,
//     description: 'Clean up in isle #07.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/CleanupCrew.jpg',
//     hasMetadata: true,
// }
//
// const TFuelDreams = {
//     contract: '0x58bbda670702b8217c7428fe25c28c95a6e3963c',
//     name: 'TFuelDreams',
//     creator: 'ThetaDiamond',
//     tokenNumber: 250,
//     description: 'Extracted and crystallized for your viewing pleasure.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/TFUELDreams.jpg',
//     hasMetadata: true,
// }
//
// const ThetaverseImmersion = {
//     contract: '0xc2c4cb5a9e50590e1e71f378d5fef744176b0459',
//     name: 'ThetaverseImmersion',
//     creator: 'ThetaDiamond',
//     tokenNumber: 100,
//     description: 'The Thetan you are trying to reach is unavailable, please leave a message.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/ThetaverseImmersion.jpg',
//     hasMetadata: true,
// }
//
// const SelfIllusion = {
//     contract: '0x74767412cfd446dba5994bd9646a5669106246e4',
//     name: 'SelfIllusion',
//     creator: 'ThetaDiamond',
//     tokenNumber: 50,
//     description: 'The timelines of self are limitless.',
//     imgUrl:'https://arweave.net/zCy6s6bQBCqhtZlwOSzfOn1mrp0HKxRPZKPVcGDRESs/SelfIllusion.jpg',
//     hasMetadata: true,
// }
// const TheExtraction = {
//     contract: '0xb5e52d9f80914843141d72430f52c404bf93ec3b',
//     name: 'TheExtraction',
//     creator: 'ThetaDiamond',
//     tokenNumber: 31,
//     description: 'Every world has its resources.',
//     imgUrl:'https://arweave.net/zoI0FdzjbimnSDvngRlfdR3p2gRnGecd_WSumbNnGn4',
//     hasMetadata: true,
// }
// const ThetaMan2 = {
//     contract: '0x3ce1b5615f5bd3a037211ba11c922b93c7c32068',
//     name: 'ThetaMan2',
//     creator: 'tStake.io',
//     tokenNumber: 23,
//     description: 'To reward our loyal stakers who are staking Theta and/or Tfuel to our nodes, we are distributed these three new staking NFTs featuring Theta Man!',
//     imgUrl:'https://arweave.net/qMFbmVZ_ipKwipXlP0KvQAVnL3qZbOdQSpcPKH7N0Aw',
//     hasMetadata: true,
// }
// const ThetaFusion = {
//     contract: '0x212c4cf4ce07df918d41d3874c8733ccabd6b140',
//     name: 'ThetaFusion',
//     creator: 'ThetaDiamond',
//     tokenNumber: 24,
//     description: 'Fuse with your surroundings.',
//     imgUrl:'https://arweave.net/AhxNpxvrQBTOvr4KiXDTx6AWBdXBFfZgNSizVUspvdU',
//     hasMetadata: true,
// }

// const Earth = {
//     contract: '0x82bc05813ba10bdc12a469c3473104db1bcfcbfd',
//     name: 'EARTH',
//     creator: 'TKETS',
//     tokenNumber: 1000,
//     description: 'Soon, TKETS will be used for all types of events, from concerts to live sports. Perhaps some day, we may even see a TKETS arena...',
//     imgUrl:'https://ipfs.io/ipfs/QmecPustetgoWbuFtZN5BgDDKTmfyNGdYeaZgdhtRqD6aA',
//     hasMetadata: true,
// }

// const Gods = {
//     contract: '0xe42ac9ff693d32e03732f1a4a96a916e792e39d9',
//     name: 'GODS',
//     creator: 'TKETS',
//     tokenNumber: 1000,
//     description: 'The first known tickets ever used were in Ancient Greece. The first known NFT tickets on the Theta Network are now on TKETS.',
//     imgUrl:'https://ipfs.io/ipfs/QmfJ14xDpBWCGDHMJKf7uorr4nJwyvEpMQQCX9fyXtddag',
//     hasMetadata: true,
// }

// const ThetiansGalaxy = {
//     contract: '0xef6399f5cacfd30c2d2ec1ed86bd39d33741643b',
//     name: 'Thetians Galaxy I.',
//     creator: 'ThetaNostra',
//     tokenNumber: 222,
//     description: 'Discover the Galaxy of the ancient Theatians.',
//     imgUrl:'https://arweave.net/10Kkbj5yrZW-Yq4aLXEvVHvL6tflWLKDwCVn6fqdrl0',
//     hasMetadata: true,
// }

// const THETAVERSE = {
//     contract: '0x0478578c5e906afeb1bdbbf358929affbf1575c8',
//     name: 'THETAVERSE',
//     creator: 'TKETS',
//     tokenNumber: 1000,
//     description: 'Is this what the future of Theta looks like? A.. a THETAVERSE?!',
//     imgUrl:'https://ipfs.io/ipfs/QmXtqYW3VTEcDkSZA9gDJ8iYyhA1QQecfsz4ebcZ3Y2TDy',
//     hasMetadata: true,
// }

// const ThetaBulls = {
//     contract: '0xcb8f0b07ab79118014c8d6fa2ab2e2d88477305f',
//     name: 'ThetaBull',
//     creator: 'ThetaBulls',
//     tokenNumber: 10000,
//     description: 'Earth has failed. Wars, overpopulation and greed has has brought our old home to its knees. A group of brave explorers has set out to find a new, prosperous galaxy we can call home. After months of research Professor Lucas set out to explore the galaxy known as GOAT 888. Upon circling a planet, very similar to earth, he notices a mysterious glowing object and decides to land his ship. As he passed through a thick forrest, he finds himself at the shores of a lake and gazes upon something miraculous … the first encounter.',
//     imgUrl:'https://arweave.net/_MPa0zj-tTAYn5UcKHM_01yP7SLZD8dLYHltnbcE0L4',
//     hasMetadata: true,
// }

// const MeemopMania = {
//     contract: '0x38af6ddf4f3f3b044bd0ae1106d6726a011eefd1',
//     name: 'MeemopMania',
//     creator: 'CykoKO',
//     tokenNumber: 888,
//     description: 'Meemop Mania is a generative NFT project of 888 Meemop mints, each unique with vintage animation inspired faces, colors and accessories.',
//     imgUrl:'https://arweave.net/pPvox9jH66voJEWTP0mlDE7DPPFY9yJkt6IbLxPXWS0',
//     hasMetadata: true,
// }

// const TRSBulls = {
//     contract: '0x75ad7c8a882382b3e6132370bf317113c96248ac',
//     name: 'TRSBull',
//     creator: 'ThetaBulls',
//     tokenNumber: 44,
//     description: 'Theta Research Squad Bull represents those who never stop digging, finding, and sharing content in the hopes of advancing our mission: global adoption of Theta Network.',
//     imgUrl:'https://arweave.net/GEVHOyPMhoBdRfi7pDJB9RzFVi2ZlIbujGEGuBtDOFA',
//     hasMetadata: true,
// }

// const MysticGurus2021 = {
//     contract: '0xe48f6e05c119bae8e2a30f7637264c29255b061c',
//     name: 'MysticGurus2021',
//     creator: 'MysticGurus',
//     tokenNumber: 555,
//     description: 'Mystic Gurus 2021 Promo Drop. The journey begins.',
//     imgUrl:'https://arweave.net/AVsye9uQBGdmecHlkKkPIYWHt3KL5h1TZIppNVM2rGE',
//     hasMetadata: true,
// }

// const ThetaTeeth = {
//     contract: '0x23a185f6cf673d74f3dd69086f20136ee30e7129',
//     name: 'ThetaTeeth',
//     creator: 'ThetaTeeth',
//     tokenNumber: 3232,
//     description: 'ThetaTeeth is a collection of 3232 unique NFTs. In ancient times teeth were used as tokens by hunters and they were quite symbolic. This is very common and coincides with our vision that Theta blockchain is still in its infancy and we, just like ancient hunters, want to have something symbolic to remember about these early days.',
//     imgUrl:'https://arweave.net/biEkrXgvMtlumPZvFRGnTj4-E6dWTo2MTQpBufqYFqs',
//     hasMetadata: true,
// }

// const ThetaBetFirstEdition = {
//     contract: '0x875b7e0042629966eb73eff2e5e876229612d502',
//     name: 'ThetaBetFirstEdition',
//     creator: 'ThetaBet',
//     tokenNumber: 1380,
//     description: 'Collectable characters and numbers, a unique take on the alphabet. Everyone has a letter or number that’s personal to them and our aim is make NFTs as memorable as possible. Play our word games using your ThetaBet NFT letters to win TFUEL. Collect 10 or more ThetaBet for your chance to be airdropped a special animated NFT."',
//     imgUrl:'https://arweave.net/eWsnE1qVMUL_GgJv47XMD2mGB-Ri2byRCuYGJHTEJgE',
//     hasMetadata: true,
// }
//
// const ThetaSnow = {
//     contract: '0xebb704d36c14245ecacf167ac41fc26e02281cff',
//     name: 'ThetaSnow',
//     creator: 'ThetaBet',
//     tokenNumber: 100,
//     description: 'Celebrate the Holiday with our Thaterish Xmas NFT.',
//     imgUrl:'https://arweave.net/7qyaWKfGvLswrmMAngjHeTxYrm3tvyia-9CKmjnxK4Y/XMASTheta.png',
//     hasMetadata: true,
// }
//
// const XMAS = {
//     contract: '0xb884e3d5d83e154853ae02a3641e06e8309239ff',
//     name: 'XmasGreetings',
//     creator: 'ThetaBet',
//     tokenNumber: 100,
//     description: 'Seasons Greetings from Thetabet, to all the Theta community.',
//     imgUrl:'https://arweave.net/7qyaWKfGvLswrmMAngjHeTxYrm3tvyia-9CKmjnxK4Y/XMAS.png',
//     hasMetadata: true,
// }
//
// const RARE = {
//     contract: '0x70b31e3e3736fc17ed1d3e3446029d4a3626eeb8',
//     name: 'RARE',
//     creator: 'ThetaBet',
//     tokenNumber: 10,
//     description: 'Our RARE NFT is the first ever ThetaBet Word Edition. With only 10 minted, that makes it extremely RARE.',
//     imgUrl:'https://arweave.net/yonsYmu_7RQl-02dypNoAjUen9erHNnIDfyxymiYkZs',
//     hasMetadata: true,
// }

// const SantaBull = {
//     contract: '0x61ce58995a0aefb9e788a696ab302ebaffb03cb6',
//     name: 'SantaBull',
//     creator: 'ThetaBulls',
//     tokenNumber: 55,
//     description: 'The North Pole is in chaos; elves run from one end of the toy shoppe to the other looking for the man in the suit without avail—Santa’s gone AWOL. With no one to turn to, the elves and Mrs. Clause enlist the ThetaBulls to save Christmas. Fresh from the pasture, they’ve got Santa’s sack and the red suit in hoof, as the Bulls set forth to deliver Yuletide joy across the Thetaverse. But that velvet sack isn’t full of toys; no, it’s overflowing with bear traps, spray, and all the makings for a comfy bear fur rug. Sorry Bears, no toys this year, the ThetaBulls are back, and this time, you’re on the naughty list. It’s the running of the Christmas Bulls, leaving a wake of candy canes and pain.',
//     imgUrl:'https://arweave.net/vENF6V6wewbVytZcSfbRxNMFRmvm5XtD2mACtL5Ss4k',
//     hasMetadata: true,
// }

// const Goldzilla = {
//     contract: '0xb8a427267d54c56d6e3763a068d83f6cfd43981e',
//     name: 'Goldzilla',
//     creator: 'Barrizan',
//     tokenNumber: 26,
//     description: 'Goldzilla is not someone you would want to see across from you at the WPT poker table. Despite the fact that he could instantly annihilate any of his competitors with a single fiery breath, Goldzilla also has a special trick up his sleeve as he possesses a certain special Golden Chip ;). Collect Goldzilla for an instant chance to receive a custom made NFT of your choice from Zilla-Mania artist Barrizan.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Goldzilla.jpg',
//     hasMetadata: true,
// }
//
// const Bobzilla = {
//     contract: '0x74ae2ad6b214bec1a42d3ccd57204c8f9da59924',
//     name: 'Bobzilla',
//     creator: 'Barrizan',
//     tokenNumber: 33,
//     description: 'To quote the famous Bobzilla “there are no mistakes when you become involved with Theta and Tfuel, just happy accidents”.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Bobzilla.jpg',
//     hasMetadata: true,
// }
//
// const Astrozilla = {
//     contract: '0x9e2e3025a26a001d1d3857c70b36dcee82e7608d',
//     name: 'Astrozilla',
//     creator: 'Barrizan',
//     tokenNumber: 33,
//     description: 'Astrozilla will literally take Theta to the moon. Rocking the highest quality space gear that Theta has to offer, Astrozilla searches the moon for valuable Tfuel deposits.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Astrozilla.jpg',
//     hasMetadata: true,
// }
//
// const Firezilla = {
//     contract: '0xb63a79d06ecbf137002832c7bb14266e25446982',
//     name: 'Firezilla',
//     creator: 'Barrizan',
//     tokenNumber: 55,
//     description: 'With Theta set to ignite an inferno in 2022, Theta employ Firezilla to collect precious Tfuel flames to harness their power.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Firezilla.jpg',
//     hasMetadata: true,
// }
//
// const Zillarina = {
//     contract: '0xcb58da80df801f000f59cebd9d51f4d50a9bb952',
//     name: 'Zillarina',
//     creator: 'Barrizan',
//     tokenNumber: 55,
//     description: 'Like a true Renaissance-Zilla, Zillarina has no gender-roles. Zillarina stuns in each performance, executing mind bending flexibility, coordination, and grace.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Zillarina.jpg',
//     hasMetadata: true,
// }

// const WarmedByTFuel2021 = {
//     contract: '0x056651a953143236fdc2025b8e195ce61f286482',
//     name: 'WarmedByTFuel2021',
//     creator: 'WarmedByTFuel',
//     tokenNumber: 10000000,
//     description: 'The crypto winter descends upon the land. The wisest of #ThetaHodlers find refuge by the glowing hearth of Tfuel.',
//     imgUrl:'https://arweave.net/2IyAhsicHzyOu1__7AES7bYqFGs98ZaOKoEq3HJo3jE',
//     hasMetadata: true,
// }

// const ThetiansGalaxyII = {
//     contract: '0x2860c2e82967c2a79aa9d8b1a79421478843cc46',
//     name: 'Thetians Galaxy II.',
//     creator: 'ThetaNostra',
//     tokenNumber: 222,
//     description: 'Discover the Galaxy of the ancient Theatians.',
//     imgUrl:'https://arweave.net/TZSux8CJcgY-ImBIooaWWNn5mRewtSFdkSDvZjWsvCQ',
//     hasMetadata: true,
// }

// const EVENT_PROXIMA = {
//     contract: '0xc357a28c0285f6c45a7ff7e8c4cc92fad0b34114',
//     name: 'EVENT PROXIMA',
//     creator: 'ThetaDiamond',
//     tokenNumber: 1202,
//     description: '4 years ago the closest star to our Sun, Proxima Centauri went supernova. This is what\'s left, these are our memories..',
//     imgUrl:'https://arweave.net/FhYtnmPVr6KGrVz3NXweKdPluiH7WV9eE_wWhkwvhz4',
//     hasMetadata: true,
// }

// const BarrizanCustom = {
//     contract: '0x23b8b352ba1eb43fed713f4c718cc840669cdb5f',
//     name: 'BarrizanCustom',
//     creator: 'Barrizan',
//     tokenNumber: 0,
//     description: 'Custom NFTs and Airdrops from Barrizan',
//     imgUrl:'https://open-theta.de/api/images/creators/Barrizan.jpg',
//     hasMetadata: true,
// }


// const ThetaManSpacewalk = {
//     contract: '0xfcbb9f1962b9ae8a28ba38feffaa0a047ee97cd4',
//     name: 'ThetaManSpacewalk',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man teaches his dog how to move in space using a jetpack.',
//     imgUrl:'https://arweave.net/0-ipkmfrwZrPLLXnqc5dwzymTylmsS0u5G-KnXq8sww/Theta-Man-Space-Adventures-01-Spacewalk.jpg',
//     hasMetadata: true,
// }
//
// const ThetaManAsteroidBelt = {
//     contract: '0xc4b85cfaa74d6a107358932cf73fbfdc277106b2',
//     name: 'ThetaManAsteroidBelt',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man plays hide-and-seek with his dog in the asteroid belt.',
//     imgUrl:'https://arweave.net/2voMuUaJv7cU3BiV6PWcnTTNvaexFl7Cdn-Zj6jBAvU/Theta-Man-Space-Adventures-02-Asteroid-Belt.jpg',
//     hasMetadata: true,
// }
//
// const ThetaManIapetus = {
//     contract: '0xb64f92b841615ccc55b7d16a5fe1035323b5d775',
//     name: 'ThetaManIapetus',
//     creator: 'tStake.io',
//     tokenNumber: 1000,
//     description: 'Theta Man and his dog enjoy a visit to Iapetus, one of Saturn\'s moons.',
//     imgUrl:'https://arweave.net/WF-P3NCzr60K5a5hAVFnH2bpoqimRkCn-f94NPsAX5o/Theta-Man-Space-Adventures-03-Iapetus.jpg',
//     hasMetadata: true,
// }

// const PugGames = {
//     contract: '0x81e034a9dc071d1261631d8a21fb6144218f14b1',
//     name: 'PugGames',
//     creator: 'ThetaPugs',
//     tokenNumber: 7,
//     description: 'ThetaPugs - Pug Games Special NFT',
//     imgUrl:'https://arweave.net/WxCfM90J-Kc1tQYiKHa4drcMZhPUlhrXqi26wVE12ew',
//     hasMetadata: true,
// }

// const WarmedByTFuelBigDog = {
//     contract: '0x761f48c0cbc57323cd57cbc939131e5a1a56718f',
//     name: 'WarmedByTFuelWithBigDog1111',
//     creator: 'WarmedByTFuel',
//     tokenNumber: 130,
//     description: 'With a passion for all things freedom and Theta, Big Dog 1111 knows where to find warmth in the crypto Winter',
//     imgUrl:'https://arweave.net/1NLp_JO0gIwyyRjrPoVEBkc2i1PKv_74W8ATUwKbQmk',
//     hasMetadata: true,
// }

// const ThetaTime = {
//     contract: '0x0015bc623bc3020f36de90dc112c2c79e1a3f912',
//     name: 'ThetaTime',
//     creator: 'ThetaBet',
//     tokenNumber: 33,
//     description: 'Turn heads with our ThetaBet, Spinning Theta.',
//     imgUrl:'https://arweave.net/7qyaWKfGvLswrmMAngjHeTxYrm3tvyia-9CKmjnxK4Y/SpinningTheta.png',
//     hasMetadata: true,
// }

const THETANET = {
    contract: '0x81821cb1f7fd9857a76ddfb2640fba23e91eedd4',
    name: 'THETANET',
    creator: 'TKETS',
    tokenNumber: 70,
    description: 'The first ever GENESIS airdrop. NOT FOR SALE.',
    imgUrl:'https://ipfs.io/ipfs/QmYq6h49L55nBXZF7585Vy73ob4oMH7Mr6HB8oG9STsmQG',
    hasMetadata: true,
}

const GojiraIsland = {
    contract: '0xa8ace2512b663decc712b09befedff14d1d2d693',
    name: 'Gojira Island',
    creator: 'THETHOVEN',
    tokenNumber: 111,
    description: 'Antarctica is one of the world\'s least explored & most mysterious places on earth. Fallen angels & underground alien bases .. Godzilla .. The Original THETA token ?? only one can imagine',
    imgUrl:'https://arweave.net/94i3h_nnoFI-bIZJjJS2WdemIvg1qAiUx43ZWYMPHoA',
    hasMetadata: true,
}

// addProject(SemtexSamurai)
// addProject(MitchAlien)
// addProject(JieyiApe)
// addProject(KyleHuman)
// addProject(ThetaPugs);
// addProject(ThetaZilla);
// addProject(ThetaPermabull);
// addProject(PluggedIn);
// addProject(CleanupCrew);
// addProject(TFuelDreams);
// addProject(ThetaverseImmersion);
// addProject(SelfIllusion);
// addProject(ThetaMan2);
// addProject(Earth);
// addProject(Gods);
// addProject(ThetiansGalaxy);
// addProject(THETAVERSE);
// addProject(ThetaBulls);
// addProject(MeemopMania);
// addProject(TRSBulls);
// addProject(MysticGurus2021)
// addProject(ThetaTeeth)
// addProject(ThetaBetFirstEdition);
// addProject(ThetaSnow);
// addProject(XMAS);
// addProject(RARE);
// addProject(SantaBull)
// addProject(Goldzilla)
// addProject(Bobzilla)
// addProject(Astrozilla)
// addProject(Firezilla)
// addProject(Zillarina)
// addProject(WarmedByTFuel2021)d
// addProject(ThetiansGalaxyII)
// addProject(EVENT_PROXIMA)
// addProject(BarrizanCustom)
// addProject(ThetaManSpacewalk)
// addProject(ThetaManAsteroidBelt)
// addProject(ThetaManIapetus)
// addProject(PugGames)
// addProject(WarmedByTFuelBigDog)
// addProject(ThetaTime)
addProject(THETANET)
addProject(GojiraIsland)

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

// projects.deleteNFT(2615).then(res => {
//     console.log(res);
// }).catch(error => {
//     console.log("deleteNFT");
//     console.log('failed to delete nft');
// });
//
// projects.deleteNFT(2982).then(res => {
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
// projects.getNFTById(503).then(res => {
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
// const updateGODS = {
//     contract: "0xe42ac9ff693d32e03732f1a4a96a916e792e39d9",
// }
//
// const WBT2021 = {
//     tokenNumber: 130,
// }
// //
// projects.updateProject('0x056651a953143236fdc2025b8e195ce61f286482', WBT2021).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
// projects.updateProject('0xE42AC9Ff693d32e03732F1A4A96a916E792e39d9', updateGODS).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });
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
//     console.log(error)
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