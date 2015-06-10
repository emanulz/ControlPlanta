$(document).on('ready', main);
function main () {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    today2=(day) +"/"+(month)+"/"+now.getFullYear();
    $('.date').val(today);
    $('.disablecheckbox').prop("disabled",true);






}