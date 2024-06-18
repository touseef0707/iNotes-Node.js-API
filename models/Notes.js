const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user: {
        // This is the user id of the user who has created the note
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);