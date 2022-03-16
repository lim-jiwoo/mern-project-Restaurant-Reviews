# [MERN Toy Project] Restaurant Reviews

![Restaurant_Review_Banner](./banner.png)  

🔥 Toy Clone project using MERN Stack, courtesy of *freeCodeCamp.org*.

This website allows user to search restaurants by name, zip code, and cuisine type. User can click [View Map] to locate the restaurant on Google Map, or click [View Reviews] to read reviews. They can also login to leave their own reviews. 

* Created 2021-08-23
* Using `React` `bootstrap` `axios` `Node.js` `express` `MongoDB` 

## Install

To host the website on local server:
1. Clone the repository.
2. On terminal, get frontend running by `cd frontend` ➔ `npm i` ➔ `npm start`
3. Get backend running by `cd backend` ➔ `nodemon server` ➔ `nodemon server`

## Features

#### 1) Search Restaurants
To search for a restaurant, use search bars at the top of the page. Search by name, zip code, or cuisine type.

- Searching by name only filters word-level match. `Piz` will not return titles that contain `Pizza`.

#### 2) View Map
To see where the restaurant is located, click [View Map] button. This will open in a new tab with the Google Map search result.

#### 3) Log In
Log In is required to create, edit, or delete reviews. Sign Up is currently not provided. Simply giving any random Username and ID will create a new account. 

#### 4) Reviews
User can add any number of reviews. Reviews are visible to all users, but you can only edit or delete reviews you created.