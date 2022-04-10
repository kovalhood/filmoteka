const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
let currentPage = 1;
let pageCount;
const pagesOnWindow = 7;
let rows = 20;

function resetCurrentPage() {
  currentPage = 1;
}

function render(totalPages, listItems) {
  paginationElement.innerHTML = '';
  resetCurrentPage();
  arrowLeft.removeEventListener('click', onArrowLeftClick);
  arrowRight.removeEventListener('click', onArrowRightClick);

  function setupPagination(items, wrapper) {
    wrapper.innerHTML = '';

    pageCount = totalPages;
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

  //add threeDots
      if (
        totalPages >= 6 &&
        i == 1 &&
        currentPage !== 1 &&
        currentPage !== 2 &&
        currentPage !== 3
      ) {
        const dotsEl = addDotsBlock();
        wrapper.insertBefore(dotsEl, wrapper[wrapper.length - 2]);
      }

      if (
        pageCount >= 7 &&
        i == pageCount - 1 &&
        currentPage !== pageCount &&
        currentPage !== pageCount - 2 &&
        currentPage !== pageCount - 1
      ) {
        const dotsEl = addDotsBlock();
        wrapper.insertBefore(dotsEl, wrapper[1]);
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
      setupPagination(listItems, paginationElement, rows);
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