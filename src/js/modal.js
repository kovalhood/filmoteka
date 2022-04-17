// branch: button-in-modal-window
import modalTemplate from '../templates/movie-description.hbs';

// save-to-local-storage

import { fetchTrendyMovies } from './fetch-trendy-movies';

const STORAGE_WATCHED = "watched-movie-list";
const STORAGE_QUEUE = "queue-movie-list";
const addToWatchedEl = document.querySelector("#add-to-list [data-watched]");
const addToQueueEl = document.querySelector("#add-to-list [data-queue]");
const inputEl = document.querySelector("#add-to-list input");
const chooseMovieEl = document.querySelector("#add-to-list [data-choose]");


let arrayWatched = [];
let arrayQueue = [];
let selectedMovie = {};
let amount = 0;

chooseMovieEl.addEventListener('click', chooseMovie);
addToWatchedEl.addEventListener('click', addToWatchedList)
addToQueueEl.addEventListener('click', addToQueueList)

function addToWatchedList() {
//check if this movie already exists in STORAGE_QUEUE
    const tempQueue = localStorage.getItem(STORAGE_QUEUE);
    if (tempQueue === null) {
        return console.log('STORAGE_QUEUE is empty');
    }
    arrayQueue=JSON.parse(localStorage.getItem(STORAGE_QUEUE));
    if (arrayQueue.find(part => part.id === selectedMovie.id)) {
       console.log('already available in Queue');
    } else {console.log('not in Queue');}
    
    
   
    // check STORAGE_WATCHED
    const tempWatched = localStorage.getItem(STORAGE_WATCHED);
    if (tempWatched === null) {
        console.log('STORAGE_WATCHED is empty');
        arrayWatched.push(selectedMovie);
        localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));
    }

    //check if this movie already exists in STORAGE_WATCHED
    arrayWatched=JSON.parse(localStorage.getItem(STORAGE_WATCHED));
    if (arrayWatched.find(part => part.id === selectedMovie.id)) {
        return console.log('already available in Watched');
    };
    arrayWatched.push(selectedMovie);
    localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));

    
    
}

function addToQueueList() {
    const tempQueue = localStorage.getItem(STORAGE_QUEUE);
    if (tempQueue === null) {
        console.log('STORAGE_QUEUE is empty');
        arrayQueue.push(selectedMovie);
        localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
    }
    arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
    if (arrayQueue.find(part => part.id === selectedMovie.id)) {
        return console.log('already available in Queue');
    };
    arrayQueue.push(selectedMovie);
    localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
    
}

function chooseMovie() {
    amount =inputEl.value - 1;
    
    getDataMovie(amount);}

function getDataMovie(amount) {
        fetchTrendyMovies()
        .then(results => {
            selectedMovie = results[amount];    
            console.log(selectedMovie);
            console.log(selectedMovie.id);
            const { id,original_title,vote_average,vote_count,popularity,genre_ids,overview,poster_path } = selectedMovie;
            console.log(id, original_title, vote_average, vote_count, popularity, genre_ids, overview, poster_path);
        });
}



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
    fetch(BASE_URL).then(response => response.json().then(renderModalMarkUP));
}
