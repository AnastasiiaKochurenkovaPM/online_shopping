const Product = require("../models/products.model.js");
const createError = require("../utils/createError.js");

const createProduct = async (req, res, next) => {
    try {
        if (!req.file) {
            console.log(req.file);
            
            return next(createError(400, "No file uploaded!"));
        }
        
        const categories = req.body.categories 
            ? req.body.categories.split(",")
            : []

        const newProduct = new Product({
            ...req.body,
            categories: categories,
            image: req.file.path, 
        });

        await newProduct.save();
        res.status(200).json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
        next(error);
        //return next(CreateError(500, "Server error"))
    }
}


const updateProduct = async (req, res, next) => {
    try {
        // const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
        //     {
        //         $set:req.body,
        //     },
        //     {
        //         new: true,
        //     }
        // )
        // res.status(200).json({message:"Product gas been updated successfully", data: updatedProduct})

        const updateFields = { ...req.body };

        // Обробка categories
        if (req.body.categories) {
            // Якщо приходить рядок — розбиваємо його
            if (typeof req.body.categories === "string") {
                updateFields.categories = req.body.categories.split(",").map(cat => cat.trim());
            }
        }

        // Якщо нове зображення передано — додаємо до update
        if (req.file) {
            updateFields.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        res.status(200).json({
            message: "Product has been updated successfully",
            data: updatedProduct
        });

    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
} 

const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Product gas been deleted successfully"})

    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
} 

const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return next(createError(404, "Product not found"))
        }
        res.status(200).json(product)
    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
}


const getAllProduct = async (req, res, next) => {
    try {
        const qlatest = req.query.latest
        const qcategory = req.query.categories

        let product
        if(qlatest) {
            product = await Product.find().sort({createdAt: -1}, limit(3))

        }else if(qcategory){
            product = await Product.find({
                categories:{
                    $in:[qcategory]
                }
            })
        }else{
            product = await Product.find()
        }

        res.status(200).json(product)
    } catch (error) {
        next(error)
        //return next(createError(500, "Server error"))
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProduct
}