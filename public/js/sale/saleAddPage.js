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


let xxx;

function updateTotalFinalPrice(){

    let total = 0;
    $('input[name^="prices"]').each(function() {

        let price = parseFloat( $( this ).val() ) || 0;
        xxx = $($(this).closest("tr"));
        let quantity = $($(this).closest("tr")).find('input[name="quantitys"]').val() || "0";

        quantity = parseInt(quantity);

        // let quantity = $($(this).closest("tr")).find('input[name="quantitys]');

        console.log("price: ", price);
        console.log("quantity: ", quantity);

        let currentMoney = price * quantity;

        total +=  currentMoney;

        console.log("currentMoney: ", currentMoney);
        console.log("total: ", total);
    });

    console.log("total: ", total);

    $('#totalPrice').val(total);
    $('#finalPrice').val(total);
    
}


function resetDafautInput(e, val){
    const ele = $(e.target.closest("input"));
    
    if(ele.val()){
        console.log("quantity change: ", ele.val());
        updateTotalFinalPrice()
    }else{
        ele.val(val);
    }
}


function updateCustomerForm(customer){

    $("#customerId").val(customer.id);

    $("#customerPhoneNumberIp").val(customer.phone);

    $("#customerDept").val(customer.dept);

    $("#customerName").val(customer.name);
}

function defaultDateNow(){
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $('#createAt').val(today);
}



function initUI(){
    defaultDateNow();
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


        if(!newCustormerPhone){
            alert("Phone number is required");
            return;
        }

        if(!newCustormerName){
            alert("Name is required");
            return;
        }

        if(!newCustormerEmail){
            alert("Email is required");
            return;
        }


    




        let customer = await getCustomerByPhoneNumber(newCustormerPhone);

        if(customer){
            alert("Phone number already exists");
            return;
        }

        customer = await addNewCustomer(newCustormerName, newCustormerPhone, newCustormerEmail, newCustormerAddress);
        

        updateCustomerForm(customer);

        $("#newCustormerName").val("");
        $("#newCustormerPhone").val("");
        $("#newCustormerEmail").val("");
        $("#newCustormerAddress").val("");
    

    })




    $("#saveSaleFormBtn").click(async function(e){
        
        console.log("Save click");


        let success = true;

        if(minStockToSaleRegulation.is_used){

            console.log("Use");
            


            await $('input[name^="quantitys"]').each(function( index ) {
                // console.log("quantity click")
                // console.log( index + ": " + $( this ).val() );

                const quantity = parseInt($( this ).val()) || 0;


                
                if (quantity === 0){
                    $( this ).focus();
                    success = false;
                    // alert("Quantity must be greater than 0")
                    return;
                }

                let minStockToSaleRegulationVal = minStockToSaleRegulation.value;

                console.log("quantity: ", quantity, " min: ", minStockToSaleRegulationVal);


                const oldQuantity = parseInt($( this ).closest("tr").find('input[name="oldQuantitys"]').val()) || 0;

                console.log("oldQuantity: ", $( this ).closest("tr").find('input[name="oldQuantitys"]').val());


                const remainingBook = oldQuantity - quantity;

                console.log("minStockToSaleRegulationVal: ", minStockToSaleRegulationVal);
                console.log("remainingBook: ", remainingBook);

                if(remainingBook < minStockToSaleRegulationVal){
                    const message = "The number of books in stock after selling must be more than " + minStockToSaleRegulationVal;
                    
                    $( this ).focus();
                    // alert(message)
                    success = false;
                    return;
                }

            });
        }


        const customerId = $("#customerId").val();


        const saleDetailTableBody = $("#saleDetailTableBody");

        if(saleDetailTableBody.find(".saleReceiptDetailItemRow").length === 0){
            alert("Please enter book");
            return;
        }
        

        if(!customerId){
            alert("Please enter customer");
            return;
        }


        if(success){
            $("#saleForm").submit();
        }
        
    })

}


/*------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------Global variable-------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */



const saleDetailRowDataSource = $("#saleDetailTableRowTemplate").html();

let currentBookStockIdArr = [];


const MAXIMUM_DEPT_REGULATION_ROUTER = "max-dept";
const MININUM_STOCK_TO_SALE_REGULATION_ROUTER= "min-stock-sale";

let maxDeptRegulation;
let minStockToSaleRegulation;


async function initData(){
    maxDeptRegulation = await getRegulationById(MAXIMUM_DEPT_REGULATION_ROUTER);
    minStockToSaleRegulation = await getRegulationById(MININUM_STOCK_TO_SALE_REGULATION_ROUTER);
}


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


    
    if(bookStock.status !== "active"){
        const message = "This Book stop selling"
        alert(message);
        return;
    }



    // if(minStockToSaleRegulation.is_used){
    //     if (bookStock.quantity >= minStockToSaleRegulation.value){
    //         const message = "Only sale books with inventory less than " + minStockToSaleRegulation.value;
    //         alert(message);

    //         return;
    //     }
    // }





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


        if(maxDeptRegulation.is_used){
            console.log("use luật")
            if (customer.dept > maxDeptRegulation.value){
                const message = `The customer's debt is ${customer.dept}, exceeding  ${maxDeptRegulation.value}`;
                $("#customerId").val("");

                $("#customerDept").val("");
            
                $("#customerName").val("");

                alert(message);
    

                return;
            }
        }
    


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


async function getRegulationById(pathRouter){


    let regulation = null;
    const urlApi = "/regulation/api/" + pathRouter;

    await $.ajax({
        url: urlApi,
        success: function (data){
            regulation = data.value;
            console.log("regulation: ", regulation);
        }
    })




    return regulation;

}




/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Main--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */


$(document).ready(async function() {


    await initData();
    initUI();
    initEvent();
})

/*-------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
