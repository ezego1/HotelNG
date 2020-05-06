const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    emil: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model("User", UserSchema);
