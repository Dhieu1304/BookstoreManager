const numberRegex = (input) => {
    const numRegex = /^\d+$/;
    return numRegex.test(input);
}

const emailRegex = (input) => {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test(input);
}

module.exports = {numberRegex, emailRegex}
