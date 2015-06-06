$(document).on('ready', main);

function main () {
        $.ajaxSetup({
		beforeSend: function(xhr, settings) {
			if(settings.type == "POST"){
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
                $.get('/getcanal/' + id, sumarPeso)
            }
           else{
                var id = $(this).data('id');
                $.get('/getcanal/' + id, restarPeso)
            }
       });//eventos checkbox

       $("#btnSubmit").on("click",guardarLote)

    }//main

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

    info=[];
    info[0]=15;
    info[1]=16;

    event.preventDefault();
	var numlote = $("#numlote").val();
    var fierronum = $("#fierronum").val();
    var cantcanales = $("#cantcanales").val();
   // var canalesprev=[16,17];
    var canaleslist = ["16","17"];
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
        "lotenum": "estasi30",
        "fierro": "A055",
        "canalesqty": 3,
        "canales": [15,16],
        "totalweight": 199.0

    }),
      contentType:"application/json; charset=utf-8",
      dataType:"json"
    })
      .done(function( data ) {
        console.log( data );
  });

}

function unmacho(data){

    console.log(data);

}