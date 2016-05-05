(function(module) {
  var routes = {};
  routes.setMapping = function() {
    page.base('/');

    page('',breweriesController.index);
    page('breweries', function() {
      page.redirect('/');
    });
    page('breweries/:location', breweriesController.index);
    page('about', aboutController.index);
    page('bac', bacController.index);
    page('*', function() {
      page.redirect('/');
    });

    page();
  };
  $(document).foundation();
  routes.setMapping();
  module.routes = routes;
})(window);
