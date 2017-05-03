/**
 * Created by emanuelziga on 31/7/16.
 */

(function($) {

$( document ).ready(function($){

    $('html').on('click','.buttonEdit', function (event) {
        event.preventDefault();
        var id = $(this).attr('id');
        window.open('/editarventa/?id='+id);

    });

});

})(django.jQuery);