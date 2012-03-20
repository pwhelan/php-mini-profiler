if ( typeof window.PhpMiniProfiler == 'object') {
	
	PhpMiniProfiler.includePath = null;
	PhpMiniProfiler.path = window.location.pathname;
	
	PhpMiniProfiler.initPath = function() {
		
		var getCurrentPath = function() {
			var scripts= document.getElementsByTagName('script');
			var path= scripts[scripts.length-1].src.split('?')[0];
			
			PhpMiniProfiler.includePath = path.substr(0, path.lastIndexOf('/js/'));
		}
		getCurrentPath();
	}
	
	PhpMiniProfiler.init = function() {
		
		var loadcss = function(s, f) {
			var sc = document.createElement("link");
			sc.rel = "stylesheet";
			sc.href = PhpMiniProfiler.includePath + '/css/' + s;
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
		
		var loadjs = function(s, f) {
			var sc = document.createElement("script");
			sc.async = "async";
			sc.type = "text/javascript";
			sc.src = PhpMiniProfiler.includePath + '/js/' + s;
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
		
		loadcss('highlight/default.css');
		
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
		
		loadjs('highlight/highlight.pack.js', function() {
			hljs.initHighlightingOnLoad();
		});
		
		var ajaxTemplate = null;
		$.get(PhpMiniProfiler.includePath + '/templates/ajaxdetails.ms', {}, 
			function(tmpl) {
				ajaxTemplate = tmpl;
			},
			'html'
		);
		
		var renderAjaxTemplate = function(path, ajaxId) {
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
					}
				});
			}
		};
		
		
		var oldxhr = XMLHttpRequest;
		XMLHttpRequest = function() {
			
			var that = this;
			var xhr = new oldxhr();
			var start = new Date();
			var path = null;
			
			this.open = function(method, url, async, username, password) {
				path = url;
				return xhr.open(method, url, async, username, password);
			}
			
			this.setRequestHeader = function(name, value) {
				return xhr.setRequestHeader(name, value);
			}
			
			this.getResponseHeader = function(name) {
				return xhr.getResponseHeader(name);
			}
			
			this.getAllResponseHeaders = function() {
				return xhr.getAllResponseHeaders();
			}
			
			this.send = function(data) {
				return xhr.send(data);
			}
			
			this.abort = function() {
				return xhr.abort();
			}
						
			xhr.onreadystatechange = function() {
				
				that.readyState = xhr.readyState;
				that.responseXML = xhr.responseXML;
				that.responseText = xhr.responseText;
				
				if (that.readyState == 4) {
					that.status = xhr.status;
					that.statusText = xhr.statusText;
					
					var ajaxId = xhr.getResponseHeader('X-Php-Mini-Profiler-Id');
					if (ajaxId) {
						var end = new Date();
						var time = end.getTime() - start.getTime();
						$('#pmp-profiler-total').append('<br/>' + (time/1000) + ' ms');
						renderAjaxTemplate(path, ajaxId);
					}
				}
				
				if (typeof that.onreadystatechange == 'function') {
					that.onreadystatechange.call(xhr);
				}
			}
			
		};
		
	};
	
	PhpMiniProfiler.initPath();
	PhpMiniProfiler.init();
	
}

