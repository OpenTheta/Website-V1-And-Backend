const fs = require('fs');

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
const tokenNumber = 10000;

async function writeFile(jsonId, id, attributes) {
    let data = {
        name: baseName+(id).toString(),
        symbol: symbol,
        description: description,
        image: baseImageURI+(id).toString()+".png",
        twitter: "https://twitter.com/ThetaZillaClub",
        attributes: attributes,
    }
    fs.writeFile("./../../../OpenThetaProjects/ThetaZillaClub/JSONFinal2/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

fs.readFile('./../../../OpenThetaProjects/ThetaZillaClub/json/_metadata.json', 'utf8' , (err, metaData) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let i = 0; i<10000; i++) {
        fs.readFile('./../../../OpenThetaProjects/ThetaZillaClub/JSONFinal/'+i+'.json', 'utf8' , (err, data) => {
            // console.log(i, parseInt(JSON.parse(data).name.substring(12)));
            let id = parseInt(JSON.parse(data).name.substring(12));
            let attribute = [
                JSON.parse(metaData)[id-1].attributes[0],
                JSON.parse(metaData)[id-1].attributes[2],
                JSON.parse(metaData)[id-1].attributes[3],
                JSON.parse(metaData)[id-1].attributes[4],
                JSON.parse(metaData)[id-1].attributes[5],
                JSON.parse(metaData)[id-1].attributes[6],
                JSON.parse(metaData)[id-1].attributes[7],
                JSON.parse(metaData)[id-1].attributes[8],
                JSON.parse(metaData)[id-1].attributes[9],
                JSON.parse(metaData)[id-1].attributes[10],
                JSON.parse(metaData)[id-1].attributes[11],
                JSON.parse(metaData)[id-1].attributes[12],
                JSON.parse(metaData)[id-1].attributes[13],
            ];
            let checkSum = Math.floor(id / 2000);
            baseImageURI = addressesZilla[checkSum];
            console.log(i);
            writeFile( i, id, attribute);
        });
    }
});