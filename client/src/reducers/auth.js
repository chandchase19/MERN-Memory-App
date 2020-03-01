import {
    LOGIN,
    LOGOUT,
    ADD_LOGIN_ERROR,
    ADD_REGISTER_ERROR,
    CLEAR_LOGIN_ERRORS,
    CLEAR_REGISTER_ERRORS,
    VERIFY_ID,
    START_AUTH_LOADING
} from '../actions/types'

const intitalState = {
    loading: true,
    isLoggedIn: false,
    authErrors: [],
    registerErrors: [],
    loginErrors: [],
    authId: null,
    userName: 'guest'
}

export default function(state = intitalState, action) {
    const { type, payload } = action

    switch(type) {
        case LOGIN:
            return {
                ...state,
                ...payload,
                authErrors: [],
                loggedIn: true,
                loading: false
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                authId: null,
                loading: false
            }
        case ADD_LOGIN_ERROR:
            return {
                ...state,
                loginErrors: [...payload]
            }
        case ADD_REGISTER_ERROR:
            return {
                ...state,
                registerErrors: [...payload]
            }
        case CLEAR_LOGIN_ERRORS:
            return {
                ...state,
                loginErrors: []
            }
        case CLEAR_REGISTER_ERRORS:
            return {
                ...state,
                registerErrors: []
            }
        case START_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case VERIFY_ID:
            return {
                ...state,
                isLoggedIn: payload,
                loading: false,
            }
        default:
            return state
    }
}