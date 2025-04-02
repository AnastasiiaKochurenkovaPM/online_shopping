const Cart = require("../models/cart.model.js");
const createError = require("../utils/createError.js");

const createCart = async (req, res, next) => {
    try {
        const newCart = new Cart(req.body);
        await newCart.save();
        res.status(200).json({ message: "Cart created successfully", data: newCart });
    } catch (error) {
        next(error);
        //return next(CreateError(500, "Server error"))
    }
}


const updateCart = async (req, res, next) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, 
            {
                $set:req.body,
            },
            {
                new: true,
            }
        )
        res.status(200).json({message:"Cart gas been updated successfully", data: updatedCart})

    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
} 

const deleteCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Cart gas been deleted successfully"})

    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
} 

const getUserCart = async (req, res, next) => {
    try {
        const cartItem = await Cart.findOne({userId: req.params.id})
        if(!cartItem){
            return next(createError(404, "Cart not found"))
        }
        res.status(200).json(cartItem)
    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
}


const getAllCart = async (req, res, next) => {
    try {
        const cartItems = await Cart.find()
        res.status(200).json(cartItems)
    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCart
}