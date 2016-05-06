 (function(module) {

   var bacController = {};

   bacController.index = function() {
     $('.bacPage').show().siblings().hide();
   };

   var button = $('#bacSubmit');
   var audio = $('audio');
   var bacOutput = $('#bacVal');
   var bacOutput1 = $('#bacVal1');


   function unpress(){
     button.removeClass('pressed');
   }


   $('#bacSubmit').on('click' , function () {
     var drink = $('#drinksOutput').val();
     var percent = $('#percentageOutput').val();
     var weights = $('#weightOutput').val();
     var hour = $('#hoursOutput').val();
     var bacTotal = ((drink * 12 * percent * 0.075 / weights) - (hour * 0.015));
     var bac = Math.round(bacTotal * 100) / 100;
     if (bac && bac >= 0 && bac <= 0.7){
       bacOutput1.text('BAC = ' + bac + '%').css('color','black');
     }else if(bac && bac >= 0 && bac > 0.7){
       bacOutput.text('WARNING YOUR BAC IS ' + bac + '% click on Hoppie for a ride!').css('color','red');
       $('#exampleModal1').foundation('open');
     } else {
       bacOutput1.text('BAC = 0%').css('color','black');
     }
     audio.get(0).play();
     button.addClass('pressed');
     setTimeout(unpress,3000);
   });



   module.bacController = bacController;


 })(window);
