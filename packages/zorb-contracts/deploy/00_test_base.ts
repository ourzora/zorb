module.exports = async ({ getNamedAccounts, deployments}: any) => {
  const { deploy } = deployments;
  const { deployer, erc721base } = await getNamedAccounts();

  console.log({erc721base})

  if (!erc721base) {
    await deploy("BaseTestContract", {
      from: deployer,
      args: [],
      log: true,
    });
  }
};
module.exports.tags = ["BaseTestContract"];