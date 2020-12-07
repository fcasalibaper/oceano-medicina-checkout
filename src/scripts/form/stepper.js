import $, { event } from 'jquery';
import { isMobile } from '../utils/utils';

export default function Stepper() {
  const oceanoStepper = {
    init : () => {
      $(document).ready(function() {
        oceanoStepper.ready()
      })
    },

    ready : () => {
      oceanoStepper.dataEdition.init();
      oceanoStepper.steps.init();
    },

    steps : {
      init: () => {
        oceanoStepper.steps.clickedInput();
      },

      clickedInput: () => {
        const $btn = $('.step').find('label');

        $btn.on('click', function(e) {
          // e.preventDefault();
          const getStepID = $(this).parent().closest('.step').attr('id').match(/\d+/)[0];
          const stepToNum = Number(getStepID);

          oceanoStepper.steps.enabledButton(stepToNum);
          oceanoStepper.steps.nextStep(stepToNum);
          oceanoStepper.steps.goToID(stepToNum);
        })
      },

      enabledButton: (step) => {
        const $buttonQuestion = $('#buttonQuestion');
        const getStepIDs = $('.step');
        const arr = [];

        getStepIDs.map( el => {
          const id = el + 1;
          arr.push(id)
        });

        const lastElement = arr[arr.length - 1];
        if ( step == (lastElement - 1) ) {
          $buttonQuestion.attr('disabled',false);
        }
      },

      nextStep : (step) => {
        const getStepIDs = $('.step');
        const arr = [];

        getStepIDs.map( el => {
          const id = el + 1;
          arr.push(id)
        });

        const lastElement = arr[arr.length - 1];
        if ( step < lastElement ) {
          const nextNum = step + 1;
          const $step = $(`.step#step${nextNum}`);
          $step.addClass('active');
        }
      },

      goToID : (step) => {
        const isMobileOffset = !isMobile() ? + 40 : + 100;
        const nextStep = Number(step) + 1;

        console.log('nextStep: ', `#step${nextStep}`)
        $('html, body').stop().animate({
          scrollTop: $(`#step${nextStep}`).offset().top - isMobileOffset
        }, 250);
      }
    },

    dataEdition: {
      init : () => {
        oceanoStepper.dataEdition.onClick()
      },
      onClick : () => {
        const $data = $('.data');
        const $btn = $data.find('a');
  
        $btn.on('click', function() {
          const $this = $(this);
          // btn changes
          oceanoStepper.dataEdition.headChange($this);
        })
      },
      headChange : (el) => {
        const $data = $('.data');
        const $body = $data.find('.data__body');

        if ( $body.hasClass('active') ) {
          if (!oceanoStepper.dataEdition.validateForm()) {
            el.text('Editar');
            oceanoStepper.dataEdition.inputManage('save');
          }
        } else {
          el.text('Guardar');
          oceanoStepper.dataEdition.inputManage('open');
        }
      },
      validateForm : () => {
        const forms = $('.needs-validation');
        const $data = $('.data');
        const $input = $data.find('input');
        const arr = [];
        $input.each(function() {
          const check = $(this)[0].checkValidity();
          arr.push(check);
        });
        const hasFalse = arr !== [] && Object.keys(arr).some(k => !arr[k]);
        forms.addClass('was-validated');
        return hasFalse
      },
      inputManage : (state) => {
        const $data = $('.data');
        const $span = $data.find('span');
        const $input = $data.find('input');
        const $body = $data.find('.data__body');

        switch (state) {
          case 'save':
            if (!oceanoStepper.dataEdition.validateForm()) {
              $body.removeClass('active');
              $input.each(function() {
                const text = $(this).val().trim();
                const element = $(this).siblings('span').text(text);
                return element
              })
            }
          break;
          case 'open':
            $body.addClass('active');
            $span.each(function() {
              const text = $(this).text().trim();
              const element = $(this).siblings('input').val(text);
              return element
            })
          break;
        }
      },
      
    }
  }

  oceanoStepper.init()
}
Stepper()