import {ADD_GAME, UPDATE_GAME, UPDATE_GAMES, SELECT_WORD} from '../actions/games'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_GAME:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_GAME:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_GAMES:
      return payload.reduce((games, game) => {
        games[game.id] = game
        return games
      }, {})

    case SELECT_WORD:
      return {
        ...state,
        [payload.id]: payload
      }

    default:
      return state
  }
}
