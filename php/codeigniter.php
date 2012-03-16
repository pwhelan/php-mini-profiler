<?php

class PHPMiniProfiler4CI {
	
	public function run() {
		$CI = &get_instance();
	
		$profile = array();
		
		$markers = $CI->benchmark->marker; // can we use & to make it a reference?
		foreach ($markers as $key => $val)
		{
			// We match the "end" marker so that the list ends
			// up in the order that it was defined
			if (preg_match("/(.+?)_end/i", $key, $match))
			{
				
				if (isset($markers[$match[1].'_end']) AND isset($markers[$match[1].'_start']))
				{
					$profile[$match[1]] = $CI->benchmark->elapsed_time($match[1].'_start', $key);
				}
			}
		}
		
		$profile['total'] = array_sum($profile);
		return '<script type="text/javascript">window.PhpMiniProfiler = function() { var benchmarks = '.json_encode($profile).'; }</script>';
	}
	
}

