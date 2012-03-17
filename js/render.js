/*
 * Render the tag with the total count for the profile statistics
 */

// TODO: change cursor to hand!
$(window).ready(function() {
	
	if ( typeof window.PhpMiniProfiler == 'object') {
		
		var renderTemplate = function(tmplName) {
			$.get(PhpMiniProfiler.includePath + '/templates/' + tmplName, {}, 
				function(tmpl) {
					$('BODY').prepend(
						Mustache.render(tmpl, PhpMiniProfiler)
					);
				},
				'html'
			);		
		};
		
		renderTemplate('floater.ms');
		renderTemplate('details.ms');
		
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
	
});

