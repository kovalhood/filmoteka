const header = document.querySelector('.page-header');
const searchArea = document.querySelector('.search-area');
const searchForm = document.querySelector('.search-form');
const libraryButtons = document.querySelector('.library-buttons');
const tabHome = document.querySelector('.tab-home');
const tabLibrary = document.querySelector('.tab-library');

libraryButtons.classList.add('controls-switcher');
tabHome.classList.add('menu__item--current');

tabHome.addEventListener('click', showSearchForm);
tabLibrary.addEventListener('click', showLibraryButtons);

function showSearchForm() {
    tabHome.classList.add('menu__item--current');
    tabLibrary.classList.remove('menu__item--current');
    searchArea.classList.remove('controls-switcher');
    libraryButtons.classList.add('controls-switcher');

    header.classList.add('background--search');
    header.classList.remove('background--library');
}

function showLibraryButtons() {
    tabHome.classList.remove('menu__item--current');
    tabLibrary.classList.add('menu__item--current');
    searchArea.classList.add('controls-switcher');
    libraryButtons.classList.remove('controls-switcher');

    header.classList.remove('background--search');
    header.classList.add('background--library');
}