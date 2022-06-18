window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const billTable = document.getElementById('billTable');
    if (billTable) {
        const billDataTable = new simpleDatatables.DataTable(billTable, {
            searchable: false,
            paging: false,
        });

    }

});



/*------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------Global variable-------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

let billTbRowLimit = 0;

let bills = [];
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


    const orderByHiddenVal = $("#orderByHidden").val();

    if (orderByHiddenVal){
        $("#orderBy option").each(function() {
            if ($(this).val() === orderByHiddenVal){
                $(this).attr("selected","selected");
            }    
        });
    }


    const orderHiddenVal = $("#orderHidden").val();

    if (orderHiddenVal){
        $("#order option").each(function() {
            if ($(this).val() === orderHiddenVal){
                $(this).attr("selected","selected");
            }    
        });
    }
    
    
    const limitHiddenVal = $("#limitHidden").val();

    if (limitHiddenVal){
        $("#limit option").each(function() {
            if ($(this).val() === limitHiddenVal){
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
    const tableData = $("#billTableBody");
    
    let itemPage = $(item).attr('href').split('=')[1];
    urlParams.set("page",itemPage);

    console.log("tableData: ", tableData);

    tableData.html(tableDataTemplate({bills}));
    // console.log("tableData: ",tableData.html());
    console.log("tableData : ", tableDataTemplate({bills}));

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
        const urlApi = "/api" + "/bill" + "?"+ filter;
        console.log("urlApi: ", urlApi);
    
    
        const clickPageNum = pageHref.split("page=")[1];
        console.log("clickPageNum: ",clickPageNum);
    


        const tableDataAndPagination = await getTableDataAndPagination(urlApi);

        console.log("tableDataAndPagination: ", tableDataAndPagination);

        if (tableDataAndPagination){
            bills = tableDataAndPagination.bills;
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

    $("#exportBtn").click(async function(){


        const page = $("#pageHidden").val();
        const limit = $("#limit").val();
        const typeOfFilter = $("#typeOfFilter").val();
        const filterId = $("#filterId").val();
        const filterDate = $("#filterDate").val();
        const filterMonth = $("#filterMonth").val();
        const filterYear = $("#filterYear").val();
        const filterMinDate = $("#filterMinDate").val();
        const filterMaxDate = $("#filterMaxDate").val();
        const orderBy = $("#orderBy").val();
        const order = $("#order").val();


    
        const filter = {
            typeOfFilter : typeOfFilter,
            filterId : filterId,
            filterDate : filterDate,
            filterMonth : filterMonth,
            filterYear : filterYear,
            filterMinDate : filterMinDate,
            filterMaxDate : filterMaxDate,
            orderBy : orderBy,
            order : order,
        }
    

        console.log("1: page: ", page);
        console.log("1: limit: ", limit);
        console.log("1: filter: ", filter);



        let exportUrlParams = new URLSearchParams(location.search);

        console.log("limit: ", limit);

        if(!exportUrlParams.has("limit")){
            exportUrlParams.append("limit", limit);
        }

        if(!exportUrlParams.has("page")){
            exportUrlParams.append("page", page);
        }



        for (let key in filter) {
            if (!exportUrlParams.has(key)) {
                exportUrlParams.append(key, filter[key]);
            } else {
                filter[key] = exportUrlParams.get(key);
            }
        }



        const hrefExportData = '/api/bill/export?' + exportUrlParams.toString();
        console.log('hrefExportData:', hrefExportData);
        let a = document.createElement("a");
        a.setAttribute('href', hrefExportData);
        a.click();
        a.remove();

    });
}







/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Define function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */




/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

async function getTableDataAndPagination(urlApi){


        
    let pagination = null;
    let bills = null;

    await $.ajax({
        url: urlApi,
        success: function (data){
            console.log("data: ", data);
            console.log("data.pagination: ", data.pagination);
            console.log("data.bills: ", data.bills);

            pagination = data.pagination;
            bills = data.bills;
        }
    })

    console.log("pagination: ", pagination);
    console.log("bills: ", bills);

    if (pagination && bills){
        console.log("succces");
        return {pagination, bills};
    }


    return null;

}

/*------------------------------------------------------------------------------------------------------------------------------- */
/*----------------------------------------------------------Main----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

initDataTemplate();
$(document).ready(async function() {



    // Init UI

    // await initData();

    initUI();
    

    initEvent();

    

})
