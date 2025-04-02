const router = require("express").Router()
const userRouter = require("./user.route.js")
const authRouter = require("./auth.route.js")

router.use("/api/auth", authRouter)

module.exports = router