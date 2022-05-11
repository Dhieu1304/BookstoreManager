/*

$(document).ready(() => {


    let typeName = $(".container-fluid h3").text();

    $.ajax({
        url: '/account/api/admin',
        type: 'get',
        success: function (res) {
            console.log('res:', res);

            if (res.errCode != 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                renderView(res.data)
            }
        }
    });

});

const renderView = (data) => {

    if (data == {}) {
        return;
    }

    let tbodyAccount = document.getElementById("tbody-table-account-management");
    let view = '';
    let statusView = '';

    for (let i = 0; i < data.length; i++) {

        if (data[i].status == "active") {
            statusView = `
                <span href="#" class="lock-account" title="Lock" data-toggle="tooltip">
                   <i class="fas fa-lock"></i>
                </span>
            `
        }
        else {
            statusView = `
                <span href="#" class="unlock-account" title="UnLock" data-toggle="tooltip">
                   <i class="fas fa-key"></i>
                </span>
            `
        }

        view += `
    <tr>
        <td>
            <div class="custom-name-picture"><img
                    src=${data[i].avatar}
                    class="avatar-table-custom img-avatar-header" alt="Avatar">
                <span class="custom-text-table">${data[i].first_name + ' ' + data[i].last_name}</span>
            </div>
        </td>
        <td>
            <span>${data[i].email}</span>
        </td>
        <td>${data[i].gender}</td>
        <td>
            <div class="custom-status-account">
                <div class="status-account-custom acc-active">•</div>
                <div class="custom-text-status">${data[i].status}</div>
            </div>
        </td>
        <td>
            <span href="#" class="edit-account" title="Edit" data-toggle="tooltip">
                <i class="fas fa-user-edit"></i>
            </span>
            ${statusView}
        </td>
    </tr>
    `
    }

    tbodyAccount.innerHTML = view;

}
*/
/*
let urlParams = new URLSearchParams(location.search);
let params = {
    // filter
}
for (let key in params) {
    if (!urlParams.has(key)) {
        urlParams.append(key, params[key]);
    }
}*/


/*
function selectParam(key, value) {
    let roleVal = $(".container-fluid h3").text();
    if (roleVal === "Staff Management") {
        roleVal = "admin"
    } else {
        roleVal = "staff"
    }

    console.log('roleVal:', roleVal);

    urlParams.set(key, value);
    let url = `/account/${roleVal}?${urlParams.toString()}`;
    location.href = url;
}
*/


const urlParams = new URLSearchParams(window.location.search);
/*
let createParams = {
    page: 1,
    role: 'staff',/!*
    search: '',*!/
};*/

let params = {
    page: 1,
    role: '',/*
    search: '',*/
};

for (let key in params) {
    if (!urlParams.has(key)) {
        urlParams.append(key, params[key]);
    } else {
        params[key] = urlParams.get(key);
    }
    console.log("params:", params);
}

$(document).ready(() => {
    let currentPage = urlParams.get('page') || 1;
    $('#pagination li a').each((index, item) => {
        //href = /account?page=3
        const page = $(item).attr('href').split('=')[1];
        urlParams.set('page', page);
        $(item).attr('href', '/account?' + urlParams.toString());
    })
    urlParams.set('page', currentPage);
});