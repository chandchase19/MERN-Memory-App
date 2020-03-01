import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { verifyId } from '../../../actions/auth'
import UserHistory from './UserHistory'
import GuestHistory from './GuestHistory'
import Loading from '../../Loading'
import profile from '../../../reducers/profile'


const History = ({ verifyId, auth }) => {
    useEffect(() => {
        verifyId(localStorage.getItem('auth-id'))
    }, [])

    const userId = (localStorage.getItem('auth-id'))

    return (
        <div id ='profile'>
            {userId ?
                <UserHistory />
                :
                <GuestHistory />
            }
        </div>
    )
        
}
    
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { verifyId })(History)