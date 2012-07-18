/*
 * Render the tag with the total count for the profile statistics
 */

// TODO: change cursor to hand!
$(window).ready(function() {
	
	if ( typeof window.PhpMiniProfiler == 'object') {
		var details = $('#pmp-profiler-details');
		
		
		var renderTemplate = function(tmplName) {
			$.ajaxSetup({async: false});
			$.get(PhpMiniProfiler.includePath + '/templates/' + tmplName, {}, 
				function(tmpl) {
					$('BODY').prepend(
						Mustache.render(tmpl, PhpMiniProfiler)
					);
				},
				'html'
			);
			$.ajaxSetup({async: true});
		};
		
		renderTemplate('floater.ms');
		renderTemplate('details.ms');
		
		$('#pmp-profiler-details .showqueries').click(function() {
			var shown = $('#pmp-profiler-details .queries').css('display') != 'none';
			$(this).html(shown ? 'Show Queries' : 'Hide Queries');
			$('#pmp-profiler-details .queries').css('display', 
				shown ? 'none' : 'block'
			);
		});
		
		if (typeof $.ui.accordion == 'function') {
			$('#pmp-profiler-details .queries').
				accordion({
					active: false,
					collapsible:true,
					autoHeight: false
				});
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
	
});

