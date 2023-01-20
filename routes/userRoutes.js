const express = require('express')
const router = express.Router();
const {getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword}  = require('../controller/userController');


router.route('/').get(getAllUsers)

router.route('/showMe').get(showCurrentUser)
router.post('/updateUser', updateUser)
router.post('/updateUserPassword',updateUserPassword)

router.route('/:id').get(getSingleUser)

module.exports = router;