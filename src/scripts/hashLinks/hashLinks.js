import $ from 'jquery';
import { isMobile } from '../utils/utils';

export default function HashLinks() {
    const oceanoLinks = {
        init: () => {
          $(document).ready(function(){
              oceanoLinks.ready();
          });
        },

        ready: () => {
          // toolResponsive();
          oceanoLinks.hashChanger.init();
          oceanoLinks.menuOpen();
          oceanoLinks.tabsSelector.init()
        },

        tabsSelector : {
          init : () => {
            oceanoLinks.tabsSelector.clickTabs();
          },

          clickTabs : () => {
            let $btnClick = $('.tabs__selector__box');

            $btnClick.on('click', function(e) {
              e.preventDefault();
              let $this = $(this);
              let rel = $this.attr('rel');
              window.location.hash = '';
              
              if ( !$this.hasClass('active') ) {
                $this.siblings().removeClass('active');
                $this.addClass('active');
                oceanoLinks.tabsSelector.openTab(rel);
              }
            })
          },

          openTab : (el) => {
              $(`#${el}`).siblings().removeClass('active');
              $(`#${el}`).addClass('active');
          },
        },

        // header
        menuOpen : () => {
          const $elAction = $('.menu--hamburger');
          const $body = $('body');

          $elAction.add('.header__links > li a').add('.overlay').on('click', function(e){
              e.preventDefault();
              const $this = $(this);
              $body.toggleClass('openMenu');

              if ( $this.attr('href') !== undefined ) {
                const $href = $this.attr('href');
                // console.log('menuOpen: ', $href)
                // on click change hash
                oceanoLinks.hashChanger.changeHashURL($href);
                oceanoLinks.hashChanger.openBox($href);
              }
          });
        },

        hashChanger: {
          init: () => {
            oceanoLinks.hashChanger.hashManage();
            $(window).on('load', function () {
              // console.log('on load')
              oceanoLinks.hashChanger.onLoad();
            })
          },
          onLoad : () => {
            if ( window.location.hash !== '' ) {
              oceanoLinks.hashChanger.goToTheNexElement();
            }
          },
          changeHashURL : (el) => {
            const destiny = el !== '#contenido' ? '#tabs' : el;
            // console.log('changeHashURL: ', el )
            oceanoLinks.hashChanger.goToTheNexElement(destiny);
            window.location.hash = el;
          },
          hashManage: () => {
            // console.log('hashManage')
            let hash = window.location.hash;
            oceanoLinks.hashChanger.openBox(hash);
          },
          hashChanged: () => {
            $(window).on('hashchange', function( e ) {
              // console.log('hashChanged')
              oceanoLinks.hashChanger.hashManage();
              oceanoLinks.hashChanger.goToTheNexElement();
            }).trigger('hashchange');
          },
          openBox: (el) => {
            // console.log('openBox')
            const hash = el;
            const $boxes =  $('.tabs__wrapper').find('.tabs__wrapper__content');
            const $tabs = $('.tabs__selector').find('.tabs__selector__box');

            const elmentWithOutHash = hash.replace('#', '');

            // si tiene clase active
            if (elmentWithOutHash !== 'contenido' && hash.length !== 0) {
              if ( !$(`.tabs__selector__box[rel="${elmentWithOutHash}"]`).hasClass('active') ) {
                $boxes.removeClass('active');
                $tabs.removeClass('active');
                $(hash).addClass('active');
                $(`.tabs__selector__box[rel="${elmentWithOutHash}"]`).addClass('active');
              } else {
                $(hash).addClass('active');
                $(`.tabs__selector__box[rel="${elmentWithOutHash}"]`).addClass('active');
              }
            }
          },

          goToTheNexElement : ( el = '#tabs') => {
            if ( !window.location.href.indexOf('questions') > 0 ) {
              const isMobileOffset = !isMobile() ?  + 40 : + 100;
              $('html, body').stop().animate({
                scrollTop: $(el).offset().top - isMobileOffset
              }, 250);
            }
          }
      }
    };

    oceanoLinks.init();

};
HashLinks();
