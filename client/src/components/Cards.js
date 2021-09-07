import React from "react";
import {connect} from "react-redux";
import Card from "./Card";
import { isPlayerCard } from "game-selectors"

const Cards = ({
  allCards,
  playerCards
}) => (
  <div className="cards">
    <div>
      {
        allCards.map(card => <Card key={`card_${card.id}`}
                                   card={card}
                                   playerCard={isPlayerCard(card, playerCards)}/>)
      }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  allCards: state.allCards || [],
  playerCards: state.playerCards || []
})

export default connect(
    mapStateToProps,
)(Cards);
