
jQuery.ajaxSetup({async:false});

$(document).on('ready', main);
function main () {
//console.log($.now());


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

        $('#toZero').on('click', function(event){
            event.preventDefault();

            alertify.prompt( 'Contraseña', 'Ingrese la contraseña de desbloqueo', ''
               , function(evt, value) {
                    toZero(value);

                }
               , function() { }).set('type', 'password');


        });
 }//main


function toZero(value) {
    if (value == "emma101421") {
        $.ajax({
            method: "POST",
            url: "/inventariosacero/",
            async: false,

            data: JSON.stringify({
                "tipopago": 1
            }),//JSON object
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .fail(function (data) {
                console.log(data.responseText);
                alertify.alert("Hubo un problema al poner los inventarios en cero, por favor intente de nuevo o contacte a Emanuel al # 83021964 " + data.responseText);
            })
            .success(function (data) {
                console.log(data);
                if (data.status==true){
                    alertify.alert('Completado', 'Inventario completo en cero.').set('onok', function(closeEvent){ window.location.href = '/inventarios/';} );
                }

            });//ajax

    }
    else{
        alertify.alert('ERROR', 'La contraseña anotada no coincide, por favor intente este proceso si es autorizado.')
    }
}
