$(document).ready(function () {
    $('input[type="tel"]').mask('+7(Z00) 000-00-00', { translation: { 'Z': { pattern: /[0-79]/ } } })
    lightGallery(document.getElementById('lightGallery'), {});
/*
    if ($('.lessees_infrastructure input[type="checkbox"]')) {
        var click = function() {
            $('.lessees_infrastructure input[type="checkbox"]').click();
            $('.checkbox_free_zone #busy').click();
        };
        setTimeout(click, 1000);
    }
    */

    $('.faq__item-question').on('click', function() {
        $(this).toggleClass('active')
        $(this).siblings('.faq__item-answer').slideToggle()
    })
    /*  Input animation Start  */
    $('.labelwrap').on('focusout', function () {
      let $label = $(this).find('.label'),
        $input = $(this).find('.input, .textarea');
      $input.val() !== '' ? $label.addClass('label_filled') : $label.removeClass('label_filled');
    }).on('click focusin', function () {
      $(this).find('.label').addClass('label_filled');
    });
    /*  Input animation End  */

    $('.types__item').on('mouseover', function(){
        $('.types__item').removeClass('active')
        $(this).addClass('active')
    })
    $('.price-block__item').on('mouseover', function(){
        $('.price-block__item').removeClass('active')
        $(this).addClass('active')
    })

    $('.catalog-land__checkbox-wrap').on('click', function(){
        $('.catalog-land__checkbox').prop('checked', false)
        $(this).find('.catalog-land__checkbox').prop('checked', true)
    })

    /*  Modal logic Start  */
    $('.open-order').on('click', function(){
        $('.overlay').addClass('active')
        $('.modal_order').addClass('active')
    })
    $('.open-callback').on('click', function(){
        $('.overlay').addClass('active')
        $('.modal_callback').addClass('active')
    })
    $('.modal__close').on('click', function(){
        $('.overlay').removeClass('active')
        $('.modal').removeClass('active')
    })
    $('body').mouseup(function (e) { // событие клика по веб-документу
      let div = $('.modal'); // тут указываем элемент
      if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('.overlay').removeClass('active')
        div.removeClass('active')
      }
    });
    /*  Modal logic End  */
});
