import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getGames } from '../../../actions/profile'
import { verifyId } from '../../../actions/auth'
import UserHistory from './UserHistory'
import GuestHistory from './GuestHistory'


const History = ({ getGames, verifyId, auth }) => {
    useEffect(() => {
        verifyId(localStorage.getItem('auth-id'))
        getGames()
    }, [])
    
    return (
        <div id='profile'>
            { auth.isLoggedIn ?
                <UserHistory />
                :
                <GuestHistory />
            }
        </div>
    )
}
    
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getGames, verifyId })(History)