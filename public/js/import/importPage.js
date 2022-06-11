window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const importTable = document.getElementById('importTable');
    if (importTable) {
        const importDataTable = new simpleDatatables.DataTable(importTable, {
            searchable: false,
            paging: false,
        });

    }

});



/*------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------Global variable-------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

let importTbRowLimit = 0;

let importReceipts = [];
let pagination = null;

const pathname = location.pathname;
let urlParams = new URLSearchParams(location.search);


let tableDataSource; // = $("#tableDataTemplate").html();
let tableDataTemplate; // = Handlebars.compile(tableDataSource);

let paginationSource; // = $("#paginationTemplate").html();
let paginationTemplate; // = Handlebars.compile(paginationSource);



// init data

function initDataTemplate(){
    tableDataSource = $("#tableDataTemplate").html();

    // console.log("tableDataSource: ", tableDataSource);

    tableDataTemplate = Handlebars.compile(tableDataSource);

    // console.log("tableDataTemplate: ", tableDataTemplate);

    paginationSource = $("#paginationTemplate").html();
    // console.log("paginationSource: ", paginationSource);

    paginationTemplate = Handlebars.compile(paginationSource);
    // console.log("paginationTemplate: ", paginationTemplate);
}



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

    

    const typeOfFilter = $("#typeOfFilter").val();

    $(".filter-tab-btn .filter-tab-btn-input-hidden").each(function() {
        if ($(this).val() === typeOfFilter){
            // console.log("this: ", this);
            $(this).closest(".filter-tab-btn").click();
        }    
    });


    




}


function updateTablePagination(item, clickPageNum){
    const tableData = $("#importTableBody");
    
    let itemPage = $(item).attr('href').split('=')[1];
    urlParams.set("page",itemPage);

    console.log("tableData: ", tableData);

    tableData.html(tableDataTemplate({importReceipts}));
    // console.log("tableData: ",tableData.html());
    console.log("tableData : ", tableDataTemplate({importReceipts}));

    pagination.page = clickPageNum;
    $("#pagination") .html(paginationTemplate({pagination, paginationClass: "pagination"}));
    console.log("pagi: ",$("pagination") .html());

    //Sau khi hiển thị dữ liệu mới, ta load lai page-link
    loadPageLink(urlParams, pathname);
}


function initUI(){

    // In /public/js/general/pagination/pagination.js
    initPagination(urlParams, pathname);

    defautSelectYear();
    defautSelectFilter();

}




/*------------------------------------------------------------------------------------------------------------------------------- */
/*-------------------------------------------------init event------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


function initEvent(){
    $("#pagination").on('click', '.page-link', async function(e) {

        console.log("pagination click");
        //Ngăn chặn load lại trang khi click vào page-link
        e.preventDefault();
    
        //item là page-link element
        const item = $(e.target).closest("li").find("a");;
    
        const pageHref = item.attr('href');
    
        //filter là params cùa filter mà ta chọn
        //ta cách ra sau "?" của page-link href
        const filter = pageHref.split("?")[1]
    
        //Url của API
        const urlApi = "/api" + "/import" + "?"+ filter;
        console.log("urlApi: ", urlApi);
    
    
        const clickPageNum = pageHref.split("page=")[1];
        console.log("clickPageNum: ",clickPageNum);
    


        const tableDataAndPagination = await getTableDataAndPagination(urlApi);

        console.log("tableDataAndPagination: ", tableDataAndPagination);

        if (tableDataAndPagination){
            importReceipts = tableDataAndPagination.importReceipts;
            pagination = tableDataAndPagination.pagination;
            updateTablePagination(item, clickPageNum);
        }
        
    })



    $( 'button[data-bs-toggle="pill"]' ).each(function( index ) {
        $(this).on('shown.bs.tab', function (e) {
            const typeOfFilterVal =  $(e.target).closest("button").find('input[type="hidden"]').val();
            console.log("typeOfFilterVal: ", typeOfFilterVal);
            $("#typeOfFilter").val(typeOfFilterVal);

            console.log('$("#typeOfFilter").val(): ', $("#typeOfFilter").val());


          })
        });


    // $("#searchBtn").click(function(){

    // })
}







/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Define function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */




/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

async function getTableDataAndPagination(urlApi){


        
    let pagination = null;
    let importReceipts = null;

    await $.ajax({
        url: urlApi,
        success: function (data){
            console.log("data: ", data);
            console.log("data.pagination: ", data.pagination);
            console.log("data.importReceipts: ", data.importReceipts);

            pagination = data.pagination;
            importReceipts = data.importReceipts;
        }
    })

    console.log("pagination: ", pagination);
    console.log("importReceipts: ", importReceipts);

    if (pagination && importReceipts){
        console.log("succces");
        return {pagination, importReceipts};
    }


    return null;

}

/*------------------------------------------------------------------------------------------------------------------------------- */
/*----------------------------------------------------------Main----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

$(document).ready(async function() {



    // Init UI

    // await initData();

    initUI();
    initDataTemplate();

    initEvent();

    

})
