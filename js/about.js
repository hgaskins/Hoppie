(function(module) {

  /*-----------------------------------------------------*\
   * ABOUT CONTROLLER
  \*-----------------------------------------------------*/
  var aboutController = {};

  aboutController.index = function() {
    $('.aboutPage').show().siblings().hide();
  };

  /*-----------------------------------------------------*\
   * ADD TO WINDOW OBJECT
  \*-----------------------------------------------------*/
  module.aboutController = aboutController;

})(window);
