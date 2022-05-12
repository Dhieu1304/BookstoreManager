

let customers = [];



$.ajax({
    url: "/api/customer",
    success(data){
        customers = data.customers;
    }

});

$(document).ready(function() {

    

    $("#phone").change(function(){

        const phone = $("#phone").val();

        const customer = customers.find(customer => customer.phone === phone);

        console.log("customer:", customer);

        if(customer){

            $("#name").val(customer.name)
            $("#address").val(customer.address)
            $("#email").val(customer.email)
            $("#id").val(customer.id)
        }else{
            $("#name").val("")
            $("#address").val("")
            $("#email").val("")
            $("#id").val("")
            alert("Số điện thoại không tồn tại");
    

            
        }
    })


})