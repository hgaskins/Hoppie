(function(module) {
  var databaseController = {};

  databaseController.index = function() {
    $('.databasePage').show().siblings().hide();
  };

  module.databaseController = databaseController;
}(window));
