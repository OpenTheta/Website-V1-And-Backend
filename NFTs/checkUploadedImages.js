const axios = require('axios');
const fs = require('fs');

let baseURL = "https://arweave.net/E_N2Zv71DYSfO8jIwC5Vm2IbRJQXIZnVbpti6eqq3ws/"
let originalDir = "./../../../OpenTheta/Projects/ThetaGrunberg/images/imagesPearls/"
let downloadDir = "./../../../OpenTheta/Projects/ThetaGrunberg/images/imagesPearls2/"

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function checkImage(name){
    try{
        fs.readFileSync(downloadDir+name)
    } catch {
        try{
            await downloadImage(baseURL+name, name)
        } catch {
            await sleep(1000)
            await downloadImage(baseURL+name, name)
        }

    }
    let img1 = fs.readFileSync(originalDir+name)
    let img2 = fs.readFileSync(downloadDir+name)
    let buf1 = Buffer.from(img1)
    let buf2 = Buffer.from(img2)
    let res = Buffer.compare(buf1, buf2);
    if(res !== 0) console.log(name)
    if(res !== 0) {
        // console.log(name)
        await sleep(500)
        try{
            await downloadImage(baseURL+name, name)
        } catch {}
        img1 = fs.readFileSync(originalDir+name)
        img2 = fs.readFileSync(downloadDir+name)
        buf1 = Buffer.from(img1)
        buf2 = Buffer.from(img2)
        res = Buffer.compare(buf1, buf2);
        if(res !== 0) {
            console.log(name)
        }
    }
}

async function downloadImage (image, name) {
    const writer = fs.createWriteStream(downloadDir + name)
    const response = await axios.get(image,{
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}


// fs.readdirSync("./../../../OpenThetaProjects/BangkokBuddhaBar/BangkokBuddhaBar/images/").forEach(file => {
//     checkImage(file)
// })

async function readFiles(dir) {
    // await checkImage("1.jpg")
    const files = fs.readdirSync(dir)
    //
    // console.log(files)
    let promises = []
    for (const file of files) {
        if(file !== '.DS_Store'){
            promises.push(checkImage(file));
            if(promises.length >= 20){
                await Promise.all(promises)
                promises=[]
                await sleep(100)
            }
            // await checkImage(file);
        }
    }
    if(promises.length >= 1){
        await Promise.all(promises)
        promises=[]
    }
}

// checkImage("252.jpg")
//
readFiles(originalDir)