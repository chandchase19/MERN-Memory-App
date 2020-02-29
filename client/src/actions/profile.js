import axios from 'axios'
import {
    GET_GAMES,
    SORT_GAME_HISTORY
} from './types'

export const getGames = (sortByTitle = 'Recent') => async dispatch => {
    const userId = localStorage.getItem('auth-id')
    if(!userId) return null
   
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({userId})

    try {
        const res = await axios.post('/api/games/all', body, config)
        const fullGameHistory = Array.from(res.data)

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

            //ineffecient
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
