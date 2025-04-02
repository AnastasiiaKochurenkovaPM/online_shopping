const verifyToken = require("../middeleware/jwt.js");
const User = require("../models/user.model.js")
const createError = require("../utils/createError.js")


const updateUser = async(req, res, next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
    )
    if (!updatedUser){
        return next(createError(404, "User not found!"));
    }
    res.status(200).json({message:"User has been updated successfully", data: updatedUser})
    } catch (error) {
        next(error)  
        //return next(createError(500, "Server error"))
    }
}

const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("User has been deleted successfully.")
    } catch(error){
        next(error)
        //return next(createError(500, "Server error"))
    }   
}

const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(500,"User is not Admin"))
        }
    })
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return next(createError(404, "User can't  be found"))
        }
        res.status(200).json({message: "User has be found successfully", data: user})
    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
};

const getAllUsersForAdmin = async (req, res, next) => {
    try {
        const admin = req.user.isAdmin
        if(!admin){
            return next(createError(404, "Users can't  be found"))
        }
        const users = await User.find()
        res.status(200).json({message: "Users has be found successfully", data: users})
    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
}

const getUserStats = async (req, res, next) => {
    try {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

        const admin = req.user.isAdmin
        if(!admin){
            return next(createError(404, "You don't have access for statistic"))
        }

        const userStats = await User.aggregate([
            {
                $match:{
                    createdAt: {$gte: lastYear}
                },
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            },

        ])
        res.status(200).json({message: "User status retrieved successfully", data: userStats})
    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
}

module.exports = {
    updateUser, 
    deleteUser, 
    getUser, 
    verifyAdmin, 
    getAllUsersForAdmin,
    getUserStats
}