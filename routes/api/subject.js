const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/Subject')

// @route GET /api/subject
// @desc GET ALL Subject
// @access Private
router.get('/', auth, (req, res) => {
    Subject.find()
        .sort({ date: -1 })
        .then((subjects) => res.json(subjects))
})

// @route   POST /api/subject
// @desc    CREATE A Subject
// @access  Private
router.post('/', auth, (req, res) => {
    const { name } = req.body
    const newSubject = new Subject({
        name,
    })

    newSubject.save().then((subject) => res.json(subject))
})

// @route   DELETE /api/subject/:id
// @desc    DELETE A Subject
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Subject.findById(req.params.id)
        .then((user) => user.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }))
})

module.exports = router
