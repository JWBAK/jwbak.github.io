$(".about-me-button").click(function() {
    $('html,body').animate({
        scrollTop: $("#me").offset().top},
        'slow');
});