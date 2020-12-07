import $ from 'jquery';
import { checkIsInScreen, isMobile } from '../utils/utils';

export default function General() {
    const oceano = {
        init: () => {
            $(document).ready(function(){
                oceano.ready();
            }); 
        },

        ready: () => {
            // toolResponsive();
            oceano.onScroll();
            oceano.scrollElement('#referenceFixedPosition');
            oceano.dropDown();
            oceano.openCloseChild();
            oceano.goToElement();
        },

        goToElement: () => {
            const $btnClick = $('.scrollFrom');
            
            $btnClick.on('click', function(e) {
                e.preventDefault();
                const isMobileOffset = !isMobile() ?  + 40 : + 100;
                const ID = $(this).attr('href')
                $('html, body').stop().animate({
                    scrollTop: $(ID).offset().top - isMobileOffset
                }, 250);
            })
        },

        onScroll : () => {
            $('body, html').scroll(function() {
                oceano.scrollElement('#referenceFixedPosition');
            });
        },

        scrollElement : (el) => {
            if ( $(el).length ) {
                const element = checkIsInScreen(el, true)
                const $ref = $('#referenceFixedPosition');
                const $elementToAddFixed = $('#elementToAddFixedPosition')
                if ( element === false ) {
                    $ref.addClass('elementOffset')
                    $elementToAddFixed.addClass('fixedPosition');
                } else {
                    $ref.removeClass('elementOffset');
                    $elementToAddFixed.removeClass('fixedPosition');
                }
            }
        },

        openCloseChild : () => {
            const $btn = $('#clickButton').add('.clickButtonchild');

            $btn.on('click', function (event) {
                $(this).parent().toggleClass('active');
            })
        },

        // Drodown
        dropDown : () => {
            const $btnClick = $('.dropdown--clickEvent');
            $btnClick.on('click', function () {
              $(this).toggleClass('active').find('.dropdown').toggleClass('active')
            })
        },
    };

    oceano.init();

};
General();
