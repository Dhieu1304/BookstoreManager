
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


const saleDetailRowDataSource = $("#saleDetailTableRowTemplate").html();

let bookStocks = [];
let customers = [];
let currentBookStockIdArr = [];

$(document).ready(function() {

    $.ajax({
        url: "/api/stock",
        success(data){
            bookStocks = data.bookStocks;
            // console.log("bookStocks:", bookStocks);

            // const isbn = "771878463-0";
            // addNewSaleDetailRow(isbn);
        }

    });


    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });

    const isbnIpEle = $("#isbnIp");

    // Sau khi gõ ISBN, nhấn enter thì nó sẽ insert book vào table
    // Và làm rỗng isbnIpEle
    isbnIpEle.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            
            const isbn = isbnIpEle.val();
            addNewSaleDetailRow(isbn);
            isbnIpEle.val("");
        }

    });

    // $("#addRowBtn").click(function(e){
    //     console.log("addRowBtn click");
    //     console.log("xxx", $("#isbnIp"));
        
    //     const isbn =  $("#isbnIp").val();
    //     console.log("isbn:",isbn);
    //     addNewSaleDetailRow(isbn);
    //     // $("#isbnIp").val("");
    // })
    
    // Sau khi đưa trỏ chuột ra ngoài input của isbnIpEle thì làm rỗng nó.
    isbnIpEle.blur(function(){
        isbnIpEle.val("");
    });


    const customerPhoneNumberIpEle = $("#customerPhoneNumberIp");

    customerPhoneNumberIpEle.blur(function(){

        const phoneNumber = customerPhoneNumberIpEle.val().trim();
        $.ajax({
            url: `/api/customer/phone/${phoneNumber}`,
            success(data){
                const customer = data.customer;
                console.log("customer:", customer);

                if(customer){
                    $("#customerId").val(customer.id);
                }else{
                    alert("Số điện thoại không tồn tại");
                    customerPhoneNumberIpEle.val("");
                }
                
            }

        });
    });

    

})



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
}


function addNewSaleDetailRow(isbn){
    // const isbn = isbnIpEle.val().trim();

    const bookStock = bookStocks.find(x => x.book.isbn === isbn);


    const saleDetailTablelBodyEle = $("#saleDetailTabelBody");


    if(!bookStock){
        return
    }

    const id = bookStock.id;
    if (currentBookStockIdArr.length == 0){
        saleDetailTablelBodyEle.find('tr:first').remove();
    }
    else{
        if (currentBookStockIdArr.includes(id)){
            // console.log("Đã tồn tạo ID");
            return;
        }
    }



    currentBookStockIdArr.push(id);
    // console.log("bookStock:", bookStock);

    // console.log("saleDetailRowDataSource: ", saleDetailRowDataSource);

    const tableDataTemplate = Handlebars.compile(saleDetailRowDataSource);

    
    saleDetailTablelBodyEle.append(tableDataTemplate(bookStock));

    // console.log("row: ",tableDataTemplate(bookStock));    

}    


function resetDafautQuantity(e){
    const quantityEle = $(e.target.closest("input"));
    
    if(quantityEle.val()){
        console.log("quantity change: ", quantityEle.val());
    }else{
        quantityEle.val("0");
    }
}



{/* <tr>
<td><img class="sale-book-img"  src="https://robohash.org/nostrumporroexplicabo.png?size=50x50&set=set1"></td>
<td>Tiger Nixon</td>
<td>System Architect</td>
<td>Edinburgh</td>
<td>61</td>
<td>2011/04/25</td>
<td>$320,800</td>
<td>$320,800</td>
<td>5</td>
<td>
    <button type="button" class="mx-2 btn btn-success custom-btn" data-toggle="modal" data-target="">
        <i class="fa-solid fa-check custom-btn-icon"></i>
    </button>
</td>
</tr> */}

{/* <tr id="saleReceiptDetailItem0">
<td><img class="sale-book-img"  src="https://robohash.org/nostrumporroexplicabo.png?size=50x50&set=set1"></td>
<td>Tiger Nixon</td>
<td>System Architect</td>
<td>Edinburgh</td>
<td>61</td>
<td>2011/04/25</td>
<td>$320,800</td>
<td>$320,800</td>
<td>
    <button type="button" class="mx-2 btn btn-danger custom-btn" onclick="removeSaleReceiptDetailItem(0)">
        <i class="fa-solid fa-trash custom-btn-icon"></i>
    </button>
</td>
</tr> */}