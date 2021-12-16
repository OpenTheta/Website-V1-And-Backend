const fs = require('fs');

// File specifics
// {
//     "name":"ThetaPug #1",
//     "symbol":"PUG",
//     "description":"A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain",
//     "image":"https://arweave.net/<ID>/1.png",
//     "external_url": "https://thetapugs.com/",
// }

const url = "https://arweave.net/Lk8iRxl9gv5meimf1Db5CPAvb4HeLlmSshj_I-_g8_Q/"


const baseName = "Mystic Gurus 2021 Promo #";
const description = "Mystic Gurus 2021 Promo Drop. The journey begins.";
const external_url = "https://www.mysticgurus.club";
const tokenNumber = 500;
const twitter = "https://twitter.com/Mystic_Gurus"
const creator = "MysticGurus"

// Create files for crossover
// async function writeFile(jsonId) {
//     let data = {
//         name: baseName+(jsonId).toString(),
//         description: description,
//         // image: baseImageURI+(id+1).toString()+"test.png",
//         fee_recipient:"0x256A59Ab85c074EAa7E0cba481fE412Fc76d1775",
//         seller_fee_basis_points:200,
//         image: "",
//         external_url:"",
//         attributes:[
//         {trait_type:"Background",value:"custom"},
//         {trait_type:"Head",value:"custom"},
//         {trait_type:"Torso",value:"custom"},
//         {trait_type:"Chest",value:"custom"},
//         {trait_type:"Eyes",value:"custom"},
//         {trait_type:"Hair",value:"custom"},
//         {trait_type:"Limbs",value:"custom"},
//         {trait_type:"Mouth",value:"custom"}
//         ],
//         hash:"fa28c2771eb6bfa8ea7fbd504bec600c"
//     }
//     fs.writeFile("./../../../../OpenThetaProjects/MysticGurus/Crossover/metadata/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }

// finalize files sorted
// async function writeFile(jsonId, type) {
//     let data = await fs.readFileSync('./../../../../OpenThetaProjects/MysticGurus/AllMetadata/'+counter.toString()+".json")
//     data = JSON.parse(data);
//     data.name = baseName+(jsonId).toString();
//     data.image = url + jsonId.toString() + ".jpeg";
//     data.description = description;
//     data.external_url = external_url;
//     data["twitter"] = twitter;
//     data["creator"] = creator;
//     data.attributes.push(
//     {trait_type:"type",value:type}
//     )
//     delete data.hash;
//     delete data.fee_recipient;
//     delete data.seller_fee_basis_points;
//     fs.writeFile("./../../../../OpenThetaProjects/MysticGurus/AllMetadata/final/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }

//Randomize files
// async function copyFile(jsonId, newId) {
//     console.log(newId)
//     fs.copyFile("./../../../../OpenThetaProjects/MysticGurus/AllMetadata/final/"+jsonId.toString()+".json", "./../../../../OpenThetaProjects/MysticGurus/AllMetadata/FinalRandom/"+newId.toString()+".json", (err) => {
//         if (err) throw err;
//         console.log('File was copied to destination');
//     });
// }
//     let data = await fs.readFileSync('./../../../../OpenThetaProjects/MysticGurus/AllMetadata/'+counter.toString()+".json")
//     data = JSON.parse(data);
//     data.name = baseName+(jsonId).toString();
//     data.image = url + jsonId.toString() + ".jpeg";
//     data.description = description;
//     data.external_url = external_url;
//     data["twitter"] = twitter;
//     data["creator"] = creator;
//     data.attributes.push(
//     {trait_type:"type",value:type}
//     )
//     delete data.hash;
//     delete data.fee_recipient;
//     delete data.seller_fee_basis_points;
//     fs.writeFile("./../../../../OpenThetaProjects/MysticGurus/AllMetadata/final/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });

// update numbers
// async function finalizeFile(jsonId) {
//     let data = await fs.readFileSync('./../../../../OpenThetaProjects/MysticGurus/AllMetadata/FinalRandom/'+jsonId.toString()+".json")
//     data = JSON.parse(data);
//     data.name = baseName+(jsonId).toString();
//     fs.writeFile("./../../../../OpenThetaProjects/MysticGurus/AllMetadata/FinalRandom/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }

let watch = []
async function getCrossover(i) {
    let data = await fs.readFileSync('./../../../../OpenThetaProjects/MysticGurus/AllMetadata/FinalRandom/'+i.toString()+".json");
    data = JSON.parse(data);
    // console.log(data.attributes[8].value.substring(0,8))
    if(data.attributes[6].value.substring(0,9) === "Hands Now"){
        // console.log(i);
        watch.push(i)
        console.log(watch.length)
    }
}

// const baseID = 7000;
for(let i=1; i<=tokenNumber; i++) {
    getCrossover(i);
}

// Create a array with numbers from 0 to 9999
// let a = [];
// for (let i=0;i<500;++i) a[i]=i;

// console.log(a)
// shuffle that array randomly
// function shuffle(array) {
//     let tmp, current, top = array.length;
//     if(top) while(--top) {
//         current = Math.floor(Math.random() * (top + 1));
//         tmp = array[current];
//         array[current] = array[top];
//         array[top] = tmp;
//     }
//     return array;
// }
//
// a = shuffle(a);
// for(let i=1; i<=tokenNumber; i++) {
//     copyFile(i, a[i-1]+1);
// }

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
// ]
// let counter = 0
//
// for(let i=0; i<folders.length; i++){
//     for(let j=1; j<=folders[i].number; j++){
//         counter += 1
//         writeFile(counter, folders[i].name);
//
//     }
// }
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