jQuery(function () {
    $('.team').slick({
        arrows: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        speed: 1000,
        easing: 'ease',
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnFocus:true,
        pauseOnHover: true,
        pauseOnDotsHover:true,
    });
});