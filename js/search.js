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

  search.getTerms = function(term) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      data: { term: term }
      // dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };

  search.getTerms('something');

  search.addTerm = function(term) {
    $.ajax({
      url: '/api/search',
      type: 'POST',
      data: { term: term }
      // dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };

  search.addTerm('awholenewthing');

  search.gotBreweries = function(data, message, xhr) {
    if (data.error) {
      page.redirect('/');
    } else {
      data.businesses.forEach(function(thisBusiness) {
        $('.searchResults').append(render(thisBusiness));
      });
    }
  };

  module.search = search;
})(window);
