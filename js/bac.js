// (function(module) {

  var drinks = $('#drinksOutput')
  var percentage = $('#percentageOutput')
  var weight = $('#weightOutput')
  var hours = $('#hoursOutput')
  console.log("hellothere");
  console.log(drinks);

  $('#bacSubmit').on("click" , function () {
    var drink = drinks.val();
    var percent = percentage.val();
    var weights = weight.val();
    var hour = hours.val();

    var bacTotal = ((drink * 12 * percent * 0.075 / weights) - (hour * 0.015));
    console.log(bacTotal);

  });


//   module.Bac = Bac;
//
// })(window);
