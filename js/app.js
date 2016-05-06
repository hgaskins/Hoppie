$(document).ready(function() {
  searchView.handleSearchInput();
  searchView.handleSearchButton();
  bacView.calcBac();
  routes.setMapping();

  $(this).foundation();
});
