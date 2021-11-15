
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
        '          <h4 id="title1" style="font-family: \'Source Sans Pro\', sans-serif;font-weight: 700;color: rgb(255,160,0);margin-bottom: 8px;margin-top: 22px;">{{nft.name}}</h4>\n' +
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
        '<section class="d-flex justify-content-center align-items-center" style="width: 100%;min-height: 100vh; background:#002f73; background-image: url(\'assets/img/background-ThetaPugs.jpg\'); background-repeat: no-repeat; background-size: cover">\n' +
        '        <div class="container">\n' +
        '            <div class="row">\n' +
        '                <div class="col-md-6 d-flex flex-column align-items-center"><img :src="project.image" style="max-width: 90%;padding-top: 50px;">\n' +
        '                    <h5 style="color: rgb(229,232,234);margin-top: 20px;">{{currentSupply}}/{{maxSupply}}</h5>\n' +
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
        name: "ThetaPugs",
        contract: '0x9791ddfefadb0b1bed5f35604de262506c6ee45c',
        image: "assets/img/pug-random-gradient-background.png",
        description: [
            "ThetaPugs is a randomly generated collection of 10,000 Pug NFT’s exclusive to the Theta Network.",
            "Each Pug randomly selects a combination of clothing, headwear and accessories.",
            "Pugs are happy and affectionate, loyal and charming, playful and mischievous, just like the community! Discover the collection and become part of the ThetaPugs journey.",
        ],
        domain: "https://thetapugs.com",
    },
    // {
    //     name: "Swimming Porsche",
    //     contract: '0xf215d120d65d2fd638b3298a5845e7d71ad9dca1',
    //     image: "https://lzsjdbkzm3d5qscce7wbvigq5yiricj2gmp3oij6u2cwe5pxahdq.arweave.net/XmSRhVlmx9hIQifsGqDQ7hEUCTozH7chPqaFYnX3Acc",
    //     description: [
    //         "Swimming Porsche is a collection of 10 Swimming Porsche NFT’s exclusive to the Theta Network.",
    //         "Each Swimming Porsche has a unique ID of which only ten different exist",
    //         "Swimming Porsche is a masterpiece of a local artist which loves cars and water, just like our community! Discover our collection and become part of our journey.",
    //     ],
    //     domain: "",
    // },

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
// const NFTProjects = [
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
                            price: (ethers.BigNumber.from(response.data[i].price).div(ethers.BigNumber.from("10000000000000000"))).toNumber()/100,
                            realPrice: ethers.BigNumber.from(response.data[i].price),
                            isSold: response.data[i].isSold,
                        }
                        this.marketNfts.push(nft);
                    }
                });
                axios.get('https://opentheta.de/api/nft/sold/recent/50').then(response => {
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
