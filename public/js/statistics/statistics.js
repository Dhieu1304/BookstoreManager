 
////////////////////////////////////////////////////////////////////////////////
// Create Table
window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const statisticTable = document.getElementById('statisticTable');
    if (statisticTable) {
        new simpleDatatables.DataTable(statisticTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }

});