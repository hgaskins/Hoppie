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
      method: 'GET',
      data: { location: searchLocation },
      dataType: 'json'
    }).done(next);
  };

  search.gotBreweries = function(data, message, xhr) {
    if (data.error) {
      $('.searchResults').html('<p class="text-center">' + data.error.text + '</p>');
    } else {
      data.businesses.forEach(function(thisBusiness) {
        $('.searchResults').append(render(thisBusiness));
      });
    }
  };

  search.getTerms = function(term) {
    $.ajax({
      url: '/api/search',
      method: 'GET',
      data: { term: term },
      dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
      console.log('🍞');
    });
  };

  search.addTerm = function(term) {
    $.ajax({
      url: '/api/search',
      method: 'PUT',
      data: { term: term },
      dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };

  search.deleteTerm = function(id) {
    $.ajax({
      url: '/api/search',
      method: 'DELETE',
      data: { id: id },
      dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };

  search.updateTerm = function(term, id) {
    $.ajax({
      url: '/api/search',
      method: 'POST',
      data: { id: id, term: term },
      dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };

  module.search = search;
})(window);
