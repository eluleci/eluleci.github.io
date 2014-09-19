$(function () {

  var isMenuOpen = false;
  var categoryIconList = $('.category-icon-list');
  var categoryList = $('.category-list');
  var closeTrigger = $('.close-trigger');

  categoryIconList.on('mouseenter', function () {

    if (!isMenuOpen) {
      categoryList.css('display', 'block')
      setTimeout(function () {
        categoryList.addClass('selected')
      }, 1);

      closeTrigger.css('display', 'block')
    }
    categoryIconList.addClass('selected')

  })

  $('.category-list .category').on('mouseenter', function () {

    var previouslySelectedItem = $('.category-list .selected')
    var newSelectedItem = $('.' + $(this).attr('category'))

    newSelectedItem.css('display', 'block')
    setTimeout(function () {
      newSelectedItem.addClass('selected')
    }, 1);
    previouslySelectedItem.removeClass('selected')

  })

  var closeMenu = function () {
    categoryIconList.removeClass('selected')

    categoryList.removeClass('selected');
    setTimeout(function () {
      categoryList.css('display', 'none')
    }, 300);

    var currentSelectedItem = $('.post-list.selected')
    currentSelectedItem.removeClass('selected');
    setTimeout(function () {
      currentSelectedItem.css('display', 'none')
    }, 300);

    closeTrigger.css('display', 'none')
  }

  $('.close-button').on('click', function () {
    closeMenu();
  })

  closeTrigger.on('mouseenter', function () {
    closeMenu();
  })

});