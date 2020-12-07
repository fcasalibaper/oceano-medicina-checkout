import $ from 'jquery';
import slick from 'slick-carousel';

export default function Carousel() {
    const oceano = {
        init: () => {
          $(document).ready(function(){
              oceano.ready();
          }); 
        },

        ready: () => {
          oceano.carousel.init();
          oceano.carousel.onChange()
        },

        carousel: {
          init : () => {
            oceano.carousel.runCraousel();
            oceano.carousel.prevNextSlides();
          },

          settings : {
            speed: 0,
            zIndex: 1,
            initialSlide: 1,
            swipeToSlide: true,
            focusOnSelect: true,
            infinite: false,
            centerMode: true,
            arrows: true,
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            useCSS: true,
            swipe: true,
            prevArrow: '<a class="slick-prev slick-arrow" rel="right"><i class="icon icon-arr-left-slide"></i></a>',
            nextArrow: '<a class="slick-next slick-arrow" rel="left"><i class="icon icon-arr-right-slide"></i></a>',
            asNavFor: '#slider-thumbs',
            responsive: [{
              breakpoint: 767,
              settings: {
                speed: 250,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                variableWidth: true
              }
            }]
          },

          thumbsSettings : {
            zIndex: 1,
            speed: 150,
            fade: true,
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: false,
            asNavFor: '#slider-images',
          },
          
          runCraousel : () => {
            const $slider = $('#slider-images');
            const $thumbs = $('#slider-thumbs');

            // slider
            $slider.slick(oceano.carousel.settings);

            // thummbs text
            $thumbs.slick(oceano.carousel.thumbsSettings);
            
          },

          onChange : () => {
            const $slider = $('#slider-images');
            const $slide = $slider.find('.slick-slide');

            $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {

              $slide.removeClass('prev')
                    .removeClass('next')
                    .removeClass('left')
                    .removeClass('right');

              oceano.carousel.prevNextSlides(currentSlide, nextSlide)
            })
            
          },

          prevNextSlides : (next = 0, prev = 1) => {
            const $slider = $('#slider-images');
            const $slide = $slider.find('.slick-slide');

            const currentIndex  = $slide.eq(next).attr('data-slick-index');
            const prevIndex     = $slide.eq(prev).attr('data-slick-index');
            const direction     = Number(currentIndex) > Number(prevIndex) ? 'left' : 'right';
            const nextToCurrent = direction === 'left' ? Number(prev) - 1 : Number(prev) + 1;
            const prevToCurrent = direction === 'left' ? Number(prev) + 1 : Number(prev) - 1;

            // si es la siguiente
            if ( !$slide.eq(prev).hasClass('next') ) {
              $slide.eq(nextToCurrent).addClass('next');
            }

            // si es la previa
            if ( !$slide.eq(prev).hasClass('prev') ) {
              $slide.eq(prevToCurrent).addClass('prev')
            }

            // siempre si es iquierda asigna left sino right
            $slide.eq(prev + 1).addClass('right');
            $slide.eq(prev - 1).addClass('left');
          }
        }
    };

    oceano.init();

};
Carousel();
