
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
        // document.getElementById('loginBtn').click();
    }
}
