const fs = require('fs');

// File specifics
// {
//     "name":"ThetaPug #1",
//     "symbol":"PUG",
//     "description":"A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain",
//     "image":"https://arweave.net/<ID>/1.png",
//     "external_url": "https://thetapugs.com/",
// }

let info = [
    { name: "A", number: 50 },
    { name: "B", number: 40 },
    { name: "C", number: 40 },
    { name: "D", number: 50 },
    { name: "E", number: 50 },
    { name: "F", number: 30 },
    { name: "G", number: 30 },
    { name: "H", number: 30 },
    { name: "I", number: 50 },
    { name: "J", number: 50 },
    { name: "K", number: 20 },
    { name: "L", number: 20 },
    { name: "M", number: 50 },
    { name: "N", number: 50 },
    { name: "ENE", number: 20 },
    { name: "O", number: 50 },
    { name: "P", number: 30 },
    { name: "Q", number: 20 },
    { name: "R", number: 50 },
    { name: "S", number: 50 },
    { name: "T", number: 50 },
    { name: "U", number: 30 },
    { name: "V", number: 20 },
    { name: "W", number: 20 },
    { name: "X", number: 20 },
    { name: "Y", number: 20 },
    { name: "Z", number: 20 },

    { name: "+", number: 20 },
    { name: "=", number: 20 },
    { name: "%3F", number: 30 },
    { name: "$", number: 50 },

    { name: "0", number: 30 },
    { name: "1", number: 30 },
    { name: "2", number: 30 },
    { name: "3", number: 30 },
    { name: "4", number: 30 },
    { name: "5", number: 30 },
    { name: "6", number: 30 },
    { name: "7", number: 30 },
    { name: "8", number: 30 },
    { name: "9", number: 30 },
]

const baseImageURI = [
    "https://arweave.net/lgk3mJiGtNfNO3qA7v-ywFR6sAwdXT3LRdwKgb5MNBY/",
]


const baseName = "ThetaBet / First Edition";
const symbol = "TT";
const description = "Collectable characters and numbers, a unique take on the alphabet. Everyone has a letter or number that’s personal to them and our aim is make NFTs as memorable as possible. Play our word games using your ThetaBet NFT letters to win TFUEL.";
const external_url = "https://thetabetnft.com";
const twitter = "https://twitter.com/ThetaBets";
const creator = "ThetaBet"
// const tokenNumber = count;


// Create a array with numbers from 0 to 1380
let a = [];
let c = 0
for (let i=0;i<info.length; i++) {
    for(let j=1; j<=info[i].number; j++) {
        a[c] = info[i].name
        c++;
    }
}

// console.log(a)
// shuffle that array randomly
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

a = shuffle(a);


async function writeFile(symbol, jsonId) {
    let image = baseImageURI[0]+(symbol).toString()+".png";

    if(symbol === "%3F") {
        symbol = "?"
    }
    data =  {
        "name": baseName,
        "description": description,
        "image": image,
        "creator": creator,
        "external_url": external_url,
        "twitter": twitter,
        "attributes": [
            {
                "trait_type": "Symbol",
                "value": symbol
            }
    ]
    }

    fs.writeFile("./../../../../OpenThetaProjects/ThetaBet/FirstEdition/Metadata/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

for(let i=1; i<=a.length; i++) {
    writeFile(a[i-1], i);
}

// Create a array with numbers from 0 to 9999
// let a = [];
// for (let i=1;i<=tokenNumber;++i){
//     writeFile(i)
// }