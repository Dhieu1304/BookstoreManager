

module.exports.getHomePage = async (req, res) => {


    res.render('index', {title: 'Dashboard'});
}
