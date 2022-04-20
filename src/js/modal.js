// branch: button-in-modal-window
import modalTemplate from '../templates/movie-description.hbs';
import { genresNames } from './genres-names';
//import { libraryButtonCheck } from './my-library';

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
    workWithLocalStorage();
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
                console.log('already available in Watched');
                addToWatchedEl.textContent = 'remove from watched';
                addToWatchedEl.addEventListener('click', removeFromWatchedList);
            } 
        //libraryButtonCheck();     
        }

        const tempQueue = localStorage.getItem(STORAGE_QUEUE);
        if (tempQueue === null) {
            console.log('STORAGE_QUEUE is empty');
        } else {
            arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
            if (arrayQueue.find(part => part === movieId)) {
                console.log('already available in Queue');
                addToQueueEl.textContent = 'remove from queue';
                addToQueueEl.addEventListener('click', removeFromQueueList);
            } 
        //libraryButtonCheck();     
        }      

        function removeFromWatchedList() {
            const arrayTemp = JSON.parse(localStorage.getItem(STORAGE_WATCHED));
            const index = arrayTemp.indexOf(movieId);
            arrayTemp.splice(index, 1);
            localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayTemp));
            addToWatchedEl.removeEventListener('click', removeFromWatchedList);
            console.log(movieId, 'removed from watched');
        //libraryButtonCheck(); 
        }
        
        function removeFromQueueList() {
        arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
        const index = arrayQueue.indexOf(movieId);
        arrayQueue.splice(index, 1);
        localStorage.setItem(STORAGE_QUEUE,JSON.stringify(arrayQueue));
        addToWatchedEl.removeEventListener('click', removeFromQueueList);
        console.log('removed from queue');
        //libraryButtonCheck();     
        }

    }

    function addToLocalStorage() {

        addToWatchedEl.addEventListener('click', event => {
            addToWatchedList();
            addToWatchedEl.removeEventListener('click', addToWatchedList);
        });
    
        addToQueueEl.addEventListener('click', event => {
            addToQueueList();
            addToWatchedEl.removeEventListener('click', addToQueueList);
        });

        function addToWatchedList() {
            //check if this movie already exists in STORAGE_QUEUE
            const tempQueue = localStorage.getItem(STORAGE_QUEUE);
            if (tempQueue === null) {
                console.log('STORAGE_QUEUE is empty');
            } else {
                arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
                if (arrayQueue.find(part => part === movieId)) {
                    console.log('already available in Queue');
                    const index = arrayQueue.indexOf(movieId);
                    arrayQueue.splice(index, 1);
                    localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
                } else { console.log('not in Queue'); }
            }
            // check STORAGE_WATCHED
            const tempWatched = localStorage.getItem(STORAGE_WATCHED);
            if (tempWatched === null) {
                console.log('STORAGE_WATCHED is empty');
                arrayWatched.push(movieId);
                localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));
                //addToWatchedEl.textContent = 'added to watched';
            } else {

                //check if this movie already exists in STORAGE_WATCHED
                arrayWatched = JSON.parse(localStorage.getItem(STORAGE_WATCHED));
                if (arrayWatched.find(part => part === movieId)) {
                    return console.log('already available in Watched');
                } else {
        
                    arrayWatched.push(movieId);
                    localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));
                    //addToWatchedEl.textContent = 'added to watched';
                }
            }
         //libraryButtonCheck();   
        }
    
        function addToQueueList() {

            //check if this movie already exists in STORAGE_WATCHED
            const tempWatched = localStorage.getItem(STORAGE_WATCHED);
            if (tempWatched === null) {
                console.log('STORAGE_WATCHED is empty');
            } else {
                arrayWatched = JSON.parse(localStorage.getItem(STORAGE_WATCHED));
                if (arrayWatched.find(part => part === movieId)) {
                    console.log('already available in Watched');
                    const index = arrayWatched.indexOf(movieId);
                    arrayWatched.splice(index, 1);
                    localStorage.setItem(STORAGE_WATCHED, JSON.stringify(arrayWatched));
                } else { console.log('not in Watched'); }
            }
    
            const tempQueue = localStorage.getItem(STORAGE_QUEUE);
            if (tempQueue === null) {
                console.log('STORAGE_QUEUE is empty');
                arrayQueue.push(movieId);
                localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
                //addToQueueEl.textContent = 'added to queue';
            } else {
                arrayQueue = JSON.parse(localStorage.getItem(STORAGE_QUEUE));
                if (arrayQueue.find(part => part === movieId)) {
                    return console.log('already available in Queue');
                }
                arrayQueue.push(movieId);
                localStorage.setItem(STORAGE_QUEUE, JSON.stringify(arrayQueue));
                //addToQueueEl.textContent = 'added to queue';
            }
         //libraryButtonCheck();   
        }

    
    }
}
