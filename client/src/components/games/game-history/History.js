import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getGames } from '../../../actions/profile'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import Loading from '../../Loading'


const MyProfile = ({ profile, getGames }) => {
    useEffect(() => {
        getGames()
    }, [])
    
    const [sortMenuIsActive, setSortMenuIsActive] = useState(false)
    
    const sortMenuOpts = (sortMenuIsActive ? 'show' : 'hide') + '-sort-opts'
    
    const isLoggedIn = localStorage.getItem('auth-id')
    if (!isLoggedIn)
        return <Redirect to='/login' />


    const sortHandler = (filter) => {
        setSortMenuIsActive(false)
        getGames(filter)
    }
    

    return (
        <div id='profile'>
            <h1>Game History</h1>

            { profile.loading ?
                <Loading />
                :
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

                    <div id='game-history'>
                        {profile.allGames && profile.allGames.map(game => (
                            <div className="game-history-item">
                                <p>{game.title}</p>
                                <p>{moment(game.date).format('MM/DD/YYYY')}</p>
                                <p>{game.score}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
    
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getGames })(MyProfile)