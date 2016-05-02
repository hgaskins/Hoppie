(function(module) {
  var routes = {};
  routes.setMapping = function() {
    page.base('/');

    page('', homeController.index);
    page('breweries', breweriesController.index);
    page('about', aboutController.index);
    page('bac', bacController.index);

    page();
  };
  $(document).foundation();
  routes.setMapping();
  module.routes = routes;
})(window);
