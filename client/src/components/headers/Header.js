import React, { useContext } from 'react'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import './_header.scss'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Products</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/">Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width={30} />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">Mern Shop</Link>
                </h1>
            </div>
            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login ✥ Register</Link></li>
                <li>
                    <img src={Close} alt="" width={30} />
                </li>
            </ul>
            <div className="cart-icon">
                <span>0</span>
                <Link to="/cart">
                    <img src={Cart} alt="" width={30} />
                </Link>
            </div>
        </header>
    )
}

export default Header
