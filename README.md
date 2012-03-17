PHP Mini Profiler
=================

A small library and UI code that implements something similar to MVC Mini
Profiler for PHP. To use it in your own project you need to both include the
base CSS and JS file. The JS will automagically find and load the dependencies.
The profiler information must be declared as the global javascript variable 
PhpMiniProfiler.

Example
-------

<html>
	<script>
	window.PhpMiniProfiler = {
		benchmarks : [
			{name: 'controller load', time: 1.024},
			{name: 'controller action', time: 1.024}
		],
		total: 2.048
	}
	</script>
	<link rel="stylesheet" href="css/php-mini-profiler.css"/>
	<script src="js/php-mini-profiler.js"></script>
</html>

This code will render a fake benchmark for the HTML page.
