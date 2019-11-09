var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var WeatherBets = artifacts.require("./WeatherBets.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(WeatherBets);
};
