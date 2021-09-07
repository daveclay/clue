import { connect } from "react-redux";
import Notify from "./Notify"
import GameConfiguration from "./GameConfiguration";

import {
  startGame,
  resetGame
} from "game-client-actions";

const Header = ({
    messageFromServer,
    startGame,
    resetGame,
    gameStarted,
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
      {
        gameStarted ? null : <GameConfiguration />
      }
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
  messageFromServer: state.messageFromServer,
  gameStarted: state.gameStarted,
})

export default connect(
    mapStateToProps,
    {
      startGame,
      resetGame
    }
)(Header);
