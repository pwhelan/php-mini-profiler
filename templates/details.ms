<div id="pmp-profiler-details">
	<b>{{ path }}</b>
	<hr/> 
	<div class="benchmark">
	{{#benchmarks}}
		{{name}} {{time}} ms<br/>
	{{/benchmarks}}
	</div>
	<hr/>
	<div class="queries">
	{{#queries}}
		{{query}} {{time}} ms<br/>
	{{/queries}}
	</div>
</div>

