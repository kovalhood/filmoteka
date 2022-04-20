import moviesTmpl from '../templates/movie-card.hbs';
import { fetchTrendyMovies, fetchGenres } from './fetch-trendy-movies';
import { genresNames } from './genres-names';
import { makeSkeletonLoader } from './skeleton-loader';
import MoviesApiService from './fetch-search';
import createPagination from './pagination';
import { clearFilter, hideFilter } from './filter';

const movieApiService = new MoviesApiService();

const searchFormRef = document.querySelector('.search-form');
const moviesListRef = document.querySelector('.js-movies__list');
const errorRef = document.querySelector('.search__error');
const paginationref = document.querySelector('.pagination-thumb');

let page = 1;
const categories = {
  trending: '/trending/movie/week',
  querySearch: '/search/movie',
  genre: '',
  basic: '&language=en-US&page=1&include_adult=false',
};

searchFormRef.addEventListener('submit', onSearchFormSubmit);

// 1.Розмітка при загрузці сторінки (Trending Movies)
window.addEventListener('load', onPageLoad);

async function onPageLoad(event) {
  fetchTrendyMovies(page)
    .then(results => {
      renderMarkup(normalizedData(results.results));
      // Skeleton
      makeSkeletonLoader();

      // pagination
      const totalResult = results.total_results;
      let currentPage = results.page;

      const instance = createPagination();
      instance.setItemsPerPage(20);
      instance.setTotalItems(totalResult);
      instance.movePageTo(currentPage);

      instance.on('afterMove', event => {
        const currentPage = event.page;
        window.scrollTo({ top: 240, behavior: 'smooth' });
        onTrendyMore(currentPage);
      });
    })
    .catch(error => console.log(error));
}

// clearing results for pagination
function clearPreviousResults() {
  if (moviesListRef.hasChildNodes() === true) {
    moviesListRef.innerHTML = '';
  }
  return;
}

// pagination for trendy results
async function onTrendyMore(currentPage) {
  try {
    const cards = await fetchTrendyMovies(currentPage);
    const data = cards.results;

    clearPreviousResults();

    renderMarkup(normalizedData(data));
    // Skeleton
    makeSkeletonLoader();
  } catch (error) {
    console.log(error);
  }
}

// 2. SearchForm Query searching
function onSearchFormSubmit(e) {
  e.preventDefault();
  clearFilter();
  hideFilter();
  document.querySelector('.tui-pagination').innerHTML = '';

  const query = e.currentTarget.elements.searchQuery.value;
  const normalizedQuery = query.toLowerCase().trim().split(' ').join('+');
  movieApiService.query = normalizedQuery;

  clearCardContainer();
  movieApiService.resetPage();

  onLoadMovies();
}

// Render Markup for Trendy Movies and Query search movies
function onLoadMovies() {
  movieApiService
    .fetchMovies()
    .then(results => {
      renderMarkup(normalizedData(results.results));
      makeSkeletonLoader();

      showNotification(results.results);

      // pagination
      const totalResult = results.total_results;
      let currentPage = results.page;

      const instance = createPagination();
      instance.setItemsPerPage(20);
      instance.setTotalItems(totalResult);
      instance.movePageTo(currentPage);

      instance.on('afterMove', event => {
        const currentPage = event.page;
        window.scrollTo({ top: 240, behavior: 'smooth' });
        onSearchMore(currentPage);
      });
    })
    .catch(error => console.log(error));
}

// pagination for search results
async function onSearchMore(currentPage) {
  try {
    movieApiService.fetchMovies(currentPage).then(results => {
      clearPreviousResults();
      renderMarkup(normalizedData(results.results));
      // Skeleton
      makeSkeletonLoader();
    });
  } catch (error) {
    console.log(error);
  }
}

function renderMarkup(movies) {
  moviesListRef.insertAdjacentHTML('beforeend', moviesTmpl(movies));
}

// Get Year
function getYear(obj) {
  const date = new Date(obj.release_date);
  let year = obj.release_date ? date.getFullYear() : '';
  return year;
}

// Normalize the data for Trendy Movies and Query Search

function normalizedData(results) {
  return results.map(movie => {
    const genres = createGenres(genresNames, movie.genre_ids);
    let listOfGenres = genres[0];

    if (listOfGenres.length > 3) {
      listOfGenres.splice(2, 5, 'Other');
    }

    let objData = {
      ...movie,
      year: getYear(movie),
      genres: listOfGenres,
    };
    return objData;
  });
}

//create the Array/List of Genres (names)
function createGenres(arrayID, genresID) {
  let arrayOfGenres = [];
  return arrayID.map(element => {
    if (genresID.includes(element.id)) {
      arrayOfGenres.push(element.name);
    }
    return arrayOfGenres;
  });
}

// Clear movie cards container
function clearCardContainer() {
  // showWindowSpinner();
  makeSkeletonLoader();
  moviesListRef.innerHTML = '';
}

// Notification Error
function showNotification(results) {
  if (!results.length) {
    errorRef.classList.remove('hidden');
    paginationref.classList.add('hidden');
  } else {
    paginationref.classList.remove('hidden');
  }

  setTimeout(() => {
    errorRef.classList.add('hidden');
  }, 3500);
}

export { onPageLoad, clearCardContainer, clearPreviousResults, renderMarkup, normalizedData };
