//variables globales

var descuentoyaaplicado = false;
var enteronaddproducto = false;
var cantidad=0;
var nuevaext;
var nuevaextplanta;
var nuevaextpv;
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
var clienteContadoNombre=0;
var clienteContadoNombreVal='';
var preciomodificado=0;
var preciomodificadomonto=0;
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
var variablePruebaGIT=0;

var ventaAEditar = 0;
var detallesPagoAnt = 0;

var vencimiento;
var tipo;

var cotizacionid=0;
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
            $("#pagacontipo").trigger('change');
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
            //console.log(matrixventa);
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

        //changepricerow

        $('html').on('click','.changepricerow', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();


            alertify.prompt('Ingrese el nuevo precio por KG' , 'Precio nuevo').set('type','number').set('onok', function(evnt,value){
                matrixventa[rowIndex][2]=parseFloat(value);
                matrixventa[rowIndex][12]=1;
                recalculartablaproductos();
                console.log(matrixventa);
            });

        });

        //selectrow buscar cliente

        $('html').on('click','.selectrowcliente', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();

            var codigo = codigobusquedacliente[rowIndex][0];
            var nombre = codigobusquedacliente[rowIndex][1];
            var apellido = codigobusquedacliente[rowIndex][2];
            clienteContadoNombre=0;
            clienteContadoNombreVal='';
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
                    console.log(ventaAEditar);
                    $("#saldocred").val('₡'+(saldos.responseJSON[0].total-ventaAEditar.total).toFixed(2));

                    if((saldos.responseJSON[0].total+totalventa-ventaAEditar.total)>cliente2.responseJSON.credit_limit){
                        $('.errorsaldoactual:hidden').show();
                        creditoaprobado=false;
                    }
                    else{
                        creditoaprobado=true;
                        saldoantcred=saldos.responseJSON[0].total-ventaAEditar.total;
                        saldoactcred=saldos.responseJSON[0].total+totalventa-ventaAEditar.total;
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

        //botones de cliente

        $("#btnconfirmarcliente").on("click",function(){
            $("#cliente").val($("#nombrecliente").val());
            $('.cd-panelbuscarcliente').removeClass('is-visible');
            blurElement('.blurlines',0);
            $("#nombrecliente").val('Cliente Contado');
            var a = $("#codigocliente").val();
            var cliente2=$.get('/api/clientes/?code='+a,function(){});
            clienteContadoNombre=0;
            clienteContadoNombreVal='';
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
                clienteContadoNombre=1;
                clienteContadoNombreVal=$("#nombreclientecontado").val();
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

        $('#BtnCotizar').on("click",function(){

            alertify.confirm('¿Desea registrar como cotización?').set('labels', {ok:'Aceptar!', cancel:'Cancelar'})
            .set('onok',function(closeEvent,value){

                RegistarCotizacion();

            }).set('title','Cotización');

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

    //set vendedor options

    $.get('/api/vendedores/',function(data){
        $.each( data, function(i){
            $('#vendedor').append('<option value="'+data[i].id+'">'+data[i].name+' '+data[i].last_name+'</option>');
        });

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

        $("#date").val(today).prop("disabled",false);
        $("#BtnPagar").prop("disabled",true);
        $("#BtnCotizar").prop("disabled",true);
        $("#amovil").prop("disabled",true);
        $("#BtnConfirmar").prop("disabled",true);
        $("#cantidad").val(1);
        enteronaddproducto=true;
        $("#cliente").val('Cliente Contado').prop("disabled",true);
        $("#codigocliente").val('0001');
        $("#nombrecliente").val('Cliente Contado').prop("disabled",true);

        $("#BtnPrint").on("click",Imprimir);

        checkIfSale();

    }//main

function checkIfSale(){

    var id =  getUrlParameter('id');
    if(id){
        loadSaleData(id);
    }

}

function loadSaleData(id) {

    $.get('/api/venta/'+id, function(data){

    })
    .then(function (data) {

        console.log(data);
        ventaAEditar = data;
        showSaleData(data);


    }).fail(function () {
        alertify.alert('Error', 'La factura a editar no existe o hubo un error al cargarla, por favor seleccione una factura válida, o intente de nuevo.')
    });

}

function getUrlParameter(sParam) {
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

function showSaleData(sale){

    cliente = sale.client;
    $('#cliente').val(sale.nombrecliente);
    $('#vendedor').val(sale.vendedor);
    $('#date').val(sale.date);

    totalkg = sale.totolkilogramos;
    $('.totalkg').html(totalkg+ ' Kg');

    totalart = sale.cantidadarticulos;
    $('.totalart').html(totalart);

    subtotal = sale.subtotal;
    $('.subtotal').html(subtotal.toFixed(2));

    totaliv = sale.iv;
     $('.totaliv').html(totaliv.toFixed(2));

    descuentoporc = sale.descopor;
     $('#descuento').val(descuentoporc);

    descuento = sale.desctocol;
     $('.descuento').html(descuento.toFixed(2));

    totalventa = sale.total;
    $('.totalventa').html(totalventa.toFixed(2));

    $('#cnp_orders').val(sale.cpnval);

    //por editar
    // detallesventa = sale.detalleproductos;
    //
    // detallepago = sale.datosdelpago;

     $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
     });

    loadSaleProducts(sale.detalleproductos);

    var editableSale = checkEditable(sale);

    if(!editableSale){

        $('#maincontent').find(':input').prop('disabled', true);

    }

}

function loadSaleProducts(details){


    details.forEach(function(detail){
        $.get(' /api/detalleproducto/'+detail, function(data){

        })
        .then(function (detaildata) {

            // GET DEL PRODUCTO
            $.get(' /api/productos/'+detaildata.producto, function(data){

            }).then(function(product){

                 llenartablaProductosLoaded(detaildata, product);

            }).fail(function () {
            alertify.alert('Error', 'Error al cargar un producto de la factura, por favor refresque la página e ' +
                                    'intente de nuevo.')
            });

        }).fail(function () {
            alertify.alert('Error', 'Error al cargar un detalle de la factura, por favor refresque la página e' +
                                    'intente de nuevo.')
        });
    });

    //console.log(matrixventa);

}

function llenartablaProductosLoaded(data, product){

    //   console.log(data);
    //   console.log(product);

    if (data.length!==0){

        var product_code = product.product_code;
        var impentabla = data.iv ? 'G':'E';

        var ivr = data.iv ? data.total*(product.taxes_amount/100) : 0;
        var pricer = data.iv ? data.total*(1+(product.taxes_amount/100)) : data.total;


        $('#tablaproductos > tbody:last').append(
            '<tr>' +
            '<td>' + product_code + '</td>' +
            '<td>' + data.description+ '</td>' +
            '<td> <button  type="button" class=" btn btn-warning changepricerow" id="btnchangeprice"><span class="glyphicon glyphicon-euro"></span></button></td>' +
            '<td class="precio">' +data.preciouni.toFixed(2) + '</td>' +
            '<td class=cant'+product_code+'>' + data.cantidad + '</td>' +
            '<td>'+impentabla+'</td>' +
            '<td class="precio total'+product_code+'">' + data.total.toFixed(2) +'</td>'+'' +
            '<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');

        matrixventa.push([product_code, data.description, data.preciouni, data.cantidad, data.total, ivr, pricer,
                          product.id, data.iv, 0, 0, 0, 0]);
        //los tres ultimos son si es canal , el id y si se modifico precio


        $("#BtnConfirmar").prop("disabled",false);

        //formato de campos de precios
        $('.precio').priceFormat({
            prefix: '₡ ',
            centsSeparator: ',',
            thousandsSeparator: '.'
        });

        preciomodificado=0;
        preciomodificadomonto=0;

    }
    else{
         alertify.alert('Error de código','El código de producto no es válido!');
    }
}

function checkEditable(sale){

    var detallePago;
    var getDataStatus = true;

    console.log(sale);
    $.get(' /api/detallepago/'+sale.datosdelpago, function(data){

        }).then(function(payDetail){

            detallePago = payDetail;
            detallesPagoAnt = payDetail;
            console.log(detallePago);
            $('#pagacontipo').val(detallePago.tipopago).change();
            $('#pagacontipo').prop('disabled',true)

        }).fail(function () {
        getDataStatus = false;
            alertify.alert('Error', 'Error al cargar los detalles del pago, por favor refresque la página e ' +
                                    'intente de nuevo.')
    });

    if(!getDataStatus){
        return false;
    }

    if(detallePago.tipopago == 3 && sale.conabono){

        alertify.alert('Error', 'La factura es de crédito y ya posee abonos, factura no editable.');
        return false;
    }

    if(detallePago.tipopago == 3 && sale.connotacredito){

        alertify.alert('Error', 'La factura es de crédito y ya posee notas de crédito, factura no editable.');
        return false;
    }

    if(detallePago.tipopago != 3 && sale.date != today){

        alertify.alert('Error', 'La factura es de contado pero de una fecha diferente de hoy, factura no editable.');
        return false;
    }

    console.log(detallePago);

    return true;

}



function Imprimir(){

    event.preventDefault();
    $( "#factura").printArea();
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

    $('.subtotal').html(subtotal.toFixed(2));
    $('.totalventa').html(totalventa.toFixed(2));
    $('.totaliv').html(totaliv.toFixed(2));
    $('.totalart').html(totalart);
    $('.totalkg').html(totalkg +' Kg');
    $("#BtnConfirmar").prop("disabled",false);

    //formato de campos de precios
    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    //reclacular toda la tabla
    $("#tablaproductos > tbody").html("");
    $.each( matrixinterna, function(i){
        if(matrixinterna[i][0]==4001||matrixinterna[i][0]==5001){
            agregarcanalatabla(matrixinterna[i][10],matrixinterna[i][9],matrixinterna[i][2],matrixinterna[i][3],matrixinterna[i][11]);
        }
        else{

            preciomodificado=matrixinterna[i][12];
            //console.log(matrixinterna[i][12]);
            preciomodificadomonto=matrixinterna[i][2];

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
            $('#tablabusqueda > tbody:last').append('<tr><td>' + data[i].product_code + '</td><td>' + data[i].description +'</td><td>' + data[i].inventoryplanta +
            '</td><td class="precio" >' + data[i].cost.toFixed(2) + '</td><td><button  type="button" class=" btn btn-success form-control selectrow " id="btnelegir"><span class="glyphicon glyphicon-plus"></span></button></td></tr>');
        });
        $('.precio').priceFormat({
            prefix: '₡ ',
            centsSeparator: ',',
            thousandsSeparator: '.'
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
        $('#tablaproductos > tbody:last').append('<tr><td>' + 4001 + '</td><td>' + description+' Cerdo id# '+id+'</td><td> <button disabled  type="button" class=" btn btn-warning changepricerow" id="btnchangeprice"><span class="glyphicon glyphicon-euro"></span></button></td><td class="precio">' +price.toFixed(2) + '</td><td class=cant'+4001+'>' + peso + '</td>' +
        '<td>'+'E'+'</td><td class="precio total'+4001+'">' + pricesubr.toFixed(2) +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');
        var codCanalCerdo=$.get('/api/productos/?product_code=4001',function(){});
        matrixventa.push([4001, description+' Cerdo id# '+id,precio ,peso,pricesubr, canalivr,pricetotr,codCanalCerdo.responseJSON[0].id,false,1,id,enteroOmedio,0]);//los dos ultimos son si es canal y tipo y el id

    }
    if(tipo==2){//canal de res
        $('#tablaproductos > tbody:last').append('<tr><td>' + 5001 + '</td><td>' + description+' Res id# '+id+'</td><td> <button disabled type="button" class=" btn btn-warning changepricerow" id="btnchangeprice"><span class="glyphicon glyphicon-euro"></span></button></td><td class="precio">' +price.toFixed(2) + '</td><td class=cant'+5001+'>' + peso + '</td>' +
        '<td>'+'E'+'</td><td class="precio total'+5001+'">' + pricesubr.toFixed(2) +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');
        var codCanalRes=$.get('/api/productos/?product_code=5001',function(){});
        matrixventa.push([5001, description+' Res id# '+id,precio ,peso,pricesubr,canalivr,pricetotr,codCanalRes.responseJSON[0].id,false,2,id,enteroOmedio,0]);//los dos ultimos son si es canal y tipo y el id

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
        //var prodinventario=$.get('/api/inventarioresumen/?producto='+data[0].id,function(){});
       var existencia=0;
        //console.log(cliente);
        if (cliente!=2){
          existencia =data[0].inventoryplanta;
        }
        else{
           existencia =data[0].inventorypv;
        }
        var montoimpuesto=((data[0].taxes_amount)/100)+1;
        var usaimpuestos=data[0].taxes;
        var ivr=0;
        var iv=0;
        var price;


        if(inarray==-1){//no existe en la tabla
            if (true){

                if(preciomodificado==0) {
                    var pricetouse = determinprice(data);
                }
                if(preciomodificado==1) {
                    var pricetouse = preciomodificadomonto;
                }
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



                $('#tablaproductos > tbody:last').append(
                    '<tr>' +
                    '<td>' + data[0].product_code + '</td>' +
                    '<td>' + data[0].description+ '</td>' +
                    '<td> <button  type="button" class=" btn btn-warning changepricerow" id="btnchangeprice"><span class="glyphicon glyphicon-euro"></span></button></td>' +
                    '<td class="precio">' +pricetouse.toFixed(2) + '</td>' +
                    '<td class=cant'+data[0].product_code+'>' + cantidad + '</td>' +
                    '<td>'+impentabla+'</td><td class="precio total'+data[0].product_code+'">' + pricesubr.toFixed(2) +'</td>'+'' +
                    '<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');

                matrixventa.push([data[0].product_code, data[0].description,pricetouse ,cantidad,pricesubr,ivr,pricer,data[0].id,usaimpuestos,0,0,0,preciomodificado]);//los tres ultimos son si es canal , el id y si se modifico precio
                //console.log(matrixventa);
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

                preciomodificado=0;
                preciomodificadomonto=0;
            }//if check inventario


        }//no existe en la tabla

        else{//ya existe en la tabla
            var descontar=cantidad+matrixventa[inarray][3];
            matrixventa[inarray][3]=descontar;
            recalculartablaproductos();
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
$("#cnp_orders").prop('disabled',true);
$("#cantidad").prop('disabled',true);
$("#producto").prop('disabled',true);
$("#Btnbuscarclientemain").prop('disabled',true);
$("#Btnbuscarproducto").prop('disabled',true);
$("#BtnConfirmar").hide();
$("#BtnNoConfirmar:hidden").show();
$("#BtnPagar").prop('disabled',false);
$("#BtnCotizar").prop('disabled',false);
$("#amovil").prop('disabled',false);
$("#date").prop("disabled",true);

}

function NoConfirmarDatos(){

    $("#descuento").prop('disabled',true).val('');
    $("#cnp_orders").prop('disabled',false);
    $("#btndescuento").prop('disabled',true);
    $(".removerow").prop('disabled',false);
    $("#cantidad").prop('disabled',false);
    $("#producto").prop('disabled',false);
    $("#Btnbuscarclientemain").prop('disabled',false);
    $("#Btnbuscarproducto").prop('disabled',false);
    $("#BtnConfirmar:hidden").show();
    $("#BtnNoConfirmar").hide();
    $("#BtnPagar").prop('disabled',true);
    $("#BtnCotizar").prop('disabled',true);
    $("#amovil").prop('disabled',true);
    $('.descuentoside').html('');
    $("#date").prop("disabled",false);

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
    //descontarinventarios();
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

function RegistarCotizacion(){

    guardardetalleproductocoti();
    guardarcotizacion();
    if( $('#amovil').val() != 0 && $('#amovil').val() != 4){
    trasladarAMovil();
    }
    if( $('#amovil').val() == 4 ){
    trasladarAPv();
    }
    generarfacturaCoti();
    Imprimir();
    $('#maincontent').find(':input').prop('disabled', true);
    $('#BtnPrint').prop('disabled', false);
    $('#BtnNuevaVenta').prop('disabled', false);

}

function trasladarAMovil(){
    var movil=$('#amovil').val();


    $.each( matrixventa, function(i) {

        var productodatos = $.get('/api/productos/' + matrixventa[i][7] + '/', function () {});

        if(movil==1) {//SI ES A MOVIL 1

            $.ajax({
                method: "PATCH",
                url: "/api/productos/" + productodatos.responseJSON.id + "/",

                data: JSON.stringify({
                    "inventoryplanta": productodatos.responseJSON.inventoryplanta-matrixventa[i][3],
                    "inventory1": matrixventa[i][3]

                }),//JSON object
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
                .fail(function (data) {
                    console.log(data.responseText);
                    alertify.alert("Hubo un problema al crear la cotizacion (PASAR A MOVIL), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function () {

                });
        }
        if(movil==2) {//SI ES A MOVIL 2

            $.ajax({
                method: "PATCH",
                url: "/api/productos/" + productodatos.responseJSON.id + "/",

                data: JSON.stringify({
                    "inventoryplanta": productodatos.responseJSON.inventoryplanta-matrixventa[i][3],
                    "inventory2": matrixventa[i][3]

                }),//JSON object
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
                .fail(function (data) {
                    console.log(data.responseText);
                    alertify.alert("Hubo un problema al crear la cotizacion (PASAR A MOVIL), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function () {

                });
        }

        if(movil==3) {//SI ES A MOVIL 3

            $.ajax({
                method: "PATCH",
                url: "/api/productos/" + productodatos.responseJSON.id + "/",

                data: JSON.stringify({
                    "inventoryplanta": productodatos.responseJSON.inventoryplanta-matrixventa[i][3],
                    "inventory3": matrixventa[i][3]

                }),//JSON object
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
                .fail(function (data) {
                    console.log(data.responseText);
                    alertify.alert("Hubo un problema al crear la cotizacion (PASAR A MOVIL), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function () {

                });
        }
    });
}

function trasladarAPv(){

    $.each( matrixventa, function(i) {

        var productodatos = $.get('/api/productos/' + matrixventa[i][7] + '/', function () {});


            $.ajax({
                method: "PATCH",
                url: "/api/productos/" + productodatos.responseJSON.id + "/",

                data: JSON.stringify({
                    "inventoryplanta": productodatos.responseJSON.inventoryplanta-matrixventa[i][3],
                    "inventorypv": productodatos.responseJSON.inventorypv+matrixventa[i][3]

                }),//JSON object
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
                .fail(function (data) {
                    //console.log(data.responseText);
                    alertify.alert("Hubo un problema al crear la cotizacion (PASAR A PV), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function () {

                });


    });
}

function guardardetalleproductocoti(){

    //matrixventa.push([data[0].product_code, data[0].description,pricetouse ,cantidad,pricesubr,ivr,pricer,data[0].id,usaimpuestos]);
    event.preventDefault();
     $.each( matrixventa, function(i){

        $.ajax({
          method: "POST",
          url: "/api/detalleproductocotizacion/",
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
            alertify.alert("Hubo un problema al crear la cotizacion(detallecotizacion), por favor intente de nuevo o contacte a Emanuel al # 83021964 "+data.responseText);
            })
            .success(function(data){
                detallesventa.push(data.id);
                //console.log(detallesventa);
            });
    });

}

function guardarcotizacion(){

    $.ajax({
            method: "POST",
            url: "/api/cotizacion/",
            async: false,

            data: JSON.stringify({
                "client": cliente,
                "nombrecliente": $('#cliente').val(),
                "cashier": usuario,
                "date": $('#date').val(),
                "time": tiempoahora(),
                "totolkilogramos": totalkg,
                "cantidadarticulos": totalart,
                "subtotal": subtotal,
                "iv": totaliv,
                "descopor": descuentoporc,
                "desctocol": descuento,
                "total": totalventa,
                "detalleproductos": detallesventa,
                "movil":$("#amovil").val()

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .fail(function (data) {
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear la cotizacion (crear obj cotizacion), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        })
        .success(function (data) {
            cotizacionid=data.id;
        });

}

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
                            "date": $('#date').val(),
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
            nuevaextplanta= productodatos.responseJSON.inventoryplanta-matrixventa[i][3];
            nuevaextpv=productodatos.responseJSON.inventorypv-matrixventa[i][3];
            //console.log(nuevaext);
            //patch al producto
           if(cliente!=2){  //if cliente no es 2
            $.ajax({
              method: "PATCH",
              url: "/api/productos/"+productodatos.responseJSON.id+"/",

              data: JSON.stringify({

                "inventory": nuevaext,
                "inventoryplanta": nuevaextplanta

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
                            "date": $('#date').val(),
                            "time": tiempoahora(),
                            "usuario": usuario
                        }),//JSON object
                          contentType:"application/json; charset=utf-8",
                          dataType:"json"
                        })
                        .success(function() {

                                //var prodinventario=$.get('/api/inventarioresumen/?producto='+matrixventa[i][7],function(){});
                                //
                                //$.ajax({
                                //        method: "PATCH",
                                //        url: "/api/inventarioresumen/" + prodinventario.responseJSON[0].id + "/",
                                //
                                //        data: JSON.stringify({
                                //
                                //            "cantidad": nuevaext
                                //
                                //        }),//JSON object
                                //        contentType: "application/json; charset=utf-8",
                                //        dataType: "json"
                                //})
                                //.success(function () {
                                //
                                //})
                                //.fail(function (data) {
                                //    alertify.alert("Hubo un problema al crear la salida, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                                //});

                        })
                        .fail(function(data) {
                        alertify.alert("Hubo un problema al crear la salida de inventario, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                        });

            });//success func
           }// cierra if cliente no es 2
            else{
            $.ajax({
              method: "PATCH",
              url: "/api/productos/"+productodatos.responseJSON.id+"/",

              data: JSON.stringify({

                "inventory": nuevaext,
                "inventorypv": nuevaextpv

                }),//JSON object
                  contentType:"application/json; charset=utf-8",
                  dataType:"json"
            })
            .fail(function (data) {
                console.log(data.responseText);
                alertify.alert("Hubo un problema al crear la venta(DESCONTAR INVENTARIO PV), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
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
                            "date": $('#date').val(),
                            "time": tiempoahora(),
                            "usuario": usuario
                        }),//JSON object
                          contentType:"application/json; charset=utf-8",
                          dataType:"json"
                        })
                        .success(function() {

                        })
                        .fail(function(data) {
                        alertify.alert("Hubo un problema al crear la salida de inventario(CREAR SALIDA PV), por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                        });

            });//success func
           }// else de caso cliente
        }//else de no es canal
    });//each

}

function guardarventa(){
    var saldoguardar=0;
    if($("#pagacontipo").val()==3){
        saldoguardar=totalventa;
    }

    var cnp_orders=$('#cnp_orders').val();

    if (cnp_orders==''){
        cnp_orders='-'
    }

    $.ajax({
            method: "PATCH",
            url: "/api/venta/"+ventaAEditar.id,
            async: false,

            data: JSON.stringify({
                "totolkilogramos": totalkg,
                "cantidadarticulos": totalart,
                "subtotal": subtotal,
                "iv": totaliv,
                "descopor": descuentoporc,
                "desctocol": descuento,
                "total": totalventa,
                "detalleproductos": detallesventa,
                "datosdelpago": detallepago,
                "saldo": saldoguardar,
                "cpnval": cnp_orders
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

    var saldonuevo=detallecuenta.responseJSON[0].total+totalventa-ventaAEditar.total;

     $.ajax({
      method: "PATCH",
      url: "/api/saldocobrar/"+detallecuenta.responseJSON[0].id+"/",

      data: JSON.stringify({
        "total": saldonuevo


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

    if (clienteContadoNombre==0){
        var clientefactura=$.get('/api/clientes/'+cliente+'/',function(){});
        $('.clientefact').html('  '+clientefactura.responseJSON.name+' '+clientefactura.responseJSON.last_name);
    }
    if (clienteContadoNombre==1){

        $('.clientefact').html(clienteContadoNombreVal);
    }


    var cajerofactura=$.get('/api/cajeros/'+usuario+'/',function(){});

    var tipoventafact='CONTADO.';
    if($("#pagacontipo").val()==3){
        tipoventafact='CRÉDITO.';
        $('#firmacredito:hidden').show();
    }

    var thisdate = $("#date").val();
    thisdate = thisdate.split('-')
    var dateToShow = thisdate[2]+'/'+thisdate[1]+'/'+thisdate[0];

    $('#timbrado:hidden').show();
    $('.facturanumfact').html(' '+ventaid);
    $('.tipoventafact').html(' '+tipoventafact);
    $('.fechafact').html('  '+dateToShow +' '+tiempoahora());
    $('.cajerofact').html('  '+cajerofactura.responseJSON.name+' '+cajerofactura.responseJSON.last_name);
    $('.vendedorfact').html($("#vendedor :selected").text());

    $.each( matrixventa, function(i){
        $('#tablafactura > tbody:last').append('<tr><td> ' +matrixventa[i][3]+ ' </td><td>' + matrixventa[i][1]+ '</td><td class="precio">' +matrixventa[i][2].toFixed(2)+ '</td><td class="precio">' +matrixventa[i][4].toFixed(2)+ '</td></tr>');
    });
    if(descuento>0){
        $('.descueentofactleft').html('DESCUENTO '+descuentoporc +'%');
    }

    $('.subtotalfactright').html(subtotal.toFixed(2));
    $('.descueentofactright').html(descuento.toFixed(2));
    $('.ivfactright').html(totaliv.toFixed(2));
    $('.cnpfactright').html($('#cnp_orders').val());
    $('.totalfactright').html(totalventa.toFixed(2));

    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });
    $('.sidetotales').hide();
    $('.factura:hidden').show();
}

function generarfacturaCoti(){
    var clientefactura=$.get('/api/clientes/'+cliente+'/',function(){});
    var cajerofactura=$.get('/api/cajeros/'+usuario+'/',function(){});
    var tipoventafact='COTIZACION.';

    var thisdate = $("#date").val();
    thisdate = thisdate.split('-');
    var dateToShow = thisdate[2]+'/'+thisdate[1]+'/'+thisdate[0];


    $('#timbrado').hide();
    $('.facturanumfactleft').html('COTIZA #&nbsp&nbsp&nbsp&nbsp:&nbsp');

    $('.facturanumfact').html(' '+cotizacionid);
    $('.tipoventafact').html(' '+tipoventafact);
    $('.fechafact').html('  '+dateToShow +' '+tiempoahora());
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
