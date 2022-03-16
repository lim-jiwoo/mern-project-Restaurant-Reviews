import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

// var to store a ref to our DB
let restaurants

// exporting a class with TWO methods
export default class RestaurantsDAO {
    // First method. How we initially connect to our DB. 
    // called asa server starts. get ref to res. 
    static async injectDB(conn) {
        // if there already IS ref
        if (restaurants) {
            return
        }
        try {
            // connect to db's specific collection
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection('restaurants')
        } catch (e) {
            console.error('unable to establish a collection handle in r..DAO: ${e}', )
        }
    }

    // Second method. Get all res in DB.
    static async getRestaurants({
        // created some options.
        filters=null, // ex) sort by name
        page=0, // page#
        restaurantsPerPage=20,
    } = {}) { // Default param. Also possible: = { filters: 'cuisine', page: 1}) 
        let query
        // if given filter
        if (filters) {
            if ('name' in filters){ // search by name
                // without db field(ex. cuisine), which field to search?
                // Have to specify in mongo atlas where to look for $text search.
                query = { $text: { $search: filters['name'] } }
            } else if ('cuisine' in filters) {
                query = { 'cuisine': { $eq: filters['cuisine'] } }
            } else if ('zipcode' in filters) {
                query = { 'address.zipcode': { $eq: filters['zipcode'] } }
            }
        }
        //query looks like : { '$text': { '$search': 'riviera' } }
        // { 'address.zipcode': { '$eq': '10013' } }
        // { cuisine: { '$eq': 'African' } }

        console.log(query)

        let cursor

        try {
            // find all res that go along with query
            // if empty query, return all res
            cursor = await restaurants
                .find(query)
        } catch (e) {
            console.error('unable to issue command, ${e}')
            return { restaurantsList: [], totalNumRestaurants:0 }
        }

        // giv some limit, because now cursor's returning all
        // skip = get to specific pg
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage*page)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query) //count doc in query
            return { restaurantsList,totalNumRestaurants }
        } catch (e) {
            console.error('unable to convert cursor to array or problem counting doc, ${e}')
            return { restaurantsList: [], totalNumRestaurants:0 }
        }
    }  


    static async getRestaurantById(id) {
        try {
            // (aggregation) pipeline is a powerful mongo tool
            // that helps match different collections together.
            // Doc enter multi-stage pipeline that transforms 
            // doc into aggregated result.
            const pipeline = [
                {
                    // match id
                    $match: { _id: new ObjectId(id), },
                }, {
                    // look up reviews to add to the result
                    $lookup: {
                        from: 'reviews', //from reviews collection, 
                        let: { id: '$_id', },
                        pipeline: [ // create a pipeline that will match
                            { $match: 
                                { $expr: 
                                    // res id and
                                    { $eq: ['$restaurant_id', '$$id'],
                                },},},
                        // find all reviews that match that res id
                        // and set it as 'reviews'.
                        ],
                        as: 'reviews',
                    },
                }, {
                    // add 'reviews' to the results.
                    $addFields: {
                        reviews: '$reviews',
                    },
                },
            ]
            // aggregate pipeline and return next item(res with all reviews)
            return await restaurants.aggregate(pipeline).next()
        }catch(e) {console.log('something wrong with getResById'); throw e}
    }

    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct('cuisine')
            return cuisines
        }catch(e) {console.log(`unable to get cuisine, ${e}`)}
        return cuisines
    }
}

