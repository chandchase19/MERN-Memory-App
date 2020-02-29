import {
    GET_GAMES,
    SORT_GAME_HISTORY,
    CLEAR_PROFILE
} from '../actions/types'

const initialState = {
    allGames: [],
    guestGames: [],
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
        case GET_GUEST_GAMES:
            return {
                ...state,
                guestGames: payload,
                loading: false
            }
        case SORT_GAME_HISTORY:
            return {
                ...state,
                sortGamesBy: payload.sortByTitle
        }
        case CLEAR_PROFILE:
            return {
                ...initialState
            }
        default:
            return state
    }
}