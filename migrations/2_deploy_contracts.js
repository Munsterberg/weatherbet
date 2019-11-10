var WeatherBets = artifacts.require("./WeatherBets.sol");

module.exports = function(deployer) {
  deployer.deploy(WeatherBets);
};
