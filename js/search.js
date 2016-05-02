(function(module) {
  var search = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#breweriesTemplate').text());

    return template(brewery);
  };

  search.getBreweries = function(next) {
    $.ajax( {
      url: '/api/yelp/',
      type: 'GET',
      data: {location: 'Portland'},
      dataType: 'json'
    }).done(next);

  };
  search.gotBreweries = function(data, message, xhr) {
    data.businesses.forEach(function(thisBusiness) {
      $('.breweryPage').append(render(thisBusiness));
    });
  };
  search.getBreweries(search.gotBreweries);
  module.search = search;

})(window);
