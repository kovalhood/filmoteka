// const Pagination = require('tui-pagination');

// const containerPag = document.querySelector('pagination');
// const options = { // below default value of options
//      totalItems: 10,
//      itemsPerPage: 10,
//      visiblePages: 10,
//      page: 1,
//      centerAlign: false,
//      firstItemClassName: 'tui-first-child',
//      lastItemClassName: 'tui-last-child',
//      template: {
//          page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//          currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//          moveButton:
//              '<a href="#" class="tui-page-btn tui-{{type}}">' +
//                  '<span class="tui-ico-{{type}}">{{type}}</span>' +
//              '</a>',
//          disabledMoveButton:
//              '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//                  '<span class="tui-ico-{{type}}">{{type}}</span>' +
//              '</span>',
//          moreButton:
//              '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//                  '<span class="tui-ico-ellip">...</span>' +
//              '</a>'
//      }
// };
// const pagination = new Pagination(String, Object);


// const movies = [''];

// const list_element = document.querySelectorAll('.movies');
// const pagination_element = document.getElementById('pagination');
// let current_page = 1;
// let rows = 5;

// function DisplayList(items, wrapper, rows_per_page, page) {
//     wrapper.innerHTML = "";
//     page--;
//     let start = rows_per_page * page;
//     let end = start + rows_per_page;
//     let paginatedItems = items.slice(start, end);
    
//     for (let i = 0; i < paginatedItems.length; i++) {
//         let item = paginatedItems[i];
//         let item_element = document.createElement('div');
//         item_element.classList.add('item');
//         item_element.innerText = item;
//         wrapper.appendChild(item_element);
//     }
// }

// function SetupPagination(items, wrapper, rows_per_page) {
//     wrapper.innerHTML = "";
//     let page_count = Math.ceil(items.length / rows_per_page);
//     for (let i = 1; i < page_count + 1; i++){
//         let btn = PaginationButton(i, items);
//         wrapper.appendChild(btn)
//     }
// }

// function PaginationButton(page, items) {
//     let button = document.createElement('button');
//     button.innerText = page;
//     if (current_page == page)
//         button.classList.add('active');
//     button.addEventListener('click', function () {
//         current_page = page;
//         DisplayList(items, list_element, rows, current_page);
//         let current_btn = document.querySelector('.pagenumbers button.active');
//         current_btn.classList.remove('active');
//         button.classList.add('active');
//     });
//     return button;
//     }

// DisplayList( movies, list_element, rows, current_page);
// SetupPagination( movies, pagination_element, rows)


const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const searchFormRef = document.querySelector('.search-form');

let currentPage = 1;
let pageCount;
const pagesOnWindow = 5;
let rows = 20;

function resetCurrentPage() {
currentPage = 1;
 }


 
 function render(totalPages, searchFormRef, callback, searchQuery) {
  paginationElement.innerHTML = '';
  resetCurrentPage();
  arrowLeft.removeEventListener('click', onArrowLeftClick);
  arrowRight.removeEventListener('click', onArrowRightClick);

   function setupPagination(movies, wrapper) {
     wrapper.innerHTML = '';
     pageCount = pagenumbers;
     let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
     let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

     if (maxLeftPage < 1) {
       maxLeftPage = 1;
       maxRightPage = pagesOnWindow;
     }

     if (maxRightPage > totalPages) {
       maxLeftPage = totalPages - (pagesOnWindow - 1);

       if (maxLeftPage < 1) {
         maxLeftPage = 1;
       }
       maxRightPage = totalPages;
     }

     for (let i = 1; i <= totalPages; i++) {
       if (maxLeftPage !== 1 && i == 1) {
         let btn = paginationButton(i, movies);
         wrapper.appendChild(btn);
       }

       if (maxRightPage !== totalPages && i == totalPages) {
         let btn = paginationButton(i, movies);
         wrapper.appendChild(btn);
       }

       if (i >= maxLeftPage && i <= maxRightPage) {
         let btn = paginationButton(i, movies);
         wrapper.appendChild(btn);
       }
     }
   }



  function paginationButton(page) {
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) button.classList.add('active');

    button.addEventListener('click', function () {
      currentPage = page;
      callback(searchFormRef, currentPage);

      let current_btn = document.querySelector('.pagenumbers button.active');
      current_btn.classList.remove('active');

      button.classList.add('active');
      setupPagination(movies, paginationElement, rows);
      hideExtremeButtons(totalPages);
    });

    return button;
  }


  //arrows function
  function onArrowLeftClick() {
    if (currentPage > 1) {
      currentPage--;
      setupPagination(movies, paginationElement, rows);
      callback(searchFormRef, currentPage);
    }

    disableArrowBtn(totalPages);
    hideExtremeButtons(totalPages);
  }

  function onArrowRightClick() {
    if (currentPage < totalPages) {
      currentPage++;
      setupPagination(searchFormRef, paginationElement, rows);
      callback(searchFormRef, currentPage);
    }
    inactiveArrow(totalPages);
    hideExtremeButtons(totalPages);
  }

  setupPagination(movies, paginationElement, rows);
  arrowLeft.onclick = onArrowLeftClick;
  arrowRight.onclick = onArrowRightClick;

  hideExtremeButtons(totalPages);
  inactiveArrow(totalPages);
}

// inactive arrows
function inactiveArrow(totalPages) {
  if (currentPage === 1) {
    arrowLeft.classList.add('disabled-arrow');
  } else {
    arrowLeft.classList.remove('disabled-arrow');
  }

  if (currentPage === totalPages) {
    arrowRight.classList.add('disabled-arrow');
  } else {
    arrowRight.classList.remove('disabled-arrow');
  }
}


// function fetchPopularFilmsByPage(page) {
//   newApiService.pageNum = page;
//   return newApiService.insertGenresToMovieObj();
// }
//  function fetchDataOfPopularFilms() {
//   newApiService
//     .fetchPopularArticlesPages()
//     .then(results => {
//       renderPagination(results.total_pages, results.results, displayList);
//     })
//     .catch(err => {
//       console.log('error in function fetchDataOfPopularFilms');
      
//     });
// }


