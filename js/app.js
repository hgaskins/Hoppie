$(document).ready(function() {

  // Init Foundation
  $(this).foundation();

  // Init search
  searchView.handleSearchInput();
  searchView.handleSearchButton();

  // Init BAC
  bacView.calcBac();

  // Init routes
  routes.setMapping();

});
