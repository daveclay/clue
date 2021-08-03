import React from "react";
import {connect} from "react-redux";
import Cards from "./Cards";

const Footer = ({
  player,
}) => (
  <div className="footer">
    <div>
      {
        player != null && player.human ? <Cards key={`cards_${player.id}`} player={player}/> : null
      }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  player: state.players[state.currentTurnPlayerIndex]
})

export default connect(
    mapStateToProps,
)(Footer);
