import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { gradeInput, startNextLevel } from '../../../actions/gridGame';

const GridGameButtons = ({ gridGame, gradeInput, startNextLevel }) => {

    const displayingPattern = gridGame.displayingPattern || gridGame.currentComponent === 'intro'
    const userIsTesting = !gridGame.displayingPattern && gridGame.currentComponent === 'cells'
    const levelPassed = gridGame.currentComponent === 'betweenlevels'

    const submitHandler = (e) => {
        gradeInput(gridGame.selectedCells, gridGame.answearKey, gridGame.level)
    }
    
    const nextLevelHandler = (e) => {
        startNextLevel(gridGame.gridSize, gridGame.level)
    }


    return (
        <div className='game-nav-buttons-wrapper'>
            {displayingPattern &&
                <Fragment>
                    <div className='fade-in-btn'>Lvl:{gridGame.level || '1'}</div>

                    <div className='fade-in-btn'>
                        <FontAwesomeIcon icon={faClock}/>
                        <span id='game-countdown'>{gridGame.timer}</span>
                    </div>
                </Fragment>
            }

            {userIsTesting && 
                <div onClick={submitHandler} id='score-btn' className='fade-in-btn'>
                    Grade <FontAwesomeIcon icon={faArrowCircleRight}/>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    gridGame: state.gridGame
})

export default connect(mapStateToProps, { gradeInput, startNextLevel })(GridGameButtons)