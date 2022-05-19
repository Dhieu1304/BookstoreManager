
const urlParams = new URLSearchParams(window.location.search);

let params = {
    page: 1,
    role: '',
    limit: 5,
    search: '',
    gender: 'All',
    status: 'All'
};

let currentPage = urlParams.get('page') || 1;
urlParams.set('page', currentPage);

for (let key in params) {
    if (!urlParams.has(key)) {
        urlParams.append(key, params[key]);
    } else {
        params[key] = urlParams.get(key);
    }
}

console.log("params:", params);

const selectOnchange = (id) => {
    const val = document.getElementById(`${id}`).value;
    console.log(val);
    params[`${id}`] = val;
    console.log("params:", params);
}

const handleHideShowFilter = () => {
    let filterBtn = document.getElementById('filter');
    if (filterBtn.style.display !== 'none') {
        filterBtn.style.display = 'none';
    } else {
        filterBtn.style.display = 'flex';
    }
}

const handleFilter = (isReset = true) => {
    if (isReset === true) {
        params['page'] = 1;
        $('#pagination').children('li').eq(0).click();
    }

    params['search'] = document.getElementById('search-input').value;

    for (let key in params) {
        urlParams.append(key, params[key]);
        if (!urlParams.has(key)) {
            urlParams.append(key, params[key]);
        } else {
            urlParams.set(key, params[key]);
        }
    }

    let url = '/account?' + urlParams.toString();
    window.history.pushState({path: url}, '', url);

}

$(function () {
    window.pagObj = $('#pagination').twbsPagination({
        totalPages: 5,
        visiblePages: 3,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
        console.info(page + ' (from event listening)');
        params['page'] = page;
        handleFilter(false);
    });
});
