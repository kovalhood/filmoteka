import moviesTmpl from '../templates/movie-card.hbs';
import movieCardDescTmpl from '../templates/movie-description.hbs';
// console.log(moviesTmpl);
import { fetchTrendyMovies } from './fetch-trendy-movies';
import MoviesApiService from './fetch-search';
// console.log(MoviesApiService);

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

//Query movie
movieApiService.fetchMovies().then(res => {
  console.log(res);
  // console.log(page);
});

function onSearchFormSubmit(e) {
  e.preventDefault();
  console.log(e);
  k;
  movieApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  console.log(e.currentTarget.elements.searchQuery.value);

  // movieApiService.fetchMovie().then(data => {
  //   console.log(data);
  // });
}
// Розмітка при загрузці сторінки
window.addEventListener('load', async function (event) {
  fetchTrendyMovies()
    .then(movies => {
      // release_date.slice(0, 1);
      renderMarkup(movies);
    })
    .catch(error => console.log(error));
});
// Rendering Trendy movies
function renderMarkup(movies) {
  moviesListRef.insertAdjacentHTML('beforeend', moviesTmpl(movies));
}

// // fetchTrendyMovies().then(res => {
//   console.log(res[0].release_date);
//   console.log(res[0].release_date.slice(0, 4));
// });
