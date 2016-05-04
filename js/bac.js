// (function(module) {

  var button = $('#bacSubmit');
  var audio = $('audio');

  function unpress(){
    button.removeClass("pressed");
  }

  $('#bacSubmit').on('click' , function () {
    var drink = $('#drinksOutput').val();
    var percent = $('#percentageOutput').val();
    var weights = $('#weightOutput').val();
    var hour = $('#hoursOutput').val();
    var bacTotal = ((drink * 12 * percent * 0.075 / weights) - (hour * 0.015));
    var bac = Math.round(bacTotal * 100) / 100;
    if (bac < 0){
      $('#bacVal').text(0);
    }
    else {
      $('#bacVal').text(bac);
    }
    audio.get(0).play();
    button.addClass('pressed');
    setTimeout(unpress,4000);

  });







//   module.Bac = Bac;
//
// })(window);
