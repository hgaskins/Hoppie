(function(module) {
  var breweriesController = {};

  breweriesController.index = function(ctx, next) {
    var $homePage = $('.homePage');
    $homePage.find('.searchResults').empty();
    $homePage.show().siblings().hide();

    $('.js-input-search').val(ctx.params.location.replace('-', ' '));
    $('#offCavnas').foundation('close');

    $('.js-button-search').off('click').on('click', function () {
      var $input = $(this).parent('.input-group-button').siblings('.input-group-field');
      var searchValue = $input.val().trim();

      if (searchValue.length) {
        page.redirect('/breweries/' + searchValue.toLowerCase().replace(' ', '-'));
      } else {
        $('.searchResults').html('');
        page.redirect('/');
      }
    });

    search.getBreweries(ctx.params.location, search.gotBreweries);
  };

  module.breweriesController = breweriesController;
})(window);
