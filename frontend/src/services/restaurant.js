import http from '../http-common';

// All functions that make api calls
// and return info from api calls. 
class RestaurantDataService {

    // GET req of this url, which is the part 
    // added to base url in 'http-common.js'.
    getAll(page=0) { 
        return http.get(`?page=${page}`)
    }

    get(id) { 
        return http.get(`/id/${id}`)
    }

    find(query, by='name', page=0) { 
        //query=검색어, by=name/cuisine/zipcode
        return http.get(`?${by}=${query}&page=${page}`)
    }

    createReview(data) {
        return http.post("/review", data);//("/review-new", data);
    }

    updateReview(data) {
    return http.put("/review", data);//("/review-edit", data);
    }

    deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`);//(`/review-delete?id=${id}`, {data:{user_id: userId}});
    }

    getCuisines(id) {
    return http.get(`/cuisines`);
    }
}
export default new RestaurantDataService();

