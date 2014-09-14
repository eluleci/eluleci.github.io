$(function () {

  $('.category-list .category').on('click', function () {

    var previouslySelectedItem = $('.category-list .selected')
    var newSelectedItem = $('.' + $(this).attr('category'))

    if (newSelectedItem.hasClass('selected')) {
      newSelectedItem.removeClass('selected')
      setTimeout(function() {
        newSelectedItem.css('display', 'none')
      }, 300);
    } else {
      newSelectedItem.css('display', 'block')
      setTimeout(function() {
        newSelectedItem.addClass('selected')
      }, 1);
      previouslySelectedItem.removeClass('selected')
    }

  })

});