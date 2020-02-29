import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { getGames } from '../../../actions/profile'
import Loading from '../../Loading'
import HistoryNav from './HistoryNav'


const GuestGames = ({profile, getGames}) => {

    let showHistoryNav = true
    let showNoGamesAlert = true

    if (!profile.guestGames.length) {
        showHistoryNav = false
        
        if (profile.loading) {
            showNoGamesAlert = false
        }
    }

    return (
        <div id='profile'>
            <h1>Guest Games</h1>

            {showHistoryNav && <HistoryNav />}
            {profile.loading && <Loading />}

                <div id='game-history'>
                    {profile.guestGames && profile.guestGames.map(game => (
                        <div className="game-history-item">
                            <p>{game.title}</p>
                            <p>{moment(game.date).format('MM/DD/YYYY')}</p>
                            <p>{game.score}</p>
                        </div>
                    ))}
                </div>

                {showNoGamesAlert &&
                    <div>
                        <p id='no-games'>No guest games played. <Link to="/login">Sign in </Link>or <Link to="/register">Create account </Link>to save your scores.</p>

                        <Link to='/games' className='play-btn'>Go to games</Link>
                    </div>
                }
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getGames })(GuestGames)