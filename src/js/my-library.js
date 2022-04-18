import { clearCardContainer } from './search-results';
import emptyWatchedTpl from '../templates/empty-watched.hbs';
import emptyQueueTpl from '../templates/empty-queue.hbs';
import moviesTmpl from '../templates/my-library.hbs';

if (localStorage.getItem('watched-movie-list') === null) {
  localStorage.setItem('watched-movie-list', JSON.stringify([]));
}
if (localStorage.getItem('queue-movie-list') === null) {
  localStorage.setItem('queue-movie-list', JSON.stringify([]));
}
const moviesContainer = document.querySelector('.movies__container');
const moviesListRef = document.querySelector('.js-movies__list');
const watchedParse = JSON.parse(localStorage.getItem('watched-movie-list'));
const queueParse = JSON.parse(localStorage.getItem('queue-movie-list'));

function renderWatchedList() {
    clearCardContainer();

  if (watchedParse.length === 0) {
      emptyWatched();
  } else {
      watchedParse.map(movieID => {
          fetchLibraryMovie(movieID);
      });
  }
}

function renderQueueList() {
    clearCardContainer();

  if (queueParse.length === 0) {
      emptyQueue();
  } else {
      queueParse.map(movieID => {
          fetchLibraryMovie(movieID);
      });
  }
}

function fetchLibraryMovie(movieId) {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=387a2500e741e87c896db50117c25d75&language=en-US`;
    return fetch(BASE_URL).then(response => response.json().then((results) => {
        renderMarkup(normalizedData(results));
    }));
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
    let listOfGenres = results.genres;
    if (listOfGenres.length > 3) {
        listOfGenres.splice(2, 5);
        listOfGenres.push({name: 'Other'});
    }

    let objData = {
        ...results,
      year: getYear(results),
    };
    return objData;
}

function emptyWatched() {
    clearCardContainer();
    moviesListRef.insertAdjacentHTML('beforeend', emptyWatchedTpl());
}
function emptyQueue() {
    clearCardContainer();
    moviesListRef.insertAdjacentHTML('beforeend', emptyQueueTpl());
}

export { renderWatchedList, renderQueueList, fetchLibraryMovie };