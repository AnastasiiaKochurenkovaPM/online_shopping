const Order = require("../models/order.model.js");
const createError = require("../utils/createError.js");

const createOrder = async (req, res, next) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(200).json({ message: "Order created successfully", data: newOrder });
    } catch (error) {
        next(error);
        //return next(CreateError(500, "Server error"))
    }
}


const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, 
            {
                $set:req.body,
            },
            {
                new: true,
            }
        )
        res.status(200).json({message:"Order gas been updated successfully", data: updatedOrder})

    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
} 

const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Order gas been deleted successfully"})

    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
} 

const getUserOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({userId: req.params.id})
        if(!order){
            return next(createError(404, "Cart not found"))
        }
        res.status(200).json(order)
    } catch (error) {
        next(error)
        return next(createError(500, "Server error"))
    }
}


const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        next(error)
        return next(createError(500, "Server error"))
    }
}

const getMonthlyIncome = async (req, res, next) => {
    try {
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const prevMonth = new Date(new Date(lastMonth.setMonth(lastMonth.getMonth() - 1)))
        const monthlyIncome = await Order.aggregate([
            {
                $match: {createdAt: {$gte: prevMonth}}
            },
            {
                $project:{
                    month: {$month : "$createdAt"},
                    sales: "$amount",
                }
            }, 
            {
                $group:{
                    _id: "$month", 
                    total: {$sum: "$sales"},
                }
            }
        ])
        res.status(200).json(monthlyIncome)
    } catch (error) {
        next(error)
        return next(createError(500, "Server error"))
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrders,
    getMonthlyIncome
}