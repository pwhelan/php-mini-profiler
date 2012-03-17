<?php

class PHPMiniProfiler4CI {
	
	public function run() {
		$CI = &get_instance();
	
		$profile = array();
		$sum = 0.0;
		
		$markers = $CI->benchmark->marker; // can we use & to make it a reference?
		foreach ($markers as $key => $val)
		{
			// We match the "end" marker so that the list ends
			// up in the order that it was defined
			if (preg_match("/(.+?)_end/i", $key, $match))
			{
				
				if (isset($markers[$match[1].'_end']) AND isset($markers[$match[1].'_start']))
				{
					$profile[] = array(
						'name' => $match[1],
						'time' => $CI->benchmark->elapsed_time($match[1].'_start', $key)
					);
					
					if ($key == 'total_execution_time_end') {
						$sum = $CI->benchmark->elapsed_time($match[1].'_start', $key);
					}
				}
			}
		}
		
		$profile[] = array('name' => 'total', 'time' => $sum);
		return '<script type="text/javascript">window.PhpMiniProfiler = { '.
				'total: '.json_encode($sum).', '.
				'benchmarks: '.json_encode($profile).', '.
				'queries: '.json_encode($this->_compile_queries()).
			' }</script>';
	}
	
	public function includes() {
		$base_path = '/application/third_party/php-mini-profiler/';
		return	'<link rel="stylesheet" href="'.$base_path.'css/php-mini-profiler.css"/>'."\n".
			'<script type="text/javascript" '.
				'src="'.$base_path.'js/php-mini-profiler.js">'.
			'</script>' . "\n";
	}
	
	protected function _compile_queries()
	{
		$CI = &get_instance();
		$dbs = array();
		$queries = array();
		
		// Let's determine which databases are currently connected to
		foreach (get_object_vars($CI) as $CI_object)
		{
			if (is_object($CI_object) && is_subclass_of(get_class($CI_object), 'CI_DB') )
			{
				$dbs[] = $CI_object;
			}
		}
		
		$count = 0;
		
		foreach ($dbs as $db)
		{
			$count++;
			
			if (count($db->queries) > 0)
			{
				foreach ($db->queries as $key => $val)
				{
					$time = number_format($db->query_times[$key], 4);
					$queries[] = array('query' => wordwrap($val), 'time' => $time);
				}
			}
			
		}
		
		return $queries;
	}
	
}

