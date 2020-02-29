import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Loading from '../../Loading'
import HistoryNav from './HistoryNav'

const UserHistory = ({ profile }) => {

    let showHistoryNav = true
    let showNoGamesAlert = true

    if (!profile.allGames.length) {
        showHistoryNav = false
        
        if (profile.loading) {
            showNoGamesAlert = false
        }
    }

    return (
        <div id='profile'>
            <h1>Game History</h1>

                {showHistoryNav && <HistoryNav />}
                {profile.loading && <Loading />}
                    
                <div id='game-history'>
                    {profile.allGames && profile.allGames.map(game => (
                        <div className="game-history-item">
                            <p>{game.title}</p>
                            <p>{moment(game.date).format('MM/DD/YYYY')}</p>
                            <p>{game.score}</p>
                        </div>
                    ))}
                </div>

                {showNoGamesAlert &&
                    <div>
                        <p id='no-games'>No games played. Choose a game and save your score.</p>
                        <Link to='/games' className='play-btn'>Play</Link>
                    </div>
                }

        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { })(UserHistory)