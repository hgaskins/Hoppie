(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.aboutPage').show().siblings().hide();
  };
  module.aboutController = aboutController;
})(window);
