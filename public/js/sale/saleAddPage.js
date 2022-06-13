/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
// Create Table
window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const saleReceiptDetailTable = document.getElementById('saleReceiptDetailTable');
    if (saleReceiptDetailTable) {
        new simpleDatatables.DataTable(saleReceiptDetailTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }

    const showBookTable = document.getElementById('showBookTable');
    if (showBookTable) {
        new simpleDatatables.DataTable(showBookTable, {
        
        });
    }


});


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-------------------------------------------------Init UI----------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */



function updateTotalFinalPrice(){

    let total = 0;
    $('input[name^="prices"]').each(function() {
        total += parseFloat( $( this ).val() ) || 0;
    });

    console.log("total: ", total);

    $('#totalPrice').val(total);
    $('#finalPrice').val(total);
    
}


function resetDafautInput(e, val){
    const ele = $(e.target.closest("input"));
    
    if(ele.val()){
        console.log("quantity change: ", ele.val());
    }else{
        ele.val(val);
    }
}


function updateCustomerForm(customer){

    $("#customerId").val(customer.id);

    $("#customerDept").val(customer.dept);

    $("#customerName").val(customer.name);
}

function initUI(){

}
    


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-------------------------------------------------init event------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


function initEvent(){
    
    const isbnIpEle = $("#isbnIp");
    isbnIpEle.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            console.log("Enter");        
            const isbn =  $("#isbnIp").val();
            console.log("isbn:",isbn);
            addSaleDetailTbRow(isbn);
    
        }    
    });
    
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    
    
    const addSaleDetailTbRowBtnEle = $("#addSaleDetailTbRowBtn");
    addSaleDetailTbRowBtnEle.click(function(e){
        console.log("addSaleDetailTbRowBtn click");        
        const isbn =  $("#isbnIp").val();
        console.log("isbn:",isbn);
        addSaleDetailTbRow(isbn);
    })




    const customerPhoneNumberIpEle = $("#customerPhoneNumberIp");

    customerPhoneNumberIpEle.change(function(){

        const phoneNumber = customerPhoneNumberIpEle.val().trim();

        checkCustomerByPhoneNumber(phoneNumber);


    });



    $("#addNewCustomerBtn").click(async function(e){

        
    
        newCustormerPhone = $("#newCustormerPhone").val();
        newCustormerName = $("#newCustormerName").val();
        newCustormerEmail = $("#newCustormerEmail").val();
        newCustormerAddress = $("#newCustormerAddress").val();


        let customer = await getCustomerByPhoneNumber(newCustormerPhone);

        if(customer){
            alert("Số điện thoại đã tồn tại");
            return;
        }

        customer = await addNewCustomer(newCustormerName, newCustormerPhone, newCustormerEmail, newCustormerAddress);
        

        updateCustomerForm(customer);

        $("#newCustormerName").val("");
        $("#newCustormerPhone").val("");
        $("#newCustormerEmail").val("");
        $("#newCustormerAddress").val("");
    

    })


}


/*------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------Global variable-------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */



const saleDetailRowDataSource = $("#saleDetailTableRowTemplate").html();

let currentBookStockIdArr = [];


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Define function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

async function addSaleDetailTbRow(isbn){
    isbn = isbn.trim();
    // const bookStock = bookStocks.find(x => x.book.isbn === isbn);

    let bookStock = null;

    if (isbn !== ""){
        bookStock = await getBookStockByIsbn(isbn);
    }

    console.log(`bookStock của ${isbn} là:`, bookStock);
    const saleDetailTableBodyEle = $("#saleDetailTableBody");


    if(!bookStock){       
        // $("#addNewBookModal").modal('show');
        $("#addNewBookModalBtn").click();
        

        // if($("#newBookIsbn").val() === ""){
            $("#newBookIsbn").val(isbn);
        // }

        return;
    }

    const id = bookStock.id;

    console.log(`id của ${isbn} là:`, id);

    if (currentBookStockIdArr.length == 0){
        saleDetailTableBodyEle.find('tr:first').remove();
    }
    else{
        if (currentBookStockIdArr.includes(id)){
            alert("Đã tồn tạo ISBN");
            return;
        }
    }


    currentBookStockIdArr.push(id);
    // console.log("bookStock:", bookStock);

    console.log("saleDetailRowDataSource: ", saleDetailRowDataSource);

    const tableDataTemplate = Handlebars.compile(saleDetailRowDataSource);

    
    saleDetailTableBodyEle.append(tableDataTemplate(bookStock));

    console.log("row: ",tableDataTemplate(bookStock));    
    updateTotalFinalPrice();

    $("#isbnIp").val("");

}    

function removeSaleReceiptDetailRow(index){
    const row = $("#saleReceiptDetailItem"+index);
    removeBookStockIdIndex = currentBookStockIdArr.indexOf(index);
    currentBookStockIdArr.splice(removeBookStockIdIndex, 1);
    row.remove();

    console.log(currentBookStockIdArr);

    if (currentBookStockIdArr.length == 0){
        const saleDetailTablelBodyEle = $("#saleDetailTabelBody");
        saleDetailTablelBodyEle.append('<tr><td class="dataTables-empty" colspan="9">No entries found</td></tr>')
    }

    updateTotalFinalPrice();
}


async function checkCustomerByPhoneNumber(phoneNumber){
    

    phoneNumber = phoneNumber.trim();


    const customer = await getCustomerByPhoneNumber(phoneNumber);


    console.log("customer: ", customer);

    if(customer){

        updateCustomerForm(customer);

    }else{
        $("#newCustormerPhone").val(phoneNumber);
        addNewCustomerModalBtn.click();
    }



}



/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */



async function getBookStockByIsbn(isbn){

    let bookStock = null;
    await $.ajax({
        url: `/api/stock/isbns/${isbn}`,
        method: 'GET',
        success(data){
            bookStock = data.bookStock;
            console.log(`bookStock của ${isbn} là:`, bookStock);
        }
    });       

    return bookStock;

}




async function getCustomerByPhoneNumber(number){
    let customer = null;
    await $.ajax({
        url: `/api/customer/phone/${number}`,
        method: 'GET',
        success(data){
            customer = data.customer;
            console.log(`customer của ${number} là:`, customer);
        }
    });       

    return customer;
}




async function addNewCustomer(newCustormerName, newCustormerPhone, newCustormerEmail, newCustormerAddress){

    let customer = null;
    await $.ajax({
        url: "/api/customer/add",
        method: 'POST',
        data: {
            newCustormerName,
            newCustormerPhone,
            newCustormerEmail,
            newCustormerAddress
        },
        success(data){    
            customer = data.customer;
            console.log("customer:", customer);

        }
    
    })
    
    return customer;
}



$(document).ready(function() {


    initUI();
    initEvent();
})

/*-------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
