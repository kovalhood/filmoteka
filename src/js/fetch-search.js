// API_KEY = '387a2500e741e87c896db50117c25d75';

// https://api.themoviedb.org/3/search/movie?api_key=387a2500e741e87c896db50117c25d75&query=Jack+Reacher

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

  async fetchMovies() {
    const url = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;

    const response = await fetch(url, options);
    const { movies } = await response.json();
    this.incrementPage();
    return movies;
  }

  incrementPage() {
    this.page += 1;
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
