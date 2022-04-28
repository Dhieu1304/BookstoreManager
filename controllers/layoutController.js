module.exports.static = (req, res) => {
    res.render('layouts/static', {title: 'Layout Static'});
}

module.exports.sidenavLight = (req, res) => {
    res.render('layouts/sidenavLight', {title: 'Layout Sidenav Light'});
}
