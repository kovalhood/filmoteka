import MoviesApiService from '../js/fetch-search'
import { renderMarkup } from './search-results';

//что бы это работало нужно добавить в serch-results :export function renderMarkup(movies) {
//moviesListRef.insertAdjacentHTML('beforeend', moviesTmpl(movies));} 
//export function clearCardContainer() {
  //moviesListRef.innerHTML = '';}
// и в  fetch-search: async fetchMovies() {
  //   const url = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;

  //   const response = await fetch(url, options);
  //   const movies = await response.json();
  //   this.incrementPage();
  //   return movies;
  // }

  // async fetchFilms() {
  //   const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;

  //   const responce = await fetch(URL);

  //   const movies = await responce.json();

  //   console.log(movies)

  //   return movies;
  // }


// Clear movie cards container
export function clearCardContainer() {
  moviesListRef.innerHTML = '';
}

const moviesApi = new MoviesApiService()

console.log(moviesApi)
const Pagination = {

    code: '',

    // converting initialize data
    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
      Pagination.step = data.step || 3;
    },

    // add pages by number (from [s] to [f])
    Add: function(s, f) {
        for (let i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function() {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },

    // add first page with separator
    First: function() {
        Pagination.code += '<a>1</a><i>...</i>';
    },

    // change page
    Click: function() {
        Pagination.page =+this.innerHTML;
        Pagination.Start();
    },

    // previous page
    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        console.log('стрелка назад','-')
        Pagination.Start();
    },

    // next page
    Next:  function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }

        console.log('стрелка вперед', '+')
        moviesApi.fetchFilms(Pagination.page)
        Pagination.Start();
    },



    // binding pages
    Bind: function() {
        let a = Pagination.e.getElementsByTagName('a');
        for (let i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    Start: function() {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },
  
    // binding buttons
    Buttons: function(e) {
        let nav = e.getElementsByTagName('a');
        
      nav[0].addEventListener('click', Pagination.Prev, false);              //.onClick(a.incrementPage(-1));
      nav[1].addEventListener('click', Pagination.Next, false);              //.onClick(a.incrementPage(1));
    },

    // create skeleton
    Create: function(e) {

        let html = [
            '<a class="arrows">&#8592;</a>', // previous button
            '<span></span>',  // pagination container
            '<a class="arrows">&#8594;</a>'  // next button
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },

    // init
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    },

    Render: function (data) {
  //      Pagination.innerHTML = '';
  // arrowLeft.removeEventListener('click', onArrowLeftClick);
  // arrowRight.removeEventListener('click', onArrowRightClick);

        renderMarkup(data)
    }
 
    
};

let init =  function() {
    Pagination.Init(document.getElementById('pagination'), {
      size: 20, // pages size
        page:1 ,  // selected page
        step: 2   // pages before and after current
    });
    
    };

document.addEventListener('DOMContentLoaded', init, false);


//--------------------------------------------------------------------------------------------//

// const paginationElement = document.getElementById('pagination');
// const arrowLeft = document.querySelector('.arrow_left');
// const arrowRight = document.querySelector('.arrow_right');
// const searchFormRef = document.querySelector('.search-form');

// let currentPage = 1;
// let pageCount;
// const pagesOnWindow = 5;
// let rows = 20;

// function resetCurrentPage() {
// currentPage = 1;
//  }



//  function render(totalPages, searchFormRef, callback, searchQuery) {
//   paginationElement.innerHTML = '';
//   resetCurrentPage();
//   arrowLeft.removeEventListener('click', onArrowLeftClick);
//   arrowRight.removeEventListener('click', onArrowRightClick);

//    function setupPagination(movies, wrapper) {
//      wrapper.innerHTML = '';
//      pageCount = pagenumbers;
//      let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
//      let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

//      if (maxLeftPage < 1) {
//        maxLeftPage = 1;
//        maxRightPage = pagesOnWindow;
//      }

//      if (maxRightPage > totalPages) {
//        maxLeftPage = totalPages - (pagesOnWindow - 1);

//        if (maxLeftPage < 1) {
//          maxLeftPage = 1;
//        }
//        maxRightPage = totalPages;
//      }

//      for (let i = 1; i <= totalPages; i++) {
//        if (maxLeftPage !== 1 && i == 1) {
//          let btn = paginationButton(i, movies);
//          wrapper.appendChild(btn);
//        }

//        if (maxRightPage !== totalPages && i == totalPages) {
//          let btn = paginationButton(i, movies);
//          wrapper.appendChild(btn);
//        }

//        if (i >= maxLeftPage && i <= maxRightPage) {
//          let btn = paginationButton(i, movies);
//          wrapper.appendChild(btn);
//        }
//      }
//    }



//   function paginationButton(page) {
//     let button = document.createElement('button');
//     button.innerText = page;

//     if (currentPage == page) button.classList.add('active');

//     button.addEventListener('click', function () {
//       currentPage = page;
//       callback(searchFormRef, currentPage);

//       let current_btn = document.querySelector('.pagenumbers button.active');
//       current_btn.classList.remove('active');

//       button.classList.add('active');
//       setupPagination(movies, paginationElement, rows);
//       hideExtremeButtons(totalPages);
//     });

//     return button;
//   }


//   //arrows function
//   function onArrowLeftClick() {
//     if (currentPage > 1) {
//       currentPage--;
//       setupPagination(movies, paginationElement, rows);
//       callback(searchFormRef, currentPage);
//     }

//     disableArrowBtn(totalPages);
//     hideExtremeButtons(totalPages);
//   }

//   function onArrowRightClick() {
//     if (currentPage < totalPages) {
//       currentPage++;
//       setupPagination(searchFormRef, paginationElement, rows);
//       callback(searchFormRef, currentPage);
//     }
//     inactiveArrow(totalPages);
//     hideExtremeButtons(totalPages);
//   }

//   setupPagination(movies, paginationElement, rows);
//   arrowLeft.onclick = onArrowLeftClick;
//   arrowRight.onclick = onArrowRightClick;

//   hideExtremeButtons(totalPages);
//   inactiveArrow(totalPages);
// }

// // inactive arrows
// function inactiveArrow(totalPages) {
//   if (currentPage === 1) {
//     arrowLeft.classList.add('disabled-arrow');
//   } else {
//     arrowLeft.classList.remove('disabled-arrow');
//   }

//   if (currentPage === totalPages) {
//     arrowRight.classList.add('disabled-arrow');
//   } else {
//     arrowRight.classList.remove('disabled-arrow');
//   }
// }



// // //const pagination = new Pagination('pagination', options);
// import MoviesApiService from '../js/fetch-search'
// import { renderMarkup } from './search-results';

// const moviesApi = new MoviesApiService()

// console.log(moviesApi)


// const Pagination = require('tui-pagination');

// // Browser
// //const Pagination = tui.Pagination;

// export const paginationSettings = {
//   startPage: 1,
//   searchType: null,
//   pagination: null,
//   totalItemsHome: null,
// };

// const container = document.getElementById('pagination');
// // const options = { // below default value of options
// //      totalItems: 10,
// //      itemsPerPage: 10,
// //      visiblePages: 10,
// //      page: 1,
// //      centerAlign: false,
// //     //  firstItemClassName: 'tui-first-child',
// //     //  lastItemClassName: 'tui-last-child',
// //      template: {
// //         //  page: '<a href="#" class="tui-page-btn">{{page}}</a>',
// //         //  currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
// //         //  moveButton:
// //         //      '<a href="#" class="tui-page-btn tui-{{type}}">' +
// //         //          '<span class="tui-ico-{{type}}">{{type}}</span>' +
// //         //      '</a>',
// //         //  disabledMoveButton:
// //         //      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
// //         //          '<span class="tui-ico-{{type}}">{{type}}</span>' +
// //         //      '</span>',
// //         //  moreButton:
// //         //      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
// //         //          '<span class="tui-ico-ellip">...</span>' +
// //         //      '</a>'
// //      }
// // };
// const pagination = new Pagination(container, options);
// paginationSettings.container = pagination;

// pagination.on('afterMove', async ({ page }) => {
//     if (paginationSettings === renderMarkup) {
//       try {
//         const response = await fetchMovies(url, options);
//         // const formattedData = dataFormat(response.results);
//         // setDataToStorageForHome(page, formattedData);
//         renderListCard(formattedData);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     if (paginationSettings=== renderMarkup) {
//       try {
//         const response = await fetchMovies(page);
//         // const formattedData = dataFormat(response.results);
//         // setDataToStorageForMain(formattedData);
//         // renderListCard(formattedData);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   });
//   return pagination
