import { onPageLoad, clearCardContainer } from './search-results';
import emptyWatchedTpl from '../templates/empty-watched.hbs';
import emptyQueueTpl from '../templates/empty-queue.hbs';

const header = document.querySelector('.page-header');
const logo = document.querySelector('.logo');
const searchArea = document.querySelector('.search-area');
const searchForm = document.querySelector('.search-form');
const libraryButtons = document.querySelector('.library-buttons');
const tabHome = document.querySelector('.tab-home');
const tabLibrary = document.querySelector('.tab-library');
const moviesContainer = document.querySelector('.movies__container');
const moviesListRef = document.querySelector('.js-movies__list');
const pagination = document.querySelector('.pagination-thumb');
const watchedButton = document.querySelector('.button--watched');
const queueButton = document.querySelector('.button--queue');

libraryButtons.classList.add('controls-switcher');
tabHome.classList.add('menu__item--current');

logo.addEventListener('click', showSearchForm);
tabHome.addEventListener('click', showSearchForm);
tabLibrary.addEventListener('click', showLibraryButtons);
watchedButton.addEventListener('click', emptyWatched);
queueButton.addEventListener('click', emptyQueue);

function showSearchForm() {
    homeUnderline()

    pagination.classList.remove('hidden');
    clearCardContainer();
    onPageLoad();
}

function showLibraryButtons() {
    libraryUnderline ()

    pagination.classList.add('hidden');
    clearCardContainer();
    emptyWatched();
}

function emptyWatched() {
    clearCardContainer();
    moviesListRef.insertAdjacentHTML('beforeend', emptyWatchedTpl());
}
function emptyQueue() {
    clearCardContainer();
    moviesListRef.insertAdjacentHTML('beforeend', emptyQueueTpl());
}

function homeUnderline() {
    tabHome.classList.add('menu__item--current');
    tabLibrary.classList.remove('menu__item--current');
    searchArea.classList.remove('controls-switcher');
    libraryButtons.classList.add('controls-switcher');

    header.classList.add('background--search');
    header.classList.remove('background--library');
}
function libraryUnderline() {
    tabHome.classList.remove('menu__item--current');
    tabLibrary.classList.add('menu__item--current');
    searchArea.classList.add('controls-switcher');
    libraryButtons.classList.remove('controls-switcher');

    header.classList.remove('background--search');
    header.classList.add('background--library');
}