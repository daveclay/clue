import React from "react";
import {connect} from "react-redux";
import Player from "./Player";
import {
  getPlayersInRoom,
  isCurrentTurnPlayerAbleToSelectRoom,
} from "game-selectors"
import {
  onRoomSelected,
} from "game-client-actions";


const Room = ({
  room,
  players,
  currentTurnPlayerAbleToSelectRoom,
  onRoomSelected
}) => (
  <div className="room" onClick={() => {
    if (currentTurnPlayerAbleToSelectRoom) {
      onRoomSelected(room.name)
    }
  }}>
    <div>
      <div className="roomName">{room.name}</div>
    </div>
    <div className="players">
        {
            getPlayersInRoom(players, room).map(player => <Player key={player.name} player={player}/>)
        }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  room: ownProps.room,
  players: state.players,
  currentTurnPlayerAbleToSelectRoom: isCurrentTurnPlayerAbleToSelectRoom(state, ownProps.room),
})

export default connect(
    mapStateToProps,
    {
      onRoomSelected,
    }
)(Room);
