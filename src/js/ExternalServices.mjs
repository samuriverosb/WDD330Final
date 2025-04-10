const baseURL = import.meta.env.TMDb_URL;

const convertToJson = async (res) => {
  const body = await res.json();
  if (res.ok) {
    return body;
  } else {
    throw { name: "servicesError", message: body };
  }
}

export default class ExternalServices {
  constructor() { }

  async getDataListBySort(sort, extraParams) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US${extraParams}&sort_by=${sort}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjIyNWE5MTJmMTY1NTY3YTJkM2I4OGU0NDRhMWUyZiIsIm5iZiI6MTc0MjMzMzA4OS41NjMsInN1YiI6IjY3ZDllNGExNmU3OWI1OGE0ZWQ0YmU5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CZ1-7akCitM-nd5K59ylmC_g6fHz7cADJDBUH_bEyBI`,
      },
    });
    const data = await convertToJson(response);
    return data.results;
  }

  async findMovieById(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjIyNWE5MTJmMTY1NTY3YTJkM2I4OGU0NDRhMWUyZiIsIm5iZiI6MTc0MjMzMzA4OS41NjMsInN1YiI6IjY3ZDllNGExNmU3OWI1OGE0ZWQ0YmU5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CZ1-7akCitM-nd5K59ylmC_g6fHz7cADJDBUH_bEyBI`,
      },
    });
    const data = await convertToJson(response);
    return data;
  }

  async findMovieBySearch(search) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search.trim())}&include_adult=false&language=en-US&page=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjIyNWE5MTJmMTY1NTY3YTJkM2I4OGU0NDRhMWUyZiIsIm5iZiI6MTc0MjMzMzA4OS41NjMsInN1YiI6IjY3ZDllNGExNmU3OWI1OGE0ZWQ0YmU5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CZ1-7akCitM-nd5K59ylmC_g6fHz7cADJDBUH_bEyBI`,
      },
    });
    const data = await convertToJson(response);
    return data.results;
  }

  async getReviewsByMovieId(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjIyNWE5MTJmMTY1NTY3YTJkM2I4OGU0NDRhMWUyZiIsIm5iZiI6MTc0MjMzMzA4OS41NjMsInN1YiI6IjY3ZDllNGExNmU3OWI1OGE0ZWQ0YmU5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CZ1-7akCitM-nd5K59ylmC_g6fHz7cADJDBUH_bEyBI`,
      },
    });
    const data = await convertToJson(response);
    return data.results;
  }
}