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
	<div class="details">
		<span class="showqueries">Show</span>
		<span>{{queries.length}} Queries</span>
		<div class="queries">
		{{#queries}}
			<h3><a href="#">{{summary}} {{time}}/ms</a></h3>
			<div>
				<pre><code class="sql">{{query}}</code></pre>
			</div>
		{{/queries}}
		</div>
	</div>
</div>
