module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer, sharedNFTLogic, zorbNFT } = await getNamedAccounts();

  let zorbAddress = zorbNFT;
  let sharedNFTLogicAddress = sharedNFTLogic;
  // Deploy in testnet or when no base is deployed
  if (!zorbAddress) {
    zorbAddress = (await deployments.get("ZorbNFT")).address;
  }
  console.log({ zorbAddress });
  if (!sharedNFTLogic) {
    sharedNFTLogicAddress = (await deployments.get("TestSharedNFTLogic"))
      .address;
  }

  await deploy("ZorbFridge", {
    from: deployer,
    args: [zorbAddress, sharedNFTLogicAddress],
    log: true,
  });
};
module.exports.tags = ["ZorbFridge"];
module.exports.dependencies = ["TestSharedNFTLogic", "ZorbNFT"];
