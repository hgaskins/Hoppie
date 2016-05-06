(function(module) {
  var routes = {};

  routes.notFound = function () {
    page.redirect('/');
  };

  routes.setMapping = function() {
    page.base('/');
    page('', searchController.index);
    page('breweries', routes.notFound);
    page('breweries/:location', searchController.index);
    page('about', aboutController.index);
    page('bac', bacController.index);
    page('database', databaseController.index);
    page('*', routes.notFound);
    page();
  };

  module.routes = routes;
})(window);
