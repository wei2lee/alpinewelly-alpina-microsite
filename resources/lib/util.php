<?php 
	function toJSON($error_exist, $error_no, $error_msg, $recover_suggestion, $data) {
		 $ret = array(); 
		 $ret['status'] = $error_exist==0 ? 1 : 0; 
		 $ret['error_exist'] = $error_exist; 
		 $ret['error_no'] = $error_no; 
		 $ret['error_message'] = $error_msg; 
		 $ret['recover_suggestion'] = $recover_suggestion; 
		 $ret['data'] = $data; 
		 return json_encode($ret); 
	} 
?>