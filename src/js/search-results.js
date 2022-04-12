import moviesTmpl from '../templates/movie-card.hbs';
import movieCardDescTmpl from '../templates/movie-description.hbs';
import { fetchTrendyMovies } from './fetch-trendy-movies';
import MoviesApiService from './fetch-search';

const movieApiService = new MoviesApiService();
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '387a2500e741e87c896db50117c25d75';
const imgPath = 'https://image.tmdb.org/t/p/w500';

const searchFormRef = document.querySelector('.search-form');
const moviesListRef = document.querySelector('.js-movies__list');

const categories = {
  trending: '/trending/movie/week',
  querySearch: '/search/movie',
  genre: '',
};

searchFormRef.addEventListener('submit', onSearchFormSubmit);

// 1.Розмітка при загрузці сторінки (Trending Movies)
window.addEventListener('load', async function (event) {
  fetchTrendyMovies()
    .then(movies => {
      // release_date.slice(0, 1);
      renderMarkup(movies);
    })
    .catch(error => console.log(error));
});

// 2. SearchForm Query searching
function onSearchFormSubmit(e) {
  e.preventDefault();

  const query = e.currentTarget.elements.searchQuery.value;
  const normalizedQuery = query.toLowerCase().trim().split(' ').join('+');
  movieApiService.query = normalizedQuery;
  console.log(typeof movieApiService.query);
  clearCardContainer();
  movieApiService.resetPage();

  onLoadMovies();
  searchFormRef.reset();
}

function onLoadMovies() {
  movieApiService
    .fetchMovies()
    .then(({ results }) => {
      // console.log(results[0].release_date.slice(0, 4));
      renderMarkup(results);
    })
    .catch(error => console.log(error));
}

// Trendy movies and SearchForm Query Markup rendering
function renderMarkup(movies) {
  moviesListRef.insertAdjacentHTML('beforeend', moviesTmpl(movies));
}

// Clear movie cards container
function clearCardContainer() {
  moviesListRef.innerHTML = '';
}
