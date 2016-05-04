// (function(module) {

  function unpress(){
    $('#bacSubmit').removeClass("pressed");
  }

  $('#bacSubmit').on('click' , function () {
    var drink = $('#drinksOutput').val();
    var percent = $('#percentageOutput').val();
    var weights = $('#weightOutput').val();
    var hour = $('#hoursOutput').val();
    var bacTotal = ((drink * 12 * percent * 0.075 / weights) - (hour * 0.015));
    var bac = Math.round(bacTotal * 100) / 100;
    if (bac < 0){
      $('#bacVal').text('BAC = 0%');
    }
    else {
      $('#bacVal').text('BAC = ' + bac + '%');
    }
    $('#bacSubmit').addClass('pressed');
    setTimeout(unpress,3000);

  });







//   module.Bac = Bac;
//
// })(window);
