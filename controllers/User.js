import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


config({path: ".env"})

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        if(userData.name == ' ' || userData.email == ' ' || userData.password == ' ') return res.status(400).json({ message: "All Fields Are Required" });
        

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;

        const checkUser = await User.findOne({ email: userData.email });
        if (checkUser) {
            return res.json({ message: "User already exists" });
        } else {
            const addUser = await User.create(userData);            
            res.json({ message: "User registered successfully", addUser});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// Login a user
export const loginUser = async (req, res) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        };
        
        const foundUser = await User.findOne({ email: userData.email });

        if (!foundUser) {
            return res.json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(userData.password, foundUser.password);
        if (isMatch) {
            const token = jwt.sign({ userId: foundUser._id }, process.env.Jwt_secret, { expiresIn: "1d" });
            res.json({ message: "User logged in successfully", foundUser , token });
        } else {
            res.json({ message: "Invalid credentials" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}