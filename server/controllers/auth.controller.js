const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");

const register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.log("User with this email already exists");
            return next(createError(400, "User with this email already exists"));
        }

        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        console.log("User has been created");
        res.status(201).json({ message: "User has been created", data: newUser });
    } catch (error) {
        console.log("Server error");
        next(error)
        return next(createError(500, "Server error"))
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            console.log("User not found!");
            return next(createError(404, "User not found!"));
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) {
            console.log("Wrong password!");
            return next(createError(400, "Wrong password!"));
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        const { password, ...info } = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true,
        })
        .status(200)
        //.json(user)
        .json({ token, user: info }) 

        console.log("Login successfuly");
    } catch (error) {
        next(error)
        res.status(500).json({
            message: "Login field!",
            error: error
        });
    }
};


const logout = async (req, res)=>{
    try {
        res
    .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
    .status(200)
    .send("User has been logged out.")
    } catch (error) {
        next(error)
        return next(createError(500, "Server error"))
    }
    
};

module.exports = { register, login, logout }
