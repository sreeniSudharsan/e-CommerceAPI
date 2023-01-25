const express = require('express');
const router = express.Router();
const {authenticateUser,authorizePermissions} = require('../middleware/authentication');

const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrders
} = require('../controller/orderController');

router.route('/').post(authenticateUser, createOrder).get(authenticateUser, authorizePermissions('admin'), getAllOrders);

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router.route('/:id').get(authenticateUser, getSingleOrder)
                    .patch(authenticateUser, updateOrders)


module.exports = router;

