/**
 * TEMPLATE
 * CFQueryToForm.jquery-0.1.js
 * 
 * VERSION
 * 0.1 (03.15.2011)
 * 
 * AUTHOR
 * Steve 'Cutter' Blades, webDOTadminATcutterscrossing.com
 * 
 * LICENSE
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */

/**
 * FUNCTION
 * CFQueryToForm
 * 
 * PURPOSE
 * This function is used in conjunction with data automatically converted to JSON from ColdFusion's native
 * query object. It takes two arguments: 'data', a JSON object, and 'root' the key containing the CF query
 * object. It will then loop the values in the query, and apply them to the coinciding form fields. This requires
 * that the column names, of the query, are a match to the field names in the form. The 'ucColNames' argument is an
 * optional boolean argument, defaulted to true. This argument tells our CFQueryToForm plugin to uppercase fieldnames
 * prior to comparing to column names. Passing 'false' to this argument will tell the parser to use exact case
 * matching instead. This is important for some frameworks. This is used to process query requests that return
 * a single record query object.
 * 
 * BASIC USAGE
 * $('#someForm').CFQueryToForm(retData, 'data');
 * 
 * This code makes some assumptions, requiring some structure to the data returned. The method
 * called from the CFC must return a structure:
 * {
 *     'success': boolean denoting the success/failure of the server side process,
 *     [root]: the query return with the record to populate the form,
 *     ['message']: if success is 'false', then this is how the server-side process failed
 * }
 * @param {Object} data
 * @param {String} root
 * @param {Boolean} ucColNames
 */

(function( $ ){
	$.fn.CFQueryToForm=function(data, root, ucColNames) {
		var form = $(this),
			success = true,
			ucColNames = ucColNames||true,
			fields, select;
		fields = form.children('input').toArray();
		fields = fields.concat(form.children('select').toArray());
		fields = fields.concat(form.children('textarea').toArray());
		$.each(fields, function(i, v){
			var fld = $(v),
				nm = fld.attr('name'),
				tag = v.tagName,
				pos = $.inArray(((ucColNames) ? nm.toUpperCase() : nm), data[root].COLUMNS),
				type = fld.attr('type')||'select';
			if(pos > -1){
				switch(tag){
					case "INPUT":
						if(type === 'radio'||type === 'checkbox'){
							(fld.attr("value").toString() === data[root].DATA[0][pos].toString())?fld.attr('checked','checked'):fld.removeAttr('checked');
							break;
						}
					default:
						$(v).val(data[root].DATA[0][pos]);
						break;
				}
			}
		});
		return success;
	};
})( jQuery );

/**
 * FUNCTION
 * CFRequestToForm
 * 
 * PURPOSE
 * This function is used in conjunction with the ColdFusion server, making a remote request
 * of a ColdFusion Component (CFC) for query data, and populating a form with the return.
 * 
 * BASIC USAGE
 * $('#someForm').CFRequestToForm('/path/to/my.cfc','myRemoteMethod',{someId:42},'result');
 * 
 * This code makes some assumptions, requiring some structure to the data returned. The method
 * called from the CFC must return a structure:
 * {
 *     'success': boolean denoting the success/failure of the server side process,
 *     [root]: the query return with the record to populate the form,
 *     ['message']: if success is 'false', then this is how the server-side process failed
 * }
 * 
 * This plugin will make a request to the configured 'url', passing any parameters through the 'postData' configuration
 * object. It will automatically pass ColdFusion attributes to convert the return (struct) into a JSON object. For further
 * understanding, please see the following blog post on dealing with Ajax requests. The returned ColdFusion query data will
 * be applied to the form the plugin was configured to. The 'ucColNames' argument is an optional boolean argument, defaulted to true.
 * This argument tells our CFQueryToForm plugin to uppercase fieldnames prior to comparing to column names. Passing 'false' to
 * this argument will tell the parser to use exact case matching instead. This is important for some frameworks.
 * 
 * http://www.cutterscrossing.com/index.cfm/2011/9/26/How-I-Do-Things-ColdFusion-and-Ajax-Requests
 * 
 * A 'failed' request will throw a 'cffail' event. The developer can bind to this event, expecting the same basic
 * arguments that a standard JQuery ajax 'error' would receive (jqXHR, textStatus, errorThrown). The 'errorThrown' will be the complete 'data'
 * object returned from the server.
 * 
 * @param {String} url
 * @param {String} methodName
 * @param {Object} postData
 * @param {String} root
 * @param {Boolean} ucColNames
 */
(function( $ ){
	$.fn.CFRequestToForm=function(url, methodName, postData, root, ucColNames) {
		var form = $(this),
			postData = postData||{},
			ucColNames = ucColNames||true,
			success = true;
		
		$.ajax({
			url: url,
			data: $.extend(true, {}, postData, {method: methodName, returnFormat: "JSON"}),
			dataType: "json",
			success: function(d, r, o){
				if(d.success){
					form.CFQueryToForm(d, root, ucColNames)
				} else {
					var e = $.Event("cffail");
					form.trigger(e, [o, r, d]);
					success = false;
				}
			}
		})
		return success;
	};
})( jQuery );
