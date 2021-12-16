const fs = require('fs');

// File specifics
// {
//     "name":"ThetaPug #1",
//     "symbol":"PUG",
//     "description":"A Collection of 10,000 Randomly Generated Pug NFTs, exclusive to the Theta Blockchain",
//     "image":"https://arweave.net/<ID>/1.png",
//     "external_url": "https://thetapugs.com/",
// }

const baseImageURI = [
    "https://arweave.net/_4QgVuZ0y70WVl6lMUiZdEVOc8Xb_gFFijpIidpyeW8", // 888
]


// const baseName = "ThetaZilla #";
const symbol = "TT";
const description = "Tfuel Tonic to the rescue! This craftily concocted cocktail is sure to fix Meemop's multiplying mutation! With just the right twist of Tfuel, some bitters and a good dose of SuperEarth elixir, Meemop will be back to his regular happy, hopping self in no time!";
// const external_url = "www.ThetaTeeth.com";
const twitter = "https://twitter.com/itsfeldman";
const tokenNumber = 888;

const baseName = "TFuel Tonic #";
const creator = "Cyko KO"
// const symbol = "SP";
// const description = "This NFT is limited to ten editions";
// const tokenNumber = 10;

async function writeFile(jsonId) {
    // fs.readFile('./../../../OpenThetaProjects/ThetaTeeth/json/'+ (jsonId) + '.json', 'utf8' , (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
        // let image = baseImageURI[0]+(jsonId).toString()+".png";
        // let image = baseImageURI

        // data =  JSON.parse(data);
    let data = {
        name: baseName + jsonId.toString(),
        image: baseImageURI[0],
        description: description,
        creator: creator,
        twitter: twitter
    }
        // data.description = description;
        // data["external_url"] = external_url;
        // data.name = baseName + (jsonId).toString();
        // data["twitter"] = twitter;
        // data["image"] = image;
        // data["creator"] = creator;
        // delete data.compiler;
        fs.writeFile("./../../../../OpenThetaProjects/CykoKO/Meemop/TFuelTonic/metadata/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    // });
}
// const baseID = 7000;
// for(let i=1; i<=tokenNumber; i++) {
//     writeFile( baseID+i);
// }

// Create a array with numbers from 0 to 9999
let a = [];
for (let i=1;i<=tokenNumber;++i){
    writeFile(i)
}
