const router = require("express").Router()
const { 
    createOrder, 
    updateOrder, 
    deleteOrder, 
    getUserOrder, 
    getAllOrders, 
    getMonthlyIncome
} = require("../controllers/order.controller.js")
const { verifyAdmin } = require("../controllers/user.controller.js")
const verifyToken = require("../middeleware/jwt.js")
const {parser} = require("../utils/cloudinary.js")

router.post("/create", verifyToken, createOrder)
router.put("/update/:id", verifyAdmin, updateOrder)
router.delete("/:id", verifyToken, deleteOrder)
router.get("/:id", verifyToken, getUserOrder)
router.get("/", verifyToken, getAllOrders)
router.get("/stats/income", verifyAdmin, getMonthlyIncome)

module.exports = router