//Express and MiddleWare
const express = require('express');
const router = express.Router();
const {authenticateUser,authorizePermissions} = require('../middleware/authentication');

//Product Controllers
const {createProduct, 
    getAllProduct, 
    getSingleProduct, 
    deleteProduct,
    updateProduct,
    uploadImage} = require('../controller/productController');

const {getSingleProductReviews} = require('../controller/reivewController')

router.route('/').post([authenticateUser, authorizePermissions('admin')], createProduct)
                 .get(getAllProduct)

router.route('/uploadImage').post([authenticateUser, authorizePermissions('admin')], uploadImage)

router.route('/:id').get(getSingleProduct).patch([authenticateUser, authorizePermissions('admin')], updateProduct)
                    .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews)                    

module.exports = router;