////////////////////////////////////////////////////////////////////////////////
// Create Table
window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const importReceiptDetailTable = document.getElementById('importReceiptDetailTable');
    if (importReceiptDetailTable) {
        new simpleDatatables.DataTable(importReceiptDetailTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }

    const showBookTable = document.getElementById('showBookTable');
    if (showBookTable) {
        new simpleDatatables.DataTable(showBookTable, {
        
        });
    }

    const categoryTable = document.getElementById('categoryTable');
    if (categoryTable) {
        new simpleDatatables.DataTable(categoryTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }

    const authorTable = document.getElementById('authorTable');
    if (authorTable) {
        new simpleDatatables.DataTable(authorTable, {
            searchable: false,
            perPageSelect: false,
            paging: false,
        });
    }

});



/*------------------------------------------------------------------------------------------------------------------------------- */
/*-------------------------------------------------Init UI----------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


// Set default date for createAt is today
function defautCreateAtDate(){
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $('#createAt').val(today);
}


function updateTotalFinalPrice(){

    let total = 0;
    $('input[name^="prices"]').each(function() {
        total += parseFloat( $( this ).val() ) || 0;
    });

    console.log("total: ", total);

    $('#totalPrice').val(total);
    $('#finalPrice').val(total);
    
}


function resetDafautInput(e, val){
    const ele = $(e.target.closest("input"));
    
    if(ele.val()){
        console.log("quantity change: ", ele.val());
    }else{
        ele.val(val);
    }

}


function changePublisherId(){
    const publisherName = $("#publisherIp").val();

    const publisher = publishers.find(publisher => {
        return publisher.name === publisherName;
        });

    if (!publisher){
        alert("Không tồn tại publisher này, vui lòng nhập lại hoặc thêm mới");
        return;
    }
    $("#publisherId").val(publisher.id);

}



function initUI(){
    defautCreateAtDate()
    overlayModal();
}




/*------------------------------------------------------------------------------------------------------------------------------- */
/*-------------------------------------------------init event------------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


function initEvent(){


    /**
     * After the user types isbn in the input form and ENTER or click on addImportDetailTbRowBtn Button
     *  - Add Table Row and clear input form
     */
    
    const isbnIpEle = $("#isbnIp");
    isbnIpEle.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            console.log("Enter");        
            const isbn =  $("#isbnIp").val();
            console.log("isbn:",isbn);
            addImportDetailTbRow(isbn);

        }    
    });

    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });


    const addImportDetailTbRowBtnEle = $("#addImportDetailTbRowBtn");
    addImportDetailTbRowBtnEle.click(function(e){
        console.log("addImportDetailTbRowBtn click");        
        const isbn =  $("#isbnIp").val();
        console.log("isbn:",isbn);
        addImportDetailTbRow(isbn);
    })
    

    
    $("#addNewAuthorBtn").click(async function(e){
        const authorName =  $("#newAuthor").val();
        const author = await addNewAuthor(authorName);
        console.log("addNewAuthorBtn: new author: ", author);
        $("#newAuthor").val("");
        $("#authorIp").val(author.name);
    })
    
    $("#addNewAuthorInModalBtn").click(async function(e){
        const authorName =  $("#newAuthorInModal").val();
        const author = await addNewAuthor(authorName);
        console.log("addNewAuthorBtn: new author: ", author);
        $("#newAuthorInModal").val("");
        $("#authorIp").val(author.name);
    })
    
        
    $("#addAuthorTbRowBtn").click(function(e){    
        console.log("addNewAuthorBtn click");
        const authorName =  $("#authorIp").val();
        console.log("authorName:",authorName);
        addAuthorTbRow(authorName);        

    })

    

    $("#addNewCategoryBtn").click(async function(e){
        const categoryName =  $("#newCategory").val();

        if(categoryName === ""){
            alert("Vui lòng nhập tên danh mục");
            return;
        }

        const categoryInDB = await getAuthorsByName(categoryName);
        if(categoryInDB){
            alert("Danh mục đã tồn tại, vui lòng chọn tên khác");
            return;
        }


        const category = await addNewCategory(categoryName);
        console.log("addNewCategoryBtn: new category: ", category);
        $("#newCategory").val("");
        $("#categoryIp").val(category.name);
    })

    

    $("#addNewCategoryInModalBtn").click(async function(e){
        const categoryName =  $("#newCategoryInModal").val();


        if(categoryName === ""){
            alert("Vui lòng nhập tên danh mục");
            return;
        }

        const categoryInDB = await getCategoryByName(categoryName);
        if(categoryInDB){
            alert("Danh mục đã tồn tại, vui lòng chọn tên khác");
            return;
        }

        const category = await addNewCategory(categoryName);
        console.log("addNewCategoryBtn: new category: ", category);
        $("#newCategoryInModal").val("");
        $("#categoryIp").val(category.name);
    })
    
        
    $("#addCategoryTbRowBtn").click(function(e){    
        console.log("addNewCategoryBtn click");
        const categoryName =  $("#categoryIp").val();
        console.log("categoryName:",categoryName);
        addCategoryTbRow(categoryName);        

    })


    $("#addNewPublisherBtn").click(async function(e){
        const publisherName =  $("#newPublisher").val();


        if(publisherName === ""){
            alert("Vui lòng nhập tên nhà xuất bản");
            return;
        }

        const publisherInDB = await getPublisherByName(publisherName);
        if(publisherInDB){
            alert("Nhà xuất bản đã tồn tại, vui lòng chọn tên khác");
            return;
        }

        const publisher = await addNewPublisher(publisherName);
        console.log("addNewPublisherBtn: new publisher: ", publisher);
        $("#newPublisher").val("");
        $("#publisherIp").val(publisher.name);

    })


    $("#addNewBookBtn").click(function(e){
    

        newBookIsbn = $("#newBookIsbn").val();
        newBookPageNumber = $("#newBookPageNumber").val();
        newBookPublisherDate = $("#newBookPublisherDate").val();
        newBookTitle = $("#newBookTitle").val();
        publisherId = $("#publisherId").val();

        authorIds = [];
        categoryIds = [];




        $('input[name^="authorIds"]').each(function() {
            authorIds.push($(this).val());
            console.log("authorId ", $(this).val());
            console.log("authorIds: ", authorIds);
        });
        

        $('input[name^="categoryIds"]').each(function() {
            categoryIds.push($(this).val());
            console.log("categoryId ", $(this).val());
            console.log("categoryIds: ", categoryIds);
        });


        const bookStock = addNewBookStock(newBookIsbn, newBookPageNumber, newBookPublisherDate, newBookTitle, publisherId, authorIds, categoryIds)



        $("#newBookIsbn").val("");
        $("#newBookPageNumber").val("");
        $("#newBookPublisherDate").val("");
        $("#newBookTitle").val("");
        $("#publisherId").val("");
        $("#publisherIp").val("");

    


        for (let authorId of authorIds){
            L("authorItem", authorId);
        }

        for (let categoryId of categoryIds){
            
            removeCategoryTbRow("categoryItem", categoryId);
        }
        // changePublisherId();
    })

}





/*------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------Global variable-------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


// importDetailRowDataSource: handlebars-template source for a row of Import Detail Table
const importDetailRowDataSource = $("#importDetailTableRowTemplate").html();
let currentBookStockIdArr = [];

const categoryRowDataSource = $("#categoryTableRowTemplate").html();
const currentCategoryIdArr = []

const authorRowDataSource = $("#authorTableRowTemplate").html();
const currentAuthorIdArr = [];


let bookStocks = [];
let authors = [];

let publishers = [];
let categorys = [];




// init data

async function initData(){
    authors = await getAllAuthor();
    categorys = await getAllCategory();
    publishers = await getAllPulisher();
}




/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Define function----------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */

async function addImportDetailTbRow(isbn){
    isbn = isbn.trim();
    // const bookStock = bookStocks.find(x => x.book.isbn === isbn);

    let bookStock = null;

    if (isbn !== ""){
        bookStock = await getBookStockByIsbn(isbn);
    }

    console.log(`bookStock của ${isbn} là:`, bookStock);
    const importDetailTableBodyEle = $("#importDetailTableBody");


    if(!bookStock){       
        // $("#addNewBookModal").modal('show');
        $("#addNewBookModalBtn").click();
        

        // if($("#newBookIsbn").val() === ""){
            $("#newBookIsbn").val(isbn);
        // }

        return;
    }

    const id = bookStock.id;

    console.log(`id của ${isbn} là:`, id);

    if (currentBookStockIdArr.length == 0){
        importDetailTableBodyEle.find('tr:first').remove();
    }
    else{
        if (currentBookStockIdArr.includes(id)){
            alert("Đã tồn tạo ISBN");
            return;
        }
    }


    currentBookStockIdArr.push(id);
    // console.log("bookStock:", bookStock);

    console.log("importDetailRowDataSource: ", importDetailRowDataSource);

    const tableDataTemplate = Handlebars.compile(importDetailRowDataSource);

    
    importDetailTableBodyEle.append(tableDataTemplate(bookStock));

    console.log("row: ",tableDataTemplate(bookStock));    
    updateTotalFinalPrice();

    $("#isbnIp").val("");

}    



function removeImportDetailTbRow(index){
    const row = $("#importReceiptDetailItem"+index);
    removeBookStockIdIndex = currentBookStockIdArr.indexOf(index);
    currentBookStockIdArr.splice(removeBookStockIdIndex, 1);
    row.remove();

    console.log(currentBookStockIdArr);



    if (currentBookStockIdArr.length == 0){
        const importDetailTableBodyEle = $("#importDetailTableBody");
        importDetailTableBodyEle.append('<tr><td class="dataTables-empty" colspan="9">No entries found</td></tr>')
    }

    updateTotalFinalPrice();
}



async function addAuthorTbRow(authorName){

    authorName = authorName.trim();

    let authors = [];

    if (authorName !== ""){
        authors = await getAuthorsByName(authorName);
    }


    
    console.log("authors: ", authors);
    if (!authors || authors.length === 0){
        $('#addNewAuthorModalBtn').click();      
        $("#newAuthorInModal").val(authorName);
        return;
    }
    console.log("authors row data:",authors);


    const authorTableBodyEle = $("#authorTableBody");
    console.log("authorRowDataSource: ", authorRowDataSource);
    const tableDataTemplate = Handlebars.compile(authorRowDataSource);
 

    for (author of authors){
        console.log("Lặp trong authors")
        const id = author.id;
        if (currentAuthorIdArr.length == 0){
            authorTableBodyEle.find('tr:first').remove();
        }
        else{
            if (currentAuthorIdArr.includes(id)){
                return;
            }
        }
    
        currentAuthorIdArr.push(id);
        authorTableBodyEle.append(tableDataTemplate(author));
        console.log("row: ",tableDataTemplate(author));         
    }
}


function removeAuthorTbRow(preId, index){


    const row = $("#" + preId + index);
    console.log("row: ", row);

    removeIdIndex = currentAuthorIdArr.indexOf(index);
    currentAuthorIdArr.splice(removeIdIndex, 1);
    row.remove();

    console.log(currentAuthorIdArr);

    if (currentAuthorIdArr.length == 0){
        const authorTableBodyEle = $("#authorTableBody");
        authorTableBodyEle.append('<tr><td class="dataTables-empty" colspan="9">No entries found</td></tr>')
    }

}


async function addCategoryTbRow(categoryName){

    console.log("addCategoryTbRow");

    categoryName = categoryName.trim();

    let category = null;

    if (categoryName !== ""){
        category = await getCategoryByName(categoryName);
    }

    
    console.log("category: ", category);
    if (!category){
        $('#addNewCategoryModalBtn').click();      
        $("#newCategoryInModal").val(categoryName);
        return;
    }
    console.log("category row data:",category); 


    const categoryTableBodyEle = $("#categoryTableBody");
    console.log("categoryRowDataSource: ", categoryRowDataSource);
    const tableDataTemplate = Handlebars.compile(categoryRowDataSource);
 
    console.log("Lặp trong category")
    const id = category.id;
    if (currentCategoryIdArr.length == 0){
        categoryTableBodyEle.find('tr:first').remove();
    }
    else{
        if (currentCategoryIdArr.includes(id)){
            return;
        }
    }

    currentCategoryIdArr.push(id);
    categoryTableBodyEle.append(tableDataTemplate(category));
    console.log("row: ",tableDataTemplate(category));         
}


function removeCategoryTbRow(preId, index){


    const row = $("#" + preId + index);
    console.log("row: ", row);

    removeIdIndex = currentCategoryIdArr.indexOf(index);
    currentCategoryIdArr.splice(removeIdIndex, 1);
    row.remove();
    // console.log(currentCategoryIdArr);

    console.log(currentCategoryIdArr);



    if (currentCategoryIdArr.length == 0){
        const categoryTableBodyEle = $("#categoryTableBody");
        categoryTableBodyEle.append('<tr><td class="dataTables-empty" colspan="9">No entries found</td></tr>')
    }

}


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */



async function addNewBookStock(newBookIsbn, newBookPageNumber, newBookPublisherDate, newBookTitle, publisherId, authorIds, categoryIds){
    
    const bookStock = null;
    await $.ajax({
        url: "/api/stock/book/add",
        method: 'POST',
        data: {
            newBookIsbn,
            newBookPageNumber,
            newBookPublisherDate,
            newBookTitle,
            publisherId,
            authorIds: authorIds,
            categoryIds: categoryIds
        },
        success(data){
            bookStock = data.bookStock;
            console.log("bookStock:", bookStock);

        }
    });

    return bookStock;
}


async function getBookStockByIsbn(isbn){

    let bookStock = null;
    await $.ajax({
        url: `/api/stock/isbns/${isbn}`,
        method: 'GET',
        success(data){
            bookStock = data.bookStock;
            console.log(`bookStock của ${isbn} là:`, bookStock);
        }
    });       

    return bookStock;

}


async function getAllAuthor(){

    let authors = null;
    await $.ajax({
        url: `/api/author`,
        method: 'GET',
        success(data){
            authors = data.authors;
        }
    });       

    return authors;

}

async function getAuthorsByName(name){

    let authors = null;
    await $.ajax({
        url: `/api/author/names/${name}`,
        method: 'GET',
        success(data){
            authors = data.authors;
            console.log(`authors của ${name} là:`, authors);
        }
    });       

    return authors;

}


async function addNewAuthor(authorName){
    let author = null;
    await $.ajax({
        url: "/api/author/add",
        method: 'POST',
        data: {
            authorName
        },
        success(data){
            author = data.author;
            console.log("new author:", author);
            authors.push(author);
        }
    });
    console.log("new author:", author);

    return author;
}


async function getAllCategory(){

    let categorys = null;
    await $.ajax({
        url: `/api/category`,
        method: 'GET',
        success(data){
            categorys = data.categorys;
            categorys.push(category);
        }
    });       

    
    return categorys;

}

async function getCategoryByName(name){
    let category = null;
    await $.ajax({
        url: `/api/category/names/${name}`,
        method: 'GET',
        success(data){
            category = data.category;
            console.log(`category của ${name} là:`, category);
        }
    });       
    return category;
}

async function addNewCategory(categoryName){
    let category = null;
    await $.ajax({
        url: "/api/category/add",
        method: 'POST',
        data: {
            categoryName
        },
        success(data){
            category = data.category;
            console.log("new category:", category);
        }
    });
    console.log("new category:", category);
    return category;
}


async function getAllPulisher(){

    let publishers = null;
    await $.ajax({
        url: `/api/publisher`,
        method: 'GET',
        success(data){
            publishers = data.publishers;
        }
    });       

    return publishers;

}



async function getPublisherByName(name){
    let publisher = null;
    await $.ajax({
        url: `/api/publisher/names/${name}`,
        method: 'GET',
        success(data){
            publisher = data.publisher;
            console.log(`publisher của ${name} là:`, publisher);
        }
    });       
    return publisher;
}


async function addNewPublisher(publisherName){
    let publisher = null;
    await $.ajax({
        url: "/api/publisher/add",
        method: 'POST',
        data: {
            publisherName
        },
        success(data){
            publisher = data.publisher;
            console.log("new publisher:", publisher);
        }
    });
    console.log("new publisher:", publisher);
    return publisher;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// getAuthorList();

// MAIN


$(document).ready(async function() {



    // Init UI

    await initData();

    initUI();

    

    initEvent();


    console.log("authors: ", authors);
    console.log("categorys: ", categorys);
    console.log("publishers: ", publishers);


    

})
