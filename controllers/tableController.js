module.exports.user = (req, res) => {
    res.render('table/user', {title: 'Table user'});
}

module.exports.book = (req, res) => {
    res.render('table/book', {title: 'Table book'});
}
