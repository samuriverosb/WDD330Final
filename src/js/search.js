import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";

const data = new ExternalServices();
const parentElement = document.querySelector("#movie-list");
const search = getParam("search");

data.findMovieBySearch(search).then((data) => {
  const movieList = new MovieList(data, parentElement);
  movieList.init();
})

loadHeaderFooter()