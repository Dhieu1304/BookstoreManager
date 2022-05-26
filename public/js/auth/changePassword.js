
let password = {
    inputCurrentPassword: false,
    inputNewPassword: false,
    inputConfirmPassword : false
}

function handleShowHidePassword(id) {
    switch (id) {
        case "inputCurrentPassword": {
            password.inputCurrentPassword = !password.inputCurrentPassword;
            break;
        }
        case "inputNewPassword": {
            password.inputNewPassword = !password.inputNewPassword;
            break;
        }
        case "inputConfirmPassword": {
            password.inputConfirmPassword = !password.inputConfirmPassword;
            break;
        }
        default:
            break;
    }

    let el = document.getElementById(`${id}Parent`);
    if (password[id]) {
        document.getElementById(id).type = 'text';
        el.getElementsByTagName("span")[0].innerHTML = `<i class="fa fa-eye custom-icon-show-hide-password" aria-hidden="true"></i>`;
    }
    else {
        document.getElementById(id).type = 'password';
        el.getElementsByTagName("span")[0].innerHTML = `<i class="fa fa-eye-slash custom-icon-show-hide-password" aria-hidden="true"></i>`;
    }
}

function handleChangePassword(e) {
    e.preventDefault();

    const currentPassword = $('#inputCurrentPassword').val();
    const newPassword = $('#inputNewPassword').val();
    const confirmPassword = $('#inputConfirmPassword').val();

    if (newPassword !== confirmPassword) {
        notification("Please check Confirm Password!", NOTY_TYPE.FAIL);
    }
    else {
        $.ajax({
            url: `/api/auth/changePassword`,
            type: 'post',
            data: {
                currentPassword: currentPassword,
                newPassword: newPassword
            },
            success: function (res) {
                if (res.errCode !== 0) {
                    notification(res.errMessage, NOTY_TYPE.FAIL);
                } else {
                    notification(res.errMessage, NOTY_TYPE.SUCCESS);
                }
            }
        })
    }

}
