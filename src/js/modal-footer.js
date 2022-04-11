const modalOpen = document.querySelector('[data-modal-open]');
const closeBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');

modalOpen.onclick = function() {
    modal.classList.remove('is-hidden');
}

closeBtn.onclick = function() {
    modal.classList.add('is-hidden');
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add('is-hidden');
    }
}

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 27:
        modal.classList.add('is-hidden');
        break;
    default:
        return; // Do nothing for the rest
  }
};