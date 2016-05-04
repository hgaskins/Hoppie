(function(module) {
  var breweriesView = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#breweriesTemplate').text());

    return template(brewery);
  };

  module.breweriesView = breweriesView;
})(window);
