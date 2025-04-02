const router = require("express").Router()
const { 
    createProduct, 
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProduct
} = require("../controllers/products.controller.js")
const { verifyAdmin } = require("../controllers/user.controller.js")
const {parser} = require("../utils/cloudinary.js")


router.post("/create", verifyAdmin, parser.single("image"), createProduct)
router.put("/update/:id", verifyAdmin, parser.single("image"), updateProduct)
router.delete("/:id", verifyAdmin, deleteProduct)
router.get("/:id", getProduct)
router.get("/", getAllProduct)
// router.post("/create", (req, res, next) => {
//     console.log("Route /create hit");
//     next();
// }, parser.single("image"), (req, res, next) => {
//     console.log("Multer middleware passed");
//     next();
// }, createProduct);

module.exports = router