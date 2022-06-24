


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Global Variable--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */


const MAX_BILL_REGULATION_ROUTER = "max-bill-money";

let maxBillMoneyRegulation;



async function initData(){
    maxBillMoneyRegulation = await getRegulationByPathRouter(MAX_BILL_REGULATION_ROUTER);
}



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


    $("#saveBillFormBtn").click(async function(e){
        
        console.log("Save click");



        
        const id = $("#id").val();

        if(!id){
            alert("Please enter a valid phone number")
        }


        const money = parseFloat($("#money").val()) || 0;

        if (money === 0){
            alert("Money pay number must be greater than 0")
        }



        let success = true;

        if(maxBillMoneyRegulation.is_used){

            console.log("Use");
            
            const money = parseFloat($("#money").val()) || 0;
            const oldDept =  parseFloat($("#dept").val()) || 0;

            console.log("money: ", money);
            console.log("oldDept: ", oldDept);


            if(money > oldDept){
                const message = "The amount of the payment cannot exceed the amount owed";
                $("#moneyIp").focus();
                alert(message);
                success = false;
                return;
            }
        }

        if(success){
            $("#billForm").submit();
        }
        
    })
}







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



async function getRegulationByPathRouter(pathRouter){


    let regulation = null;
    const urlApi = "/regulation/api/" + pathRouter;

    await $.ajax({
        url: urlApi,
        success: function (data){
            regulation = data.value;
            console.log("regulation: ", regulation);
        }
    })




    return regulation;

}


/*------------------------------------------------------------------------------------------------------------------------------- */
/*-----------------------------------------------Main--------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------- */

$(document).ready(async function() {

    await initData();
    initUI();
    initEvent();
    
});
