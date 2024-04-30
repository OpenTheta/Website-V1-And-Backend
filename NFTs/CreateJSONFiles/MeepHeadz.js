const fs = require("fs");

// let baseURL = "https://arweave.net/1hruyeyB8R1cYVyLb9piogK_h8RQjsKybyA9yi5ORnE/"
// const external_url = "https://www.meepheadz.com/";
// const creator = "Cyko KO";
// const twitter = "https://twitter.com/therealcykoko"

// let metadataFile = './../../../../OpenTheta/Projects/CykoKo/metadata.json'

// let data = fs.readFileSync(metadataFile)

// console.log(data)
// data = data.toString()
// data = data.split("\n");
// let allMetadata = []
// let tokens = []
// // data = JSON.parse(data)
// // console.log(JSON.parse(data[3]))
// for(let i=0; i<10000; i++) {
//     data[i] = JSON.parse(data[i])
//     delete data[i].fee_recipient
//     delete data[i].seller_fee_basis_points
//     delete data[i].hash
//     tokens.push(parseInt(data[i]['name'].split(' ')[data[i]['name'].split(' ').length-1]))
//     data[i]['external_url'] = external_url
//     data[i]['image'] = baseURL+data[i]['name'].split(' ')[data[i]['name'].split(' ').length-1]+'.png'
//     data[i]['name'] = "Meep Headz #"+data[i]['name'].split(' ')[data[i]['name'].split(' ').length-1]
//     allMetadata.push(data[i])
// }
//
// for(let i=1; i<=1000; i++){
//     if(!tokens.includes(i)) console.log(i)
// }
//
// function shuffle(array) {
//     let tmp, current, top = array.length;
//     if(top) while(--top) {
//         current = Math.floor(Math.random() * (top + 1));
//         tmp = array[current];
//         array[current] = array[top];
//         array[top] = tmp;
//     }
//     return array;
// }
//
// tokens = shuffle(tokens);
//
// for(let i=0; i<10000; i++){
//     if(!data[tokens[i]-1].name || !data[tokens[i]-1].image || !data[tokens[i]-1].description || !data[tokens[i]-1].attributes) {
//         console.log(i, tokens[i-1])
//     }
//     fs.writeFileSync('./../../../../OpenTheta/Projects/CykoKo/metadata/'+(i+1)+'.json', JSON.stringify(data[tokens[i]-1]))
// }
//
// console.log(allMetadata[1])


// let metadataDir = './../../../../OpenTheta/Projects/CykoKo/metadata/'
// let data = fs.readdirSync(metadataDir)
//
// let allData = []
// for(let i=1; i<=899; i++){
//     let metadata = fs.readFileSync(metadataDir+i+".json")
//     // if(JSON.parse(metadata).name) console.log(JSON.parse(metadata).name)
//     allData.push(JSON.parse(metadata))
// }
//
// fs.writeFileSync('./../../../../OpenTheta/Projects/CykoKo/testMetadata.json', JSON.stringify(allData))

// ThetaDragons
// let metadataDir = './../../../../OpenTheta/Projects/ThetaDragons/FrightNight/metadata'
// let data = fs.readdirSync(metadataDir)
//
// let allData = []
// for(let i=1; i<=40; i++){
//     let metadata = fs.readFileSync(metadataDir+"/Halloween_Dragon_"+i+".json")
//     // metadata = metadata.toString().substring(0, metadata.toString().length-4) + metadata.toString().substring(metadata.toString().length-3)
//     metadata = JSON.parse(metadata)
//     // metadata.name = "Halloween Dragon #"+i
//     metadata.image = "https://arweave.net/ofo4tuwa2tVlFiRTBkH1fq8Zg2hdr8BKGVRScxOnu0A/Halloween_Dragon_"+i+".png"
//     // console.log(metadata)
//     fs.writeFileSync(metadataDir+"/Halloween_Dragon_"+i+".json", JSON.stringify(metadata))
// }

let test =["0xbdf26500cfdb9b1c05f873264fe338b1c7525d56","0x2c8cc7ca53a7c69726896fa32a1852117130f83e","0x7996c968ddd1a2ec336fc6eedcf50e4c7b03fa58","0x7f692471b0d3559c02172bdeb9f4c037594666fc","0xb7e5e5dfd7d1c0a6139a67c9f15e0a95154c6b5c","0xd357997bc3fded6c8178e31cc1bfac321f0289c2","0xb4f91938b133f21937109cdd4079ffa63a688f5a","0x1113431185a6075bf99c9dd6bf2189534a2a3d4a","0xe37223e221842ef0cddf9d7aba6e0278bc8431fb","0xd04d8b2264d1f949cfc45372d5cbf43c45dc473e","0xc83d46e13217e1f1838e1bafcd95f299ae68d439","0xcb032eb5a78eb4f243f0158529bb3bef74a9e68b","0x12097834a542090d788c6e25d0229ff84678602a","0x8f242d527da5d0e5aed9c4aefe1fa1d4511a674a","0x57696a563b66dfa0c180747217d0edcf17a9cd51","0x060ccaacc5e37adb1c26dbbe5c73dc08795162e3","0xf7067cae21593b3950c0ca0ce2195cefa0857de4","0x56c3f5f4ebc00b22d1068c58cb6cda3bd4a65be8","0x9191ff02de2ed2ae15d4d7562a223f34931953d4"]
console.log(test.length)