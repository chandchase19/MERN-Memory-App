import { combineReducers } from 'redux'
import auth from './auth'
import gridGame from './gridGame'
import profile from './profile'

export default combineReducers({
    auth,
    gridGame,
    profile
})