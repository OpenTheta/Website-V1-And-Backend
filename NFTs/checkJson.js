// const fs = require('fs');
//
// for(let i = 0; i < 10000; i++){
//     fs.readFile('./../../../OpenThetaProjects/ThetaZillaClub/JSONFinal/'+i+'.json', 'utf8' , (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         // console.log(JSON.parse(data)[0].attributes[0]);
//         // console.log(JSON.parse(data).image.slice(64,68));
//         if (JSON.parse(data).image.slice(64,68) === '1999' ){
//             console.log('1999', i)
//         }
//         if (JSON.parse(data).image.slice(64,68) === '2000' ){
//             console.log('2000',i)
//         }
//         if (JSON.parse(data).image.slice(64,68) === '3999' ){
//             console.log('3999',i)
//         }
//         if (JSON.parse(data).image.slice(64,68) === '4000' ){
//             console.log('4000',i)
//         }
//     });
// }

console.log(Math.random() * 50);