const express = require('express')
const router = express.Router();
const {getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword}  = require('../controller/userController');
const {authenticateUser,authorizePermissions} = require('../middleware/authentication');

router.route('/').get(authenticateUser, authorizePermissions, getAllUsers)

router.route('/showMe').get(showCurrentUser)
router.patch('/updateUser', updateUser)
router.patch('/updateUserPassword',updateUserPassword)

router.route('/:id').get(getSingleUser)

module.exports = router;