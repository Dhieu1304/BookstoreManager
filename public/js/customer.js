const urlParams = new URLSearchParams(window.location.search);

const paginationSource = $("#paginationTemplate").html();
const paginationTemplate = Handlebars.compile(paginationSource);

let params = {
    page: 1,
    limit: 5,
    search: '',
};

for (let key in params) {
    if (!urlParams.has(key)) {
        urlParams.append(key, params[key]);
    } else {
        params[key] = urlParams.get(key);
        const el = document.getElementById(`${key}`);
        if (el) {
            el.value = urlParams.get(key);
        }
    }
}

const getAPIData = () => {

    //đẩy param lên thanh url (mặc dù api nhưng vẫn tạo link cho filter)
    for (let key in params) {
        if (!urlParams.has(key)) {
            urlParams.append(key, params[key]);
        } else {
            urlParams.set(key, params[key]);
        }
    }

    let url = '/customer?' + urlParams.toString();
    window.history.pushState({path: url}, '', url);


    $.ajax({
        url: `/customer/api/listCustomer`,
        type: 'post',
        data: params,
        success: function (res) {
            console.log('Data:', res.data);

            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                handleRenderView(res.data);
            }
        }
    });
}

$(function () {
    getAPIData();
});

const handleRenderView = (data) => {

    let render = '';
    const customers = data.customers;
    let customerRow = 0;
    if (customers && customers.length > 0) {
        customers.forEach((item) => {
            customerRow++;
            render +=
                `
                <tr>
                    <td>
                        ${item.name}
                    </td>
                    <td>
                        ${item.phone}
                    </td>
                    <td>
                        ${item.email}
                    </td>
                    <td>
                        ${item.address}
                    </td>
                    <td>
                        ${item.dept}
                    </td>
                </tr>
                `;
        })
    }

    document.getElementById('tbody-table-customer-management').innerHTML = render;

    document.getElementById('hint-text-pagination').innerHTML = `Showing <b>${customerRow}</b> out of <b>${data.pagination.totalRows}</b> entries`

    $("#pagination").html(paginationTemplate({pagination: data.pagination, paginationClass: "pagination"}));
}

$("#pagination").on('click', '.page-link', function (e) {
    e.preventDefault();
    const pageHref = $(e.target).closest("li").find("a").attr('href');
    const clickPageNum = pageHref.split("page=")[1];
    params['page'] = clickPageNum;
    getAPIData();
})

const handleHideShowFilter = () => {
    let filterBtn = document.getElementById('filter-customer');
    if (filterBtn.style.display !== 'none') {
        filterBtn.style.display = 'none';
    } else {
        filterBtn.style.display = 'flex';
    }
}

function handleFilterCustomer() {

    params['page'] = 1;
    params['limit'] = document.getElementById('limit-customer').value;
    params['search'] = document.getElementById('search-customer').value;

    console.log('param: ', params)

    getAPIData();
}

/*
let modalAddNewCustomer = document.getElementById("modalCreateNewCustomer");

function handleShowModalCreateCustomer() {
    modalAddNewCustomer.style.display = "block";
}

function handleCancelModal() {
    modalAddNewCustomer.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modalAddNewCustomer) {
        modalAddNewCustomer.style.display = "none";
    }
}

function handleCreateNewCustomer(event) {
    event.preventDefault();

    console.log("handleCreateNewCustomer");
}
*/
