const fs = require('fs');

// File specifics
// {
//     "name":"ThetaPug #1",
//     "symbol":"PUG",
//     "description":"A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain",
//     "image":"https://arweave.net/<ID>/1.png",
//     "external_url": "https://thetapugs.com/",
// }

const addresses = [
    "https://arweave.net/YJLdpyCfW0K2Yn1xeEK3KVY235wyCNMPlp9q9On_D7Q/", // 200
    "https://arweave.net/8T_VfjzgnHt7Iwa6zVE-wsfuTHwcFSr8QOY0NV_gxx8/", // 200
    "https://arweave.net/hJsdhSOrZhJMrlYUGg6kFQ_-QUUV8W-exBjh-IoTM54/", // 600
    "https://arweave.net/47ggzKP4Xqpk1UMp9QBg18dTBymDe7QENLOlt6R_hHw/", // 3000
    "https://arweave.net/dbOOk4kjP7xoB89s569BGvDZEN78l-aivvD3-FDyy4c/", // 3000
    "https://arweave.net/KNNe__aopa6zUB932ZhOefKmmLxaQuayo5gYhXSyU6I/", // 3000
]


const baseName = "ThetaPugs #";
const symbol = "PUG";
const description = "A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain";
const baseImageURI = addresses[5];
const external_url = "https://thetapugs.com";
const tokenNumber = 3000;

// const baseName = "Swimming Porsche #";
// const symbol = "SP";
// const description = "This NFT is limited to ten editions";
// const baseImageURI = "https://arweave.net/EGr01u62EPAfCMniX-1UfdEJ0UqgAjr-NnU5TkROZQo/"
// const tokenNumber = 10;

async function writeFile(id) {
    let data = {
        name: baseName+id.toString(),
        symbol: symbol,
        description: description,
        // image: "https://lzsjdbkzm3d5qscce7wbvigq5yiricj2gmp3oij6u2cwe5pxahdq.arweave.net/XmSRhVlmx9hIQifsGqDQ7hEUCTozH7chPqaFYnX3Acc",
        image: baseImageURI+id.toString()+".png",
        external_url: external_url,
    }
    fs.writeFile("./JSONdata/"+(id - 1).toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}
const baseID = 7000;
for(let i=1; i<=tokenNumber; i++) {
    writeFile( baseID+i);
}
