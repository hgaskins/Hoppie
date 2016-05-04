(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.homePage').show().siblings().hide();

    $('#offCavnas').foundation('close');

    $('.js-button-search').off('click').on('click', function () {
      $button = $(this).parent('.input-group-button').siblings('.input-group-field');
      var searchValue = $button.val().trim();

      if (searchValue.length) {
        page.redirect('/breweries/' + searchValue.toLowerCase().replace(' ', '-'));
        // $button.val('');
      }
    });
  };

  module.homeController = homeController;
})(window);
