const { network } = require("hardhat");
const { networkConfig, developmentChains} = require("../HelperHardHat");
const { verify } = require('../utils/verify')

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  
  let ethUsdPriceFeedAddress;
  if(developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address

  } else {
     ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
  }

  const args = [ethUsdPriceFeedAddress]

  const FundMe = await deploy("Fundme", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  
  if (!developmentChains.includes(network.name) && ETHERSCAN_API) {
    await verify(FundMe.address, args)
  }


}

module.exports.tags = ["all", "fundme"];