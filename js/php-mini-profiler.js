// Render or Queue up an AJAX call for rendering. 
// The queue is a backlog for AJAX requests that occur before render.js
// is loaded.

var ajaxTemplate = null;
var ajaxReportBacklog = new Array();

function ajaxReport()
{
	if (this._ajaxId) {
		// We assume that if the function renderAjaxTemplate is not declared
		// we are still loading render.js
		if (typeof renderAjaxTemplate == 'function') {
			var time = this._end.getTime() - this._start.getTime();
			$('#pmp-profiler-total').append('<br/>' + (time/1000) + ' ms');
			console.log('AJAX TIME = ' + time/1000 + ' ms nodes = ' + $('#pmp-profiler-total').length);
			
			renderAjaxTemplate(ajaxTemplate, this._path, this._ajaxId);
		}
		else {
			console.log('ADDING TO BACKLONG = ' + this._ajaxId)
			ajaxReportBacklog.push(this);
		}
	}
}

function renderAjaxReportBacklog()
{
	console.log('RENDERING BACKLOG');
	while((report = ajaxReportBacklog.pop())) {
		ajaxReport.apply(report);
	}
}

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
					loadjs('jquery-1.7.1.min.js', 
						loadjs('render.js',
							renderAjaxReportBacklog
						)
					);
				} :
				function() {
					loadjs('render.js', renderAjaxReportBacklog);
				}
			)
		);
		
		loadjs('highlight/highlight.pack.js', function() {
			hljs.initHighlightingOnLoad();
		});
		
		$.get(PhpMiniProfiler.includePath + '/templates/ajaxdetails.ms', {}, 
			function(tmpl) {
				ajaxTemplate = tmpl;
			},
			'html'
		);
		
		
		var oldxhr = XMLHttpRequest;
		XMLHttpRequest = function() {
			
			var that = this;
			var xhr = new oldxhr();
			var path = null;
			
			that._start = new Date();
			
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
					try {
						that.status = xhr.status;
						that.statusText = xhr.statusText;
						
						that._end = new Date();
						that._path = path;
						that._ajaxId = xhr.getResponseHeader('X-Php-Mini-Profiler-Id');
						
						ajaxReport.apply(that);
					}
					catch(e) {
						console.error(e.message);
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

