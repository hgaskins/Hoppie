(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.aboutPage').show().siblings().hide();
    $('#offCavnas').foundation('close');
  };
  module.aboutController = aboutController;
})(window);
