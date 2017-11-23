function checkVotingKey(web3, votingKey, contractAddr, abi, cb) {
  attachToContract(web3, abi, contractAddr, function(err, oraclesContract) {
    console.log("attach to oracles contract");
    if (err) {
      console.log(err)
      return cb();
    }

    oraclesContract.methods.checkVotingKey(votingKey).call(function(err, isActive) {
      if (err) {
        console.log(err)
      }
      cb(isActive);
    })
  })
}