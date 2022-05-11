/*
function handleEdit(id) {

    let type = '';
    let inputEl = '';
    switch (id) {
        case "email":
            type = 'email';
            break;
        case "phone-number":
            type = 'number';
            break;
        case "gender":
            inputEl = `
                <select style="margin-right: 5px" id="${id}-val">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <div class="dd-save-custom" onclick="handleSave('${id}')">
                    <i class="fas fa-save"></i>
                </div>
            `;

            document.getElementById(id).innerHTML = inputEl;

            return;
        case "role":
            inputEl = `
                <select style="margin-right: 5px" id="${id}-val">
                    <option value="staff">staff</option>
                    <option value="admin">admin</option>
                    <option value="superadmin">superadmin</option>
                </select>
                <div class="dd-save-custom" onclick="handleSave('${id}')">
                    <i class="fas fa-save"></i>
                </div>
            `;

            document.getElementById(id).innerHTML = inputEl;

            return;
        case "status":
            inputEl = `
                <select style="margin-right: 5px" id="${id}-val">
                    <option value="active">active</option>
                    <option value="block">block</option>
                </select>
                <div class="dd-save-custom" onclick="handleSave('${id}')">
                    <i class="fas fa-save"></i>
                </div>
            `;

            document.getElementById(id).innerHTML = inputEl;

            return;
        default:
            type = 'text';
    }

    const val = $.trim($(`#${id}-val`).text());

    inputEl = `
        <input class="input-custom" id="${id}-val" type="${type}" value="${val}"/>
        <div class="dd-save-custom" onclick="handleSave('${id}')">
            <i class="fas fa-save"></i>
        </div>
    `;

    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}


function handleSave(id) {

    let inputEl = '';

    switch (id) {
        case "gender":
            let genderVal = document.getElementById(`${id}-val`).value;

            console.log('genderVal:', genderVal);

            inputEl = `
                <div class="dd-custom" id="${id}-val">${genderVal}</div>
                <div class="dd-edit-custom" onclick="handleEdit('${id}')">
                    <i class="fas fa-edit"></i>
                </div>
            `;

            document.getElementById(id).innerHTML = inputEl;

            return;
        case "role":
            let roleVal = document.getElementById(`${id}-val`).value;

            console.log('roleVal:', roleVal);

            inputEl = `
                <div class="dd-custom" id="${id}-val">${roleVal}</div>
                <div class="dd-edit-custom" onclick="handleEdit('${id}')">
                    <i class="fas fa-edit"></i>
                </div>
            `;

            document.getElementById(id).innerHTML = inputEl;

            return;
        case "status":
            let statusVal = document.getElementById(`${id}-val`).value;

            console.log('statusVal:', statusVal);

            inputEl = `
                <div class="dd-custom" id="${id}-val">${statusVal}</div>
                <div class="dd-edit-custom" onclick="handleEdit('${id}')">
                    <i class="fas fa-edit"></i>
                </div>
            `;

            document.getElementById(id).innerHTML = inputEl;

            return;
        default:
            break;
    }

    let val = $(`#${id}-val`).val();

    inputEl = `
        <div class="dd-custom" id="${id}-val">${val}</div>
        <div class="dd-edit-custom" onclick="handleEdit('${id}')">
            <i class="fas fa-edit"></i>
        </div>
    `;
    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}
*/

/*
function handleEditGender(id) {
    const val = $.trim($(`#${id}-val`).text());
    console.log('val:', val);
    let inputEl = `
        <select style="margin-right: 5px" id="${id}-val">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <div class="dd-save-custom" onclick="handleSaveGender('${id}')">
            <i class="fas fa-save"></i>
        </div>
    `;
    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}

function handleSaveGender(id) {
    let e = document.getElementById(`${id}-val`);
    let val = e.value;
    //    e.options[e.selectedIndex].text;

    console.log('val:', val);

    let inputEl = `
        <div class="dd-custom"id="${id}-val">${val}</div>
        <div class="dd-edit-custom" onclick="handleEditGender('${id}')">
            <i class="fas fa-edit"></i>
        </div>
    `;

    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}
*/

function handleEditAccount(id) {
    console.log('id', id);
    /*const name = $.trim($('#full-name-val').text());
    const email = $.trim($('#email-val').text());
    const gender = $.trim($('#gender-val').text());
    const phone_number = $.trim($('#phone-number-val').text());
    const address = $.trim($('#address-val').text());
    const role = $.trim($('#role-val').text());
    const status = $.trim($('#status-val').text());

    const index = name.lastIndexOf(" ");
    const first_name = name.substring(0, index);
    const last_name = name.substring(index + 1, name.length);
*/


    const name = document.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML;
    const email = document.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
    const phone_number = document.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
    const gender = document.getElementsByTagName("tr")[3].getElementsByTagName("td")[1].innerHTML;
    const address = document.getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML;
    const role = document.getElementsByTagName("tr")[5].getElementsByTagName("td")[1].innerHTML;
    const status = document.getElementsByTagName("tr")[6].getElementsByTagName("td")[1].innerHTML;

    const index = name.lastIndexOf(" ");
    const first_name = name.substring(0, index);
    const last_name = name.substring(index + 1, name.length);
    console.log('info:', id, first_name, last_name, email, gender, phone_number, address, role, status);

    $.ajax({
        url: `/account/api/edit/${id}`,
        type: 'post',
        data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            phone_number: phone_number,
            address: address,
            role: role,
            status: status
        },
        success: function (data) {
            console.log('Data:', data);
            if (data.errCode === 2 || data.errCode === 1) {
                notification(data.errMessage, NOTY_TYPE.FAIL);
            } else {
                if (data.errCode === 0) {
                    let e = document.getElementById("full-name-header");
                    e.innerHTML = `${data.data.first_name} ${data.data.last_name}`

                    notification(data.errMessage, NOTY_TYPE.SUCCESS);
                }
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
    document.getElementById("up-avatar").click();
    let el = document.getElementById("btn-up-avatar");
    console.log('el:', el);
    const html = `<div class="btn-change-avatar" onclick="handleSaveAvatar()">Save</div>`;
    el.innerHTML = html;
}

function handleSaveAvatar() {
    const id = document.getElementById("id-account").value;
    console.log('id', id);
    const file_data = $('#up-avatar').prop('files')[0];
    console.log('file_data', file_data);
    const form_data = new FormData();
    form_data.append('id', id);
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
                $("#img-avatar-preview").attr("src", res.link);
                $("#img-avatar").attr("src", res.link);
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
            }
        }
    })

    let el = document.getElementById("btn-up-avatar");
    el.innerHTML = `
        <div class="btn-change-avatar" onclick="handleChangeAvatar()">Change</div>
    `;
}

/*
function handleEditRole(id) {
    const val = $.trim($(`#${id}-val`).text());
    console.log('val:', val);
    let inputEl = `
        <select style="margin-right: 5px" id="${id}-val">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <div class="dd-save-custom" onclick="handleSaveRole('${id}')">
            <i class="fas fa-save"></i>
        </div>
    `;
    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}


function handleSaveRole(id) {
    let e = document.getElementById(`${id}-val`);
    let val = e.value;
    //    e.options[e.selectedIndex].text;

    console.log('val:', val);

    let inputEl = `
        <div class="dd-custom"id="${id}-val">${val}</div>
        <div class="dd-edit-custom" onclick="handleEditGender('${id}')">
            <i class="fas fa-edit"></i>
        </div>
    `;

    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}
*/

/*

$(document).ready(function () {
    const account_role = $('#account-role').val();
    const user_role = $('#user-role').val();
    console.log('roles:', account_role, user_role);

    let tr = document.getElementsByTagName("tr")[0];
    console.log('tr:', tr);
    let td = tr.getElementsByTagName("td")[1];
    console.log('td:', td.innerHTML);
    let editBtn = tr.getElementsByTagName("td")[2];
    editBtn.onclick = () => {
        editBtn.hidden = true;
        td.innerHTML = `
            <input value="${td.innerHTML}" onfocusout="lostFocus(${0})" id="0-val"/>
        `
    }

});
*/

function handleEdit(id) {
    let tr = document.getElementsByTagName("tr")[id];
    console.log('tr:', tr);
    let td = tr.getElementsByTagName("td")[1];
    console.log('td:', td.innerHTML);
    let editBtn = tr.getElementsByTagName("td")[2];
    editBtn.hidden = true;

    if (id === 3) { //gender
        td.innerHTML = `
                <select style="margin-right: 5px" id="${id}-val" name="${id}-val" onchange="handleChangeDropDown(${id})">
                    <option disabled selected value>-- select an option -- </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            `;
        return;
    }

    if (id === 5) {
        td.innerHTML = `
                <select style="margin-right: 5px" id="${id}-val" name="${id}-val" onchange="handleChangeDropDown(${id})">
                    <option disabled selected value>-- select an option -- </option>
                    <option value="staff">staff</option>
                    <option value="admin">admin</option>
                    <option value="superadmin">superadmin</option>
                </select>
            `;
        return;
    }

    if (id === 6) {
        td.innerHTML = `
                <select style="margin-right: 5px" id="${id}-val" name="${id}-val" onchange="handleChangeDropDown(${id})">
                    <option disabled selected value>-- select an option -- </option>
                    <option value="active">active</option>
                    <option value="block">block</option>
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
/*

function handleChangeRole() {
    const val = $('#5-val option:selected').text();
    console.log(val);

    let tr = document.getElementsByTagName("tr")[5];
    let td = tr.getElementsByTagName("td")[1];
    td.innerHTML = val;
    tr.getElementsByTagName("td")[2].hidden = false;
}
*/

function lostFocus(id) {
    let tr = document.getElementsByTagName("tr")[id];
    let td = tr.getElementsByTagName("td")[1];
    const value = document.getElementById(`${id}-val`).value;
    td.innerHTML = value;
    tr.getElementsByTagName("td")[2].hidden = false;
}
