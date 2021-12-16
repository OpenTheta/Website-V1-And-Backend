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
const baseName = "TRS Bull #";
// const symbol = "TG";
const description = "Theta Research Squad Bull represents those who never stop digging, finding, and sharing content in the hopes of advancing our mission: global adoption of Theta Network.";
let baseImageURI = "https://arweave.net/GEVHOyPMhoBdRfi7pDJB9RzFVi2ZlIbujGEGuBtDOFA";
const twitter = "https://twitter.com/Thresh_Theta";
const external_url = "";
const creator = "ThetaBulls";
const collection = "";
const tokenNumber = 44;


async function writeFile(id) {
    let data = {
        name: baseName+(id).toString(),
        // symbol: symbol,
        description: description,
        image: baseImageURI,
        twitter: twitter,
        // external_url: external_url,
        // Collection: collection,
        creator: creator,
    }
    fs.writeFile("./../../../OpenThetaProjects/ThetaBulls/TRSBulls/MetaData/"+id.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

for(let i=1; i<=tokenNumber; i++) {
    writeFile(i);
}