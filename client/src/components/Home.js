import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/auth'

const isLoggedIn = localStorage.getItem('auth-id')

//change to real username
let guestName
let loginStatusMsg

if (isLoggedIn) {
  guestName = 'user'
  loginStatusMsg = 'logged in'
} else {
  guestName = 'guest'
  loginStatusMsg = 'not logged in'
}

const Home = ({ logout }) => {
  return (
    <div id='home'>
      <h1>Test your memory</h1>

        <p>Welcome {guestName}! You are {loginStatusMsg}</p>

        { isLoggedIn ?
          <p>You can now <Link to="/games">select a game</Link> or <Link to="/myProfile">view past scores</Link>.</p>
          :
          <p><Link to="/login">Sign in</Link> or <Link to="/register">Create account</Link> to save your scores.</p>
        }

        <Link to='/games' className='play-btn'>Play</Link>
    </div>
  )
}

export default connect(null, { logout })(Home)
