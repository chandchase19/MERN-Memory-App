import {
    GET_GAMES,
    SORT_GAME_HISTORY
} from '../actions/types'

const initialState = {
    allGames: [],
    sortGamesBy: 'Recent',
    loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_GAMES:
            return {
                ...state,
                allGames: payload,
                loading: false
            }
        case SORT_GAME_HISTORY:
            return {
                ...state,
                sortGamesBy: payload.sortByTitle
        }
        default:
            return state
    }
}