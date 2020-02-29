import {
    SELECT_CELL,
    SELECT_COLOR,
    SAVE_ANSWEAR_KEY,
    TOGGLE_SHOW_ANSWEAR_KEY,
    CLEAR_SELECTED_CELLS,
    SAVE_SCORE,
    SWITCH_GRID_COMPONENT,
    INC_LEVEL,
    INC_GRID_SIZE,
    GAME_OVER,
    RESTART_GRID_TEST,
    CLEAR_GRID_GAME,
    TOGGLE_CLICKING_CELLS_DISABLED,
    SET_GRID_COUNTDOWN,
    DEC_GRID_COUNTDOWN,
    TOGGLE_SHOW_GRID_COUNTDOWN,
    RESET_COUNT_DOWN,
    CLEAR_GAME_ALERTS,
    SET_GAME_ALERT,
    TOGGLE_ALERT_IS_FADING,
    REMOVE_ALERT,
    SET_MIN_PASSING_SCORE
} from '../actions/types'

const initialState = {
    gridSize: 3,
    scores: [],
    level: 0,
    gridCounter: 0,
    minPassingScore: 3,
    showGridCounter: false,
    displayingPattern: false,
    currentComponent: 'intro',
    colorPicker: 'gray',
    clickingCellsDisabled: false,
    answearKey: ['gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
    selectedCells: ['gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
    timer: 5,
    currentGameAlert: 'start-game',
    alertIsFading: true,
    removeAlert: false,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    
    switch(type) {
        case TOGGLE_CLICKING_CELLS_DISABLED:
            return {
                ...state,
                clickingCellsDisabled: !state.clickingCellsDisabled
            }
        case SWITCH_GRID_COMPONENT:
            return {
            ...state,
            currentComponent: payload
            }
        case SELECT_CELL:
            return {
                ...state,
                selectedCells: [
                    ...state.selectedCells.slice(0, payload),
                    state.colorPicker,
                    ...state.selectedCells.slice(payload + 1, state.selectedCells.length)
                ]
            }
        case SELECT_COLOR:
            return {
                ...state,
                colorPicker: payload
            }
        case SAVE_ANSWEAR_KEY:
            return {
                ...state,
                answearKey: payload
            }
        case TOGGLE_SHOW_ANSWEAR_KEY:
            return {
                ...state,
                displayingPattern: !state.displayingPattern
            }
        case CLEAR_SELECTED_CELLS:
            return {
                ...state,
                selectedCells: payload
            }
        case INC_LEVEL:
            return {
                ...state,
                level: state.level + 1
            }
        case INC_GRID_SIZE:
            return {
                ...state,
                gridSize: state.gridSize + 1
            }
        case SET_GRID_COUNTDOWN:
            return {
                ...state,
                gridCounter: payload
            }
        case DEC_GRID_COUNTDOWN:
            return {
                ...state,
                timer: state.timer - 1
            }
        case RESET_COUNT_DOWN:
            return {
                ...state,
                timer: payload
            }
        case TOGGLE_SHOW_GRID_COUNTDOWN:
            return {
                ...state,
                showGridCounter: !state.showGridCounter
            }
        case TOGGLE_ALERT_IS_FADING:
            return {
                ...state,
                alertIsFading: !payload.alertIsFading
            }
        case GAME_OVER:
            return {
                ...state,
                currentComponent: 'gameover'
            }
        case SAVE_SCORE:
            return {
                ...state,
                scores: [...state.scores, payload]
            }
        case CLEAR_GAME_ALERTS:
            return {
                ...state,
                currentGameAlert: ''
            }
        case SET_GAME_ALERT:
            return {
                ...state,
                currentGameAlert: payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                removeAlert: !payload.removeAlert
            }
        case SET_MIN_PASSING_SCORE:
            return {
                ...state,
                minPassingScore: payload
            }
        case RESTART_GRID_TEST:
        case CLEAR_GRID_GAME:
            return initialState
        default:
            return state
        }
    }