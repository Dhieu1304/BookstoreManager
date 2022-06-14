


function initUI(){
    const totay = new Date();
    $("#createdAt").val(totay.toDateString());
}


function initEvent(){
    
    $("#phoneIp").change(async function(){

        const phone = $("#phoneIp").val();

        const customer = await getCustomerByPhoneNumber(phone);
        console.log("customer:", customer);

        if(customer){
            $("#phone").val(customer.phone)
            $("#name").val(customer.name)
            $("#address").val(customer.address)
            $("#email").val(customer.email)
            $("#dept").val(customer.dept)
            $("#id").val(customer.id)
        }else{
            $("#phone").val("");
            $("#name").val("");
            $("#address").val("");
            $("#email").val("");
            $("#dept").val("");
            $("#id").val("");
            alert("Số điện thoại không tồn tại");
         
        }
    })

    $("#moneyIp").keyup(function(){

        const money = $("#moneyIp").val();

        $("#money").val(money)
        
    })

}



$(document).ready(function() {

    initUI();
    initEvent();
    
});


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Ajax function--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */

async function getCustomerByPhoneNumber(number){
    let customer = null;
    await $.ajax({
        url: `/api/customer/phone/${number}`,
        method: 'GET',
        success(data){
            customer = data.customer;
            console.log(`customer của ${number} là:`, customer);
        }
    });       

    return customer;
}
