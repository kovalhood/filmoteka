// import moviesTmpl from './templates/movie-card.hbs';
// import movieDescriptionTmpl from './templates/movie-description.hbs';
// console.log(moviesTmpl);
import MoviesApiService from './fetch-search';
// console.log(MoviesApiService);

const movieApiService = new MoviesApiService();
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '387a2500e741e87c896db50117c25d75';
const imgPath = 'https://image.tmdb.org/t/p/w500';

const searchFormRef = document.querySelector('.search-form');
const moviesListRef = document.querySelector('.js-movies__list');
console.log(searchFormRef);
const categories = {
  trending: '/trending/movie/week',
  querySearch: '/search/movie',
  genre: '',
};

// Розмітка при загрузці сторінки
window.addEventListener('load', async function (event) {
  fetchMovies()
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

//Fetch Trendy Movies
export async function fetchMovies() {
  const response = await fetch(`${BASE_URL}${categories.trending}?api_key=${API_KEY}`);
  const { results } = await response.json();

  //   console.log(results);
  return results;
}
