const axios = require('axios');

const baseURL = 'https://arweave.net/FdCla1lcQUi3pBhsIoBT2H8S-ojDpaemIC82dXVLaW4/'; // JSON


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function check () {
    for (let i = 817; i <= 876; i++) {
        axios.get(baseURL+i+'.png').then(() => {
            console.log("Checked:", i);
        }).catch(() => {
            axios.get(baseURL+i+'.png').then(() => {
                console.log("Checked:", i);
            }).catch(() => {
                console.log("Error image", i);
            });
        });
        await sleep(200)
    }
}

check().then(() => {
    console.log("END");
});