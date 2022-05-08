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
});


