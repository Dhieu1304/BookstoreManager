$(document).ready(() => {
    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');

    let currentPage = urlParams.get('page') || 1;
    $('#pagination li a').each((index, item) => {
        //href = /account?page=3
        const page = $(item).attr('href').split('=')[1];
        urlParams.set('page', page);
        $(item).attr('href', '/account?' + urlParams.toString());
    })
    urlParams.set('page', currentPage);
});
