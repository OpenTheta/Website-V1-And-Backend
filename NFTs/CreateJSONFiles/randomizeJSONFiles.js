const fs = require("fs");

const readDir = "./../../../../OpenTheta/Projects/SYNI/metadata/"
const storeDir = "./../../../../OpenTheta/Projects/SYNI/metadataFinal/"
let readFiles = fs.readdirSync(readDir)

readFiles = readFiles.filter(file => file.endsWith('.json'))

function shuffle(array) {
    let tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

readFiles = shuffle(readFiles);

let Theta = 1
let TDrop = 1
let TFuel = 1
let Wizard = 1
for(let [index, file] of readFiles.entries()) {
    let data = fs.readFileSync(readDir+file)
    data = JSON.parse(data)
    let name = data.name.split("#")[0]
    if(name === 'THETA Card ') {
        name = name + "#" + Theta
        Theta++
    }
    if(name === 'TFUEL Card ') {
        name = name + "#" + TFuel
        TFuel++
    }
    if(name === 'TDROP Card ') {
        name = name + "#" + TDrop
        TDrop++
    }
    if(name === 'THETA Wizard Card ') {
        name = name + "#" + Wizard
        Wizard++
    }
    data.name = name
    let newName = (index+1) + ".json"
    fs.writeFileSync(storeDir+newName, JSON.stringify(data))
}

console.log(Theta, TFuel, TDrop, Wizard)
// fs.readFile('./../../../OpenThetaProjects/ThetaZillaClub/json/_metadata.json', 'utf8' , (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     // console.log(JSON.parse(data)[0].attributes[0]);
//     const baseID = 0;
//     for(let i=0; i<tokenNumber; i++) {
//         console.log(i);
//         let checkSum = Math.floor(a[i] / 2000);
//         baseImageURI = addressesZilla[checkSum];
//         let attribute = [
//             { trait_type: 'Background', value: JSON.parse(data)[a[i]].attributes[0].value },
//             { trait_type: 'Scales', value: JSON.parse(data)[a[i]].attributes[2].value },
//             { trait_type: 'Body', value: JSON.parse(data)[a[i]].attributes[3].value },
//             { trait_type: 'Chest', value: JSON.parse(data)[a[i]].attributes[4].value },
//             { trait_type: 'Mouth', value: JSON.parse(data)[a[i]].attributes[5].value },
//             { trait_type: 'Earring', value: JSON.parse(data)[a[i]].attributes[6].value },
//             { trait_type: 'Hat', value: JSON.parse(data)[a[i]].attributes[7].value },
//             { trait_type: 'Eyes', value: JSON.parse(data)[a[i]].attributes[8].value },
//             { trait_type: 'Tattoo', value: JSON.parse(data)[a[i]].attributes[9].value },
//             { trait_type: 'Nails', value: JSON.parse(data)[a[i]].attributes[10].value },
//             { trait_type: 'Torso', value: JSON.parse(data)[a[i]].attributes[11].value },
//             { trait_type: 'Prop', value: JSON.parse(data)[a[i]].attributes[12].value },
//             { trait_type: 'Laser Eyes', value: JSON.parse(data)[a[i]].attributes[13].value },
//         ];
//         writeFile( i, a[i], attribute);
//     }
// });