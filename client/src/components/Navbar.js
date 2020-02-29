import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ auth, logout }) => {
    const isLoggedIn = localStorage.getItem('auth-id')

    return (
        <div className='navbar'>

            <Link className="navbar-item" to="/">Home</Link>
            <Link to="/games" className="navbar-item">Games</Link>
            <Link to="/myProfile" className="navbar-item">History</Link>
            {isLoggedIn ? 
                <Link onClick={logout} className="navbar-item" to="/#!">Logout</Link>
                    :
                <Link to="/login" className="navbar-item">Login</Link>
            }

            <div className='dropdown-bar'>

                <div
                className="dropdown-icon">
                    <div className="ham-icon">
                        <FontAwesomeIcon icon={faBars} /> 
                    </div>
                </div>

                <div className='dropdown'>

                    <Link className="dropdown-item" to="/">Home</Link>

                    <Link to="/games" className="dropdown-item">Games</Link>

                    <Link to="/myProfile" className="dropdown-item">Profile</Link>
                    {isLoggedIn ? 
                        <Link onClick={logout} className="dropdown-item" to="/#!">Logout</Link>
                            :
                        <Link to="/login" className="dropdown-item">Login</Link>
                    }
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)