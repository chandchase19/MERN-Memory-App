import {
    LOGIN,
    LOGOUT,
    ADD_LOGIN_ERROR,
    ADD_REGISTER_ERROR,
    CLEAR_LOGIN_ERRORS,
    CLEAR_REGISTER_ERRORS,
    VERIFY_ID,
} from '../actions/types'

const intitalState = {
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
                loggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                authId: null
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
        case VERIFY_ID:
            return {
                ...state,
                isLoggedIn: payload
            }
        default:
            return state
    }
}