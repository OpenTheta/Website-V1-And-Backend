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
let count = 0
for(let i=0; i<info.length; i++){
    count += info[i].number
}
console.log(count)
const baseImageURI = [
    "https://arweave.net/T-P7U4CWaQwZlw3CUU6CBftAtLhRklIZZv8DIhryJ1w/", // 888
]


// const baseName = "ThetaZilla #";
const symbol = "TT";
const description = "ThetaTeeth is a collection of 3232 unique NFTs. In ancient times teeth were used as tokens by hunters and they were quite symbolic. This is very common and coincides with our vision that Theta blockchain is still in its infancy and we, just like ancient hunters, want to have something symbolic to remember about these early days.";
const external_url = "www.ThetaTeeth.com";
const twitter = "https://twitter.com/theta_teeth";
const tokenNumber = 3232;

// const baseName = "Meemop Mania #";
// const creator = "Cyko KO"
// const symbol = "SP";
// const description = "This NFT is limited to ten editions";
// const tokenNumber = 10;

async function writeFile(jsonId) {
    fs.readFile('./../../../OpenThetaProjects/ThetaTeeth/json/'+ (jsonId) + '.json', 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let image = baseImageURI[0]+(jsonId).toString()+".png";

        data =  JSON.parse(data);
        data.description = description;
        data["external_url"] = external_url;
        // data.name = baseName + (jsonId).toString();
        data["twitter"] = twitter;
        data["image"] = image;
        // data["creator"] = creator;
        delete data.compiler;
        fs.writeFile("./../../../OpenThetaProjects/ThetaTeeth/Metadata/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
}
// const baseID = 7000;
// for(let i=1; i<=tokenNumber; i++) {
//     writeFile( baseID+i);
// }

// Create a array with numbers from 0 to 9999
// let a = [];
// for (let i=1;i<=tokenNumber;++i){
//     writeFile(i)
// }