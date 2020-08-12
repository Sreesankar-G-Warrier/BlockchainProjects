var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "quarter exhibit bench relax rotate three duty denial hurdle slight interest pumpkin";

module.exports = {
  networks: {
    development: {
      host:'127.0.0.1',
      port:8545,
      network_id: '*'
    },
 rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/1496615348ad40819bbc0f767c78c23d");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  }
  },
  compilers: {
   /* solc: {
      version: "^0.4.24"
    }*/
  }
};