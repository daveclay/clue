import { connect } from "react-redux";
import Notify from "./Notify"
import {
  updatePlayerName,
  addHumanPlayer,
} from "../redux/actions"

import {
  addComputerPlayer,
  startGame,
  resetGame
} from "game-client-actions";

const Header = ({
    addPlayerForm,
    messageFromServer,
    updatePlayerName,
    addHumanPlayer,
    addComputerPlayer,
    startGame,
    resetGame,
    gameStarted
}) => (
  <div className="header">
    <div className="title">
      CLUE
      &nbsp;
      {
        messageFromServer
      }
    </div>
    <div className="gameControls">
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
                disabled={gameStarted}
                onClick={() => addHumanPlayer()}>Join!</button>

        <button id="addComputerPlayer"
                disabled={gameStarted}
                onClick={() => addComputerPlayer()}>Add Computer Player</button>
      </div>
      |
      <button id="startButton"
              onClick={() => startGame()}>
        {
          gameStarted ? "Restart!" : "Start!"
        }
      </button>
      <button id="resetButton"
              onClick={() => resetGame()}>Reset Game</button>
    </div>
    <Notify/>
  </div>
)

const mapStateToProps = state => ({
  addPlayerForm: state.client.addPlayerForm,
  messageFromServer: state.messageFromServer,
  gameStarted: state.gameStarted
})

export default connect(
    mapStateToProps,
    {
      updatePlayerName,
      addHumanPlayer,
      addComputerPlayer,
      startGame,
      resetGame
    }
)(Header);
