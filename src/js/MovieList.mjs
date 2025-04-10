import { renderListWithTemplate } from "./utils.mjs";

function movieCardTemplate(movie) {
  return `
    <li class="movie-card">
      <a href="/movie_details/index.html?movie=${movie.id}">
        <div id="listItemContainer">
          <img 
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title}"
            class="movie-card-image"
            >
        </div>
      </a>
    </li>
  `;
}

export default class MovieList {
  constructor(list, parentElement) {
    this.list = list;
    this.parentElement = parentElement;
  } 

  init() {
    this.renderList(this.list);
  }

  renderList(list) {
    renderListWithTemplate(movieCardTemplate, this.parentElement, this.list, "afterbegin", true);
  }
}