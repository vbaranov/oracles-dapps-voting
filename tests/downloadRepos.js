const downloadRepo = require("./utils/downloadRepo");
const Constants = require("./utils/constants");
const constants = Constants.constants;

main()

async function main() {
	await downloadRepo(constants.contractsRepoName);
	await downloadRepo(constants.scriptsRepoName);
}
