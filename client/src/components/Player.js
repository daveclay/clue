import React from "react";
import { connect } from "react-redux";
import {
  isCurrentTurnPlayer
} from "game-selectors"


const getPlayerClassName = (isCurrentTurn, celebrate) => {
  if (celebrate) {
    return "playerEjected"
  } else if (isCurrentTurn || celebrate) {
    return "turnHighlight"
  } else {
    return ""
  }
}

const Player = ({
  celebrate,
  player,
  isCurrentTurn,
}) => (
    <div className={`player ${getPlayerClassName(isCurrentTurn, celebrate)}`}>
      <div>
        <div className="imageContainer">
          <img src={`character-images/${player.image}.png`}/>
        </div>
        <div className="playerContent">
          <span className="playerName">{player.name}</span>
          <span className="status">
            {
              isCurrentTurn ? "'s turn!" : ""
            }
          </span>
        </div>
      </div>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  celebrate: state.gameOver,
  isCurrentTurn: isCurrentTurnPlayer(state, ownProps.player),
})

export default connect(mapStateToProps, {

})(Player);
