 (function(module) {

   var bacController = {};

   bacController.index = function() {
     $('.bacPage').show().siblings().hide();
   };


   var button = $('#bacSubmit');
   var audio = $('audio');
   var bacOutput = $('#bacVal');



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
       bacOutput.text('BAC = ' + bac + '%').css('color','black');
       console.log(bac + 'your bac is below .7');
     }else if(bac && bac >= 0 && bac > 0.7){
       bacOutput.text('WARNING YOUR BAC IS ' + bac + '% ').css('color','red');
       console.log(bac + 'WARNING YOURE DRUNK');
     } else {
       bacOutput.text('BAC = 0%').css('color','black');
       console.log(bac + 'your bac is 0');
     }
     audio.get(0).play();
     button.addClass('pressed');
     setTimeout(unpress,3000);

   });



   module.bacController = bacController;


 })(window);
