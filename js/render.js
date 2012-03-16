/*
 * Render the tag with the total count for the profile statistics
 */

// TODO: change cursor to hand!
$(window).ready(function() {
	
	if ( typeof window.PhpMiniProfiler == 'object') {
		
		$('BODY').prepend(
			Mustache.render(
				'<div id="pmp-profiler-total">{{ total }}</div>',
				window.PhpMiniProfiler
			)
		);
		
		$('BODY').prepend(
			Mustache.render(
				'<div id="pmp-profiler-details">' +
					'{{#benchmarks}}' +
						'{{name}} {{time}}<br/>' +
					'{{/benchmarks}}' +
				'</div>',
				window.PhpMiniProfiler
			)
		);
		
		var displayedDetails = false;
		
		$('#pmp-profiler-total').click(function() {
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

