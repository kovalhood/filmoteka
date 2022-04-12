//import { Pagination } from "tui-pagination";
// const movies = ['.pagenumbers'];

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
const listElement = document.querySelector('.js-movies__list');
let currentPage = 1;
let pageCount;
const pagesOnWindow = 20;
let rows = 7;

function resetCurrentPage() {
currentPage = 1;
 }

 function render(totalPages, listElement) {
  paginationElement.innerHTML = '';
  resetCurrentPage();
  arrowLeft.removeEventListener('click', onArrowLeftClick);
  arrowRight.removeEventListener('click', onArrowRightClick);

   function setupPagination(items, wrapper) {
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
         let btn = paginationButton(i, items);
         wrapper.appendChild(btn);
       }

       if (maxRightPage !== totalPages && i == totalPages) {
         let btn = paginationButton(i, items);
         wrapper.appendChild(btn);
       }

       if (i >= maxLeftPage && i <= maxRightPage) {
         let btn = paginationButton(i, items);
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
      callback(listElement, currentPage);

      let current_btn = document.querySelector('.pagenumbers button.active');
      current_btn.classList.remove('active');

      button.classList.add('active');
      setupPagination(listItems, paginationElement, rows);
      hideExtremeButtons(totalPages);
    });

    return button;
  }


  //arrows function
  function onArrowLeftClick() {
    if (currentPage > 1) {
      currentPage--;
      setupPagination(listItems, paginationElement, rows);
      callback(listElement, currentPage);
    }

    disableArrowBtn(totalPages);
    hideExtremeButtons(totalPages);
  }

  function onArrowRightClick() {
    if (currentPage < totalPages) {
      currentPage++;
      setupPagination(listElement, paginationElement, rows);
      callback(listElement, currentPage);
    }
    inactiveArrow(totalPages);
    hideExtremeButtons(totalPages);
  }

  setupPagination(listItems, paginationElement, rows);
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


