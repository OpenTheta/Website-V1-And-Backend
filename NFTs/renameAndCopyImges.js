const fs = require('fs');

const origenDir = "./../../../OpenTheta/Projects/ThetaGrunberg/images/Masterpieces"
const finalDir = "./../../../OpenTheta/Projects/ThetaGrunberg/images/imagesMasterpieces"

let counter = 0

let files = fs.readdirSync(origenDir)

for(let file of files) {
    if(file.slice(0,1) !== '.') {
        let newName = file.match(/\b(Black|White)\b/g) + "_" + file.match(/\d+/g) + ".gif";
        // console.log(newName)
        fs.copyFile(`${origenDir}/${file}`, `${finalDir}/${newName}`, (err) => {
            if (err) throw err;
            console.log('File was copied to destination');
        });
    }
}
// for(let i=0; i<folders.length; i++){
//     for(let j=1; j<=folders[i].number; j++){
//         counter += 1
//     }
// }
