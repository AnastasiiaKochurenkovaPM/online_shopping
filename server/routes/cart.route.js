const router = require("express").Router()
const { 
    createCart, 
    updateCart, 
    deleteCart, 
    getUserCart, 
    getAllCart 
} = require("../controllers/cart.controller.js")
const { verifyAdmin } = require("../controllers/user.controller.js")
const verifyToken = require("../middeleware/jwt.js")
const {parser} = require("../utils/cloudinary.js")


router.post("/create", verifyToken, createCart)
router.put("/update/:id", verifyToken, updateCart)
router.delete("/:id", verifyToken, deleteCart)
router.get("/:id", verifyToken, getUserCart)
router.get("/", verifyToken, getAllCart)

module.exports = router