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
		<pre><code class="sql">{{query}}</code></pre>
		{{time}} ms<br/>
	{{/queries}}
	</div>
</div>

