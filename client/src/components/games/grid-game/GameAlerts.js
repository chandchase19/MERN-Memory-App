import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startNextLevel, restartGridTest, clearAlerts } from '../../../actions/gridGame';
import WarningIcon from '@material-ui/icons/Warning'

export const GameAlerts = ({ gridGame, startNextLevel, restartGridTest, clearAlerts }) => {
    
    const [fadeAlertOut, setFadeAlertOut] = useState(false)

    const nextLevelHandler = (e) => {
        clearAlerts()
        setFadeAlertOut(true)
        startNextLevel(gridGame.gridSize, gridGame.level)
    }

    const restartTestHandler= (e) => {
        restartGridTest()
    }

    let currentScore
    let gameLevel

    if (!fadeAlertOut) {
        currentScore = gridGame.scores[gridGame.level - 1] + '/' + gridGame.gridSize*gridGame.gridSize
    
        gameLevel = gridGame.level + 1
    } else {
        currentScore = gridGame.scores[gridGame.level - 2] + '/' + (gridGame.gridSize - 1)*(gridGame.gridSize - 1)
    
        gameLevel = gridGame.level
    }
    return (
        <div id={fadeAlertOut ? 'fade-alert-out' : 'fade-alert-in'} className='game-alerts'>
            {(() => {
                if (gridGame.currentGameAlert === 'start-game') {
                    return (
                        <div>
                            <h1>Start Grid Game</h1>
                            <h3>Instructions:</h3>
                            <p>A pattern of colors will show on the grid. Memorize the pattern, then use the color selector <span className='screen-lg'>on the right</span> or (small screens) <span className='screen-sm'>down below</span> to fill as many sqaures as you can.</p>

                            <h3>Level 1:<br />Need {gridGame.minPassingScore} to pass</h3>

                            <button onClick={nextLevelHandler}>
                                Start
                            </button>
                        </div>
                    )
                } else if (gridGame.currentGameAlert === 'gameover') {
                    return (
                        <div>
                            <h1>Gameover</h1>
                            <h3>Score: {currentScore}</h3>
                            <h3>Reached: Level {gameLevel - 1}</h3>
                            <p>Your score has been saved! You can view your game history on your profile.</p>
                            <button onClick={restartTestHandler}><Link to='/myProfile'>View past games</Link></button>
                            <button onClick={restartTestHandler}>Restart Test</button>
                        </div>
                    )
                } else if (gridGame.currentComponent === 'betweenlevels') {
                    return (
                        <div>
                            <h1>Passed level!</h1>
                            <h3>Score: {currentScore}</h3>
                            <h3>Next Level: {gameLevel}:<br />Need {gridGame.minPassingScore} to pass</h3>
                            <button onClick={nextLevelHandler}>Next Level</button>
                        </div>
                    )
                }
            })()}

        </div>
    )
}

const mapStateToProps = state => ({
    gridGame: state.gridGame
})

export default connect(mapStateToProps, { startNextLevel, restartGridTest, clearAlerts })(GameAlerts)