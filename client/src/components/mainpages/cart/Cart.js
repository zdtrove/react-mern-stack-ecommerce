import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import './_cart.scss'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
    const [token] = state.token
    const [callback, setCallback] = state.userAPI.callback

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const increment = id => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const decrement = id => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, i) => {
                if (item._id === id) {
                    cart.splice(i, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async payment => {
        const { paymentID, address } = payment
        await axios.post('/api/payment', { cart, paymentID, address }, {
            headers: { Authorization: token }
        })
        setCart([])
        addToCart([])
        alert("You have successfully placed an order")
        setCallback(!callback)
    }

    if (cart.length === 0) {
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    }

    return (
        <div>
            {cart.map((product, i) => {
                const { _id, images: { url }, title, price, description, content, quantity } = product
                return <div key={i} className="detail cart">
                    <img src={url} alt="" />
                    <div className="box-detail">
                        <h2>{title}</h2>
                        <h3>$ {price * quantity}</h3>
                        <p>{description}</p>
                        <p>{content}</p>
                        <div className="amount">
                            <button onClick={() => decrement(_id)}> - </button>
                            <span>{quantity}</span>
                            <button onClick={() => increment(_id)}> + </button>
                        </div>
                        <div onClick={() => removeProduct(_id)} className="delete">X</div>
                    </div>
                </div>
            })}
            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton total={total} tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Cart
