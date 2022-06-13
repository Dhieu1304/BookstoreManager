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
            // console.log('Data:', res.data);

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

const handleRenderView = (resData) => {

    let render = '';
    const customers = resData.customers;
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
                    <td>
                        <div onclick="handleShowModalEdit(${item.id})">
                            <span href="#" class="edit-account" title="Edit" data-toggle="tooltip">
                                <i class="fas fa-user-edit"></i>
                            </span>
                        </div>
                    </td>
                </tr>
                `;
        })
    }

    document.getElementById('tbody-table-customer-management').innerHTML = render;

    document.getElementById('hint-text-pagination').innerHTML = `Showing <b>${customerRow}</b> out of <b>${resData.pagination.totalRows}</b> entries`

    $("#pagination").html(paginationTemplate({pagination: resData.pagination, paginationClass: "pagination"}));
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

const handleFilterCustomer = () => {

    params['page'] = 1;
    params['limit'] = document.getElementById('limit').value;
    params['search'] = document.getElementById('search').value;

    console.log('param: ', params);
    getAPIData();
}

const handleExportCustomer = () => {
    const hrefExportData = '/customer/exportExcel?' + urlParams.toString();
    console.log('hrefExportData:', hrefExportData);
    let a = document.createElement("a");
    a.setAttribute('href', hrefExportData);
    a.click();
    a.remove();
}

const modalEdit = document.getElementById("modalEditCustomer");

const handleShowModalEdit = (id) => {
    console.log(id);

    $.ajax({
        url: `/customer/api/customerDetail`,
        type: 'post',
        data: {id},
        success: function (res) {
            console.log('Data:', res.data);

            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                handleRenderViewEditModal(res.data);
            }
        }
    });


    modalEdit.style.display = "block";

    let spanEl = document.getElementById("close-modal");
    let closeBtn = document.getElementById("close-modal-btn");

    spanEl.onclick = function () {
        modalEdit.style.display = "none";
    }

    closeBtn.onclick = function (event) {
        event.preventDefault();
        modalEdit.style.display = "none";
    }
}

const handleRenderViewEditModal = (customer) => {
    $('#inputId').val(customer.id),
        $('#inputFullName').val(customer.name);
    $('#inputPhone').val(customer.phone);
    $('#inputEmail').val(customer.email);
    $('#inputAddress').val(customer.address);
    $('#inputDept').val(customer.dept);
}

const handleEditCustomer = (event) => {

    let isFormValid = document.getElementById('form-edit-customer').checkValidity();

    if (!isFormValid) {
        document.getElementById('form-edit-customer').reportValidity();
    } else {
        event.preventDefault();
        let customer = {
            id: $('#inputId').val(),
            name: $('#inputFullName').val(),
            phone: $('#inputPhone').val(),
            email: $('#inputEmail').val(),
            address: $('#inputAddress').val(),
            dept: $('#inputDept').val()
        };
        // regex
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const numRegex = /^\d+$/;
        if (!emailRegex.test(customer.email) || !numRegex.test(customer.phone) || !numRegex.test(customer.dept)) {
            return notification("Error Input");
        }

        $.ajax({
            url: `/customer/api/apiEditCustomer`,
            type: 'post',
            data: {
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address,
                dept: customer.dept
            },
            success: function (res) {
                modalEdit.style.display = 'none';

                if (res.errCode !== 0) {
                    notification(res.errMessage, NOTY_TYPE.FAIL);
                } else {
                    notification(res.errMessage, NOTY_TYPE.SUCCESS);
                    getAPIData();
                }
            }
        })
    }
}
