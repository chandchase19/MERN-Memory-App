import axios from 'axios'

import {
    CLEAR_PROFILE,
    LOGIN,
    LOGOUT,
    ADD_LOGIN_ERROR,
    ADD_REGISTER_ERROR,
    CLEAR_REGISTER_ERRORS,
    CLEAR_LOGIN_ERRORS
} from './types'

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

    } catch (err) {
        dispatch(addAuthErrors('login', err.response.data.errors))
        console.log('dipsatching ADD error..', err.response.data.errors)
        console.log('login error')
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