const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '387a2500e741e87c896db50117c25d75';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchMovies(currentPage) {
    const url = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${currentPage}&query=${this.searchQuery}&include_adult=false`;

    const response = await fetch(url, options);
    const movies = await response.json();
    return movies;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
