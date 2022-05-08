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


$("#isbnIp").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        $("#isbnIp").val("");
    }
});


$("#isbnIp").blur(function(){
    $("#isbnIp").val("");
});