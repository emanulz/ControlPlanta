//variables globales

var enteronpeso = false;
var matrixdetalle=[];
var detalle=[];
var codigobusqueda=[];
var matrixventa=[];
var totalventa=0;

var vencimiento;
var tipo;
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


            $('.btnpagar').on('click', function(event){
                event.preventDefault();
                $('.cd-panelpagar').addClass('is-visible');
                blurElement('.blurlines',2);
            });
                //clode the lateral panel
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
                    blurElement('.blurlines',0);
                    event.preventDefault();
               // }
            });

            $('.btnbuscar').on('click', function(event){
                event.preventDefault();
                $('.cd-panelbuscar').addClass('is-visible');
                blurElement('.blurlines',2);
            });
                //clode the lateral panel
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




        //remove row
        $('html').on('click','.removerow', function () {
            event.preventDefault();
            var row=$(this).closest("tr");
            var rowIndex = row.index();
            var totalquitar = matrixventa[rowIndex][4];
            totalventa=Math.round((totalventa-totalquitar) * 1000) / 1000;
            /*pesodesh=Math.round((pesodesh-pesoquitar) * 1000) / 1000;
            $("#pesodesh").val(pesodesh);
            //calcular merma en KG
            mermakg=Math.round((pesolote-pesodesh) * 1000) / 1000;
            $("#mermakg").val(mermakg);
            //calcular merma en %
            mermaporc=Math.round(((mermakg*100)/pesolote) * 1000) / 1000;
            $("#mermaporc").val(mermaporc);*/
            $('.totalventa').html('₡ '+totalventa);
            matrixventa.splice( rowIndex,1 );
            console.log(matrixventa);
            $(this).parent().parent().remove();
        });

        //selectrow
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

        $('#busqueda').on('keypress', function (event) {
             if(event.which === 13){
                event.preventDefault();

                BuscarProducto();
             }
       });

        //evento enter peso
        $('#peso').on('keypress', function (event) {
             if(event.which === 13 && enteronpeso){
               AgregarATabla();
             }
       });
         $('#cantidad').on('keypress', function (event) {
             if(event.which === 13 ){
               getProducto();
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


        $("#btnbusqueda").on("click",BuscarProducto);
        $("#Btnproducto").on("click",getProducto);
        $("#Btnlote").on("click",LoteListo);
        $("#Btnquitlote").on("click",Lotequit);
        $("#BtnConfirmar").on("click",ConfirmarDatos);
        $("#BtnNoConfirmar").on("click",NoConfirmarDatos);
        $("#BtnCrear").on("click",guardarDetalle);



        //llenado de espacios e inicializacion
        $(".hideonload").hide();
        $("#Btnquitlote").hide();
        $("#Btnquitlote2").hide();
        $("#BtnNoConfirmar").hide();
       // $("#tipo").prop("disabled",true);
        //$("#codigo").prop("disabled",true);
        //$("#corte").prop("disabled",true);
       // $("#peso").prop("disabled",true);
        //$("#pesolote").prop("disabled",true);
        //$("#pesodesh").prop("disabled",true);
        //$("#mermakg").prop("disabled",true);
        //$("#mermaporc").prop("disabled",true);
       // $("#BtnCrear").prop("disabled",true);
       // $("#BtnConfirmar").prop("disabled",true);
        //$("#BtnAdd").prop("disabled",true);


    //eventos iniciales:


        $.get('/api/lotes/?tipo=1&isondeshuese=False', llenarlotes);
        var pesoloteini =$( "#lote").val();
        $.get('/api/lotes/?id='+pesoloteini,SetPesoLote);

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
        //console.log(today);
        $("#date").val(today);
        $("#cantidad").val(1);
        $("#date").prop("disabled",true);
        $.get('/api/clientes/',llenarClientes);

    }//main

function blurElement(element, size){
            var filterVal = 'blur('+size+'px)';
            $(element)
              .css('filter',filterVal)
              .css('webkitFilter',filterVal)
              .css('mozFilter',filterVal)
              .css('oFilter',filterVal)
              .css('msFilter',filterVal);
        }

function llenarClientes(data){

    $("#codigo").val('0000');
    $.each( data, function(i){
        $("#cliente").append(new Option(data[i].name+' '+data[i].last_name, data[i].code));
    });

}

function getProducto(){
    var a=$('#producto').val();
    $.get('/api/productos/?product_code='+a,llenartablaProductos);
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
    else{
        console.log('code');
        $.get('/api/productos/?product_code='+a,llenarTablaBusqueda);
    }

}

function llenarTablaBusqueda(data){
    console.log(data);
        $.each( data, function(i){
            codigobusqueda.push(data[i].product_code);
            $('#tablabusqueda > tbody:last').append('<tr><td>' + data[i].product_code + '</td><td>' + data[i].description +
            '</td><td>' + data[i].price + '</td><td><button  type="button" class=" btn btn-success form-control selectrow " id="btnelegir"><span class="glyphicon glyphicon-plus"></span></button></td></tr>');
        });
}

function llenartablaProductos(data){

    var cantidad =$('#cantidad').val();
    var price=(data[0].price*cantidad);
    var pricer=Math.round((price) * 1000) / 1000;
    totalventa=totalventa+pricer;
    var totalventa2=totalventa.toFixed(2);

    $('#tablaproductos > tbody:last').append('<tr><td>' + data[0].product_code + '</td><td>' + data[0].description+ '</td><td>₡ ' +data[0].price + '</td><td>' + $('#cantidad').val() + '</td>' +
    '<td> ₡ ' + pricer +'</td>'+'<td> <button  type="button" class=" btn btn-danger removerow" id="btnelegir"><span class="glyphicon glyphicon-minus"></span></button></td></tr>');

    matrixventa.push([data[0].product_code, data[0].description,data[0].price ,$('#cantidad').val(),pricer]);


    $('.totalventa').html(totalventa2);

    $('.totalventa').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.'
    });
}

function LoteListo(){

    if ($("#lote").val()!=="vacio"){
        event.preventDefault();
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
  //  console.log(data.length);
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
    $.each( data, function(index){
        $("#corte").append(new Option(data[index].description, data[index].id));

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
            matrixdetalle.push([codigo,peso]);
            //console.log(matrixdetalle);

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
    var control=matrixdetalle.length;
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
            console.log(data.responseText);
            alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964");
            })
            .success(function(data){
                console.log(data);
            });

        $.ajax({
          method: "POST",
          url: "/api/inventariototal/",
          async: false,

          data: JSON.stringify({
            "producto": matrixdetalle[i][0],
            "peso": matrixdetalle[i][1],
            "lote": lote,
            "vencimiento": vencimiento,
            "tipo":tipo

            }),//JSON object
              contentType:"application/json; charset=utf-8",
              dataType:"json"
            })
            .fail(function(data){
            console.log(data.responseText);
            alert("Hubo un problema al crear el inventario, por favor intente de nuevo o contacte a Emanuel al # 83021964");
            })
            .success(function(data){
                console.log(data);
            });


        if(i==(control-1)){
            console.log(control);
            console.log(i);

            $.get('/api/detalledeshuese/?lote='+lote, function (data) {
                $.each( data, function(index){
                    detalle.push(data[index].id);
               });
               // console.log(detalle);
                guardarDeshuese();
            });

            }//if
    });


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
    console.log(detalle);
    var lote =parseInt($("#lote").val());
    //var mermaporc2=parseFloat(mermaporc);

    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/deshuese/",
      async: false,

      data: JSON.stringify({
        "lote": lote,
        "pesototal": pesodesh,
        "mermakg": mermakg,
        "mermapor": mermaporc,
        "detalle": detalle
        }),//JSON object
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
    .fail(function(data){
            console.log(data.responseText);
            alert("Hubo un problema al crear el deshuese, por favor intente de nuevo o contacte a Emanuel al # 83021964");
        })
    .success(function(data){
            console.log(data);
            patchlote();
            
        });

}//Guardar Deshuese

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
        $("#BtnCrear").prop("disabled",true);
        $("#BtnNoConfirmar").prop("disabled",true);
        $(".succesmessage:hidden").show("slow");
        })
        .fail(function() {
        //$("#BtnCrear").prop("disabled",true);
        $(".failmessage:hidden").show("slow");
        });


}
