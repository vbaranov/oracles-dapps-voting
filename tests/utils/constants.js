let constants = {};
constants.organization = 'poanetwork';
constants.chainSpecRepoName = 'poa-chain-spec';
constants.contractsRepoName = 'poa-network-consensus-contracts';
constants.scriptsRepoName = 'poa-scripts-moc';
constants.addressesSourceFile = 'contracts.json';
constants.pathToConsensusByteCode = `./tests/${constants.contractsRepoName}/build/contracts/PoaNetworkConsensus.json`;
constants.keysFolder = `./tests/keys/`;
constants.nodeFolder = `./tests/nodes/`;
constants.masterNodeFolder = `./tests/nodes/parity-moc/`;
constants.masterNodeKeysFolder = `${constants.masterNodeFolder}keys/`;
constants.specFolder = `./tests/spec/`;
constants.mocKeysFolder = `${constants.keysFolder}moc/`;
constants.poaNetworkConsensusContractAddress = '0x8bf38d4764929064f2d4d3a56520a76ab3df415b';
constants.ABIsSources = {
	'KeysManager': 'KeysManager.abi.json',
	'PoaNetworkConsensus': 'PoaNetworkConsensus.abi.json',
	'BallotStorage': 'BallotsStorage.abi.json',
	'ValidatorMetadata': 'ValidatorMetadata.abi.json',
	'VotingToChangeKeys': 'VotingToChangeKeys.abi.json',
	'VotingToChangeMinThreshold': 'VotingToChangeMinThreshold.abi.json',
	'VotingToChangeProxyAddress': 'VotingToChangeProxyAddress.abi.json'
};
module.exports = {
  constants
}
