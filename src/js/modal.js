// branch: button-in-modal-window
import modalTemplate from '../templates/movie-description.hbs';
import { genresNames } from './genres-names';

// const STORAGE_WATCHED = "watched-movie-list";
// const STORAGE_QUEUE = "queue-movie-list";
// const addToWatchedEl = document.querySelector("#add-to-list [data-watched]");
// const addToQueueEl = document.querySelector("#add-to-list [data-queue]");

// addToWatchedEl.addEventListener('click', addToWatchedList)
// addToQueueEl.addEventListener('click', addToQueueList)

// function addToWatchedList() {
//     console.log('added to watched list');
//     localStorage.removeItem(STORAGE_QUEUE);
// }

// function addToQueueList() {
//     console.log('added to queue list');
//     localStorage.removeItem(STORAGE_WATCHED);  
// }

// movie-card modal container 
const movieOpenBtn = document.querySelector('[data-modal-open-btn]');
const movieCloseBtn = document.querySelector('[data-modal-close-btn]');
const movieBackdrop = document.querySelector('[data-modal-card]');
const movieDescription = document.querySelector('.modal__movie-card');

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
    
    fetchMovieInform()

    movieBackdrop.classList.remove('is-hidden');

    window.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onEscKeyPress);

    function onBackdropClick(event) {
        if (event.target == movieBackdrop) {
            movieBackdrop.classList.add('is-hidden');
            window.removeEventListener('click', onBackdropClick);
        };
    };
    
    function onEscKeyPress(event) {
        const ESC_KEY_CODE = 'Escape';
        if (event.code === ESC_KEY_CODE) {
            movieBackdrop.classList.add('is-hidden');
            window.removeEventListener('keydown', onEscKeyPress);
        };
    };
};

function onModalClose() {
   movieBackdrop.classList.add('is-hidden');
};

// rendering movie description
function renderModalMarkUP(movie) {
    movieDescription.textContent = '';
    const markUp = modalTemplate(movie);
    movieDescription.insertAdjacentHTML('beforeend', markUp);
}

//fetch by film ID
function fetchMovieInform() {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=387a2500e741e87c896db50117c25d75&language=en-US`;
    fetch(BASE_URL).then(response => response.json().then((results) => {
        renderModalMarkUP(normalizedData(results));
    console.log(results)
    }));
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