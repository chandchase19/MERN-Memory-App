import React, {Fragment, useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, clearAuthErrors } from '../actions/auth'

const Login = ({ auth, login }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    const { email, password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        login(email, password)
    }

    if (localStorage.getItem('auth-id')) {
        return <Redirect to='/' />
    }

    return (
        <div className="auth-form">
    
            <h1>Sign in to view profile</h1>
            
            <form onSubmit={e => onSubmit(e)}>
                <input
                    type="email"
                    placeholder="Email Address..."
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                    /> <br />
                <input 
                    type="password"
                    placeholder="Password..."
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange(e)}
                    /> <br />
                <input
                    type="submit"
                    value="Login"
                    />
            </form>

            {
                auth.loginErrors.map(msg => (
                    <p className="user-error">
                        *{msg}
                    </p>
                ))
            }

            <p>Don't have an account? <Link className="link" to="/register">Create Account</Link>
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { login, clearAuthErrors })(Login)