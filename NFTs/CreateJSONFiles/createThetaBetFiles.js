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
    { name: "5X.json", number: 24 },
    { name: "10X_Confetii.json", number: 24 },
    { name: "10X_TB1.json", number: 10 },
    { name: "10X_Universe.json", number: 24 },
    { name: "Barrizan_MINT.json", number: 4 },
    { name: "HODL_TB1.json", number: 10 },
    { name: "HODL_TB2.json", number: 10 },
    { name: "HODL_TB3.json", number: 10 },
    { name: "MINT_TB1.json", number: 24 },
    { name: "MINT_TB2.json", number: 24 },
    { name: "MINT_TB3.json", number: 24 },
    { name: "Mystic_Gurus_MINT.json", number: 4 },
    { name: "NFT_Space.json", number: 10 },
    { name: "NFT_TB1.json", number: 10 },
    { name: "NFT_TB2.json", number: 10 },
    { name: "Pineapple_TB2.json", number: 24 },
    { name: "PUMP_TB1.json", number: 24 },
    { name: "PUMP_TB2.json", number: 24 },
    { name: "PUMP_TB3.json", number: 24 },
    { name: "PUNK_TB1.json", number: 30 },
    { name: "PUNK_TB2.json", number: 30 },
    { name: "PUNK_TB3.json", number: 30 },
    { name: "PUNK_TB4.json", number: 30 },
    { name: "PUNK_TB5.json", number: 10 },
    { name: "PUNK_TB6.json", number: 10 },
    { name: "PUNK_TB7.json", number: 10 },
    { name: "PUNK_TB8.json", number: 10 },
    { name: "PUNK_TB9.json", number: 10 },
    { name: "PUNK_TB10.json", number: 10 },
    { name: "PUNK_TB11.json", number: 10 },
    { name: "PUNK_TB12.json", number: 10 },
    { name: "Red_Bull.json", number: 10 },
    { name: "Silver_Bull.json", number: 10 },
    { name: "ThetaTeeth_MINT.json", number: 4 },
    { name: "Thetaverse.json", number: 24 },
    { name: "WTF_GRAFFITI_TB1.json", number: 10 },
    { name: "WTF_GRAFFITI_TB2.json", number: 10 },
    { name: "WTF_Space.json", number: 24 }
]

const baseImageURI = [
    "https://arweave.net/jZ8e_0zgVZDMqzXN2E0kRLbZClZSyKrcpbriuq5wGZQ/",
]


// const baseName = "ThetaBet / First Edition";
// const symbol = "TT";
// const description = "Collectable characters and numbers, a unique take on the alphabet. Everyone has a letter or number that’s personal to them and our aim is make NFTs as memorable as possible. Play our word games using your ThetaBet NFT letters to win TFUEL.";
// const external_url = "https://thetabetnft.com";
// const twitter = "https://twitter.com/ThetaBets";
// const creator = "ThetaBet"
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

let names = {}
async function writeFile(symbol, jsonId) {
    // let image = baseImageURI[0]+(symbol).toString()+".png";
    //
    // if(symbol === "%3F") {
    //     symbol = "?"
    // }
    // data =  {
    //     "name": baseName,
    //     "description": description,
    //     "image": image,
    //     "creator": creator,
    //     "external_url": external_url,
    //     "twitter": twitter,
    //     "attributes": [
    //         {
    //             "trait_type": "Symbol",
    //             "value": symbol
    //         }
    // ]
    // }
    let data = await fs.readFileSync('./../../../../OpenThetaProjects/ThetaBet/WordsEdition/metadata/'+symbol)
    data = JSON.parse(data)
    data.image = baseImageURI[0] + data.image

    if(data.animation_url){
        data.animation_url = baseImageURI[0] + data.animation_url
    }

    if(names[data.name]){
        names[data.name] +=1
    } else {
        names[data.name] = 1
    }

    data.name = data.name + " #" + names[data.name]


    fs.writeFile("./../../../../OpenThetaProjects/ThetaBet/WordsEdition/metadataFinal/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}
// writeFile("5X.json", 1);
for(let i=1; i<=a.length; i++) {
    writeFile(a[i-1], i);
}

// Create a array with numbers from 0 to 9999
// let a = [];
// for (let i=1;i<=tokenNumber;++i){
//     writeFile(i)
// }