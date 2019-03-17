var UncoToken = artifacts.require("./UncoToken.sol");

module.exports = function(deployer) {
  deployer.deploy(UncoToken);
};