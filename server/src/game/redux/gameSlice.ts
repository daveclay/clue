import { ArrayUtils } from 'js-utils'
import gameSelectors from "game-selectors"
import {CaseReducer, CaseReducers} from "@reduxjs/toolkit/src/createReducer";
import {CaseReducerWithPrepare, SliceCaseReducers} from "@reduxjs/toolkit/src/createSlice";
import {ActionCreatorWithoutPayload, PayloadAction, PayloadActionCreator} from "@reduxjs/toolkit/src/createAction";
import {Action, AnyAction} from "redux";
import {Draft} from "immer";

const {
    sample
} = ArrayUtils

const {
    getAvailableCharacters
} = gameSelectors

interface Character {
    name: string
    image: string
}

interface Player {
    id: number
    gameClientId: string
    human: boolean
    name: string
    character: Character
    image: string
}

interface Room {
    name: String
    players: Array<Player>
}

interface Weapon {
    name: String
}

interface WhoDunnit {
    character: Character
    room: Room
    weapon: Weapon
}

interface GameState {
    players: Array<Player>
    characters: Array<Character>
    rooms: Array<Room>
    weapons: Array<Weapon>
    whoDunnit?: WhoDunnit
    notify?: string
    currentTurnPlayerIndex: number
}

// Define the initial state using that type
const initialState: GameState = {
    currentTurnPlayerIndex: 0,
    players: [],
    characters: [
        {
            name: "Miss Scarlett",
            image: "pink"
        },
        {
            name: "Mr. Green",
            image: "green"
        },
        {
            name: "Colonel Mustard",
            image: "orange"
        },
        {
            name: "Professor Plum",
            image: "blue"
        },
        {
            name: "Mrs. Peacock",
            image: "lightblue"
        },
        {
            name: "Mrs. White",
            image: "white"
        }
    ],
    weapons: [
        {
            name: "Candlestick"
        },
        {
            name: "Dagger"
        },
        {
            name: "Lead Pipe"
        },
        {
            name: "Revolver"
        },
        {
            name: "Rope"
        },
        {
            name: "Wrench"
        }
    ],
    rooms: [
        {
            name: "Kitchen",
            players: []
        },
        {
            name: "Ballroom",
            players: []
        },
        {
            name: "Conservatory",
            players: []
        },
        {
            name: "Billiard Room",
            players: []
        },
        {
            name: "Library",
            players: []
        },
        {
            name: "Study",
            players: []
        },
        {
            name: "Hall",
            players: []
        },
        {
            name: "Lounge",
            players: []
        },
        {
            name: "Dining Room",
            players: []
        },
    ]
}

const compose = (...reducers) => {
    return <T>(state: GameState, action?: T) => {
        return reducers.reduce((newState, reducer) => reducer(newState, action), state)
    }
}

const resetCurrentTurnPlayerIndex = (state: GameState) => {
    return state
}

const pickWhoDunnit = (state: GameState) => {
    return state
}

const distributeCards = (state: GameState) => {
    return state
}

const movePlayersToStartingPositions = (state: GameState) => {
    return state
}

const startGameFn = compose(
    state => ({
        ...state,
        gameStarted: true
    }),
    resetCurrentTurnPlayerIndex,
    pickWhoDunnit,
    distributeCards,
    movePlayersToStartingPositions
)


const things = {
    addPlayer: (state: GameState,
                action: {
                    gameClientId: string,
                    player: {
                        name: string,
                        human: boolean
                    }
    }) => {
        let availableCharacters = getAvailableCharacters(state.characters, state.players)
        if (availableCharacters.size === 0) {
            state.notify = "No more characters available!"
            return
        }

        let character = sample(availableCharacters)
        let playerIndex = state.players.length
        let player = {
            id: playerIndex,
            gameClientId: action.gameClientId,
            human: action.player.human,
            name: action.player.name || character.name,
            character: character,
            image: character.image
        }

        state.players[playerIndex] = player
        // Mutators.movePlayerToStartingPosition(state, player)
    },
    startGame: startGameFn
}
