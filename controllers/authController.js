import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'


export const signup=async (req,res,next)=>{

    const{username,email,password} = req.body;
    const hashPassword =bcryptjs.hashSync(password,10);
    const newUser= new User({username,email,password:hashPassword});

    try {
        await newUser.save()
    res.status(200).json("User created succesfully");  
        }
        catch (error) {
            next(error);
        }  
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(errorhandler(400, "Email and password are required"));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorhandler(404, "User not found"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorhandler(401, "Wrong credentials"));

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Remove password from the user object
        const { password: pass, ...rest } = validUser._doc;

        res.status(200).json({
            ...rest,
            access_token: token,
        });
    } catch (error) {
        next(error);
    }
};




export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        let token, userData;

        if (user) {
            token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            userData = { ...user._doc };
        } else {
            const generatedPass = Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPass, 10);
            const sanitizedUsername = req.body.name.replace(/\s+/g, "").toLowerCase() + Math.random().toString(36).slice(-4);

            const newUser = new User({ username: sanitizedUsername, email: req.body.email, password: hashPassword, avatar: req.body.photo });
            await newUser.save();
            token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            userData = { ...newUser._doc };
        }

        userData.username = userData.username.replace(/\s+/g, "");
        res.status(200).json({ token, user: userData });

    } catch (error) {
        next(error);
    }
};


export const updateUserController = async (req, res) => {
    console.log("inside updateUser");

    const { username, email, password, avatar } = req.body;
    const uploadAvatar = req.file ? req.file.filename : avatar; // Handle avatar upload logic
    const userId = req.userId;

    try {
        let hashedPassword;
        if (password) {
            // Hash the new password if provided
            hashedPassword = bcryptjs.hashSync(password, 10);
        }

        const updatedFields = {
            username,
            email,
            avatar: uploadAvatar,
        };

        if (password) {
            updatedFields.password = hashedPassword; // Include hashed password only if updated
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true } // Return the updated document
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(401).json(err);
    }
};

