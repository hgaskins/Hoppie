(function(module) {
  var search = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#breweriesTemplate').text());

    return template(brewery);
  };

  search.getBreweries = function(searchLocation, next) {
    var searchLocation = searchLocation.toLowerCase().replace('-', ' ');

    $.ajax({
      url: '/api/yelp/',
      type: 'GET',
      data: { location: searchLocation },
      dataType: 'json'
    }).done(next);
  };

  search.gotBreweries = function(data, message, xhr) {
    if (data.error) {
      page.redirect('/');
    } else {
      data.businesses.forEach(function(thisBusiness) {
        $('.breweryPage').append(render(thisBusiness));
      });
    }
  };

  module.search = search;
})(window);
