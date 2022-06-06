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
        $("#newAuthor").val("");
    })
    
    $("#newAuthorInModalBtn").click(async function(e){
        const authorName =  $("#newAuthorInModal").val();
        const author = await addNewAuthor(authorName);
        $("#newAuthorInModal").val("");
    })
    
        
    $("#addAuthorTbRowBtn").click(function(e){    
        console.log("addNewAuthorBtn click");
        const authorName =  $("#authorIp").val();
        console.log("authorName:",authorName);
        addAuthorTbRow(authorName);        

    })

    
    $("#addCategoryTbRowBtn").click(function(e){
        
        const categoryName =  $("#categoryIp").val();

        const category = categorys.find(category => {
            return category.name === categoryName;
          });

        if (!category){
            alert("Không tồn tại category này, vui lòng nhập lại hoặc thêm mới");
            return;
        }


        $("#categoryIp").val("");

        console.log("category:",category);
        addNewCategoryRow(category);

    })

    $("#addNewCategoryBtn").click(function(e){
        
        const categoryName =  $("#newCategory").val();


            $.ajax({
            url: "/api/stock/category/add",
            method: 'POST',
            data: {
                categoryName
            },
            success(data){
                category = data.category;
                console.log("category:", category);

                categorys.push(category);
            }

    }
            );

        $("#newCategory").val("");

    })
}





/*------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------Global variable-------------------------------------------------------------- */
/*------------------------------------------------------------------------------------------------------------------------------- */


// importDetailRowDataSource: handlebars-template source for a row of Import Detail Table
const importDetailRowDataSource = $("#importDetailTableRowTemplate").html();
let customers = [];
let currentBookStockIdArr = [];



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// getAuthorList();
$(document).ready(function() {



    // Init UI
    initUI();


    initEvent();




    
    
    $("#addNewPublisherBtn").click(function(e){
        
        const publisherName =  $("#newPublisher").val();


            $.ajax({
            url: "/api/stock/publisher/add",
            method: 'POST',
            data: {
                publisherName
            },
            success(data){
                publisher = data.publisher;
                console.log("publisher:", publisher);
                publishers.push(publisher);
            }

    }
            );

        $("#newPublisher").val("");

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



            $.ajax({
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

                bookStocks.push(bookStock);
            }

     }
            );


            $.ajax({
                url: "/api/stock",
                success(data){
                    // bookStock = data.bookStock;
                    bookStocks = data.bookStocks;
                    console.log("bookStock:", bookStock);
    
                    // bookStocks.push(bookStock);
                }
    
         }
                );

        $("#newBookIsbn").val("");
        $("#newBookPageNumber").val("");
        $("#newBookPublisherDate").val("");
        $("#newBookTitle").val("");
        $("#publisherId").val("");
        $("#publisherIp").val("");

    


        for (let authorId of authorIds){
            removeAuthorTbRow("authorItem", authorId);
        }

        for (let categoryId of categoryIds){
            
            removeCategoryTableRow("categoryItem", categoryId);
        }

        // changePublisherId();

    })

    
    

    // Sau khi đưa trỏ chuột ra ngoài input của isbnIpEle thì làm rỗng nó.
    // isbnIpEle.blur(function(){
    //     isbnIpEle.val("");
    // });


    const customerPhoneNumberIpEle = $("#customerPhoneNumberIp");

    customerPhoneNumberIpEle.blur(function(){

        const phoneNumber = customerPhoneNumberIpEle.val().trim();
        $.ajax({
            url: `/api/customer/phone/${phoneNumber}`,
            success(data){
                const customer = data.customer;
                console.log("customer:", customer);

                if(customer){
                    $("#customerId").val(customer.id);
                }else{
                    alert("Số điện thoại không tồn tại");
                    customerPhoneNumberIpEle.val("");
                }
                
            }

        });
    });


    

})


const categoryRowDataSource = $("#categoryTableRowTemplate").html();

const currentCategoryIdArr = []
function addNewCategoryRow(category){


    const categoryTableBodyEle = $("#categoryTableBody");

    const id = category.id;
    if (currentCategoryIdArr.length == 0){
        categoryTableBodyEle.find('tr:first').remove();
    }
    else{
        if (currentCategoryIdArr.includes(id)){
            // console.log("Đã tồn tạo ID");
            return;
        }
    }

    currentCategoryIdArr.push(id);



    console.log("categoryRowDataSource: ", categoryRowDataSource);

    const tableDataTemplate = Handlebars.compile(categoryRowDataSource);



    
    categoryTableBodyEle.append(tableDataTemplate(category));

    console.log("row: ",tableDataTemplate(category));    
}

function removeCategoryTableRow(preId, index){


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





const authorRowDataSource = $("#authorTableRowTemplate").html();

const currentAuthorIdArr = [];





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

    // console.log('$("#publisher").val()', $("#publisher").val());

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
    const authors = await getAuthorsByName(authorName);
    console.log("authors: ", authors);
    if (!authors || !authors.length === 0){
        $('#addNewAuthorModalBtn').click();      
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


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */

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
    $.ajax({
        url: "/api/author/add",
        method: 'POST',
        data: {
            authorName
        },
        success(data){
            author = data.author;
            console.log("new author:", author);
        }
    });
    return author;
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




{/* <tr>
<td><img class="import-book-img"  src="https://robohash.org/nostrumporroexplicabo.png?size=50x50&set=set1"></td>
<td>Tiger Nixon</td>
<td>System Architect</td>
<td>Edinburgh</td>
<td>61</td>
<td>2011/04/25</td>
<td>$320,800</td>
<td>$320,800</td>
<td>5</td>
<td>
    <button type="button" class="mx-2 btn btn-success custom-btn" data-toggle="modal" data-target="">
        <i class="fa-solid fa-check custom-btn-icon"></i>
    </button>
</td>
</tr> */}

{/* <tr id="importReceiptDetailItem0">
<td><img class="import-book-img"  src="https://robohash.org/nostrumporroexplicabo.png?size=50x50&set=set1"></td>
<td>Tiger Nixon</td>
<td>System Architect</td>
<td>Edinburgh</td>
<td>61</td>
<td>2011/04/25</td>
<td>$320,800</td>
<td>$320,800</td>
<td>
    <button type="button" class="mx-2 btn btn-danger custom-btn" onclick="removeImportReceiptDetailItem(0)">
        <i class="fa-solid fa-trash custom-btn-icon"></i>
    </button>
</td>
</tr> */}


// const authorListDataSource = $("#authorListTemplate").html();



// async function resetAuthorList(){


//     // await getAuthorList();

//     // authors = [
//     //     {name: "Sang"},
//     // ]

//     console.log("authors:", authors);

//     console.log("authorListDataSource: ", authorListDataSource);

//     const authorListEle = $("#authorList");

//     console.log("authorListEle html:", authorListEle.html());

//     console.log("authorListEle: ", authorListEle);

//     const authorListDataTemplate = Handlebars.compile(authorListDataSource);
    
//     console.log("authorListDataTemplate: ", authorListDataTemplate);

//     let xxx = "Sang"

//     authorListEle.html(authorListDataTemplate({authors}));

//     console.log("authorListData: ", authorListDataTemplate(authors));

// }


// function getAuthorList(){
//     $.ajax({
//         url: "/api/author",
//         success(data){
//             authors = data.authors;
//             console.log(authors);
//         }
//     });
// }
