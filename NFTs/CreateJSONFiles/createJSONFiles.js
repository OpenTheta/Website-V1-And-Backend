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
    "https://arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/GreekGodZilla.jpg", // 55
]

const baseName = "Greek God Zilla #";
const description = "Only the most devoted Zilla-Mania holders will be able to possess Greek-God-Zilla and his powers. Collect all 5 Zilla-Mania NFT’s in order to receive the Greek-God-Zilla as an airdrop from Barrizan."
// const external_url = "https://thetabetnft.com"
const twitter = "https://twitter.com/Barrizan";
const tokenNumber = 15;


const creator = "Barrizan"
const collection = "Zilla-Mania"

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
        // external_url: external_url,
        creator: creator,
        twitter: twitter,
        collection: collection
    }
        // data.description = description;
        // data["external_url"] = external_url;
        // data.name = baseName + (jsonId).toString();
        // data["twitter"] = twitter;
        // data["image"] = image;
        // data["creator"] = creator;
        // delete data.compiler;
        fs.writeFile("./../../../../OpenThetaProjects/Barrizan/Zilla-Mania/Metadata/GreekGodZilla/"+jsonId.toString()+".json", JSON.stringify(data), function(err) {
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
// let a = [];
for (let i=1;i<=tokenNumber;++i){
    writeFile(i,)
}

// fs.readdirSync("./../../../../OpenThetaProjects/ThetaDiamond/EVENTPROXIMA/images/").forEach(file => {
//     let arr = file.split(".")
//     // let extension = arr.pop()
//     // let newName = file.replace(/(^\d+)(.+$)/i,'$1') + "." + extension;
//     // console.log(arr[0], arr[1])
//     writeFile(arr[0], arr[1])
// });
