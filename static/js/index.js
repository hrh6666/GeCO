window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    $(".navbar-burger").click(function() {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    if (typeof bulmaCarousel !== 'undefined') {
        bulmaCarousel.attach('.carousel', {
            slidesToScroll: 1,
            slidesToShow: 1,
            loop: true,
            infinite: true,
            autoplay: false
        });
    }

    if (typeof bulmaSlider !== 'undefined') {
        bulmaSlider.attach();
    }
});
