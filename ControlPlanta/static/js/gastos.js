$(document).on('ready', main);
function main () {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    today2=(day) +"/"+(month)+"/"+now.getFullYear();
    $('.date').val(today);
    //$('.disablecheckbox').prop("disabled",true);

    //$(".tipocanal option[value='3']").prop('disabled',true);
    //$(".tipocanal option[value='4']").remove();
    //$(".tipocanal option[value='5']").remove();
    //$(".tipocanal option[value='6']").remove();


}

