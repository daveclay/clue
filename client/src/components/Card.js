import React from "react";
import {connect} from "react-redux";

const Card = ({
  card,
  player,
  playerCard
}) => (
  <div className={`card ${playerCard ? "playerCard" : ""}`}>
    <div>
      {
        card.name
      }
    </div>
    <div className="card-status">
      {
        playerCard ? "✓" : "?"
      }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  card: ownProps.card,
  player: ownProps.player,
  playerCard: ownProps.playerCard
})

export default connect(
    mapStateToProps,
)(Card);
