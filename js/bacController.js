(function(module) {
  var bacController = {};

  bacController.index = function() {
    $('.bacPage').show().siblings().hide();
  };
  module.bacController = bacController;
})(window);
