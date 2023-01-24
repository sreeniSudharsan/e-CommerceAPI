const Review = require('../models/review');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {checkPermissions} = require('../utils');
const product = require('../models/product');


const createReview = async(req, res) => {
    const { product: productId} = req.body;
    
    const isValidProdut = await product.findOne({_id:productId})

    if(!isValidProdut){
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }

    req.body.user = req.user.userId

    const alreadyExists = await Review.findOne(
        {
            product:productId, user:req.user.userId
        }
    )
    if(!alreadyExists){
        throw new CustomError.BadRequestError('Already Submitted Review for this Product')
    }

    const productReview =  await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({ productReview})
}

const getAllReviews = (req, res) => {
    res.send("All reviews");
}

const getSingleReview = (req, res) => {
    res.send("Get single review")
}

const updateReview = (req, res) => {
    res.send("Update Review")
}

const deleteReview = (req, res) => {
    res.send("Delete a Review")
}


module.exports = {
    getAllReviews,
    createReview,
    getSingleReview,
    updateReview,
    deleteReview
}