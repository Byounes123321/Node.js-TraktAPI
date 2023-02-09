//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const trakt = require("./modules/trakt/api");
const { loadavg } = require("os");
const { request } = require("http");
const { response } = require("express");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  let movieList = await trakt.getTrendingMovies();
  console.log(movieList);
  response.render("index", { title: "Movies" , movies: movieList});
});
app.get("/movieStudios", async (request, response) =>{
  let imdbid = request.query.id;
  let studioList = await trakt.getMovieStudio(imdbid);
  console.log(studioList)
  response.render("studios", {title: "Studios", studios : studioList});
});

app.get("/popular", async ( request, response)=> {
  let popShows = await trakt.getPopularShow();
  console.log(popShows);
  response.render("popular", {title: "PopularShows", shows: popShows})
})

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


