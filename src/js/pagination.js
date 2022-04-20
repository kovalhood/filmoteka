import Pagination from 'tui-pagination';

const options = {
  totalItems: 1000,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 5,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a class="tui-page-btn  ">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected  ">{{page}}</strong>',
    moveButton:
      '<a class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const createPagination = () => {
  const container = document.getElementById('tui-pagination-container');
  const instance = new Pagination(container, options);
  return instance;
};

export default createPagination;