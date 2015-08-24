//variables globales
lotescliked=[];
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
		}
	});
        cargarCanales();

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

                $.get('/api/canales/' + id+'/', sumarPeso)
            }
           else{
                id = $(this).data('id');
                lotescliked.splice( $.inArray(id,lotescliked) ,1 );
                $.get('/api/canales/' + id+'/', restarPeso)
            }
       });//eventos checkbox

        $(".Cerdo").hide();
        $(".Res").hide();
        $(".Pollo").hide();
        $(".Cerdo:hidden").show();

        $( "#tipo" ).change(function() {

            $("#pesototal").val(0);
            $("#cantcanales").val(0);
            lotescliked=[];
            $("#msgNohayCanales:hidden").show();
            $('.Cerdo').attr('checked', false);
            $('.Res').attr('checked', false);

            if($("#tipo" ).val()==1){
                console.log(cantcerdos);
                if(cantcerdos>0){
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

       $("#btnSubmit").on("click",guardarLote);

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

function cargarCanales(){
    var canaleslist= $.get('/api/canales/?isonlote=False&vendido=False&mediovendido=False', function(){});
    console.log(canaleslist.responseJSON[0].tipo);
    var tipo;
    if(canaleslist.responseJSON.length==0){
        $("#msgNohayCanales:hidden").show();
    }
    else {
        //$("#msgNohayCanales").hide();
        $.each(canaleslist.responseJSON, function (i) {
            if (canaleslist.responseJSON[i].tipo == 1) {
                tipo = 'Cerdo';
                cantcerdos = cantcerdos + 1;
            }
            if (canaleslist.responseJSON[i].tipo == 2) {
                tipo = 'Res';
                cantreses = cantreses + 1;
            }
            if (canaleslist.responseJSON[i].tipo == 3) {
                tipo = 'Pollo';
                cantpollos = cantpollos + 1;
            }
            var fierro= $.get('/api/proveedores/'+canaleslist.responseJSON[i].fierro +'/', function(){});
            $("#canaleslist").append('<li class="' + tipo + '" >' +
            '<label class="' + tipo + '" style="color: #0081c2" for="' + canaleslist.responseJSON[i].id + '">' +
            canaleslist.responseJSON[i].id + ' ' + canaleslist.responseJSON[i].date +' ' +fierro.responseJSON.name +' ' +
            fierro.responseJSON.lastname +' ' +fierro.responseJSON.fierro +'</label>' +
            '<input  type="checkbox" class="checkboxdis ' + tipo + '" id="' + canaleslist.responseJSON[i].id + '" data-id="' + canaleslist.responseJSON[i].id + '"/>' +
            '</li>');
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
        "fierro": unique(fierros),
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
