


// /*------------------------------------------------------------------------------------------------------------------------------- */
// /*--------------------------------------------------Global variable-------------------------------------------------------------- */
// /*------------------------------------------------------------------------------------------------------------------------------- */

let statisticTbRowLimit = 0;

let statistics = [];



async function initData(){

}






/*------------------------------------------------------------------------------------------------------------------------------- */
/*-------------------------------------------------Init UI----------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


function defautSelectYear(){
    $( ".select-year" ).each(function() {

        console.log("this: ", this);

        const today = new Date();
        const curYear = today.getFullYear();

        // $(this).append(`<option selected="selected" value="-1">Tất cả</option>`);
        for (let i = 2010; i < curYear; i++){
            let option = `<option value="${i}">${i}</option>`;
            // console.log("option: ", option);
            $(this).append($(option));
        }
        $(this).append(`<option selected="selected" value="${curYear}">${curYear}</option>`);

    });

}

function defautSelectFilter(){


    const filterMonthHiddenVal = $("#filterMonthHidden").val();

    if (filterMonthHiddenVal){
        $( "#filterMonth option" ).each(function() {
            if ($(this).val() === filterMonthHiddenVal){
                $(this).attr("selected","selected");
            }    
        });
    }

    const filterYearHiddenVal = $("#filterYearHidden").val();

    if (filterYearHiddenVal){
        $("#filterYear option").each(function() {
            if ($(this).val() === filterYearHiddenVal){
                $(this).attr("selected","selected");
            }    
        });
    }




    // const filterMinMonthHiddenVal = $("#filterMinMonthHidden").val();

    // if (filterMinMonthHiddenVal){
    //     $( "#filterMinMonth option" ).each(function() {
    //         if ($(this).val() === filterMinMonthHiddenVal){
    //             $(this).attr("selected","selected");
    //         }    
    //     });
    // }

    // const filterMaxMonthHiddenVal = $("#filterMaxMonthHidden").val();

    // if (filterMaxMonthHiddenVal){
    //     $( "#filterMaxMonth option" ).each(function() {
    //         if ($(this).val() === filterMaxMonthHiddenVal){
    //             $(this).attr("selected","selected");
    //         }    
    //     });
    // }    

    // const filterMinYearHiddenVal = $("#filterMinYearHidden").val();

    // if (filterMinYearHiddenVal){
    //     $("#filterMinYear option").each(function() {
    //         if ($(this).val() === filterMinYearHiddenVal){
    //             $(this).attr("selected","selected");
    //         }    
    //     });
    // }

    // const filterMaxYearHiddenVal = $("#filterMaxYearHidden").val();

    // if (filterMaxYearHiddenVal){
    //     $("#filterMaxYear option").each(function() {
    //         if ($(this).val() === filterMaxYearHiddenVal){
    //             $(this).attr("selected","selected");
    //         }    
    //     });
    // }



    const typeOfFilter = $("#typeOfFilter").val();

    $(".filter-tab-btn .filter-tab-btn-input-hidden").each(function() {
        if ($(this).val() === typeOfFilter){
            console.log("this: ", this);
            $(this).closest(".filter-tab-btn").click();
        }    
    });


}




function initUI(){

    // In /public/js/general/pagination/pagination.j

    defautSelectYear();
    defautSelectFilter();

}




// /*------------------------------------------------------------------------------------------------------------------------------- */
// /*-------------------------------------------------init event------------------------------------------------------------------- */
// /*------------------------------------------------------------------------------------------------------------------------------- */


function initEvent(){
   
    $( 'button[data-bs-toggle="pill"]' ).each(function( index ) {
        $(this).on('shown.bs.tab', function (e) {
            const typeOfFilterVal =  $(e.target).closest("button").find('input[type="hidden"]').val();
            console.log("typeOfFilterVal: ", typeOfFilterVal);
            $("#typeOfFilter").val(typeOfFilterVal);

            console.log('$("#typeOfFilter").val(): ', $("#typeOfFilter").val());


          })
        });

}







// /*------------------------------------------------------------------------------------------------------------------------------- */
// /*-----------------------------------------------Define function----------------------------------------------------------------- */
// /*------------------------------------------------------------------------------------------------------------------------------- */




// /*------------------------------------------------------------------------------------------------------------------------------- */
// /*-----------------------------------------------Ajax function----------------------------------------------------------------- */
// /*------------------------------------------------------------------------------------------------------------------------------- */

/*------------------------------------------------------------------------------------------------------------------------------- */
/*----------------------------------------------------------Main----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

$(document).ready(async function() {



    // Init UI

    // await initData();

    initUI();
    

    initEvent();

    

})
