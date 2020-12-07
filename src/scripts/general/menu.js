import $ from 'jquery';
import { isMobile, isAppleDevice } from '../utils/utils';

export default function Menu() {
  const oceano = {
    init: () => {
      $(document).ready(function(){
        oceano.ready();
      }); 
    },

    ready: () => {
      oceano.menuCount()
      oceano.menuMouseleave();
      oceano.mobileMenu();
      oceano.onResize();
      oceano.goToSlide();
    },

    onResize: () => {
      $(window).on('resize', function () {
        oceano.mobileMenu();
      })
    },

    onAppleDevices : () => {
      const isApple = isAppleDevice();

      if (isApple) {
          $('.header__links--courses').addClass('isApple')
      }
    },

    menuCount: () => {
      const $parent = $('.header__menu');
      const $menuBtn = $('.header__menu__btn');
      const $wrapper = $('.header__menu__content');

      const lengthWrapper = $wrapper.find('li').length;
      const wrapEach = 5;
      const divs = $wrapper.find('li');

      if ( lengthWrapper > wrapEach ) {
        for(var i = 0; i < lengthWrapper; i+=wrapEach) {
          divs.slice(i, i+wrapEach).wrapAll("<div class='wrapperEach' />");
        }
      } else {
        $wrapper.find('li').each(function (el) {
        }).wrapAll("<div class='wrapperEach' />");
      }
    },

    mobileMenu: () => {
      const mobileSize = '768px';
      const $menu = $('.header__menu');
      const $menuMobile = $('.header__links');
      const wrapperContent = $('.header__menu__content').html();

      if ( isMobile(mobileSize) ) {
        $menuMobile.length == 0 && $(`<ul class="header__links header__links--courses"><li class="title"><a>Nuestros cursos</a></li><ul>${wrapperContent}</ul></ul>`).insertAfter($menu);
        oceano.onAppleDevices();
      } else {
        $menuMobile.length > 0 && $menuMobile.remove()
      }
    },

    menuMouseleave : () => {
      const $parent = $('.header__menu');
      const $menu = $('.header');

      $menu.mouseleave(function() {
        if ( $parent.hasClass('active') ) {
          $parent.toggleClass('active');
        }
      });
    },

    goToSlide : () => {
      const isMobileOffset = !isMobile() ?  + 40 : + 100;
      const $menu = !isMobile() ? $('.header__menu__content') : $('.header__links--courses');
      const $slider = $('#slider-images');

      $menu.find('li').on('click', function (e) {
        e.preventDefault();
        const slideno = $(this).find('a[data-slide]').data('slide');
        $slider.slick('slickGoTo', slideno - 1);

        // goTo
        if ( !isMobile() ) {
          $('html, body').stop().animate({
            scrollTop: $('#allCourses').offset().top
          }, 250);
        } else {
          $('body').removeClass('openMenu');
          $('html, body').stop().animate({
            scrollTop: $('#allCourses').offset().top - isMobileOffset
        }, 250);
        }
      })
    }
    
  };

  oceano.init();
};
Menu();
