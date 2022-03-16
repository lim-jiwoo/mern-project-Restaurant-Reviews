import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import RestaurantsDAO from './dao/restaurantsDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'
// load env var. because we've configured env
dotenv.config()
// get access to mongo client
const MongoClient = mongodb.MongoClient

// set our port from env
// 8000 if cannot be accessed.
const port = process.env.PORT || 8000

// connect to DB
// pass in DB URI, access option
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50, // max 50 ppl access at time
        wtimeoutMS: 2500, // after 2500ms req timeout
        useNewUrlParser: true 
    } // mongo rewrote the tool that parse mongodb connection string 
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    // initial ref to restaurants collection.
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    // start web server. DB has been connected. 
    app.listen(port, () => {
        console.log(`listening on the port ${port}`)
    })
})



// class Printparam {
//     static printparam({
//         filters=null, 
//         page=0,
//         restaurantsPerPage=20,
//     } = { filters: 'cuisine', page: 1}) {
//         console.log(filters, page, restaurantsPerPage)
//     }
// }
// Printparam.printparam()