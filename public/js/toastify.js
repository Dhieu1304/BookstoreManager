
const NOTY_TYPE = {
    SUCCESS: 'success',
    FAIL: 'fail',
    INFO: 'info',
}

notification = (message, type) => {
    let style = {
        color: '#ffffff',
        transition: 'all 350ms linear',
        background: '#3b6dda'
    }

    if (type == NOTY_TYPE.SUCCESS) {
        style.background = '#35d534';
    } else if (type == NOTY_TYPE.FAIL) {
        style.background = '#e83636';
    }

    const noti = new Notification({
        text: message,
        style: style,
    });

}
