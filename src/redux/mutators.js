import {
  ArrayUtils
} from "../utils";
import {
  getAvailableCharacters,
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
  let availablePlayers = getAvailableCharacters(state.characters, state.players)
  if (availablePlayers.size == 0) {
    alert("No more characters available!")
    return state;
  }

  let character = ArrayUtils.pluckRandom(availablePlayers)
  let player = {
    ...action.player,
    name: state.addPlayerForm.name || character.name,
    character: character,
    image: character.image
  }
  state.players[state.players.length] = player
  movePlayerToRoom(state, player, "Hall")
  state.addPlayerForm.name = ""
}

export const movePlayersToStartingPositions = state => {
  //state.rooms.forEach(room => room.playerNames = []);
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
