<div>
	<b>{{ path }}</b>
	<hr/> 
	<div class="benchmark">
	{{#benchmarks}}
		<div style="float:left">{{name}}</div>
		<div style="float:right">{{time}} ms</div>
		<div style="clear:both"></div>
	{{/benchmarks}}
	</div>
	<hr/>
	<a class="showqueries">Show Queries</a>
	<div class="queries">
	{{#queries}}
		<h3><a href="#">{{time}} ms</a></h3>
		<div>
			<pre><code class="sql">{{query}}</code></pre>
		</div>
	{{/queries}}
	</div>
</div>
