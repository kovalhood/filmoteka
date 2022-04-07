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
    searchForm.classList.remove('controls-switcher');
    libraryButtons.classList.add('controls-switcher');
}

function showLibraryButtons() {
    tabHome.classList.remove('menu__item--current');
    tabLibrary.classList.add('menu__item--current');
    searchForm.classList.add('controls-switcher');
    libraryButtons.classList.remove('controls-switcher');
}