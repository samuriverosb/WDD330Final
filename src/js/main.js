import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";

const data = new ExternalServices();
const parentElement = document.querySelector("#movie-list");

const getDataSorted = async (sortValue) => {
  let dataSorted;
  if (sortValue === "primary_release_date.asc") {
    dataSorted = await data.getDataListBySort(sortValue, `&primary_release_date.gte=${new Date().toISOString().split('T')[0]}`);
  } else if (sortValue === "primary_release_date.desc") {
    dataSorted = await data.getDataListBySort(sortValue, `&primary_release_date.lte=${new Date().toISOString().split('T')[0]}`);
  } else {
    dataSorted = await data.getDataListBySort(sortValue, "");
  }
  const movieList = new MovieList(dataSorted, parentElement);
  movieList.init();
  return;
}

document.getElementById("sort").onchange = async (event) => await getDataSorted(event.target.value);

loadHeaderFooter();
getDataSorted(document.getElementById("sort").value);
