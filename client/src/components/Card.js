import React from "react";
import {connect} from "react-redux";

const Card = ({
  card,
  player,
}) => (
  <div className="card">
    <div>
      {
        card.name
      }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  card: ownProps.card,
  player: ownProps.player,
})

export default connect(
    mapStateToProps,
)(Card);
