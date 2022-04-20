import { clearCardContainer, clearPreviousResults, renderMarkup, normalizedData, onPageLoad } from "./search-results";
import { makeSkeletonLoader } from './skeleton-loader';
import createPagination from './pagination';

const filterSection = document.querySelector('.section--filter');
const filterInput = document.querySelectorAll('.filter-input');
const genreFilter = document.querySelector('.filter__input--genre');
const yearFilter = document.querySelector('.filter__input--year');

yearPickerFilter();

let genreValue = '';
let yearValue = '';

filterInput.forEach(item => {
    item.addEventListener('change', event => {
        genreValue = genreFilter.value;
        yearValue = yearFilter.value;
        
        createCard(genreValue, yearValue);
    });
});

function createCard(genre, year) {
    let currentPage = 1;
    genreActive();
    yearActive();
    clearFilterButton();
    fetchMovies(genre, year, currentPage).then(results => {
        clearCardContainer();

        // pagination
        const totalResult = results.total_results;
        let currentPage = results.page;
        
        const instance = createPagination();
        instance.setItemsPerPage(20);
        instance.setTotalItems(totalResult);
        instance.movePageTo(currentPage);

        instance.on('afterMove', event => {
            const currentPage = event.page;
            window.scrollTo({ top: 240, behavior: 'smooth' });
            onFilteredMore(genre, year, currentPage);
        });
        
        renderMarkup(normalizedData(results.results));
        
        // Skeleton
        makeSkeletonLoader();
    });
}

async function onFilteredMore(genre, year, currentPage) {
    try {
        const cards = await fetchMovies(genre, year, currentPage);
        const data = cards.results;
        clearPreviousResults();
        renderMarkup(normalizedData(data));
        
        // Skeleton
        makeSkeletonLoader();
    } catch (error) {
        console.log(error);
    }
}

function fetchMovies(genre, year, page) {
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '387a2500e741e87c896db50117c25d75';
    const url = `${BASE_URL}/discover/movie?with_genres=${genre}&primary_release_year=${year}&sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`;
    return fetch(url)
        .then(res => (res.ok ? res.json() : []))
        .catch(error => console.log(error));
}

function yearPickerFilter() {
    let yearStart = 1900;
    let yearEnd = new Date().getFullYear();
    let years = [];
    yearFilter.insertAdjacentHTML('beforeend', '<option class="filter__option" value="">Choose Year</option>');
    for (let i = yearEnd; i > yearStart; i--) {
        years.push(`<option class="filter__option" value="${i}">${i}</option>`);
    }
    yearFilter.insertAdjacentHTML('beforeend', years);
}

function showFilter() {
    filterSection.classList.remove('hidden');
    document.querySelector('.movies').classList.add('section--trending');
}

function hideFilter() {
    filterSection.classList.add('hidden');
    document.querySelector('.movies').classList.remove('section--trending');
}

function clearFilter() {
    genreFilter.value = '';
    yearFilter.value = '';
    document.querySelector('.filter__input--genre').classList.remove('filterActive');
    document.querySelector('.filter__input--year').classList.remove('filterActive');
    document.querySelector('.clear-filter').classList.add('filter-hidden')
}

document.querySelector('.clear-filter').addEventListener('click', clearFilterButtonClick);

function clearFilterButton() {
    if (genreFilter.options[genreFilter.selectedIndex].value != '' || yearFilter.options[yearFilter.selectedIndex].value != '') {
        document.querySelector('.clear-filter').classList.remove('filter-hidden');
    }
    else if (genreFilter.value == '')
    {
        document.querySelector('.clear-filter').classList.add('filter-hidden');
    }
}

function clearFilterButtonClick() {
    clearFilter();
    clearFilterButton();
    clearCardContainer();
    onPageLoad();
}

function genreActive() {
    if (genreFilter.options[genreFilter.selectedIndex].value == '') {
        document.querySelector('.filter__input--genre').classList.remove('filterActive');
    }

    else {
        document.querySelector('.filter__input--genre').classList.add('filterActive');
    }
}

function yearActive() {
    if (yearFilter.options[yearFilter.selectedIndex].value == '') {
        document.querySelector('.filter__input--year').classList.remove('filterActive');
    }

    else {
        document.querySelector('.filter__input--year').classList.add('filterActive');
    }
}

export { clearFilter, hideFilter, showFilter };