import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getGames } from '../../../actions/profile'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import Loading from '../../Loading'

import UserHistory from './UserHistory'
import GuestGames from './GuestGames'


const MyProfile = ({ profile, getGames }) => {
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
                    <GuestGames />
                }
            </div>
        </div>
    )
}
    
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getGames })(MyProfile)