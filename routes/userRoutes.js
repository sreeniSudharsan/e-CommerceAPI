const express = require('express')
const router = express.Router();
const {getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword}  = require('../controller/userController');
const {authenticateUser,authorizePermissions} = require('../middleware/authentication');

router.route('/').get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers)

router.route('/showMe').get(authenticateUser, showCurrentUser)
router.patch('/updateUser', authenticateUser, updateUser)
router.patch('/updateUserPassword', authenticateUser, updateUserPassword)

router.route('/:id').get(getSingleUser)

module.exports = router;