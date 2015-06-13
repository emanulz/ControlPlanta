//variables globales
lotescliked=[];
var today = "";
var today2 = "";
var pesodesh=0;
var pesolote;
var mermakg;
var mermaporc;

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

      //eventos checkbox
       $( "input[type=checkbox]" ).on( "click", function(){

         var n = parseInt($( "input:checked" ).length);
         $("#cantcanales").val(n);

          var thisCheck = $(this);
            if (thisCheck.is (':checked')) {
                var id = $(this).data('id');
                lotescliked.push(id);

                $.get('/getcanal/' + id, sumarPeso)
            }
           else{
                var id = $(this).data('id');
                lotescliked.splice( $.inArray(id,lotescliked) ,1 );
                $.get('/getcanal/' + id, restarPeso)
            }
       });//eventos checkbox

    //evento enter buscar
    $('#codigo').on('keypress', function (event) {
         if(event.which === 13){
           var a = $('#codigo').val();
           $.get('/api/productos/?product_code='+a,ResultadoBusqueda);
         }
   });

    //evento enter peso
    $('#peso').on('keypress', function (event) {
         if(event.which === 13){
           AgregarATabla();
         }
   });

    //cambio en el corte pone codigo
    $( "#corte" ).change(function() {
        var a =$( "#corte").val();
        $.get('/api/productos/?description='+a,SetCodigo);
    });

    //cambio en el corte pone codigo
    $( "#lote" ).change(function() {
        var a =$( "#lote").val();
        $.get('/api/lotes/?lotenum='+a,SetPesoLote);
    });

        //botones

        $("#btnSubmit").on("click",guardarLote);
        $("#BtnAdd").on("click",AgregarATabla);

        //llenado de espacios e inicializacion
        $(".hideonload").hide();
        $("#pesolote").prop("disabled",true);
        $("#pesodesh").prop("disabled",true);
        $("#mermakg").prop("disabled",true);
        $("#mermaporc").prop("disabled",true);
        $("#BtnCrear").prop("disabled",true);

   // BtnCrear

        //date
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        today2=(day) +"/"+(month)+"/"+now.getFullYear();
        $('#date').val(today);

    //eventos iniciales:
        //consigue la cantidad de lotes del dia y llama llenar numlote
        $.get('/api/productos/?category=1', llenarproductos);
        var pesoloteini =$( "#lote").val();
        $.get('/api/lotes/?lotenum='+pesoloteini,SetPesoLote);
        $('#codigo').val(1001);


    }//main

function llenarproductos(data){

    $.each( data, function(index){
        $("#corte").append(new Option(data[index].description, data[index].description));

    });

}
function ResultadoBusqueda(data){

    $("#corte").val(data[0].description);

}
function SetCodigo(data){
    console.log(data);
    $("#codigo").val(data[0].product_code);
}

function SetPesoLote(data){
    pesolote=data[0].totalweight;
    $("#pesolote").val(data[0].totalweight);
}

function AgregarATabla(){

    event.preventDefault();
    var r=$('#tabla tr').length; /* Obtener el numero de elementos */
    $('#tabla > tbody:last').append('<tr><th scope="row">'+r+'</th><td>'+$('#corte').val()+'</td><td>'+$('#peso').val()+'</td></tr>');
    var peso = parseFloat($("#peso").val());
    pesodesh=pesodesh+peso;
    $("#pesodesh").val(pesodesh);
    //calcular merma en KG
    mermakg=Math.round((pesolote-pesodesh) * 100) / 100;
    $("#mermakg").val(mermakg);
    //calcular merma en %
    mermaporc=Math.round(((mermakg*100)/pesolote) * 100) / 100;
    $("#mermaporc").val(mermaporc);

}

function sumarPeso (data){
    var pesocanal=parseFloat(data.peso);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual+pesocanal;

    $("#pesototal").val(pesototal);
    }//sumarPeso

function restarPeso (data){
    var pesocanal=parseFloat(data.peso);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual-pesocanal;

    $("#pesototal").val(pesototal);
    }//restarPeso

function guardarLote() {
    event.preventDefault();
    errorclean();
    var numlote = $("#numlote").val();
    var fierronum = $("#fierronum").val();
    var cantcanales = $("#cantcanales").val();
    var canaleslist = lotescliked;
    var pesototal = $("#pesototal").val();

    $.ajax({
      method: "POST",
      url: "/lotes/",

      data: JSON.stringify({

        "date":today,
        "lotenum": numlote,
        "fierro": fierronum,
        "canalesqty": cantcanales,
        "canales": canaleslist,
        "totalweight": pesototal

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
