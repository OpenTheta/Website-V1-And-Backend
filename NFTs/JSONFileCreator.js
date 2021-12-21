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
const baseName = "Xmas Greetings TB#";
// const symbol = "TG";
const description = 'Seasons Greetings from Thetabet, to all the Theta community.';
let baseImageURI = "https://arweave.net/7qyaWKfGvLswrmMAngjHeTxYrm3tvyia-9CKmjnxK4Y/XMAS.png";
const twitter = "https://twitter.com/ThetaBets";
const external_url = "https://thetabetnft.com";
const animation_url = "https://arweave.net/k7i4crpNeFcuEkVnFmDaBEv3mUZlHJHizQcoEO6FbnE/XMAS.mp4";
const creator = "ThetaBet";
// const collection = "Zilla-Mania";
const tokenNumber = 100;


async function writeFile(id) {
    let data = {
        name: baseName+(id).toString(),
        // symbol: symbol,
        description: description,
        image: baseImageURI,
        animation_url: animation_url,
        twitter: twitter,
        external_url: external_url,
        // collection: collection,
        creator: creator,
    }
    fs.writeFile("./../../../OpenThetaProjects/ThetaBet/AnimatedNFTs/MetadataXMAS/"+id.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

for(let i=1; i<=tokenNumber; i++) {
    writeFile(i);
}