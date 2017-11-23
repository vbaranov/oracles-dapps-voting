function checkVotingKey(web3, votingKey, contractAddr, abi, cb) {
  let ValidatorsStorage = attachToContract(web3, abi, contractAddr)
  console.log("attach to oracles contract");
  if (!ValidatorsStorage) {
    return cb();
  }

  ValidatorsStorage.methods.checkVotingKeyValidity(votingKey).call(function(err, isActive) {
    if (err) {
      console.log(err)
    }
    cb(isActive);
  })
}