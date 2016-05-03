(function(module) {
  var breweriesController = {};

  breweriesController.index = function(ctx, next) {
    $('.breweryPage').show().siblings().hide();

    search.getBreweries(ctx.params.location, search.gotBreweries);
  };

  module.breweriesController = breweriesController;
})(window);
