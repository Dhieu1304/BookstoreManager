function handleForgotPassword(event) {
    event.preventDefault();

    const email = $('#inputEmail').val();
    showModalIsLoading('modal-loading');

    $.ajax({
        url: '/auth/api/resetPassword',
        type: 'post',
        data: {
            email: email
        },
        success: function (res) {
            removeModalIsLoading();
            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
            }
        }
    })
}

$(function () {
    document.getElementById("inputEmail").addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            handleForgotPassword(event);
        }
    })
});
