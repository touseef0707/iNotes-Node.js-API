const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

const validationQueries = [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
]

// Route 1: Fetch all notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
});


// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, validationQueries, async (req, res) => {
    
    // return Bad request if error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // Create a new note
        const {title, description, tag} = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        // Save the note to the database
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, validationQueries, async (req, res) => {

    // return Bad request if error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const {title, description, tag} = req.body;

        // Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Note not Found")};

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Notes.findById(req.params.id);

        // If note not found
        if(!note){return res.status(404).send("Note not Found")};

        // Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        // Find, delete and return success
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});

    } catch (error) {
        // return errors
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 5: Fetch a single note using: GET "/api/notes/fetchnote". Login required
router.get('/viewnote/:id', fetchuser, async (req, res) => {
    try{
        let note = await Notes.findById(req.params.id);
        
        if(!note){return res.status(404).send("Note Not Found")}
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        res.json({note});

    } catch (error){
        console.error(error.message)
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router;