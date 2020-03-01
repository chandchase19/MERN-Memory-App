import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { getGames } from '../../../actions/profile'
import Loading from '../../Loading'
import HistoryNav from './HistoryNav'


const GuestHistory = ({profile, getGames}) => {

    let showHistoryNav = false
    let showNoGamesAlert = false

    if (!profile.loading) {
        if (profile.guestGames.length > 0) {
            showHistoryNav = true
        } else {
            showNoGamesAlert = true
        }
    }

    return (
        <div id='game-history-wrapper'>
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

                        <Link to='/games' className='play-btn'><span className='txt-xs-screen'>Play</span><span className='txt-md-screen'>Go to games</span></Link>
                    </div>
                }
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getGames })(GuestHistory)