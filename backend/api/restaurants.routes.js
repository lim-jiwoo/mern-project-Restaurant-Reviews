import express from 'express'
import RestaurantsCtrl from './restaurants.controller.js'
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router()

// controller that route file will use to access dao file
// router.route('/').get((req, res) => res.send('hello world'))
router.route('/').get(RestaurantsCtrl.apiGetRestaurants)
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById)
router.route('/cuisines').get(RestaurantsCtrl.apiGetRestaurantCuisines)

// Review system
router
    .route('/review')
    .post(ReviewsCtrl.apiPostReview) // if POST req, use this METHOD
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router

