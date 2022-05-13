
function handleEditAccount(id) {
    console.log('id', id);

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


$(document).ready(function () {
    const accountRole = $('#account-role').val();
    const userRole = $('#user-role').val();
    console.log('roles:', accountRole, userRole);

    if (userRole === 'superadmin' && (accountRole === 'admin' || accountRole === 'staff') ||
        (userRole === 'admin' && accountRole === 'staff')) {
    }
    else {
        document.getElementsByTagName("tr")[5].getElementsByTagName("td")[2].innerHTML = `<tr></tr>`;
        document.getElementsByTagName("tr")[6].getElementsByTagName("td")[2].innerHTML = `<tr></tr>`;
        document.getElementsByTagName("tr")[7].style.display = 'none';
        document.getElementsByTagName("tr")[8].style.display = 'none';
    }

    /*let tr =
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
*/
});

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

function lostFocus(id) {
    let tr = document.getElementsByTagName("tr")[id];
    let td = tr.getElementsByTagName("td")[1];
    const value = document.getElementById(`${id}-val`).value;
    td.innerHTML = value;
    tr.getElementsByTagName("td")[2].hidden = false;
}
