import modalTemplate from '../templates/movie-description.hbs';
import { genresNames } from './genres-names';
import { libraryButtonCheck } from './my-library';
import { makeSkeletonLoader } from './skeleton-loader';

const movieOpenBtn = document.querySelector('[data-modal-open-btn]');
const movieCloseBtn = document.querySelector('[data-modal-close-btn]');
const movieBackdrop = document.querySelector('[data-modal-card]');
const movieDescription = document.querySelector('.modal__movie-card');
const body = document.querySelector("body");

movieCloseBtn.addEventListener('click', onModalClose);
movieOpenBtn.addEventListener('click', onModalOpen);

let movieId;

function onModalOpen(event) {
  const a = event.target;

  //catching click on li element
  const isCardElement = event.target.closest('li');
  if (!isCardElement) {
    return;
  }

  movieId = isCardElement.getAttribute('data-movie-id');
  event.preventDefault();

  fetchMovieInform();

  movieBackdrop.classList.remove('is-hidden');
  body.style.overflow = "hidden";

  window.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPress);

  function onBackdropClick(event) {
    if (event.target == movieBackdrop) {
      movieDescription.textContent = '';
      movieBackdrop.classList.add('is-hidden');
      body.style.overflow = "auto";
      window.removeEventListener('click', onBackdropClick);
    }
  }

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    if (event.code === ESC_KEY_CODE) {
      movieDescription.textContent = '';
      movieBackdrop.classList.add('is-hidden');
      body.style.overflow = "auto";
      window.removeEventListener('keydown', onEscKeyPress);
    }
  }
}

function onModalClose() {
  movieDescription.textContent = '';
  movieBackdrop.classList.add('is-hidden');
  body.style.overflow = "auto";
}

// rendering movie description
function renderModalMarkUP(movie) {
    movieDescription.textContent = '';
    const markUp = modalTemplate(movie);
    movieDescription.insertAdjacentHTML('beforeend', markUp);
    workWithLocalStorage();
}

//fetch by film ID
function fetchMovieInform() {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=387a2500e741e87c896db50117c25d75&language=en-US`;
  fetch(BASE_URL).then(response =>
    response.json().then(results => {
      renderModalMarkUP(normalizedData(results));

      // Skeleton
      makeSkeletonLoader();
    }),
  );
}

function normalizedData(results) {
  createGenres(genresNames, results.genres);
  return results;
}

function createGenres(arrayID, genresID) {
  let arrayOfGenres = [];
  return arrayID.map(element => {
    if (genresID.includes(element.id)) {
      arrayOfGenres.push(element.name);
    }
    return arrayOfGenres;
  });
}

// work-with-local-storage
function workWithLocalStorage() {
    const STORAGE_WATCHED = "watched-movie-list";
    const STORAGE_QUEUE = "queue-movie-list";
    const addToWatchedEl = document.querySelector(".button--add-watched");
    const addToQueueEl = document.querySelector(".button--add-queue");

    let arrayWatched = [];
    let arrayQueue = [];

    addToLocalStorage();
    removeFromLocalStorage();  

    function removeFromLocalStorage() {

        const tempWatched = localStorage.getItem(STORAGE_WATCHED);
        if (tempWatched === null) {
            console.log('STORAGE_WATCHED is empty');
        } else {
            //check if this movie already exists in STORAGE_WATCHED
            arrayWatched = JSON.parse(localStorage.getItem(STORAGE_WATCHED));
            if (arrayWatched.find(part => part === movieId)) {
                addToWatchedEl.textContent = 'remove from watched';
                addToWatchedEl.addEventListener('click', removeFromWatchedList);
            }    
        }

        const tempQueue = localStorage.getItem(STORAGE_QUEUE);
        if (tempQueue === null) {
            console.log('STORAGE_QUEUE is empty');
        } else {
            arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
            if (arrayQueue.find(part => part === movieId)) {
                addToQueueEl.textContent = 'remove from queue';
                addToQueueEl.addEventListener('click', removeFromQueueList);
            } 
        }      

        function removeFromWatchedList() {
            const arrayTemp = JSON.parse(localStorage.getItem(STORAGE_WATCHED));
            const index = arrayTemp.indexOf(movieId);
            arrayTemp.splice(index, 1);
            localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayTemp));
            addToWatchedEl.removeEventListener('click', removeFromWatchedList);
        libraryButtonCheck(); 
        }
        
        function removeFromQueueList() {
        const arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
        const index = arrayQueue.indexOf(movieId);
        arrayQueue.splice(index, 1);
        localStorage.setItem(STORAGE_QUEUE,JSON.stringify(arrayQueue));
        addToQueueEl.removeEventListener('click', removeFromQueueList);
        libraryButtonCheck();     
        }

    }

    function addToLocalStorage() {

        addToWatchedEl.addEventListener('click', event => {
            addToWatchedList();
            addToWatchedEl.removeEventListener('click', addToWatchedList);
        });
    
        addToQueueEl.addEventListener('click', event => {
            addToQueueList();
            addToQueueEl.removeEventListener('click', addToQueueList);
        });

        function addToWatchedList() {
            //check if this movie already exists in STORAGE_QUEUE
          addToWatchedEl.textContent = 'remove from watched';
          addToQueueEl.textContent = 'add to queue';

            const tempQueue = localStorage.getItem(STORAGE_QUEUE);
            if (tempQueue === null) {
                console.log('STORAGE_QUEUE is empty');
            } else {
                arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
                if (arrayQueue.find(part => part === movieId)) {
                    const index = arrayQueue.indexOf(movieId);
                    arrayQueue.splice(index, 1);
                    
                    localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
                } else { console.log('not in Queue'); }
            }
            // check STORAGE_WATCHED
            const tempWatched = localStorage.getItem(STORAGE_WATCHED);
            if (tempWatched === null) {
                arrayWatched.push(movieId);
                localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));
            } else {

                //check if this movie already exists in STORAGE_WATCHED
                arrayWatched = JSON.parse(localStorage.getItem(STORAGE_WATCHED));
              if (arrayWatched.find(part => part === movieId)) {
                addToWatchedEl.textContent = 'add to watched';
                } else {
        
                    arrayWatched.push(movieId);
                    localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));
                }
            }  
        }
    
        function addToQueueList() {
          addToQueueEl.textContent = 'remove from queue';
          addToWatchedEl.textContent = 'add to watched';

            //check if this movie already exists in STORAGE_WATCHED
            const tempWatched = localStorage.getItem(STORAGE_WATCHED);
            if (tempWatched === null) {
                console.log('STORAGE_WATCHED is empty');
            } else {
                arrayWatched = JSON.parse(localStorage.getItem(STORAGE_WATCHED));
                if (arrayWatched.find(part => part === movieId)) {
                    const index = arrayWatched.indexOf(movieId);
                    arrayWatched.splice(index, 1);
                    localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));
                } else { console.log('not in Watched'); }
            }
    
            const tempQueue = localStorage.getItem(STORAGE_QUEUE);
            if (tempQueue === null) {
                arrayQueue.push(movieId);
                localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
            } else {
                arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
              if (arrayQueue.find(part => part === movieId)) {
                addToQueueEl.textContent = 'add to queue';
              }
              else {
                arrayQueue.push(movieId);
                localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
              }
            }
        }
    }
}
