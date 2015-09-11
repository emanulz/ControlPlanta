//variables globales
lotescliked=[];
canalescliked=[];
fierros=[];
var n;
var today = "";
var today2 = "";
var cantcerdos=0;
var cantreses=0;
var cantpollos=0;
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
            if(settings.type == "DELETE"){
				xhr.setRequestHeader("X-CSRFToken", $('[name="csrfmiddlewaretoken"]').val());
			}
		}
	});
        $("#tablaListaCanales").hide();
        $("#date").prop("disabled",true);
        cargarLotes(1);
        //cargarCanales();


      //eventos checkbox
       $( "input[type=checkbox]" ).on( "click", function(){
           console.log('test');
           var id=0;
         n = parseInt($( "input:checked" ).length);
         $("#cantcanales").val(n);

          var thisCheck = $(this);
            if (thisCheck.is (':checked')) {
                id = $(this).data('id');
                lotescliked.push(id);
                console.log(lotescliked);
                $.get('/api/canales/' + id+'/', sumarPeso);
                $("#btnSubmit").prop('disabled',false);
            }
           else{
                id = $(this).data('id');
                lotescliked.splice( $.inArray(id,lotescliked) ,1 );
                console.log(lotescliked);
                $.get('/api/canales/' + id+'/', restarPeso);
            }
       });//eventos checkbox

        $(".Cerdo").hide();
        $(".Res").hide();
        $(".Pollo").hide();
        $(".Cerdo:hidden").show();

        $( "#numlote" ).change(function() {
            console.log('NUM');
            cargarCanales($( "#numlote" ).val());
        });

        $( "#tipo" ).change(function() {

            $("#pesototal").val(0);
            $("#cantcanales").val(0);
            lotescliked=[];
            $("#btnSubmit").prop('disabled',true);
            $("#tablaListaCanales").hide();
            $("#msgNohayCanales:hidden").show();
            $('.Cerdo').attr('checked', false);
            $('.Res').attr('checked', false);

            if($("#tipo" ).val()==1){
                console.log(cantcerdos);
                if(cantcerdos>0){
                    $("#tablaListaCanales:hidden").show();
                    $("#msgNohayCanales").hide();
                }

                $(".Res:hidden").hide();
                $(".Pollo:hidden").hide();
                $(".Res").hide();
                $(".Pollo").hide();
                $(".Cerdo:hidden").show();
            }
            if($("#tipo" ).val()==2){
                if(cantreses>0){
                    $("#tablaListaCanales:hidden").show();
                    $("#msgNohayCanales").hide();
                }
                $(".Res:hidden").show();
                $(".Cerdo:hidden").hide();
                $(".Pollo:hidden").hide();
                $(".Cerdo").hide();
                $(".Pollo").hide();

            }
            if($("#tipo" ).val()==3){
                if(cantpollos>0){
                    $("#tablaListaCanales:hidden").show();
                    $("#msgNohayCanales").hide();
                }
                $(".Cerdo:hidden").hide();
                $(".Res:hidden").hide();
                $(".Cerdo").hide();
                $(".Res").hide();
                $(".Pollo:hidden").show();
            }
        });//cambios en tipo

        //botones

        $("#btnSubmit").on("click",function(){
            event.preventDefault();
            $(".editar:hidden").show();
            $(".submit2:hidden").show();
            $(".confirmar").hide();
            $(".checkboxdis").prop("disabled",true);
            $("#tipo").prop("disabled",true);
        });

        $("#btnEditar").on("click",function(){
            event.preventDefault();
            $(".editar").hide();
            $(".submit2").hide();
            $(".confirmar:hidden").show();
            $(".checkboxdis").prop("disabled",false);
            $("#tipo").prop("disabled",false);
        });

        $("#btnRecargar").on("click",function(){
            event.preventDefault();
            location.reload();
        });

        $("#btnSubmit2").on("click",guardarLote);

        //llenado de espacios e inicializacion
        $(".hideonload").hide();
        $("#cantcanales").prop("disabled",true);
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

        if(cantcerdos>0){
            $("#msgNohayCanales").hide();
        }


    }//main

function cargarCanales(lotenum){
    
    $('#tablaCanales > tbody').html('');
    var lote=$.get('/api/lotes/'+lotenum+'/', function(){});
    //console.log(lote);
    var canaleslist= lote.responseJSON.canales;
    canalescliked=canaleslist;
        //$("#msgNohayCanales").hide();
    $("#tablaListaCanales:hidden").show();

    $.each(canaleslist, function (i) {
        var canal=$.get('/api/canales/'+canaleslist[i]+'/', function(){});

        var fierro= $.get('/api/proveedores/'+canal.responseJSON.fierro +'/', function(){});


        $('#tablaCanales > tbody:last').append('<tr class="'+tipo+'"><td>' + canal.responseJSON.id + '</td><td>' + canal.responseJSON.date+
        '</td><td>'+ canal.responseJSON.consecutive +'</td><td>'+ fierro.responseJSON.name +' ' + fierro.responseJSON.lastname +' ' +fierro.responseJSON.fierro +'</td>' +
        '<td>'+ canal.responseJSON.weight +'</td></tr>');

    });

    $(".cantcanales:hidden").show();
    $(".pesototal:hidden").show();
    $(".confirmar:hidden").show();

    $("#cantcanales").val(lote.responseJSON.canalesqty);
    $("#pesototal").val(lote.responseJSON.totalweight);




}

function cargarLotes(tipo){
    var loteslist= $.get('/api/lotes/?isondeshuese=False&tipo='+tipo, function(){});

    if(loteslist.responseJSON.length==0){
        $("#msgNohayCanales:hidden").show();
        $("#tablaListaCanales").hide();
    }
    else {
        $.each(loteslist.responseJSON, function (i) {
            $('#numlote').append('<option value="'+loteslist.responseJSON[i].id+'">'+loteslist.responseJSON[i].lotenum+'</option>');
        });
    }
}

function llenarnumlote(data){
    var a=data.total+1;
    var a2=today2+"-"+a;
    $('#numlote').val(a2);
}

function sumarPeso (data){

    fierros.push(data.fierro);

    var pesocanal=parseFloat(data.weight);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual+pesocanal;
    var pesototal2=Math.round(pesototal* 1000) / 1000;
    $("#pesototal").val(pesototal2);

}//sumarPeso

function restarPeso (data){

    fierros.splice( $.inArray(data.fierro,fierros) ,1 );

    var pesocanal=parseFloat(data.weight);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual-pesocanal;
    var pesototal2=Math.round(pesototal* 1000) / 1000;
    $("#pesototal").val(pesototal2);

    if(pesototal2==0){
        $("#btnSubmit").prop('disabled',true);
    }

}//restarPeso

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function guardarLote() {
    event.preventDefault();
    errorclean();
    var fail=0;

    $.each(lotescliked, function (i) {
        $.ajax({
              method: "DELETE",
              url: "/api/canales/"+lotescliked[i]+"/"

        })
        .fail(function(data){
            //console.log(data.responseText);
            fail=1;
            alertify.alert('ERROR',"Hubo un problema al eliminar el canal, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
        })
        .success(function(data){
           //patchcanal();
        });

    });

    if(fail==0){
        alertify.alert("COMPLETADO!","Se han eliminado los canales correctamente");
        //event.preventDefault();
        $(".editar").hide();
        $(".submit2").hide();
        $(".recargar:hidden").show();
    }



      //.done(function(data){
      //   errorhandle(data)
      //  });
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
