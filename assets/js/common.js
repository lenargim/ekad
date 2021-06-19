$(document).ready(function () {
    /*
    lightGallery(document.getElementById('lightGallery'), {
        });

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

    $('.labelwrap').on('focusout', function () {
      let $label = $(this).find('.label'),
        $input = $(this).find('.input, .textarea');
      $input.val() !== '' ? $label.addClass('label_filled') : $label.removeClass('label_filled');
    }).on('click focusin', function () {
      $(this).find('.label').addClass('label_filled');
    });

    $('.types__item').on('mouseover', function(){
        $('.types__item').removeClass('active')
        $(this).addClass('active')
    })
    $('.price-block__item').on('mouseover', function(){
        $('.price-block__item').removeClass('active')
        $(this).addClass('active')
    })
});
