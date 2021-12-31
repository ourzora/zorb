module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer, erc721base, sharedNFTLogic } = await getNamedAccounts();

  let baseAddress = erc721base;
  // Deploy in testnet or when no base is deployed
  if (!baseAddress) {
    baseAddress = (await deployments.get("BaseTestContract")).address;
  }

  let sharedNFTLogicAddress = sharedNFTLogic;
  // Deploy in testnet or when no base is deployed
  if (!sharedNFTLogic) {
    sharedNFTLogicAddress = (await deployments.get("TestSharedNFTLogic")).address;
  }

  await deploy("ZorbNFT", {
    from: deployer,
    args: [baseAddress, sharedNFTLogicAddress],
    log: true,
  });
};
module.exports.tags = ["ZorbNFT"];
module.exports.dependencies = ["TestSharedNFTLogic"];
