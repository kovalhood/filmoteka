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

