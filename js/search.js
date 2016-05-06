(function(module) {
  var search = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#breweriesTemplate').text());

    return template(brewery);
  };

  search.getBreweries = function(searchLocation, next) {
    searchLocation = searchLocation.toLowerCase().replace('-', ' ');

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

  search.getTerms = function(request, response) {
    $.ajax({
      url: '/api/search',
      method: 'GET',
      data: { term: request.term },
      dataType: 'json'
    }).done(function(data, message, xhr) {
      response(data.map(function (currentValue) {
        return currentValue.term;
      }));
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

  $('.js-input-search').autocomplete({
    source: search.getTerms
  }).keypress(function(event) {
    if (event.keyCode == 13) {
      var $this = $(this);
      $this.siblings().find('button').click();
      $this.autocomplete('close');
    }
  }).autocomplete('widget').addClass('menu submenu is-dropdown-submenu vertical');

  var searchController = {};

  searchController.index = function(ctx, next) {
    var $homePage = $('.homePage');
    $homePage.find('.searchResults').empty();
    $homePage.show().siblings().hide();

    if (ctx.params.location) {
      $('.js-input-search').val(ctx.params.location.replace('-', ' '));
    }

    $('.js-button-search').off('click').on('click', function () {
      var $input = $(this).parent('.input-group-button').siblings('.input-group-field');
      var searchValue = $input.val().trim();

      if (searchValue.length) {
        page.redirect('/breweries/' + searchValue.toLowerCase().replace(' ', '-'));
      } else {
        $('.searchResults').html('');
        page.redirect('/');
      }
    });

    if (ctx.params.location) {
      search.getBreweries(ctx.params.location, search.gotBreweries);
    }
  };

  module.search = search;
  module.searchController = searchController;
})(window);
