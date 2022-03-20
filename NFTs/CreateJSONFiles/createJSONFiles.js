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
    "https://arweave.net/ZLYjT_UcF4J0TKkepDJ8SvPla8KPqYVjiAR7xhDKbiU", // 55
]

const baseName = "Mega Meemop! #";
const description = 'This Theta-fueled little guy is ready for some blockchain action! Meep!!!!'
const external_url = "https://www.meemopmania.com"
const twitter = "https://twitter.com/itsfeldman";
const tokenNumber = 73;
// const attributes = [
//     {
//         "trait_type": "Tier",
//         "value": "2"
//     }
// ]


const creator = "Cyko KO"
const collection = ""

async function writeFile(jsonId, extension) {
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
        // name: baseName,
        // image: baseImageURI[0] + jsonId + "." + extension,
        image: baseImageURI[0],
        description: description,
        // attributes:attributes,
        external_url: external_url,
        creator: creator,
        twitter: twitter,
        // collection: collection
    }
        // data.description = description;
        // data["external_url"] = external_url;
        // data.name = baseName + (jsonId).toString();
        // data["twitter"] = twitter;
        // data["image"] = image;
        // data["creator"] = creator;
        // delete data.compiler;
        fs.writeFile("./../../../../OpenThetaProjects/CykoKo/Meemop/MegaMeemop/metadata/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    // });
}
const baseID = 0;
for(let i=1; i<=tokenNumber; i++) {
    writeFile( baseID+i);
}

// Create a array with numbers from 0 to 9999
// let a = [];
// for (let i=1;i<=tokenNumber;++i){
//     writeFile(i,)
// }

// let counter = 1
// fs.readdirSync("./../../../../OpenThetaProjects/Zenba/indientz/FullDiscs/").forEach(file => {
//     let arr = file.split(".")
//     if(arr[1] === "jpg") {
//         fs.copyFile(`./../../../../OpenThetaProjects/Zenba/indientz/FullDiscs/${file}`, `./../../../../OpenThetaProjects/Zenba/indientz/FullDiscs/test/${counter}.jpg`, (err) => {
//             if (err) throw err;
//             console.log('File was copied to destination');
//         });
//         counter ++
//     }
//     // let extension = arr.pop()
//     // let newName = file.replace(/(^\d+)(.+$)/i,'$1') + "." + extension;
//     // console.log(arr[0], arr[1])
//     // writeFile(arr[0], arr[1])
// });
