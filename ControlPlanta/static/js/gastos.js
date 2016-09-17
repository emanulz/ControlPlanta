

$(document).on('ready', main);

var gasto_code='';
var prov_code='';

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

    var proveedor = $('.proveedor');
    var factura = $('.factura');

    $('.new_gasto').on('click', function () {

        window.location = '/addgasto/'

    });

    $('.btn_crear').on('click', function () {

        $('.code_div :input').attr("disabled", false);

    });

    $('#BtnPrint').on('click', function () {

        Imprimir();

    });


    proveedor.on('change', function () {

        generate_code();

    });

    factura.on('change', function () {

        generate_code();

    });


    $('.code_div :input').attr("disabled", true);

    var gastoid = getUrlParameter('id');

    if(gastoid){

        load_gasto(gastoid);

        $('.form_div :input').attr("disabled", true);

        $(".submit_btn").hide();
        $(".new_gasto_div:hidden").show();


        $(".titulo_gasto").html('Detalles del Gasto:');

        $(".comprobante_div:hidden").show();


    }

}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function Imprimir(){

    event.preventDefault();

    $('#BtnPrint').hide();

    $( ".comprobante_div").printArea();

    $('#BtnPrint').show();
}

function generate_code() {

    var fact_code = $('.factura').val();
    var proveedor = $('.proveedor');

    $.get('/api/proveedores/'+proveedor.val()+'/',function(data){

        prov_code = data.fierro

    }).done(function () {
        gasto_code = prov_code.toString()+fact_code.toString();
        $('.code').val(gasto_code);
    });



}


function load_gasto(id) {

    var code = $('.code');
    var date = $('.date');
    var proveedor = $('.proveedor');
    var tipo = $('.tipo');
    var factura = $('.factura');
    var monto = $('.monto');
    var cantidad = $('.cantidad');
    var unidad = $('.unidad');
    var descripcion = $('.descripcion');

    var num_comp = $('.num_comp');
    var date_comp = $('.fecha_comp');
    var proveedor_comp = $('.proveedor_comp');
    var tipo_comp = $('.tipo_comp');
    var factura_comp = $('.factura_comp');
    var monto_comp = $('.monto_comp');
    var cantidad_comp = $('.cantidad_comp');
    var unidad_comp = $('.unidad_comp');
    var descripcion_comp = $('.descripcion_comp');


    $.get('/api/gasto/'+id+'/',function(data){

        code.val(data.code);
        date.val(data.date);
        proveedor.val(data.proveedor);
        tipo.val(data.tipo);
        factura.val(data.factura);
        monto.val(data.amount);
        cantidad.val(data.cantidad);
        unidad.val(data.unidad);
        descripcion.val(data.description);

        num_comp.html(data.code);
        date_comp.html(data.date);
        proveedor_comp.html(proveedor.find('option:selected').text());
        tipo_comp.html(tipo.find('option:selected').text());
        factura_comp.html(data.factura);
        monto_comp.html(data.amount);
        cantidad_comp.html(data.cantidad);
        unidad_comp.html(unidad.find('option:selected').text());
        descripcion_comp.html(data.description);

        Imprimir();

    });

}