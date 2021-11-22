const fs = require('fs');

// Permabull
// const baseName = "Theta Permabull #";
// const symbol = "TPB";
// const description = "By holding one of the 444 Theta Permabull badges, it shows that you are Hardcore Theta Holder.";
// let baseImageURI = "https://arweave.net/SA4PXBTjqAa5ee7oTuCuvfwJkzR2LtaNdwBn_S-bOfU";
// const twitter = "https://twitter.com/R3tt2";
// const creator = "Fr0zenfir3";
// const tokenNumber = 444

// ThetaDiamond
const baseName = "Self Illusion #";
const symbol = "SI";
const description = "The timelines of self are limitless.";
let baseImageURI = "https://arweave.net/3SMxXka-01fQ_5tVUoT4ZdtH6sVfLp2pk8oqMSpkKxE/SelfIllusion.png";
const twitter = "https://twitter.com/ThetaDiamond";
const external_url = "thetadiamond.com";
const creator = "ThetaDiamond";
const collection = "Psychedelic Genesis";
const tokenNumber = 50;


async function writeFile(id) {
    let data = {
        name: baseName+(id+1).toString(),
        symbol: symbol,
        description: description,
        image: baseImageURI,
        twitter: twitter,
        external_url: external_url,
        Collection: collection,
        creator: creator,
    }
    fs.writeFile("./../../../OpenThetaProjects/ThetaDiamond/SelfIllusion/JsonMetadata/"+id.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

for(let i=0; i<tokenNumber; i++) {
    writeFile(i);
}