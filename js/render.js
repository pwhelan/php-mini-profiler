/*
 * Render the tag with the total count for the profile statistics
 */

// TODO: change cursor to hand!
$(window).ready(function() {
	
	if ( typeof window.PhpMiniProfiler == 'object') {
		
		$('BODY').prepend(
			Mustache.render(
				'<div id="pmp-profiler-total">{{ total }} ms</div>',
				window.PhpMiniProfiler
			)
		);
		
		$('BODY').prepend(
			Mustache.render(
				'<div id="pmp-profiler-details">' +
					'<b>' + window.location.pathname + '</b>' +
					'<hr/>' + 
					'<div class="benchmark">' +
						'{{#benchmarks}}' +
							'{{name}} {{time}} ms<br/>' +
						'{{/benchmarks}}' +
					'</div>' +
					'<hr/>' +
					'<div class="queries">' +
						'{{#queries}}' +
							'{{query}} {{time}} ms<br/>' +
						'{{/queries}}' +
					'</div>' +
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

