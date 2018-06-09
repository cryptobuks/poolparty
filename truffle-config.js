require('dotenv').config();
require("babel-register")({
  // Ignore can also be specified as a function.
 ignore: function(filename) {
   if (filename.indexOf("node_modules/zeppelin-solidity") !== -1 || filename.indexOf("poolparty/contracts") !== -1 || filename.indexOf("poolparty/test") !== -1 ||
   filename.indexOf("poolparty/coverageEnv/test") !== -1) {
     return false;
   } else {
     return true;
   }
 },

});require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

const infuraProvider = network => providerWithMnemonic(
  process.env.MNEMONIC || '',
  `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
);

const ropstenProvider = process.env.SOLIDITY_COVERAGE
  ? undefined
  : infuraProvider('ropsten');

const rinkebyProvider = process.env.SOLIDITY_COVERAGE
    ? undefined
    : infuraProvider('rinkeby');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
      gasPrice:0x00001,
      gas: 4612388000

    },
    ropsten: {
      provider: ropstenProvider,
      network_id: 3, // eslint-disable-line camelcase
      gas: 4612388
    },
      rinkeby: {
          provider: rinkebyProvider,
          network_id: 4, // eslint-disable-line camelcase
          gas: 4612388
      },
    coverage: {
      host: 'localhost',
      network_id: '*', // eslint-disable-line camelcase
      port: 8555,
      gasPrice:0x00001,
      gas: 4612388000
    },
    testrpc: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
      gasPrice:0x01
    },
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // eslint-disable-line camelcase
      gasPrice:0x01
    },
  },
};
