import { User } from '../models/models.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup (req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success:false, message: 'Please provide all required fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success:false, message: 'Please provide a valid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success:false, message: 'Password must be at least 6 characters long' });
        }

        const existingUserbyEmail = await
        User.findOne({ email:email });

        if (existingUserbyEmail) {
            return res.status(400).json({ success:false, message: 'User already exists with this email' });
        }
        
        const existingUserbyUsername = await
        User.findOne({ username:username });

        if (existingUserbyUsername) {
            return res.status(400).json({ success:false, message: 'User already exists with this username' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const PROFILE_PIC = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];

        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser = new User({
            email,
            password:hashedPassword,
            username,
            image
        });

        
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({ 
                success:true, 
                user:
                {
                ...newUser._doc,
                password:""
                },
            
        });       


    } catch (error) {
        console.log('Error during signup:', error.message);
        res.status(500).json({ success:false, message: 'Internal server error' });
    }
}

export async function login(req, res) {
    res.send ('Login route');
}

export async function logout(req, res) {
    res.send ('Logout route');
}