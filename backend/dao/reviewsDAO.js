import mongodb from 'mongodb'
// this is so we get access to object id. 
// needed to convert string to mongo object id. 
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) return
        try {
            // Acess DB reviews collection
            // If not existing, mongo creates it for us.
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews')
        } catch (e) {console.error('unable to establish connection in userDAO')}
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = { 
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId), }// converted to mongo ObjID

            // insert right into DB
            return await reviews.insertOne(reviewDoc)
        } catch (e) { console.error('unable to post review'); return {error: e}}
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                // looking for review that has right review/user id
                { user_id: userId, _id: ObjectId(reviewId)},
                // set text and date to new val
                { $set: {text: text, date: date }},
            )

            return updateResponse
        } catch (e) { console.error('unable to update review'); return {error: e}}
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                // looking for review has right review/user id
                user_id: userId, 
                _id: ObjectId(reviewId),
            })

            return deleteResponse
        } catch (e) { console.error('unable to delete review'); return {error: e}}
    }
}

