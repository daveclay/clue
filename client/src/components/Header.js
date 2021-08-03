import { connect } from "react-redux";
import Notify from "./Notify"
import {
  updatePlayerName,
  addHumanPlayer,
  addComputerPlayer,
  startGame
} from "../redux/actions"

const Header = ({
    addPlayerForm,
    messageFromServer,
    updatePlayerName,
    addHumanPlayer,
    addComputerPlayer,
    startGame
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
               onKeyUp={e => {
                 if (e.code === 'Enter') {
                   addHumanPlayer()
                 }
               }}
               onChange={(e) => {
                 updatePlayerName(e.target.value);
               }}/>
        <button id="addHumanPlayer" onClick={() => addHumanPlayer()}>Add Human Player</button>
        <button id="addComputerPlayer" onClick={() => addComputerPlayer()}>Add Computer Player</button>
      </div>
      |
      <button id="startButton" onClick={() => startGame()}>Start!</button>
    </div>
    <Notify/>
  </div>
)

const mapStateToProps = state => ({
  addPlayerForm: state.addPlayerForm,
  messageFromServer: state.messageFromServer
})

export default connect(
    mapStateToProps,
    {
      updatePlayerName,
      addHumanPlayer,
      addComputerPlayer,
      startGame,
    }
)(Header);
