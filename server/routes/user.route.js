const router = require("express").Router()
const verifyToken = require("../middeleware/jwt.js")
const {
    deleteUser, 
    getUser, 
    updateUser, 
    verifyAdmin, 
    getAllUsersForAdmin,
    getUserStats
} = require("../controllers/user.controller.js")

router.delete("/delete/:id", verifyAdmin, deleteUser)
router.put("/update/:id", verifyToken, updateUser)
router.get("/", verifyAdmin, getAllUsersForAdmin)
router.get("/stats", verifyAdmin, getUserStats)

router.get("/:id", verifyToken, getUser)

module.exports = router