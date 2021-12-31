const axios = require('axios');

// const baseURL = 'https://arweave.net/PrSwnTu2tWF15aJ2zbv8ExI5K5BOc_Dzk_Rc_1TVHPs/'; // ThetaZilla JSON
// const baseURL = 'https://arweave.net/tzDMdPsXdp-1IQ6IZtheYCevnP97erhslkuH-sdh0lw/'; // ThetaZilla2 JSON
// const baseURL = 'https://arweave.net/xoKLhxwbaTkYcuwjP8rZK4JmpAdrDCVl5Caq6b8r-XU/';
// const baseURL = 'https://arweave.net/fFn8UtWoE7Bh4aZ6qsw1ylZvoVzvEIh2e8kEUQ9xqRk/'; // ThetaPugs JSON
const baseURL = 'https://arweave.net/DkUpe4dtm5jRl24thq7OSC4Dorqkgf43XoTfFVny9Mo/'; // JSON


    function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function check () {
    for (let i = 1; i <= 55; i++) {
        axios.get(baseURL+i+'.json').then(response => {
            // axios.get(response.data.image).then(res => {
                console.log("Checked:", i ,response.data.name);
            // }).catch(() => {
            //     axios.get(response.data.image).then(res => {
            //         console.log("Checked:", i ,response.data.name);
            //     }).catch(() => {
            //         axios.get(response.data.image).then(res => {
            //             console.log("Checked:", i ,response.data.name);
            //         }).catch(() => {
            //             console.log("Error Image", response.data.image, "Metadata", i);
            //         });
            //     });
            // });
        }).catch(() => {
            axios.get(baseURL+i+'.json').then(response => {
                // axios.get(response.data.image).then(res => {
                    console.log("Checked:", i ,response.data.name);
                // }).catch(() => {
                //     axios.get(response.data.image).then(res => {
                //         console.log("Checked:", i ,response.data.name);
                //     }).catch(() => {
                //         console.log("Error Image", response.data.image, "Metadata", i);
                //     });
                // });
            }).catch(() => {
                console.log("Error Metadata", i);
            });
        });
        await sleep(200)
    }
}

check().then(() => {
        console.log("END");
});