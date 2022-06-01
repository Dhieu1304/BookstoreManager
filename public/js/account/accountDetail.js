let UserId = '';

function handleEditAccount() {

    const first_name = document.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML;
    const last_name = document.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
    const phone_number = document.getElementsByTagName("tr")[3].getElementsByTagName("td")[1].innerHTML;
    const gender = document.getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML;
    const address = document.getElementsByTagName("tr")[5].getElementsByTagName("td")[1].innerHTML;
    const role = document.getElementsByTagName("tr")[6].getElementsByTagName("td")[1].innerHTML;
    const status = document.getElementsByTagName("tr")[7].getElementsByTagName("td")[1].innerHTML;

    const regex = /^[a-zA-Z0-9\s,'-]*$/;
    if (!regex.test(first_name) || !regex.test(last_name) || !regex.test(phone_number) || !regex.test(gender) ||
        !regex.test(address) || !regex.test(role) || !regex.test(status)) {
        return notification("Missing Parameter!", NOTY_TYPE.FAIL);
    }

    console.log('info:', UserId, first_name, last_name, gender, phone_number, address, role, status);

    $.ajax({
        url: `/account/api/edit/${UserId}`,
        type: 'post',
        data: {first_name, last_name, gender, phone_number, address, role, status},
        success: function (data) {
            console.log('Data:', data);
            if (data.errCode !== 0) {
                notification(data.errMessage, NOTY_TYPE.FAIL);
            } else {
                getAPIData();
                notification(data.errMessage, NOTY_TYPE.SUCCESS);
            }
        }
    })

}

function showModalImagePreview() {
    let modal = document.getElementById("avatar-modal");
    modal.style.display = "block";

    let spanEl = document.getElementsByClassName("modal-close")[0];

    spanEl.onclick = function () {
        modal.style.display = "none";
    }
}

function handleChangeAvatar() {
    $('#file-ip-1').click();
}

function handleSaveAvatar() {
    const file_data = $('#file-ip-1').prop('files')[0];
    const form_data = new FormData();
    form_data.append('id', UserId);
    form_data.append('avatar', file_data);

    $.ajax({
        url: `/account/upload/image`,
        type: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (res) {
            console.log('res:', res);
            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                getAPIData();
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
            }
        }
    })
}


$(document).ready(function () {
    const pathName = window.location.pathname;
    const index = pathName.lastIndexOf('/');
    UserId = pathName.substring(index + 1, pathName.length);

    getAPIData();
});

function handleEdit(id) {
    let tr = document.getElementsByTagName("tr")[id];
    let td = tr.getElementsByTagName("td")[1];
    let editBtn = tr.getElementsByTagName("td")[2];
    editBtn.hidden = true;

    if (id === 4) { //gender
        td.innerHTML = `
                <select style="margin-right: 5px" id="${id}-val" name="${id}-val" onchange="handleChangeDropDown(${id})">
                <option disabled selected value>-- select an option -- </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            `;
        return;
    }

    if (id === 6) {
        td.innerHTML = `
                <select style="margin-right: 5px" id="${id}-val" name="${id}-val" onchange="handleChangeDropDown(${id})">
                <option disabled selected value>-- select an option -- </option>
                    <option value="staff">staff</option>
                    <option value="admin">admin</option>
                </select>
            `;
        return;
    }

    if (id === 7) {
        td.innerHTML = `
                <select style="margin-right: 5px" id="${id}-val" name="${id}-val" onchange="handleChangeDropDown(${id})">
                <option disabled selected value>-- select an option -- </option>
                    <option value="active">active</option>
                    <option value="locked">locked</option>
                </select>
            `;
        return;
    }

    td.innerHTML = `
            <input class="flex-input-custom" value="${td.innerHTML}" onfocusout="lostFocus(${id})" id="${id}-val"/>
        `;
}

function handleChangeDropDown(id) {
    const val = $(`#${id}-val option:selected`).text();
    console.log(val);

    let tr = document.getElementsByTagName("tr")[id];
    let td = tr.getElementsByTagName("td")[1];
    td.innerHTML = val;
    tr.getElementsByTagName("td")[2].hidden = false;
}

function lostFocus(id) {
    let tr = document.getElementsByTagName("tr")[id];
    let td = tr.getElementsByTagName("td")[1];
    const value = document.getElementById(`${id}-val`).value;
    td.innerHTML = value;
    tr.getElementsByTagName("td")[2].hidden = false;
}

function getAPIData() {
    $.ajax({
        url: `/account/detailAccount`,
        type: 'post',
        data: {id: UserId},
        success: function (res) {
            console.log('Data:', res);
            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                renderView(res.data);
                // notification(res.errMessage, NOTY_TYPE.SUCCESS);
            }
        }
    });
}

function renderView(data) {

    const avatarSrc = data.avatar || '/assets/img/default-avatar.jpg';

    let renderModalAvatar = `
        <span class="modal-close">&times;</span>
        <img class="avatar-modal-content" id="img-avatar-preview" src=${avatarSrc}>
    `;

    document.getElementById('avatar-modal').innerHTML = renderModalAvatar;


    const renderAvatar = `
        <img onclick='showModalImagePreview()' src=${avatarSrc} id="img-avatar" alt=""/>
        
        <form hidden>
            <input type="file" id="file-ip-1" accept="image/*" onchange="showPreview(event);">
        </form>
        
        <div class="image-edit-custom" id="btn-up-avatar">
            <div class="btn-change-avatar" onclick="handleChangeAvatar()">Change</div>
        </div>
        
        <header>
            <h1 id="full-name-header">${data.first_name} ${data.last_name}</h1>
            <h6 class="small-title-role" id="account-role">(${data.role})</h6>
        </header>
    `;

    document.getElementById('avatar-detail-account').innerHTML = renderAvatar;


    const renderAccountInfo = `
    <tbody>
        <tr>
            <td>First name:</td>
            <td>${data.first_name}</td>
            <td class="dd-edit-custom" onclick="handleEdit(0)"><i class="fas fa-edit"></i></td>
        </tr>
        <tr>
            <td>Last name:</td>
            <td>${data.last_name}</td>
            <td class="dd-edit-custom" onclick="handleEdit(1)"><i class="fas fa-edit"></i></td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>${data.email}</td>
            <td></td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td>${data.phone_number}</td>
            <td class="dd-edit-custom" onclick="handleEdit(3)"><i class="fas fa-edit"></i></td>
        </tr>
        <tr>
            <td>Gender:</td>
            <td>${data.gender}</td>
            <td class="dd-edit-custom" onclick="handleEdit(4)"><i class="fas fa-edit"></i></td>
        </tr>
        <tr>
            <td>Address:</td>
            <td>${data.address}</td>
            <td class="dd-edit-custom" onclick="handleEdit(5)"><i class="fas fa-edit"></i></td>
        </tr>
        <tr>
            <td>Role:</td>
            <td>${data.role}</td>
            <td class="dd-edit-custom" onclick="handleEdit(6)"><i class="fas fa-edit"></i></td>
        </tr>
        <tr>
            <td>Status:</td>
            <td>${data.status}</td>
            <td class="dd-edit-custom" onclick="handleEdit(7)"><i class="fas fa-edit"></i></td>
        </tr>
        <tr>
            <td>Created At:</td>
            <td>${data.create_at}</td>
            <td></td>
        </tr>
    </tbody>
    `;

    document.getElementById('table-detail-account').innerHTML = renderAccountInfo;
}

function showPreview(event) {
    if(event.target.files.length > 0){
        const src = URL.createObjectURL(event.target.files[0]);
        document.getElementById("img-avatar-preview").src = src;
        document.getElementById("img-avatar").src = src;
    }
    document.getElementById('btn-up-avatar').innerHTML = `<div class="btn-change-avatar" onclick="handleSaveAvatar()">Save</div>`;
}