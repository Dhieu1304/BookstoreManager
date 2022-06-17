////////////////////////////////////////////////////////////////////////////////
// Create Table
window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const importReceiptDetailTable = document.getElementById('importReceiptDetailTable');
    if (importReceiptDetailTable) {
        new simpleDatatables.DataTable(importReceiptDetailTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }
});


/*------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------Global variable-------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


const curId = $("#hiddenId").val();

let importTbRowLimit = 0;

let importReceiptDetails = [];
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





/*------------------------------------------------------------------------------------------------------------------------------- */
/*-------------------------------------------------Init UI----------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


function defautSelectFilter(){

    const limitHiddenVal = $("#limitHidden").val();

    if (limitHiddenVal){
        $("#limit option").each(function() {
            if ($(this).val() === limitHiddenVal){
                $(this).attr("selected","selected");
            }    
        });
    }


}


function updateTablePagination(item, clickPageNum){
    const tableData = $("#importTableBody");
    
    let itemPage = $(item).attr('href').split('=')[1];
    urlParams.set("page",itemPage);

    console.log("tableData: ", tableData);

    tableData.html(tableDataTemplate({importReceiptDetails}));
    // console.log("tableData: ",tableData.html());
    console.log("tableData : ", tableDataTemplate({importReceiptDetails}));

    pagination.page = clickPageNum;
    $("#pagination") .html(paginationTemplate({pagination, paginationClass: "pagination"}));
    console.log("pagi: ",$("pagination") .html());

    //Sau khi hiển thị dữ liệu mới, ta load lai page-link
    loadPageLink(urlParams, pathname);


    updatePageIp(pagination.page);
}


function updatePageIp(page){
    $("#pageHidden").val(page);
    $("#pageSpan").html(page);
    
}

function initUI(){

    // In /public/js/general/pagination/pagination.js
    initPagination(urlParams, pathname);

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
        const urlApi = "/api" + "/import/" + curId + "?"+ filter;
        console.log("urlApi: ", urlApi);
    
    
        const clickPageNum = pageHref.split("page=")[1];
        console.log("clickPageNum: ",clickPageNum);
    


        const tableDataAndPagination = await getTableDataAndPagination(urlApi);

        console.log("tableDataAndPagination: ", tableDataAndPagination);

        if (tableDataAndPagination){
            importReceiptDetails = tableDataAndPagination.importReceiptDetails;
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



        let exportUrlParams = new URLSearchParams(location.search);

        console.log("limit: ", limit);

        if(!exportUrlParams.has("limit")){
            exportUrlParams.append("limit", limit);
        }

        if(!exportUrlParams.has("page")){
            exportUrlParams.append("page", page);
        }



        const hrefExportData = `/api/import/${curId}/export?` + exportUrlParams.toString();
        console.log('hrefExportData:', hrefExportData);
        let a = document.createElement("a");
        a.setAttribute('href', hrefExportData);
        a.click();
        a.remove();

    })
}







/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Define function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */




/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

async function getTableDataAndPagination(urlApi){


        
    let pagination = null;
    let importReceiptDetails = null;

    await $.ajax({
        url: urlApi,
        success: function (data){
            console.log("data: ", data);
            console.log("data.pagination: ", data.pagination);
            console.log("data.importReceiptDetails: ", data.importReceiptDetails);

            pagination = data.pagination;
            importReceiptDetails = data.importReceiptDetails;
        }
    })

    console.log("pagination: ", pagination);
    console.log("importReceiptDetails: ", importReceiptDetails);

    if (pagination && importReceiptDetails){
        console.log("succces");
        return {pagination, importReceiptDetails};
    }


    return null;

}



/*------------------------------------------------------------------------------------------------------------------------------- */
/*----------------------------------------------------------Main----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

initDataTemplate();
$(document).ready(async function() {

    console.log("Import detail Page")

    // Init UI

    // await initData();

    initUI();
    

    initEvent();

    

})


