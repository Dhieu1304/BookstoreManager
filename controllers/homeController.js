module.exports.getHomePage = (req, res) => {
    res.render('index', {title: 'Dashboard'});
}
