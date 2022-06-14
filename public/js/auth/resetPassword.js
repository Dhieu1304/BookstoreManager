function handleCreateNewPassword(event) {
    event.preventDefault();
/*

    const params = new URLSearchParams(window.location.search).toString();
    //code=17&token=2d7beea6-ccac-11ec-9d64-0242ac120002
    const indexAnd = params.indexOf('&');
    const id = params.substring(5, indexAnd);
    const uid = params.substring(indexAnd + 7, params.length);
*/
    const id = $('#inputId').val();
    const newPassword = $('#inputNewPassword').val();
    const confirmPassword = $('#inputConfirmPassword').val();

    if (newPassword !== confirmPassword) {
        notification("Please check Confirm Password!", NOTY_TYPE.FAIL);
    } else {
        $.ajax({
            url: '/auth/api/resetNewPassword',
            type: 'post',
            data: {
                id,
                newPassword,
                confirmPassword
            },
            success: function (res) {
                if (res.errCode !== 0) {
                    notification(res.errMessage, NOTY_TYPE.FAIL);
                } else {
                    document.getElementById("returnLogin").hidden = false;
                    document.getElementById("body-reset-password").hidden = true;
                    notification(res.errMessage, NOTY_TYPE.SUCCESS);
                }
            }
        })
    }
}
