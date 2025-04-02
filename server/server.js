const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dbConnect = require("./dbConnect/dbConnection");
const routes = require("./routes/routes.js");
const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/products.route.js")
const cartRouter = require("./routes/cart.route.js")
const orderRouter = require("./routes/order.route.js")

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:"http://localhost:8081", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
express.urlencoded({ extended: true })

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter)
app.use("/api/orders", orderRouter)


app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
});


dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
});
