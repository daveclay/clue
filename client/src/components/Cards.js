import React from "react";
import {connect} from "react-redux";
import Card from "./Card";

const Cards = ({
  player,
  cards
}) => (
  <div className="cards">
    <div>
      {
        cards.map(card => <Card key={`card_${card.id}`} card={card}/>)
      }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  player: ownProps.player,
  cards: state.playerCardsByPlayerId[ownProps.player.id]
})

export default connect(
    mapStateToProps,
)(Cards);
