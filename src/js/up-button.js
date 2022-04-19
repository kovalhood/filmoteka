
// действие при нажатии кнопки идти наверх//
document.getElementById("btn-scroll-up").onclick = function scrollUpFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// // //появление кнопки arrowUP2.svg при прокрутки страницы на 500 пикселей 
window.onscroll = function () { scrollFunction() }
// function scrollFunction() {
//     if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
//         document.getElementById("btn-scroll-up").style.display = "block";
//     }
//     else {
//         document.getElementById("btn-scroll-up").style.display="none"}
// }
$(document).ready(function() { 
    let button = $('#btn-scroll-up');	
    $(window).scroll (function () {
      if ($(this).scrollTop () > 300) {
        button.fadeIn();
      } else {
        button.fadeOut();
      }
  });	 
  button.on('click', function(){
  $('body, html').animate({
  scrollTop: 0
  }, 0);
  return false;
  });		 
});



// const fadenIn = (el, timeout, display) => {
//     el.style.opacity = 0;
//     el.style.display = display || 'block';
//     el.style.transition = `opacity ${timeout}ms` || setTimeout(() => {
//         el.style.opacity = 1;
//     }, 10);
// };

// const block =  document.getElementById("btn-scroll-up");
// const btn = document.getElementById("btn-scroll-up");
// btn.addEventListener('click', (e) => {
//     let display = event.currentTarget.style.display
//     if (display = 'none') {
//         fadenIn(block, 1000, 'flex');
//     } else {
//         fadeOut(block, 5000);
//     }
// });

// $(document).ready(function() { 
//     let button = $('#btn-scroll-up');	
//     $(window).scroll (function () {
//       if ($(this).scrollTop () > 300) {
//         button.fadeIn();
//       } else {
//         button.fadeOut();
//       }
//   });	 
//   button.on('click', function(){
//   $('body, html').animate({
//   scrollTop: 0
//   }, 0);
//   return false;
//   });		 
// });
  
// window.addEventListener('scroll', (e) => {
//   window.scrollTo(1,0);
// });
// $(document).ready(function() { 
//     let button = $('#btn-scroll-up');	
//     $(window).scroll (function () {
//       if () {