import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearGridGame } from '../../actions/gridGame';

const Games = ({ clearGridGame }) => {

    return (
        <div id='display-games'>
            <h1>Memory Tests</h1>

            <div>
                <h2>Grid Game:</h2>

                <p>Redraw the pattern with the correct colors to score points. Redraw the pattern with the correct colors.</p>

                <Link to='/games/grid-game' className='play-btn' onClick={() => clearGridGame()}>Play</Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    gridGame: state.gridGame
})

export default connect(mapStateToProps, { clearGridGame })(Games)
