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

for (let key in params) {
    if (!urlParams.has(key)) {
        urlParams.append(key, params[key]);
    } else {
        params[key] = urlParams.get(key);
        console.log('key:', key);
        const el = document.getElementById(`${key}`);
        if (el) {
            el.value = urlParams.get(key);
        }
    }
}

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
    }

    params['search'] = document.getElementById('search').value;

    for (let key in params) {
        urlParams.append(key, params[key]);
        if (!urlParams.has(key)) {
            urlParams.append(key, params[key]);
        } else {
            urlParams.set(key, params[key]);
        }
    }

    getAPIData();

}

const getAPIData = () => {

    //đẩy param lên thanh url (mặc dù api nhưng vẫn tạo link cho filter)
    let url = '/account?' + urlParams.toString();
    window.history.pushState({path: url}, '', url);

    $.ajax({
        url: `/account/api/listAccount`,
        type: 'post',
        data: params,
        success: function (data) {
            console.log('Data:', data.data);

            if (data.errCode !== 0) {
                notification(data.errMessage, NOTY_TYPE.FAIL);
            } else {

                handleRenderView(data.data);

                // notification(data.errMessage, NOTY_TYPE.SUCCESS);
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
                actionHtml = `<span href="#" class="lock-account" title="Lock" data-toggle="tooltip">
                        <i class="fas fa-lock"></i></span>`;
            } else {
                statusHtml = `<div class="status-account-custom acc-lock">•</div>`;
                actionHtml = `<span href="#" class="unlock-account" title="UnLock" data-toggle="tooltip">
                        <i class="fas fa-key"></i></span>`;
            }

            render +=
                `
                <tr>
                    <td>
                        <div class="custom-name-picture" href="#">
                            <img src=${item.avatar}
                                class="avatar-table-custom img-avatar-header" alt="Avatar">
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
                    <span href="#" class="edit-account" title="Edit" data-toggle="tooltip">
                        <i class="fas fa-user-edit"></i>
                    </span>
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

    console.log("clickPageNum: ", clickPageNum);

    params['page'] = clickPageNum;
    console.log('params: ', params);

    getAPIData();
})

//Viet hoa chu cai dau
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
