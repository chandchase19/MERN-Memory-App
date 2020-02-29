import {
    SELECT_CELL,
    SELECT_COLOR,
    CLEAR_SELECTED_CELLS,
    INC_LEVEL,
    TOGGLE_CLICKING_CELLS_DISABLED,
    INC_GRID_SIZE,
    TOGGLE_SHOW_ANSWEAR_KEY,
    SAVE_ANSWEAR_KEY,
    SWITCH_GRID_COMPONENT,
    SAVE_SCORE,
    RESTART_GRID_TEST,
    SET_GRID_COUNTDOWN,
    DEC_GRID_COUNTDOWN,
    TOGGLE_SHOW_GRID_COUNTDOWN,
    CLEAR_GAME_ALERTS,
    SET_GAME_ALERT,
    RESET_COUNT_DOWN,
    TOGGLE_ALERT_IS_FADING,
    REMOVE_ALERT,
    SET_MIN_PASSING_SCORE,
    ADD_GUEST_GAME
} from './types'
import axios from 'axios'

export const selectCell = (cellIndex) => dispatch => {
    console.log('selectCell action index:',  cellIndex)
    dispatch({
        type: SELECT_CELL,
        payload: cellIndex
    })
}

export const selectColor = (color) => dispatch => {
    console.log('selectColor action index:',  color)
    dispatch({
        type: SELECT_COLOR,
        payload: color
    })
}

export const restartGridTest = () => dispatch => {
    dispatch({
        type: RESTART_GRID_TEST
    })
}

export const clearGridGame = () => dispatch => {
    dispatch({
        type: RESTART_GRID_TEST
    })
}
export const startNextLevel = (currentGridSize, level) => dispatch => {
    
    dispatch({
        type: INC_LEVEL
    })
    
    const nextLevel = level + 1
    
    let gridSize = currentGridSize
    
    if (level > 0) {
        gridSize += 1
        
        dispatch({
            type: INC_GRID_SIZE
        })
    }
    
    const emptyGrid = []
    
    const ansKey = []
    
    for(let i = 0; i < gridSize*gridSize; i++) {
        const rndNum = Math.floor(Math.random() * 3)
        
        emptyGrid.push('gray')
        
        if(rndNum === 0) {
            ansKey.push('red')
        } else if (rndNum === 1) {
            ansKey.push('green')
        } else {
            ansKey.push('blue')
        }
    }
    
    dispatch({
        type: SAVE_ANSWEAR_KEY,
        payload: ansKey
    })
    
    // dispatch({
    //     type: CLEAR_GAME_ALERTS
    // })
    
    dispatch({
        type: TOGGLE_CLICKING_CELLS_DISABLED
    })
    
    
    
    setTimeout(() => {
        
        dispatch({
            type: TOGGLE_CLICKING_CELLS_DISABLED
        })
        
        dispatch({
            type: TOGGLE_SHOW_ANSWEAR_KEY
        })
        dispatch({
            type: SWITCH_GRID_COMPONENT,
            payload: 'cells'
        })
    }, 5)
    
    const interval = setInterval(()=> {
        dispatch({
            type: DEC_GRID_COUNTDOWN
        })
    }, 1000)
    
    setTimeout(() => {
        dispatch({
            type: TOGGLE_SHOW_ANSWEAR_KEY
        })
        dispatch({
            type: CLEAR_SELECTED_CELLS,
            payload: emptyGrid
        })
        dispatch({
            type: RESET_COUNT_DOWN,
            payload: 5
        })
        clearInterval(interval)
    }, 5000)
    
}

export const gridCountdown = (numStart) => dispatch => {
    
    dispatch({
        type: TOGGLE_SHOW_GRID_COUNTDOWN
    })
    
    dispatch({
        type: SET_GRID_COUNTDOWN,
        payload: numStart
    })
    
    const interval = setInterval(() => {
        dispatch({
            type: DEC_GRID_COUNTDOWN,
            payload: 1
        })
    }, 1000)
    
    setTimeout(() => {
        
        dispatch({
            type: TOGGLE_SHOW_GRID_COUNTDOWN
        })
        
        clearInterval(interval)
    }, numStart*1000)
}

export const gradeInput = (selectedCells, answearKey, currentLevel) => async dispatch => {

    const userId = localStorage.getItem('auth-id')
    
    let score = 0
    const clearGridArr = []
    
    for (let i = 0; i < answearKey.length; i++) {
        
        clearGridArr.push('gray')
        
        if (selectedCells[i] === answearKey[i]) {
            score += 1
        }
    }
    
    dispatch({
        type: SAVE_SCORE,
        payload: score
    })

    let minPassingScore = getMinPassingScore(currentLevel, Math.round(answearKey.length/2))

    //gameover
    if (score < minPassingScore) {
        if (userId) {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            const payload = {
                title: 'Grid Game',
                score: currentLevel,
                date: Date.now(),
                userId
            }
            
            const res = await axios.post('/api/games', payload, config)
            
        } else {
            const payload = {
                title: 'Grid Game',
                score: currentLevel,
                date: Date.now()
            }

            dispatch({
                type: ADD_GUEST_GAME,
                payload
            })
        }

        dispatch({
            type: SET_MIN_PASSING_SCORE,
            payload: getMinPassingScore(currentLevel, Math.round(answearKey.length/2))
        })

        
    
        dispatch({
            type: SET_GAME_ALERT,
            payload: 'gameover'
        })
        
    //level passed
    } else {
        dispatch({
            type: CLEAR_SELECTED_CELLS,
            payload: clearGridArr
        })

        dispatch({
            type: SET_MIN_PASSING_SCORE,
            payload: getMinPassingScore(currentLevel + 1, Math.round(answearKey.length/2))
        })    
        
        dispatch({
            type: SWITCH_GRID_COMPONENT,
            payload: 'betweenlevels'
        })

        dispatch({
            type: SET_GAME_ALERT,
            payload: 'betweenlevels'
        })
    }
}

export const toggleAlertIsFading = () => dispatch => {
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: {
                removeAlert: true
            }
        })
    }, 2000)
}

export const clearAlerts = () => dispatch => {
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: {
                removeAlert: false
            }
        })

        dispatch({
            type: CLEAR_GAME_ALERTS
        })

    }, 2000)

    dispatch({
        type: REMOVE_ALERT,
        payload: {
            removeAlert: true
        }
    })
}

const getMinPassingScore = (level, gridCellCount) => {
    let minPassingScore

    if (level === 1) {
        minPassingScore = 3
    } else if (level === 2) {
        minPassingScore = 6
    } else {
        minPassingScore = Math.round(gridCellCount)/2
    }

    return minPassingScore
}