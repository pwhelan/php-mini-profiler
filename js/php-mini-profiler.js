if ( typeof window.PhpMiniProfiler == 'object') {
	
	var PhpMiniProfilerPath = null;
	
	PhpMiniProfiler.initPath = function() {
		
		var getCurrentPath = function() {
			var scripts= document.getElementsByTagName('script');
			var path= scripts[scripts.length-1].src.split('?')[0];
			PhpMiniProfilerPath = path.substr(0, path.lastIndexOf('/'));;
		}
		getCurrentPath();
	}
	
	PhpMiniProfiler.init = function() {
		
		var loadjs = function(s, f) {
			var sc = document.createElement("script");
			sc.async = "async";
			sc.type = "text/javascript";
			sc.src = PhpMiniProfilerPath + '/' + s; // fix getCurrentPath
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
	
	PhpMiniProfiler.initPath();
	PhpMiniProfiler.init();
}

