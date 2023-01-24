const expres = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication')
const {getAllReviews,
    createReview,
    getSingleReview,
    updateReview,
    deleteReview} = require('../controller/reivewController')

router.route('/').post(authenticateUser, createReview).get(getAllReviews)
router.route('/:id').get(getSingleReview).patch(authenticateUser, updateReview)
                    .delete(authenticateUser, deleteReview);


module.exports = router;