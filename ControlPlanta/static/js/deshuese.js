//variables globales
var pesolote=0;
var pesodesh=0;
var mermakg=0;
var mermaporc=0;
var enteronpeso = false;
var matrixdetalle=[];
var detalle=[];
var vencimiento;
var tipo;
var pesoactual;
var pesonuevo;
var today;
var costo_lote = 0;

jQuery.ajaxSetup({async:false});

$(document).on('ready', main);
function main () {

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


        //remove row
        $('html').on('click','.removerow', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();
            var pesoquitar = matrixdetalle[rowIndex][1];
            pesodesh=Math.round((pesodesh-pesoquitar) * 1000) / 1000;
            $("#pesodesh").val(pesodesh);
            //calcular merma en KG
            mermakg=Math.round((pesolote-pesodesh) * 1000) / 1000;
            $("#mermakg").val(mermakg);
            //calcular merma en %
            mermaporc=Math.round(((mermakg*100)/pesolote) * 1000) / 1000;
            $("#mermaporc").val(mermaporc);

            var producto=$.get('/api/productos/'+matrixdetalle[rowIndex][0]+'/',function(){});

            console.log(matrixdetalle[rowIndex][0]);
            console.log(producto);

            $("#corte").append(new Option(producto.responseJSON.product_code+ ' - ' +producto.responseJSON.description, producto.responseJSON.id));


            matrixdetalle.splice( rowIndex,1 );
            console.log(matrixdetalle);
            $(this).parent().parent().remove();


        });

            //cambios en tipo

         $( "#tipo" ).change(function() {

            if($("#tipo" ).val()=="Carne de cerdo"){
                $("#lote" ).html('');
                $("#pesolote").val(0);
                $.get('/api/lotes/?tipo=1&isondeshuese=False', llenarlotes);
                var pesoloteini =$( "#lote").val();
                $.get('/api/lotes/?id='+pesoloteini,SetPesoLote);
            }
            if($("#tipo" ).val()=="Carne de res"){
                $("#lote" ).html('');
                $("#pesolote" ).val(0);
                $.get('/api/lotes/?tipo=2&isondeshuese=False', llenarlotes);
                var pesoloteini =$( "#lote").val();
                $.get('/api/lotes/?id='+pesoloteini,SetPesoLote);
            }
            if($("#tipo" ).val()=="Pollo"){
                $("#lote" ).html('');
                $("#pesolote" ).val(0);
                $.get('/api/lotes/?tipo=3&isondeshuese=False', llenarlotes);
                var pesoloteini =$( "#lote").val();
                $.get('/api/lotes/?id='+pesoloteini,SetPesoLote);
            }
        });//cambios en tipo

        //evento enter buscar
        $('#codigo').on('keypress', function (event) {
             if(event.which === 13){
               var a = $('#codigo').val();
               $.get('/api/productos/?product_code='+a,ResultadoBusqueda);
             }
       });

        //evento enter peso
        $('#peso').on('keypress', function (event) {
             if(event.which === 13 && enteronpeso){
               AgregarATabla();
             }
       });

        //cambio en el corte pone codigo
        $( "#corte" ).change(function() {
            var a =$( "#corte").val();
            $.get('/api/productos/?id='+a,SetCodigo);
        });

        //cambio en el corte pone codigo
        $( "#lote" ).change(function() {
            var a =$( "#lote").val();
            $.get('/api/lotes/?id='+a,SetPesoLote);
        });


        $("#peso").bind("change paste keyup", function() {
            var a =$( "#peso").val();
            var aa=parseFloat(a);
            var aaa=isNaN(aa);
                 if (!aaa){
                    $("#BtnAdd").prop("disabled",false);
                     enteronpeso=true;
                 }
                 else{
                     $("#BtnAdd").prop("disabled",true);
                     enteronpeso=false;
                 }
        });

        //botones


        $("#BtnAdd").on("click",AgregarATabla);
        $("#Btnlote").on("click",LoteListo);
        $("#Btnquitlote").on("click",Lotequit);
        $("#BtnConfirmar").on("click",ConfirmarDatos);
        $("#BtnNoConfirmar").on("click",NoConfirmarDatos);
        $("#BtnCrear").on("click",guardarDetalle);

        $("#BtnPrint").on("click",Imprimir);

        $("#Btn_cargar_desh").on("click",function () {

            cargar_comprobante($("#cargar_deshuese").val())

        });

        $('#BtnNuevo').on("click",function(){
            location.reload();
        });



        //llenado de espacios e inicializacion
        $(".hideonload").hide();
        $("#Btnquitlote").hide();
        $("#BtnNoConfirmar").hide();
       // $("#tipo").prop("disabled",true);
        $("#codigo").prop("disabled",true);
        $("#corte").prop("disabled",true);
        $("#peso").prop("disabled",true);
        $("#pesolote").prop("disabled",true);
        $("#pesodesh").prop("disabled",true);
        $("#mermakg").prop("disabled",true);
        $("#mermaporc").prop("disabled",true);
        $("#BtnCrear").prop("disabled",true);
        $("#BtnConfirmar").prop("disabled",true);
        $("#BtnAdd").prop("disabled",true);

    // cargar_comprobante(23);


    //eventos iniciales:

         $("#corte").select2({
            theme: "bootstrap",
            placeholder:"Seleccione...",
            width: '100%',
            allowClear: true,
            language: "es"
        });


        $.get('/api/lotes/?tipo=1&isondeshuese=False', llenarlotes);
        var pesoloteini =$( "#lote").val();
        $.get('/api/lotes/?id='+pesoloteini,SetPesoLote);

    //valor vencimiento

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month2 = ("0" + (now.getMonth() + 1)).slice(-2);
        var year2=now.getFullYear();
        var month = ("0" + (now.getMonth() + 2)).slice(-2);
        var year=now.getFullYear();
        if (month>12){
            month=month-12;
            year=year+1;
        }
        vencimiento = (year)+"-"+(month)+"-"+(day) ;
        today = (year2)+"-"+(month2)+"-"+(day) ;
        //console.log(vencimiento);
        $("#lote_date").val(today).prop("disabled",true);


    }//main


function LoteListo(){

    if ($("#lote").val()!=="vacio"){


        event.preventDefault();

        $("#cargar_deshuese").prop("disabled",true);
        $("#Btn_cargar_desh").prop("disabled",true);

        $("#lote").prop("disabled",true);
        $("#codigo").prop("disabled",false);
        $("#corte").prop("disabled",false);
        $("#peso").prop("disabled",false);
        $("#tipo").prop("disabled",true);
        $("#Btnlote").hide();
        $("#Btnquitlote:hidden").show();

            //console.log($("#tipo").val());

        if ($("#tipo").val()==="Carne de cerdo"){
            tipo=1;
            $('#codigo').val(1001);
            $.get('/api/productos/?category=1', llenarproductos);
        }
        if ($("#tipo").val()==="Carne de res"){
            tipo=2;
            $('#codigo').val(2001);
            $.get('/api/productos/?category=2', llenarproductos);
        }
    }
    else{

        alert("No hay un lote seleccionado");
    }
}
 function Lotequit(){
    event.preventDefault();

    $("#cargar_deshuese").prop("disabled",false);
    $("#Btn_cargar_desh").prop("disabled",false);

    $("#lote").prop("disabled",false);
    $("#codigo").prop("disabled",true);
    $("#corte").prop("disabled",true);
    $("#peso").prop("disabled",true);
    $("#tipo").prop("disabled",false);
    $("#Btnquitlote").hide();
    $("#Btnlote:hidden").show();
    $('#codigo').val('');
    $('#corte').html('');
    $("#pesodesh").val("");
    $("#peso").val("");
    $("#mermakg").val("");
    $("#mermaporc").val("");
    $("#tabla > tbody").html("");
    $("#BtnAdd").prop("disabled",true);
    $("#BtnConfirmar").prop("disabled",true);
    matrixdetalle=[];
    pesodesh=0;
    mermakg=0;
    mermaporc=0;
 }

function llenarlotes(data){
    //console.log(data.length);
    $("#lote").html('');

    if(data.length!=0){
    $.each( data, function(index){
        $("#lote").append(new Option(data[index].lotenum, data[index].id));
    });
    }
    else{
       $("#lote").append(new Option("No hay elementos", "vacio"));
    }
}


function llenarproductos(data){

    $('#corte').html('');
    $("#corte").append(new Option('', ''));
    $.each( data, function(index){
        $("#corte").append(new Option(data[index].product_code + ' - ' + data[index].description, data[index].id));

    });

}

function ResultadoBusqueda(data){

    if (typeof data[0]!=='undefined' ){

        if($("#corte option[value='" + data[0].id + "']").val() != undefined) {

        $("#corte").val(data[0].id);
        }
        else{

            alert('El Corte deseado no es válido, o ya se encuentra en la tabla');
        }
    }
    else{
        alert('El Elemento no existe');
    }
}
function SetCodigo(data){

   // console.log(data);
    $("#codigo").val(data[0].product_code);
}

function SetPesoLote(data){
   // console.log(data);

    if (typeof data[0]!=='undefined' ){

        if (typeof data[0]!=='undefined' ){
        pesolote=data[0].totalweight;
        $("#pesolote").val(data[0].totalweight);
        }
    }
}//function

function AgregarATabla(){

    event.preventDefault();
    var peso = parseFloat($("#peso").val());
    var codigo=$('#corte').val();

    var pesoTrue=isNaN(peso);

        if (!pesoTrue && peso !==0){
            var r=$('#tabla tr').length; /* Obtener el numero de elementos */
            $('#tabla > tbody:last').append('<tr><th scope="row"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></th><td>'+$('#corte option:selected').text()+'</td><td>'+$('#peso').val()+
            ' Kg <button type="button" class=" removerow btn btn-danger pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
            //var Corteval =$('#corte').val();
            matrixdetalle.push([codigo,peso,0,0,0]);
            console.log(matrixdetalle);

            pesodesh=Math.round((pesodesh+peso) * 1000) / 1000;
            $("#pesodesh").val(pesodesh);
            //calcular merma en KG
            mermakg=Math.round((pesolote-pesodesh) * 1000) / 1000;
            $("#mermakg").val(mermakg);
            //calcular merma en %
            mermaporc=Math.round(((mermakg*100)/pesolote) * 1000) / 1000;
            $("#mermaporc").val(mermaporc);
            $("#corte option:selected").remove();
            $("#codigo").val("");
            $("#corte").val("");
            $("#peso").val("");
            $("#BtnConfirmar").prop("disabled",false);
            $("#BtnAdd").prop("disabled",true);
    }
    else{

        alert('Ingrese un peso válido y mayor que 0');
    }

}

function ConfirmarDatos(){

    $("#codigo").prop("disabled",true);
    $("#corte").prop("disabled",true);
    $("#peso").prop("disabled",true);
    $("#Btnquitlote").prop("disabled",true);
    $(".removerow").prop("disabled",true);
    $("#BtnCrear").prop("disabled",false);
    $("#BtnConfirmar").hide();
    $("#BtnNoConfirmar:hidden").show();
    
}

function NoConfirmarDatos(){

    $("#codigo").prop("disabled",false);
    $("#corte").prop("disabled",false);
    $("#peso").prop("disabled",false);
    $("#Btnquitlote").prop("disabled",false);
    $(".removerow").prop("disabled",false);
    $("#BtnCrear").prop("disabled",true);
    $("#BtnNoConfirmar").hide();
    $("#BtnConfirmar:hidden").show();


}

function guardarDetalle() {

    event.preventDefault();
    var lote =$("#lote").val();
    // var control=matrixdetalle.length;
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
            //console.log(data.responseText);
            alertify.alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            })
            .success(function(data){
                detalle.push(data.id);
            });

    });

    guardarDeshuese();


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
    //console.log(detalle);
    var lote =parseInt($("#lote").val());
    //var mermaporc2=parseFloat(mermaporc);

    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/deshuese/",
      async: false,

      data: JSON.stringify({

        "tipo": $("#tipo" ).val(),
        "lote": lote,
        "peso_lote": pesolote,
        "date": $('#lote_date').val(),
        "ref_text": $('#lote_txt').val(),
        "pesototal": pesodesh,
        "mermakg": mermakg,
        "mermapor": mermaporc,
        "detalle": detalle
        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
    .fail(function(data){
            //console.log(data.responseText);
            alertify.alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        })
    .success(function(data){
            //console.log(data);
            patchlote();
            cargar_comprobante(data.id);
            Imprimir();
            
        });

}//Guardar Deshuese

function Imprimir(){

    event.preventDefault();
    $( "#factura").printArea();
}

function cargar_comprobante(id){


    if(id!=''){

     $.get('/api/deshuese/?id='+id, function(data){

         console.log(data);

         if(data.length>0){

            $('.deshuesenumfact').text(data[0].id);
             $('.tipodeshuesefact').text(data[0].tipo);
             $('.fechadeshuesefact').text(data[0].date);

             $('.pesolotefact').text(data[0].ref_text);
             $('.pesodeshpact').text(data[0].peso_lote);
             $('.mermakgfact').text(data[0].mermakg+' Kg');
             $('.mermaporfact').text(data[0].mermapor+'%');

             $('.notasdeshfact').text(data[0].ref_text);

             $.get('/api/lotes/'+data[0].lote+'/', function(data){
                $('.lotedeshuesefact').text(data.lotenum);
             });

             $.each( data[0].detalle, function(i){

                $.get('/api/detalledeshuese/'+data[0].detalle[i]+'/', function(data){

                    var producto = $.get('/api/productos/'+data.producto+'/',function(){});

                    $('#tablafactura > tbody:last').append('<tr>' +
                    '<td>' + producto.responseJSON.product_code + '</td>'+
                    '<td>' + producto.responseJSON.description + '</td>'+
                    '<td>' + data.peso + '</td>'+
                    '</tr>');
                });

             });

            $('.factura').show();
            $('.sidebardesh').hide();

         }//IF exists
         else{
             alertify.alert('Error', 'No existe el deshuese consultado.')
         }

     });


     }
     else{
        alertify.alert('Error', 'El campo de deshuese no puede estar vacío!')
    }

}

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
        Calcular_costos();

        })
        .fail(function() {
        //$("#BtnCrear").prop("disabled",true);
        alertify.alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        $(".failmessage:hidden").show("slow");
        });


}

function Calcular_costos() {

    Calc_costo_lote();
    var venta_potencial = 0;
    var venta_pot_tot = 0;
    var porc_dist = 0;
    var cost_pot = 0;
    var cost_final = 0;

    $.each( matrixdetalle, function(i){


        var producto = $.get('/api/productos/'+matrixdetalle[i][0]+'/',function(){});

        venta_potencial = matrixdetalle[i][1]*producto.responseJSON.price1;

        matrixdetalle[i][2] = venta_potencial;

        venta_pot_tot = venta_pot_tot+venta_potencial;


    });

     console.log('venta pot tot = '+venta_pot_tot);

    $.each( matrixdetalle, function(i){

        porc_dist = (matrixdetalle[i][2]/venta_pot_tot);
        cost_pot = porc_dist*costo_lote;
        cost_final = cost_pot/matrixdetalle[i][1];
        matrixdetalle[i][3]=cost_final;

        console.log('venta pot = '+matrixdetalle[i][2]);
        console.log('porc dist = '+porc_dist);
        console.log('costo pot = '+cost_pot);
        console.log('costo final = '+matrixdetalle[i][3]);

    });

    Guardarinventario();
}

function Calc_costo_lote(){

    costo_lote = 0;

    var lotenum =parseInt($("#lote").val());

    $.get('/api/lotes/'+lotenum+'/',function(data){

        $.each( data.canales, function(i){

            var canal = $.get('/api/canales/'+data.canales[i]+'/',function(){});

            costo_lote = costo_lote+(canal.responseJSON.preciokilo*canal.responseJSON.weight)

        });
    });


}

function Guardarinventario(){

    var lote =parseInt($("#lote").val());
    //each
    $.each( matrixdetalle, function(i){

        var productoguardar=$.get('/api/productos/'+matrixdetalle[i][0]+'/',function(){});

        pesoactual=productoguardar.responseJSON.inventory;
        var pesoactualplanta=productoguardar.responseJSON.inventoryplanta;
        pesonuevo=pesoactual+matrixdetalle[i][1];
        var pesonuevoplanta=pesoactualplanta+matrixdetalle[i][1];

        $.ajax({//patch producto
          method: "PATCH",
          url: "/api/productos/"+matrixdetalle[i][0]+'/',
          async: false,

          data: JSON.stringify({
            "inventory": pesonuevo,
            "inventoryplanta": pesonuevoplanta,
            "cost" : matrixdetalle[i][3],
            "last_cost_change" : today
            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alertify.alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            })
            .success(function(){
               $.ajax({//crear entrada por produccion
                  method: "POST",
                  url: "/api/inventarioentrada/",
                  async: false,

                  data: JSON.stringify({
                    "tipo": 1,
                    "datos": "Entrada por producción del lote "+lote,
                    "producto": matrixdetalle[i][0],
                    "pesoanterior": pesoactualplanta,
                    "peso": matrixdetalle[i][1],
                    "nuevopeso": pesonuevoplanta,
                    "date": today,
                    "time": tiempoahora(),
                    "usuario": 1
                    }),//JSON object
                      contentType:"application/json; charset=utf-8",
                      dataType:"json"
                })
                .fail(function(data){
                console.log(data.responseText);
                alertify.alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
                })
                .success(function(){
                    $("#BtnCrear").prop("disabled",true);
                    $("#BtnNoConfirmar").prop("disabled",true);
                    $(".succesmessage:hidden").show("slow");
                });
            });

    });
    //patch producto
    //crear entrada por produccion
    //patch resumen inv

}

function tiempoahora(){
    var dt = new Date();
    return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
}