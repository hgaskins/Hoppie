(function(module) {
  var breweriesController = {};

  breweriesController.index = function() {
    $('.breweryPage').show().siblings().hide();

  };
  module.breweriesController = breweriesController;
})(window);
