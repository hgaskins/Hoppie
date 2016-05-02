(function(module) {
  function Bac (opts) {
    Onject.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    }, this);
  }

  module.Bac = Bac;

})(window);
