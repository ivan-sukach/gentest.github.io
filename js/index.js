$(document).ready(function () {
  
  let currentQuestion = 0;
  let questions = {
    quest1: {
      questionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a urna sit amet',
      answer: [
      {
        variant: 'Варіант А',
        procent: '57%'
      }, 
      {
        variant: 'Варіант Б', 
        procent: '20%'
      }, 
      {
        variant: 'Варіант В',
        procent: '23%'
      }
      ],
      trueAnswear: 2
    },

    quest2: {
      questionText: 'Lorem ipsum',
      answer: [
        {
          variant: 'Варіант А',
          procent: '77%'
        }, 
        {
          variant: 'Варіант Б', 
          procent: '23%'
        }
       ],
      trueAnswear: 1
    },
     
  };

  let validInputs = {
    inputSex: false,
    inputName: false,
    inputEmail: false,
    inputPassword: false,
    inputConditions: false
  };

  $('.question-btn').on('click', nextQuestion);
  $('body').delegate( '.answer-input[type="radio"]', 'input', answerProcent);

  
  $('.inputSex').on('input blur', checkSex);
  $('#inputName').on('input blur', checkName);
  $('#inputEmail').on('input blur', checkEmail);
  $('#inputPassword').on('input blur', checkPassword);
  $('#inputConditions').on('input click', checkConditions);


  function nextQuestion() {
    currentQuestion++;

    let nextSection = $(this).parents('.section').next('.section');

    // animation
    $(this).parents('.section').addClass('d-none');
    $(this).parents('.section').removeClass('d-show');
    nextSection.removeClass('d-none');
    nextSection.addClass('d-show');
    // --/animation

    if( currentQuestion <= Object.keys(questions).length ){
      $('.question-btn').addClass('btn-hidden');

      let answerLength = Object.keys(questions['quest' + currentQuestion].answer);

      // title
      nextSection.find('.question-title').text(questions['quest' + currentQuestion].questionText);
      // --/title
      nextSection.find('.question-block').html('');

      // answers
      for( let i = 0; i < answerLength.length; i++ ){
        let idLabel = currentQuestion + '_' + i;

        let appendInputWrapper = 
        "<div class=\"input-container\">" +

        "<input class=\"answer-input\" id=\"" + idLabel + "\" type=\"radio\" name=\"answear-"+ currentQuestion +"\">" +
            "<label class=\"answer-label\" for=\"" + idLabel + "\">" +

            questions["quest" + currentQuestion].answer[i].variant +

            "</label>" +
        "</div>"
        ;

        nextSection.find('.question-block').append($(appendInputWrapper));
      }

    } else{
      $('.question-btn').text('End');
    }

  }

  function answerProcent() {
    
    let imageStatistics = $(this).parents('.section').find('.image-statistics');

    let variantId = $(this).attr('id');
        variantId = variantId[variantId.length - 1];
    let variantLetter = questions["quest" + currentQuestion].answer[variantId].variant;
        variantLetter = variantLetter[variantLetter.length - 1];
        
    $('.image-statistics').removeClass('image-statistics-show');
    imageStatistics.find('.image-statistics__percent').text(questions['quest' + currentQuestion].answer[variantId].procent);
    imageStatistics.find('.image-statistics__text strong').text(variantLetter);
    imageStatistics.addClass('image-statistics-show');

    $('.question-btn').removeClass('btn-hidden');

  }



//-------Validation Functions------
  function checkSex() {
    if($(this).is(":not(:checked)") ){
      validInputs.inputSex = false;
      
      validInputsCheck();
    }else{
      validInputs.inputSex = true;
      validInputsCheck();
    }
  }

  function checkName(e) {
    let id = e.target.id,
      thisValue = $(this).val(),
      textExample = /[^a-zA-Zа-яА-ЯІіЬьЇїъЁёы]/;
      
      $(this).removeClass('error-input');
      $(this).siblings('.error-label').removeClass('error-label__show');

      if (textExample.test(thisValue)) {
        thisValue = thisValue.replace(textExample, '');
        e.target.value = thisValue;
      }
     
    if (e.type == "blur"){
      if (e.target.value.length < 2) {
        $(this).addClass('error-input');
        validInputs[id] = false;
        $(this).siblings('.error-label').addClass('error-label__show');
        $(this).val('');
      } else{
        validInputs[id] = true;
      }
      validInputsCheck();
    }
  }

  function checkEmail(e) {
    let id = e.target.id,
      thisValue = $(this).val(),
      emailExample = thisValue.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);

      $(this).removeClass('error-input');
      $(this).siblings('.error-label').removeClass('error-label__show');

      if (e.type == "blur"){
        if (!emailExample) {
          $(this).addClass('error-input');
          validInputs[id] = false;
          $(this).siblings('.error-label').addClass('error-label__show');
          $(this).val('');
        } else{
          validInputs[id] = true;
        }
        validInputsCheck();
      }
  }

  function checkPassword(e) {
    let id = e.target.id,
    thisValue = $(this).val();
    
    $(this).removeClass('error-input');
    $(this).siblings('.error-label').removeClass('error-label__show');

    if (e.type == "blur"){
      if (thisValue.length < 6) {
        $(this).addClass('error-input');
        validInputs[id] = false;
        $(this).siblings('.error-label').addClass('error-label__show');
        $(this).val('');
      } else{
        validInputs[id] = true;
      }
      validInputsCheck();
    }
  }

  function checkConditions(e) {
    let id = e.target.id;

    if($(this).is(":not(:checked)") ){
      validInputs[id] = false;
      validInputsCheck();
    }else{
      validInputs[id] = true;
      validInputsCheck();
    }
  }

  function validInputsCheck() {
    let isValid = 0,
        validInputsLength = Object.keys(validInputs);
    
    for (key in validInputs){
      if(validInputs[key] === true){
        isValid++;
      }
    }
    
    if(isValid == validInputsLength.length ){
      $('.form-btn').removeClass('form-btn__disabled');
      $('.form-btn').removeAttr('disabled');

    } else{
      $('.form-btn').addClass('form-btn__disabled');
      $('.form-btn').attr('disabled');
    }
      
  }


});