const projects = require("./models/dbHelpers");


function addProject (project) {
    projects.addProject((project)).then(res => {
        console.log(res);
    }).catch(error => {
        console.log('failed to add project');
    })
}


const thetaBoard = {
    contract: '0x983bc6758b206a30dc521520e4b202bb37ce3bb9',
    name: 'Thetaboard',
    creator: 'Thetaboard',
    tokenNumber: 1000,
    description: 'Thetaboard Early Adopter',
    imgUrl:'',
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
    contract: '0xaef0091cd3615e4e1da6e35398011bd26bccb7cd',
    name: 'ThetaPunks',
    creator: 'ThetaPunks',
    tokenNumber: 10000,
    description: 'Punks On Theta',
    imgUrl:'',
    hasMetadata: true,
}

const ThetaMan = {
    contract: '0xe17b6cd2a176d2db8d27d73a9b8abcb0d7cb9609',
    name: 'Theta Man',
    creator: 'tStake.io',
    tokenNumber: 1000,
    description: 'Theta Man on the Moon',
    imgUrl:'',
    hasMetadata: true,
}

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

addProject(thetaBoard)
addProject(thetaBoard2021)
addProject(ThetaPunks)
addProject(ThetaMan)

