//действие при нажатии кнопки идти наверх//
document.getElementById("btn-scroll-up").onclick = function scrollUpFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//появление кнопки arrowUP2.svg при прокрутки страницы на 500 пикселей 
window.onscroll = function () { scrollFunction() }
function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("btn-scroll-up").style.display = "block";
    }
    else {
        document.getElementById("btn-scroll-up").style.display="none"}
}
