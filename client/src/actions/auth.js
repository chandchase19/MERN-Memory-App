import axios from 'axios'

import {
    CLEAR_PROFILE,
    LOGIN,
    LOGOUT,
    ADD_LOGIN_ERROR,
    ADD_REGISTER_ERROR,
    CLEAR_REGISTER_ERRORS,
    CLEAR_LOGIN_ERRORS,
    VERIFY_ID,
    START_AUTH_LOADING
} from './types'
import { clearGuestGames } from './profile'

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('/api/users/login', body, config)

        console.log('login success')
        console.log(res.data)

        localStorage.setItem('auth-id', res.data.authId)

        dispatch({
            type: LOGIN,
            payload: res.data
        })

        dispatch(clearGuestGames())

    } catch (err) {
        dispatch(addAuthErrors('login', err.response.data.errors))
        console.log('dipsatching ADD error..', err.response.data.errors)
        console.log('login error')
    }
}

export const verifyId = (authId) => async dispatch => {
    if (!authId) {
        return dispatch({
            type: VERIFY_ID,
            payload: false
        })
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({authId})

    try {
        console.log(authId)

        console.log(body)

        const res = await axios.post('/api/users/verify-id', body, config)

        console.log(res.data)

        dispatch({
            type: VERIFY_ID,
            payload: res.data.idIsValid
        })
        
    } catch (err) {
        console.log(err.response.data.idIsValid)

        dispatch({
            type: VERIFY_ID,
            payload: err.response.data.idIsValid
        })
    }
}

export const logout = () => async dispatch => {
    console.log('logging out')
    localStorage.removeItem('auth-id')

    dispatch({
        type: CLEAR_PROFILE
    })

    dispatch({
        type: LOGOUT
    })
}

export const register = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('/api/users/register', body, config)

        console.log('register success')
        console.log(res.data)

        localStorage.setItem('auth-id', res.data.authId)

        dispatch({
            type: LOGIN,
            payload: res.data
        })

    } catch (err) {
        console.log('register fail')
        dispatch(addAuthErrors('register', err.response.data.errors))
    }

}

export const clearAuthErrors = (component) => dispatch => {
    if(component === 'register') {
        dispatch({
            type: CLEAR_REGISTER_ERRORS
        })
    } else if (component === 'login') {
        dispatch({
            type: CLEAR_LOGIN_ERRORS
        })
    }
}


export const addAuthErrors = (component, errors) => async dispatch => {
    setTimeout(() => {
        if(component === 'register') {
            dispatch({
                type: CLEAR_REGISTER_ERRORS
            })
        } else if (component === 'login') {
            dispatch({
                type: CLEAR_LOGIN_ERRORS
            })
        }
    }, 5000)
    
    if(component === 'register') {
        dispatch({
            type: ADD_REGISTER_ERROR,
            payload: errors
        })
    } else if (component === 'login') {
        dispatch({
            type: ADD_LOGIN_ERROR,
            payload: errors
        })
    }
}