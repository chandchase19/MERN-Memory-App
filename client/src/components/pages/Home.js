import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth'

const isLoggedIn = localStorage.getItem('auth-id')

//change to real username
let gamesLinkMsg
let loginStatusMsg

if (isLoggedIn) {
  loginStatusMsg = 'You are logged in.'
  gamesLinkMsg = 'Play'
} else {
  loginStatusMsg = 'You are not logged in.'
  gamesLinkMsg = 'Continue as guest '
}

const Home = ({ logout }) => {
  return (
    <div id='home'>
      <h1>Test your memory</h1>

        <p>{loginStatusMsg}</p>

        { isLoggedIn ?
          <p>You can now <Link to="/games">select a game</Link> or <Link to="/myProfile">view past scores</Link>.</p>
          :
          <p><Link to="/login">Sign in</Link> or <Link to="/register">Create account</Link> to save your scores.</p>
        }

        <Link to='/games' className='play-btn'><span className='txt-md-screen'>{gamesLinkMsg}</span><span className='txt-xs-screen'>Play</span></Link>
    </div>
  )
}

export default connect(null, { logout })(Home)
