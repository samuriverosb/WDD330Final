import { renderListWithTemplate, loadHeaderFooter } from "./utils.mjs";

const reviewTemplate = (review) => {
  return `
    <div class="review-item">
      <div class="review-item-header">
        <h3>${review.author}</h3>
        <p class="reviewDate">Submitted on ${new Date(review.created_at).toLocaleDateString()} ${new Date(review.created_at).toLocaleTimeString()}</p>
      </div>
      <div class="review-item-body">
        <p id="${review.author}shortReview">${review.content.length > 200 ? review.content.substring(0, 200) + "..." : review.content}</p>
        <p class="hide" id="${review.author}fullReview">${(review.content)}</p>
        <button id="showMoreButton" onclick="document.getElementById('${review.author}fullReview').classList.toggle('hide'); document.getElementById('${review.author}shortReview').classList.toggle('hide')">Show more</button>
      </div>
    </div>`
}

export default class MovieDetails {
  constructor(movieId, dataSource, reviewParentElement) {
    this.reviewParentElement = reviewParentElement;
    this.movieId = movieId;
    this.movie = {};
    this.reviews = [];
    this.dataSource = dataSource;
  }

  async init() {
    this.movie = await this.dataSource.findMovieById(this.movieId);
    this.reviews = await this.dataSource.getReviewsByMovieId(this.movieId);
    console.log(this.reviews);
    this.renderMovieDetails();
    this.renderMovieReviews();
  }

  renderMovieDetails() {
    movieDetailsTemplate(this.movie);
  }

  renderMovieReviews() {
    renderListWithTemplate(reviewTemplate, this.reviewParentElement, this.reviews);
  }
}

const movieDetailsTemplate = (movie) => {
  document.getElementById("movieTitle").innerHTML = movie.original_title;
  document.getElementById("moviePoster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById("movieDescription").innerHTML = movie.overview;
  document.getElementById("movieRating").innerHTML = `<b>Rating:</b> ${movie.vote_average}`;
  document.getElementById("movieReleaseDate").innerHTML = `<b>Release Date:</b> ${movie.release_date}`;
  document.getElementById("movieBudget").innerHTML = `<b>Budget:</b> $${(movie.budget / 1000000).toFixed(2)}M`;
  document.getElementById("movieRevenue").innerHTML = `<b>Revenue:</b> $${(movie.revenue / 1000000).toFixed(2)}M`;
  document.getElementById("movieGenres").innerHTML = `<b>Genres:</b> ${movie.genres.map(genre => genre.name).join(", ")}`;
  document.getElementById("addToFavourites").onclick = async () => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.some(fav => fav.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      alert("Movie added to favourites!");
      await loadHeaderFooter()
    } else {
      alert("Movie already in favourites!");
    }
  }
}