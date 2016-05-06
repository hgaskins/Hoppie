$(document).ready(function() {
  $(this).foundation();

  searchView.handleSearchInput();
  searchView.handleSearchButton();
  bacView.calcBac();
  routes.setMapping();
});
