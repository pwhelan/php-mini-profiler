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
<div class="queries">
{{#queries}}
	<pre><code class="sql">{{query}}</code></pre>
	{{time}} ms<br/>
{{/queries}}
</div>

