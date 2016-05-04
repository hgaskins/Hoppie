(function(module) {
  var bacController = {};

  bacController.index = function() {
    $('.bacPage').show().siblings().hide();
    $('#offCavnas').foundation('close');
  };
  module.bacController = bacController;
})(window);
