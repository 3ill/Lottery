const { network } = require("hardhat");
const {ethUsdPriceFeedAddress } = require('../deploy/01-deploy-fund-me');
const {developmentChains, DECIMALS, INITIAL_ANSWER} = require("../HelperHardHat");
const { verify } = require("../utils/verify");
require("dotenv").config();
const {ETHERSCAN_API} = process.env;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const {deploy, log } = deployments;
  const {deployer} = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (developmentChains.includes(network.name)) {
    log ("Local Network Detected! \n Deploying Mocks....")
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [ethUsdPriceFeedAddress, DECIMALS, INITIAL_ANSWER]
    })
    log("Mocks Deployed!");
  }

 
} 

module.exports.tags = ["all", "mocks"];