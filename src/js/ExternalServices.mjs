const baseURL = import.meta.env.TMDb_URL;
const apiKey = import.meta.env.TMDb_KEY;

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
    const response = await fetch(`${baseURL}/discover/movie?include_adult=false&include_video=false&language=en-US${extraParams}&sort_by=${sort}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const data = await convertToJson(response);
    return data.results;
  }

  async findMovieById(id) {
    const response = await fetch(`${baseURL}/movie/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const data = await convertToJson(response);
    return data;
  }

  async findMovieBySearch(search) {
    const response = await fetch(`${baseURL}/search/movie?query=${encodeURIComponent(search.trim())}&include_adult=false&language=en-US&page=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const data = await convertToJson(response);
    return data.results;
  }

  async getReviewsByMovieId(id) {
    const response = await fetch(`${baseURL}/movie/${id}/reviews?language=en-US&page=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const data = await convertToJson(response);
    return data.results;
  }
}