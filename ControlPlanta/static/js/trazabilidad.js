//variables globales
jQuery.ajaxSetup({async:false});
var fierros=[];
var canales=[];
var detalles=[];
var today = "";
var today2 = "";
var descproducto;
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

        $('#lotenum').on('keypress', function (event) {
            //
             if(event.which === 13){
                event.preventDefault();
                getLote();
             }
       });

        //botones

        $("#BtnConsultar").on("click",getLote);
        $("#BtnLimpiar").on("click",limpiarLote);


        //llenado de espacios e inicializacion
        $(".hideonload").hide();
        $(".hideform").hide();
        $("#BtnLimpiar").hide();
        $(".disini").prop("disabled",true);
        $("#pesototal").prop("disabled",true);
        //date
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        today2=(day) +"/"+(month)+"/"+now.getFullYear();
        $('#date').val(today);

        //consigue la cantidad de lotes del dia y llama llenar numlote
        $.get('/totallotes/', llenarnumlote);
    }//main

function getLote(){

    var a=$("#lotenum").val();
    //console.log(a);
    if (a !== ''){
    $.get('/api/lotes/?lotenum='+a, cargarLote);
    }
    else{
        $(".failmessage2:hidden").show('slow');
        $("#lotenum").addClass("errorlist2");
    }

}

function cargarLote(data){

    if(data.length!==0){
        $("#lotenum").removeClass("errorlist2");
        $(".failmessage2").hide('slow');
        $("#lotenum").prop("disabled",true);
        fierros=data[0].fierro;
        console.log(fierros);
        $("#peso").val(data[0].totalweight);
        $("#fecha").val(data[0].date);
        $("#canalesnum").val(data[0].canalesqty);
        $("#BtnConsultar").hide();
        $("#BtnLimpiar:hidden").show();
        $(".hideform:hidden").show('slow');
        $(".nodeshuese").hide();
        $(".detalles:hidden").show();
        $(".detalles").show();
        canales=data[0].canales;
        var b = $("#fierro").val();

        var c = data[0].tipo;
        var d = data[0].id;
//console.log('canales= '+canales);
//console.log('fierro= '+b);
        $.each( fierros, function( posi, val ) {
            console.log(val);
            $.get('/api/proveedores/'+val+'/' ,function(datos){
                console.log(datos);
                var aux=$("#fierro").val();
                var aux2=$("#nombre").val();

                $("#fierro").val(aux+datos.fierro+',');
                $("#nombre").val(aux2+datos.name+' '+datos.lastname+',');
            });
        });

//console.log(datos);


        if (c ==1){
          $("#tipo").val('Carne de Cerdo');
        }
        if (c ==2){
            $("#tipo").val('Carne de Res');
        }
        if (c ==3){
            $("#tipo").val('Pollo');
        }

    $.get('/api/deshuese/?lote='+d ,function(datos2){
        //console.log('datos detalle ='+datos2);
        if(datos2.length!==0){
            detalles=datos2[0].detalle;
            $("#pesodesh").val(datos2[0].pesototal);
            $("#merma").val(datos2[0].mermapor);
        }

    });
    LlenarCanales();

    }//if data.lenght

    else{
        $(".failmessage2:hidden").show('slow');
        $("#lotenum").addClass("errorlist2");
    }

}

function limpiarLote(){
    $("#lotenum").prop("disabled",false);
    $("#BtnLimpiar").hide();
    $("#BtnConsultar:hidden").show();
    canales=[];
    detalles=[];
    $("#tablacanales > tbody").html("");
    $("#tabladeshuese > tbody").html("");
    $(".hideform").hide();
}

function LlenarCanales(){
//console.log('canales= '+canales);
    $.each( canales, function(i){

        $.get('/api/canales/?id='+canales[i],function(datos) {
            //console.log(datos);
            //var r = $('#tablacanales tr').length;
            /* Obtener el numero de elementos */
            $('#tablacanales > tbody:last').append('<tr><th scope="row"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></th><td>' + datos[0].id + '</td><td>' + datos[0].consecutive +
            '</td><td>' + datos[0].weight + ' Kg</td><td>' + datos[0].qualification + '</td></tr>');
        });

    });
    //console.log(detalles);
    if(detalles.length!==0){
    LlenarDetalles();
    }
    else{
    $(".nodeshuese").show();
    $(".detalles").hide();
    }
}

function LlenarDetalles() {
//console.log('canales= '+canales);
    $.each(detalles, function (i) {

        $.get('/api/detalledeshuese/?id=' + detalles[i], function (datos) {
            //console.log(datos);
            var a = datos[0].producto;
            //console.log(a);
            $.get('/api/productos/?id=' + a, function (producto) {
            descproducto = producto[0].description;

            });
            //console.log(descproducto);
            //var r = $('#tablacanales tr').length;
            /* Obtener el numero de elementos */
            $('#tabladeshuese > tbody:last').append('<tr><th scope="row"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></th><td>' + descproducto + '</td><td>' + datos[0].peso +
            ' Kg</td></tr>');
        });

    });
    //console.log(detalles);
}


function llenarnumlote(data){
    var a=data.total+1;
    var a2=today2+"-"+a;
    $('#numlote').val(a2);
}

function sumarPeso (data){
    var pesocanal=parseFloat(data.peso);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual+pesocanal;
    var pesototal2=Math.round(pesototal* 1000) / 1000;
    $("#pesototal").val(pesototal2);
    }//sumarPeso

function restarPeso (data){
    var pesocanal=parseFloat(data.peso);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual-pesocanal;
    var pesototal2=Math.round(pesototal* 1000) / 1000;
    $("#pesototal").val(pesototal2);
    }//restarPeso

function guardarLote() {
    event.preventDefault();
    errorclean();
    var numlote = $("#numlote").val();
    var fierronum = $("#fierronum").val();
    var cantcanales = $("#cantcanales").val();
    var canaleslist = lotescliked;
    var pesototal = $("#pesototal").val();
    var tipo=parseInt($("#tipo").val());


    $.ajax({
      method: "POST",
      url: "/lotes/",

      data: JSON.stringify({

        "date":today,
        "lotenum": numlote,
        "fierro": fierronum,
        "canalesqty": cantcanales,
        "canales": canaleslist,
        "totalweight": pesototal,
        "tipo": tipo

        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
      .done(function(data){
         errorhandle(data)
        });
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

function patchcanal(){
event.preventDefault();

    for (index = 0; index < lotescliked.length; ++index) {
    console.log(lotescliked[index]);

        $.ajax({
      method: "PATCH",
      url: "/api/canales/"+lotescliked[index]+"/",

      data: JSON.stringify({

        "isonlote": true

        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"

        })

      .done(function() {
        $("#date").prop("disabled",true);
        $("#numlote").prop("disabled",true);
        $("#fierronum").prop("disabled",true);
        $(".checkboxdis").prop("disabled",true);
        $(".btn").prop("disabled",true);
        $(".succesmessage:hidden").show("slow");
        });
    }

}
