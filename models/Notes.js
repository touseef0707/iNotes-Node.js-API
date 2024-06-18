const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

// Note Schema
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

// Note Model
const Note = mongoose.model('note', NoteSchema);
module.exports = Note;