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

            var $fields = $('input.nroCard, input.venc, input.cvc');
  
            $fields.on('keyup change', function() {
                if (allFilled($fields)) {
                    $('button[type="submit"]').removeAttr('disabled');
                    console.log('llenos')
                }
            });

            function allFilled($fields) 
            {
                return $fields.filter(function() {
                return this.value === ''; 
                }).length == 0;
            }
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
