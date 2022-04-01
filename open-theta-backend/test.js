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

// const THETANET = {
//     contract: '0x81821cb1f7fd9857a76ddfb2640fba23e91eedd4',
//     name: 'THETANET',
//     creator: 'TKETS',
//     tokenNumber: 70,
//     description: 'The first ever GENESIS airdrop. NOT FOR SALE.',
//     imgUrl:'https://ipfs.io/ipfs/QmYq6h49L55nBXZF7585Vy73ob4oMH7Mr6HB8oG9STsmQG',
//     hasMetadata: true,
// }
//
// const GojiraIsland = {
//     contract: '0xa8ace2512b663decc712b09befedff14d1d2d693',
//     name: 'Gojira Island',
//     creator: 'THETHOVEN',
//     tokenNumber: 111,
//     description: 'Antarctica is one of the world\'s least explored & most mysterious places on earth. Fallen angels & underground alien bases .. Godzilla .. The Original THETA token ?? only one can imagine',
//     imgUrl:'https://arweave.net/94i3h_nnoFI-bIZJjJS2WdemIvg1qAiUx43ZWYMPHoA',
//     hasMetadata: true,
// }

// const GreekGodZilla = {
//     contract: '0x4e91be87a48f3c37e0f862021d0e24e501f50327',
//     name: 'Greek God Zilla',
//     creator: 'Barrizan',
//     tokenNumber: 11,
//     description: 'Only the most devoted Zilla-Mania holders will be able to possess Greek-God-Zilla and his powers. Collect all 5 Zilla-Mania NFT’s in order to receive the Greek-God-Zilla as an airdrop from Barrizan.',
//     imgUrl:'https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/GreekGodZilla.jpg',
//     hasMetadata: true,
// }

// const LiquidPulse = {
//     contract: '0x6ec41908f00f7a0b7bb94da2e4a08335abc25554',
//     name: 'LiquidPulse',
//     creator: 'ThetaDiamond',
//     tokenNumber: 100000,
//     description: 'I drop, you drop, we all drop for TDROP! Collect this one of a kind limited edition piece dedicated to NFT Liquidity mining on our favourite blockchain..',
//     imgUrl:'https://arweave.net/9BiZqGh0sfDMfVPnwkUm_4upzk3t-O2Dqbv9CT7z_To',
//     hasMetadata: true,
// }

// const PixZilla = {
//     contract: '0xc98c4cf17156d022fcc908779f360c86fe086753',
//     name: 'PixZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 10000,
//     description: 'Old School Art with New Capabilities.',
//     imgUrl:'https://arweave.net/FaQwrrmbm99AEJjAW-aDVdxuaFNXA2oLVVk3Du3gV-o',
//     hasMetadata: true,
// }

// const PINEAPPLE = {
//     contract: '0x5c2bf2f39b81f8e1e9e52a3cfe15bb4729cf8354',
//     name: 'PINEAPPLE',
//     creator: 'ThetaBet',
//     tokenNumber: 15,
//     description: 'This rare Pineapple is only the second ThetaBet word NFT to be created. There are only 15 first edition ThetaBet Pineapples minted.',
//     imgUrl:'https://arweave.net/99nUGrtKsoz52uQLfv-blNCfAg951gX5DaGoXzvClgo',
//     hasMetadata: true,
// }

// const SpacePunk = {
//     contract: '0x9f6b2bd41490d4597038acde77c638c861b021cf',
//     name: 'SpacePunk121',
//     creator: 'ThetaPunks',
//     tokenNumber: 121,
//     description: 'The "Space Punk 121" NFT airdropped in Q1 2022 to all Theta Punk OGs, owners of the very first independent NFTs on the Theta blockchain.  Only 121 of these very special hand-minted NFTs exist!',
//     imgUrl:'https://arweave.net/HAfI5kGJ4OB14vTldlqqMX5J2SewuYWgo965THVd0XE',
//     hasMetadata: true,
// }
//
// const NewYearZilla = {
//     contract: '0x222611b920fb97afe724610567e59ef11a8db049',
//     name: 'NewYearsZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla January 2022 Collection.',
//     imgUrl:'https://arweave.net/M7DUpHYA3kNjdHfjNUC4mqGjfxqE7jUM3c_tdnjA8FA',
//     hasMetadata: true,
// }

// const ZillaCustoms = {
//     contract: '0x247f457079f41e9134879c711016754cb07aa481',
//     name: 'ZillaCustoms',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 0,
//     description: 'Custom Zillas gifted from the ThetaZillaClub',
//     imgUrl:'https://arweave.net/2AJG94KKgSMivVY86j6gFC3_hmWZbHozzaRR5mjp_ms',
//     hasMetadata: true,
// }

// const TFuelTonic = {
//     contract: '0x358087474325ac1ffa13935c90f468e9fdc31044',
//     name: 'TFuel Tonic',
//     creator: 'CykoKO',
//     tokenNumber: 0,
//     description: 'TFuel Tonic to the rescue! This craftily concocted cocktail is sure to fix Meemop\'s multiplying mutation! With just the right twist of Tfuel, some bitters and a good dose of SuperEarth elixir, Meemop will be back to his regular happy, hopping self in no time!',
//     imgUrl:'https://arweave.net/_4QgVuZ0y70WVl6lMUiZdEVOc8Xb_gFFijpIidpyeW8',
//     hasMetadata: true,
// }

// const HealthyMeemop = {
//     contract: '0x06b656c87f98ec1aadb2c6ad2fb68a748befc71e',
//     name: 'Healthy Meemop',
//     creator: 'CykoKO',
//     tokenNumber: 73,
//     description: 'Yay! Meemop is cured thanks to you! Now back to his usual self, Meemop is now back in action with Cyko KO and Peachy Keen---just one happy SuperEarth family!!',
//     imgUrl:'https://arweave.net/IH-1nnPT30dRZEbIgQb_gtHF0rw3qyRu7oHtgGCwUWc',
//     hasMetadata: true,
// }

// const ThetaWords = {
//     contract: '0xcf8e4a8d4081c4eba6835c339eb5428889f164f9',
//     name: 'ThetaWords',
//     creator: 'ThetaBet',
//     tokenNumber: 610,
//     description: 'ThetaWords are a unique collectable take on Thetaish words. Punk, Bull, Hodl, Pineapple, Mint, 5X, 10X, WTF?, Pump and NFTS. Lookout for some hidden gems created especially for us by our NFT friends, the MysticGurus, Barrizan and ThetaTeeth. Find one and we\'ll create a personalised word NFT of your choice.',
//     imgUrl:'https://arweave.net/28UsNCWAOXpYW9hX-Aqn_brX8RFmp1J0r0mZ1BB6Cfk',
//     hasMetadata: true,
// }

// const Guardian = {
//     contract: '0xcd8ee3078fa8565135f1e17974e04a6fbabedd66',
//     name: 'Guardian',
//     creator: 'Guardians Of Theta',
//     tokenNumber: 110,
//     description: 'Music by Santiago. Visit GuardiansOfTheta.com/thetavibes for more info!',
//     imgUrl:'https://arweave.net/FDgZj8VVZBElhvQxaFJ8mlDq6N_-UwT_CwWhiI-hrhk',
//     hasMetadata: true,
// }
//
// const FlyNHigh = {
//     contract: '0x1a54ff4a92daf67eafb9a790d596b9794e2d27a8',
//     name: 'Fly N High',
//     creator: 'Guardians Of Theta',
//     tokenNumber: 250,
//     description: 'Music by Bjorn Majestik ft Avantist. Visit GuardiansOfTheta.com/thetavibes for more info!',
//     imgUrl:'https://arweave.net/ZXHAtJNJhlHdPwY8zJXks-crnCOyS1muneIllwnEDtY',
//     hasMetadata: true,
// }
//
// const DownWithMe = {
//     contract: '0xa07965551c88df408594139ac23c778cf54e25f4',
//     name: 'Down with Me',
//     creator: 'Guardians Of Theta',
//     tokenNumber: 250,
//     description: 'Music by Until Rust. Visit GuardiansOfTheta.com/thetavibes for more info!',
//     imgUrl:'https://arweave.net/OJa8BW_8A0ePBMh3GKrP3q023TXdyLqsHKELAa7pgdg',
//     hasMetadata: true,
// }
//
// const Dreamland = {
//     contract: '0x4c7d0a83d59bd47219cd5ca980047d38de07686c',
//     name: 'Dreamland',
//     creator: 'Guardians Of Theta',
//     tokenNumber: 60,
//     description: 'Music by Vibus. Visit GuardiansOfTheta.com/thetavibes for more info!',
//     imgUrl:'https://arweave.net/YIucuqfQBKA3vV0V0r9t9kjGO_RWdoFSXzk9pab35cU',
//     hasMetadata: true,
// }
//
// const BeamMyLine = {
//     contract: '0xf20687fc0a0c6e6bb20cfb7334bc2bac20ff57c0',
//     name: 'Beam My Line',
//     creator: 'Guardians Of Theta',
//     tokenNumber: 160,
//     description: 'Music by Klova ft. Aliengf. Visit GuardiansOfTheta.com/thetavibes for more info!',
//     imgUrl:'https://arweave.net/UCIQBdutub-JL7UJjR72jY5KUovCh2YT3dxW6jb6e60',
//     hasMetadata: true,
// }
//
// const GimmeTheTFuel = {
//     contract: '0x2b1dc7c56d17702a53a8adbc158b073b60dd9be1',
//     name: 'Gimme the TFuel',
//     creator: 'Guardians Of Theta',
//     tokenNumber: 310,
//     description: 'Music by Klova ft. Aliengf. Visit GuardiansOfTheta.com/thetavibes for more info!',
//     imgUrl:'https://arweave.net/dBmq-raAbAfAejv7XHF4QF0fBnKMOh4F_C3ORln8160',
//     hasMetadata: true,
// }

// const TBILLMultiplier = {
//     contract: '0x172d0bd953566538f050aabfeef5e2e8143e09f4',
//     name: 'TBILL Multiplier',
//     creator: 'Gworld',
//     tokenNumber: 10000,
//     description: 'TIBILL Multiplier',
//     imgUrl:'https://arweave.net/B04aLg0WL99-GJ188x7qG32Yfx4Yh6YXncJIhELvFs8',
//     hasMetadata: true,
// }
//
// const DailyDiamond = {
//     contract: '0x66e93c5ebef7ebcc2fdf1b9a0da2b32e9a8730d2',
//     name: 'Daily Diamond',
//     creator: 'ThetaDiamond',
//     tokenNumber: 0,
//     description: 'Follow me on the DailyDiamond journey! 1/1 unique designs every day!',
//     imgUrl:'https://arweave.net/fAoWWPaO3BgCQARbLygE6FdKKJXicFj1U0RfYGwKu60',
//     hasMetadata: true,
// }

// const EVENTPROXIMAPostEvent = {
//     contract: '0xc45b3d5267a480a8aacea5b943e690d5ec097df0',
//     name: 'EVENT PROXIMA Post Event',
//     creator: 'ThetaDiamond',
//     tokenNumber: 111,
//     description: 'Humanity has all but been wiped out by the massive Supernova known as EVENT PROXIMA, you are our only hope!',
//     imgUrl:'https://arweave.net/wKtQqHTjbQKiRFJ7uMFne6rkFvPy8Zfg9a66zkgBmdg',
//     hasMetadata: true,
// }

// const OrbZilla = {
//     contract: '0xd5566b294050538370431f36a610798abb040626',
//     name: 'OrbZilla',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla February 2022 Collection.',
//     imgUrl:'https://arweave.net/DxgjfQ3zCixc_F09UyZY8uNfkE5JljvFpzqlHofcnqo',
//     hasMetadata: true,
// }

// const CommunitySupport = {
//     contract: '0x4121dcc6eda2e8785a5cde3a830a3652082694a5',
//     name: 'Community support',
//     creator: 'Ukraine Relief',
//     tokenNumber: 0,
//     description: 'OpenTheta Community support for Ukraine. 100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/4oWnJ-MzCz87aNWy7kn36Jz5R_l7Vs_FgWkswekU5g0',
//     hasMetadata: true,
// }
//
// const Gurus4Ukraine = {
//     contract: '0x006eb841a7b036119d02ec1a06a1756f37decaab',
//     name: 'Gurus4Ukraine',
//     creator: 'Ukraine Relief',
//     tokenNumber: 0,
//     description: 'This Ukraine Angel Guru represents the blessings and protection the Mystic Gurus Community sends to our brethren in Ukraine. Each NFT carries with it blessings for those who support the cause, as well as for those we are supporting. 100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/Q8ewICC0S1YOG98OmUaG2IuhL89HCQsrNQozU6S8soY',
//     hasMetadata: true,
// }
//
// const WeStandWithUkraine = {
//     contract: '0xd32326e850218a7dc5842bf3657b55d2921177fa',
//     name: 'We stand with Ukraine',
//     creator: 'Ukraine Relief',
//     tokenNumber: 0,
//     description: 'We stand with Ukraine by ThetaDiamond, to promote peace not war. 100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/xYdiWEoxUzc4Ojai1b5poSD0-sk01GwlNq-aavST79s',
//     hasMetadata: true,
// }

// const HighFlyerClub = {
//     contract: '0x81fcd77c59cc469026e3bb8eef46a495581a495e',
//     name: 'High Flyer Club',
//     creator: 'ThetaPunks',
//     tokenNumber: 250,
//     description: 'Ownership of this Token grants membership to the "High Flyer Club!" Airdropped in Q1 2022 to all who owned twelve or more Thetapunks from the original collection on Theta Blockchain.',
//     imgUrl:'https://arweave.net/79b835EJBeBBP2Gl7wnbFOt1XAJR2lLZxb8JC7JOlfk',
//     hasMetadata: true,
// }

// const Metapass = {
//     contract: '0xa042fc0e5bd72d02c99b49ca8ca2bf7fa2ab3156',
//     name: 'TKETS x METAPASS',
//     creator: 'TKETS',
//     tokenNumber: 110,
//     description: 'The commemorative airdrop for our rebranding into Metapass. Airdrop only, not for direct mints.',
//     imgUrl:'https://ipfs.io/ipfs/QmWF7p5awoxWufvJdJyySXeTBwoUc7JXoAhqApFZgbAPsz',
//     hasMetadata: true,
// }

// const indientz = {
//     contract: '0x40f81be7f2f90961a7f9e53ff81de8bc37b1e227',
//     name: 'indientz',
//     creator: 'zenba',
//     tokenNumber: 111,
//     description: 'A collection of captures of interdimensional entities caught manifesting in satellite data of the sun. Catch a glimpse into the real metaverse across time, space, and dimensionality. This is not a generative project, it is a collision of scientific data and artistic flare.',
//     imgUrl:'https://arweave.net/hwscJlz4ATowkJXjd5Rzaiwbmy4uREMfClyU5OKRaCs',
//     hasMetadata: true,
// }

// const TrophyRoomxAirJordan1 = {
//     contract: '0xb3bce1f2fc49300825a4071d80dd921075dc78fa',
//     name: 'Trophy Room x Air Jordan 1',
//     creator: 'One Less Entertainment',
//     tokenNumber: 200,
//     description: 'These rare sneakers are mired in controversy. So WE BLEW THEM UP. All NFT holders will gain access to our full behind the scenes explosion video and receive a vote on future destruction events.',
//     imgUrl:'https://arweave.net/Cu-oLsstVKE8430rHcfkJkWvUNK_FjXd-CFqLAIxv6U',
//     hasMetadata: true,
// }

// const VideoEvidenceCards = {
//     contract: '0x6a568444675d6d6a096b083915196006552fc7f0',
//     name: 'Video Evidence Cards',
//     creator: 'One Less Entertainment',
//     tokenNumber: 10,
//     description: 'An upgraded version of the Trophy Room x Air Jordan 1\'s with original music from DEAR KITTY, holders receive five votes for future destruction events.',
//     imgUrl:'https://arweave.net/C-2tim9TncuyU5YFTQ01HWFcMlbvO-zu7SgHL7hPnOA',
//     hasMetadata: true,
// }
//
// const TheExplosion = {
//     contract: '0x9e04458e5585d94a09fb773b8be01b92a96cdf4a',
//     name: 'The Explosion',
//     creator: 'One Less Entertainment',
//     tokenNumber: 1,
//     description: 'These rare sneakers are mired in controversy. So WE BLEW THEM UP. All NFT holders will gain access to our full behind the scenes explosion video and receive a vote on future destruction events.',
//     imgUrl:'https://arweave.net/d3Qk6Rljy8tgg5fM6eNfnC48ZjJpels2t_xwi9Y1U-0',
//     hasMetadata: true,
// }
//
//
// const UkraineReliefAid = {
//     contract: '0xf484a4232944f31d2915ea7b37a8eb4735ae8646',
//     name: 'Ukraine Relief Aid',
//     creator: 'Ukraine Relief',
//     tokenNumber: 5,
//     description: 'Various one of one NFTs from different creators to support the Ukraine Relief aid OpenTheta fundraiser.  100% of the initial sale goes to NGOs that support the Ukrainian people in these difficult times.',
//     imgUrl:'https://arweave.net/ucDGcX8H38PWgHwFr-QiOQpkzOQ0O2ZmufxbKAtbFqo',
//     hasMetadata: true,
// }

// const MegaMeemop = {
//     contract: '0x441c01707404d61391fbbf69cb64e89389d842ae',
//     name: 'Mega Meemop',
//     creator: 'CykoKO',
//     tokenNumber: 72,
//     description: 'This Theta-fueled little guy is ready for some blockchain action! Meep!!!!',
//     imgUrl:'https://arweave.net/iFjj3AEvAMYjAG3OdOA30aPdhAXcr0DwmbOy9xWRg3s',
//     hasMetadata: true,
// }

// const TNS = {
//     contract: '0xbb4d339a7517c81c32a01221ba51cbd5d3461a94',
//     name: 'TNS',
//     creator: 'Thetaboard',
//     tokenNumber: 0,
//     description: 'This is a Theta Name Service (TNS) domain',
//     imgUrl:'https://open-theta.de/api/images/creators/TNS.jpg',
//     hasMetadata: false,
// }
//
// const ThRune = {
//     contract: '0x8dd63546c9d88d3822e3446ddecc3cca628f2768',
//     name: "Th'Rune",
//     creator: 'TSports',
//     tokenNumber: 50,
//     description: 'Theta Rune NFT in the character of Starry Night by Cesar Milan.',
//     imgUrl:'https://arweave.net/aITmrwR97llqB81h2iPtRESokVpURVlPmkf4eYl8jVE',
//     hasMetadata: true,
// }

// const ThEye = {
//     contract: '0x882161a50a95763a3ebd1cccd77b5ab04c0c1473',
//     name: "Th'Eye",
//     creator: 'TSports',
//     tokenNumber: 50,
//     description: 'A pro-peace NFT by Cesar Milan.',
//     imgUrl:'https://arweave.net/SBDZ8bhCKERWZxan8AiFd0wbcWZhUWrhIIwF3domFRM',
//     hasMetadata: true,
// }

// const AbsoluteGosu = {
//     contract: '0x6b9ece0e02870098846b209bbe653ea1de00fc48',
//     name: "Absolute Gosu",
//     creator: 'Satoshi Speaks',
//     tokenNumber: 520,
//     description: '"The Pandora"s Box cracks light unto the world as the God\'s and Goddesses awake from their slumber"',
//     imgUrl:'https://open-theta.de/api/images/launches/AbsoluteGosu.jpg',
//     hasMetadata: true,
// }

// const ZillaPatch = {
//     contract: '0xb690f33f586073e23bc4f368ac928ccffb51202b',
//     name: 'ZillaPatch',
//     creator: 'ThetaZillaClub',
//     tokenNumber: 21,
//     description: 'ThetaZilla March 2022 Collection.',
//     imgUrl:'https://arweave.net/i6-uIASgZnYai3IwBQXeEtrikqNDjrrq11zh3Ix0c08',
//     hasMetadata: true,
// }

const KingsArtwork = {
    contract: '0x31223391e591b5a06581c2191a77ad69328384e3',
    name: 'Kings Artwork',
    creator: 'Team Fr0zenfir3',
    tokenNumber: 1,
    description: 'Redeemable NFTs by Team Fr0zenfir3',
    imgUrl:'https://arweave.net/Du-RuMiX-hkLhK2TiKyVvXafW7oNx9Wwo0Kr_LPHgio',
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
// addProject(THETANET)
// addProject(GojiraIsland)
// addProject(GreekGodZilla)
// addProject(LiquidPulse)
// addProject(PixZilla)
// addProject(PINEAPPLE)
// addProject(SpacePunk)
// addProject(NewYearZilla)
// addProject(ZillaCustoms)
// addProject(TFuelTonic)
// addProject(HealthyMeemop)
// addProject(ThetaWords)
// addProject(Guardian)
// addProject(FlyNHigh)
// addProject(DownWithMe)
// addProject(Dreamland)
// addProject(BeamMyLine)
// addProject(GimmeTheTFuel)
// addProject(TBILLMultiplier)
// addProject(DailyDiamond)
// addProject(EVENTPROXIMAPostEvent)
// addProject(OrbZilla)
// addProject(CommunitySupport)
// addProject(Gurus4Ukraine)
// addProject(WeStandWithUkraine)
// addProject(HighFlyerClub)
// addProject(Metapass)
// addProject(indientz)
// addProject(TrophyRoomxAirJordan1)
// addProject(VideoEvidenceCards)
// addProject(TheExplosion)
// addProject(UkraineReliefAid)
// addProject(MegaMeemop)
// addProject(TNS)
// addProject(ThRune)
// addProject(ThEye)
// addProject(AbsoluteGosu)
// addProject(ZillaPatch)
addProject(KingsArtwork)

// const NYZ = {
//     tokenNumber: 116,
// }
//
// projects.updateProject('0x358087474325ac1ffa13935c90f468e9fdc31044', NYZ).then(res => {
//     console.log("updateProject");
//     console.log(res);
// }).catch(error => {
//     console.log('failed to update project');
// });

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