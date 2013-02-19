/*
 * This file contains all the functions used for rendering the actual UI.
 */

// TODO: change cursor to hand!
$(window).ready(function() {
	
	if ( typeof window.PhpMiniProfiler == 'object') {
		var details = $('#pmp-profiler-details');
		
		
		renderTemplate = function(tmplName) {
			// Without synchronous requests we break the UI completely.
			// Feel free to fix it. -Phillip Whelan
			$.ajaxSetup({async:false});
			$.get(PhpMiniProfiler.includePath + '/templates/' + tmplName, {}, 
				function(tmpl) {
					// Provide a summary of the query
					$.each(PhpMiniProfiler.queries, function(i, query) {
						query.summary = function()
						{
							return query.query.
								replace(/\n/gm,' ').
								replace(/\s+/gm,' ').
								substr(0, 32) + '...';
						}
					});
			
					$('BODY').prepend(
						Mustache.render(tmpl, PhpMiniProfiler)
					);
				},
				'html'
			);
			$.ajaxSetup({async:false});
		};
		
		renderTemplate('floater.ms');
		renderTemplate('details.ms');
		
		$('#pmp-profiler-details .showqueries').live('click', function() {
			var $details = $(this).parent('.details');
			var $queries = $('.queries', $details);
			var shown = $queries.css('display') != 'none';
			
			$(this).html(shown ? 'Show' : 'Hide');
			$queries.css('display', 
				shown ? 'none' : 'block'
			);
		});
				
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
		});
		
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
						
						// Provide a summary of the query
						$.each(data.queries, function(i, query) {
							
							query.summary = function()
							{
								return query.query.
									replace(/\n/gm,' ').
									replace(/\s+/gm,' ').
									substr(0, 32) + '...';
							}
						});
						
						$('#pmp-profiler-details').append(
							Mustache.render(ajaxTemplate, data)
						);
					}
				});
			}
		};
	}
});
