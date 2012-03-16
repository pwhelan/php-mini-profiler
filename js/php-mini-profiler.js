if ( typeof PhpMiniProfiler == 'object') {
	PhpMiniProfiler.init = function() {
		
		var PhpMiniProfilerPath = null;
		var getCurrentPath = function() {
			var oldOnError = typeof window.onerror != 'undefined' ? window.onerror : null;
			var path = null;
			
			window.onerror = function(msg, url, line) {
				alert('URL = ' + url);
				PhpMiniProfilerPath = url.substr(0, url.lastIndexOf('/'));
				
				window.onerror = oldOnError;
				alert('PATH = ' + PhpMiniProfilerPath);
			}
			
			var error = function() {
				//x.y = z.x;
			};
			error();
		};
		getCurrentPath();
		
		var loadjs = function(s, f) {
			var sc = document.createElement("script");
			sc.async = "async";
			sc.type = "text/javascript";
			sc.src = 'js/' + s; // fix getCurrentPath
			var l = false;
			sc.onload = sc.onreadystatechange  = function(_, abort) {
				if (!l && (!sc.readyState || /loaded|complete/.test(sc.readyState))) {
					if (!abort) { 
						l=true; 
						if (typeof f == 'function') f(); 
					}
				}
			};
			
			document.getElementsByTagName('head')[0].appendChild(sc);
		}; 
		
		loadjs('mustache.js', 
			(typeof jQuery == 'undefined' ? 
				function() {
					loadjs('jquery-1.7.1.min.js');
					loadjs('render.js');
				} : 
				function() {
					loadjs('render.js');
				}
			)
		);
		
	};
	
	PhpMiniProfiler.init();
}

