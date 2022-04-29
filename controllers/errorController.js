module.exports.err401 = (req, res) => {
    res.render('errors/401', {layout: false});
}

module.exports.err404 = (req, res) => {
    res.render('errors/404', {layout: false});
}

module.exports.err500 = (req, res) => {
    res.render('errors/500', {layout: false});
}
