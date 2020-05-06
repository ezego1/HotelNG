const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema

const SubjectSchema = new Schema({
    Name: {
        type: String,
        require: true,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Subject = mongoose.model("subject", SubjectSchema);
