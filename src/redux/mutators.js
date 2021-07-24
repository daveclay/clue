import {
  ArrayUtils
} from "../utils";
import {
  getCurrentTurnPlayer,
  getRoomByName,
} from "../selectors/selectors";

/************************************************
 * Mutators
 ************************************************/
export const resetGame = state => {
  state.gameOver = false
  state.victory = false
}

export const addPlayer = (state, action) => {
  if (state.addPlayerForm.name.length === 0)  {
    return state;
  }
  let character = ArrayUtils.pluckRandom(state.characters)
  let player = {
    ...action.player,
    name: state.addPlayerForm.name,
    character: character,
    image: character.image
  }
  state.players[state.players.length] = player
  movePlayerToRoom(state, player, "Hall")
  state.addPlayerForm.name = ""
}

export const movePlayersToStartingPositions = state => {
  state.rooms.forEach(room => room.playerNames = []);
}

export const movePlayerToRoom = (state, player, roomName) => {
  leaveCurrentRoom(state, player.name)
  let newRoom = getRoomByName(state, roomName);
  newRoom.playerNames[newRoom.playerNames.length] = player.name
}

export const moveCurrentPlayerToRoom = (state, roomName) => {
  let currentTurnPlayer = getCurrentTurnPlayer(state)
  if (currentTurnPlayer) {
    movePlayerToRoom(state, currentTurnPlayer, roomName)
  }
}

export const leaveCurrentRoom = (state, playerNameToRemove) => {
  state.rooms.forEach(room => {
    room.playerNames = ArrayUtils.allExcept(room.playerNames, playerNameToRemove);
  })
}
