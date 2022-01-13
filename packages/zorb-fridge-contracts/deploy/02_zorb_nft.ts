module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer, sharedNFTLogic, zorbNFT } = await getNamedAccounts();

  let sharedNFTLogicAddress = sharedNFTLogic;
  // Deploy in testnet or when no base is deployed
  if (!sharedNFTLogic) {
    sharedNFTLogicAddress = (await deployments.get("TestSharedNFTLogic"))
      .address;
  }

  if (!zorbNFT) {
    await deploy("ZorbNFT", {
      from: deployer,
      args: [sharedNFTLogicAddress],
      log: true,
    });
  }
};
module.exports.tags = ["ZorbNFT"];
module.exports.dependencies = ["TestSharedNFTLogic"];
