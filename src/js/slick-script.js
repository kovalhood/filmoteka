jQuery(function () {
    $('.team').slick({
        // arrows:false,
        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        // variableWidth: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                slidesToShow: 1,
                }
            }
        ],
        speed: 1000,
        easing: 'ease',
        // autoplay: true,
        // autoplaySpeed: 30000,
        // pauseOnFocus:false,
        // pauseOnHover: false,
        // pauseOnDotsHover:true,
    });
});