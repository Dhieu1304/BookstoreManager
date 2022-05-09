$(document).ready(() => {
    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');

    /*let savePage = urlParams.get('page');

    $('#pagination li a').each((index, item) => {
        //href = /account/admin?page=1
        let page = $(item).attr('href').split('=')[1];
        urlParams.set('page', page);
        let href = '/account/admin' + urlParams.toString();
        $(item).attr('href', href);
    })
    urlParams.set('page', savePage);*/
});
