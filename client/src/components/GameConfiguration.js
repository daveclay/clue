import { connect } from "react-redux";
import {
  updatePlayerName,
  addHumanPlayer,
} from "../redux/actions"

import {
  addComputerPlayer,
} from "game-client-actions";

const GameConfiguration =(
  {
    updatePlayerName,
    addHumanPlayer,
    addComputerPlayer,
    addPlayerForm,
    gameStarted,
    isAddHumanPlayerEnabled
  }) => (
  <div className="addPlayer">
    <input id="playerName"
           placeholder="Player Name"
           value={addPlayerForm.name}
           disabled={gameStarted}
           onKeyUp={e => {
             if (e.code === 'Enter') {
               addHumanPlayer()
             }
           }}
           onChange={(e) => {
             updatePlayerName(e.target.value);
           }}/>
    <button id="addHumanPlayer"
            disabled={!isAddHumanPlayerEnabled}
            onClick={() => addHumanPlayer()}>Join!</button>

    <button id="addComputerPlayer"
            disabled={gameStarted}
            onClick={() => addComputerPlayer()}>Add Computer Player</button>
  </div>
)

const mapStateToProps = state => ({
  addPlayerForm: state.client.addPlayerForm,
  gameStarted: state.gameStarted,
  isAddHumanPlayerEnabled: !state.gameStarted && state.playerIndex < 0
})

export default connect(
    mapStateToProps,
    {
      updatePlayerName,
      addHumanPlayer,
      addComputerPlayer,
    }
)(GameConfiguration);
