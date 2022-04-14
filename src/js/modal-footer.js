const modalOpenBtn = document.querySelector('[data-modal-open]');
const closeBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');

modalOpenBtn.addEventListener('click', modalOpen);
closeBtn.addEventListener('click', modalClose);

function modalOpen() {
    modal.classList.remove('is-hidden');

    window.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onEscKeyPress);

    function onBackdropClick(event) {
        if (event.target == modal) {
            modal.classList.add('is-hidden');
            window.removeEventListener('click', onBackdropClick);
        };
    };
    
    function onEscKeyPress(event) {
        const ESC_KEY_CODE = 'Escape';
        if (event.code === ESC_KEY_CODE) {
            modal.classList.add('is-hidden');
            window.removeEventListener('keydown', onEscKeyPress);
        };
    };
};

function modalClose() {
    modal.classList.add('is-hidden');
};

