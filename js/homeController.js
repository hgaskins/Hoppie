(function(module) {
  var homeController = {};

  homeController.index = function() {
    var $homePage = $('.homePage');
    $homePage.find('.searchResults').empty();
    $homePage.show().siblings().hide();

    $('.js-input-search').val('');
    $('#offCavnas').foundation('close');

    $('.js-button-search').off('click').on('click', function () {
      var $input = $(this).parent('.input-group-button').siblings('.input-group-field');
      var searchValue = $input.val().trim();

      if (searchValue.length) {
        page.redirect('/breweries/' + searchValue.toLowerCase().replace(' ', '-'));
      }
    });
  };

  module.homeController = homeController;
})(window);
