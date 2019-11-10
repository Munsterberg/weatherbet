const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic =
  "start outdoor cabbage spatial program board left then rally jar dance bean";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: new HDWalletProvider(
        mnemonic,
        "https://ropsten.infura.io/v3/8bc24cb75f3c47eba9bb028b64085bd4"
      ),
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.4.24" // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
  }
};
