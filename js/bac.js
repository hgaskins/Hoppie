(function(module) {

  /*-----------------------------------------------------*\
   * BAC VIEW
  \*-----------------------------------------------------*/
  var bacView = {};

  bacView.button = $('#bacSubmit');
  bacView.audio = $('audio');
  bacView.bacOutput = $('#bacVal');
  bacView.bacOutput1 = $('#bacVal1');

  bacView.unpress = function (){
    bacView.button.removeClass('pressed');
  };

  bacView.calcBac = function () {
    $('#bacSubmit').on('click' , function () {
      var drink = $('#drinksOutput').val();
      var percent = $('#percentageOutput').val();
      var weights = $('#weightOutput').val();
      var hour = $('#hoursOutput').val();
      var bacTotal = ((drink * 12 * percent * 0.075 / weights) - (hour * 0.015));
      var bac = Math.round(bacTotal * 100) / 100;

      if (bac && bac >= 0 && bac <= 0.7){
        bacView.bacOutput1.text('BAC = ' + bac + '%').css('color','black');
      } else if(bac && bac >= 0 && bac > 0.7){
        bacView.bacOutput.text('WARNING YOUR BAC IS ' + bac + '% click on Hoppie for a ride!').css('color','red');
        $('#exampleModal1').foundation('open');
      } else {
        bacView.bacOutput1.text('BAC = 0%').css('color','black');
      }

      bacView.audio.get(0).play();
      bacView.button.addClass('pressed');
      setTimeout(bacView.unpress,3000);
    });
  };

  /*-----------------------------------------------------*\
   * BAC CONTROLLER
  \*-----------------------------------------------------*/
  var bacController = {};

  bacController.index = function() {
    $('.bacPage').show().siblings().hide();
  };

  /*-----------------------------------------------------*\
  * ADD TO WINDOW OBJECT
  \*-----------------------------------------------------*/
  module.bacView = bacView;
  module.bacController = bacController;

})(window);
