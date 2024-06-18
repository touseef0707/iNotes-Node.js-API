const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// User Model
const User = mongoose.model('user', UserSchema);
module.exports = User;