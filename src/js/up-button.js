$(document).ready(function () {
  var button = $('#btn-scroll-up');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });
  button.on('click', function () {
    $('body, html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});