function handleEdit(id) {

    const val = $.trim($(`#${id}-val`).text());

    let type = '';
    switch (id) {
        case "email":
            type = 'email';
            break;
        case "phone-number":
            type = 'number'
            break;
        default:
            type = 'text';
    }

    let inputEl = `
        <input class="input-custom" id="${id}-val" type="${type}" value="${val}"/>
        <div class="dd-save-custom" onclick="handleSave('${id}')">
            <i class="fas fa-save"></i>
        </div>
    `;

    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}


function handleSave(id) {
    let val = $(`#${id}-val`).val();

    let inputEl = `
        <div class="dd-custom" id="${id}-val">${val}</div>
        <div class="dd-edit-custom" onclick="handleEdit('${id}')">
            <i class="fas fa-edit"></i>
        </div>
    `;
    let el = document.getElementById(id);
    el.innerHTML = inputEl;
}

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

function handleEditAccount(id) {
    console.log('id', id);
    const name = $.trim($('#full-name-val').text());
    const email = $.trim($('#email-val').text());
    const gender = $.trim($('#gender-val').text());
    const phone_number = $.trim($('#phone-number-val').text());
    const address = $.trim($('#address-val').text());

    const index = name.lastIndexOf(" ");
    const first_name = name.substring(0, index);
    const last_name = name.substring(index + 1, name.length);

    console.log('info:', id, first_name, last_name, email, gender, phone_number, address);

    $.ajax({
        url: `/account/api/edit/${id}`,
        type: 'post',
        data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            phone_number: phone_number,
            address: address
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

/*$(document).ready(() => {

    let img = document.getElementById("avatar-img-account");
    img.
})*/
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
        // dataType: 'text', // what to expect back from the server
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
    `
}
