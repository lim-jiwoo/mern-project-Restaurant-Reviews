// Helper file
// to set up axios for './services/restaurant.js'
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000/api/v1/restaurants', //backend server base url
    headers: { 'Content-type': 'application/json'
}});

