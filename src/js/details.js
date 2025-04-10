import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MovieDetails from "./MovieDetails.mjs";

const data = new ExternalServices();
const reviewParentElement = document.querySelector("#reviewsList");
const movieId = getParam("movie");
const movieDetails = new MovieDetails(movieId, data, reviewParentElement);

loadHeaderFooter();
movieDetails.init();