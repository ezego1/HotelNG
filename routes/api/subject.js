const express = require("express");
const router = express.Router();

const User = require("../../models/Subject");

// @route GET /api/users
// @desc GET ALL USERS
// @access PUBLIC
router.get("/", (req, res) => {
    Subject.find()
        .sort({ date: -1 })
        .then((subjects) => res.json(subjects));
});

// @route   POST /api/users
// @desc    CREATE A USER
// @access  PUBLIC
router.post("/", (req, res) => {
    const { name } = req.body;
    const newSubject = new Subject({
        name,
    });

    newSubject.save().then((subject) => res.json(subject));
});

// // @route   DELETE /api/users/:id
// // @desc    DELETE A USER
// // @access PUBLIC
// router.delete("/:id", (req, res) => {
//     User.findById(req.params.id)
//         .then((user) => user.remove().then(() => res.json({ success: true })))
//         .catch((err) => res.status(404).json({ success: false }));
// });

// // @route GET /api/users
// // @desc GET ALL USERS
// // @access PUBLIC
// router.get("/", (req, res) => {
//     User.find()
//         .sort({ date: -1 })
//         .then((user) => res.json(user));
// });

module.exports = router;
