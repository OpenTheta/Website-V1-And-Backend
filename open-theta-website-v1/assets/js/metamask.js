// const web3 = new Web3('https://eth-rpc-api-testnet.thetatoken.org/rpc')
// const chainID = 365 // for the Theta Testnet

// const web3 = new Web3('https://eth-rpc-api.thetatoken.org/rpc')
// const chainID = 361 // for the Theta Mainnet
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()
const thetaPunks = "0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473"
// const provider = new ethers.providers.JsonRpcProvider('https://eth-rpc-api.thetatoken.org/rpc');


var userAccount = "";


async function connectToMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        document.getElementById('connectButton').innerHTML = userAccount.slice(2,5)+"..." + userAccount.slice(-3);
        var balance = await provider.getBalance(userAccount)
        try {
            const contractABI = [
                "function tokenURI(uint256 _tokenId) view returns (string memory)",
            ];
        const contractObject = new ethers.Contract(
            thetaPunks,
            contractABI,
            provider
        );

        const result = await contractObject.tokenURI(45);
        console.log(result);
        
        const req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open("GET", result);
        req.onload  = function() {
            var jsonResponse = req.response;
            var name = jsonResponse.name;
            console.log(name);
            var image = jsonResponse.image;
            document.getElementById('image1').style.background = `url(${image})`;
            document.getElementById('image1').style.backgroundRepeat = "no-repeat";
            document.getElementById('image1').style.backgroundSize = "contain";
            document.getElementById('title1').innerHTML = name;
        };
        req.send();
            
        } catch (err) {
            throw err;
        }
    }
}