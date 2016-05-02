(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.homePage').show().siblings().hide();
  };
  module.homeController = homeController;
})(window);
