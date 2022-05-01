const fs = require('fs');
const axios = require('axios');
const path = require('path');
const sharp = require("sharp");

async function imageWorker(data) {
    for(let i=data.length - 1;i>=0; i--){
        // console.log(typeof data[i].imgUrl)
        await downloadImage(data[i].imgUrl, data[i].contract,".jpg")
        scaleImage(data[i].contract, ".jpg",".jpg")
        console.log(data[i].contract)
    }
}

async function creatorImageWorker(data) {
    for(let i=0;i<data.length; i++){
        await downloadImage("https://open-theta.de/api/images/creators/"+data[i].img, data[i].img, '')
        // await scaleImage(data[i].img.slice(0,-3), data[i].img.slice(-3), "png")
        await scaleImage(data[i].img.slice(0,-3), data[i].img.slice(-3), "jpg")
        // getSmallestImage(data[i].img.slice(0,-4))
    }
}

async function scaleImage(name, fromType, toType) {
    let fromName = name+fromType
    let toName = name+toType
    // console.log(name+fromType, name+toType)
    const originalImage = path.resolve(__dirname, "./../../../OpenThetaProjects/AllProjectImages/Projects/"+fromName);

    await sharp(originalImage)
        .resize({
            width: 400,
            height: null,
        })
        .toFile(path.resolve(__dirname, "./../../../OpenThetaProjects/AllProjectImages/Projects/rescaledImages/"+toName));

    // console.log("Successfully resized an image!");
}

async function downloadImage (image, name, type) {
    const writer = fs.createWriteStream(`./../../../OpenThetaProjects/AllProjectImages/Projects/${name}${type}`)
    const response = await axios.get(image,{
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

// async function getSmallestImage(name){
//     let pngDetail = fs.statSync(`./../../../OpenThetaProjects/AllProjectImages/Creators/rescaledImages/${name}.png`);
//     let jpgDetail = fs.statSync(`./../../../OpenThetaProjects/AllProjectImages/Creators/rescaledImages/${name}.jpg`);
//     let pngSizeMB = pngDetail.size / (1024*1024);
//     let jpgSizeMB = jpgDetail.size / (1024*1024);
//     if(jpgSizeMB <= pngSizeMB){
//         name = name + ".jpg"
//     } else {
//         name = name + ".png"
//     }
//     fs.copyFile(`./../../../OpenThetaProjects/AllProjectImages/Creators/rescaledImages/${name}`, `./../../../OpenThetaProjects/AllProjectImages/Creators/rescaledImages/final/${name}`, (err) => {
//         if (err) throw err;
//         console.log('File was copied to destination');
//     });
// }

// axios.get("https://open-theta.de/api/static/creators.json").then(res => {
//     let data = res.data
//     creatorImageWorker(data).then(() => {
//         console.log("Finished")
//     })
// })

// axios.get("https://open-theta.de/api/projects").then(res => {
//     let data = res.data
//     imageWorker(data).then(() => {
//         console.log("Finished")
//     })
// })

async function scaleImageLocal() {
    // console.log(name+fromType, name+toType)
    const originalImage = path.resolve(__dirname, "./../../../OpenThetaProjects/JoeyTV/Kittens/VixenKittens.png");

    await sharp(originalImage)
        .resize({
            width: 400,
            height: 400,
            fit: sharp.fit.contain,
        })
        .toFile(path.resolve(__dirname, "./../../../OpenThetaProjects/JoeyTV/Kittens/VixensKittens.jpg"));

    console.log("Successfully resized an image!");
}

scaleImageLocal()


// let fileDetail = fs.statSync("./../../../OpenThetaProjects/AllProjectImages/Creators/ThetaBulls.png");
// let imageSize = fileDetail.size;
// let imageSizeMB = fileDetail.size / (1024*1024);
//
// console.log('Size File in MB:' + imageSizeMB);
// console.log('Image Size:' + imageSize);


// axios.get("https://open-theta.de/api/static/creators.json").then(res => {
//     let data = res.data
//     creatorImageWorker(data).then(() => {
//         console.log("Finished")
//     })
// })
