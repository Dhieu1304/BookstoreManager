window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const importTable = document.getElementById('importTable');
    if (importTable) {
        new simpleDatatables.DataTable(importTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }

});
