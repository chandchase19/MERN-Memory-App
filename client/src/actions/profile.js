import axios from 'axios'
import {
    GET_GAMES,
    SORT_GAME_HISTORY,
    CLEAR_GUEST_GAMES,
    GET_GAMES_LOADING_STATUS
} from './types'

export const getGames = (authId, sortByTitle = 'Recent') => async dispatch => {

    dispatch({
        type: GET_GAMES_LOADING_STATUS,
        payload: true
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({userId: authId})

    try {
        const res = await axios.post('/api/games/all', body, config)

        let fullGameHistory = Array.from(res.data)

        if (!fullGameHistory) {
            return null             
        }

        if (sortByTitle === 'Recent') {
            dispatch({
                type: GET_GAMES,
                payload: fullGameHistory
            })
        } else {
            const sortedGameHistory = []
            
            fullGameHistory.map(gameInfo => {
                if (gameInfo.title === sortByTitle) {
                    sortedGameHistory.push(gameInfo)
                }
            })

            let payload = { 
                sortByTitle,
                sortedGameHistory
            }

            console.log(payload)
        
            dispatch({
                type: GET_GAMES,
                payload: sortedGameHistory
            })

            dispatch(editSortByTitle)
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const editSortByTitle = (sortByTitle) => dispatch => {
    dispatch({
        type: SORT_GAME_HISTORY,
        payload: {
            sortByTitle
        }
    })
}

export const clearGuestGames = () => dispatch => {
    dispatch({
        type: CLEAR_GUEST_GAMES
    })
}
