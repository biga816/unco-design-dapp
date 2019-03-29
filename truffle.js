const HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = require( "./mnemonic.json" );

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/1jyxaSVQd74TDQH6IHbe")
      },
      network_id: 1,
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/1jyxaSVQd74TDQH6IHbe")
      },
      network_id: 3
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/1jyxaSVQd74TDQH6IHbe")
      },
      network_id: 4
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/1jyxaSVQd74TDQH6IHbe")
      },
      network_id: 42
    },
  }
};
