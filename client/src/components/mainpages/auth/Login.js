import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './_login.scss'

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })
            localStorage.setItem('firstLogin', true)
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input onChange={onChangeInput} type="email" name="email" required placeholder="Email" value={user.email} />
                <input onChange={onChangeInput} type="password" name="password" required placeholder="Password" value={user.password} />
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
