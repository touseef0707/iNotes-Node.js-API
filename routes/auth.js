const express = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();
const User = require('../models/User');
const JWT_SECRET = 'iNote$R@inyJ0ke';


const validationQueries = [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min:5}),
]

// Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', validationQueries, async (req, res) => {

    let success = false;
    // Returns Bad request if error
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({success, errors: validationResult(req).array()});
    }

    // creating user without async await
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    // .then(user => res.json(user))
    // .catch(err => {
    //     console.log(err)
    //     res.json({
    //         error : "Invalid Email", 
    //         message:err.message
    //     });
    // });

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "Sorry, a user with this email already exists."});
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // get index of user
        const data = {
            user: {
                id: user.id
            }
        }
        
        // create token
        const auth_token = jwt.sign(data, JWT_SECRET);
        // res.json({"success": "User was created successfully", "user": user});
        success = true;
        // send token
        res.json({success, auth_token});


    } catch (error) {
        // return errors
        success = false;
        console.log(error);
        return res.status(500).json({success, error: "Internal Server Error"});
    }

})


// Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', validationQueries.slice(1), async (req, res) => {

        let success = false
        // Returns Bad request if error
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({success, errors: validationResult(req).array()});
        }
    
        const {email, password} = req.body;
    
        try {
            // Do not forget to use awaits
            let user = await User.findOne({email});
            
            // Check whether the user with this email exists already
            if(!user){
                return res.status(400).json({success, error: "Please try to login with correct credentials"});
            }
            
            // compare password with bcrypt
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({success, error: "Please try to login with correct credentials"});
            }

            // get index of user
            const data = {
                user: {
                    id: user.id
                }
            }
            
            // create token
            const auth_token = jwt.sign(data, JWT_SECRET);

            // send token
            success = true;
            res.json({success, auth_token});
    
        } catch (error) {
            // return errors
            console.log(error);
            return res.status(500).json({error: "Internal Server Error"});
        }
    
    })


// Route 3: Get loggedin user details using: POST "/api/auth/getuser". login required
router.get('/getuser', fetchuser, async (req, res) => {
    // fetchuser middleware will add userID to req object

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        
        // return user
        res.send(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
})

module.exports = router;