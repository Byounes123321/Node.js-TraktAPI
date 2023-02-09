const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */
async function getTrendingMovies() {
    let reqUrl = `${trakt}/movies/trending`;
    //for fetch, other options are:
    //body: <data for POST request>
    var response = await fetch(
        reqUrl, 
        {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "trakt-api-version" : "2",
                "trakt-api-key" : process.env.TRAKT_CLIENT_ID
            }
        }
);
// the JSON response data will be found in response.json()\
return await response.json(); 
}

async function getMovieStudio(imdbid) {
    let reqUrl = `${trakt}/movies/${imdbid}/studios`;
    var response = await fetch(
        reqUrl,
        {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "trakt-api-version" : "2",
                "trakt-api-key" : process.env.TRAKT_CLIENT_ID
            }
        }  
    );
    return await response.json();
}

async function getPopularShow() {
    let reqUrl = `${trakt}/shows/popular?page=1&limit=15`;
    var response = await fetch (
        reqUrl,
        {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "trakt-api-version" : "2",
                "trakt-api-key" : process.env.TRAKT_CLIENT_ID
            }
        }
    );
    return await response.json();
}

//EXPORT any functions to be used outside this file
module.exports = {
    getTrendingMovies,
    getMovieStudio,
    getPopularShow
};