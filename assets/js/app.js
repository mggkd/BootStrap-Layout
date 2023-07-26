$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots : false,
    autoplay : false,
    navText : ['<i class="fa-solid fa-angles-left fa-2x"></i>','<i class="fa-solid fa-angles-right fa-2x"></i>'],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2,
            slideBy : 2
        },
        992: {
            items: 3,
            nav : true,
            slideBy : 3
        }
    }
})