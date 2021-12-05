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
const baseName = "Thetians Galaxy - I. Encounter #";
const symbol = "TG";
const description = "Earth has failed. Wars, overpopulation and greed has has brought our old home to its knees. A group of brave explorers has set out to find a new, prosperous galaxy we can call home. After months of research Professor Lucas set out to explore the galaxy known as GOAT 888. Upon circling a planet, very similar to earth, he notices a mysterious glowing object and decides to land his ship. As he passed through a thick forrest, he finds himself at the shores of a lake and gazes upon something miraculous … the first encounter.";
let baseImageURI = "https://arweave.net/10Kkbj5yrZW-Yq4aLXEvVHvL6tflWLKDwCVn6fqdrl0";
const twitter = "https://twitter.com/ThetaDiamond";
const external_url = "thetadiamond.com";
const creator = "ThetaNostra";
const collection = "Galaxy of the Ancient Thetians";
const tokenNumber = 222;


async function writeFile(id) {
    let data = {
        name: baseName+(id+1).toString(),
        symbol: symbol,
        description: description,
        image: baseImageURI,
        // twitter: twitter,
        // external_url: external_url,
        Collection: collection,
        creator: creator,
    }
    fs.writeFile("./../../../OpenThetaProjects/ThetaNostra/ThetiansGalaxy-I.Encounter/MetaData/"+id.toString()+".json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

for(let i=0; i<tokenNumber; i++) {
    writeFile(i);
}