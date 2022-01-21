const axios = require('axios');
const ethers= require('ethers')

const url = "https://open-theta.de/api/nft/sold";

let total = 0;
let StartTime = new Date('November 16, 2021 00:00:00').getTime();
let EndTime = new Date('January 1, 2022 00:00:00').getTime();

axios.get(url).then(response => {
    for(let i=0; i< response.data.length; i++) {
        // console.log(response.data[i].soldTimestamp - time)
        if(EndTime > response.data[i].soldTimestamp && response.data[i].soldTimestamp > StartTime && response.data[i].creator === 'ThetaPunks'){
            total += ((ethers.BigNumber.from(response.data[i].price).div(ethers.BigNumber.from("10000000000000000"))).toNumber()/100)
        }
        // else {
        //     console.log(response.data[i].soldTimestamp)
        // }
    }
    console.log(total/100)
});
