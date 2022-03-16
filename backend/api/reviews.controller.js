import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    // First method: Post review
    static async apiPostReview(req, res, next) {
        try {
            // before, from query param. Now from body.
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            // send all above to addReview DAO
            // ReviewDAO will send that to the DB!
            const reviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            ) 
            res.json({ status: 'success' }) //if worked
        } catch (e) { res.status(500).json({ error: e.message })}
    }

    // Second method: Update review. Similar!
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id, //Make sure creater is updating
                text,
                date,
            ) 

            var {error} = reviewResponse
            if (error) { res.status(400).json({ error }) }

            // if nothing was updated
            if (reviewResponse.modifiedCount === 0) {
                throw new Error('unable - user may not be poster')
            }

            res.json({status: 'success'})
        } catch (e) { res.status(500).json({ error: e.message })}
    }

    // Third method: Delete review.
    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id //get id from query in url
            // Actually, for HTML del req, non-standard to use 'body'.
            const userId = req.body.user_id
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            ) 
            res.json({status: 'success'})
        } catch (e) { res.status(500).json({ error: e.message })}
    }
}

