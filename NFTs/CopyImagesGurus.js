const fs = require('fs');

// let folders = [
//     {
//         name: 'Common',
//         number: 175
//     }, {
//         name: 'Mystic Rare',
//         number: 30
//     }, {
//         name: 'Rare',
//         number: 100
//     }, {
//         name: 'Uncommon',
//         number: 125
//     }, {
//         name: 'Very Rare',
//         number: 50
//     }, {
//         name: 'Crossover',
//         number: 20
//     }
//     ]

let folders = [
    {
        name: 'MG',
        number: 38
    }, {
        name: 'OT',
        number: 17
    }
]



let counter = 0

for(let i=0; i<folders.length; i++){
    for(let j=1; j<=folders[i].number; j++){
        counter += 1
        fs.copyFile(`./../../../OpenThetaProjects/MysticGurus/Giveaways2021/${folders[i].name}/${j}.json`, `./../../../OpenThetaProjects/MysticGurus/Giveaways2021/Metadata/${counter}.json`, (err) => {
            if (err) throw err;
            console.log('File was copied to destination');
        });
    }
}
