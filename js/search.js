(function(module) {
  function Search (opts) {
    Onject.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    }, this);
  }

  module.Search = Search;

})(window);
