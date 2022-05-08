
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


function removeSaleReceiptDetailItem(index){
    $("#saleReceiptDetailItem"+index).remove();
}






$(document).ready(function() {

    let bookStocks = [];
    $.ajax({
        url: "/api/stock",
        success(data){
            bookStocks = data.bookStocks;
            console.log("bookStocks:", bookStocks);
        }
    });


    const isbnIpEle = $("#isbnIp");

    // Sau khi gõ ISBN, nhấn enter thì nó sẽ insert book vào table
    // Và làm rỗng isbnIpEle
    isbnIpEle.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            const isbn = isbnIpEle.val().trim();

            console.log("isbn:", isbn);

            const bookStock = bookStocks.find(x => x.isbn === isbn);

            console.log("bookStock:", bookStock);


            isbnIpEle.val("");
        }

    });
    
    // Sau khi đưa trỏ chuột ra ngoài input của isbnIpEle thì làm rỗng nó.
    isbnIpEle.blur(function(){
        isbnIpEle.val("");
    });

})

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