
function defaultDateNow(){
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    

    $( ".default-date-now" ).each(function() {
            console.log("this default date:", this);
            $(this).val(today);
      });
       

}


