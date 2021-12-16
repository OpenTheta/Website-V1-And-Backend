const fs = require('fs');

// File specifics
// {
//     "name":"ThetaPug #1",
//     "symbol":"PUG",
//     "description":"A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain",
//     "image":"https://arweave.net/<ID>/1.png",
//     "external_url": "https://thetapugs.com/",
// }

const addressesPugs = [
    "https://arweave.net/YJLdpyCfW0K2Yn1xeEK3KVY235wyCNMPlp9q9On_D7Q/", // 200
    "https://arweave.net/8T_VfjzgnHt7Iwa6zVE-wsfuTHwcFSr8QOY0NV_gxx8/", // 200
    "https://arweave.net/hJsdhSOrZhJMrlYUGg6kFQ_-QUUV8W-exBjh-IoTM54/", // 600
    "https://arweave.net/47ggzKP4Xqpk1UMp9QBg18dTBymDe7QENLOlt6R_hHw/", // 3000
    "https://arweave.net/dbOOk4kjP7xoB89s569BGvDZEN78l-aivvD3-FDyy4c/", // 3000
    "https://arweave.net/KNNe__aopa6zUB932ZhOefKmmLxaQuayo5gYhXSyU6I/", // 3000
]

const addressesZilla = [
    "https://arweave.net/VwrAo8nPsjrNQKFv74SWgzJA5GVirV-evq6vK7ipPMQ/", // 2000
    "https://arweave.net/FrYgMSDNl0mZXJfn7tb0rifZEbgobip1BVnebxx4QZc/", // 2000
    "https://arweave.net/PDrYqC-uycn0RLBJZ_Fd2UUxIXf2aNHWLX11LREjA_4/", // 2000
    "https://arweave.net/1z2YcGJzblpD0ualXBka7NlTWVLwqDfLLTDGnvSQrlc/", // 2000
    "https://arweave.net/xoKLhxwbaTkYcuwjP8rZK4JmpAdrDCVl5Caq6b8r-XU/", // 2000
]


const baseName = "ThetaZilla #";
const symbol = "TZ";
const description = "A new era of technology has spawned a legendary generation of monsters. Can you capture these digital kings?";
let baseImageURI = addressesZilla[0];
// const external_url = "https://thetapugs.com";
const tokenNumber = 10000;

// const baseName = "Swimming Porsche #";
// const symbol = "SP";
// const description = "This NFT is limited to ten editions";
// const baseImageURI = "https://arweave.net/EGr01u62EPAfCMniX-1UfdEJ0UqgAjr-NnU5TkROZQo/"
// const tokenNumber = 10;

async function writeFile(jsonId, id, attributes) {
    let data = {
        name: baseName+(id+1).toString(),
        symbol: symbol,
        description: description,
        image: baseImageURI+(id+1).toString()+".png",
        twitter: "https://twitter.com/ThetaZillaClub",
        attributes: attributes,
    }
    fs.writeFile("./../../../OpenThetaProjects/ThetaZillaClub/JSONFinal2/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}
// const baseID = 7000;
// for(let i=1; i<=tokenNumber; i++) {
//     writeFile( baseID+i);
// }

// Create a array with numbers from 0 to 9999
let a = [];
for (let i=0;i<10000;++i) a[i]=i;

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

fs.readFile('./../../../OpenThetaProjects/ThetaZillaClub/json/_metadata.json', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // console.log(JSON.parse(data)[0].attributes[0]);
    const baseID = 0;
    for(let i=0; i<tokenNumber; i++) {
        console.log(i);
        let checkSum = Math.floor(a[i] / 2000);
        baseImageURI = addressesZilla[checkSum];
        let attribute = [
            { trait_type: 'Background', value: JSON.parse(data)[a[i]].attributes[0].value },
            { trait_type: 'Scales', value: JSON.parse(data)[a[i]].attributes[2].value },
            { trait_type: 'Body', value: JSON.parse(data)[a[i]].attributes[3].value },
            { trait_type: 'Chest', value: JSON.parse(data)[a[i]].attributes[4].value },
            { trait_type: 'Mouth', value: JSON.parse(data)[a[i]].attributes[5].value },
            { trait_type: 'Earring', value: JSON.parse(data)[a[i]].attributes[6].value },
            { trait_type: 'Hat', value: JSON.parse(data)[a[i]].attributes[7].value },
            { trait_type: 'Eyes', value: JSON.parse(data)[a[i]].attributes[8].value },
            { trait_type: 'Tattoo', value: JSON.parse(data)[a[i]].attributes[9].value },
            { trait_type: 'Nails', value: JSON.parse(data)[a[i]].attributes[10].value },
            { trait_type: 'Torso', value: JSON.parse(data)[a[i]].attributes[11].value },
            { trait_type: 'Prop', value: JSON.parse(data)[a[i]].attributes[12].value },
            { trait_type: 'Laser Eyes', value: JSON.parse(data)[a[i]].attributes[13].value },
        ];
        writeFile( i, a[i], attribute);
    }
});