import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import GameAlerts from './GameAlerts'
import ColorSelector from './ColorSelector'
import GridGameButtons from './GridGameButtons'
import Cells from './Cells'

const GridGame = ({ gridGame }) => {
    return (
        <div>
            {(gridGame.currentGameAlert) && <GameAlerts currentGameAlert={gridGame.currentGameAlert} />}
            {/* {true && <GameAlerts currentGameAlert={gridGame.currentGameAlert} />} */}

            <div id='game-wrapper2'>                

                <Cells />

                <ColorSelector />

                <GridGameButtons />

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    gridGame: state.gridGame
})

export default connect(mapStateToProps, { })(GridGame)