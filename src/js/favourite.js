import MovieList from "./MovieList.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const parentElement = document.querySelector("#movie-list");
const movieList = new MovieList(getLocalStorage("favourites") ? getLocalStorage("favourites") : [], parentElement);
movieList.init();

loadHeaderFooter();