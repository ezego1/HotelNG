const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route POST /api/auth
// @desc  Authenticate user
// @access Public
router.post('/', (req, res) => {
    const { password, email } = req.body

    if (!email || !password)
        return res.status(400).json({ msg: 'Please all field is required!' })

    User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json({ msg: 'User does not exist!' })

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res.status(400).json({ msg: 'Wrong password or email' })

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err

                    res.status(200).json({
                        token,
                        user: {
                            id: user.id,
                            userName: user.userName,
                            email: user.email,
                        },
                    })
                }
            )
        })
    })
})

// @route GET /api/auth/user
// @desc  Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then((user) => res.json(user))
})

module.exports = router
