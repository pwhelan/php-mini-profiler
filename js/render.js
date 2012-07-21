/*
 * Render the tag with the total count for the profile statistics
 */

var QueryAccordionOptions = {
	active: false,
	collapsible:true,
	autoHeight: false
};

renderAjaxTemplate = function(tmpl, path, ajaxId) {
	if (PhpMiniProfiler.AJAXRequestUrl) {
		$.ajax({
			url: PhpMiniProfiler.AJAXRequestUrl + '/' + ajaxId,
			dataType: 'json',
			beforeSend: function(jqXHR) {
				jqXHR.setRequestHeader('X-Php-Mini-Profiler', '1');
			},
			success: function(data){
				data.path = path;
				
				$('#pmp-profiler-details').append(
					Mustache.render(ajaxTemplate, data)
				);
				$('.queries').last().accordion(QueryAccordionOptions);
			}
		});
	}
};

renderTemplate = function(tmplName) {
	$.ajaxSetup({async:false});
	$.get(PhpMiniProfiler.includePath + '/templates/' + tmplName, {}, 
		function(tmpl) {
			console.log('TEMPLATE HAS LOADED, RENDER NOW');
			$('BODY').prepend(
				Mustache.render(tmpl, PhpMiniProfiler)
			);
		},
		'html'
	);
	$.ajaxSetup({async:false});
};

// TODO: change cursor to hand!
//$(window).ready(function() {
	
	if ( typeof window.PhpMiniProfiler == 'object') {
		console.log('RENDERING NOW...');
		
		var details = $('#pmp-profiler-details');
		
		renderTemplate('floater.ms');
		renderTemplate('details.ms');
		
		$('#pmp-profiler-details .showqueries').live('click', function() {
			var queries = $(this).siblings('.queries');
			var shown = queries.css('display') != 'none';
			
			$(this).html(shown ? 'Show Queries' : 'Hide Queries');
			queries.css('display', shown ? 'none' : 'block');
		});
		
		if (typeof $.ui.accordion == 'function') {
			$('#pmp-profiler-details .queries').
				accordion(QueryAccordionOptions);
		}
		
		var displayedDetails = false;
		
		$('#pmp-profiler-total').live('click', function() {
			if (!displayedDetails) {
				$(this).css('color', 'black');
				$('#pmp-profiler-details').css('display', 'inline');
			}
			else {
				$(this).css('color', 'lightgray');
				$('#pmp-profiler-details').css('display', 'none');
			}
			displayedDetails = !displayedDetails;
		});
		
	}
	
//});
