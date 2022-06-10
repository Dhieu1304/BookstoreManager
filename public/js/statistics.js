 
////////////////////////////////////////////////////////////////////////////////
// Create Table
window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const statisticsMoneyTable = document.getElementById('statisticsMoneyTable');
    if (statisticsMoneyTable) {
        new simpleDatatables.DataTable(statisticsMoneyTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }

});