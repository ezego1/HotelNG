const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route GET /api/users
// @desc GET ALL USERS
// @access Private
router.get('/', auth, (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then((user) => res.json(user))
})

// @route   POST /api/users
// @desc    CREATE A USER
// @access  Public
router.post('/', (req, res) => {
    const {
        firstName,
        lastName,
        userName,
        password,
        phone,
        email,
        role,
    } = req.body

    if (
        !firstName ||
        !lastName ||
        !userName ||
        !password ||
        !email ||
        !phone ||
        !role
    ) {
        res.status(400).json({ msg: 'Please all field is required!' })
    }

    User.findOne({ email }).then((user) => {
        if (user) return res.status(400).json({ msg: 'User already exist' })

        const newUser = new User({
            firstName,
            lastName,
            userName,
            password,
            phone,
            email,
            role,
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash
                newUser.save().then((user) => {
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
                                    userName: userName,
                                    email: email,
                                },
                            })
                        }
                    )
                })
            })
        })
    })
})

// @route   DELETE /api/users/:id
// @desc    DELETE A USER
// @access Private
router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then((user) => user.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }))
})

module.exports = router
