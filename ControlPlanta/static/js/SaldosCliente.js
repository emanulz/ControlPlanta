//variables globales

//vars de cuentas cobrar
var cliente=1;
var idcuentacobrar=1;
var facturaspend=[];
var facturasabono=[];
var pendientes=[];
var abonos=[];
var totalsaldo;
var saldorestante;
var tipocambiodolares;
var totalabono;
var totalabonodolares;
var liquidar=false;
var restanteabono;
var idabonohecho=1;
var pendientenc=1;
var liquidarFacturaNC=false;
var montoNCAplicar=0;
var factPendientesNC=[];
var notaCreditoID=0;
var nostasCredCliente=[];

var transacciones=[];
var comprasresumen=0;
var abonosresumen=0;
var notasresumen=0;

//vars de modelo
var tarjetaabono=6;
var digitosabono=0;
var authdatafono=0;
var transfnumabono=0;
var chequenumabono=0;

//

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
         //$('#tablafacturaspend').DataTable();

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

        //selectrow canal
        //$('html').on('click','.selectrowfactura', function () {
        //    event.preventDefault();
        //    var row=$(this).closest("tr");
        //    var rowIndex = row.index();
        //    var precio=$('#preciocanalkilo').val();
        //    if(precio==''){
        //        alertify.alert('Error','Ingrese un precio válido');
        //    }
        //    else{
        //        //canaleslist.push([data[i].id,data[i].consecutive,data[i].weight,data[i].qualification,data[i].fierro,data[i].tipo]);
        //        agregarcanalatabla(canaleslist[rowIndex][0],canaleslist[rowIndex][5],precio,canaleslist[rowIndex][2]);
        //    }
        //});
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


        //botones

        //boton de busqueda en panel de busqueda producto
        $("#btnbusqueda").on("click",BuscarProducto);


        //botones de cliente



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

        $('#BtnNuevaVenta').on("click",function(){
            location.reload();
        });

        //boton de busqueda en panel de busqueda cliente

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


        //CUENTAS COBRAR #################

        var tipocambiodolarget=$.get('/api/variableglobal/?nombre=cambiodolar',function(){});
        tipocambiodolares=tipocambiodolarget.responseJSON[0].valornum;
        $('.tipocambiohead').html('Tipo de Cambio '+tipocambiodolares.toFixed(2));

        //botones
        $("#BtnPrint").on("click",Imprimir);
        $("#BtnPrintabono").on("click",ImprimirAbono);
        $("#BtnPrintNC").on("click",ImprimirNC);
        $('#imprimirResumenBtn').on("click",ImprimirResumen);
        $("#Btnbuscarcliente").on("click",BuscarCliente);
        $("#BtnconfirmarAbono").on("click",ChequearDatosabono);
        $("#BtneditarAbono").on('click',EditardatosAbono);
        $("#BtnRegistrarAbono").on('click',RegistrarAbono);

        $("#BtnconfirmarNC").on("click",function(){
            $("#montonc").prop('disabled',true);
            $(".BtnconfirmarNC").hide();
            $(".BtneditarNC:hidden").show();
            $(".BtnRegistrarNC:hidden").show();

        });

        $("#BtneditarNC").on("click",function(){
            $("#montonc").prop('disabled',false);
            $(".BtneditarNC").hide();
            $(".BtnRegistrarNC").hide();
            $(".BtnconfirmarNC:hidden").show();
        });

        $("#BtnRegistrarNC").on("click",function(){
           crearNC();
        });

        $('#BtnNuevoAbono').on("click",function(){
            location.reload();
        });

        $('#BtnNuevoNC').on("click",function(){
            location.reload();
        });

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

                CargarSaldo();

        });

        //selectrow factura (desplegar factura)

        $('html').on('click','.selectrowfactura', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();
            //var precio=$('#preciocanalkilo').val();
            //formato [id,fecha,total,saldo,cliente,cajero]
            //canaleslist.push([data[i].id,data[i].consecutive,data[i].weight,data[i].qualification,data[i].fierro,data[i].tipo]);
            //agregarcanalatabla(canaleslist[rowIndex][0],canaleslist[rowIndex][5],precio,canaleslist[rowIndex][2]);
            if (transacciones[rowIndex][0]==1) {
                $('.factura:hidden').show();
                $('.reciboabono').hide();
                $('.reciboNC').hide();
                CargarFactura(transacciones[rowIndex][1]);
            }
            if (transacciones[rowIndex][0]==2) {
                $('.reciboabono:hidden').show();
                $('.factura').hide();
                $('.reciboNC').hide();
                //console.log(transacciones);
                CargarAbono(transacciones[rowIndex][1]);
            }
            if (transacciones[rowIndex][0]==3) {
                $('.reciboNC:hidden').show();
                $('.factura').hide();
                $('.reciboabono').hide();
                 CargarNC(transacciones[rowIndex][1]);
                //CargarFactura(facturaspend[rowIndex][0], facturaspend[rowIndex][4], facturaspend[rowIndex][5]);
            }
        });

        //selectrow selectrownotacred (desplegar factura)

        $('html').on('click','.selectrownotacred', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();
            event.preventDefault();
            $('.cd-panelnotacred').addClass('is-visible');
            $('#montonc').focus();
            blurElement('.blurlines',2);
            pendientenc=facturaspend[rowIndex][0];

            llenarDatosNC(pendientenc,cliente);

        });

        $('.cd-panelnotacred').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelnotacred').removeClass('is-visible');
                blurElement('.blurlines',0);

                $(".montonctotal").html('₡ 0,00');
                $("#montonc").val('');
                $("#montonc").prop('disabled',false);
                $(".BtneditarNC").hide();
                $(".montomayorsaldonc").hide();
                $(".BtnRegistrarNC").hide();
                $(".BtnconfirmarNC:hidden").show();
                event.preventDefault();
            }
        });



        //Eventos Change

        $("#montoabono").bind("change paste keyup", function() {
            TotalesAbono();
        });

        $("#montonc").bind("change paste keyup", function() {
            TotalesNC(pendientenc);
            ChequearDatosNC();
        });

        $( "#monedaabono" ).change(function() {
            TotalesAbono();
         });

        $( "#pagacontipo" ).change(function() {
                if( $("#pagacontipo").val()==1){
                    $(".pagotarjeta").hide();
                    $(".transferencia").hide();
                    $(".cheque").hide();
                }
                if( $("#pagacontipo").val()==2){
                    $(".pagoefectivo").hide();
                    $(".pagotarjeta:hidden").show();
                    $(".transferencia").hide();
                    $(".cheque").hide();
                }
                if( $("#pagacontipo").val()==4){
                    $(".pagoefectivo").hide();
                    $(".pagotarjeta").hide();
                    $(".transferencia:hidden").show();
                    $(".cheque").hide();
                }
                if( $("#pagacontipo").val()==5){
                    $(".pagoefectivo").hide();
                    $(".pagotarjeta").hide();
                    $(".transferencia").hide();
                    $(".cheque:hidden").show();
                }
                if( $("#pagacontipo").val()==3){
                    $('.errorsaldoactual').hide();
                    $('.errornocredito').hide();
                    $(".pagoefectivo").hide();
                    $(".pagotarjeta").hide();
                    $(".credito:hidden").show();
                    $("#montoefectivo").val(0);
                    var cliente2=$.get('/api/clientes/'+cliente+'/',function(){});
                    //cliente=cliente2.responseJSON[0].id;
                    $("#nombreclientecred").val(cliente2.responseJSON.name+' '+cliente2.responseJSON.last_name);
                    $("#limitecred").val('₡'+cliente2.responseJSON.credit_limit);
                    var saldos = $.get('/api/saldocobrar/?cliente='+cliente,function(){});

                    $("#saldocred").val('₡'+saldos.responseJSON[0].total);

                    if((saldos.responseJSON[0].total+totalventa)>cliente2.responseJSON.credit_limit){
                        $('.errorsaldoactual:hidden').show();
                    }
                    if(cliente2.responseJSON.credit==false){
                        $('.errorsaldoactual').hide();
                        $('.errornocredito:hidden').show();
                    }
                    vuelto();
                    $(".pagaconpagar").html('CRÉDITO');
                    $(".vueltopagar").html('₡ 0,00');
                }
            });

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
            CargarSaldo();
        });

        //PANEL DE ABONO

        $('.btnabono').on('click', function(event){
            event.preventDefault();

            $('.cd-panelabono').addClass('is-visible');
            blurElement('.blurlines',2);
        });
        $('.cd-panelabono').on('click', function(event){
            if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
                $('.cd-panelabono').removeClass('is-visible');

                blurElement('.blurlines',0);
                event.preventDefault();
            }
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



    }//main


function Imprimir(){

    event.preventDefault();
    $( "#factura").printArea();
}

function ImprimirAbono(){

    event.preventDefault();
    $( "#abono").printArea();
}

function ImprimirResumen(){

    event.preventDefault();
    $( "#imprimirResumen").printArea();
}

function ImprimirNC(){

    event.preventDefault();
    $( "#notacred").printArea();
}

function tiempoahora(){
    var dt = new Date();
    return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
}

function llenarDatosNC(factura,cliente){
    var cuentaCobrar=$.get('/api/saldocobrar/?cliente='+cliente,function(){});
    var factura =$.get('/api/venta/'+factura+'/',function(){});
    var cliente =$.get('/api/clientes/'+cliente+'/',function(){});
    //console.log(cuentaCobrar);
    $(".codigoclientenc").html(cliente.responseJSON.code);
    $(".nombreclientenc").html(cliente.responseJSON.name+' '+cliente.responseJSON.last_name);
    $(".creditlimitnc").html(cliente.responseJSON.credit_limit.toFixed(2));
    $(".saldoactualnc").html(cuentaCobrar.responseJSON[0].total.toFixed(2));
    $(".numfacturanc").html('# '+factura.responseJSON.id);
    $(".saldofacturanc").html(factura.responseJSON.saldo.toFixed(2));
    $(".montopendientefactura").html(factura.responseJSON.saldo.toFixed(2));


    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

}

function crearNC(){

    //crear nota credito
    crearObjNC(pendientenc,cliente);
    //quitar el monto de la nota de la factura
    // si la factura se cancela se quita de las pendientes y se deja saldo en 0
    quitarNCdeFactura(pendientenc,cliente);
    //patch saldo, notas de credito y pending en cuentas cobrar
    patchDatosNC(cliente);
    //imprimir recibo de la nota de credito
    ImprimirReciboNC(notaCreditoID,cliente);
    //recargar la tabla
}
//comienza funciones de registo de NC

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
        "monto": montoNCAplicar,
        "saldoanteriorfact": pendiente,
        "saldoactualfact": pendiente-montoNCAplicar,
        "saldoanterior": cuentaCobrar.responseJSON[0].total,
        "saldoactual": cuentaCobrar.responseJSON[0].total-montoNCAplicar,
        "venta": factura,
        "detalle":'Nota de crédito a factura #'+factura
        }),//JSON object
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    })
    .fail(function(data){
        console.log(data.responseText);
        alertify.alert("Hubo un problema al crear la nota de crédito, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
    })
    .success(function(data){
        console.log(data);
        notaCreditoID=data.id;
        console.log(notaCreditoID);
        nostasCredCliente.push(notaCreditoID);
        console.log(nostasCredCliente);
    });//ajax
}

function quitarNCdeFactura(factura,cliente){

    var facturaPend=$.get('/api/venta/'+factura+'/',function(){});
    var pendiente=facturaPend.responseJSON.saldo;
    var cuentaCobrar=$.get('/api/saldocobrar/?cliente='+cliente,function(){});
    factPendientesNC=cuentaCobrar.responseJSON[0].pending;

    if(liquidarFacturaNC==true){
        $.ajax({
            method: "PATCH",
            url: "/api/venta/" + factura + "/",

            data: JSON.stringify({

            "saldo": 0

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .success(function () {
             factPendientesNC.splice( $.inArray(factura, factPendientesNC), 1 );
        })
        .fail(function (data) {
            alertify.alert("Hubo un problema al crear la nota de crédito, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });
    }
    else{
        $.ajax({
            method: "PATCH",
            url: "/api/venta/" + factura + "/",

            data: JSON.stringify({

            "saldo": pendiente-montoNCAplicar

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .success(function () {

        })
        .fail(function (data) {
            alertify.alert("Hubo un problema al crear el abono, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });
    }

}

function patchDatosNC(cliente){
    //console.log(cliente);
    var cuentaCobrar=$.get('/api/saldocobrar/?cliente='+cliente,function(){});
    //console.log("/api/saldocobrar/" + cuentaCobrar.responseJSON[0].id + "/");

    $.ajax({
            method: "PATCH",
            url: "/api/saldocobrar/" + cuentaCobrar.responseJSON[0].id + "/",

            data: JSON.stringify({

            "total": cuentaCobrar.responseJSON[0].total-montoNCAplicar,
            "pending": factPendientesNC,
            "notasdecredito": nostasCredCliente

            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .success(function () {

        })
        .fail(function (data) {
            alertify.alert("Hubo un problema al crear la nota de crédito, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        });

}

function ImprimirReciboNC(id,clienteid){

    var notacred=$.get('/api/notacredito/'+id+'/',function(){});
    var cliente=$.get('/api/clientes/'+clienteid+'/',function(){});
    $('.numNC').html(' '+id);
    $('.fechNC').html(' '+notacred.responseJSON.date+' '+notacred.responseJSON.time);
    $('.clienteNC').html(' '+cliente.responseJSON.name+' '+cliente.responseJSON.last_name);

    $('.NumfactNC').html(' '+notacred.responseJSON.venta);
    $('.montoAplicadoNC').html(' '+notacred.responseJSON.monto.toFixed(2));
    $('.saldoAntFact').html(' '+notacred.responseJSON.saldoanteriorfact.toFixed(2));
    $('.saldoActFact').html(' '+notacred.responseJSON.saldoactualfact.toFixed(2));
    $('.saldoAntCuenta').html(' '+notacred.responseJSON.saldoanterior.toFixed(2));
    $('.saldoActCuenta').html(' '+notacred.responseJSON.saldoactual.toFixed(2));

    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    $('.factura').hide();
    $('.reciboabono').hide();
    $('.reciboNC:hidden').show();

    $('.cd-panelnotacred').removeClass('is-visible');

    blurElement('.blurlines',0);
    $('#maincontent').find(':input').prop('disabled', true);
    $("#BtnPrintNC").prop('disabled',false);
    $("#BtnNuevoNC").prop('disabled',false);


    ImprimirNC();


}

//hasta aqui funciones de registo de NC
function TotalesNC(factura){

    var facturaPend=$.get('/api/venta/'+factura+'/',function(){});
    var montoNC=parseFloat($("#montonc").val());
    var pendiente=facturaPend.responseJSON.saldo;
    var pendienteFact=pendiente-montoNC;
    $('.montonctotal').html(montoNC.toFixed(2));
    $('.montopendientefactura').html(pendienteFact.toFixed(2));

    if(montoNC>=pendiente){
        $('.montopendientefactura').html(0.00.toFixed(2));
        $('.montomayorsaldonc:hidden').show();
        $('#BtnRegistrarNC').html('Liquidar Factura');
        liquidarFacturaNC=true;
        montoNCAplicar=pendiente;
    }
    else{
        $('.montomayorsaldonc').hide();
        $('#BtnRegistrarNC').html('Registrar Nota');
        liquidarFacturaNC=false;
        montoNCAplicar=montoNC;
    }

    if($("#montonc").val()==''){
      $('.montopendientefactura').html(pendiente.toFixed(2));
    }


    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });
}

function ChequearDatosNC(){
 if($("#montonc").val()!=''&&$("#montonc").val()>0){
     $("#BtnconfirmarNC").prop('disabled',false);
 }
    else{
     $("#BtnconfirmarNC").prop('disabled',true);
 }
}

function ChequearDatosabono(){
    var control=false;

    if($( "#pagacontipo").val()==1){//si es en efectivo
        if($( "#montoabono").val()==''||$( "#montoabono").val()<=0){
            alertify.alert('Error','El monto del abono tiene que ser mayor que cero.');
        }
        else{
            control=true;
            tarjetaabono=6;
            digitosabono=0;
            authdatafono=0;
            transfnumabono=0;
            chequenumabono=0;
        }
    }
     if($( "#pagacontipo").val()==2){//si es con tarjeta
        if($( "#montoabono").val()==''||$( "#montoabono").val()<=0||$( "#4digits").val()==''||$( "#authtarjeta").val()==''){
            alertify.alert('Error','Hay datos incompletos o el monto es menor que cero, por favor revise los datos del monto y tarjeta.');
        }
        else{
            control=true;
            tarjetaabono=6;
            digitosabono=$( "#4digits").val();
            authdatafono=$( "#authtarjeta").val();
            transfnumabono=0;
            chequenumabono=0;
        }
    }
     if($( "#pagacontipo").val()==4){//si es en transferencia
        if($( "#montoabono").val()==''||$( "#montoabono").val()<=0||$( "#numtransf").val()==''){
            alertify.alert('Error','Hay datos incompletos o el monto es menor que cero, por favor revise los datos del monto y transferencia.');
        }
        else {
            control = true;
            tarjetaabono = 6;
            digitosabono = 0;
            authdatafono = 0;
            transfnumabono = $("#numtransf").val();
            chequenumabono = 0;
        }
    }
     if($( "#pagacontipo").val()==5){//si es en cheque
         if($( "#montoabono").val()==''||$( "#montoabono").val()<=0||$( "#chequenum").val()==''){
            alertify.alert('Error','Hay datos incompletos o el monto es menor que cero, por favor revise los datos del monto y cheque.');
        }
        else{
            control=true;
            tarjetaabono=6;
            digitosabono=0;
            authdatafono=0;
            transfnumabono=0;
            chequenumabono=$('#chequenum').val();
        }
    }
    if (control==true){//si pasa los requisitos
        //alertify.alert('Exito','Eeexitooo');
        $('.datosdelabono').find(':input').prop('disabled', true);
        $('#BtnconfirmarAbono').hide();
        $('.btneditardatos:hidden').show();
        $('.btnregistrarabono:hidden').show();
        $("#BtneditarAbono").prop('disabled',false);
        $("#BtnRegistrarAbono").prop('disabled',false);
    }

}

function EditardatosAbono(){
        $('.datosdelabono').find(':input').prop('disabled', false);
        $('#BtnconfirmarAbono:hidden').show();
        $('.btneditardatos').hide();
        $('.btnregistrarabono').hide();
}

function RegistrarAbono(){
    //console.log('ENTRO A FUNC');
    if(liquidar==true){
        //llama a liquidar deuda
        $.each( facturaspend, function(i){
            patchfacturasaldo(facturaspend[i][0],0);
            facturasabono.push(facturaspend[i][0]);
        });
        saldorestante=0;
        pendientes=[];
        CrearObjAbono();
        patchresumensaldo(0);
        //imprimir recibo
        ImprimirReciboAbono(idabonohecho,cliente);

    }
    else{
        //console.log('ENTRO A FALSE');
        var matrixpendientes=facturaspend;
        $.each( matrixpendientes, function(i){
            DescontarAbono(matrixpendientes[i][0],matrixpendientes[i][3]);
        });
        saldorestante=totalsaldo-totalabono;
        //crear abono
        CrearObjAbono();
        //patch cuenta cobrar
        patchresumensaldo(saldorestante);
        //imprimir recibo
        ImprimirReciboAbono(idabonohecho,cliente)

    }
}

function ImprimirReciboAbono(id,cliente){

    var abono=$.get('/api/abonoscobrar/'+id+'/',function(){});
    var cliente=$.get('/api/clientes/'+cliente+'/',function(){});
    $('.numabono').html(' '+abono.responseJSON.id);
    $('.fechaabono').html(' '+abono.responseJSON.date+' '+abono.responseJSON.time);
    $('.clienteabono').html(' '+cliente.responseJSON.name+' '+cliente.responseJSON.last_name);

    $('.montoabono').html(' '+abono.responseJSON.montocol.toFixed(2));
    $('.saldoanteior').html(' '+abono.responseJSON.saldoant.toFixed(2));
    $('.saldoactual').html(' '+abono.responseJSON.saldoactual.toFixed(2));

    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    $('.factura').hide();
    $('.reciboabono:hidden').show();
    $('.cd-panelabono').removeClass('is-visible');

    blurElement('.blurlines',0);
    $('#maincontent').find(':input').prop('disabled', true);
    $("#BtnPrintabono").prop('disabled',false);
    $("#BtnNuevoAbono").prop('disabled',false);


    ImprimirAbono();


}

function DescontarAbono(id,saldo){
    if(restanteabono>0){//solo descuenta si queda saldo de lo que abona
        facturasabono.push(id);
        var restante=restanteabono-saldo;

        if(restante>=0){
            restanteabono=restante;
            //patch factura con 0 de saldo
            patchfacturasaldo(id,0);
            //quitar id de facturas pendientes
            pendientes.splice( $.inArray(id, pendientes), 1 );

        }
        else{
            //patch factura con saldo = saldo -restanteabono
            patchfacturasaldo(id,(saldo-restanteabono));
            //
            restanteabono=0;
        }

    }
}

function patchfacturasaldo(id,saldo){

    $.ajax({
        method: "PATCH",
        url: "/api/venta/" + id + "/",

        data: JSON.stringify({

        "saldo": saldo

        }),//JSON object
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
    .success(function () {

    })
    .fail(function (data) {
        alertify.alert("Hubo un problema al crear el abono, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
    });

}

function patchresumensaldo(saldo){

    $.ajax({
        method: "PATCH",
        url: "/api/saldocobrar/" + idcuentacobrar + "/",

        data: JSON.stringify({

        "total": saldo,
        "pending": pendientes,
        "abonos": abonos

        }),//JSON object
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
    .success(function () {

    })
    .fail(function (data) {
        alertify.alert("Hubo un problema al crear el abono, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
    });

}

function CrearObjAbono(){
    var moneda;
    if($('#monedaabono').val()==1){
        moneda='Colones'
    }
    if($('#monedaabono').val()==1){
        moneda='Dolares'
    }
    $.ajax({
        method: "POST",
        url: "/api/abonoscobrar/",
        async: false,

        data: JSON.stringify({
        "date": today,
        "time": tiempoahora(),
        "detalle": "Abono a Factura(s) " + facturasabono,
        "facturas": facturasabono,
        "moneda": moneda,
        "montocol": totalabono,
        "montodolar": totalabonodolares,
        "tipopago": $('#pagacontipo').val(),
        "tipotarjeta": $('#tipotarjeta').val(),
        "digitos": digitosabono,
        "autorizacion": authdatafono,
        "transfnum": transfnumabono,
        "bancotransf":$("#bancotransf option:selected").text(),
        "chequenum": chequenumabono,
        "banco": $("#bancocheque option:selected").text(),
        "saldoant": totalsaldo,
        "saldoactual": saldorestante
        }),//JSON object
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    })
    .fail(function(data){
        console.log(data.responseText);
        alertify.alert("Hubo un problema al crear el abono, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
    })
    .success(function(data){
        //console.log(data.id);
        //detallepago=data.id;
        abonos.push(data.id);
        idabonohecho=data.id;
    });//ajax
}

function CargarSaldo(){
    $("#tablafacturaspend > tbody").html("");
    $('.nosaldo').hide();
    $('#montosresumen').hide();
    $('#imprimirResumenBtn').show();
    $("#BtnAbono").prop('disabled',true);

    facturaspend=[];
    var cuentascobrar=$.get('/api/saldocobrar/?cliente='+cliente,function(){});
    idcuentacobrar=cuentascobrar.responseJSON[0].id;
    totalsaldo=cuentascobrar.responseJSON[0].total;
    pendientes=cuentascobrar.responseJSON[0].pending;
    abonos=cuentascobrar.responseJSON[0].abonos;

    var clientetemp=$.get('/api/clientes/'+cliente+'/',function(){});

    $('#saldototal').val(cuentascobrar.responseJSON[0].total.toFixed(2));
    var matrixcobrar=cuentascobrar.responseJSON[0].pending;
    var matrixnotascred=cuentascobrar.responseJSON[0].notasdecredito;

    $.each( matrixcobrar, function(i){
        llenartablafacturas(matrixcobrar[i]);
    });

    $('.nombreresumensaldo').html(clientetemp.responseJSON.name+' '+clientetemp.responseJSON.last_name);
    $('.codigoresumensaldo').html(clientetemp.responseJSON.code);
    $('.fecharesumensaldo').html(todaynorm);

    $('.comprasresumensaldo').html(comprasresumen.toFixed(2));
    $('.abonosresumensaldo').html(abonosresumen.toFixed(2));
    $('.ncresumensaldo').html(notasresumen.toFixed(2));
    $('.totalresumensaldo').html(cuentascobrar.responseJSON[0].total.toFixed(2));


    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    $('.precioneg').priceFormat({
        prefix: '₡ -',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    if(totalsaldo==0){
        $('.nosaldo:hidden').show();
    }
    else{
        $("#BtnAbono").prop('disabled',false);
        $('#montosresumen:hidden').show();
        $('#imprimirResumenBtn:hidden').show();
    }

}

function llenartablafacturas (factura){
    var ventapend=$.get('/api/venta/'+factura+'/',function(){});
    var detallepago=$.get('/api/detallepago/'+ventapend.responseJSON.datosdelpago+'/',function(){});

    $('#tablafacturaspend > tbody:last').append('<tr><td>VENTA A CRÉDITO</td><td>' + ventapend.responseJSON.id + '</td><td>' + ventapend.responseJSON.date +
    '</td><td class=precio>' + ventapend.responseJSON.total.toFixed(2) + '</td>' +
    '<td><button style="width: 75px" type="button" class=" btn btn-success form-control selectrowfactura " id="btnelegir"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>');
    transacciones.push([1,ventapend.responseJSON.id]);
    comprasresumen=comprasresumen+ventapend.responseJSON.total;

    var abonosfact=$.get('/api/abonoscobrar/?facturas='+factura,function(){});

    $.each( abonosfact.responseJSON, function(i){
    //contadorrows=contadorrows+1;
        $('#tablafacturaspend > tbody:last').append('<tr><td>ABONO A FACTURAS</td><td>' + abonosfact.responseJSON[i].id + '</td><td>' + abonosfact.responseJSON[i].date +
        '</td><td class=precioneg>' + abonosfact.responseJSON[i].montocol.toFixed(2) + '</td>' +
        '<td><button style="width: 75px" type="button" class=" btn btn-success form-control selectrowfactura " id="btnelegir"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>');
        transacciones.push([2,abonosfact.responseJSON[i].id]);
        abonosresumen=abonosresumen+abonosfact.responseJSON[i].montocol
    });

    var notascredfact=$.get('/api/notacredito/?venta='+factura,function(){});

    $.each( notascredfact.responseJSON, function(i){
        $('#tablafacturaspend > tbody:last').append('<tr><td>NOTA DE CRÉDITO</td><td>' + notascredfact.responseJSON[i].id + '</td><td>' + notascredfact.responseJSON[i].date +
        '</td><td class=precioneg>' + notascredfact.responseJSON[i].monto.toFixed(2) + '</td>' +
        '<td><button style="width: 75px" type="button" class=" btn btn-success form-control selectrowfactura " id="btnelegir"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>');
        transacciones.push([3,notascredfact.responseJSON[i].id]);
        notasresumen=notasresumen+notascredfact.responseJSON[i].monto;
    });

}

function CargarFactura(factura){
    $("#tablafactura > tbody").html("");

    var venta=$.get('/api/venta/'+factura+'/',function(){});

    var clientefactura=$.get('/api/clientes/'+venta.responseJSON.client+'/',function(){});
    var cajerofactura=$.get('/api/cajeros/'+venta.responseJSON.cashier+'/',function(){});

    var matrixproductos=venta.responseJSON.detalleproductos;
    var tipoventafact='CRÉDITO.';
    //if($("#pagacontipo").val()==3){
    //    tipoventafact='CRÉDITO.';
    //}

    $('.facturanumfact').html(' '+factura);
    $('.tipoventafact').html(' '+tipoventafact);
    $('.fechafact').html('  '+venta.responseJSON.date +' '+venta.responseJSON.time);
    $('.clientefact').html('  '+clientefactura.responseJSON.name+' '+clientefactura.responseJSON.last_name);
    $('.cajerofact').html('  '+cajerofactura.responseJSON.name+' '+cajerofactura.responseJSON.last_name);

    $.each( matrixproductos, function(i){
        var detalleint=$.get('/api/detalleproducto/'+matrixproductos[i]+'/',function(){});
        //var producto=$.get('/api/productos/'+detalleint.responseJSON.producto+'/',function(){});
        $('#tablafactura > tbody:last').append('<tr><td> ' +detalleint.responseJSON.cantidad+ ' </td><td>' + detalleint.responseJSON.description+ '</td><td class="precio">' +detalleint.responseJSON.total.toFixed(2)+ '</td></tr>');
    });
    if(venta.responseJSON.descopor>0){
        $('.descueentofactleft').html('DESCUENTO '+venta.responseJSON.descopor +'%');
    }

    $('.subtotalfactright').html(venta.responseJSON.subtotal.toFixed(2));
    $('.descueentofactright').html(venta.responseJSON.desctocol.toFixed(2));
    $('.ivfactright').html(venta.responseJSON.iv.toFixed(2));
    $('.totalfactright').html(venta.responseJSON.total.toFixed(2));

    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });
    //$('.sidetotales').hide();
    //('.factura:hidden').show();
}

function CargarAbono(idabono){

    //console.log(idabono);

    $("#tablafactura > tbody").html("");

    var abono=$.get('/api/abonoscobrar/'+idabono+'/',function(){});
    var venta=$.get('/api/venta/'+abono.responseJSON.facturas+'/',function(){});
    var clientefactura=$.get('/api/clientes/'+venta.responseJSON.client+'/',function(){});
    //var cajerofactura=$.get('/api/cajeros/'+venta.responseJSON.cashier+'/',function(){});
    console.log(abono.responseJSON);

    $('.numabono').html(' '+abono.responseJSON.id);
    $('.fechaabono').html('  '+abono.responseJSON.date +' '+abono.responseJSON.time);
    $('.clienteabono').html('  '+clientefactura.responseJSON.name+' '+clientefactura.responseJSON.last_name);


    $('.montoabono').html(abono.responseJSON.montocol.toFixed(2));
    $('.saldoanteior').html(abono.responseJSON.saldoant.toFixed(2));
    $('.saldoactual').html(abono.responseJSON.saldoactual.toFixed(2));


    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

}

function CargarNC(idNC){


    $("#tablafactura > tbody").html("");

    var nc=$.get('/api/notacredito/'+idNC+'/',function(){});
    var venta=$.get('/api/venta/'+nc.responseJSON.venta+'/',function(){});
    var clientefactura=$.get('/api/clientes/'+venta.responseJSON.client+'/',function(){});
    //var cajerofactura=$.get('/api/cajeros/'+venta.responseJSON.cashier+'/',function(){});
    //console.log(abono.responseJSON);

    $('.numNC').html(' '+nc.responseJSON.id);
    $('.fechNC').html('  '+nc.responseJSON.date +' '+nc.responseJSON.time);
    $('.clienteNC').html('  '+clientefactura.responseJSON.name+' '+clientefactura.responseJSON.last_name);


    $('.NumfactNC').html(nc.responseJSON.venta);
    $('.montoAplicadoNC').html(nc.responseJSON.monto.toFixed(2));
    $('.saldoAntFact').html(nc.responseJSON.saldoanteriorfact.toFixed(2));
    $('.saldoActFact').html(nc.responseJSON.saldoactualfact.toFixed(2));
    $('.saldoAntCuenta').html(nc.responseJSON.saldoanterior.toFixed(2));
    $('.saldoActCuenta').html(nc.responseJSON.saldoactual.toFixed(2));
    //$('.saldoActCuenta').html(nc.responseJSON.saldoactual.toFixed(2));


    $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

}

function TotalesAbono(){
    liquidar=false;
    var controlpagacon;
    var moneda=$( "#monedaabono").val();
    var a =$( "#montoabono").val();
    var aa= parseFloat(a).toFixed(2);
    //console.log(a);
    var aaa=isNaN(a);
    var vueltoint;
    controlpagacon = !aaa;

    if(controlpagacon){
        if(moneda==1){
            $('.totalabonocolones').html(aa);
            $('.totalabonodolares').html(0);
            totalabono=aa;
            restanteabono=aa;
            totalabonodolares=0;
        }
        if(moneda==2){
            $('.totalabonodolares').html(aa);
            $('.totalabonocolones').html((aa*tipocambiodolares).toFixed(2));
            totalabono=aa*tipocambiodolares;
            restanteabono=aa*tipocambiodolares;
            totalabonodolares=aa;
        }
        if(totalabono>=totalsaldo) {
            $('.totalabonocolones').html(totalsaldo.toFixed(2));
            totalabono = totalsaldo;
            $(".montomayorsaldo:hidden").show();
            $('#BtnRegistrarAbono').html('Liquidar Deuda');
            liquidar=true;
            if (moneda == 1) {
                $('.totalabonodolares').html(0);
                totalabonodolares = 0;
            }
            if (moneda == 2) {
                $('.totalabonodolares').html((totalsaldo / tipocambiodolares).toFixed(2));
                totalabonodolares = (totalsaldo / tipocambiodolares).toFixed(2);
            }
        }
        else{
            $(".montomayorsaldo").hide();
            $('#BtnRegistrarAbono').html('Registar Abono');
        }

        $('.precio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
        });
        $('.preciodolar').priceFormat({
        prefix: '$ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
        });
    }
    else{
        //console.log('ELSE');
        $('.totalabonodolares').html('-');
        $('.totalabonocolones').html('-');
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

//ABONOS

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
            agregarcanalatabla(matrixinterna[i][10],matrixinterna[i][9],matrixinterna[i][2],matrixinterna[i][3]);
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
            canaleslist.push([data[i].id,data[i].consecutive,data[i].weight,data[i].qualification,data[i].fierro,data[i].tipo]);
            var test= $.get('/api/proveedores/'+data[i].fierro+'/',function(){
                return 1;
            });

            $('#tablacanales > tbody:last').append('<tr><td>' + data[i].id + '</td><td>' + data[i].consecutive +
            '</td><td>' + data[i].qualification + '</td><td>' + data[i].weight +
            '</td><td>' + test.responseJSON.fierro + '</td><td><button  type="button" class=" btn btn-success form-control selectrowcanal " id="btnelegir"><span class="glyphicon glyphicon-plus"></span></button></td></tr>');
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

function agregarcanalatabla(id,tipo,precio,peso) {
    var canaliv=(precio*peso)*(13/100);
    var canalivr=Math.round((canaliv) * 1000) / 1000;
    var pricesubr=peso*precio;
    var pricetot=(precio*peso)*1.13;
    var price=Math.round((precio) * 1000) / 1000;
    var pricetotr=Math.round((pricetot) * 1000) / 1000;
    if(tipo==1){// canal de cerdo
        $('#tablaproductos > tbody:last').append('<tr><td>' + 4001 + '</td><td>' + 'Canal Cerdo id# '+id+'</td><td class="precio">' +price.toFixed(2) + '</td><td class=cant'+4001+'>' + peso + '</td>' +
        '<td>'+'G'+'</td><td class="precio total'+4001+'">' + pricesubr.toFixed(2) +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');

       matrixventa.push([4001, 'Canal Cerdo id# '+id,precio ,peso,pricesubr, canalivr,pricetotr,106,true,1,id]);//los dos ultimos son si es canal y tipo y el id

    }
    if(tipo==2){//canal de res
        $('#tablaproductos > tbody:last').append('<tr><td>' + 5001 + '</td><td>' + 'Canal Res id# '+id+'</td><td class="precio">' +price.toFixed(2) + '</td><td class=cant'+5001+'>' + peso + '</td>' +
        '<td>'+'G'+'</td><td class="precio total'+5001+'">' + pricesubr.toFixed(2) +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');

        matrixventa.push([5001, 'Canal Res id# '+id,precio ,peso,pricesubr,canalivr,pricetotr,107,true,2,id]);//los dos ultimos son si es canal y tipo y el id

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
    guardarventa();
    descontarinventarios();
    //generarfactura();
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
                //console.log(detallesventa);
            });
    });

}

function descontarinventarios(){
    $.each( matrixventa, function(i){
        var productodatos = $.get('/api/productos/'+matrixventa[i][7]+'/',function(){});
        console.log(productodatos.responseJSON.inventory);
        console.log(matrixventa[i][3]);
        nuevaext= productodatos.responseJSON.inventory-matrixventa[i][3];
        console.log(nuevaext);
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


