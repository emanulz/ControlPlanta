//variables globales
lotescliked=[];
var today = "";
var today2 = "";

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

        //botones

       $("#btnSubmit").on("click",guardarLote);


        //llenado de espacios
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        today2=(day) +"/"+(month)+"/"+now.getFullYear();

        $('#date').val(today);

        $.get('/totallotes/', llenarnumlote);


       // document.getElementById("date").valueAsDate = new Date()


    }//main

function llenarnumlote(data){

    var a=data.total+1;
    var a2=today2+"-"+a;
    $('#numlote').val(a2);


}

function sumarPeso (data){
    var pesocanal=parseFloat(data.peso);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual+pesocanal;

    $("#pesototal").val(pesototal);
    }//cargarPeso

function restarPeso (data){
    var pesocanal=parseFloat(data.peso);
    var pesoactual=parseFloat($("#pesototal").val());
    var pesototal=pesoactual-pesocanal;

    $("#pesototal").val(pesototal);
    }//cargarPeso

function guardarLote() {
    event.preventDefault();
    var numlote = $("#numlote").val();
    var fierronum = $("#fierronum").val();
    var cantcanales = $("#cantcanales").val();
    var canaleslist = lotescliked;
    var pesototal = $("#pesototal").val();

    //var canal={numlote:numlote,fierronum:fierronum ,cantcanales:cantcanales,canaleslist:canaleslist,pesototal:pesototal};
	//console.log(canal);
	//if(input.val() != ''){
   // {"lotenum": "1245","fierro": "A055","canalesqty": 2,"canales": [3,4,5],"totalweight": 135.0}
	//$.post('/lotes/', {"lotenum":numlote,"fierro":fierronum ,"canalesqty":cantcanales,"canales":[3,4,5],"totalweight":pesototal}, unmacho);
	//}

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

      .done(patchcanal);


}
function patchcanal(){
event.preventDefault();

    for (index = 0; index < lotescliked.length; ++index) {
    console.log(lotescliked[index]);

        $.ajax({
      method: "PATCH",
      url: "/api/canales/"+lotescliked[index]+"/",

      data: JSON.stringify({

        "isonlote": false

        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"

        })

      .done(function( data ) {
        console.log( data.isonlote );
        console.log( today );
        console.log( today2 );
        });
    }


}
