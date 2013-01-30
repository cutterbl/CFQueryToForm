// JQuery Plugin that will take a form, serialize it's field values, then create a JSON object of the array
(function( $ ){
    $.fn.serializeJSON=function() {
        var json = {};
        jQuery.map($(this).serializeArray(), function(n, i){
            (json[n['name']] === undefined) ? json[n['name']] = n['value'] : json[n['name']] += ',' + n['value'];
        });
        return json;
    };
})( jQuery );
