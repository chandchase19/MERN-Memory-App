import {
    GET_GAMES,
    GET_GUEST_GAMES,
    SORT_GAME_HISTORY,
    CLEAR_PROFILE,
    ADD_GUEST_GAME,
    CLEAR_GUEST_GAMES,
    GET_GAMES_LOADING_STATUS
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
                guestGames: [...state.guestGames, payload],
                loading: false
            }
        case ADD_GUEST_GAME:
            return {
                ...state,
                guestGames: [...state.guestGames, payload],
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
        case CLEAR_GUEST_GAMES:
            return {
                ...state,
                guestGames: []
            }
        case GET_GAMES_LOADING_STATUS:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}