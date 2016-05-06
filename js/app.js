$(document).ready(function() {
  $(this).foundation();

  searchView.handleSearchInput();
  searchView.handleSearchButton();

  routes.setMapping();
});
