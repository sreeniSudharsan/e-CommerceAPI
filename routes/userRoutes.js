const express = require('express')
const router = express.Router();
const {getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword}  = require('../controller/userController');


router.route('/').get(authenticateUser, getAllUsers)

router.route('/showMe').get(showCurrentUser)
router.patch('/updateUser', updateUser)
router.patch('/updateUserPassword',updateUserPassword)

router.route('/:id').get(getSingleUser)

module.exports = router;