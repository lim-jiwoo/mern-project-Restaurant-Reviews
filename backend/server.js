import express from 'express'
import cors from 'cors'
import restaurants from './api/restaurants.routes.js'

// create server
const app = express()

// apply middlware (things express will use)
app.use(cors())
// Server can accept json in req body.
// It can read if someone sends GET/POST req to our server. 
app.use(express.json())

// Initial route - all route in 'restaurants' file will START with this.
// This is our main url(which is localhost with port#)
// API url : "api/version"
app.use("/api/v1/restaurants", restaurants)
// If user goes to non existing route, return 404 pg.
app.use("*", (req, res) => res.status(404).json({error: "Not found"}))

// Export app as module
export default app

