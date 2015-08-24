//variables globales
var tablamatrix=[];
var existenciaactual;
var today;
var now;
var usuario;
//Variables entrada
var identrada;
var cantentrada;
var tipoentrada=3;
//Variables salida
var idsalida;
var cantsalida;
var tiposalida=3;

var enteronaddproducto = false;
var cantidad=0;
var matrixdetalle=[];
var detalle=[];
var codigobusqueda=[];
var codigobusquedacliente=[];
var matrixventa=[];
var detallesventa=[];
var detallepago=0;
var vueltoguardar=0;
var efectivoguardar=0;
var cliente=1;
var descuento=0;
var descuentoporc=0;
var preciosindesc=0;
var ivsindesc=0;
var totalkg=0;
var totalart=0;
var subtotal=0;
var totaliv=0;
var totalventa=0;
var efectivolisto=false;

var vencimiento;
var tipo;
jQuery.ajaxSetup({async:false});

$(document).on('ready', main);
function main () {
//console.log($.now());


        $.ajaxSetup({
		beforeSend: function(xhr, settings) {
			if(settings.type == "POST"){
				xhr.setRequestHeader("X-CSRFToken", $('[name="csrfmiddlewaretoken"]').val());
			}
            if(settings.type == "PUT"){
				xhr.setRequestHeader("X-CSRFToken", $('[name="csrfmiddlewaretoken"]').val());
			}
            if(settings.type == "PATCH"){
				xhr.setRequestHeader("X-CSRFToken", $('[name="csrfmiddlewaretoken"]').val());
			}
		}
	});

        //PANEL DE PAGAR

        $('.btnpagar').on('click', function(event){
            event.preventDefault();
            $('.subtotalpagar').html(subtotal.toFixed(2));
            $('.ivpagar').html(totaliv.toFixed(2));
            $('.descuentopagar').html(descuento.toFixed(2));
            $('.totalpagar').html(totalventa.toFixed(2));
            $('.precio').priceFormat({
            prefix: '₡ ',
            centsSeparator: ',',
            thousandsSeparator: '.'
            });

            $('.cd-panelpagar').addClass('is-visible');
            blurElement('.blurlines',2);
        });
        $('.cd-panelpagar').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelpagar').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
            }
        });
        $('.btntest').on('click', function(event){
            //if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelpagar').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
           // }
        });

        //PANEL DE BUSCAR PRODUCTO

        $('.btnbuscar').on('click', function(event){
            event.preventDefault();
            $('.cd-panelbuscar').addClass('is-visible');
            blurElement('.blurlines',2);
        });
        $('.cd-panelbuscar').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelbuscar').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
            }
        });
        $('#btncerrarbuscar').on('click', function(event){
            //if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelbuscar').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
           // }
        });

        //PANEL DE BUSCAR CLIENTE

        $('.btnbuscarcliente').on('click', function(event){
        event.preventDefault();
        $('.cd-panelbuscarcliente').addClass('is-visible');
        blurElement('.blurlines',2);
        });
        $('.cd-panelbuscarcliente').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelbuscarcliente').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
            }
        });
        $('#btncerrarbuscarcliente').on('click', function(event){
            //if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelbuscarcliente').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
           // }
        });

        //PANEL ENTRADA

        $('.cd-panelentrada').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelentrada').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
            }
        });

        //PANEL SALIDA

        $('.cd-panelsalida').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelsalida').removeClass('is-visible');
                blurElement('.blurlines',0);
                event.preventDefault();
            }
        });



        //remove row

        $('html').on('click','.removerow', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();

            var totalsubquitar= matrixventa[rowIndex][4];
            var totalivquitar= matrixventa[rowIndex][5];
            var totalquitar = matrixventa[rowIndex][6];
            var cantidadquitar=matrixventa[rowIndex][3];

            totalkg=totalkg-cantidadquitar;
            totalart=totalart-1;
            totalventa=Math.round((totalventa-totalquitar) * 1000) / 1000;
            totaliv=Math.round((totaliv-totalivquitar) * 1000) / 1000;
            subtotal=Math.round((subtotal-totalsubquitar) * 1000) / 1000;
            preciosindesc=totalventa;
            ivsindesc=totaliv;

            $('.totalventa').html(totalventa.toFixed(2));
            $('.totaliv').html(totaliv.toFixed(2));
            $('.subtotal').html(subtotal.toFixed(2));
            $('.totalart').html(totalart);
            $('.totalkg').html(totalkg+' Kg');

            $('.precio').priceFormat({
                prefix: '₡ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
            });

            matrixventa.splice( rowIndex,1 );
            console.log(matrixventa);
            $(this).parent().parent().remove();
            if (matrixventa.length==0){
                $("#BtnConfirmar").prop("disabled",true);
            }
        });

        //selectrow buscar producto

        $('html').on('click','.selectrow', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();
            var codigo = codigobusqueda[rowIndex];
            $("#tablabusqueda > tbody").html("");
            $('#producto').val(codigo);
            $('.cd-panelbuscar').removeClass('is-visible');
            blurElement('.blurlines',0);

        });

        //selectrow buscar cliente

        $('html').on('click','.selectrowcliente', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();

            var codigo = codigobusquedacliente[rowIndex][0];
            var nombre = codigobusquedacliente[rowIndex][1];
            var apellido = codigobusquedacliente[rowIndex][2];
            cliente=codigobusquedacliente[rowIndex][3];
            $("#tablabusquedacliente > tbody").html("");
            $('#codigocliente').val(codigo);
            $('#nombrecliente').val(nombre+' '+apellido);
            $("#cliente").val($("#nombrecliente").val());
            $("#nombrecliente").val('Cliente Contado');
            $("#codigocliente").val('0001');
            $("#btnconfirmarcliente").prop('disabled',true);
            $("#codigocliente").prop('disabled',false);
            $("#nombreclientecontado").val('');
            $("#nombreclientebuscar").val('');
            $('.cd-panelbuscarcliente').removeClass('is-visible');
            blurElement('.blurlines',0);
            recalculartablaproductos();

        });

        //eventos enter

        $('#descuento').on('keypress', function (event) {
             if(event.which === 13){
               event.preventDefault();
               Aplicardescuento();
               vuelto();
             }
       });

       /* $('#codigo').on('keypress', function (event) {
             if(event.which === 13){
               event.preventDefault();
               var a = $('#codigo').val();
               $.get('/api/productos/?product_code='+a,ResultadoBusqueda);
             }
       });*/

        $('#busqueda').on('keypress', function (event) {
             if(event.which === 13){
                event.preventDefault();
                BuscarProducto();
             }
       });

        $('#nombreclientebuscar').on('keypress', function (event) {
             if(event.which === 13){
                event.preventDefault();
                BuscarCliente();
             }
       });


        $('#codigocliente').on('keypress', function (event) {
            if(event.which === 13){
                event.preventDefault();
                getcliente();
            }

        });

        $("#montoefectivo").bind("change paste keyup", function() {
            vuelto();
        });

        // Check si cantidad tiene un número
        $("#cantidad").bind("change paste keyup", function() {
                var a =$("#cantidad").val();
                var aa=parseFloat(a);
                var aaa=isNaN(aa);
                enteronaddproducto = !aaa;
            });

        $('#producto').on('keypress', function (event) {
                 if(event.which === 13){
                    event.preventDefault();
                      if ($('#producto').val()!=='' && enteronaddproducto){
                           if($('#cantidad').val()>0){
                               getProducto();
                           }
                           else{
                               alert('la cantidad NO puede ser 0 o menor.');
                           }
                     }
                     else{
                         alert('Ingrese un valor de código y cantidad válidos.');
                     }
                 }
           });

        $('#cantidad').on('keypress', function (event) {
             if(event.which === 13 ){
               if ($('#producto').val()!=='' && enteronaddproducto){
                       if($('#cantidad').val()>0){
                           getProducto();
                       }
                       else{
                           alert('la cantidad NO puede ser 0 o menor.');
                       }
                 }
                 else{
                     alert('Ingrese un valor de código y cantidad válidos.');
                 }
             }
       });

        $( "#pagacontipo" ).change(function() {
            if( $("#pagacontipo").val()==1){
                $(".pagotarjeta").hide();
                $(".pagoefectivo:hidden").show();
                $("#montoefectivo").val(0);
                vuelto();
                $(".pagaconpagar").html('₡ 0,00');
                $(".vueltopagar").html('₡ 0,00');
            }
            if( $("#pagacontipo").val()==2){
                $(".pagoefectivo").hide();
                $(".pagotarjeta:hidden").show();
                $("#montoefectivo").val(0);
                vuelto();
                $(".pagaconpagar").html('TARJETA');
                $(".vueltopagar").html('₡ 0,00');
            }
        });

        //botones

        //boton de busqueda en panel de busqueda producto
        $("#btnbusqueda").on("click",BuscarProducto);


        //botones de cliente

        $("#btnconfirmarcliente").on("click",function(){
            $("#cliente").val($("#nombrecliente").val());
            $('.cd-panelbuscarcliente').removeClass('is-visible');
            blurElement('.blurlines',0);
            $("#nombrecliente").val('Cliente Contado');
            var a = $("#codigocliente").val();
            var cliente2=$.get('/api/clientes/?code='+a,function(){});
            cliente=cliente2.responseJSON[0].id;
            console.log(cliente);

            $("#nombrecliente").val('Cliente Contado');
            $("#codigocliente").val('0001');
            $("#nombreclientecontado").val('');
            $("#nombreclientebuscar").val('');
            $("#btnconfirmarcliente").prop('disabled',true);
            $("#codigocliente").prop('disabled',false);
            $("#tablabusquedacliente > tbody").html("");

            recalculartablaproductos();

        });

         $("#btnconfirmarclientecontado").on("click",function(){
            if($("#nombreclientecontado").val()!==''){
                $("#cliente").val($("#nombreclientecontado").val());
                $('.cd-panelbuscarcliente').removeClass('is-visible');
                blurElement('.blurlines',0);
                cliente=1;
                $("#nombrecliente").val('Cliente Contado');
                $("#codigocliente").val('0001');
                $("#btnconfirmarcliente").prop('disabled',true);
                $("#codigocliente").prop('disabled',false);
                $("#nombreclientecontado").val('');
                $("#nombreclientebuscar").val('');
                $("#tablabusquedacliente > tbody").html("");
                recalculartablaproductos();
            }
             else{
                alert('Debe introducir un nombre válido');
            }

        });

        //boton de busqueda en panel de busqueda cliente
        $("#Btnbuscarcliente").on("click",BuscarCliente);
        //boton de descuento
        $("#btndescuento").on("click",function(){
            Aplicardescuento();
            vuelto();
        });

        $("#BtnRegistrarVenta").on("click",RegistarVenta);

        $("#BtnConfirmar").on("click",ConfirmarDatos);
        $("#BtnNoConfirmar").on("click",NoConfirmarDatos);




        //llenado de espacios e inicializacion
        $(".hideonload").hide();
        $(".pagotarjeta").hide();
        //$(".pagotarjeta").hide();
        $("#BtnNoConfirmar").hide();
        $("#btnconfirmarcliente").prop('disabled',true);




    /// INVENTARIOS DESDE AQUI
    //set usuario
    $.get('/api/cajeros/?user='+$('#cajero').val(),function(data){
        $('#cajero').html('<option value="'+data[0].user+'">'+data[0].name+' '+data[0].last_name+'</option>');
        usuario=data[0].user;
    });
    //Llenar tabla de inventario total

    $.get('/api/productos/',llenarTablabajoIventario);

    $( "#tipoconsulta" ).change(function() {
        $("#filtroinv").val('');
        $("#tablainventario > tbody").html("");
        if($( "#tipoconsulta").val()==1){
            $.get('/api/productos/',llenarTablabajoIventario);
        }
        if($( "#tipoconsulta").val()==2){
            $.get('/api/materiaprima/',llenarTablabajoIventario);
        }
    });

    //filtro
    $("#filtroinv").bind("change paste keyup", function() {
        if($("#filtroinv").val()!=''){

        $("#tablainventario > tbody").html("");
            if($( "#tipoconsulta").val()==1) {
                $.get('/api/productos/?description=' + $("#filtroinv").val(), llenarTablabajoIventario);
            }
            if($( "#tipoconsulta").val()==2){
                $.get('/api/materiaprima/?description=' + $("#filtroinv").val(), llenarTablabajoIventario);
            }
        }
        else{
            $("#tablainventario > tbody").html("");
            if($( "#tipoconsulta").val()==1) {
                $.get('/api/productos/', llenarTablabajoIventario);
            }
            if($( "#tipoconsulta").val()==2){
                $.get('/api/materiaprima/', llenarTablabajoIventario);
            }
        }
    });

    //select row entrada
    $('html').on('click','.selectrowentrada', function () {
        event.preventDefault();
        var row=$(this).closest("tr");
        var rowIndex = row.index();
        $("#codprodentrada").val(tablamatrix[rowIndex][1]);
        $("#descprodentrada").val(tablamatrix[rowIndex][2]);
        existenciaactual=tablamatrix[rowIndex][3];
        $("#extactual").val(tablamatrix[rowIndex][3]);
        identrada=tablamatrix[rowIndex][0];
        $('.cd-panelentrada').addClass('is-visible');
        blurElement('.blurlines',3);
    });

    //select row salida
    $('html').on('click','.selectrowsalida', function () {
        event.preventDefault();
        var row=$(this).closest("tr");
        var rowIndex = row.index();
        $("#codprodsalida").val(tablamatrix[rowIndex][1]);
        $("#descprodsalida").val(tablamatrix[rowIndex][2]);
        existenciaactual=tablamatrix[rowIndex][3];
        $("#extactualsalida").val(tablamatrix[rowIndex][3]);
        idsalida=tablamatrix[rowIndex][0];
        $('.cd-panelsalida').addClass('is-visible');
        blurElement('.blurlines',3);
    });

    //Cambio tipo entrada
    $("#tipoentrada").change(function() {
        if($( "#tipoentrada" ).val()==3){
            $( ".changetipoent" ).html('Ajuste por toma Física: <br/> <br/>');
            $(".produccion").hide();
            $(".compradev").hide();
            $(".tomafisica:hidden").show();
            tipoentrada=3;
        }
        if($( "#tipoentrada" ).val()==4){
            $( ".changetipoent" ).html('Entrada por devolución: <br/> <br/>');
            $(".produccion").hide();
            $(".compradev:hidden").show();
            $(".tomafisica").hide();
            tipoentrada=4;
        }
        if($( "#tipoentrada" ).val()==2){
            $( ".changetipoent" ).html('Entrada por compras: <br/> <br/>');
            $(".produccion").hide();
            $(".compradev:hidden").show();
            $(".tomafisica").hide();
            tipoentrada=2;
        }
        if($( "#tipoentrada" ).val()==1){
            $( ".changetipoent" ).html('Entrada por producción: <br/> <br/>');
            $(".produccion:hidden").show();
            $(".compradev").hide();
            $(".tomafisica").hide();
            tipoentrada=1;
        }
    });

    //cambio tipo salida
    $("#tiposalida").change(function() {
        if($( "#tiposalida" ).val()==3){
            $( ".changetiposal" ).html('Ajuste por toma Física: <br/> <br/>');
            $(".salidageneral").hide();
            $(".ventassal").hide();
            $(".tomafisicasal:hidden").show();
            tiposalida=3;
        }
        if($( "#tiposalida" ).val()==4){
            $( ".changetiposal" ).html('Salida por por producto vencido: <br/> <br/>');
            $(".tomafisicasal").hide();
            $(".salidageneral:hidden").show();
            $(".ventassal").hide();
            tiposalida=4;
        }
        if($( "#tiposalida" ).val()==2){
            $( ".changetiposal" ).html('Salida por desecho de productos: <br/> <br/>');
            $(".tomafisicasal").hide();
            $(".salidageneral:hidden").show();
            $(".ventassal").hide();
            tiposalida=2;
        }
        if($( "#tiposalida" ).val()==1){
            $( ".changetiposal" ).html('Salida por Ventas: <br/> <br/>');
            $(".ventassal:hidden").show();
            $(".tomafisicasal").hide();
            $(".salidageneral").hide();
            tiposalida=1;
        }
        if($( "#tiposalida" ).val()==5){
            $( ".changetiposal" ).html('Salida por Reproceso: <br/> <br/>');
            $(".tomafisicasal").hide();
            $(".salidageneral:hidden").show();
            $(".ventassal").hide();
            tiposalida=5;
        }
    });

    //funciones de entrada
    $("#tomaf").bind("change paste keyup", function() {
        var a =$("#tomaf").val();
        var aa=parseFloat(a);
        var aaa=isNaN(aa);
        //console.log(!aaa);
        if(!aaa){
            $("#btntomaf").prop('disabled',false);
            cantentrada=aa;
        }
        else{
            $("#btntomaf").prop('disabled',true);
            cantentrada=0;
        }
    });
    $("#entcompras").bind("change paste keyup", function() {
        var a =$("#entcompras").val();
        var aa=parseFloat(a);
        var aaa=isNaN(aa);
        //console.log(!aaa);
        if(!aaa){
            $("#btnconfcompdev").prop('disabled',false);
            cantentrada=aa+existenciaactual;
        }
        else{
            $("#btnconfcompdev").prop('disabled',true);
            cantentrada=0;
        }
    });
    $("#produccionsum").bind("change paste keyup", function() {
        var a =$("#produccionsum").val();
        var aa=parseFloat(a);
        var aaa=isNaN(aa);
        //console.log(!aaa);
        if(!aaa){
            $("#btnconfprod").prop('disabled',false);
            cantentrada=aa+existenciaactual;
        }
        else{
            $("#btnconfprod").prop('disabled',true);
            cantentrada=0;
        }
    });

    $("#btntomaf").on("click",RegistarEntrada);
    $("#btnconfcompdev").on("click",RegistarEntrada);
    $("#btnconfprod").on("click",RegistarEntrada);
    $("#BtnPrint").on("click",Imprimir);

    //funciones de Salida
    $("#tomafsal").bind("change paste keyup", function() {
        var a =$("#tomafsal").val();
        var aa=parseFloat(a);
        var aaa=isNaN(aa);
        //console.log(!aaa);
        if(!aaa){
            $("#btntomafsal").prop('disabled',false);
            cantsalida=aa;
        }
        else{
            $("#btntomafsal").prop('disabled',true);
            cantsalida=0;
        }
    });
    $("#salidageneral").bind("change paste keyup", function() {
        var a =$("#salidageneral").val();
        var aa=parseFloat(a);
        var aaa=isNaN(aa);
        //console.log(!aaa);
        if(!aaa){
            $("#btnconfsalgen").prop('disabled',false);
            cantsalida=existenciaactual-aa;
        }
        else{
            $("#btnconfsalgen").prop('disabled',true);
            cantsalida=0;
        }
    });
    $("#salventas").bind("change paste keyup", function() {
        var a =$("#salventas").val();
        var aa=parseFloat(a);
        var aaa=isNaN(aa);
        //console.log(!aaa);
        if(!aaa){
            $("#btnconfventa").prop('disabled',false);
            cantsalida=existenciaactual-aa;
        }
        else{
            $("#btnconfventa").prop('disabled',true);
            cantsalida=0;
        }
    });

    $("#btntomafsal").on("click",RegistarSalida);
    $("#btnconfsalgen").on("click",RegistarSalida);
    $("#btnconfventa").on("click",RegistarSalida);
     /// INVENTARIOS HASTA AQUI

    //valor vencimiento

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month2 = ("0" + (now.getMonth() + 1)).slice(-2);
        var month = ("0" + (now.getMonth() + 2)).slice(-2);
        var year2=now.getFullYear();
        var year=now.getFullYear();
        if (month>12){
            month=month-12;
            year=year+1;
        }
        vencimiento = (year)+"-"+(month)+"-"+(day) ;
        //console.log(vencimiento);
        today = (year2)+"-"+(month2)+"-"+(day) ;
        //console.log(today);

    //valores iniciales

        $("#date").val(today).prop("disabled",true);
        $("#BtnPagar").prop("disabled",true);
        $("#BtnConfirmar").prop("disabled",true);
        $("#cantidad").val(1);
        enteronaddproducto=true;
        $("#cliente").val('Cliente Contado').prop("disabled",true);
        $("#codigocliente").val('0001');
        $("#nombrecliente").val('Cliente Contado').prop("disabled",true);

    }//main

function Imprimir(){
    event.preventDefault();
    $( "#print").printArea();
}

function tiempoahora(){
    var dt = new Date();
    return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
}

function llenarTablabajoIventario(data){
    tablamatrix=[];
    //console.log(data);
        $.each( data, function(i){
            var existencia = data[i].inventory;
            var minimo=data[i].minimum;
            //console.log('TABLA '+existencia);
            if(existencia<=minimo) {
                $('#tablainventario > tbody:last').append('<tr><td>' + data[i].product_code + '</td><td>' + data[i].description +
                '</td><td>' + minimo + '</td><td>' + existencia + '</td></tr>');
                tablamatrix.push([data[i].id, data[i].product_code, data[i].description, data[i].minimum, existencia]);
            }
        });

}



function blurElement(element, size){
            var filterVal = 'blur('+size+'px)';
            $(element)
              .css('filter',filterVal)
              .css('webkitFilter',filterVal)
              .css('mozFilter',filterVal)
              .css('oFilter',filterVal)
              .css('msFilter',filterVal);
}

function RegistarEntrada(){
    $.ajax({
      method: "PATCH",
      url: "/api/productos/"+identrada+"/",

      data: JSON.stringify({

        "inventory": cantentrada

        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
      .success(function() {
                if (tipoentrada==3){

                    crearentrada('Entrada por toma Física',0,cantentrada);
                }
                if (tipoentrada==2){

                    crearentrada('Entrada por compra de producto Factura # '+$("#factcompdev").val(),cantentrada-existenciaactual,0);
                }
                if (tipoentrada==4){

                    crearentrada('Entrada por devolución Factura # '+$("#factcompdev").val(),cantentrada-existenciaactual,0);
                }
                if (tipoentrada==1){

                    crearentrada('Entrada por Producción ',cantentrada-existenciaactual,0);
                }
        })
        .fail(function(data) {
            alertify.alert("Hubo un problema al crear la entrada, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });

}


function crearentrada(datos,peso,nuevopeso){

    $.ajax({
      method: "POST",
      url: "/api/inventarioentrada/",

      data: JSON.stringify({
            "tipo": tipoentrada,
            "datos": datos,
            "producto": identrada,
            "peso": peso,
            "nuevopeso": nuevopeso,
            "date": today,
            "time": tiempoahora(),
            "usuario": usuario
        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
      .success(function() {
        pacthresinvent();
        $("#tablainventario > tbody").html("");
        $.get('/api/productos/?category='+$('#tipoconsulta').val(),llenarTablaIventario);
        alertify.alert('Entrada exitosa',"Entrada a inventario creada con exito");
        $('.cd-panelentrada').removeClass('is-visible');
        blurElement('.blurlines',0);

        })
        .fail(function(data) {
        alertify.alert("Hubo un problema al crear la entrada, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });
}

function RegistarSalida() {
    console.log(cantsalida);
    if ((existenciaactual- cantsalida) < 0||cantsalida<0) {
    alertify.alert("Error","La cantidad de producto que desea descontar es mayor a la existencia actual, ingrese una nueva cantidad o realice una entrada de inventario.");
    }
    else {
        $.ajax({
            method: "PATCH",
            url: "/api/productos/" + idsalida + "/",

            data: JSON.stringify({

                "inventory": cantsalida

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .success(function () {
                if (tiposalida == 3) {

                    crearsalida('Salida por toma Física', 0, cantsalida);
                }
                if (tiposalida == 2) {

                    crearsalida('Salida por desecho de producto', (existenciaactual - cantsalida), 0);
                }
                if (tiposalida == 4) {

                    crearsalida('Salida por Producto vencido', (existenciaactual - cantsalida), 0);
                }
                if (tiposalida == 1) {

                    crearsalida('Salida por venta, Factura # ' + $("#factsalventas").val(), existenciaactual - cantsalida, 0);
                }
                if (tiposalida == 5) {

                    crearsalida('Salida por Reproceso ', existenciaactual - cantsalida, 0);
                }
            })
            .fail(function (data) {
                alertify.alert("Hubo un problema al crear la salida, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            });

    }//else
}//function

function crearsalida(datos,peso,nuevopeso){

    $.ajax({
      method: "POST",
      url: "/api/inventariosalida/",

      data: JSON.stringify({
            "tipo": tiposalida,
            "datos": datos,
            "producto": idsalida,
            "peso": peso,
            "nuevopeso": nuevopeso,
            "date": today,
            "time": tiempoahora(),
            "usuario": usuario
        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
      .success(function() {
        pacthresinvsal();
        $("#tablainventario > tbody").html("");
        $.get('/api/productos/?category='+$('#tipoconsulta').val(),llenarTablaIventario);
        alertify.alert('Salida exitosa',"Salida de inventario creada con exito");
        $('.cd-panelsalida').removeClass('is-visible');
        blurElement('.blurlines',0);
        $("#filtroinv")

        })
        .fail(function(data) {
        alertify.alert("Hubo un problema al crear la salida, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });
}
function pacthresinvsal(){
    var prodinventario=$.get('/api/inventarioresumen/?producto='+idsalida,function(){});

    $.ajax({
            method: "PATCH",
            url: "/api/inventarioresumen/" + prodinventario.responseJSON[0].id + "/",

            data: JSON.stringify({

                "cantidad": cantsalida

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .success(function () {

            })
            .fail(function (data) {
                alertify.alert("Hubo un problema al crear la salida, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            });
}

function pacthresinvent(){
    var prodinventario=$.get('/api/inventarioresumen/?producto='+identrada,function(){});

    $.ajax({
            method: "PATCH",
            url: "/api/inventarioresumen/" + prodinventario.responseJSON[0].id + "/",

            data: JSON.stringify({

                "cantidad": cantentrada

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .success(function () {

            })
            .fail(function (data) {
                alertify.alert("Hubo un problema al crear la entrada, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            });
}

function getcliente(){
    var a =$("#codigocliente").val();
    //console.log(a);
    $.get('/api/clientes/?code='+a,function(data){
        if(data.length!=0){
        $("#nombrecliente").val(data[0].name+' '+data[0].last_name);
        //cliente=data[0].id;
        $("#btnconfirmarcliente").prop('disabled',false);
        $("#codigocliente").prop('disabled',true);
        }
        else{
            //alert('No existe un cliente con ese código');
            alertify.error('No existe un cliente con ese código');
        }
    });

}

function vuelto(){

    var controlpagacon;
            var a =$( "#montoefectivo").val();
            var aa= parseFloat(a).toFixed(2);
            //console.log(a);
            var aaa=isNaN(a);
            var vueltoint;
            controlpagacon = !aaa;

            if(controlpagacon){
                $('.pagaconpagar').html(aa);
                //console.log('IF');
                $('.pagaconpagar').priceFormat({
                prefix: '₡ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
                });
                vueltoint=(aa-totalventa).toFixed(2);
                if(vueltoint<0){
                    efectivolisto=false;
                    $('#vuelto').val('FALTA EFECTIVO');
                    $('.vueltopagar').html('-');
                }
                else{
                efectivolisto=true;
                vueltoguardar=vueltoint;
                efectivoguardar=a;
                $('#vuelto').val(vueltoint);
                $('.vueltopagar').html(vueltoint);
                $('.precio').priceFormat({
                prefix: '₡ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
                });
                }

            }
            else{
                //console.log('ELSE');
                $('.pagaconpagar').html('-');

            }


}

function BuscarCliente(){
    codigobusquedacliente=[];
    $("#tablabusquedacliente > tbody").html("");
    var a=$('#nombreclientebuscar').val();
    var b=$('#tipobusquedacliente').val();
    if(b==1){
        $.get('/api/clientes/?name='+a,llenarTablaBusquedaCliente);
    }
    if(b==2){
        $.get('/api/clientes/?last_name='+a,llenarTablaBusquedaCliente);
    }
    if(b==3){
        $.get('/api/clientes/?identification='+a,llenarTablaBusquedaCliente);
    }
}

function recalculartablaproductos(){
    //clonar matriz de venta
    var matrixinterna=matrixventa;
    //volver a valores iniciales
    matrixventa=[];
    totalkg=0;
    totalart=0;
    subtotal=0;
    totaliv=0;
    totalventa=0;
    //reclacular toda la tabla
    $("#tablaproductos > tbody").html("");
    $.each( matrixinterna, function(i){
        cantidad=matrixinterna[i][3];
         $.get('/api/productos/?product_code='+matrixinterna[i][0],llenartablaProductos);
    });


}

function getProducto(){
    var a=$('#producto').val();
    cantidad =parseFloat($('#cantidad').val());
    $.get('/api/productos/?product_code='+a,llenartablaProductos);
}

function BuscarProducto(){
    codigobusqueda=[];
    $("#tablabusqueda > tbody").html("");
    var a=$('#busqueda').val();
    console.log(a);
    if ($('#tipobusqueda').val()=='1'){
        console.log('desc');
        $.get('/api/productos/?description='+a,llenarTablaBusqueda);
    }
}

function llenarTablaBusqueda(data){
    console.log(data);
        $.each( data, function(i){
            codigobusqueda.push(data[i].product_code);
            $('#tablabusqueda > tbody:last').append('<tr><td>' + data[i].product_code + '</td><td>' + data[i].description +
            '</td><td>' + data[i].price + '</td><td><button  type="button" class=" btn btn-success form-control selectrow " id="btnelegir"><span class="glyphicon glyphicon-plus"></span></button></td></tr>');
        });
}

function llenarTablaBusquedaCliente(data){
        $.each( data, function(i){
            codigobusquedacliente.push([data[i].code,data[i].name,data[i].last_name,data[i].id]);
            $('#tablabusquedacliente > tbody:last').append('<tr><td>' + data[i].code + '</td><td>' + data[i].name +' '+data[i].last_name+
            '</td><td><button  type="button" class=" btn btn-success form-control selectrowcliente " id="btnelegircliente"><span class="glyphicon glyphicon-ok"></span></button></td></tr>');
        });
}

function llenartablaProductos(data){

    if (data.length!==0){
        var inarray= serachmatrix(data[0].product_code);
        var prodinventario=$.get('/api/inventarioresumen/?producto='+data[0].id,function(){});
        var existencia=prodinventario.responseJSON[0].cantidad;
        var montoimpuesto=((data[0].taxes_amount)/100)+1;
        var usaimpuestos=data[0].taxes;
        var ivr=0;
        var iv=0;
        var price;


        if(inarray==-1){//no existe en la tabla
            if (existencia>=cantidad || data[0].ventaneg==true ){
                var pricetouse=determinprice(data);
                //var cantidad =parseFloat($('#cantidad').val());
                var impentabla;
                var pricesub=(pricetouse*cantidad);
                if(usaimpuestos){
                    impentabla='G';

                    iv=(pricetouse*cantidad)*((data[0].taxes_amount)/100);
                    ivr=Math.round((iv) * 1000) / 1000;
                    price=(pricetouse*cantidad)*montoimpuesto;
                    //variable global es afectada solo si usa impuestos
                    totaliv=totaliv+ivr;
                    ivsindesc=totaliv;
                }
                else{
                    impentabla='E';
                    price=(pricetouse*cantidad);
                }
                var pricesubr=Math.round((pricesub) * 1000) / 1000;
                var pricer=Math.round((price) * 1000) / 1000;

                //variables globales
                subtotal=subtotal+pricesubr;
                totalventa=totalventa+pricer;
                preciosindesc =totalventa;
                var totalkg2=parseFloat(totalkg);
                //console.log(totalkg);
                //console.log(totalkg2);
                totalkg=Math.round((totalkg2+cantidad)*1000)/1000;
                totalart=totalart+1;



                $('#tablaproductos > tbody:last').append('<tr><td>' + data[0].product_code + '</td><td>' + data[0].description+ '</td><td class="precio">' +pricetouse.toFixed(2) + '</td><td class=cant'+data[0].product_code+'>' + cantidad + '</td>' +
                '<td>'+impentabla+'</td><td class="precio total'+data[0].product_code+'">' + pricesubr.toFixed(2) +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');

                matrixventa.push([data[0].product_code, data[0].description,pricetouse ,cantidad,pricesubr,ivr,pricer,data[0].id,usaimpuestos]);

                $('#cantidad').val(1);
                totalkg2=parseFloat(totalkg);
                //console.log(totalkg);
                //console.log(totalkg2);
                //Actualizar etiquetas totales con valores nuevos

                $('.subtotal').html(subtotal.toFixed(2));
                $('.totalventa').html(totalventa.toFixed(2));
                $('.totaliv').html(totaliv.toFixed(2));
                $('.totalart').html(totalart);
                $('.totalkg').html(totalkg2 +' Kg');
                $("#BtnConfirmar").prop("disabled",false);

                //formato de campos de precios
                $('.precio').priceFormat({
                    prefix: '₡ ',
                    centsSeparator: ',',
                    thousandsSeparator: '.'
                });
            }//if check inventario
            else{
                 alertify.alert('Bajo Inventario','No hay suficiente cantidad en inventario, la existencia actual es '+existencia+' Kg');
            }//else check inventario no existe

        }//no existe en la tabla

        else{//ya existe en la tabla
            var descontar=cantidad+matrixventa[inarray][3];
            //console.log(data);
            if (existencia>=descontar || data[0].ventaneg==true ){
                matrixventa[inarray][3]=descontar;
                recalculartablaproductos();
            }
            else{
                alertify.alert('Bajo Inventario','No hay suficiente cantidad en inventario, la existencia actual es '+existencia+' Kg');
            }//else check inventario ya existe
        }//ya existe en la tabla

    }
    else{
         alertify.alert('Error de código','El código de producto no es válido!');
    }
}


function determinprice(data){

    var tipo=$.get('/api/clientes/'+cliente+'/',function(){});
    var tipocliente=tipo.responseJSON.clienttype;
    var conganancia;
    var utilidad;

    if (data[0].autoprice==false){//si no es con autoprecio
        //console.log('precio puesto');
        if (tipocliente===1){
           return data[0].price1;
        }
        if (tipocliente===2){
            return data[0].price2;
        }
        if (tipocliente===3){
            return data[0].price3;
        }
    }//if
    else{//si es con autoprecio
         //console.log('precio calculado');
         if (tipocliente===1){
            utilidad=(data[0].utility1/100)+1;
            conganancia=data[0].cost*utilidad;
            return conganancia;
        }
        if (tipocliente===2){
            utilidad=(data[0].utility2/100)+1;
            conganancia=data[0].cost*utilidad;
            return conganancia;
        }
        if (tipocliente===3){
            utilidad=(data[0].utility3/100)+1;
            conganancia=data[0].cost*utilidad;
            return conganancia;
        }

    }//else
}

function serachmatrix(id){
    var control = -1;
    $.each(matrixventa, function(i) {
        //console.log(id);
        if (matrixventa[i][0]==id){
            //console.log('i es igual a '+i);
            //console.log(matrixventa[i][0]);
            control =i;
            return false;
        }
    });
    return control;
}

function Aplicardescuento(){

    var desc=parseFloat($('#descuento').val());
    descuentoporc = desc;
    var descTrue=isNaN(desc);
    //console.log(desc);
    //console.log(descTrue);
    if (!descTrue){
        if(desc>=0 && desc<=100){
            totaliv=ivsindesc*(1-(desc/100));
            descuento=subtotal*(desc/100);
            totalventa=(subtotal-descuento)+totaliv;
            $('.totalventa').html(totalventa.toFixed(2));
            $('.totaliv').html(totaliv.toFixed(2));
            $('.descuento').html(descuento.toFixed(2));
            $('.descuentoside').html(desc + '%');
            //formato de campos de precios
            $('.precio').priceFormat({
                prefix: '₡ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
            });

        }
        else{
            alert("Por favor ingrese un valor de descuento válido");
        }
    }
    else{
        alert("Por favor ingrese un valor de descuento numérico");
    }
}

function ConfirmarDatos(){
$("#descuento").prop('disabled',false);
$("#btndescuento").prop('disabled',false);
$(".removerow").prop('disabled',true);
$("#cantidad").prop('disabled',true);
$("#producto").prop('disabled',true);
$("#Btnbuscarclientemain").prop('disabled',true);
$("#Btnbuscarproducto").prop('disabled',true);
$("#BtnConfirmar").hide();
$("#BtnNoConfirmar:hidden").show();
$("#BtnPagar").prop('disabled',false);
}

function NoConfirmarDatos(){

    $("#descuento").prop('disabled',true).val('');
    $("#btndescuento").prop('disabled',true);
    $(".removerow").prop('disabled',false);
    $("#cantidad").prop('disabled',false);
    $("#producto").prop('disabled',false);
    $("#Btnbuscarclientemain").prop('disabled',false);
    $("#Btnbuscarproducto").prop('disabled',false);
    $("#BtnConfirmar:hidden").show();
    $("#BtnNoConfirmar").hide();
    $("#BtnPagar").prop('disabled',true);
    $('.descuentoside').html('');

    totaliv=ivsindesc;
    descuento=0;
    totalventa=subtotal+totaliv;
    $('.totalventa').html(totalventa.toFixed(2));
    $('.totaliv').html(totaliv.toFixed(2));
    $('.descuento').html(descuento.toFixed(2));
    //formato de campos de precios
    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });
    vuelto();
}

function RegistarVenta(){

    guardardetallepago();
    guardardetalleproducto();
    //descontarinventarios();
    guardarventa();


}

function guardardetallepago(){

if($("#pagacontipo").val()==1){
    $.ajax({
          method: "POST",
          url: "/api/detallepago/",
          async: false,

          data: JSON.stringify({
            "tipopago": 1,
            "montoefectivo": efectivoguardar,
            "vuelto": vueltoguardar,
            "tarjeta": 6,
            "digitos": null,
            "autorizacion": null
            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            })
            .success(function(data){
                //console.log(data.id);
                detallepago=data.id;
            });//ajax
    }//if

if($("#pagacontipo").val()==2){
    $.ajax({
          method: "POST",
          url: "/api/detallepago/",
          async: false,

          data: JSON.stringify({
            "tipopago": 2,
            "montoefectivo": 0,
            "vuelto": 0,
            "tarjeta": $("#tipotarjeta").val(),
            "digitos": $("#4digits").val(),
            "autorizacion": $("#authtarjeta").val()
            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            })
            .success(function(data){
                detallepago=data.id;
            });
    }//if
}//function

function guardardetalleproducto(){

    //matrixventa.push([data[0].product_code, data[0].description,pricetouse ,cantidad,pricesubr,ivr,pricer,data[0].id,usaimpuestos]);
    event.preventDefault();
     $.each( matrixventa, function(i){

        $.ajax({
          method: "POST",
          url: "/api/detalleproducto/",
          async: false,

          data: JSON.stringify({
                "producto": matrixventa[i][7],
                "preciouni": matrixventa[i][2],
                "cantidad": matrixventa[i][3],
                "iv": matrixventa[i][8],
                "total": matrixventa[i][4]
            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 "+data.responseText);
            })
            .success(function(data){
               detallesventa.push(data.id);
                console.log(detallesventa);
            });
    });

}

function guardarventa(){
    $.ajax({
          method: "POST",
          url: "/api/detallepago/",
          async: false,

          data: JSON.stringify({
            "client": null,
            "nombrecliente": "",
            "cashier": null,
            "date": today,
            "time": null,
            "totolkilogramos": totalkg,
            "cantidadarticulos": totalart,
            "subtotal": subtotal,
            "iv": totaliv,
            "descopor": descuentoporc,
            "desctocol": descuento,
            "total": totalventa,
            "detalleproductos": detallesventa,
            "datosdelpago": detallepago
            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            })
            .success(function(data){
                //detallepago=data.id;
            });
}


function guardarDetalle() {

    event.preventDefault();
    var lote =$("#lote").val();
    var control=matrixdetalle.length;
    //console.log(lote);

    $.each( matrixdetalle, function(i){

        $.ajax({
          method: "POST",
          url: "/api/detalledeshuese/",
          async: false,

          data: JSON.stringify({
            "producto": matrixdetalle[i][0],
            "peso": matrixdetalle[i][1],
            "lote": lote
            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964");
            })
            .success(function(data){
                console.log(data);
            });

        $.ajax({
          method: "POST",
          url: "/api/inventariototal/",
          async: false,

          data: JSON.stringify({
            "producto": matrixdetalle[i][0],
            "peso": matrixdetalle[i][1],
            "lote": lote,
            "vencimiento": vencimiento,
            "tipo":tipo

            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alert("Hubo un problema al crear el inventario, por favor intente de nuevo o contacte a Emanuel al # 83021964");
            })
            .success(function(data){
                console.log(data);
            });


        if(i==(control-1)){
            console.log(control);
            console.log(i);

            $.get('/api/detalledeshuese/?lote='+lote, function (data) {
                $.each( data, function(index){
                    detalle.push(data[index].id);
               });
               // console.log(detalle);
                guardarDeshuese();
            });

            }//if
    });


    //guardarDeshuese();
}//Guardar Detalle

function test(){

 var lote =parseInt($("#lote").val());
    console.log(detalle);
    var data2= JSON.stringify({
        "lote": lote,
        "pesototal": pesodesh,
        "mermakg": mermakg,
        "mermapor": mermaporc,
        "detalle": detalle
        });
    console.log(data2);

}

function guardarDeshuese() {
    console.log(detalle);
    var lote =parseInt($("#lote").val());
    //var mermaporc2=parseFloat(mermaporc);

    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/deshuese/",
      async: false,

      data: JSON.stringify({
        "lote": lote,
        "pesototal": pesodesh,
        "mermakg": mermakg,
        "mermapor": mermaporc,
        "detalle": detalle
        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
    .fail(function(data){
            console.log(data.responseText);
            alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964");
        })
    .success(function(data){
            console.log(data);
            patchlote();
            
        });

}//Guardar Deshuese

function errorhandle (data){

    console.log(data);
        if (data.status=="Success"){
            console.log(data.status);
            patchcanal();
        }
        else{
                $(".failmessage:hidden").show("slow");

                if (typeof data.errores.date!=='undefined' ){

                    $("#dateerror:hidden").show("slow");
                    $("#dateerror").html(data.errores.date[0]);
                    $("#date").addClass("errorlist2");
                }
                if (typeof data.errores.lotenum!=='undefined' ){

                    $("#lotenumerror:hidden").show("slow");
                    $("#lotenumerror").html(data.errores.lotenum[0]);
                    $("#numlote").addClass("errorlist2");
                }
                if (typeof data.errores.fierro!=='undefined' ){

                    $("#fierronumerror:hidden").show("slow");
                    $("#fierronumerror").html(data.errores.fierro[0]);
                    $("#fierronum").addClass("errorlist2");

                }
                if (typeof data.errores.canalesqty!=='undefined' ){

                    $("#cantcanaleserror:hidden").show("slow");
                    $("#cantcanaleserror").html(data.errores.canalesqty[0]);
                    $("#cantcanales").addClass("errorlist2");
                }
                if (typeof data.errores.canales!=='undefined' ){

                    $("#canaleserror:hidden").show("slow");
                    $("#canaleserror").html(data.errores.canales[0]);
                    $("#canales").addClass("errorlist2");
                }
                 if (typeof data.errores.totalweight!=='undefined' ){

                    $("#pesototalerror:hidden").show("slow");
                    $("#pesototalerror").html(data.errores.totalweight[0]);
                    $("#pesototal").addClass("errorlist2");
                }
            }


}
function errorclean(){

    $(".hideonload").hide();

    $("#dateerror:hidden").hide();
    $("#dateerror").html("");
    $("#date").removeClass("errorlist2");

    $("#lotenumerror:hidden").hide();
    $("#lotenumerror").html("");
    $("#numlote").removeClass("errorlist2");

    $("#fierronumerror:hidden").hide();
    $("#fierronumerror").html("");
    $("#fierronum").removeClass("errorlist2");

    $("#canaleserror:hidden").hide();
    $("#canaleserror").html("");
    $("#canales").removeClass("errorlist2");

    $("#cantcanaleserror:hidden").hide();
    $("#cantcanaleserror").html("");
    $("#cantcanales").removeClass("errorlist2");

    $("#pesototalerror:hidden").hide();
    $("#pesototalerror").html("");
    $("#pesototal").removeClass("errorlist2");

}

function patchlote(){
event.preventDefault();
    var lote =parseInt($("#lote").val());


        $.ajax({
      method: "PATCH",
      url: "/api/lotes/"+lote+"/",

      data: JSON.stringify({

        "isondeshuese": true

        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"

        })

      .success(function() {
        $("#BtnCrear").prop("disabled",true);
        $("#BtnNoConfirmar").prop("disabled",true);
        $(".succesmessage:hidden").show("slow");
        })
        .fail(function() {
        //$("#BtnCrear").prop("disabled",true);
        $(".failmessage:hidden").show("slow");
        });


}
