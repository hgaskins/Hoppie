(function(module) {
  var renderDatabaseTableRowTemplate = function(databaseTableRow) {
    var template = Handlebars.compile($('#databaseTableRowTemplate').text());

    return template(databaseTableRow);
  };

  var database = {};

  database.getTerms = function() {
    $.ajax({
      url: '/api/search',
      method: 'GET',
      dataType: 'json'
    }).done(function(data, message, xhr) {
      if (data.length) {
        var $databaseContent = $('.databaseContent');
        var $databaseContentTbody = $databaseContent.find('tbody');

        $databaseContentTbody.html('');

        data.forEach(function(thisSearch) {
          $databaseContentTbody.append(renderDatabaseTableRowTemplate(thisSearch));
        });

        $databaseContent.find('.js-update-record').on('click', function () {
          var $thisButton = $(this);
          var id = $thisButton.attr('data-id');
          var term = $thisButton.parent('.input-group-button').siblings('.input-group-field').val();

          search.updateTerm(id, term, function(data, message, xhr) {
            console.log('Record with an ID of' + id + ' and a term of "' + term + '" was updated.');
          });
        });

        $databaseContent.find('.js-delete-record').on('click', function () {
          var $thisButton = $(this);
          var id = $thisButton.attr('data-id');

          search.deleteTerm(id, function(data, message, xhr) {
            $thisButton.parent().parent().remove();
            console.log('Record with an ID of' + id + ' was deleted.');
          });
        });
      }
    });
  };

  var databaseController = {};

  databaseController.index = function() {
    $('.databasePage').show().siblings().hide();
    database.getTerms();
  };

  module.database = database;
  module.databaseController = databaseController;
}(window));
