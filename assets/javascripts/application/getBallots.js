function getBallots(web3, func, acc, contractAddress, abi, cb) {
	SHA3Encrypt(web3, func, function(funcEncode) {
		var funcEncodePart = funcEncode.substring(0,10);

		var data = funcEncodePart;
		
		call(web3, null, contractAddress, data, function(ballotsResp) {
			ballotsResp = ballotsResp.substring(2, ballotsResp.length);
			var ballotsArray = [];
			var item = "";
			for (var i = 0; i < ballotsResp.length; i++) {
				item+=ballotsResp[i];
				if ((i + 1)%64 == 0) {
					item = item.substr(item.length - 40, 40);
					ballotsArray.push(item);
					item = "";
				}
			}
			ballotsArray.shift();
			ballotsArray.shift(); //number of elements

			if (ballotsArray.length == 0) {
				cb(ballotsArray);
				return;
			}

			var ballotsArrayOut = [];
			var iasync = [];
			var ballotDataCount = 12;
			for (var i = 0; i < ballotsArray.length; i++) {
				iasync.push(0);
				getBallotMemo(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("memo", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				ballotCreatedAt(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("createdAt", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getBallotVotingStart(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("votingStart", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getBallotVotingEnd(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("votingEnd", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getVotesFor(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("votesFor", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getVotesAgainst(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("votesAgainst", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getBallotAction(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("action", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				ballotIsVoted(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("voted", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getBallotMiningKey(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("miningKey", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getBallotAffectedKey(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("affectedKey", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getBallotAffectedKeyType(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("affectedKeyType", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});

				getBallotOwner(web3, acc, ballotsArray[i], i, contractAddress, abi, function(_i, resp) {
					iasync[_i]++;
					ballotsArrayOut = getBallotsPropertyCallback("owner", resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb);
				});
			}
		});
	});
}

function getBallotsPropertyCallback(prop, resp, _i, iasync, ballotsArray, ballotDataCount, ballotsArrayOut, cb) {
	if (!ballotsArrayOut[_i]) {
		var ballot = {};
		ballot[ballotsArray[_i]] = {};
		ballot[ballotsArray[_i]][prop] = resp;
		ballotsArrayOut.push(ballot);
	} else ballotsArrayOut[_i][ballotsArray[_i]][prop] = resp;

	var finish = true;
	for (var j = 0;  j < iasync.length; j++) {
		if (iasync[j] < ballotDataCount) {
			finish = false;
			break;
		}
	}

	if (finish) {
		for (var j = 0; j < ballotsArray.length; j++) {
			var jasync = 0;
			var miningKey = ballotsArrayOut[j][ballotsArray[j]].miningKey;
			if (miningKey.length > 40) miningKey = miningKey.substr(miningKey.length - 40);
		}
		cb(ballotsArrayOut);
		return false;
	} else return ballotsArrayOut;
}