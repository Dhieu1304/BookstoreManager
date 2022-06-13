

// UI

function initPaginationUI(){
    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');
}

function loadPageLink(urlParams, pathname){
    //Lấy ra current page
    const currentPage = urlParams.get("page") || 1;
    $('#pagination li a').each((index, item) => {

        //itemPage là giá trị của page mà page-link nắm giữ
        let itemPage = $(item).attr('href').split('=')[1];

        //urlParams là url của page hiện tại (bao gồm các giá trị đã filter)
        urlParams.set("page",itemPage);

        //sửa lại href cho page-link = pathname + '?' + urlParams.toString();
        //Lúc này trong href của page-link sẽ ko bị mất các filter ta đã chọn
        const itemHref = pathname + '?' + urlParams.toString();
        $(item).attr('href',itemHref);
    })

    //Sửa lại page cho urlParams về lại giá trị currentPage
    urlParams.set("page",currentPage);

}

function initPagination(urlParams, pathname){
    initPaginationUI();
    loadPageLink(urlParams, pathname);
}





