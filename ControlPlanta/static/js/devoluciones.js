//variables globales

//devoluciones:

var matrixDevolucion=[];
var totalKgDev=0;
var totalNCDev=0;
var facturaDev=0;
var clienteDev=0;
var detallesDev=[];
var devid=0;

var liquidarFacturaNC=false;
var montoNCAplicar=0;
var factPendientesNC=[];
var notaCreditoID=0;
var nostasCredCliente=[];

//termina devoluciones

var descuentoyaaplicado = false;
var enteronaddproducto = false;
var cantidad=0;
var nuevaext;
var matrixdetalle=[];
var detalle=[];
var codigobusqueda=[];
var canaleslist=[];
var codigobusquedacliente=[];
var matrixventa=[];
var detallesventa=[];
var detallepago=0;
var vueltoguardar=0;
var efectivoguardar=0;
var cliente=1;
var usuario=1;
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
var ventaid;
var today;
var todaynorm;
var creditoaprobado=false;
var saldoantcred=0;
var saldoactcred=0;

var vencimiento;
var tipo;

jQuery.ajaxSetup({async:false});

$(document).on('ready', main);

function main () {
//console.log($('#cajero').val());


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
                $("#pagacontipo").val(1);
                $(".pagotarjeta").hide();
                $(".credito").hide();
                $(".pagoefectivo:hidden").show();
                $("#montoefectivo").val(0);
                vuelto();
                $(".pagaconpagar").html('₡ 0,00');
                $(".vueltopagar").html('₡ 0,00');
                event.preventDefault();
            }
        });
        $('.btntest').on('click', function(event){
            //if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelpagar').removeClass('is-visible');
                $("#pagacontipo").val(1);
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

        //PANEL DE BUSCAR CANAL
        $('.cd-panelcanal').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelcanal').removeClass('is-visible');
                blurElement('.blurlines',0);
                canaleslist=[];
                $("#tablacanales > tbody").html("");
                event.preventDefault();
            }
        });

        $('#btncerrarcanal').on('click', function(event){
            //if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelcanal').removeClass('is-visible');
                blurElement('.blurlines',0);
                canaleslist=[];
                $("#tablacanales > tbody").html("");
                event.preventDefault();
           // }
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

        $('html').on('click','.selectrowdevolveredit', function () {
            var row=$(this).closest("tr");
            var rowIndex = row.index();

            $('#btnDevrow'+rowIndex).prop('disabled',false);
            $('#btnEditrow'+rowIndex).prop('disabled',true);

            totalKgDev=totalKgDev-matrixDevolucion[rowIndex][5];
            totalNCDev=totalNCDev-matrixDevolucion[rowIndex][6];

            matrixDevolucion[rowIndex][5] = 0;
            matrixDevolucion[rowIndex][6] = 0;
            matrixDevolucion[rowIndex][7] = false;

            $($('#tablaproductos').find('tbody > tr')[rowIndex]).children('td')[6].innerHTML = 0;
            $($('#tablaproductos').find('tbody > tr')[rowIndex]).children('td')[7].innerHTML = 0;



            $('.totalKgDevolucion').html(totalKgDev);
            $('.ncDevolucion').html(totalNCDev.toFixed(2));

            $('.precio').priceFormat({
                prefix: '₡ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
            });

            $('.formTotales').hide();

            $.each(matrixDevolucion, function (i) {

            if( matrixDevolucion[i][7]==true){
               $('.formTotales:hidden').show();
            }

            });


        });

        //selectrow devolver

        $('html').on('click','.selectrowdevolver', function () {

            event.preventDefault();


            var valorDevolver=0;
            var row=$(this).closest("tr");
            var rowIndex = row.index();

            console.log(matrixDevolucion[rowIndex][4]);

            alertify.prompt('Ingrese la cantidad a devolver', '0').set('labels', {ok:'Aceptar!', cancel:'Cancelar'}).set('type', 'number')
            .set('onok',function(closeEvent,value){


                if(value>0 && value <= matrixDevolucion[rowIndex][3]) {

                    $('.formTotales:hidden').show();

                    valorDevolver = parseFloat(value);
                    $($('#tablaproductos').find('tbody > tr')[rowIndex]).children('td')[6].innerHTML = valorDevolver;
                    matrixDevolucion[rowIndex][5] = valorDevolver;
                    matrixDevolucion[rowIndex][6] = valorDevolver*matrixDevolucion[rowIndex][2];
                    matrixDevolucion[rowIndex][7] = true;
                    $($('#tablaproductos').find('tbody > tr')[rowIndex]).children('td')[7].innerHTML = (valorDevolver*matrixDevolucion[rowIndex][2]).toFixed(2);

                    $('#btnDevrow'+rowIndex).prop('disabled',true);
                    $('#btnEditrow'+rowIndex).prop('disabled',false);

                    totalKgDev=totalKgDev+matrixDevolucion[rowIndex][5];
                    totalNCDev=totalNCDev+matrixDevolucion[rowIndex][6];

                    $('.totalKgDevolucion').html(totalKgDev);
                    $('.ncDevolucion').html(totalNCDev.toFixed(2));


                    $('.precio').priceFormat({
                    prefix: '₡ ',
                    centsSeparator: ',',
                    thousandsSeparator: '.'
                    });

                }
                else{
                    alertify.alert('Error','La cantidad a devolver no debe ser mayor a la vendida o menor a cero.');
                }


            }).set('title','Devolución');



            //console.log(valorDevolver);



            //$($('#tablaproductos').find('tbody > tr')[rowIndex]).children('td')[6].innerHTML = valorDevolver;

            //$($('#calendar').find('tbody > tr')[índice de la fila]).children('td')[índice de la columna].innerHTML = texto a cambiar;

            //var codigo = codigobusqueda[rowIndex];
            //$("#tablabusqueda > tbody").html("");
            //$('#producto').val(codigo);
            //$('.cd-panelbuscar').removeClass('is-visible');
            //blurElement('.blurlines',0);

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

        //selectrow canal
        $('html').on('click','.selectrowcanal', function () {
            event.preventDefault();
            var EntOMed=true;
            var row=$(this).closest("tr");
            var rowIndex = row.index();
            var precio=$('#preciocanalkilo').val();
            var pesonuevo=$('#pesocanalnuevo').val();
            if($('#vendidoEntOMedio').val()==2){EntOMed=false}
            if($('#vendidoEntOMedio').val()==1){EntOMed=true}
            if(precio==''){
                alertify.alert('Error','Ingrese un precio válido');
            }
            else{
                if(canaleslist[rowIndex][6]==true && EntOMed==true ){//si la mitad ta fue vendida y se quiere vender entero
                 alertify.alert('Error','Ya fue vendida la mitad del canal seleccionado, por favor elijar ser vendido en mitad.');
                }
                else {
                    if (pesonuevo == '') {
                        agregarcanalatabla(canaleslist[rowIndex][0], canaleslist[rowIndex][5], precio, canaleslist[rowIndex][2], EntOMed);
                    }
                    else {
                        //canaleslist.push([data[i].id,data[i].consecutive,data[i].weight,data[i].qualification,data[i].fierro,data[i].tipo]);
                        agregarcanalatabla(canaleslist[rowIndex][0], canaleslist[rowIndex][5], precio, pesonuevo, EntOMed);
                    }
                }
            }
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
            checkEnableVenta();
        });
        $("#4digits").bind("change paste keyup", function() {
            checkEnableVenta();
        });
        $("#authtarjeta").bind("change paste keyup", function() {
            checkEnableVenta();
        });
        $("#numtransf").bind("change paste keyup", function() {
            checkEnableVenta();
        });
        $("#chequenum").bind("change paste keyup", function() {
            checkEnableVenta();
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
                               alertify.alert('Error','la cantidad NO puede ser 0 o menor.');
                           }
                     }
                     else{
                         alertify.alert('Error','Ingrese un valor de código y cantidad válidos.');
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
                            alertify.alert('Error','la cantidad NO puede ser 0 o menor.');
                       }
                 }
                 else{
                     alertify.alert('Error','Ingrese un valor de código y cantidad válidos.');
                 }
             }
       });

        $( "#pagacontipo" ).change(function() {
            if( $("#pagacontipo").val()==1){
                $(".cheque").hide();
                $(".transferencia").hide();
                $(".pagotarjeta").hide();
                $(".credito").hide();
                $(".pagoefectivo:hidden").show();
                $("#montoefectivo").val(0);
                vuelto();
                checkEnableVenta();
                $(".pagaconpagar").html('₡ 0,00');
                $(".vueltopagar").html('₡ 0,00');
            }
            if( $("#pagacontipo").val()==2){
                $(".cheque").hide();
                $(".transferencia").hide();
                $(".pagoefectivo").hide();
                $(".credito").hide();
                $(".pagotarjeta:hidden").show();
                $("#montoefectivo").val(0);
                vuelto();
                checkEnableVenta();
                $(".pagaconpagar").html('TARJETA');
                $(".vueltopagar").html('₡ 0,00');
            }
            if( $("#pagacontipo").val()==3){
                $(".cheque").hide();
                $(".transferencia").hide();
                $('.errorsaldoactual').hide();
                $('.errornocredito').hide();
                $(".pagoefectivo").hide();
                $(".pagotarjeta").hide();
                $(".credito:hidden").show();
                $("#montoefectivo").val(0);
                var cliente2=$.get('/api/clientes/'+cliente+'/',function(){});
                //cliente=cliente2.responseJSON[0].id;
                $("#nombreclientecred").val(cliente2.responseJSON.name+' '+cliente2.responseJSON.last_name);
                $("#limitecred").val('₡'+cliente2.responseJSON.credit_limit.toFixed(2));
                var saldos = $.get('/api/saldocobrar/?cliente='+cliente,function(){});
                //console.log(saldos.responseJSON);
                if(saldos.responseJSON.length==0){
                    alertify.alert('Error','El cliente no posee cuenta en el apartado de cuentas por cobrar.');
                    $("#pagacontipo").val(1);
                    $(".credito").hide();
                    $(".pagoefectivo:hidden").show();
                    creditoaprobado=false;
                }
                else{
                    $("#saldocred").val('₡'+saldos.responseJSON[0].total.toFixed(2));

                    if((saldos.responseJSON[0].total+totalventa)>cliente2.responseJSON.credit_limit){
                        $('.errorsaldoactual:hidden').show();
                        creditoaprobado=false;
                    }
                    else{
                        creditoaprobado=true;
                        saldoantcred=saldos.responseJSON[0].total;
                        saldoactcred=saldos.responseJSON[0].total+totalventa;
                    }
                    if(cliente2.responseJSON.credit==false){
                        $('.errorsaldoactual').hide();
                        $('.errornocredito:hidden').show();
                        creditoaprobado=false;
                    }
                    vuelto();
                    checkEnableVenta();
                    $(".pagaconpagar").html('CRÉDITO');
                    $(".vueltopagar").html('₡ 0,00');
                }
            }
            if( $("#pagacontipo").val()==4){//transferencia
                $(".pagotarjeta").hide();
                $(".credito").hide();
                $(".pagoefectivo").hide();
                $(".transferencia:hidden").show();
                $(".cheque").hide();
                $("#montoefectivo").val(0);
                vuelto();
                checkEnableVenta();
                $(".pagaconpagar").html('₡ 0,00');
                $(".vueltopagar").html('₡ 0,00');
            }
            if( $("#pagacontipo").val()==5){//cheque
                $(".pagotarjeta").hide();
                $(".credito").hide();
                $(".pagoefectivo").hide();
                $(".transferencia").hide();
                $("#montoefectivo").val(0);
                $(".cheque:hidden").show();
                vuelto();
                checkEnableVenta();
                $(".pagaconpagar").html('₡ 0,00');
                $(".vueltopagar").html('₡ 0,00');
            }
        });

        //botones

        //boton de busqueda en panel de busqueda producto
        $("#btnbusqueda").on("click",BuscarProducto);

        $("#BtnConfirmarFactura").on("click",function(){

            $('.formTotales').hide();
            totalKgDev=0;
            totalNCDev=0;
            facturaDev=0;
            clienteDev=0;
            matrixDevolucion=[];
            $("#tablafactura > tbody").html("");
            $('#tablaproductos > tbody').html("");

            $(".factura").hide();

            if( $("#NumFactura").val() == ''){
                alertify.alert("ERROR","El número de factura no puede ser vacío.");
            }
            else {
                CargarFactura($("#NumFactura").val());
            }

        });

        $('#NumFactura').on('keypress', function (event) {
            if(event.which === 13){
                event.preventDefault();
                $('.formTotales').hide();
                totalKgDev=0;
                totalNCDev=0;
                facturaDev=0;
                clienteDev=0;
                matrixDevolucion=[];
                $("#tablafactura > tbody").html("");
                $('#tablaproductos > tbody').html("");

                $(".factura").hide();

                if( $("#NumFactura").val() == ''){
                    alertify.alert("ERROR","El número de factura no puede ser vacío.");
                }
                else {
                    CargarFactura($("#NumFactura").val());
                }
            }
        });

        $("#BtnConfirmDevolver").on("click",function(){

             alertify.confirm('La devolución se efectuará con los datos registrados, este proceso no se puede deshacer, ¿Está seguro de registrar la devolución?').set('labels', {ok:'Aceptar!', cancel:'Cancelar'}).set('type', 'number')
            .set('onok',function(closeEvent,value){

                RegistarDevolucion();

            }).set('title','Devolución');


        });



        $("#BtnAnular").on("click",function(){

             alertify.confirm('¿Desea Anular esta Factura?').set('labels', {ok:'Aceptar!', cancel:'Cancelar'}).set('type', 'number')
            .set('onok',function(closeEvent,value){

                AnularFactura(facturaDev);

            }).set('title','Anular Factura');


        });




        //botones de cliente

        $("#btnconfirmarcliente").on("click",function(){
            $("#cliente").val($("#nombrecliente").val());
            $('.cd-panelbuscarcliente').removeClass('is-visible');
            blurElement('.blurlines',0);
            $("#nombrecliente").val('Cliente Contado');
            var a = $("#codigocliente").val();
            var cliente2=$.get('/api/clientes/?code='+a,function(){});
            cliente=cliente2.responseJSON[0].id;
            //console.log(cliente);

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
                alertify.alert('Error','Debe introducir un nombre válido');
            }

        });

        $('#BtnNuevaVenta').on("click",function(){
            location.reload();
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
        $(".credito").hide();
        $("#BtnNoConfirmar").hide();
        $("#btnconfirmarcliente").prop('disabled',true);


    //set Cajero
    //
    //$.get('/api/cajeros/?user='+$('#cajero').val(),function(data){
    //    $('#cajero').html('<option value="'+data[0].user+'">'+data[0].name+' '+data[0].last_name+'</option>')
    //    usuario=data[0].user;
    //});

    //set usuario
    $.get('/api/cajeros/?user='+$('#cajero').val(),function(data){
        $('#cajero').html('<option value="'+data[0].user+'">'+data[0].name+' '+data[0].last_name+'</option>');
        usuario=data[0].user;
    });
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
        todaynorm = (day)+"/"+(month2)+"/"+(year2) ;
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

        $("#BtnPrint").on("click",Imprimir);
        $("#BtnPrintrecibo").on("click",ImprimirRecibo);

    }//main


function AnularFactura(factura){

    var facturaPend=$.get('/api/venta/'+factura+'/',function(){});
    var detallepago=$.get('/api/detallepago/'+facturaPend.responseJSON.datosdelpago+'/',function(){});
    //console.log(detallepago);

    if(facturaPend.responseJSON.anulada==true){
        alertify.alert('ERROR','La factura ya aparece como anulada, no se puede anular')
    }
    else {
        if(facturaPend.responseJSON.devuelto==true ||facturaPend.responseJSON.connotacredito||facturaPend.responseJSON.conabono){
            alertify.alert('ERROR','La factura ya aparece con devoluciones, notas de credito o abonos, no se puede anular, ya que esto afectaría las cuentas o inventarios.')
        }
        else {
            if (detallepago.responseJSON.tipopago == 3) {
                //si es de credito quitarla de la lista de pendiente
                quitarDeListaPend(facturaDev, clienteDev);
                //descontar el saldo
                //descontar de lista credito

                //sumar a inventario
            }
            else {

                anularfactura(facturaDev);
                //sumar al inventario
            }
        }
    }
}

function anularfactura (factura){

    $.ajax({
            method: "PATCH",
            url: "/api/venta/" + factura + "/",

            data: JSON.stringify({

            "anulada": true

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .success(function () {
            devolerAInventario(factura);
            //alertify.alert('Completado','Factura anulada con éxito');
        })
        .fail(function (data) {
            alertify.alert("Hubo un problema al anular la factura (Anular Factura), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });

}

function devolerAInventario(factura){

    var facturaAnular=$.get('/api/venta/'+factura+'/',function(){});
    var detalleMatrix=facturaAnular.responseJSON.detalleproductos;

    $.each(detalleMatrix, function (i) {

        var detalleProd=$.get('/api/detalleproducto/'+detalleMatrix[i]+'/',function(){});
        var cantidadSumar=detalleProd.responseJSON.cantidad;

        var producto=$.get('/api/productos/'+detalleProd.responseJSON.producto+'/',function(){});
        var current=producto.responseJSON.inventory;
        var currentplanta=producto.responseJSON.inventoryplanta;

        $.ajax({
            method: "PATCH",
            url: "/api/productos/" + detalleProd.responseJSON.producto + "/",

            data: JSON.stringify({

            "inventory": current+cantidadSumar,
            "inventoryplanta": currentplanta+cantidadSumar


            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .success(function () {

            alertify.alert('Completado','Factura anulada con éxito');
        })
        .fail(function (data) {
            alertify.alert("Hubo un problema al anular la factura (devolerAInventario), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });


    });

}

function quitarDeListaPend(factura,cliente){

    var facturaAnular=$.get('/api/venta/'+factura+'/',function(){});
    var facturasPendCliente=$.get('/api/saldocobrar/?cliente='+cliente,function(){});

    var totalFact=facturaAnular.responseJSON.total;

    var ListaPendientes=facturasPendCliente.responseJSON[0].pending;
    ListaPendientes.splice( $.inArray(factura, ListaPendientes), 1 );

    $.ajax({
            method: "PATCH",
            url: "/api/saldocobrar/" + facturasPendCliente.responseJSON[0].id + "/",

            data: JSON.stringify({
            "total": facturasPendCliente.responseJSON[0].total-totalFact,
            "pending": ListaPendientes

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .success(function () {
           anularfactura (factura)
        })
        .fail(function (data) {
            alertify.alert("Hubo un problema al anular la factura (quitarDeListaPend), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });

}

function RegistarDevolucion(){
    var facturaPend=$.get('/api/venta/'+facturaDev+'/',function(){});

    if(facturaPend.responseJSON.anulada==true){
        alertify.alert('ERROR','La factura se muestra como anulada, no se puede devolver producto de una factura anulada.')
    }
    //devolver a inventarios
    else {

        DevolverInventario();

        //crear nota de credito
        //crearNC();
        //descontar de saldos

        //crear detalle devolucion
        crearDetalleDev();
        //crear devolucion obj

        crearDevObj();

        //generar recibo de devolucion
        GenerarReciboDEv();



    }
}

function crearNC(){

        //crear nota credito

    crearObjNC(facturaDev,clienteDev);
        //quitar el monto de la nota de la factura
        // si la factura se cancela se quita de las pendientes y se deja saldo en 0
    quitarNCdeFactura(facturaDev);
        //patch saldo, notas de credito y pending en cuentas cobrar
    patchDatosNC(clienteDev);
        //imprimir recibo de la nota de credito

        //recargar la tabla
}

function crearObjNC(factura,cliente){
    var facturaPend=$.get('/api/venta/'+factura+'/',function(){});
    var pendiente=facturaPend.responseJSON.saldo;
    var cuentaCobrar=$.get('/api/saldocobrar/?cliente='+cliente,function(){});

    nostasCredCliente=cuentaCobrar.responseJSON[0].notasdecredito;

    $.ajax({
        method: "POST",
        url: "/api/notacredito/",
        async: false,

        data: JSON.stringify({
        "date": today,
        "time": tiempoahora(),
        "monto": totalNCDev,
        "saldoanteriorfact": pendiente,
        "saldoactualfact": pendiente-totalNCDev,
        "saldoanterior": cuentaCobrar.responseJSON[0].total,
        "saldoactual": cuentaCobrar.responseJSON[0].total-totalNCDev,
        "venta": factura,
        "detalle":'Nota de crédito a factura #'+factura
        }),//JSON object
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    })
    .fail(function(data){
        console.log(data.responseText);
        alertify.alert("Hubo un problema al crear la nota de crédito (Nota cred Obj), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
    })
    .success(function(data){
        //console.log(data);
        notaCreditoID=data.id;
        //console.log(notaCreditoID);
        nostasCredCliente.push(notaCreditoID);
        //console.log(nostasCredCliente);
    });//ajax
}

function quitarNCdeFactura(factura){

    var facturaPend=$.get('/api/venta/'+factura+'/',function(){});
    var pendiente=facturaPend.responseJSON.saldo;
    //var cuentaCobrar=$.get('/api/saldocobrar/?cliente='+cliente,function(){});
    //factPendientesNC=cuentaCobrar.responseJSON[0].pending;

    $.ajax({
        method: "PATCH",
        url: "/api/venta/" + factura + "/",

        data: JSON.stringify({

        "saldo": pendiente-totalNCDev

        }),//JSON object
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
    .success(function () {

    })
    .fail(function (data) {
        alertify.alert("Hubo un problema la nota de credito (quitarNCdeFactura), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
    });

}

function patchDatosNC(cliente){
    //console.log(cliente);
    var cuentaCobrar=$.get('/api/saldocobrar/?cliente='+cliente,function(){});
    //console.log("/api/saldocobrar/" + cuentaCobrar.responseJSON[0].id + "/");

    $.ajax({
            method: "PATCH",
            url: "/api/saldocobrar/" + cuentaCobrar.responseJSON[0].id + "/",

            data: JSON.stringify({

            "total": cuentaCobrar.responseJSON[0].total-totalNCDev,
            "notasdecredito": nostasCredCliente

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .success(function () {

        })
        .fail(function (data) {
            alertify.alert("Hubo un problema al crear la nota de crédito (), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });

}

function DevolverInventario(){

    console.log(matrixDevolucion);
    $.each(matrixDevolucion, function (i) {

        if(matrixDevolucion[i][7]==true){
            var producto =$.get('/api/productos/' + matrixDevolucion[i][0] + '/', function () {});
            var existencia=producto.responseJSON.inventory;
            var existenciaplanta=producto.responseJSON.inventoryplanta;

             $.ajax({//patch inventario

             method: "PATCH",
                url: "/api/productos/"+matrixDevolucion[i][0]+"/",//es donde esta almacenado el id del canal

                data: JSON.stringify({

                "inventory": existencia+matrixDevolucion[i][5],
                "inventoryplanta": existenciaplanta+matrixDevolucion[i][5]

                }),//JSON object
                  contentType:"application/json; charset=utf-8",
                  dataType:"json"
            })
                .fail(function (data) {
                    console.log(data.responseText);
                    alertify.alert("Hubo un problema al crear la devolucion (Patch Inventory), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function () {

                     $.ajax({//crear entrada por produccion
                          method: "POST",
                          url: "/api/inventarioentrada/",
                          async: false,

                          data: JSON.stringify({
                            "tipo": 4,
                            "datos": "Entrada por devolucion de producto",
                            "producto": matrixDevolucion[i][0],
                            "pesoanterior": existenciaplanta,
                            "peso": matrixDevolucion[i][5],
                            "nuevopeso": existenciaplanta+matrixDevolucion[i][5],
                            "date": today,
                            "time": tiempoahora(),
                            "usuario": usuario
                            }),//JSON object
                              contentType:"application/json; charset=utf-8",
                              dataType:"json"
                    })
                    .fail(function(data){
                        console.log(data.responseText);
                        alertify.alert("Hubo un problema al crear la devolucion (CREAR ENTRADA INVENTARIO), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                    })
                    .success(function() {//patch resumen inv

                    });

                 });
        }

    });
}

function crearDetalleDev(){

    $.each(matrixDevolucion, function (i) {

        if (matrixDevolucion[i][7] == true) {

            $.ajax({
                    method: "POST",
                    url: "/api/detalledevolucion/",
                    async: false,

                    data: JSON.stringify({
                        "producto": matrixDevolucion[i][0],
                        "peso": matrixDevolucion[i][5],
                        "colones": parseFloat(matrixDevolucion[i][6])
                    }),//JSON object
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                })
                .fail(function (data) {
                    console.log(data.responseText);
                    alertify.alert("Hubo un problema al crear la devolucion (detalle dev), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function (data) {
                    //console.log(data.id);
                    detallesDev.push(data.id);
                   // detallepago = data.id;

                });//ajax

        }
    });
}

function crearDevObj(){

    $.ajax({
        method: "POST",
        url: "/api/devolucion/",
        async: false,

        data: JSON.stringify({
            "venta": facturaDev,
            "detalledevolucion": detallesDev,
            "cliente":clienteDev,
            "totalcolones":totalNCDev

        }),//JSON object
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
        .fail(function (data) {
            console.log(data.responseText);
            alertify.alert('Error',"Hubo un problema al crear la devolucion (devolucion obj), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        })
        .success(function (data) {
                devid=data.id;

                $.ajax({
                method: "PATCH",
                url: "/api/venta/"+facturaDev+"/",
                async: false,

                data: JSON.stringify({
                    "devuelto": true

                }),//JSON object
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
                .fail(function (data) {
                    console.log(data.responseText);
                    alertify.alert('Error',"Hubo un problema al crear la devolucion (PATCH VENTA CON DEV), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function (data) {
                    //console.log('SUCCESS '+data.id);
                    alertify.alert("Completado","Devolución completada con éxito");
                    //detallesDev.push(data.id);
                   //detallepago = data.id;
                });//ajax
        });//ajax
}

function CargarFactura(factura){
    $("#tablafactura > tbody").html("");
    $('#tablaproductos > tbody').html("");

    $(".factura").hide();

    var venta=$.get('/api/venta/'+factura+'/',function(){});

    if(venta.status==404){
        alertify.alert("ERROR","El número de factura solicitado no existe");
    }
    else {
        facturaDev=factura;

        var clientefactura = $.get('/api/clientes/' + venta.responseJSON.client + '/', function () {});
        var cajerofactura = $.get('/api/cajeros/' + venta.responseJSON.cashier + '/', function () {});
        var detallepago=$.get('/api/detallepago/'+venta.responseJSON.datosdelpago+'/',function(){});

        clienteDev=clientefactura.responseJSON.id;


        var matrixproductos = venta.responseJSON.detalleproductos;
        var tipoventafact = 'CRÉDITO.';

        if(detallepago.responseJSON.tipopago != 3){
            tipoventafact='CONTADO.';
        }

        $('.facturanumfact').html(' ' + factura);
        $('.tipoventafact').html(' ' + tipoventafact);
        $('.fechafact').html('  ' + venta.responseJSON.date + ' ' + venta.responseJSON.time);
        $('.clientefact').html('  ' + clientefactura.responseJSON.name + ' ' + clientefactura.responseJSON.last_name);
        $('.cajerofact').html('  ' + cajerofactura.responseJSON.name + ' ' + cajerofactura.responseJSON.last_name);

        $.each(matrixproductos, function (i) {

            var detalleint = $.get('/api/detalleproducto/' + matrixproductos[i] + '/', function () {
            });
            //var producto=$.get('/api/productos/'+detalleint.responseJSON.producto+'/',function(){});
            $('#tablafactura > tbody:last').append('<tr><td> ' + detalleint.responseJSON.cantidad + ' </td><td>' +
            detalleint.responseJSON.description + '</td><td class="precio">' + detalleint.responseJSON.preciouni.toFixed(2) + '</td><td class="precio">' + detalleint.responseJSON.total.toFixed(2) + '</td></tr>');

            var producto=$.get('/api/productos/'+detalleint.responseJSON.producto+'/');

            $('#tablaproductos > tbody:last').append('<tr><td> ' + producto.responseJSON.product_code + ' </td><td>' +
            detalleint.responseJSON.description + '</td><td class="precio">' + detalleint.responseJSON.preciouni.toFixed(2) +'</td><td>' +
            detalleint.responseJSON.cantidad +'</td><td class="precio">' + detalleint.responseJSON.total.toFixed(2)+
            '</td><td class="centerCol" ><button  type="button" id="btnDevrow'+i+'" class=" btn btn-success form-control selectrowdevolver "><span class="glyphicon glyphicon-menu-right"></span></button>'+
            '</td><td >' + 0 +'</td></td><td class="precio">' + 0+'</td><td class="centerCol"><button disabled type="button" id="btnEditrow'+i+'" class=" btn btn-danger form-control selectrowdevolveredit "><span class="glyphicon glyphicon-minus"></span></button>'+'</tr>');


            //id, codigo,preciounitario,cantidad,total,kgdevueltos,dinerodevuelto,si se devuelve o no
            matrixDevolucion.push([detalleint.responseJSON.producto,producto.responseJSON.product_code,detalleint.responseJSON.preciouni,detalleint.responseJSON.cantidad,detalleint.responseJSON.total,0,0,false,producto.responseJSON.description]);

        });
        if (venta.responseJSON.descopor > 0) {
            $('.descueentofactleft').html('DESCUENTO ' + venta.responseJSON.descopor + '%');
        }

        $('.subtotalfactright').html(venta.responseJSON.subtotal.toFixed(2));
        $('.descueentofactright').html(venta.responseJSON.desctocol.toFixed(2));
        $('.ivfactright').html(venta.responseJSON.iv.toFixed(2));
        $('.cnpfactright').html(venta.responseJSON.cpnval);
        $('.totalfactright').html(venta.responseJSON.total.toFixed(2));

        $('.precio').priceFormat({
            prefix: '₡ ',
            centsSeparator: ',',
            thousandsSeparator: '.'
        });

        $(".factura:hidden").show();
        //$('.sidetotales').hide();
        //('.factura:hidden').show();

    }//else
}

function GenerarReciboDEv(){

    $("#tablafacturadev > tbody").html("");


    $(".recibo").hide();


        var clientefactura = $.get('/api/clientes/' + clienteDev + '/', function () {});
        var cajerofactura = $.get('/api/cajeros/' + usuario + '/', function () {});
        //var detallepago=$.get('/api/detallepago/'+venta.responseJSON.datosdelpago+'/',function(){});

        //clienteDev=clientefactura.responseJSON.id;



        $('.devnum').html(' ' + devid);
        $('.fechadev').html('  ' + today);
        $('.clientedev').html('  ' + clientefactura.responseJSON.name + ' ' + clientefactura.responseJSON.last_name);
        $('.cajerodev').html('  ' + cajerofactura.responseJSON.name + ' ' + cajerofactura.responseJSON.last_name);

        $.each(matrixDevolucion, function (i) {

        if(matrixDevolucion[i][7]==true) {

            $('#tablafacturadev > tbody:last').append('<tr><td> ' + matrixDevolucion[i][5] + ' </td><td>' +
            matrixDevolucion[i][8] + '</td><td class="precio">' + matrixDevolucion[i][6].toFixed(2) + '</td></tr>');

        }
        });


        $('.totalfactrightdev').html(totalNCDev.toFixed(2));

        $('.precio').priceFormat({
            prefix: '₡ ',
            centsSeparator: ',',
            thousandsSeparator: '.'
        });
        $(".factura").hide();
        $(".recibo:hidden").show();
        //$('.sidetotales').hide();
        //('.factura:hidden').show();
        $('#maincontent').find(':input').prop('disabled', true);
        $('#BtnPrintrecibo').prop('disabled',false);
    
        ImprimirRecibo();


}

function Imprimir(){

    event.preventDefault();
    $( "#factura").printArea();
}

function ImprimirRecibo(){
    event.preventDefault();
    $( "#recibo").printArea();
}

function checkEnableVenta(){
    var tipopago=$('#pagacontipo').val();

    if(tipopago==1){
        if($('#montoefectivo').val()==''||$('#montoefectivo').val()==0||$('#vuelto').val()==''||$('#vuelto').val()=='FALTA EFECTIVO'){
            $("#BtnRegistrarVenta").prop("disabled",true);
        }
        else{
            $("#BtnRegistrarVenta").prop("disabled",false);
        }
    }
    if(tipopago==2){
        if($('#4digits').val()==''||$('#authtarjeta').val()==''){
            $("#BtnRegistrarVenta").prop("disabled",true);
        }
        else{
            $("#BtnRegistrarVenta").prop("disabled",false);
        }
    }
    if(tipopago==3){
        if(creditoaprobado==false){
            $("#BtnRegistrarVenta").prop("disabled",true);
        }
        else{
            $("#BtnRegistrarVenta").prop("disabled",false);
        }
    }
    if(tipopago==4){
        if($('#numtransf').val()==''){
            $("#BtnRegistrarVenta").prop("disabled",true);
        }
        else{
            $("#BtnRegistrarVenta").prop("disabled",false);
        }
    }
    if(tipopago==5){
        if($('#chequenum').val()==''){
            $("#BtnRegistrarVenta").prop("disabled",true);
        }
        else{
            $("#BtnRegistrarVenta").prop("disabled",false);
        }
    }
    if(tipopago==6){

    }
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
        if(matrixinterna[i][0]==4001||matrixinterna[i][0]==5001){
            agregarcanalatabla(matrixinterna[i][10],matrixinterna[i][9],matrixinterna[i][2],matrixinterna[i][3],matrixinterna[i][11]);
        }
        else{
            cantidad=matrixinterna[i][3];
             $.get('/api/productos/?product_code='+matrixinterna[i][0],llenartablaProductos);
        }
    });


}

function getProducto(){
    var a=$('#producto').val();
    cantidad =parseFloat($('#cantidad').val());
    if (a==4001||a==5001){
        $('.cd-panelcanal').addClass('is-visible');
        blurElement('.blurlines',2);
        getcanales(a);
    }
    else{
        $.get('/api/productos/?product_code='+a,llenartablaProductos);
    }
}

function getcanales(a){
    if(a==4001){//es canal de cerdo
         $(".tipodecanal").html('Canales de Cerdo Disponibles');
         $.get('/api/canales/?tipo=1&isonlote=False&vendido=False',llenartablacanales);
    }
    else{//es canal de res
        $(".tipodecanal").html('Canales de Res Disponibles');
        $.get('/api/canales/?tipo=2&isonlote=False&vendido=False',llenartablacanales);
    }
}
function llenartablacanales(data){
        $.each( data, function(i){
            canaleslist.push([data[i].id,data[i].consecutive,data[i].weight,data[i].qualification,data[i].fierro,data[i].tipo,data[i].mediovendido]);
            var test= $.get('/api/proveedores/'+data[i].fierro+'/',function(){
                return 1;
            });

            if(data[i].mediovendido==true){
                $('#tablacanales > tbody:last').append('<tr style="background-color:rgba(255, 0, 0, 0.5)" ><td>' + data[i].id + '</td><td>' + data[i].consecutive +
                '</td><td>' + data[i].qualification + '</td><td>' + data[i].weight +
                '</td><td>' + test.responseJSON.fierro + '</td><td><button  type="button" class=" btn btn-success form-control selectrowcanal " id="btnelegir"><span class="glyphicon glyphicon-plus"></span></button></td></tr>');

            }
            else {

                $('#tablacanales > tbody:last').append('<tr><td>' + data[i].id + '</td><td>' + data[i].consecutive +
                '</td><td>' + data[i].qualification + '</td><td>' + data[i].weight +
                '</td><td>' + test.responseJSON.fierro + '</td><td><button  type="button" class=" btn btn-success form-control selectrowcanal " id="btnelegir"><span class="glyphicon glyphicon-plus"></span></button></td></tr>');

            }
        });
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
            '</td><td>' + data[i].price1 + '</td><td><button  type="button" class=" btn btn-success form-control selectrow " id="btnelegir"><span class="glyphicon glyphicon-plus"></span></button></td></tr>');
        });
}

function llenarTablaBusquedaCliente(data){
        $.each( data, function(i){
            codigobusquedacliente.push([data[i].code,data[i].name,data[i].last_name,data[i].id]);
            $('#tablabusquedacliente > tbody:last').append('<tr><td>' + data[i].code + '</td><td>' + data[i].name +' '+data[i].last_name+
            '</td><td><button  type="button" class=" btn btn-success form-control selectrowcliente " id="btnelegircliente"><span class="glyphicon glyphicon-ok"></span></button></td></tr>');
        });
}

function agregarcanalatabla(id,tipo,precio,peso,enteroOmedio) {
    var canaliv=(precio*peso)*(0);
    var canalivr=Math.round((canaliv) * 1000) / 1000;
    var pricesubr=peso*precio;
    var pricetot=(precio*peso)*1;
    var price=Math.round((precio) * 1000) / 1000;
    var pricetotr=Math.round((pricetot) * 1000) / 1000;
    var description='Canal';
    if(enteroOmedio==false){
        description='1/2 Canal';
    }

    if(tipo==1){// canal de cerdo
        $('#tablaproductos > tbody:last').append('<tr><td>' + 4001 + '</td><td>' + description+' Cerdo id# '+id+'</td><td class="precio">' +price.toFixed(2) + '</td><td class=cant'+4001+'>' + peso + '</td>' +
        '<td>'+'E'+'</td><td class="precio total'+4001+'">' + pricesubr.toFixed(2) +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');
        var codCanalCerdo=$.get('/api/productos/?product_code=4001',function(){});
        matrixventa.push([4001, description+' Cerdo id# '+id,precio ,peso,pricesubr, canalivr,pricetotr,codCanalCerdo.responseJSON[0].id,false,1,id,enteroOmedio]);//los dos ultimos son si es canal y tipo y el id

    }
    if(tipo==2){//canal de res
        $('#tablaproductos > tbody:last').append('<tr><td>' + 5001 + '</td><td>' + description+' Res id# '+id+'</td><td class="precio">' +price.toFixed(2) + '</td><td class=cant'+5001+'>' + peso + '</td>' +
        '<td>'+'E'+'</td><td class="precio total'+5001+'">' + pricesubr.toFixed(2) +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');
        var codCanalRes=$.get('/api/productos/?product_code=5001',function(){});
        matrixventa.push([5001, description+' Res id# '+id,precio ,peso,pricesubr,canalivr,pricetotr,codCanalRes.responseJSON[0].id,false,2,id,enteroOmedio]);//los dos ultimos son si es canal y tipo y el id

    }
    var totalkg2=parseFloat(totalkg);
    totalkg=Math.round((totalkg2+peso)*1000)/1000;
    totalart=totalart+1;
    subtotal=subtotal+pricesubr;
    totaliv=totaliv+canalivr;
    ivsindesc=totaliv;
    totalventa=totalventa+pricetotr;
    preciosindesc =totalventa;

    $('.subtotal').html(subtotal.toFixed(2));
    $('.totalventa').html(totalventa.toFixed(2));
    $('.totaliv').html(totaliv.toFixed(2));
    $('.totalart').html(totalart);
    $('.totalkg').html(totalkg +' Kg');
    $("#BtnConfirmar").prop("disabled",false);

    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    $('.cd-panelcanal').removeClass('is-visible');
    blurElement('.blurlines',0);
    canaleslist=[];
    $("#tablacanales > tbody").html("");
    event.preventDefault();

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

                matrixventa.push([data[0].product_code, data[0].description,pricetouse ,cantidad,pricesubr,ivr,pricer,data[0].id,usaimpuestos,0,0]);//los dos ultimos son si es canal y el id

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
    var descuentoint= tipo.responseJSON.discount;
    var conganancia;
    var conganancia2;
    var condescuento;
    var utilidad;
    descuentoyaaplicado=false;
    $("#descuento").val('');
    //console.log(descuento);

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
        if(tipocliente===4){

            condescuento = data[0].price1*(1-(descuentoint/100));
            descuentoyaaplicado=true;
            $("#descuento").val(descuentoint);
            descuentoporc=descuentoint;
            return condescuento;
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
        if (tipocliente===4){
            utilidad=(data[0].utility1/100)+1;
            conganancia=data[0].cost*utilidad;
            //console.log(conganancia);
            conganancia2=conganancia*(1-(descuentoint/100));
            //console.log(conganancia2);
            descuentoyaaplicado=true;
            descuentoporc=descuentoint;
            $("#descuento").val(descuentoint);
            return conganancia2;
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
           alertify.alert('Error',"Por favor ingrese un valor de descuento válido");
        }
    }
    else{
        alertify.alert('Error',"Por favor ingrese un valor de descuento numérico");
    }
}

function ConfirmarDatos(){

if (descuentoyaaplicado==false){
    $("#descuento").prop('disabled',false);
    $("#btndescuento").prop('disabled',false);
}

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

function tiempoahora(){
    var dt = new Date();
    return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
}

function RegistarVenta(){

    guardardetallepago();
    guardardetalleproducto();
    guardarventa();
    descontarinventarios();
    generarfactura();
    Imprimir();
    $('.cd-panelpagar').removeClass('is-visible');
    blurElement('.blurlines',0);
    $('#maincontent').find(':input').prop('disabled', true);
    $('#BtnPrint').prop('disabled', false);
    $('#BtnNuevaVenta').prop('disabled', false);

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
            "autorizacion": null,
            "transfnum": 0,
            "bancotransf": "-",
            "chequenum": 0,
            "bancocheque": "-"
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
    //console.log('TARJETA');
    if($("#4digits").val()==''||$("#authtarjeta").val()==''){
        alertify.alert('Error','Por Favor Complete los espacios en de los ultimos 4 digitos de la tarjeta y autorización.');
    }
    else{
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
                "autorizacion": $("#authtarjeta").val(),
                "transfnum": 0,
                "bancotransf": "-",
                "chequenum": 0,
                "bancocheque": "-"
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
    }
    }//if
    if($("#pagacontipo").val()==3){
    $.ajax({
          method: "POST",
          url: "/api/detallepago/",
          async: false,

          data: JSON.stringify({
            "tipopago": 3,
            "montoefectivo": 0,
            "vuelto": 0,
            "tarjeta": 6,
            "digitos": null,
            "autorizacion": null,
            "transfnum": 0,
            "bancotransf": "-",
            "chequenum": 0,
            "bancocheque": "-",
            "saldoant": saldoantcred,
            "saldoactual": saldoactcred
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
    if($("#pagacontipo").val()==4){
    $.ajax({
          method: "POST",
          url: "/api/detallepago/",
          async: false,

          data: JSON.stringify({
            "tipopago": 4,
            "montoefectivo": 0,
            "vuelto": 0,
            "tarjeta": 6,
            "digitos": 0,
            "autorizacion": 0,
            "transfnum": $('#numtransf').val(),
            "bancotransf": $("#bancotransf option:selected").text(),
            "chequenum": 0,
            "bancocheque": "-"
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
    if($("#pagacontipo").val()==5){
    $.ajax({
          method: "POST",
          url: "/api/detallepago/",
          async: false,

          data: JSON.stringify({
            "tipopago": 5,
            "montoefectivo": 0,
            "vuelto": 0,
            "tarjeta": 6,
            "digitos": 0,
            "autorizacion": 0,
            "transfnum": 0,
            "bancotransf": "-",
            "chequenum": $('#chequenum').val(),
            "bancocheque": $("#bancocheque option:selected").text()
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
                "description": matrixventa[i][1],
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
                //console.log(detallesventa);
            });
    });

}

function descontarinventarios(){
    $.each( matrixventa, function(i){
        var productodatos = $.get('/api/productos/'+matrixventa[i][7]+'/',function(){});

        if(matrixventa[i][0]==4001||matrixventa[i][0]==5001){ //SI ES CANAL
            //logica para medios canales
            var enteroOMedio=matrixventa[i][11];
            var vendido=true;
            var mediovendido=true;
            var vendidoMedio = $.get('/api/canales/'+matrixventa[i][10]+'/',function(){});

            if(vendidoMedio.responseJSON.mediovendido==true && enteroOMedio==false){
                vendido=true;
                mediovendido=true;
            }
            else{
                vendido=enteroOMedio;
                mediovendido=!enteroOMedio;
            }
            //termina logica para medios canales

            $.ajax({//patch canal
             method: "PATCH",
                url: "/api/canales/"+matrixventa[i][10]+"/",//es donde esta almacenado el id del canal

                data: JSON.stringify({

                "vendido": vendido,
                "mediovendido": mediovendido


                }),//JSON object
                  contentType:"application/json; charset=utf-8",
                  dataType:"json"
            })
                .fail(function (data) {
                    console.log(data.responseText);
                    alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function () {
                //crear salida inventario
                    $.ajax({
                        method: "POST",
                        url: "/api/inventariosalida/",

                        data: JSON.stringify({
                            "tipo": 1,
                            "datos": 'Salida por venta, Factura # '+ventaid,
                            "producto": matrixventa[i][7],
                            "peso": matrixventa[i][3],
                            "nuevopeso": 0,
                            "date": today,
                            "time": tiempoahora(),
                            "usuario": usuario
                        }),//JSON object
                          contentType:"application/json; charset=utf-8",
                          dataType:"json"
                        })
                        .success(function() {

                        })
                        .fail(function(data) {
                        alertify.alert("Hubo un problema al crear la salida de inventario, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                        });
            });//sucess
        }
        else{// SI NO ES CANAL
            //console.log(productodatos.responseJSON.inventory);
            //console.log(matrixventa[i][3]);
            nuevaext= productodatos.responseJSON.inventory-matrixventa[i][3];
            //console.log(nuevaext);
            //patch al producto
            $.ajax({
              method: "PATCH",
              url: "/api/productos/"+productodatos.responseJSON.id+"/",

              data: JSON.stringify({

                "inventory": nuevaext

                }),//JSON object
                  contentType:"application/json; charset=utf-8",
                  dataType:"json"
            })
            .fail(function (data) {
                console.log(data.responseText);
                alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            })
            .success(function () {
                //success fuction.
                //crear la salida de inventario
                    $.ajax({
                      method: "POST",
                      url: "/api/inventariosalida/",

                      data: JSON.stringify({
                            "tipo": 1,
                            "datos": 'Salida por venta, Factura # '+ventaid,
                            "producto": matrixventa[i][7],
                            "peso": matrixventa[i][3],
                            "nuevopeso": nuevaext,
                            "date": today,
                            "time": tiempoahora(),
                            "usuario": usuario
                        }),//JSON object
                          contentType:"application/json; charset=utf-8",
                          dataType:"json"
                        })
                      .success(function() {

                                var prodinventario=$.get('/api/inventarioresumen/?producto='+matrixventa[i][7],function(){});

                                $.ajax({
                                        method: "PATCH",
                                        url: "/api/inventarioresumen/" + prodinventario.responseJSON[0].id + "/",

                                        data: JSON.stringify({

                                            "cantidad": nuevaext

                                        }),//JSON object
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json"
                                })
                                .success(function () {

                                })
                                .fail(function (data) {
                                    alertify.alert("Hubo un problema al crear la salida, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                                });

                        })
                        .fail(function(data) {
                        alertify.alert("Hubo un problema al crear la salida de inventario, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                        });

            });//success func
        }//else
    });//each
    
}

function guardarventa(){
    var saldoguardar=0;
    if($("#pagacontipo").val()==3){
        saldoguardar=totalventa;
    }
    $.ajax({
            method: "POST",
            url: "/api/venta/",
            async: false,

            data: JSON.stringify({
                "client": cliente,
                "nombrecliente": $('#cliente').val(),
                "cashier": usuario,
                "date": today,
                "time": tiempoahora(),
                "totolkilogramos": totalkg,
                "cantidadarticulos": totalart,
                "subtotal": subtotal,
                "iv": totaliv,
                "descopor": descuentoporc,
                "desctocol": descuento,
                "total": totalventa,
                "detalleproductos": detallesventa,
                "datosdelpago": detallepago,
                "saldo": saldoguardar
            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .fail(function (data) {
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        })
        .success(function (data) {
            ventaid=data.id;
        });
    if($("#pagacontipo").val()==3){
        patchcuentacobrar();
    }
}

function patchcuentacobrar(){
    var detallecuenta = $.get('/api/saldocobrar/?cliente='+cliente,function(){});
    var matrixpendign=detallecuenta.responseJSON[0].pending;
    var saldonuevo=detallecuenta.responseJSON[0].total+totalventa;
    matrixpendign.push(ventaid);
     $.ajax({
      method: "PATCH",
      url: "/api/saldocobrar/"+detallecuenta.responseJSON[0].id+"/",

      data: JSON.stringify({
        "total": saldonuevo,
        "pending": matrixpendign

        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"

        })
      .fail(function (data) {
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear la venta, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        })
        .success(function (data) {
            //success fuction.
        });
}

function generarfactura(){
    var clientefactura=$.get('/api/clientes/'+cliente+'/',function(){});
    var cajerofactura=$.get('/api/cajeros/'+usuario+'/',function(){});
    var tipoventafact='CONTADO.';
    if($("#pagacontipo").val()==3){
        tipoventafact='CRÉDITO.';
        $('#firmacredito:hidden').show();
    }
    $('.facturanumfact').html(' '+ventaid);
    $('.tipoventafact').html(' '+tipoventafact);
    $('.fechafact').html('  '+todaynorm +' '+tiempoahora());
    $('.clientefact').html('  '+clientefactura.responseJSON.name+' '+clientefactura.responseJSON.last_name);
    $('.cajerofact').html('  '+cajerofactura.responseJSON.name+' '+cajerofactura.responseJSON.last_name);

    $.each( matrixventa, function(i){
        $('#tablafactura > tbody:last').append('<tr><td> ' +matrixventa[i][3]+ ' </td><td>' + matrixventa[i][1]+ '</td><td class="precio">' +matrixventa[i][4].toFixed(2)+ '</td></tr>');
    });
    if(descuento>0){
        $('.descueentofactleft').html('DESCUENTO '+descuentoporc +'%');
    }

    $('.subtotalfactright').html(subtotal.toFixed(2));
    $('.descueentofactright').html(descuento.toFixed(2));
    $('.ivfactright').html(totaliv.toFixed(2));
    $('.totalfactright').html(totalventa.toFixed(2));

    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });
    $('.sidetotales').hide();
    $('.factura:hidden').show();
}


