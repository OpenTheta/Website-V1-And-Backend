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
const baseName = "indientz";
// const symbol = "TG";
const description = 'A collection of captures of interdimensional entities caught manifesting in satellite data of the sun. Catch a glimpse into the real metaverse across time, space, and dimensionality. This is not a generative project, it is a collision of scientific data and artistic flare.';
let baseImageURI = "https://arweave.net/YulI6YgGzw17HQudNatqMAhE34t3XXvSW6dIvs_HokY/";
const twitter = "https://twitter.com/zenba_nft";
const external_url = "zenba.net";
// const animation_url = "https://arweave.net/k7i4crpNeFcuEkVnFmDaBEv3mUZlHJHizQcoEO6FbnE/XMAS.mp4";
const creator = "zenba";
// const collection = "Zilla-Mania";
const tokenNumber = 6;
const attributes = [{"trait_type": "Type", "value": "Redeemable"}]


async function writeFile(id) {
    let data = {
        // name: baseName+(id).toString(),
        name: baseName,
        // symbol: symbol,
        description: description,
        image: baseImageURI + (id).toString() + ".png",
        // animation_url: animation_url,
        external_url: external_url,
        creator: creator,
        twitter: twitter,
        attributes: attributes
        // collection: collection
    }
    fs.writeFile("./../../../OpenThetaProjects/Zenba/indientz/metadata/redeemable/"+id.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

for(let i=1; i<=tokenNumber; i++) {
    writeFile(i);
}