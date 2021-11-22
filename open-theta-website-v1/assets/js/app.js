
Vue.component('my-nft-card', {
    props:["nft", "onsale"],
    template:
    '<div class="col" style="max-width: 400px">\n' +
        '    <div class="card" style="width: 20rem;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;box-shadow: 2px 2px 16px 8px rgba(0,0,0,0.1);min-width: 300px;border-style: none;max-width: 100%;margin: 16px;">\n' +
        // '     <img class="image" :src="nft.imageUrl" style="height: 320px; border-top-left-radius: 20px;border-top-right-radius: 20px;"> \n' +
        '     <div class="overflow-hidden" style="height: 320px; border-top-left-radius: 20px;border-top-right-radius: 20px; max-width: 400px; align-items: center; overflow: hidden; position: relative;">' +
        '        <img class="img-responsive" :src="nft.imageUrl" style="border-top-left-radius: 20px;border-top-right-radius: 20px; max-width: 320px; position: absolute;"> \n' +
        '     </div>' +
        '      <div class="card-body d-flex flex-column justify-content-between" style="padding-bottom: 20px;height: 240px;">\n' +
        '        <div>\n' +
        '           <div v-if="nft.onsale">\n' +
        '               <h6 class="text-muted d-inline mb-2" style="color: #757575;font-size: 20px;font-family: \'Source Sans Pro\', sans-serif;font-weight: 600;border-bottom-right-radius: 10px;border-top-right-radius: 10px;margin-left: -20px;padding-left: 20px;padding-right: 8px;padding-bottom: 2px;background: #cdcf66;padding-top: 2px;">40,00 TFuel = $10,00</h6>\n' +
        '           </div>\n' +
        '          <h4 id="title1" style="font-family: \'Source Sans Pro\', sans-serif;font-weight: 700;color: rgb(255,160,0);margin-bottom: 8px;margin-top: 22px;">{{nft.name}}</h4>\n' +
        '          <p v-if="nft.description" style="font-family: \'Source Sans Pro\', sans-serif;color: #212121;">{{nft.description.substring(0, 60)}}<br></p>\n' +
        '        </div>' +
        '<a v-if="onsale" v-on:click="cancelSale(nft)" class="btn btn-primary d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" role="button" data-bss-hover-animate="pulse" style="margin-top: 20px;background: #128C7E;border-style: none;padding-top: 8px;padding-bottom: 8px;box-shadow: 2px 2px 8px rgba(117,117,117,0.71);" target="_blank">Cancel Sale</a>\n' +
        '<a v-if="!onsale" v-on:click="sellNFT(nft)" class="btn btn-primary d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" role="button" data-bss-hover-animate="pulse" style="margin-top: 20px;background: #128C7E;border-style: none;padding-top: 8px;padding-bottom: 8px;box-shadow: 2px 2px 8px rgba(117,117,117,0.71);" target="_blank">Sell</a>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>',
    methods: {
        sellNFT(nft){
            this.$parent.sellNFT(nft);
        },
        cancelSale: async function (nft) {
            const signer = provider.getSigner()
            console.log("cancel");
            const contractMarketObject = new ethers.Contract(
                marktAddress,
                contractMarketABI,
                signer
            );
            // let overrides = {
            //     value: "1000000000000000000"
            // };
            let name = "ERROR";
            for (let i = 0; i < NFTProjects.length; i++){
                if (NFTProjects[i].contract === nft.contract) {
                    name = NFTProjects[i].name;
                }
            }
            await contractMarketObject.createMarketCancel(nft.contract, nft.id);
            // await contractMarketObject.createMarketCancel(nft.contract, nft.id, overrides);

            let topic = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");

            let filter = {
                address: marktAddress,
                topics: [ topic ]
            }

            provider.on(filter, () => {
                this.$parent.onMarket();
            });
        }
    }
});

Vue.component('nft-card', {
    props:["nft", "useraccount"],
    data() {
        return {
            waiting: false,
        };
    },
    template:
        '<div class="col" style="max-width: 400px">\n' +
        '    <div class="card" style="width: 20rem;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;box-shadow: 2px 2px 16px 8px rgba(0,0,0,0.1);min-width: 300px;border-style: none;max-width: 100%;margin: 16px;">\n' +
        '     <div class="overflow-hidden" style="height: 320px; border-top-left-radius: 20px;border-top-right-radius: 20px; max-width: 400px; align-items: center; overflow: hidden; position: relative;">' +
        '        <img class="img-responsive" :src="nft.imageUrl" style="border-top-left-radius: 20px;border-top-right-radius: 20px; max-width: 320px; position: absolute;"> \n' +
        '     </div>' +
        '      <div class="card-body d-flex flex-column justify-content-between" style="padding-bottom: 20px;height: 300px;">\n' +
        '        <div>\n' +
        '          <h6 class="text-muted d-inline mb-2" style="color: #757575;font-size: 20px;font-family: \'Source Sans Pro\', sans-serif;font-weight: 600;border-bottom-right-radius: 10px;border-top-right-radius: 10px;margin-left: -20px;padding-left: 20px;padding-right: 8px;padding-bottom: 2px;background: #cdcf66;padding-top: 2px;">{{(nft.price).toLocaleString(\'en\').replace(\',\', \' \')}} TFuel</h6>\n' +
        '          <h4 id="title1" style="font-family: \'Source Sans Pro\', sans-serif;font-weight: 700;color: rgb(255,160,0);margin-bottom: 8px;margin-top: 22px;">{{nft.name}} <a target="_blank" href="https://0xtycoon.github.io/punk-ranks/ranks.html" v-if="nft.rank" style="font-size: 15px; color: black">Rank: {{nft.rank}}</link></h4>\n' +
        '          <p v-if="nft.description" style="font-family: \'Source Sans Pro\', sans-serif;color: #212121;">{{nft.description.substring(0, 60)}}<br></p>\n' +
        '          <p v-if="useraccount !== nft.seller.toLowerCase()" style="font-family: \'Source Sans Pro\', sans-serif;color: #212121; font-size: 12px; margin: 0px">Seller: {{nft.seller}}<br></p>\n' +
        '        </div>' +
        '          <h5 v-if="waiting" class="d-flex justify-content-center" style="color: #757575; padding-top: 50px">waiting ...</h5>' +
        // '          <h4 class="d-flex justify-content-center" v-if="sold" style="font-family: \'Source Sans Pro\', sans-serif;color: #212121; padding-top: 30px">sold</h4>\n' +
        '          <h4 class="d-flex justify-content-center" v-if="this.provider" v-if="useraccount === nft.seller.toLowerCase()" style="font-family: \'Source Sans Pro\', sans-serif;color: #212121; padding-top: 30px">This is your NFT</h4>\n' +
        '<a v-if="useraccount !== nft.seller.toLowerCase() && !waiting" class="btn btn-primary d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" v-on:click="buyNft(nft)" role="button" data-bss-hover-animate="pulse" style="margin-top: 20px;background: #128C7E;border-style: none;padding-top: 8px;padding-bottom: 8px;box-shadow: 2px 2px 8px rgba(117,117,117,0.71);" target="_blank">Buy</a>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>',
    methods: {
        buyNft: async function (nft) {
            this.waiting = true;
            const signer = provider.getSigner();
            console.log("buy");
            const contractMarketObject = new ethers.Contract(
                marktAddress,
                contractMarketABI,
                signer
            );
            let overrides = {
                value: nft.realPrice,
            };
            try{
                await contractMarketObject.createMarketSale(nft.contract, nft.id, overrides);
            } catch {
                this.waiting = false;
            }


            let topic = ethers.utils.id("MarketItemSale(uint256,address,uint256,address,address,string,uint256,bool)");

            let filter = {
                address: marktAddress,
                topics: [ topic ]
            }

            provider.on(filter, () => {
                this.waiting = false;
                this.$parent.onMarket();
            });
        }
    }
});

Vue.component('nft-sold', {
    props:["nft"],
    template:
        '<div class="card d-flex flex-row" style="border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;box-shadow: 2px 2px 16px 8px rgba(0,0,0,0.1);min-width: 60%;border-style: none;max-width: 800px;height: 50px;margin-top: 10px;">\n' +
        '            <img :src="nft.imageUrl" class="image" style="height: 50px;width: 50px; background:  center / cover no-repeat;">\n' +
        '            <div class="container">\n' +
        '                <div class="row" style="height: 50px;">\n' +
        '                    <div class="col-3 d-flex justify-content-center align-items-center">\n' +
        '                        <p class="text-center" style="font-family: \'Source Sans Pro\', sans-serif;margin-bottom: 0px;">{{nft.soldTime}}</p>\n' +
        '                    </div>\n' +
        '                    <div class="col-3 d-flex justify-content-center align-items-center">\n' +
        '                        <p class="text-center" style="font-family: \'Source Sans Pro\', sans-serif;margin-bottom: 0px;">{{nft.price.toLocaleString(\'en\').replace(\',\', \' \')}} TFuel</p>\n' +
        '                    </div>\n' +
        '                    <div class="col-6 d-flex justify-content-center align-items-center">\n' +
        '                        <p class="text-center" style="font-family: \'Source Sans Pro\', sans-serif;margin-bottom: 0px;">{{nft.name}}</p>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>'
});

Vue.component('nft-sell', {
    props:["nft"],
    data() {
        return {
            price: null,
            ready: false,
            waiting: false,
        };
    },
    template:
        '    <div class="card" style="width: 20rem;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;box-shadow: 2px 2px 16px 8px rgba(0,0,0,0.1);min-width: 300px;border-style: none;max-width: 100%;margin: 16px;">\n' +
        '     <div class="overflow-hidden" style="height: 320px; border-top-left-radius: 20px;border-top-right-radius: 20px; max-width: 400px; align-items: center; overflow: hidden; position: relative;">' +
        '        <img class="img-responsive" :src="nft.imageUrl" style="border-top-left-radius: 20px;border-top-right-radius: 20px; max-width: 320px; position: absolute; top:-10%"> \n' +
        '     </div>' +
        '      <div class="card-body d-flex flex-column justify-content-between" style="padding-bottom: 20px;height: 310px;">\n' +
        '        <div>\n' +
        '          <h4 id="title1" style="font-family: \'Source Sans Pro\', sans-serif;font-weight: 700;color: rgb(255,160,0);margin-bottom: 8px;margin-top: 22px;">{{nft.name}}</h4>\n' +
        '          <p style="font-family: \'Source Sans Pro\', sans-serif;color: #212121;">Listing is 0 TFuel + 3% Fee on sale<br></p>\n' +
        '        </div>' +
        '     <input class="form-control" v-model="price" type="number" step=".01" min=".01" placeholder="Price in TFuel">' +
        '<a v-if="!ready && !waiting" class="btn btn-primary d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" v-on:click="approveNft(nft)" role="button" data-bss-hover-animate="pulse" style="margin-top: 20px;background: #128C7E;border-style: none;padding-top: 8px;padding-bottom: 8px;box-shadow: 2px 2px 8px rgba(117,117,117,0.71);" target="_blank">Approve</a>\n' +
        '<a v-if="ready && !waiting" class="btn btn-primary d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" v-on:click="sellNft(nft)" role="button" data-bss-hover-animate="pulse" style="margin-top: 20px;background: #128C7E;border-style: none;padding-top: 8px;padding-bottom: 8px;box-shadow: 2px 2px 8px rgba(117,117,117,0.71);" target="_blank">Sell</a>\n' +
        '<h5 v-if="waiting" class="d-flex justify-content-center" style="color: #757575; padding-top: 50px">waiting ...</h5>' +
        '      </div>\n' +
        '    </div>',
    methods: {
        approveNft: async function (nft) {
            const signer = provider.getSigner();

            const contractNFTObject = new ethers.Contract(
                nft.contract,
                contractThetaPunksABI,
                signer
            );

            let address = await contractNFTObject.getApproved(nft.tokenId);

            // get Items on sale from smart contract
            if(address !== '' && marktAddress === address.toLowerCase()) {
                this.waiting = false;
                this.ready = true;
                return;
            }

            this.waiting = true;
            await contractNFTObject.approve(marktAddress, nft.tokenId);

            let topic = ethers.utils.id("Approval(address,address,uint256)");

            let filter = {
                address: nft.contract,
                topics: [ topic ]
            }

            provider.on(filter, () => {
                this.waiting = false;
                this.ready = true;
            });
        },
        sellNft: async function (nft) {
            if (this.price <= 0){
                alert("Unvalid Price set");
                return;
            }
            const signer = provider.getSigner()
            console.log("sell");
            const contractMarketObject = new ethers.Contract(
                marktAddress,
                contractMarketABI,
                signer
            );
            // let overrides = {
            //     value: "1000000000000000000"
            // };
            // let priceWei = ethers.BigNumber.from(this.price).mul(ethers.BigNumber.from("1000000000000000000"));
            let priceWei = ethers.BigNumber.from(this.price*100).mul(ethers.BigNumber.from("10000000000000000"));
            for (let i = 0; i < NFTProjects.length; i++){
                if (NFTProjects[i].contract === nft.contract) {
                    name = NFTProjects[i].name;
                }
            }
            this.waiting = true;
            await contractMarketObject.createMarketItem(nft.contract, nft.tokenId, priceWei, name);
            // await contractMarketObject.createMarketItem(nft.contract, nft.tokenId, priceWei, name, overrides);

            let topic = ethers.utils.id("MarketItemCreated(uint256,address,uint256,address,address,string,uint256,bool)");

            let filter = {
                address: marktAddress,
                topics: [ topic ]
            }

            provider.on(filter, () => {
                this.waiting = false;
                this.ready = false;
                this.$parent.onMarket();
            });
        },
    }
});

Vue.component('nft-mint', {
    props:["project"],
    data() {
        return {
            saleIsActive: false,
            maxSupply: 0,
            currentSupply: 0,
            currentPrice: 0,
            providerAvailable: true,
        };
    },
    template:
        '<section class="d-flex justify-content-center align-items-center" :style="project.myStyle">\n' +
        '        <div class="container">\n' +
        '            <div class="row">\n' +
        '                <div class="col-md-6 d-flex flex-column align-items-center"><img :src="project.image" style="max-width: 70%;padding-top: 50px;">\n' +
        '                    <h5 style="color: rgb(229,232,234);margin-top: 20px;">{{currentSupply}}/{{project.TotalAmount}}</h5>\n' +
        '                    <h5 style="color: rgb(229,232,234);">{{currentPrice}} TFuel</h5>\n' +
        '                    <div v-if="saleIsActive" style="padding: 20px;"><a class="btn btn-light action-button" role="button" id="connectButton-1" href="#" v-on:click="mintNFT()" style="max-width: 100px;width: 90px;background: rgb(86,198,198);border-color: rgb(86,198,198);color: rgb(255,255,255);">Mint</a></div>\n' +
        '                    <h5 v-if="!saleIsActive && providerAvailable" class="d-flex justify-content-center" style="color: #757575; padding-top: 10px">Minting stopped or ended</h5>' +
        '                    <h5 v-if="!providerAvailable" class="d-flex justify-content-center" style="color: #757575; padding-top: 10px">No MetaMask installed, cannot fetch data</h5>' +
        '                </div>\n' +
        '                <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">\n' +
        '                    <h1 style="color: rgb(229,232,234);margin-top: 50px;margin-bottom: 30px;">{{project.name}}</h1>\n' +
        '                    <div>\n' +
        '                        <p v-for="paragraph in project.description" style="color: rgb(229,232,234);margin-right: 5px;margin-left: 5px;">{{paragraph}}</p>\n' +
        '                    </div><a :href="project.domain" style="margin-bottom: 20px;color: rgb(229,232,234);">{{project.domain.substring(8)}}</a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </section>',
    methods: {
        sleep: function (ms) {
            return new Promise((resolve) => {
            setTimeout(resolve, ms);
            });
        },
        mintNFT: async function() {
            console.log("mint", this.project.contract);
            const signer = provider.getSigner();
            const contractMintObject = new ethers.Contract(
                this.project.contract,
                contractThetaPunksABI,
                signer
            );
            let price = contractMintObject.getNFTPrice();
            let overrides = {
                value: price,
            };
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                try{
                    await contractMintObject.safeMint(accounts[0], overrides);
                    await this.sleep(6000);
                    this.updateValues(contractMintObject);
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("No Metamask");
            }
        },
        updateValues: async function(contractMintObject) {
            contractMintObject.totalSupply().then(res => {
                this.currentSupply = res.toNumber();
                if (this.currentSupply < this.maxSupply) {
                    contractMintObject.saleIsActive().then(res => {
                        this.saleIsActive = res;
                        if(this.saleIsActive) {
                            contractMintObject.getNFTPrice().then(res => {
                                this.currentPrice = (ethers.BigNumber.from(res).div(ethers.BigNumber.from("1000000000000000000"))).toNumber();
                            }).catch((error) => {
                                console.log(error);
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.saleIsActive = false;
                }
            }).catch((error) => {
                console.log(error);
            });

        }
    },
    created () {
        try {
            const contractMintObject = new ethers.Contract(
                this.project.contract,
                contractThetaPunksABI,
                provider
            );
            // get Items on sale from smart contract
            contractMintObject.MAX_NFT_SUPPLY().then(res => {
                this.maxSupply = res.toNumber();
                this.updateValues(contractMintObject);
            }).catch((error) => {
                console.log(error);
            });
        } catch (e) {
            console.log("No Provider");
            this.providerAvailable = false;
        }

    },
});

// Projects to launch
const launchProjects = [
    {
        name: "Theta Permabull",
        contract: '0xadc8fdca07ba7066c6e2d0efd7fe8cc35846ff3c',
        image: "assets/img/Permabull/Permabull.jpeg",
        description: [
            "Theta Permabull badge is for those who believe and support THETA NETWORK from ups and downs, to which selling is not an option.",
            "Who believes this project is the best out there.",
            "Show your loyalty to the Theta Network and community by holding one of 444 badges.",
        ],
        domain: "https://twitter.com/R3tt2",
        TotalAmount: 444,
        myStyle: "min-height: 100vh;background: linear-gradient(rgba(4,133,142,0.94) 0%, #000000), #00b19c;",

    },
    {
        name: "ThetaZillaClub",
        contract: '0x371a0a0c9aad38c2d5dd33a679aea4b5fb521089',
        image: "assets/img/thetaZilla/launchpad1.png",
        description: [
            "ThetaZillas are a randomly generated collection of 10,000 ThetaZilla NFT’s exclusive to the Theta Network.",
            "ThetaZillas are composed of 13 attribute groups and 250 total attributes.",
            "Theta is Godzilla, ThetaZillaClub is a community of early adopters who share that vision. Mint a ThetaZilla to show you were among the first to venture into the Theta Ecosystem.",
        ],
        domain: "https://twitter.com/ThetaZillaClub",
        TotalAmount: 10000,
        myStyle:{
            backgroundColor:"#000000",
            width: "100%",
            "min-height": "100vh",
            "background-image": "url(\'assets/img/thetaZilla/site_wallpaper.png\')",
            "background-repeat": "no-repeat",
            "background-size": "cover"
        }
    },
    {
        name: "ThetaPugs",
        contract: '0x9791ddfefadb0b1bed5f35604de262506c6ee45c',
        image: "assets/img/pug-random-gradient-background.png",
        description: [
            "ThetaPugs is a randomly generated collection of 10,000 Pug NFT’s exclusive to the Theta Network.",
            "Each Pug randomly selects a combination of clothing, headwear and accessories.",
            "Pugs are happy and affectionate, loyal and charming, playful and mischievous, just like the community! Discover the collection and become part of the ThetaPugs journey.",
        ],
        domain: "https://thetapugs.com",
        TotalAmount: 2500,
        myStyle: {
            backgroundColor: "#410082",
            width: "100%",
            "min-height": "100vh",
            "background-image": "url(\'assets/img/background-ThetaPugs.jpg\')",
            "background-repeat": "no-repeat",
            "background-size": "cover"
        }
    }
]


let NFTProjects = [];
// const NFTProjects = [
//     {
//         name: 'Semtex Samurai',
//         address: '0x9b68d13cc9dbd72dcae02b201420262e617ddb58',
//     },
//     {
//         name: 'Mitch Alien',
//         address: '0x7cd383e28540c8e6439dc4cd46e70fbddeb7dc0e',
//     },
//     {
//         name: 'Wes Zombie',
//         address: '0xcfe69d80cc163ad1a786a75418d495cd26b0cc81',
//     },
//     {
//         name: 'Jieyi Ape',
//         address: '0x050ce846802aab7b5f34d4efb1eeb72a83ef248c',
//     },
//     {
//         name: 'Kyle Human',
//         address: '0xb700ca3044fef95e17e217fe3a4a53139895d790',
//     },
//     {
//         name: 'ThetaPunks',
//         address: '0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473',
//     },
//     {
//         name: 'ThetaMan',
//         address: '0xff290451c54a6ebd390287b4db18058a0e892cde',
//     },
//     {
//         name: 'ThetaBoard',
//         address: '0x34f573de2416c8c4e968ca16a18b46c2a7d833c2'
//     },
//     {
//         name: 'ThetaBoard 2021',
//         address: '0x7500cbde64b1bf956351aa4ea2fa4ee1467a3428'
//     },
// ];

// Test chain
// NFTProjects = [
//     {
//         name: 'ThetaPunks',
//         contract: '0xaef0091cd3615e4e1da6e35398011bd26bccb7cd',
//     },
//     {
//         name: 'ThetaMan',
//         contract: '0xe17b6cd2a176d2db8d27d73a9b8abcb0d7cb9609',
//     },
//     {
//         name: 'ThetaBoard',
//         contract: '0x22d1a8df6a03e3fc36bdb4c4b1aaceac2885ef0a'
//     },
//     {
//         name: 'SwimmingPorsche',
//         contract: '0x9012b13771b6aefc10bfc4045d8960fc1c9facea'
//     },
//     {
//         name: 'ThetaPermabull',
//         contract: '0x09f4d98ab02af0c310cd7dc57c3edd35c71e938c'
//     }
// ];

try {
    globalThis.provider  = new ethers.providers.Web3Provider(window.ethereum);
} catch (e) {
    console.log("No Metamask installed");
    globalThis.provider;
}

// const provider = new ethers.providers.Web3Provider(window.ethereum);



const marktAddress = "0xd539558887b6744c52c595cb24fb9efa664ba814";
// const marktAddress = "0x8823b2e45fd716c395230500d9668816c141e1ce"; //Testchain

const contractMarketABI = [
    "event MarketItemCreated(uint256 indexed itemId, address indexed nftContract, uint256 indexed tokenId, address seller, address owner, string category, uint256 price, bool isSold)",
    "function createMarketItem(address nftContract, uint256 tokenId, uint256 price, string category) payable",
    "function createMarketSale(address nftContract, uint256 itemId) payable",
    "function createMarketCancel(address nftContract, uint256 itemId) payable",
    "function fetchCreateNFTs() view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
    "function fetchPurchasedNFTs() view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
    "function getItemsByCategory(string category) view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
    "function getListingPrice() view returns (uint256)",
    "function getMarketItems() view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, string category, uint256 price, bool isSold)[])",
    "function getSalesFee() view returns (uint256)",
    "event MarketItemSale(uint256 itemId,address nftContract,uint256 tokenId,address seller,address owner,string category,uint256 price,bool isSold)"

];

const contractThetaPunksABI = [
    "function balanceOf(address _owner) view returns (uint256)",
    "function tokenURI(uint256 _tokenId) view returns (string memory)",
    "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
    "function approve(address to, uint256 tokenID)",
    "function getApproved(uint256 tokenId) view returns (address)",
    "event Approval(address indexed owner, address indexed to, uint256 tokenId)",

    "function MAX_NFT_SUPPLY() view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function saleIsActive() view returns (bool)",
    "function getNFTPrice() view returns (uint256)",
    "function safeMint(address _address) payable",
];


let app = new Vue({
    el: "#app",
    data() {
         return {
             currentFilter: 'ALL',
             modal: true,
             page: 'marketPage',
             marketPage: true,
             myAssetsPage: false,
             sellPage: false,
             sellNft:{},
             userAddress: "",
             myNFTs: [],
             marketNfts: [],
             soldNFTs: [],
             PunkRank: [2118,4337,7995,7834,7189,2073,4174,937,6394,1816,5497,2607,1251,1740,256,6246,8239,5120,6992,9901,7751,9592,271,5312,4330,762,917,7743,8696,2369,6671,8015,5075,4181,9371,6444,789,8034,9277,5054,4260,7593,9532,790,8005,9985,2706,7759,9144,5279,963,7663,8788,2842,3834,8011,4170,7651,4683,1423,9799,916,8406,7351,1766,7042,1273,2148,7476,3747,8661,2117,3701,9927,8958,8799,7496,5424,5393,6918,6499,8178,7532,5710,9629,7749,5579,5036,8132,129,4797,2751,740,8153,728,9407,786,7997,534,4911,1275,4008,2142,2109,6672,7876,772,7655,8623,3720,8933,5374,1887,7867,782,2476,311,80,9920,8148,3622,334,9363,935,6645,3631,8545,8364,3871,3301,7877,2717,7872,3149,2876,3831,7366,8003,9751,7389,9969,5987,9130,187,6372,7996,9406,9030,3835,6420,9987,7968,8306,7034,4822,2485,4506,8141,7256,9828,624,9386,6766,7385,7969,4970,7418,8638,1942,1369,7696,9803,2154,7755,9494,8087,9434,6427,1400,9026,281,7873,4176,8535,2088,1390,6543,805,7726,9249,7642,7874,4101,3557,8328,1746,3632,9220,165,1219,7993,3009,8634,5950,8695,6746,4056,7528,6209,9809,2731,7228,8760,7753,4963,7880,8155,6087,5316,1114,8554,7585,7322,6916,8569,403,9971,764,7577,9702,6299,7848,5507,9853,8851,9394,2184,9122,2596,5039,1729,773,9788,3874,9491,915,6264,5626,5258,242,8351,5629,4524,1198,1399,6472,3689,5079,4409,4479,3190,1378,1222,7558,1394,3310,7352,3670,7760,4619,2236,8019,484,4545,5317,5280,7752,787,2625,1603,9995,23,2588,9387,7868,3118,7170,5165,4168,9074,774,9408,3642,5388,4835,5045,7881,7606,788,7298,7204,1999,5545,2422,7700,2126,5792,6092,9630,7436,5753,5912,4432,8995,3875,1384,8151,5028,9854,2728,8016,4182,716,7861,2301,3930,1392,7747,9885,9659,8296,3606,9746,1584,1913,801,872,7887,8230,8009,3419,9770,9875,3987,119,3667,961,8827,1148,4961,8020,3220,2781,5686,4010,1278,8017,3665,6274,9582,6789,7865,7009,1498,4608,6814,7084,796,9372,3749,1091,7888,27,8648,8515,5647,2382,6445,9411,9267,9514,8868,287,1606,9868,232,7508,3312,1678,1106,8006,1632,4175,4503,755,4476,775,768,8152,3237,2074,1917,4964,2641,350,8007,4854,1772,3830,8859,8547,8498,3242,803,902,3860,4237,797,1314,9959,8768,5915,3006,7346,4623,9627,7703,8004,3839,3863,3120,8593,9712,6886,7020,7635,1271,4949,7866,8818,1240,9738,1439,771,7443,253,1752,9752,4172,2868,3785,4171,7756,469,3442,861,1004,5988,6680,2874,200,4320,4052,5811,9002,4685,2429,3186,4178,7885,8842,8356,6601,2540,659,7748,7512,8996,7733,3088,859,9502,3657,6608,8850,1830,1780,7750,2434,7400,663,2089,7413,1764,5003,4318,6643,6474,1268,511,806,292,6909,4955,266,6902,9612,3124,8889,9460,25,9930,4909,7761,2805,6852,1464,7158,7952,7886,4644,780,2383,4359,3223,2281,2282,1733,7878,7656,791,8885,7862,992,611,6565,4710,746,5633,6459,9126,5012,3428,6629,7754,7961,5096,8890,9345,4158,912,7744,5830,6363,9520,9186,9595,6697,9006,7882,2401,857,1105,2559,1907,8536,7998,7980,7509,8860,7514,648,7347,1331,7275,9347,3599,1000,3707,1792,3583,1266,5286,7402,2445,754,5245,7505,3507,9051,2642,7142,3255,329,8795,8568,1965,1144,1287,9128,8750,8454,8761,1686,9522,2048,8315,8379,6406,6182,4560,5289,7898,6091,7533,8212,1710,4711,8327,5863,2843,4190,1880,3677,8716,6702,1535,3833,5154,8538,5404,8614,7586,994,9302,13,6100,2693,819,7710,7805,24,748,4269,9358,7145,5586,8149,1866,6456,1926,4173,5688,1590,1341,6088,4353,6481,9058,3287,5182,7210,3157,7884,3621,2567,9677,9004,8307,9230,7875,2313,1765,8957,9554,9095,4361,7798,7503,2954,4834,792,2556,7897,703,9134,4189,7516,798,6260,9617,9633,7071,7985,9771,3539,5250,9687,4814,7994,9012,7132,7300,7724,4234,8705,153,1061,2863,7444,6501,5295,2864,7539,2020,6951,4248,5664,991,752,4572,2398,6737,9503,2042,6806,5717,3107,8130,2755,9892,6967,1274,9736,9204,1503,8804,8368,10000,8156,9129,21,8154,5949,299,6566,3496,8072,9283,3024,6103,9281,8008,9440,8904,44,5453,9683,9694,3014,9199,2703,953,7883,8597,4725,8721,3645,4417,2889,6309,7981,4678,2757,7453,7668,3650,977,2493,8026,1719,3858,2306,9145,2884,9414,2173,4555,8270,5287,8086,8171,8520,3259,4108,5491,9863,9951,576,3821,8677,7341,4749,9637,5800,9127,4127,5344,7712,7504,4658,5955,8308,763,6333,2465,8056,7639,1672,6158,9367,3995,2137,5965,188,1124,9565,880,9810,9273,1781,2287,2461,8688,1790,8506,4943,2400,148,5166,6569,7250,3148,262,5259,8283,8185,4126,6621,7762,9876,575,7143,6561,9763,9566,4542,3590,1662,6026,1466,804,1402,9542,9843,5180,2793,1184,2983,4902,760,9465,1622,6576,9435,1370,3644,4686,4489,3145,9829,7342,9007,269,9000,2921,3019,8942,2599,8959,7335,899,4581,9701,9392,6201,3334,7565,2038,8615,5871,3660,9555,3464,2024,6627,8746,2714,5073,9780,6068,7369,1582,1398,8082,1429,7652,9382,1086,7664,1813,2275,1723,9121,4620,5556,9795,2246,2905,761,3254,147,6435,6584,7869,8941,7492,8001,5018,4747,5376,8918,7040,766,394,1413,5932,6728,3564,583,6308,1272,2600,6613,9187,2477,7573,4167,7054,3846,1648,8566,3890,6920,6292,3243,2311,7334,5290,4540,2185,2298,7925,1864,9862,6850,1718,3651,7991,6275,8984,6018,1745,9678,9772,2343,4222,136,2446,6473,9800,3594,1989,9564,966,5880,5176,2659,445,6848,1065,6224,7860,9332,9651,3260,9461,2356,4450,6242,724,9818,9075,3774,4433,2990,446,875,851,6062,3342,39,9246,8636,8412,9960,7597,4642,9146,6658,3772,4508,2682,9688,4625,9508,9097,361,1734,8505,9013,5053,2307,3626,6851,7495,1784,7863,5004,4319,26,3653,9937,1819,7271,1681,5305,5002,6709,9329,1470,9587,8714,7697,5914,8776,8203,5849,1912,5288,756,9798,5993,8465,1460,6005,2237,6562,4703,959,4805,5518,769,1653,7479,8971,759,9216,4086,6071,9247,2230,925,443,4673,6380,8983,9338,9956,573,2058,5436,2749,7725,7095,3328,6212,8924,4666,8201,5183,2953,9838,4807,3189,1391,1512,9172,4194,104,9527,9153,8197,1549,5351,9880,6029,1807,9287,3181,3101,4573,9466,5121,7257,3336,7534,8961,9643,3055,1388,9409,3643,5017,7517,8143,9070,6188,1697,9003,2859,7763,3252,6622,3166,5919,1386,9548,8740,1758,8193,9641,493,683,4543,5735,3756,3994,2046,9521,5819,5042,4521,8466,7773,7387,5775,4684,7801,8930,7636,7690,4722,3280,8741,5184,5198,2856,6168,1019,87,5941,3154,967,7229,8572,8255,758,2385,3558,9544,6723,1906,1873,655,8777,2430,3729,8150,7896,1560,4210,5645,6351,2297,8649,960,9932,8014,4796,747,767,1845,5340,5210,1687,3467,1771,3724,2577,7936,5757,411,5776,5525,7177,7634,410,7423,4548,6395,7110,8080,1576,3275,1196,3072,8252,9405,9089,4663,2392,6439,2296,8332,8874,7457,7406,8103,4790,1096,2232,3217,6944,2806,3013,4295,5204,2730,4436,8712,920,3581,3126,904,6065,5270,9285,6662,4018,4104,9699,7705,5212,6555,832,9821,2933,4495,3079,5818,9341,7684,1621,3717,8415,8491,8200,4399,5248,7680,8775,8574,1432,7162,3803,9825,9778,3202,6083,5807,1033,7360,9534,7107,8018,4975,3933,2753,6191,3161,7403,7490,9437,9316,9296,6169,3734,2339,1228,2875,6819,8774,1281,9071,8079,5926,5442,4272,5677,8305,1720,9669,9538,6607,8508,1613,7235,6151,6585,9790,2910,2334,8724,634,783,7103,2620,3278,4315,9819,6339,1032,973,750,6859,9035,548,6684,8438,5185,294,3090,9280,128,7397,6412,9291,6093,5207,4313,5934,4105,9418,9360,7149,3510,9413,2858,1650,2094,4060,9725,3425,7736,6340,3382,6477,1035,9516,5980,6818,8450,8226,5302,8486,4419,3482,9201,4020,9229,2330,6049,9349,2263,8040,9802,9723,9106,9096,2095,3263,4739,8205,7172,2012,3463,9949,1200,5046,5981,6165,7433,246,1694,7538,9235,7238,149,6156,8652,7037,7050,8032,9857,4921,653,4596,7767,9881,6347,9865,9861,2264,2479,1683,8629,9176,7737,6413,6402,2808,1844,9373,7488,8966,8365,5648,2715,7674,560,5458,4699,6111,3343,7955,3044,2853,135,7923,6050,1134,9351,821,4645,5174,7654,9348,6180,1389,8044,2537,1814,1870,1357,3123,497,8838,8718,1012,9274,3988,6977,8599,5592,7929,3433,1419,222,6017,6240,7260,9236,541,730,4879,8865,8198,6560,8002,3470,6545,3228,591,9412,6846,62,2404,4808,2045,8779,7702,9202,8643,5715,3085,459,784,6510,9101,8882,6491,6341,6966,2013,9301,5327,202,9264,3832,8869,7506,3089,7738,3561,3742,650,7614,4164,799,4344,2643,6452,3066,3486,5406,7804,6983,4693,8997,7603,4402,7581,8663,6181,7146,4755,2565,1057,297,7843,7659,7966,2860,2040,5058,8702,6431,3586,3735,2169,7870,8975,2428,7221,1658,1186,7178,3520,8409,1941,8808,7240,298,9506,4589,3847,5378,1427,272,4977,7935,2299,8644,5420,4665,9921,4816,8262,5673,8533,2694,8835,2787,6048,8120,6421,3927,9811,742,885,3948,841,9934,1642,402,4588,1627,4825,9120,3758,5114,6932,4339,1832,3654,6326,3208,8346,8653,4077,173,3619,4629,3484,5068,427,8088,115,2766,7004,1239,2497,3245,8124,4565,2668,6359,7227,516,5275,2756,8992,8577,4765,4004,9368,3837,8398,3508,5585,779,858,6570,196,4859,9604,894,8378,2825,9902,2814,8830,8285,744,6002,9742,9036,8331,7507,2071,9189,2521,1080,7695,9203,2402,8492,1397,5823,371,2571,3989,9830,204,2102,9027,6046,6383,4522,1478,646,3760,8107,8458,9689,2506,6408,5092,3326,688,4525,3926,9131,8347,9014,2690,7941,2424,7326,9940,8543,9747,9470,2487,6186,3005,8321,81,2390,1630,635,2414,1024,8312,3347,5843,7475,9178,283,8116,2050,1113,3227,9322,2514,1663,5021,6312,4440,4352,8117,5524,2191,8852,300,9086,1950,7302,8041,1366,6901,1434,7879,3477,9539,9453,8240,9118,1171,8556,9965,6753,1140,5080,1126,1151,5620,3424,2319,5477,1013,1810,9335,9670,7424,3080,5265,5952,6511,9473,2195,6863,8935,7613,5635,1264,8671,1246,1808,1851,344,6681,7147,6912,3946,4139,5636,2415,8928,4952,1806,9605,5410,8129,5511,4546,8739,9352,60,9010,5649,9658,6247,1223,8944,1452,9234,8495,3035,1755,3144,9016,4412,492,9955,9180,2579,9750,5205,1297,5533,9571,4791,2612,496,2425,7675,5478,1645,3475,4316,2331,2686,7611,1777,1671,5222,4609,6887,3780,2708,7643,9963,2904,3547,138,4006,1794,6194,4887,4016,5160,8517,7092,9903,8108,7166,4931,6750,8991,6544,9931,121,9396,9297,1574,3022,8555,7279,5169,354,5069,2871,3355,9225,6614,5244,2454,5047,7167,8023,7894,5705,3017,4803,1260,7628,8286,3879,8427,290,7575,8797,3765,106,2447,2761,2186,7851,5627,6399,6122,4937,9535,9594,4795,7301,8898,5835,7497,2221,618,9962,465,3415,1659,6321,1261,1727,8145,4944,5616,1270,776,8333,6683,235,1796,9611,7206,3034,211,9978,2283,4853,8209,5642,6075,1952,2326,9330,2546,4457,2833,1209,1679,5019,8384,8183,3524,3762,9284,6229,2310,5852,3043,4143,7461,1437,328,9808,9545,8595,5421,8826,4886,2448,2478,3938,3173,4492,9389,7859,3554,739,664,9661,2123,8304,1507,9912,2777,5678,7220,8196,7719,6306,4950,1497,6317,8228,5087,1894,1298,7908,5313,9384,4570,5587,8625,9990,6295,4998,3888,5940,2609,2408,4638,5968,4787,4654,5285,9140,1551,6985,7458,6751,3221,8923,3224,4458,9212,4778,4772,3100,110,8737,3623,5665,8642,9149,5601,9213,8413,4106,9872,9449,8472,7622,3179,3981,6307,6542,7942,2083,7213,7922,7685,3986,8822,5695,5504,4701,6587,2640,4582,4213,6325,5332,5650,1602,6471,9248,5482,8639,6754,7918,7404,6047,606,7844,470,5381,1317,9958,3829,1631,1267,8318,261,654,5194,3430,7580,8668,5097,8925,9015,5666,812,7039,76,1325,9690,2060,5382,8025,5726,6096,43,6650,5801,1247,6579,7065,225,9911,3372,9370,9181,7515,9333,7416,9941,4920,8738,5112,5190,3515,6644,1456,3512,4321,1178,8537,9188,5064,8897,260,9650,8666,4571,6772,3016,4551,2464,9255,4630,886,503,9350,1588,8162,9190,2654,9342,1949,4406,6360,698,9950,5029,9648,5010,9528,233,5189,7808,2054,1893,231,12,2550,22,8866,3094,5284,1048,8160,5501,4999,5516,6257,2510,8064,9177,2103,529,777,6414,9471,1202,3996,7134,2192,732,7895,7128,2250,9907,7976,5242,7263,7892,7008,9433,2061,7232,1802,2268,6624,4323,50,736,4456,6440,6773,4908,140,3218,8142,8360,348,3744,6875,8187,9107,4676,6752,6915,4275,2187,4568,3247,8445,9232,435,2895,6980,1491,5755,3109,1335,6265,3538,467,2473,9530,638,7261,4661,4531,7833,2332,9141,9744,5996,8707,4421,6432,8605,5428,1731,4680,3329,7181,8381,8583,3628,8012,4639,6001,3739,1869,9395,132,5078,5125,5927,4674,4828,409,8713,4215,9760,7026,6940,2093,1042,7108,2228,2709,8186,2397,4659,2655,3678,9072,109,9059,9632,3730,3468,7048,5380,2488,9357,112,9224,9671,6711,7381,6691,4925,7434,2783,9443,5874,5707,6157,7052,9334,2886,8377,6294,4784,6673,9842,1705,1324,8637,1074,6910,979,6458,9150,5161,335,6682,2470,595,1183,3947,7468,2511,5369,1095,5426,5043,2176,1393,1546,6175,2809,7855,42,1152,8463,4459,1988,802,8946,2279,538,2363,7864,2284,5467,7047,3385,4005,9674,8622,6003,7231,2932,5486,8065,1018,6176,1776,4430,5593,9998,1031,3740,6892,6401,453,4001,4253,662,2914,84,8468,305,9662,9314,2554,5599,8840,1379,5441,5713,4836,1258,6190,6239,1454,4148,4242,5534,3262,3827,9832,8682,8418,8081,3405,3417,9183,3460,5893,1618,1782,6865,5026,8814,7161,36,8441,8493,1874,4690,6334,4346,3595,7545,4314,6424,4368,6480,6230,7665,2484,2329,4387,254,574,5772,9878,3743,8972,134,3276,5247,7758,2595,4550,2129,30,1861,9099,4265,2483,2019,5187,7373,6678,5921,3956,637,5931,7501,6034,5793,9238,2873,836,3380,9400,8092,7337,8767,397,9271,2482,6517,3985,5960,9001,9401,1741,7100,3608,9964,712,8922,6595,8880,7971,1206,2824,6172,7448,1500,4566,5825,1833,264,2974,6006,9654,3615,9029,2695,9957,4231,267,4713,1962,5208,7049,8470,7946,7445,7135,8426,8236,88,4579,5582,9402,5958,9157,99,3754,9517,7396,6484,4232,2003,781,3219,8503,8540,7105,9997,4562,6475,1420,7188,8432,5909,1895,4988,5107,949,1063,3722,2780,4502,7270,8313,9706,3840,6572,9610,5904,7701,313,2097,9753,5429,376,8627,5377,926,6855,8301,4070,5306,490,3923,8052,4677,5795,2239,4583,6166,406,3322,1348,1396,5860,751,7104,9337,9242,9290,2897,5035,4812,2426,6573,4273,3197,9915,4591,7372,1493,5861,622,4251,1346,243,7638,5146,1599,2908,9557,9935,5157,2618,4074,3841,3668,2065,5192,1656,8754,6336,9467,1316,3251,8238,9346,6101,5995,9735,8179,3141,7511,4973,5535,151,8863,456,7129,198,116,3534,4839,2183,3199,2238,6539,2032,6798,677,4329,7792,4343,4996,6641,9161,2794,210,5974,9553,5624,9447,689,2883,514,2705,5483,145,9598,2673,31,1015,1252,9948,3408,1667,273,4786,6095,7096,2765,7640,1372,5430,530,3696,4923,6056,1438,3061,2507,6642,5990,2591,5771,1793,6269,8367,7139,1545,385,1334,2617,8213,6802,8977,3200,850,8596,4564,2066,8211,3294,9359,5679,8310,3473,4515,146,588,2456,2948,4962,6973,4487,3853,1111,8891,7715,6373,8940,8279,3483,9785,8651,1028,6820,5944,5422,8735,2141,9733,9874,6705,6925,9846,5238,5765,2351,6943,5396,2736,1163,6418,1052,7709,7248,4528,9429,241,8225,9748,6078,993,3907,3216,7891,8867,6922,7478,1673,5733,1259,2018,2827,2489,8407,6782,2027,6436,9826,5269,4742,6496,5362,7956,3826,617,1991,7604,1373,2840,1416,3727,6537,495,5521,8140,9100,4547,939,6959,5555,265,2634,9655,8855,6590,8589,9764,4014,1347,6945,3895,5389,7010,546,8311,1885,9133,9833,7600,2896,6470,3708,7523,680,4838,6323,6072,9628,2898,2179,4112,5304,5809,4928,7525,3225,9132,7136,7858,7960,251,8157,4679,856,8985,277,4,317,873,1750,3281,1455,2532,8590,7462,3164,291,6516,7368,8893,221,8876,4958,7264,7072,263,906,3431,7417,5875,9237,8278,4082,9933,3544,2697,2678,7498,6253,472,28,4009,6623,4166,8619,9222,2660,9741,4023,9953,7131,1821,7216,5274,114,8888,918,5687,1021,8375,9310,2496,3086,4865,7073,3466,7641,3862,8973,5600,1611,4071,9615,9023,710,7288,3399,1826,6659,5253,120,6829,5454,90,5702,9282,9755,7694,8361,7950,8299,4488,8584,2603,731,4983,4461,553,3476,7446,2359,431,5434,6467,6764,7428,3271,5910,3915,4847,1238,8010,5299,2590,3813,5015,6942,2377,5234,5814,9073,566,5888,6367,3617,6443,2328,46,3388,3325,9477,547,4229,1824,6867,6086,6208,5334,4756,9895,7899,8443,1226,4810,9568,2090,8504,3636,1051,7452,5692,5427,6213,2444,988,4635,4959,3198,8479,1600,2646,7714,8075,9484,8359,4709,9754,2440,3446,7289,8231,4776,4493,711,5202,8647,408,4821,6202,2513,1523,9464,8259,7113,8229,8793,9403,2716,7474,1852,426,6998,8253,1508,1585,3568,4427,8807,8314,1450,1121,6586,8097,3545,831,8138,4926,7589,5605,9879,451,6736,674,3942,7783,976,6,4829,709,2648,8947,343,181,154,7930,8114,8524,7757,1538,3059,8806,7249,2260,5111,8875,1374,3423,7091,6337,7518,9474,2318,9984,5967,9552,2139,1045,3077,7374,4935,3365,717,1098,6996,8061,668,9226,6760,7144,5309,1457,7338,5708,7194,3627,5254,9066,795,5150,1702,1862,3115,4779,7420,9081,5364,910,7068,5672,6667,6725,1657,8858,6329,5991,5137,1306,8247,5138,4380,1135,6815,528,2520,1321,5641,6322,5920,1117,1970,5090,9684,8699,2469,3180,5397,2870,4124,4061,7579,4392,4972,6796,826,3116,5773,8613,1601,5159,6476,7526,7567,3383,5553,2661,6338,8736,101,1575,9080,8911,8909,4737,6019,9272,9223,8717,5740,8951,7028,6960,2968,7314,2857,6007,4398,1055,2764,6324,4830,5343,6968,5455,6000,9616,7437,1308,9251,5983,8442,7197,7331,2700,9691,7524,7114,4326,1787,1680,2569,3084,5796,765,9793,4486,7940,9663,7299,4066,389,8101,6352,9668,390,7160,3051,8115,594,8202,6022,7354,2971,4085,3625,8147,8206,3133,175,6234,1115,8673,4870,6965,8158,4331,1703,2450,6874,825,1354,1770,8326,5969,6527,1840,6756,6997,2396,6461,1855,9252,5007,6974,20,282,4652,5415,955,9726,4266,5509,9782,2669,822,3381,5761,9288,1756,4880,8184,1903,5788,2132,8641,142,8401,3682,8550,2231,3589,3031,3191,5276,6235,3117,9168,8772,9681,981,3616,8751,3000,9728,2458,9523,6885,8884,3555,8903,5754,2389,8817,8815,7367,8563,7607,1212,9541,1127,879,8348,4357,2684,8650,2891,6409,3267,1738,6670,3967,6765,4401,8405,2816,5448,5355,6449,2973,4121,3434,1943,3602,9294,3992,9685,7832,5435,7287,3733,83,8562,4045,6487,5255,7546,2403,1136,1633,1002,9540,4997,8667,4303,6654,5789,2033,8585,4342,7990,8330,9673,4280,3212,9468,8487,2978,8952,9889,7802,447,1773,9452,8243,1742,7253,7977,2841,2052,1544,7673,3709,8630,8970,665,4595,4414,5827,1986,8146,2,4230,9169,5310,982,8090,6975,5492,3046,8809,9710,5347,9032,1014,1695,9094,9869,4948,6147,9993,3680,2851,2852,4744,8601,1296,3961,2051,2901,6553,4929,8914,1838,2711,8302,9136,722,2193,3064,5372,2194,7180,7173,8102,9942,2374,139,1294,6134,9518,108,2243,5714,3277,9705,8948,9480,7943,8172,9355,257,6045,900,7900,5294,7159,9109,9388,704,9009,9151,3936,8757,6410,9773,4633,702,2394,7344,1968,1897,7769,1376,8137,8982,9448,2726,5403,8437,7390,6603,2585,621,4580,4634,5048,9162,5273,9410,5721,4738,9033,2062,911,639,1242,9759,8670,6770,8912,5405,2727,1043,522,9580,1122,7612,1201,4423,6899,7972,482,7011,7377,8123,2996,4281,2573,4021,8778,4760,9417,8273,5319,8621,9326,7409,8878,3639,2101,6835,8382,4465,7730,2940,2224,2367,3656,5361,1362,8334,1779,2442,5038,6716,3799,7241,7595,957,5519,416,9729,9454,6762,9721,9209,107,9804,9639,4577,6231,4813,2529,1173,9529,7513,4672,3313,9374,4759,2675,6827,4901,3499,3053,2834,2798,2285,3965,9404,6027,7214,2160,53,5837,1531,4110,6742,3647,7919,5050,9021,8725,9758,8917,520,1158,2079,4702,4435,1757,7408,7222,1216,1465,9142,3110,7343,785,8281,7053,1857,9745,4727,6008,5728,178,4541,6531,4743,685,8681,8111,8234,4204,3655,3264,2999,8560,814,5423,293,921,1383,5337,5654,4626,7623,1005,4149,8046,3904,4904,3188,770,1411,4811,4587,9487,2581,352,652,540,3502,216,7746,2106,5791,3384,306,6261,8586,8704,9156,6080,3929,1514,4675,5694,5445,7059,2602,1616,7841,3968,3792,986,9398,6254,2327,1972,5609,3646,4995,6279,2557,8905,5732,8000,6719,8254,8752,1889,2566,1636,3974,367,6074,7259,8708,5902,5604,590,3030,230,4933,5975,4219,5870,989,203,4718,2068,1107,9318,9715,6784,1973,5864,8027,2321,2713,2314,4976,3041,5947,5611,9618,5731,6038,7384,5746,9154,9194,1022,9919,9262,2459,274,5784,2406,6112,374,9952,3335,2763,3613,883,1401,7625,1185,6081,5738,6786,8411,1444,4754,3412,5172,932,6906,965,3274,366,7130,8391,8720,6884,3054,4317,2443,239,7465,5984,1980,9806,4095,8578,58,3672,6203,5930,8950,5884,6674,7549,4745,5398,407,9837,4773,3713,7285,8471,4892,9069,4097,619,7348,4584,2838,4019,8811,8144,7477,4028,7953,9049,1767,8192,3390,8697,478,7904,3658,9816,5602,1597,3395,1425,4818,9883,2984,4667,5836,5375,5251,5320,3755,2691,7945,9588,2539,2982,853,4039,3850,6113,2435,6199,6963,7774,4692,4844,7460,3369,8433,3337,5785,6384,6304,3685,6583,8242,3725,3003,3121,2628,8444,9240,5655,1530,5805,854,8293,6342,2233,9399,2657,9724,8110,9205,6170,7450,4846,2357,5051,5331,2170,692,5741,6849,4843,6358,9501,4135,7064,2242,7466,3156,418,3920,6808,8755,9241,2627,2069,8399,5252,5437,7116,2247,3807,4852,5218,8606,9820,7340,4029,1604,9947,3010,2768,2207,1053,8419,9299,3593,5899,6110,3229,1076,3663,2623,7890,4299,4446,7041,1981,4307,4861,3551,9024,8896,7056,6241,6478,4628,209,3367,4771,8190,2055,9068,8455,2280,1539,8241,4860,5074,3451,323,4278,9268,6044,189,8429,552,6616,572,3951,7012,500,2844,6931,3563,1536,3900,412,3721,6118,5083,6891,1036,7845,5668,809,9481,6385,1165,7297,6249,5188,8275,2112,4956,8798,6714,881,9300,1708,3559,3808,9805,4641,675,8139,5128,5895,5447,6551,1935,2737,3530,2942,7698,4151,4114,1620,4728,4532,6105,2350,7928,9845,4932,8994,1515,6073,8396,2072,1132,1157,9490,9533,4133,4454,3957,1856,869,9525,2368,8886,1344,220,8624,8709,7706,9732,9505,1617,430,3652,4408,2149,4424,1785,8416,1375,5307,1381,4965,1025,3550,2248,8235,3151,6610,7155,741,2631,4390,4507,9916,8380,2427,5709,9275,35,5551,6061,3236,7330,7794,4119,7871,1778,3074,6532,1197,1605,9397,8766,186,5781,5918,2104,1207,4256,5072,3601,800,7822,9439,8906,4447,9469,9304,2498,9766,1343,4083,4483,38,5024,6287,1904,3172,8986,5764,9090,6020,3234,2004,7938,9731,3556,8773,9243,9102,3403,9245,5311,1528,7728,29,5831,7082,5296,9171,1715,9039,8208,9256,8180,3102,8823,2453,7781,1084,6741,4153,3112,2704,6816,2589,6743,3122,8353,6924,7156,6023,6580,6076,4723,9824,5744,4520,373,8546,9913,753,3099,8220,6828,1629,9672,4823,5691,597,7550,3069,1591,3842,5630,1835,2361,9711,2881,8288,6790,3130,1668,238,584,7427,1056,440,8128,5656,2120,6016,1327,2919,5484,7262,9692,562,830,7137,3823,1971,4088,8607,5164,5449,3462,2941,2911,9311,7768,1540,5498,5494,1253,1288,9570,9558,3272,2929,8376,8967,9767,1722,9510,3918,2854,4381,1361,2308,6204,3455,6809,1570,7430,1047,4233,840,7273,7099,8980,6393,2168,7378,9652,4262,7666,743,1319,2800,7315,2286,5177,9827,8791,9456,3007,9591,5116,6070,9986,554,2399,3506,6468,8341,2656,4501,5903,5117,1532,415,7358,9519,5283,3801,7057,9775,9155,3011,270,8352,9383,1468,5838,4051,8693,2407,6948,3450,2712,8350,1225,681,737,5681,2420,1868,4142,4196,2261,1360,2322,6377,9765,229,7982,7138,6763,2344,2159,5461,8133,2070,3572,8561,7608,5132,4750,1307,3818,8354,5803,609,5219,4876,4691,152,2692,3351,720,6633,6757,9312,1044,3932,4863,4035,6558,9356,521,4800,6349,7959,643,2113,3705,4434,2174,5201,1533,7914,1356,9796,9478,6430,2988,6451,4397,7024,6546,6521,4183,9103,1992,676,7658,1030,9327,9996,8047,1277,7624,7201,6724,3340,8887,8257,7274,2337,8325,5669,3283,6441,3736,5671,3060,7775,4668,1484,9909,6634,7576,4079,7174,9756,5171,5061,7435,7934,9977,6089,9807,364,1108,948,8892,7555,1564,5720,7819,32,5473,7499,3095,386,6858,8094,8879,61,7766,6036,7493,6082,7660,3341,6591,4527,9488,9084,3790,8600,735,9813,3824,5130,9017,8204,5512,3941,7255,4304,5851,5469,3782,3897,7937,531,1458,1754,8692,5661,1131,162,4451,6707,6675,6687,6446,8388,18,8131,2597,5211,1299,8357,7277,1003,8833,905,9623,8894,2130,4059,7983,5008,842,9092,3201,5768,3943,5900,706,3048,8134,5822,9884,7692,9444,2729,6343,6715,1300,9801,9944,2449,2543,6500,4724,5727,6316,2622,7637,5098,6708,4223,143,1254,3825,7978,8862,9817,4746,727,420,1763,8482,9455,8698,3143,8459,5030,1290,6442,6183,7926,8013,5489,476,6271,907,2504,1333,8703,5948,6028,4729,3849,8077,5916,4092,3868,2203,3288,7949,1229,9489,7431,6836,3894,4559,892,4111,2338,2542,4612,8617,7097,1409,276,9091,7483,2349,4068,9325,7410,240,4416,3552,9621,7246,8119,8054,9600,517,7551,1901,7954,3194,2000,1927,5762,4400,9289,1929,569,1279,845,1586,3726,5662,1809,9266,3973,823,7303,6823,5917,4349,8483,970,631,6805,1220,7393,7286,6366,2001,4455,7519,9143,9077,3753,2551,4938,4651,4593,6637,4109,9195,9981,620,7984,1054,532,4377,7290,4631,3472,9642,4606,7375,3914,432,5745,7500,7083,4516,9231,7823,9442,4274,6903,8100,4267,1898,7559,9686,8303,3532,8849,8249,8166,4378,3864,3980,8534,1230,2632,1791,4704,6222,5108,3504,7482,3447,1639,7487,9814,2869,3422,983,1858,2360,9886,6994,8539,1825,6799,8084,7339,7062,4287,5143,7463,2114,6077,1309,7527,5674,5725,6588,4058,4220,118,3135,5062,1445,9579,327,8847,2007,6986,2613,4740,6934,3178,4716,1739,9179,9563,7739,2200,5866,3576,9257,691,4832,7254,2848,3983,1090,2111,1882,9381,8528,7045,1489,5122,4131,6438,2830,1067,423,2861,285,8447,6507,8490,5450,9159,3773,3375,4569,3648,1050,1565,6243,4491,2378,8732,9438,4037,2747,3714,4850,6755,7421,7426,486,9298,5622,5527,4484,6226,7234,7907,3235,5240,2153,9839,3975,5200,6979,6426,4420,1547,63,7192,2575,3087,8266,599,4881,6245,1977,2009,9459,7485,4355,7236,8177,6826,1385,4294,1580,1607,55,1462,2370,1827,6052,7336,8591,7924,6775,1786,377,6748,2680,4247,9085,6913,7265,6540,2151,8691,8745,8963,2008,9743,66,6523,3901,7970,6102,9317,669,3972,9331,6210,1329,2223,234,2085,6628,2258,7015,6378,4490,1714,5742,1336,9221,4848,3525,3108,9666,3214,7392,1168,6611,6721,5318,6556,7644,9423,6024,5249,3111,6981,6649,6813,4877,2035,7653,9165,1077,2006,1637,1088,719,6127,4867,8339,2517,5659,1026,8729,2945,5907,1987,9390,150,539,3169,4418,4806,2826,6718,3611,3998,3869,9450,9098,5898,9497,5542,9093,6824,3289,212,6971,3171,2235,5572,8800,4777,5581,6559,8071,5797,6853,8552,3241,9166,3763,3175,5560,8467,5878,8801,4505,4276,2163,4437,3091,2257,5147,2926,1978,2036,3618,6878,473,6177,2146,8531,9601,4753,6698,7251,4817,2455,2530,4913,7196,1315,398,163,5032,4882,9636,2145,2831,1509,8098,2743,2722,8771,6656,1676,436,7332,9900,7230,8981,5022,9160,6929,4793,2502,1959,2837,1337,7582,8282,9472,8488,8414,5325,8074,5392,2100,8091,5239,4851,3640,6524,8475,8501,9233,8901,8245,1072,5446,378,7451,5751,4063,1295,6450,2821,156,5966,8232,3361,2503,1908,4878,4840,2791,3719,73,2316,567,2541,4556,9904,4333,8939,8057,5617,1753,9635,6735,7765,8174,1189,1218,701,1675,8919,8945,5891,8785,7662,7269,9431,4687,1099,8464,8836,2131,5523,4785,8519,4132,4578,5612,6857,7722,8342,8900,3320,4662,4783,7175,1477,5607,5033,1881,2049,4669,5528,581,7723,1062,3511,5848,6930,2216,1058,5409,5982,4464,8743,4496,4350,226,6880,9547,1293,6237,2432,7939,9925,6669,6503,6717,2544,4150,6883,7266,6302,4717,4025,8525,8748,9740,5256,2215,6972,7814,7547,2819,3624,1698,8436,3273,5760,2222,5220,1641,3363,393,4055,3817,9999,2769,5844,9306,3358,5085,1670,3993,3794,8675,3537,3896,2547,4165,893,610,2371,7362,7566,614,690,9436,8343,8371,7852,2105,4073,6589,9647,9076,7016,9040,3093,3394,3855,6630,7219,5557,2226,2533,1969,2253,3916,2964,8689,6676,17,4809,1548,5962,3634,8987,1899,6290,9727,9713,9391,5943,4250,183,6841,1353,4336,124,1405,8058,7691,4360,2518,6298,2927,1520,8626,9707,6189,3293,6098,5660,8581,5485,5558,4841,141,8507,457,1768,5153,8424,6631,3338,3279,4179,5070,1573,8042,2865,1614,5963,6053,1761,1235,2658,8602,463,3969,4945,2580,4951,5538,7574,649,1626,6639,3490,8095,7324,7831,3244,4632,6738,9737,466,9380,4448,1561,7193,9421,434,86,2917,5506,9214,863,2273,5433,950,2002,4650,9536,1701,5432,91,3692,34,9607,672,3919,1421,6483,2887,9200,8834,8250,6548,2324,628,1149,6437,9135,8722,288,2023,3127,7190,6187,59,5315,2162,1011,9065,6679,7355,3587,489,1665,2372,1554,2689,7078,897,4720,5833,7583,9794,5293,5842,7432,5490,2568,6129,1188,922,5348,9866,7717,6939,6382,6952,6192,7786,9946,1704,7787,5913,2505,2229,4221,2108,4128,4984,1485,7619,3025,8349,2227,1581,5394,2166,557,5414,2804,7079,5769,9019,8207,6057,3258,2259,5195,8387,1153,4735,7350,8587,1666,3370,518,9441,596,1100,4144,125,1234,2738,6236,6993,6355,6453,1177,6248,3230,8085,4413,3155,1451,3844,4576,7080,1691,987,1558,9276,2519,7168,6121,7615,9786,2872,4986,3911,8421,8038,5937,852,8062,2234,4405,9463,8489,4872,6099,8968,1016,1408,7522,4897,1566,7383,7571,4960,8502,9812,3836,2923,4915,3598,9815,8497,5476,9531,6398,9042,4741,1175,7543,1930,1079,866,4017,3238,8485,5379,6094,4460,8317,4553,3912,3934,57,2150,3861,1141,601,6787,3738,3620,1706,3448,9022,3416,8955,9789,1190,6200,8191,458,9603,1194,450,4780,2935,2030,723,8045,940,5481,6655,5173,6919,9569,9657,5546,8083,533,577,3302,6460,978,4302,2931,626,8340,3902,1625,5537,9173,6706,3851,8612,9888,379,5431,9486,6466,5549,7947,4804,4752,4940,224,1609,8871,8843,696,7973,3970,6817,6512,6862,8861,4533,951,1571,7778,5631,2835,5266,7317,6244,6599,5808,580,94,2288,5820,1241,9,4374,6508,9034,6515,7605,811,9577,7713,3362,5156,6328,4893,8280,9385,2417,9424,5580,890,4884,4732,1448,4871,3344,381,5953,4826,5005,2384,7186,616,604,8422,326,8956,3068,6771,5127,359,8805,6335,7965,3659,5547,1712,45,362,7679,4049,6768,6362,8277,3029,9700,4044,5303,898,9619,2987,9602,8335,2423,3376,2707,5417,1155,4367,7964,245,630,6794,8920,1159,7002,3168,3585,5840,9918,4311,2379,5102,7195,3676,9644,4443,3339,8962,4474,827,3571,9458,207,8362,346,7208,9261,1717,4062,1946,8051,9509,6877,636,3432,2028,2300,5124,195,7911,3167,5001,4404,2380,169,2552,296,2785,8216,6685,3935,8730,5203,2029,6923,6946,3113,5510,2376,8030,9422,9561,2637,6218,3745,6801,1951,3081,1446,3960,3407,5810,6535,535,4154,578,9867,2304,9415,4624,2570,452,1093,5862,3917,2418,4195,5145,304,2920,4252,7464,6211,5777,6184,7247,111,3666,9305,927,2047,9265,1291,5841,6404,8873,9364,8188,3297,7415,6732,5750,8723,8731,4118,144,8588,6266,8383,2619,5571,3205,4869,3098,8877,3073,6238,5790,4203,2582,7708,8965,1269,8744,4159,3614,2037,2136,6356,494,1502,194,3032,5821,5693,6769,2992,3222,3800,16,9703,4396,353,8978,1923,5264,9307,7124,1119,5131,3991,9174,1255,958,9693,2725,4918,2807,2965,8474,4480,2059,3429,642,9590,8518,8,5722,6301,1635,8453,4715,6528,9847,4985,6104,2629,5637,5562,3192,3052,7927,1283,1915,6834,810,7591,5644,2515,1829,7115,2416,1249,9462,7520,7974,2388,8553,6009,9871,3649,9361,1643,3786,930,7740,6961,1147,7363,7153,3884,9730,3928,9704,7621,877,5597,5487,3206,9910,8603,5140,7109,2494,4982,8915,9697,2892,7727,3878,7626,5998,8631,3387,227,847,9044,5464,7596,2754,5590,8831,342,8816,2277,707,4763,5881,5503,7,5224,6330,793,9123,6747,7112,7598,2127,1059,3984,7932,2866,7720,2776,7734,8953,997,1481,1473,5041,4615,9870,1759,3578,3317,9263,7207,7699,699,4969,6594,4012,5704,3966,9864,8674,5737,4089,113,9253,6277,2839,3737,51,2217,914,9365,8821,8856,5610,4324,6840,3492,6518,4971,6873,5129,6142,7329,7419,6843,8513,8899,6619,1431,4027,5682,5228,1490,5929,725,3584,579,7184,2746,8854,8408,9624,3703,9479,3698,9446,5502,6785,4093,9943,9278,2674,4473,8628,8126,8194,9511,8214,5887,7683,5979,8916,8264,2811,8210,6955,7645,7021,3183,3493,7915,6303,433,513,3305,8400,3306,7422,7795,7102,6914,9625,3691,2413,6365,7412,5676,3541,942,4864,1937,5711,4057,5885,4733,8672,5214,9119,3298,8431,4389,370,7380,2593,6386,3522,7647,1282,6115,1118,7359,5336,4774,1332,4289,2750,4366,8121,971,4218,3848,3866,8449,9457,5110,2043,6529,5829,8872,2812,1976,629,2214,2563,8366,9207,2265,8499,6344,3600,7133,9493,3603,6582,7785,7150,9062,10,4536,3128,9104,1964,3359,3374,5640,6514,2676,543,2161,4370,2325,7721,1608,1850,4640,3321,8284,8322,9292,656,5086,2993,3886,8910,2501,7557,6844,8440,1834,2574,6600,6433,5703,8268,8175,8316,3979,6205,5897,7284,7913,3542,7552,4734,5543,4707,3248,975,984,700,7540,5598,3577,41,2951,7295,4125,9695,2606,4599,3437,52,1863,2092,2947,9856,2527,6368,7813,8701,1875,644,214,341,4708,4883,5886,2767,7835,6054,6692,3478,3777,8687,5335,9482,2744,7101,6305,4069,303,2796,1615,6937,2266,1634,1075,3806,3641,2433,5440,4900,1919,7176,6283,8290,7429,1020,3377,2652,7291,4916,1447,5232,5338,7327,9974,7017,3501,5386,7554,9761,4481,1227,1559,7837,1501,996,6861,2015,8251,5261,2741,4200,3249,6289,6722,4192,9353,215,6434,3971,6868,7807,7311,1435,6504,1769,3307,4766,944,2272,9834,7784,9045,4477,7839,2604,357,6148,837,2723,5360,697,1263,9923,8943,9293,7821,7811,1795,2774,3865,2801,956,6463,6198,6270,745,4157,8289,3553,6677,127,7486,1931,9646,1138,1525,3104,5959,3324,6598,5606,2124,3796,4201,4290,9774,4347,5479,4041,8685,6140,2615,54,8297,9873,8932,4903,3028,5084,123,7820,4544,2963,4664,2364,7847,2225,7770,9041,7521,3954,6419,6429,7038,1940,2939,8271,2409,9124,8324,8870,2626,7438,2981,2802,7182,5241,4373,6825,3316,7646,184,8954,1583,8541,3083,8530,1496,5670,3250,502,7046,5578,551,5729,1692,2893,1340,7382,5060,6526,8542,1217,3497,985,1424,8167,6810,5743,6761,2748,6635,7123,2739,2128,1557,5233,7118,1891,4498,1488,6904,1736,7029,9239,4792,1716,3910,9716,5416,2909,7825,5411,5698,3103,5495,6097,5089,8221,5262,7242,6872,5853,7601,8787,4736,5532,612,4574,2885,2979,6144,6225,4099,5905,485,8439,4535,488,6167,7902,8274,7588,615,889,4603,8478,3410,7211,6109,2792,4656,5044,6364,6578,1322,6822,236,7014,9259,3731,2538,4820,5109,7796,9147,9968,1644,2616,6488,4994,6392,4271,8792,4770,1001,2410,7081,5845,8608,3479,9008,4905,4375,865,9206,9269,2795,4301,8073,1256,413,6291,2475,8662,3804,945,193,3233,6320,5123,6536,848,5468,4478,5946,9722,3771,7022,5690,2158,563,19,6710,4470,330,75,8355,4003,1109,9589,2063,1214,8161,8291,8726,7111,439,6014,895,4600,9148,8460,7292,3021,8028,901,8452,694,7439,137,9914,5016,9939,1932,1248,3767,7889,8844,2564,7165,6668,6700,1568,4604,3816,1534,405,6989,8747,5356,6549,6403,3308,5126,5139,2972,3766,2698,3711,6577,6854,5282,5719,2315,2614,7729,1418,9028,1166,6612,2395,2650,2249,556,1562,7305,6133,7910,1596,3075,6331,6893,1747,3096,2441,2882,5877,5225,9954,422,3592,946,4815,7958,6031,339,6311,1939,9781,6040,72,8135,8927,1286,2719,5367,1732,8990,3147,8832,3392,5346,2849,3892,6155,3903,1123,8640,5706,9158,5531,1428,5158,8659,9597,2902,3582,1651,7243,1910,6938,882,2850,2912,3567,3662,464,7563,6988,2786,3536,9430,5763,508,8616,2064,4211,4212,4622,4426,9260,9585,1905,995,8048,5922,6726,7494,6522,5646,5412,5868,871,79,4482,2213,5142,9445,5025,5049,3931,5100,2480,6498,5985,4345,8516,519,8881,3533,365,1896,3067,3870,4910,6640,8694,4216,355,6066,2980,3309,3097,6116,3924,6214,5106,5300,3266,8514,8294,3292,5614,4896,2699,5856,9366,3158,437,8592,5625,5869,8292,5522,1920,815,8824,2021,56,9714,941,587,1371,8237,9258,1060,4147,7371,1224,5970,9841,4358,5163,1471,289,4235,9777,1550,4941,9768,1110,738,2638,7119,2922,749,5536,2934,2437,2553,8656,2959,2946,1774,2474,7818,2665,6976,6696,7000,8938,1526,7027,9890,5945,6921,1612,1292,3076,7447,4160,5623,3789,384,3420,8309,5162,5206,302,9938,7903,2292,3609,9970,2803,2962,4992,8078,7850,2936,3065,8258,3268,686,7838,794,8573,5425,85,7667,3398,8096,1933,9496,7267,8393,3485,404,201,2877,678,1236,8068,7218,3176,9961,3673,7224,9739,4013,8069,715,3047,1867,9499,8298,1170,7030,933,6494,2267,252,7325,449,6107,8759,2178,9979,9279,5213,7323,5353,5328,1854,5834,8329,1008,5766,3018,6792,1563,7033,6251,3402,1355,7318,322,8960,651,5226,9182,3889,5196,6821,9170,3976,8163,3718,9428,1191,280,8780,2196,1167,3078,9192,726,2451,9835,7120,6647,3775,5615,444,3001,454,8522,4425,4614,356,419,9451,9928,1886,8665,3535,5653,6455,5221,2291,2960,7650,2994,1521,1162,1440,4115,1326,3345,1682,5155,4042,4348,5395,5215,6984,3548,3331,3039,8594,3750,6465,4993,3119,8700,9315,4706,9645,909,40,7620,7361,6935,5804,5957,4022,6493,4697,623,7459,4643,7268,4011,2197,4169,8934,315,2817,6422,4648,5236,3210,8295,8715,4598,3257,2989,4024,2022,5569,3020,6162,9994,3129,1244,4512,870,5055,2075,3746,7087,5971,1359,6956,6405,8345,6357,1285,5854,14,1529,6740,999,9492,8678,924,1775,9840,1831,7171,1128,4445,1846,1871,8170,9719,9309,4561,1469,7440,6547,838,2525,2918,7917,9551,5093,3203,695,5749,4308,2666,1161,7711,9586,3872,6729,6615,3140,7237,6730,5554,4538,509,7856,1979,3819,9581,133,3503,5167,1911,428,4050,1187,7304,6400,6185,8796,7405,1472,1652,4858,4407,7278,1412,6497,8261,4046,2182,3788,1524,1953,5577,7005,5583,5141,5779,3527,3637,3356,820,998,8256,5684,4341,1735,7025,7282,3421,1204,249,8557,2305,6313,3959,7198,1578,1847,5565,8727,7089,8165,9787,2828,3469,2467,9250,550,3898,223,8781,4015,523,5065,9295,2387,1338,7364,1567,2025,1146,4497,4974,718,4799,3913,633,7578,2466,3908,4845,4438,1799,6004,2087,8657,8763,9698,9111,7829,8031,5268,7043,3944,913,1853,4942,2302,5023,5500,9599,4575,5935,5329,131,8549,2958,7735,3579,9667,100,1788,4616,5037,2499,8358,2342,4191,4494,8765,6506,318,6268,6783,2290,2710,7296,4653,3580,7560,6447,6533,8049,7803,7682,1519,3597,4781,9583,4757,7471,3159,6712,6602,5341,969,1811,3828,9779,4277,6153,4428,1688,5756,4647,5499,5685,593,4134,3633,2991,8484,9614,2180,6119,3286,7909,5867,1071,8093,6012,6978,6149,4306,47,6690,8035,9475,4091,2115,3327,1948,3404,9515,3854,6749,1511,8337,4388,962,6124,1934,6293,8734,1552,3413,4712,8403,3809,1311,4597,9852,208,1849,1859,8728,884,4254,9339,4036,3880,4140,1303,7061,8683,7599,4394,2014,4161,3295,5548,9167,6152,2352,7481,5056,4694,602,9560,6636,6375,6397,1422,1993,7345,89,5148,8233,9917,6125,2880,1358,6297,1305,171,3909,3805,8579,5873,5466,5734,5925,1709,4898,6058,1619,4207,9319,3265,9567,4245,5366,4526,6300,8477,9495,9037,6907,3990,2347,4096,1365,2789,6043,5552,1245,3798,3253,1841,2823,1139,1154,7853,8645,3518,5235,6646,8420,5632,2460,9483,6069,9526,5892,3566,6354,7669,4978,9303,1916,7469,3715,6653,4558,6864,1748,7203,4415,2685,3012,5570,3211,6777,4957,3282,4209,8509,9831,4335,1221,96,286,7140,2943,2125,219,1674,9218,5066,9896,7075,1974,5933,4152,3702,524,6530,2752,8633,888,6389,7058,8679,4731,6457,3049,4376,1843,1527,1677,1556,3683,3036,5701,2412,4775,8392,1475,6882,3802,7312,1368,6272,2534,7772,8029,9980,6154,7442,6703,8839,8219,9550,9196,9983,9791,7916,5696,2611,1818,679,947,8558,4563,5101,8979,4602,4472,7815,7169,180,8575,4504,4263,8481,2745,1577,4043,2998,6625,4721,2080,2056,1068,2829,1744,6146,5057,4264,603,7205,6778,5541,6830,4371,3526,1510,3350,5105,6262,2107,5883,1302,5076,8564,5115,4155,6273,1783,9416,5613,5480,4789,3354,7893,6776,6233,5815,7800,2545,525,126,5178,7076,3436,5994,8646,5457,1726,9620,4429,4467,3638,2252,1506,6957,2386,8565,3458,3481,4334,2353,6159,3454,5872,1182,7793,1064,1407,9088,8837,6314,7587,5619,6495,5889,5292,9500,2867,1039,5508,7074,5505,7035,4613,8526,928,4500,6454,9286,4078,7963,2081,4258,8410,9043,5924,1879,2067,3716,4549,7693,817,2116,2701,5806,3,5936,2134,3226,7718,2486,7561,3318,4885,7828,8059,8706,308,6315,5828,8176,1103,5013,8604,8544,3706,7086,9208,3999,3921,6164,2512,3857,5418,9137,2211,6999,2436,8320,320,4519,9340,5730,4471,2358,506,1104,7106,7472,9696,3026,1406,6693,1130,4000,7276,5780,9899,3791,1655,1102,4282,8125,7036,3899,6525,6361,1426,9125,3570,3838,3092,3459,4351,1486,2057,8394,6381,2562,7562,9887,9427,3174,312,1041,6296,9675,3783,1623,477,5896,8848,8344,1921,2481,3207,5402,2788,4466,8676,923,9053,5724,6387,931,8813,943,9047,5091,9050,7671,839,833,9734,8658,8033,3690,8319,7826,1377,6648,5697,2949,4696,9640,2587,4442,1646,2121,4081,929,585,9362,2576,1725,2140,598,8224,158,8567,2916,3574,70,2734,9849,673,3516,829,3963,4224,6871,3373,561,1038,7272,7376,4627,7631,6346,3406,9061,3397,6856,9197,8710,3435,8598,5298,1461,4463,4283,3453,6250,3939,4919,9163,641,1963,7689,3162,512,3215,1693,2558,6568,2240,4857,6117,7069,375,7553,2966,2005,5118,1474,5603,5197,1364,4917,4989,6592,3591,2122,6897,6150,3953,8782,2031,4386,1957,471,7542,4113,2961,4671,9822,2365,8749,3952,6947,3867,3349,4946,9976,4485,2270,7742,8227,1494,6987,4682,3491,8680,1208,3015,3165,6085,7661,105,2649,2293,7280,1323,3474,5349,1049,9512,4305,3752,708,2419,7857,1082,5071,5135,4145,7677,1436,3728,1213,3457,4670,4824,9313,7816,2950,4362,6137,5472,3687,5865,972,5938,2431,1181,1660,8070,3937,8684,6280,3549,3184,2913,9606,1713,5517,5,1380,6803,4123,7627,4509,9377,1762,5939,4197,2077,4552,7707,2204,6064,3815,6664,8609,5230,9905,6652,7951,9138,8374,834,4067,8949,3187,228,5816,8336,4244,7849,5358,4966,3748,5567,8430,9924,4053,4610,6255,164,5890,2572,2199,2679,1442,7988,2778,1876,8620,1975,9110,9991,9038,217,1872,1078,4391,7187,6143,1817,6350,3426,3500,6084,6665,5462,4100,9320,1555,8338,2633,7537,2133,1443,2907,3409,9393,968,7672,3401,3517,645,1142,2034,3465,1417,7125,8428,1518,7788,2245,345,8618,2610,849,7779,2366,8402,6688,8389,2188,6838,3887,3131,6552,6686,6037,97,2759,9574,3137,5113,7817,37,5272,9025,442,5584,4286,4225,8810,331,2740,2862,6571,8857,4047,8582,3393,8106,3596,8529,3769,2278,2189,199,7797,4590,6793,896,4268,3177,7066,5000,2955,3132,4186,7806,8109,3845,8370,2718,7529,3759,4075,8173,9139,9858,9115,6128,2500,7470,7602,5786,98,3456,360,7077,2411,1960,1066,8269,2078,2251,8260,3368,5663,2167,3513,1449,2348,5104,4120,429,4990,1902,2733,3037,7316,168,3332,4529,1215,1040,3379,9476,4726,5999,6490,4076,5170,3893,1661,399,6010,3674,6774,3905,4422,3444,874,8762,5082,1233,3371,8043,582,3573,6173,4255,9562,7830,9680,1312,7313,8276,4439,954,2957,1073,5470,1994,9576,2969,938,3958,9749,380,1801,3793,3695,5997,6900,8559,5365,6567,860,5540,2818,4048,2152,2845,3761,9844,3710,7006,213,3820,1947,382,7223,6605,5330,6223,1924,3877,8050,3784,8199,5566,8067,7630,4187,9556,4080,1476,3182,6837,1839,5099,4141,2985,2696,6575,8820,9228,4991,1749,2294,515,5520,6388,8021,855,4586,7962,4875,6407,197,5391,5149,6767,5859,5223,2218,6833,7088,7044,7921,6958,1482,4842,9328,4031,6035,9973,1860,1909,5989,2241,103,1649,6174,2995,6860,4855,8060,721,7484,5133,2274,5363,2181,2836,1133,5657,6126,9797,6415,191,8756,1172,1579,5667,4906,48,4084,5767,3795,5992,5847,4788,6713,6217,5321,258,6538,2082,5718,8610,1007,2303,1995,6390,4873,8417,5191,5134,7771,1094,8469,6060,4899,8215,903,4064,1696,2201,9596,1029,3505,1479,6894,2096,807,5357,1232,1797,974,5460,5186,5882,7617,3697,5451,964,2770,5383,5951,3495,5680,7199,9653,1892,8122,7212,5103,6145,6051,2143,537,3605,33,3528,6353,5972,3741,9504,1836,3770,8182,1592,5574,363,4270,6618,7183,7401,2320,8169,2323,5778,6908,9210,319,3352,592,4284,7688,7319,5350,4026,5291,2635,255,8770,1467,1593,1743,9048,6327,1822,3723,332,2439,4279,1156,8654,625,6596,1654,2688,2472,7776,5700,6059,7209,5973,5568,1543,4761,6030,2053,6661,7141,1363,7649,6369,6926,6286,2760,7148,2044,1330,8969,5368,1699,7810,6417,3070,4431,5575,218,3629,4364,4385,3764,3185,4034,7370,95,8841,8825,9664,6288,3170,878,4136,7764,2091,1463,5443,6079,1069,1176,5956,4102,6379,425,5589,7225,3315,7827,5782,9891,7151,7944,3700,6651,8473,4309,5723,9936,7157,7306,2930,7535,2490,2119,4291,2463,1,545,259,9254,5463,6318,3023,9211,8976,1967,9573,4637,3323,3949,4300,2815,568,1320,7395,8802,2508,4238,6130,4162,6114,4338,1647,9175,8570,6196,4137,5301,7999,7686,8733,7252,1023,2903,122,2210,6953,4411,4874,8828,388,4327,2362,1804,9792,2702,5326,5181,3346,5297,1404,8159,4657,3630,8635,3704,7632,7307,1441,2594,5594,3684,1690,8363,3521,1351,1998,1250,340,9425,7570,6733,8521,5179,510,6534,1205,6689,5094,1983,9537,9116,2578,8902,9882,3391,5465,237,2190,7154,6991,6807,7308,4198,7202,1070,4953,8974,8434,9622,1483,7007,1721,3950,9784,6896,7018,9498,6969,565,7846,4979,6941,278,5370,3290,3378,3160,8476,3873,117,6310,4517,7731,9823,5373,7544,3134,7085,8164,4293,5588,7456,3519,2899,2110,6982,4499,7648,4030,8223,310,6842,9860,1954,5216,11,1085,9757,5308,5716,7678,7217,8425,1966,4239,9117,5658,7901,934,5530,6869,2677,1837,2555,5438,6617,9270,1495,6219,7510,5217,2522,3852,2644,307,7098,2219,3814,102,417,2393,6550,3033,7391,2667,8512,2016,6739,6954,7670,8104,8989,6370,835,6695,8527,4177,3204,4332,687,64,3296,8819,3540,5758,6604,5006,2846,1081,192,8669,1828,1199,1610,5088,7989,1877,2758,1129,9164,7127,2937,3232,605,1542,7019,693,8022,155,1192,3856,4065,3105,8457,9507,6276,586,4444,7610,1737,4163,4354,7931,7226,6881,7449,6657,3050,3256,5277,6780,5493,1265,3330,7399,3411,5119,4513,5322,7967,9626,6013,4365,4890,369,3396,9593,185,2639,4372,2670,1143,908,6015,7294,4511,3509,333,2526,9420,3300,4922,2255,2256,6905,671,6227,2340,8395,9665,2952,8494,5855,5514,9769,9020,7309,9613,1410,6041,7732,3348,4967,9063,7824,4205,3389,3441,2664,9929,8036,3925,2039,7681,5063,5407,3002,1541,7293,474,6319,7789,3671,3778,1120,7568,6106,1982,6950,6800,9524,2086,4292,3311,3797,7502,2647,7812,2269,6163,8845,7590,9011,1961,558,6228,8655,4534,4054,8931,7349,2771,3239,7491,2206,3414,1569,6371,2333,828,4768,5314,4934,3443,4395,8168,3523,843,7840,8118,1789,2681,682,2548,5413,5399,4862,6995,338,952,499,6609,6462,9638,5783,174,9546,9083,3881,7126,2598,2662,1594,3588,2536,1101,4138,347,6812,182,414,4462,9152,1112,600,8936,1231,1730,4849,5267,5759,2784,2663,2202,1349,6232,8908,4567,2820,4605,6263,2832,2797,1598,5342,9112,309,130,5081,3610,7117,4393,167,4296,2220,5961,2944,7790,1403,5193,2309,3270,1243,7548,2208,4798,4700,1990,824,2099,1433,1313,247,8195,8039,6666,1145,9108,424,5052,8099,5278,9717,6970,6927,3461,3449,7067,1928,3565,6704,6962,6258,6090,4146,4719,2421,4947,6492,7676,9609,3997,5573,2773,5209,6332,6138,159,3514,325,5911,3669,6206,3299,396,7003,733,1257,179,6781,4802,8784,5798,2156,93,8385,6870,4689,6021,2986,6025,3945,176,6267,666,4688,7687,808,5839,3876,1174,5227,844,9193,4649,6888,6554,2041,816,438,7094,244,5539,295,1684,2157,4184,3604,1137,7310,7975,9244,8511,1328,6936,876,455,441,5400,6890,9945,4038,8500,571,734,4208,65,4007,6928,1587,2345,6067,8222,589,3360,4310,7441,468,3859,9967,9549,8611,4246,4369,2997,7992,6136,8189,5618,2209,3042,3955,3688,3494,9323,5020,2772,4259,6541,5526,5748,8300,8999,1150,7051,1017,5739,8794,5976,9898,3487,9634,2175,5787,92,177,5628,5401,5456,3635,5229,2346,6252,395,4601,4730,3882,7616,6259,608,9369,4764,555,3082,8711,3195,6797,3008,1513,9055,9992,5011,3304,2492,6131,5857,1180,7531,4539,5352,6282,314,6469,8883,2084,3136,1195,1262,4156,6745,9060,9709,2645,1724,8323,4954,1499,3964,846,3488,3125,2762,7777,4193,7353,5237,1805,3040,2017,5067,5199,6520,7657,5879,9344,4199,9067,9308,4518,3285,9559,1685,5652,4592,1842,1707,487,6120,9922,5471,7799,5595,7609,3675,9836,3139,2906,1125,7809,1955,3529,1803,9378,4312,647,660,4939,2720,6513,3843,392,501,4914,2822,2847,3562,3213,5387,2452,2560,9324,3531,9064,5774,4098,2262,1504,4226,661,9894,4240,1092,5850,368,3982,8632,4403,4751,9656,1820,3694,6898,5243,2915,4185,2608,6505,4695,9850,2605,6581,4646,2900,5876,4122,6632,1760,4980,8829,481,5040,9379,6220,6171,6758,3261,7357,3575,4523,6179,9227,2924,1553,8272,9708,6889,172,3146,8742,9375,862,9082,5977,2457,4681,5371,8913,6396,6063,7191,2177,7244,757,5014,2276,3480,1304,1890,387,3114,5168,6032,6839,4382,9575,3768,4831,248,7013,1087,9851,9578,9105,3891,1301,4249,6195,1480,5858,3810,7121,4888,2549,4936,2076,5942,6759,6284,8105,9906,2244,6411,3153,8789,7245,1367,3732,8246,1669,4285,1342,3607,1211,8287,4827,6428,5689,7055,505,7842,67,8373,2624,5271,4607,5832,6416,6694,1925,6256,3045,867,9720,1956,5246,5826,2135,3196,8937,8786,729,1318,7530,5323,8390,9185,5770,3543,6626,3822,8386,3445,4033,8929,372,7425,5384,391,1878,5034,6482,4094,3699,6141,2790,7987,4554,5359,3498,5802,3661,2636,6731,6161,8532,527,5144,7564,7070,3152,7388,4032,49,8404,6216,990,9926,9676,5175,7320,5894,6197,4002,3940,6123,1700,3142,15,4987,1812,5077,6795,6727,7854,9543,7791,5059,2516,480,1034,5408,3978,2531,7164,5333,2271,4379,4214,2523,4895,8448,9679,4891,4530,5281,2341,5515,1751,713,8369,7090,157,6557,4188,400,4116,2970,9848,6597,8063,4868,2586,526,8053,2524,3357,462,5151,8461,498,9054,9649,7407,4206,6376,2601,316,6374,1382,6039,9184,4714,5908,4758,3240,9087,8764,1415,8217,891,7093,3246,4924,2381,5027,3546,5576,1453,6178,4298,4510,5385,9336,2010,2810,82,7031,5683,3776,5954,268,4340,4243,383,9718,7281,351,8580,3612,3231,9052,6831,4585,7584,1936,9215,3364,4889,9893,337,4767,6193,2312,4040,1589,9426,3787,1624,8265,1922,7704,7618,1884,8758,8451,1664,1010,3471,5231,4227,1276,8571,3686,3693,279,4228,2782,3751,7356,3885,1395,5799,6207,5846,3922,2775,813,3071,1996,4794,4072,9908,7633,1097,1089,1169,6593,8248,6964,6042,864,5439,6509,570,1938,8480,3883,4117,2735,321,6464,1985,2653,9343,549,7592,1164,658,504,6485,6917,6132,5901,5260,1984,5257,6660,2471,1280,8244,1193,69,4907,4748,9217,4452,670,7912,1310,7023,7780,640,542,1339,3962,2138,5752,5651,3664,5452,1595,7333,2375,1505,170,6744,6879,3063,5354,3319,9219,2098,7480,1711,2171,4441,2172,1914,1900,5794,4611,2391,632,4968,8551,6620,7200,627,5444,1160,9608,8964,9584,2779,6564,6425,7986,818,2732,8664,5639,1944,6563,5561,6448,3681,714,5474,2026,7394,8686,1638,2468,657,1083,7001,9975,2621,8769,9046,7454,7920,6811,6638,7414,7957,1350,3452,1848,7556,544,4894,1116,2317,6832,3781,4328,6699,2438,559,4594,4453,5152,8576,2583,4449,2630,2925,2724,5923,5559,3163,6701,6285,6804,2592,7536,3560,5095,5550,1728,936,8510,6933,1888,2672,2355,4202,8037,7467,4087,3712,6221,2405,9855,2799,9018,9897,4621,4636,5563,9513,1815,7836,7948,2890,1352,5544,3314,1027,4705,6791,2888,4514,5986,4927,2295,8397,6847,8496,250,6391,9057,3440,5009,5638,6160,5488,401,2164,479,2462,6866,607,9776,349,8895,1628,2967,6345,4363,475,2144,9376,3333,1006,4288,9572,2683,8523,1640,2289,3977,7233,4410,4356,2165,8660,7906,3489,7411,2878,8136,6845,2335,421,1492,5345,4537,8803,868,4384,8783,8846,6876,1430,2535,7060,5634,6135,4107,7152,7215,8753,4475,2894,6574,6895,483,3418,190,8267,9354,6108,4698,8218,4383,3056,4819,1572,8446,1997,3438,6055,6519,2509,8456,5712,8127,4762,6139,3811,2155,7455,3057,7572,8988,8864,3004,8263,7258,4912,7163,1459,6606,6423,6949,3058,7905,1237,6734,6486,8719,2205,5643,5564,166,2336,8435,3439,7179,6911,5529,206,1958,8066,6033,2879,3209,6663,8812,448,7745,9485,4257,5812,5817,5596,4856,8076,4130,1414,3353,4866,6278,4837,6779,4801,8690,491,3291,324,6489,9113,8921,1883,1918,6348,980,5459,7569,3812,5390,1387,2956,5906,4617,2928,5675,2938,1517,71,9114,8853,3679,8548,887,9762,4981,4090,4325,5736,7594,5031,7473,1865,3284,2584,7741,9783,9078,9859,205,7239,4217,1689,1516,5324,1203,507,4103,3106,9432,7782,6720,77,7933,9321,5964,4468,8112,275,4557,5496,6788,1823,2212,8790,2671,1945,2651,4180,8181,3269,9056,3193,2977,7379,1284,6502,9989,358,2147,2813,3366,9005,1289,1522,9988,9972,5339,778,3569,705,3150,3303,4469,5608,5475,2742,1487,2687,5263,4930,7185,5747,2495,2011,6281,3400,4655,7328,8926,8055,460,5699,3062,7489,4660,8993,9079,5419,6990,3906,301,3038,78,2975,7063,1046,6479,7365,7032,161,5813,4129,9660,9631,536,4769,8024,8998,1537,336,2254,2721,7716,7283,9191,2561,8462,684,3757,4322,564,1009,8113,5513,613,2855,8907,5928,2373,2976,7122,461,9877,7398,4833,4241,4618,5824,68,8372,919,5591,667,1037,3427,6215,3138,8423,4782,9419,5621,1800,7541,7321,3027,5136,6011,2528,9682,2198,5978,3779,7386,1210,9982,7979,9966,4236,1798,7629,2354,3386,284,9031,160,4261,8089,1179,2491,4297,74,1345,9198]

         }

    },
    methods: {
        sellNFT: function(nft) {
            this.page = 'sellPage';
            this.marketPage = false;
            this.myAssetsPage = false;
            this.sellPage = true;
            this.sellNft = nft;
        },
        onTheMarket: async function () {
            this.page = 'marketPage';
            this.marketPage = true;
            this.myAssetsPage = false;
            this.sellPage = false;
            this.marketNfts = [];
            this.soldNFTs = [];

            try {

                const contractMarketObject = new ethers.Contract(
                    marktAddress,
                    contractMarketABI,
                    provider
                );
                let nftsOnSale = [];
                // get Items on sale from smart contract
                nftsOnSale = await contractMarketObject.getMarketItems().catch((error) => {
                    console.log(error);
                    });

                // iterate over each marketItem
                for (let i = 0; i < nftsOnSale.length; i++) {

                    let tokenID = nftsOnSale[i][2];
                    const contractNFTObject = new ethers.Contract(
                        nftsOnSale[i][1],
                        contractThetaPunksABI,
                        provider
                    );
                    // get URI of NFT
                    const nftURI = await contractNFTObject.tokenURI(tokenID);
                    axios.get('https://opentheta.de/uri/?url='+nftURI).then(response => {
                        for (let i = 0; i<this.marketNfts.length; i++) {
                            if (this.marketNfts[i].name === response.data.name){
                                return;
                            }
                        }
                        let nft = {
                            name: response.data.name,
                            imageUrl: response.data.image,
                            description: response.data.description,
                            id: nftsOnSale[i][0].toNumber(),
                            contract: nftsOnSale[i][1],
                            tokenId: tokenID,
                            seller: nftsOnSale[i][3],
                            owner: nftsOnSale[i][4],
                            category: nftsOnSale[i][5],
                            price: nftsOnSale[i][6].div(ethers.BigNumber.from("10000000000000000")).toNumber()/100,
                            realPrice: nftsOnSale[i][6],
                            isSold: nftsOnSale[i][7],
                        }
                        this.marketNfts.push(nft);
                    });
                }
                axios.get('https://opentheta.de/api/nft/sold/recent/2').then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        let nft = {
                            name: response.data[i].name,
                            imageUrl: response.data[i].imgUrl,
                            description: response.data[i].description,
                            id: response.data[i].itemId,
                            contract: response.data[i].nftContract,
                            tokenId: response.data[i].tokenId,
                            seller: response.data[i].seller,
                            owner: response.data[i].owner,
                            category: response.data[i].category,
                            price: (ethers.BigNumber.from(response.data[i].price).div(ethers.BigNumber.from("10000000000000000"))).toNumber()/100,
                            isSold: true,
                        }
                        this.soldNFTs.push(nft);
                    }

                });
            } catch (err) {
                throw err;
            }

        },
        onMarket: async function () {
            this.page = 'marketPage';
            this.currentFilter = 'ALL';
            this.marketPage = true;
            this.myAssetsPage = false;
            this.sellPage = false;
            this.marketNfts = [];
            this.soldNFTs = [];

            try {

                axios.get('https://opentheta.de/api/nft/on-market').then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        let nft = {
                            name: response.data[i].name,
                            imageUrl: response.data[i].imgUrl,
                            description: response.data[i].description,
                            id: response.data[i].itemId,
                            contract: response.data[i].nftContract,
                            tokenId: response.data[i].tokenId,
                            seller: response.data[i].seller,
                            owner: response.data[i].owner,
                            category: response.data[i].category,
                            creator: response.data[i].creator,
                            price: (ethers.BigNumber.from(response.data[i].price).div(ethers.BigNumber.from("10000000000000000"))).toNumber()/100,
                            realPrice: ethers.BigNumber.from(response.data[i].price),
                            isSold: response.data[i].isSold,
                        }
                        if(nft.category === "ThetaPunks"){
                            nft["rank"] = this.PunkRank[parseInt(nft.name.slice(11))];
                        }
                        this.marketNfts.push(nft);
                    }
                });
                axios.get('https://opentheta.de/api/nft/sold/recent/200').then(response => {
                    response.data.sort((a, b) => {
                        return (b.soldTimestamp - a.soldTimestamp); // ascending
                    });

                    for (let i = 0; i < response.data.length; i++) {
                        let date = new Date(response.data[i].soldTimestamp);
                        let nft = {
                            name: response.data[i].name,
                            imageUrl: response.data[i].imgUrl,
                            description: response.data[i].description,
                            id: response.data[i].itemId,
                            contract: response.data[i].nftContract,
                            tokenId: response.data[i].tokenId,
                            seller: response.data[i].seller,
                            owner: response.data[i].owner,
                            category: response.data[i].category,
                            price: (ethers.BigNumber.from(response.data[i].price).div(ethers.BigNumber.from("10000000000000000"))).toNumber()/100,
                            isSold: true,
                            soldTime: date.toLocaleString(),
                        }
                        this.soldNFTs.push(nft);
                    }

                });
            } catch (err) {
                throw err;
            }

        },
        myAssets: async function () {
            this.page = 'myAssetsPage';
            this.marketPage = false;
            this.myAssetsPage = true;
            this.sellPage = false;
            this.myNFTs = [];
            if(this.userAddress === ""){
                await this.connectToMetamask();
            }

            try {

                for(let j=0; j<NFTProjects.length; j++ ) {
                    const contractObject = new ethers.Contract(
                        NFTProjects[j].contract,
                        contractThetaPunksABI,
                        provider
                    );
                    let balance = await contractObject.balanceOf(this.userAddress).catch((error) => {
                        console.log(error);
                    });
                    // console.log(balance);
                    if(balance > 0) {
                        for(let i = 0; i < balance; i++){
                            let myNFT;
                            let tokenID = await contractObject.tokenOfOwnerByIndex(this.userAddress, i);
                            // console.log(tokenID);
                            const nftURI = await contractObject.tokenURI(tokenID);
                            // console.log(nftURI);

                            axios.get('https://opentheta.de/uri/?url='+nftURI).then(response => {
                                for (let i = 0; i<this.myNFTs.length; i++) {
                                    if (this.myNFTs[i].name === response.data.name){
                                        return;
                                    }
                                }
                                myNFT = {
                                    name: response.data.name,
                                    imageUrl: response.data.image,
                                    description: response.data.description,
                                    tokenId: tokenID,
                                    contract: NFTProjects[j].contract,
                                    owner: this.userAddress,
                                        };
                                this.myNFTs.push(myNFT);
                                // console.log(response.data);
                                });

                        }
                    }
                }
            } catch (err) {
                throw err;
            }
        },
        Launchpad: async function () {
            this.page = 'launchpadPage';
        },
        connectToMetamask: async function () {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                this.userAddress = accounts[0];
                document.getElementById('connectButton').innerHTML = this.userAddress.slice(2,5)+"..." + this.userAddress.slice(-3);
            }
        },
        hideModal: function () {
            this.modal = false;
        },
        setSelected: function(filter) {
            this.currentFilter = filter;
        },
        setThetaPunks: function() {
            this.onMarket();
            this.currentFilter = 'ThetaPunks';
        },
        sortPrice: function(lowToHigh) {
            if (lowToHigh) {
                this.marketNfts.sort((a, b) => {
                    return (b.price - a.price); // descending
                });
            } else {
                this.marketNfts.sort((a, b) => {
                    return (a.price - b.price); // ascending
                });
            }
        },
    },
    created() {
        axios.get('https://opentheta.de/api/projects').then(response => {
            NFTProjects = response.data;
        });
        this.onMarket();
        try{
            if(provider){
                document.getElementById('websiteNotWorking').style.color = "black";
            }
        } catch (e) {
            console.log("No Metamask");
        }
    },
});
