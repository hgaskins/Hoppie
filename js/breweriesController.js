(function(module) {
  var breweriesController = {};

  breweriesController.index = function(ctx, next) {
    $('.breweryPage').empty().show().siblings().hide();

    $('#offCavnas').foundation('close');

    search.getBreweries(ctx.params.location, search.gotBreweries);
  };

  module.breweriesController = breweriesController;
})(window);
