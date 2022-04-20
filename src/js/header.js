import { onPageLoad, clearCardContainer } from './search-results';
import { renderWatchedList, renderQueueList } from './my-library';
import { clearFilter, hideFilter, showFilter } from './filter';

const header = document.querySelector('.page-header');
const logo = document.querySelector('.logo');
const searchArea = document.querySelector('.search-area');
const formInput = document.querySelector('.search-form__input');
const libraryButtons = document.querySelector('.library-buttons');
const tabHome = document.querySelector('.tab-home');
const tabLibrary = document.querySelector('.tab-library');
const pagination = document.querySelector('.pagination-thumb');
const watchedButton = document.querySelector('.button--watched');
const queueButton = document.querySelector('.button--queue');

libraryButtons.classList.add('controls-switcher');
tabHome.classList.add('menu__item--current');

logo.addEventListener('click', showSearchForm);
tabHome.addEventListener('click', showSearchForm);
tabLibrary.addEventListener('click', showLibraryButtons);
watchedButton.addEventListener('click', watchedButtonClick);
queueButton.addEventListener('click', queueButtonClick);

function showSearchForm() {
    homeUnderline();
    formInput.value = '';
    
    showFilter();
    clearFilter();

    tabLibrary.classList.remove('library');
    tabLibrary.classList.remove('watched');
    tabLibrary.classList.remove('queue');

    pagination.classList.remove('hidden');
    clearCardContainer();
    onPageLoad();
}

function showLibraryButtons() {
    libraryUnderline()

    hideFilter();
    clearFilter();

    tabLibrary.classList.add('library');
    tabLibrary.classList.add('watched');

    pagination.classList.add('hidden');
    clearCardContainer();
    renderWatchedList();
}

function watchedButtonClick() {
    tabLibrary.classList.add('library');
    tabLibrary.classList.add('watched');
    tabLibrary.classList.remove('queue');

    clearCardContainer();
    renderWatchedList();
}

function queueButtonClick() {
    tabLibrary.classList.add('library');
    tabLibrary.classList.remove('watched');
    tabLibrary.classList.add('queue');

    clearCardContainer();
    renderQueueList();
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

export { tabLibrary };