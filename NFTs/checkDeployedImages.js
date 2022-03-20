const axios = require('axios');

const baseURL = 'https://arweave.net/eTvO1T9tljJK60wLbQvFaEowmfJUpv1ZVk4wuk0CaNI/'; // JSON


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function check () {
    for (let i = 1; i <= 10000; i++) {
        axios.get(baseURL+i+'.jpg').then(() => {
            console.log("Checked:", i);
        }).catch(() => {
            axios.get(baseURL+i+'.jpg').then(() => {
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