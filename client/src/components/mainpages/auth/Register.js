import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './_login.scss'

function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { ...user })
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input onChange={onChangeInput} type="text" name="name" required placeholder="Name" value={user.name} />
                <input onChange={onChangeInput} type="email" name="email" required placeholder="Email" value={user.email} />
                <input onChange={onChangeInput} type="password" name="password" required placeholder="Password" value={user.password} />
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
