
handleClickLogin = () => {

    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    console.log("input:", email, password);

    if (email == null || email == "" || password == null || password == "") {
        notification('Parameter is required!!', NOTY_TYPE.FAIL);
    } else {
        $.ajax({
            url: '/api/auth/login',
            type: 'post',
            data: {
                email: email,
                password: password
            },
            success: function (data) {
                console.log('Data:', data);
                if (data.errCode == 2 || data.errCode == 1) {
                    notification(data.errMessage, NOTY_TYPE.FAIL);
                }
                else {
                    if (data.errCode == 0) {
                        window.location.href = "/";
                    }
                }
            }
        })
    }
}



let isShowPassword = false;

handleShowHidePassword = () => {
    console.log("isShowBefore:", isShowPassword);
    isShowPassword = !isShowPassword;
    console.log("isShowCurrent:", isShowPassword);

    let inputPassword = document.getElementById("inputPassword");
    let inputIcon = document.getElementById("inputIcon");

    console.log('inputIcon', inputIcon);

    if (isShowPassword) {
        inputPassword.type = 'text';
        inputIcon.innerHTML = "<i class=\"fa fa-eye custom-icon-show-hide-password\" aria-hidden=\"true\"></i>"
    }
    else {
        inputPassword.type = 'password';
        inputIcon.innerHTML = "<i class=\"fa fa-eye-slash custom-icon-show-hide-password\" aria-hidden=\"true\"></i>"
    }
}
