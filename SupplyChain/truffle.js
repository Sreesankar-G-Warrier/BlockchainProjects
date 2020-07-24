const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "Add Your Mnemonic";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/Your Rinkeby Address'),
        network_id: "*",       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000,
       //confirmations: 2,    // # of confs to wait between deployments. (default: 0)
       timeoutBlocks: 5000,  // # of blocks before a deployment times out  (minimum/default: 50)
    }
  }
};
