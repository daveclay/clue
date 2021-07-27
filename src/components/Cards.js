import React from "react";
import {connect} from "react-redux";
import Card from "./Card";

const Cards = ({
  player,
}) => (
  <div className="cards">
    <div>
      {
        player.cards.map(card => <Card key={`card_${card.id}`} card={card}/>)
      }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  player: ownProps.player,
})

export default connect(
    mapStateToProps,
)(Cards);
