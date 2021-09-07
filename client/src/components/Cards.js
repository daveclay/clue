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
  player: state.players.length == 0 ? null : state.players[state.playerIndex],
  cards: state.cards || []
})

export default connect(
    mapStateToProps,
)(Cards);
