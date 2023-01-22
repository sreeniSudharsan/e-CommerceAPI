const Product = require('../models/product');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const product = require('../models/product');



const createProduct = async(req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

const getAllProduct = async(req, res) => {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({products, count: products.length})
}

const getSingleProduct = async(req, res) => {
    const {id: productId } = req.params;
    const findProduct = await Product.findOne({_id:productId})

    if(!findProduct){
        throw new CustomError.NotFoundError(`Product with id ${productId} does not exist!`)
    }
    res.status(StatusCodes.CREATED).json({findProduct})
}

const deleteProduct = async(req, res) => {
    const {id:productId} = req.params;
    const deletedproduct = await Product.findOne({_id:productId})

    if(!deletedproduct){
        throw new CustomError.NotFoundError(`Product with id ${productId} does not exist!`)
    }

    await deletedproduct.remove();

    res.status(StatusCodes.OK).json({msg: 'Product has been succesfully removed'})
    
}

const updateProduct = async(req, res) => {
    const {id: productId} = req.params

    const product = await Product.findOneAndUpdate({_id:productId}, req.body, 
        {new:true, runValidators:true})

if(!product){
    throw new CustomError.NotFoundError(`Product with id ${productId} does not exist!`)
}
res.status(StatusCodes.CREATED).json({product})
}

const uploadImage = async(req, res) => {
    res.send('Create Product')
}

module.exports = {createProduct, 
                getAllProduct, 
                getSingleProduct, 
                deleteProduct,
                updateProduct,
                uploadImage}