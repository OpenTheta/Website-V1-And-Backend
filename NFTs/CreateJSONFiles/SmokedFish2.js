const fs = require("fs");


let baseURL = "https://arweave.net/h0Yql_Dmk_HIY5PITlydrx-jVTU6Yf-4a-bGzUJ6wtE/"
const external_url = "https://www.clearlakeecoretreat.com/camp-theta.html";
const creator = "Max Theta";
const twitter = "https://twitter.com/max_theta"

// const dir = "./../../../../OpenThetaProjects/MaxTheta/SmokedFish2/json/_metadata.json"
// const dir2 = "./../../../../OpenThetaProjects/MaxTheta/SmokedFish2/json/metadata_ranked.json"
// let file = fs.readFileSync(dir)
// let file2 = fs.readFileSync(dir2)
//
// file = JSON.parse(file)
// file2 = JSON.parse(file2)
//
// let counter = 0
//
// for (const metadata of file) {
//     let i = 0
//     while(metadata.name !== file2[i].name){
//         i++
//     }
//     // console.log(metadata.name, file2[i].description)
//     metadata.description = file2[i].description
//     counter++
//     metadata.image = baseURL + metadata.image.split("NewUriToReplace/")[1]
//     metadata["creator"] = creator
//     metadata["external_url"] = external_url
//     metadata["twitter"] = twitter
//     // break
//     fs.writeFile("./../../../../OpenThetaProjects/MaxTheta/SmokedFish2/metadata/"+counter+".json", JSON.stringify(metadata, null, 4), function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }

// Make one big JSON file:
// const dir = "./../../../../OpenThetaProjects/MaxTheta/SmokedFish2/json-3/"
//
// let files = []
//
// for (let i=1; i<= 420; i++) {
//     let file = fs.readFileSync(dir+i+".json")
//     file = JSON.parse(file)
//     file.image = baseURL + file.image.split("NewUriToReplace/")[1]
//     file["creator"] = creator
//     file["external_url"] = external_url
//     file["twitter"] = twitter
//     files.push(file)
// }
//
// fs.writeFile("./../../../../OpenThetaProjects/MaxTheta/SmokedFish2/metadataFinal.json", JSON.stringify(files, null, 4), function(err) {
//     if (err) {
//         console.log(err);
//     }
// });








const dir = "./../../../../OpenThetaProjects/MaxTheta/SmokedFish2/metadataFinal.json"
let file = fs.readFileSync(dir)

file = JSON.parse(file)
let counter = 0
for (const metadata of file) {
    counter++

    fs.writeFile("./../../../../OpenThetaProjects/MaxTheta/SmokedFish2/metadata/"+counter+".json", JSON.stringify(metadata, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
}