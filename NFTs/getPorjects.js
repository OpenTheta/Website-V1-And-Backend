const axios = require('axios');
let ThetaPunksRarity = require('./rarityThetaPunks.json');
// ThetaPunksRarity = JSON.parse(ThetaPunksRarity);
// console.log(ThetaPunksRarity)
function getThetaPunk(data) {
    let thetapunks = [];
    for(let i=0; i<data.length; i++){
        // console.log(ThetaPunksRarity[data[i].name])
        if(ThetaPunksRarity[data[i].name] < 450 && data[i].price.length < 23){
            thetapunks.push({
                name: data[i].name,
                rank: ThetaPunksRarity[data[i].name],
                price: data[i].price,
            })
        }
    }
    console.log(thetapunks)
}

// axios.get('https://open-theta.de/api/nft/onMarket').then(response => {
//     console.log("Total Projects: ", response.data.length);
// });
//
// axios.get('https://open-theta.de/api/projects').then(response => {
//     for (let i=0; i<response.data.length; i++) {
//         console.log(response.data[i].contract);
//         axios.get('http://localhost:80/api/projects/' + response.data[i].contract + '/nft/on-market' ).then(res => {
//             console.log(response.data[i].name + ": " + res.data.length);
//         });
//     }
// });
axios.get('https://open-theta.de/api/projects/' + '0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473' + '/nft/on-market' ).then(res => {
    getThetaPunk(res.data)
});

console.log(ThetaPunksRarity["ThetaPunk #6532"])

// setTimeout(() => {
//     this.loading = false
// },5000)