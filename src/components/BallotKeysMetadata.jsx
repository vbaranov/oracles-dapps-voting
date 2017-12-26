import React from 'react';
import { inject, observer } from "mobx-react";

@inject("ballotStore")
@observer
export class BallotKeysMetadata extends React.Component {
  render() {
    const { ballotStore } = this.props;
    return (
      <div>
        <div className="hidden">
          <div className="left">
            <div className="form-el">
              <label htmlFor="key">Affected Key</label>
              <input type="text" id="key" 
                value={ballotStore.ballotKeys.affectedKey} 
                onChange={e => ballotStore.changeBallotMetadata(e, "affectedKey", "ballotKeys")} 
              />
              <p className="hint">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              </p>
            </div>
          </div>
          <div className="right">
            <div className="form-el">
              <label htmlFor="key">Mining Key</label>
              <input type="text" id="key" 
                value={ballotStore.ballotKeys.miningKey} 
                onChange={e => ballotStore.changeBallotMetadata(e, "miningKey", "ballotKeys")} 
              />
              <p className="hint">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              </p>
            </div>
          </div>
          <div className="left">
            <div className="form-el">
              <label htmlFor="memo">Memo</label>
              <input type="text" id="memo" 
                value={ballotStore.ballotKeys.memo} 
                onChange={e => ballotStore.changeBallotMetadata(e, "memo", "ballotKeys")} 
              />
              <p className="hint">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              </p>
            </div>
          </div>
          <div className="right">
            <div className="form-el">
              <label htmlFor="key">Ballot End</label>
              <input type="date" id="key" 
                value={ballotStore.endTime} 
                onChange={e => ballotStore.changeBallotMetadata(e, "endTime")} 
              />
              <p className="hint">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
