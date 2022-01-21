const fs = require('fs');

const external_url = "https://www.meemopmania.com";

// for(let i=1; i<=888; i++){
//     fs.readFile('./../../../../OpenThetaProjects/CykoKO/Meemop/Metadata/'+ i +'.json', 'utf8' , (err, data) => {
//         data = JSON.parse(data)
//         data["external_url"] = external_url
//         fs.writeFile('./../../../../OpenThetaProjects/CykoKO/Meemop/MetadataFinal/'+ i +'.json', JSON.stringify(data), function(err) {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     });
// }

// let toUpdate = [141, 148, 258, 263, 447, 1044]
// let videoIds = ["video_qenpp0cuixt2w37vigex8rfm7w", "video_602mbus8srf5y41rwyjdc8nnd7", "video_m2mdzq2igyey18jb4ni27k0cgd", "video_53zipnq7pm8xdiw7qwuk4h7p9g", "video_h8bctfjfft0iymqi8xj9982h2s", "video_adguud85hd10hxdj08tag19txd"]
// let animationBaseUrl =  "https://arweave.net/jRnU46EKV2NUUDcK5m1A6gFDY7CGK5vQRTtfcDtJhCE/"
//
// for(let i=0; i<toUpdate.length; i++){
//     fs.readFile('./../../../../OpenThetaProjects/ThetaDiamond/EVENTPROXIMA/Metadata/'+ toUpdate[i] +'.json', 'utf8' , (err, data) => {
//         // console.log(data)
//         data = JSON.parse(data)
//         data["animation_url"] = animationBaseUrl + toUpdate[i] + ".mp4"
//         data["theta_api"] = {
//             videoId: videoIds[i]
//         }
//         console.log(data)
//         fs.writeFile('./../../../../OpenThetaProjects/ThetaDiamond/EVENTPROXIMA/Metadata/'+ toUpdate[i] +'.json', JSON.stringify(data), function(err) {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     });
// }

async function switchPositions(pos1, pos2){
    let data1 = await fs.readFileSync('./../../../../OpenThetaProjects/ThetaDiamond/EVENTPROXIMA/Metadata/'+pos1.toString()+".json");
    data1 = JSON.parse(data1);
    let data2 = await fs.readFileSync('./../../../../OpenThetaProjects/ThetaDiamond/EVENTPROXIMA/Metadata/'+pos2.toString()+".json");
    data2 = JSON.parse(data2);
    await fs.writeFileSync('./../../../../OpenThetaProjects/ThetaDiamond/EVENTPROXIMA/Metadata/'+pos1.toString()+'.json', JSON.stringify(data2));
    await fs.writeFileSync('./../../../../OpenThetaProjects/ThetaDiamond/EVENTPROXIMA/Metadata/'+pos2.toString()+'.json', JSON.stringify(data1));
}

let posToFront = [5,47,88,107,128,138,189,199,212,274,528,450,88,91]

async function switcher() {
    for(let i=0; i<posToFront.length; i++){
        await switchPositions(posToFront[i], i+1)
    }
}

switcher();