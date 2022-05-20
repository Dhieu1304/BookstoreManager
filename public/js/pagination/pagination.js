$(document).ready(() => {
    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');

    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get("page") || 1;
    $('#pagination li a').each((index, item) => {
        let itemPage = $(item).attr('href').split('=')[1];
        urlParams.set("page", itemPage);
        const itemHref = location.pathname + '?' + urlParams1.toString();
        $(item).attr('href', itemHref);
    })

    urlParams.set("page", currentPage);
});
