const urlParams = new URLSearchParams(window.location.search);

const paginationSource = $("#paginationTemplate").html();
const paginationTemplate = Handlebars.compile(paginationSource);

let params = {
    page: 1,
    role: '',
    limit: 5,
    search: '',
    gender: 'All',
    status: 'All'
};

const ACCOUNT_ACTION = {
    LOCK: 'LOCK',
    UNLOCK: 'UNLOCK'
}

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

const handleHideShowFilter = () => {
    let filterBtn = document.getElementById('filter');
    if (filterBtn.style.display !== 'none') {
        filterBtn.style.display = 'none';
    } else {
        filterBtn.style.display = 'flex';
    }
}

const handleFilter = () => {
    params['page'] = 1;
    params['limit'] = document.getElementById('limit').value;
    params['search'] = document.getElementById('search').value;
    params['gender'] = document.getElementById('gender').value;
    params['status'] = document.getElementById('status').value;

    getAPIData();
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

    let url = '/account?' + urlParams.toString();
    window.history.pushState({path: url}, '', url);

    $.ajax({
        url: `/account/api/listAccount`,
        type: 'post',
        data: params,
        success: function (res) {

            if (res.errCode !== 0) {
                if (res.result === 'redirect') {
                    return window.location.replace(res.url);
                }
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                handleRenderView(res.data);
            }
        }
    })

    const formatTitle = capitalizeFirstLetter(params.role);
    document.getElementById('title-h3').innerHTML = `${formatTitle} Management`;
    document.getElementById('title-li').innerHTML = `List ${formatTitle}`;
}

$(function () {
    getAPIData();
});


const handleRenderView = (data) => {

    let render = '';
    const accounts = data.accounts;
    let accountRow = 0;
    if (accounts && accounts.length > 0) {
        accounts.forEach((item) => {
            accountRow++;
            let statusHtml = '';
            let actionHtml = '';

            if (item.status === 'active') {
                statusHtml = `<div class="status-account-custom acc-active">•</div>`;
                actionHtml = `<span onclick="handleShowModalStatus(${item.id})" 
                            class="lock-account" title="Lock" data-toggle="tooltip">
                        <i class="fas fa-lock"></i></span>`;
            } else {
                statusHtml = `<div class="status-account-custom acc-lock">•</div>`;
                actionHtml = `<span onclick="handleShowModalStatus(${item.id}, ACCOUNT_ACTION.UNLOCK)" 
                                class="unlock-account" title="UnLock" data-toggle="tooltip">
                        <i class="fas fa-key"></i></span>`;
            }

            render +=
                `
                <tr>
                    <td>
                        <div id="infoAccount${item.id}" class="custom-name-picture">
                            <a href="/account/detail/${item.id}">
                                <img src=${item.avatar || '/assets/img/default-avatar.jpg'}
                                class="avatar-table-custom img-avatar-header" alt="Avatar">
                            </a>
                            <span class="custom-text-table">${item.first_name} ${item.last_name}</span>
                        </div>
                    </td>
                    <td>
                        <span>${item.email}</span>
                    </td>
                    <td>${item.gender}</td>
                    
                    <td>
                        <div class="custom-status-account">
                            ${statusHtml}
                            <div class="custom-text-status">${item.status}</div>
                        </div>
                    </td>
                    <td>
                        <a href="/account/detail/${item.id}">
                            <span href="#" class="edit-account" title="Edit" data-toggle="tooltip">
                                <i class="fas fa-user-edit"></i>
                            </span>
                        </a>
                    ${actionHtml}
                    </td>
                </tr>
                `;
        })
    }

    document.getElementById('tbody-table-account-management').innerHTML = render;

    console.log('accountRow: ', accountRow);
    document.getElementById('hint-text-pagination').innerHTML = `Showing <b>${accountRow}</b> out of <b>${data.pagination.totalRows}</b> entries`

    $("#pagination").html(paginationTemplate({pagination: data.pagination, paginationClass: "pagination"}));
}


$("#pagination").on('click', '.page-link', function (e) {

    e.preventDefault();

    //item là page-link element
    const pageHref = $(e.target).closest("li").find("a").attr('href');
    const clickPageNum = pageHref.split("page=")[1];
    params['page'] = clickPageNum;
    getAPIData();
})

//Viet hoa chu cai dau
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// modal
let modalConfirmEditStatus = document.getElementById("modalConfirm");
let modalAddNew = document.getElementById("modalAddNew");

handleCancelModal('cancelBtn'); //Nut Cancel
handleCancelModal('close-modal'); //Dau X

function handleCancelModal(Class_Name) {
    let closeBtns = document.getElementsByClassName(`${Class_Name}`);
    for (let i = 0; i < closeBtns.length; i++) {
        let thisBtn = closeBtns[i];
        thisBtn.addEventListener("click", function () {
            let modal = document.getElementById(this.dataset.modal);
            modal.style.display = "none";
        }, false);
    }
}

window.onclick = function (event) {
    if (event.target === modalConfirmEditStatus) {
        modalConfirmEditStatus.style.display = "none";
    }

    /*if (event.target === modalAddNew) {
        modalAddNew.style.display = "none";
    }*/
}


function handleShowModalStatus(id, type = ACCOUNT_ACTION.LOCK) {
    modalConfirmEditStatus.style.display = "block";

    const accountInfo = document.getElementById(`infoAccount${id}`);

    let modalBodyInfo = `<h6>Are you sure to ${type} this account:</h6>`;
    modalBodyInfo += accountInfo.innerHTML;
    document.getElementById('modal-body-status').innerHTML = modalBodyInfo;

    document.getElementById('continueStatusBtn').onclick = function () {
        handleLockUnlockAccount(id, type);
        modalConfirmEditStatus.style.display = "none";
    }
}


function handleLockUnlockAccount(id, type) {

    let status = 'active';
    if (type === ACCOUNT_ACTION.LOCK) {
        status = 'locked';
    }

    $.ajax({
        url: `/account/api/editStatus`,
        type: 'post',
        data: {
            id: id,
            status: status
        },
        success: function (res) {
            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
                //load lai trang
                getAPIData();
            }
        }
    })
}


function handleShowModalAddNew() {
    modalAddNew.style.display = "block";
    document.getElementById('inputRole').value = params.role;
    document.getElementById('cancelBtnAddNew').onclick = function (e) {
        e.preventDefault();
    }
}


let account = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    gender: '',
    role: params.role,
    address: ''
}


document.getElementById('SubmitAddNewBtn').onclick = function (e) {
    let isFormValid  = document.getElementById('form-add-new').checkValidity();

    if(!isFormValid) {
        document.getElementById('form-add-new').reportValidity();
    } else {
        e.preventDefault();

        account.first_name = $('#inputFirstName').val();
        account.last_name = $('#inputLastName').val();
        account.email = $('#inputEmail').val();
        account.phone_number = $('#inputPhone').val();
        account.gender = $('#inputGender').val();
        account.address = $('#inputAddress').val();
        showModalIsLoading();

        $.ajax({
            url: `/account/api/addNewAccount`,
            type: 'post',
            data: account,
            success: function (res) {

                removeModalIsLoading();
                //An modal
                modalAddNew.style.display = "none";

                if (res.errCode !== 0) {
                    notification(res.errMessage, NOTY_TYPE.FAIL);
                } else {

                    //reset input
                    $('#inputFirstName').val('');
                    $('#inputLastName').val('');
                    $('#inputEmail').val('');
                    $('#inputPhone').val('');
                    $('#inputGender').val('');
                    $('#inputAddress').val('');

                    notification(res.errMessage, NOTY_TYPE.SUCCESS);

                    //load lai trang
                    getAPIData();
                }
            }
        })
    }
};

function handleExportAccount() {
    const hrefExportData = '/account/exportAccountData?' + urlParams.toString();
    let a = document.createElement("a");
    a.setAttribute('href', hrefExportData);
    a.click();
    a.remove();
}
