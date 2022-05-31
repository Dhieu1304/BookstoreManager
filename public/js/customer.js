const urlParams = new URLSearchParams(window.location.search);

const paginationSource = $("#paginationTemplate").html();
const paginationTemplate = Handlebars.compile(paginationSource);

let params = {
    page: 1,
    limit: 5,
    search: '',
};

let resData = {}

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


    //update link export customer
    const hrefExportData = '/customer/exportExcel?' + urlParams.toString()
    console.log('hrefExportData:', hrefExportData);
    document.getElementById('export-customer').href = hrefExportData;


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
                resData = res.data;
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

function handleFilterCustomer() {

    params['page'] = 1;
    params['limit'] = document.getElementById('limit').value;
    params['search'] = document.getElementById('search').value;

    console.log('param: ', params);
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
// const {dialog} = require('electron').remote;
/*

const handleExportExcel = () => {
    console.log("data: ", resData);
    /!*const data = resData.customers.map(customer => {
        return `\n${customer.id}, ${customer.name}, ${customer.email}, ${customer.address}, ${customer.dept}`;
    });
    document.getElementById('my_iframe').src = URL.createObjectURL(new Blob([data], {type: ""}));*!/
    const blob = new Blob([s2ab(atob(resData.customers))], {
        type: ''
    });


    const href = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: "export-customers.xlsx",
    });

    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(href);
    a.remove();


}

function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
*/


/*
const handleExportExcel = () => {
    $.ajax({
        url: `/customer/api/exportExcel`,
        type: 'get',
        data: {
            ...params,
            workSheetName: "customer",
        },
        success: function (res) {
            console.log('Data:', res);

            /!*let a = document.createElement("a");
            a.setAttribute('download', '');
            a.style.display = 'none';
            a.href = '/assets/down/TKPM.iml';
            a.click();
            a.remove();*!/


            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
            }

            /!*$.ajax({
                url: `/customer/api/deleteFile`,
                type: 'post',
                data: {
                    pathLink: '/assets/down/TKPM.iml'
                }
            });*!/


        }
    });
}
*/


/*const handleExportExcel = () => {
    $.ajax({
        url: `/customer/exportExcel`,
        type: 'get',
        data: {
            ...params,
            workSheetName: "customer",
        },
        success: function (res) {
            console.log('Data:', res);
            /!*
            let a = document.createElement("a");
            a.setAttribute('download', '');
            a.style.display = 'none';
            a.href = '/assets/down/package-lockasdasdasd.json';
            a.click();
            a.remove();
            *!/

            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
            }


        }
    });
}*/

