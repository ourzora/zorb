module.exports = async ({ getNamedAccounts, deployments }: any) => {
	const { deploy } = deployments;
	const { deployer, sharedNFTLogic } = await getNamedAccounts();

	if (!sharedNFTLogic) {
		await deploy("TestSharedNFTLogic", {
			from: deployer,
			args: [],
			log: true,
		});
	}
};
module.exports.tags = ["TestSharedNFTLogic"];
