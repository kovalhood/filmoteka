// branch: button-in-modal-window

const STORAGE_WATCHED = "watched-movie-list";
const STORAGE_QUEUE = "queue-movie-list";
const addToWatchedEl = document.querySelector("#add-to-list [data-watched]");
const addToQueueEl = document.querySelector("#add-to-list [data-queue]");

addToWatchedEl.addEventListener('click', addToWatchedList)
addToQueueEl.addEventListener('click', addToQueueList)

function addToWatchedList() {
    console.log('added to watched list');
    localStorage.removeItem(STORAGE_QUEUE);
}

function addToQueueList() {
    console.log('added to queue list');
    localStorage.removeItem(STORAGE_WATCHED);  
}
// movie modal container 
const movieOpenBtn = document.querySelector('[data-modal-open-btn]');
const movieCloseBtn = document.querySelector('[data-modal-close-btn]');
const movieBackdrop = document.querySelector('[data-modal-card]');


movieCloseBtn.addEventListener('click', onModalClose);
movieOpenBtn.addEventListener('click', onModalOpen);

function onModalOpen() {
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

