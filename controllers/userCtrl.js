const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payments = require('../models/paymentModel')

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await Users.findOne({ email })

            if (user)
                return res.status(400).json({ msg: "The email already exists" })
            if (password.length < 6)
                return res.status(400).json({ msg: "Password is at least 6 characters long" })

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // Save mongodb
            await newUser.save()

            // The create jsonwebtoken to authentication
            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })

            res.json({ accessToken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user)
                return res.status(400).json({ msg: "User does not exist" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ msg: "Incorrect password" })

            // If login success, create access token and refresh token
            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })

            res.json({ accessToken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshToken
            if (!rf_token) {
                return res.status(400).json({ msg: "Please Login or Register" })
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.status(400).json({ msg: "Please Login or Register" })
                }

                const accessToken = createAccessToken({ id: user.id })
                res.json({ accessToken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user)
                return res.status(400).json({ msg: "User does not exist" })

            res.json(user)
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist" })
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })
            return res.json({ msg: "Added to cart" })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    history: async (req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id })
            res.json(history)
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}

const createRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = userCtrl