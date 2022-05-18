$(document).ready(() => {
    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');

    const urlParams = new URLSearchParams(window.location.search);
    const UrlHref = window.location.href;
    const first = UrlHref.lastIndexOf("/");
    let end = UrlHref.indexOf("?");
    let result = UrlHref.substring(first, end + 1);

    let currentPage = urlParams.get('page') || 1;
    $('#pagination li a').each((index, item) => {
        //href = ?page=3
        const page = $(item).attr('href').split('=')[1];
        urlParams.set('page', page);
        $(item).attr('href', result + urlParams.toString());
    })
    urlParams.set('page', currentPage);
});
