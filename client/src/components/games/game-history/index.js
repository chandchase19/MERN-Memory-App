import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getGames } from '../../../actions/profile'
import UserHistory from './UserHistory'
import GuestHistory from './GuestHistory'


const History = ({ getGames }) => {
    useEffect(() => {
        getGames()
    }, [])
    
    const isLoggedIn = localStorage.getItem('auth-id')

    return (
        <div id='profile'>
            <div>
                { isLoggedIn ?
                    <UserHistory />
                    :
                    <GuestHistory />
                }
            </div>
        </div>
    )
}
    
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getGames })(History)