import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getGames } from '../../../actions/profile'

const HistoryNav = ({ profile, getGames }) => {
    
    const [sortMenuIsActive, setSortMenuIsActive] = useState(false)
    
    const sortMenuOpts = (sortMenuIsActive ? 'show' : 'hide') + '-sort-opts'

    const sortHandler = (filter) => {
        setSortMenuIsActive(false)
        getGames(filter)
    }
    
    return (
        <div>
            <div id={sortMenuOpts} className='sort-flex'>
                <button onClick={() => setSortMenuIsActive(!sortMenuIsActive)} id='sort-by-btn'>
                    Sort by:<span>{profile.sortGamesBy}</span>
                </button>

                <button onClick={() => sortHandler('Recent')}>
                    Recent
                </button>

                <button onClick={() => sortHandler('Grid Game')}>
                    Grid Game
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getGames })(HistoryNav)