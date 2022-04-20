import { clearCardContainer } from './search-results';
import emptyWatchedTpl from '../templates/empty-watched.hbs';
import emptyQueueTpl from '../templates/empty-queue.hbs';
import moviesTmpl from '../templates/my-library.hbs';
import { tabLibrary } from '../js/header'
import { makeSkeletonLoader } from './skeleton-loader';

if (localStorage.getItem('watched-movie-list') === null) {
  localStorage.setItem('watched-movie-list', JSON.stringify([]));
}
if (localStorage.getItem('queue-movie-list') === null) {
  localStorage.setItem('queue-movie-list', JSON.stringify([]));
}

const moviesListRef = document.querySelector('.js-movies__list');

function renderWatchedList() {
  clearCardContainer();
  const watchedParse = JSON.parse(localStorage.getItem('watched-movie-list'));

  if (watchedParse.length === 0) {
    emptyWatched();
  } else {
    clearCardContainer();
    watchedParse.map(movieID => {
      fetchLibraryMovie(movieID);
    });
  }
}

function renderQueueList() {
  clearCardContainer();
  const queueParse = JSON.parse(localStorage.getItem('queue-movie-list'));

  if (queueParse.length === 0) {
    emptyQueue();
  } else {
    clearCardContainer();
    queueParse.map(movieID => {
      fetchLibraryMovie(movieID);
    });
  }
}

function fetchLibraryMovie(movieId) {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=387a2500e741e87c896db50117c25d75&language=en-US`;
    return fetch(BASE_URL).then(response => response.json().then((results) => {
        renderMarkup(normalizedData(results));
        makeSkeletonLoader();
    }));
}

function renderMarkup(movies) {
  moviesListRef.insertAdjacentHTML('beforeend', moviesTmpl(movies));
}

function getYear(obj) {
  const date = new Date(obj.release_date);
  let year = obj.release_date ? date.getFullYear() : '';
  return year;
}

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

function libraryButtonCheck() {
  if (tabLibrary.classList.contains('library') && tabLibrary.classList.contains('watched')) {
    renderWatchedList();
  }
  
  if (tabLibrary.classList.contains('library') && tabLibrary.classList.contains('queue')) {
    renderQueueList();
  }
}

export { renderWatchedList, renderQueueList, fetchLibraryMovie, libraryButtonCheck };