<?php

class JapaneseNumerals {
	const USE_FORMAL = 1;
	const USE_FORMAL_TEN_THOUSAND = 2;
	
	/**
	Convert a number from Arabic Format to Traditional Japanese Numbers
	@param int      $left   Number to the Left of the Decimal Place
	@param string   $right  Number to the Right of the Decimal Place
	@param int      $flags  Flags
	@return string          Japanese Numeral
	*/
	public static function to($left, $right = null, $flags = 0) {
		$numbers  = JapaneseNumerals::getNumbers($flags);
		$zero     = JapaneseNumerals::getZero($flags);
		$quartets = JapaneseNumerals::getQuartets($flags);
		
		$string         = "";
		$data_array     = array();
		$data_string    = "";
		$decimal_string = "";
		
		if ($right != null)
			$decimal_string = $right;
		
		$t    = (ceil(strlen($left) / 4) * 4) - strlen($left); // Amount of placeholder we're going to need to make the quartets evenly divisible.  This makes it so much easier on us.
		$left = str_repeat("0", $t) . $left; // Prepend Zeros to make an Even Amount
		
		// Make an Array of Each Quartet
		$i = 4;
		while ($i <= strlen($left)) {
			$data_array[] = substr($left, $i * -1, 4);
			$i += 4;
		}
		
		// Create the Number from the lowest quartet to the highest
		foreach ($data_array as $i => $v) {
			if (intval($v) == 0)
				continue; // Skip the Quartet if its worthless
			
			$temp_string = "";
			
			// Each of the below "Place"s are per-quartet places
			
			// Ones Place
			$temp_string = $numbers[substr($v, -1, 1)];
			
			// Tens Place
			if (substr($v, -2, 1) == 1) // If we have --1-
				$temp_string = $numbers[10] . $temp_string;
			elseif (substr($v, -2, 1) != 0) // If we have --X-
				$temp_string = $numbers[substr($v, -2, 1)] . $numbers[10] . $temp_string;
			
			// Hundreds Place
			if (substr($v, -3, 1) == 1) // If we have -1--
				$temp_string = $numbers[100] . $temp_string;
			elseif (substr($v, -3, 1) != 0) // If we have -X--
				$temp_string = $numbers[substr($v, -3, 1)] . $numbers[100] . $temp_string;
			
			// Thousands Place
			if (substr($v, -4, 1) == 1) // If we have 1---
				$temp_string = $numbers[1000] . $temp_string;
			elseif (substr($v, -4, 1) != 0) // If we have X---
				$temp_string = $numbers[substr($v, -4, 1)] . $numbers[1000] . $temp_string;
			
			// Prepend the newest data to string, separating it from the string by the quartet identifier
			$data_string = $temp_string . $quartets[$i] . $data_string;
		}
		
		// If there is no number, our number is zero - of course!
		if ($data_string == "")
			$data_string = $zero;
		
		// Now we do the decimal (if we have one)
		if ($decimal_string != '') {
			$decimal_convert    = $numbers;
			$decimal_convert[0] = $zero; // Replace the placeholder with Zero here.
			$decimal_string     = str_replace(array(
				'0',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'x'
			), // Each number to be replaced.  X is a placeholder for the non-existant 10
				$decimal_convert, $decimal_string);
			// Separate the Left and Right of the decimal using a Japanese Middot
			$data_string        = $data_string . '・' . $decimal_string;
		}
		
		// Finally, Return the number!
		return $data_string;
		
	}
	/**
	Convert a number from Traditional Japanese Numbers to Arabic Format
	This function requires the bcmath extension.
	
	@param	string	Japanese Numeral
	@return string  Arabic Numeral
	*/
	public static function from($num) {
		$definitionTable = JapaneseNumerals::getDefinitionTables();
		$numbers = $definitionTable['numbers'];
		$myriads = $definitionTable['myriads'];
		$len = mb_strlen($num);
		$myriad = 0;
		$temp = 1;
		$temp2 = 0;
		$result = "0";
		mb_internal_encoding("UTF-8");
		for($i = 0;$i < $len;++$i) {
			$parse = JapaneseNumerals::substr_unicode($num,$i,1);
			if(isset($numbers[$parse]) && intval($numbers[$parse]) < 10) {
				$temp = intval($numbers[$parse]);
				$temp2 = $temp;
			} elseif(isset($numbers[$parse])) {
				$myriad += $temp * intval($numbers[$parse]);
				$temp = 1;
				$temp2 = 0;
			} else {
				foreach($myriads as $j => $v) {
					if(JapaneseNumerals::substr_unicode($j,0,1) == $parse) {
						$i += mb_strlen($j);
						if($myriad == 0) $myriad = $temp;
						$result = bcadd($result,bcmul($myriad,$v));
						$myriad = 0;
						$temp = 1;
						$temp2 = 0;
						break;
					}
				}
			}
		}
		$result = bcadd($result,$temp2);
		$result = bcadd($result,$myriad);
		
		return $result;
	}
	
	public static function getDefinitionTables() {
		$temp = JapaneseNumerals::getNumbers();
		$temp[0] = JapaneseNumerals::getZero();
		$numbers = array();
		foreach($temp as $arabic => $kanji) {
			$numbers[$kanji] = $arabic;
		}
		$numbers["壱"] = "1";
		$numbers["弐"] = "2";
		$numbers["参"] = "3";
		$numbers["拾"] = "10";
		$numbers[JapaneseNumerals::getZero(1)] = "0";
		
		$temp = JapaneseNumerals::getQuartets();
		$quartets = array();
		foreach($temp as $key => $kanji) {
			if($kanji == "") continue;
			$quartets[$kanji] = bcpow(10,$key * 4);
		}
		$quartets["萬"] = "10000";
		
		return array("numbers" => $numbers, "myriads" => $quartets);
	}
	
	protected static function getNumbers($flags = 0) {
		$numbers = array(
			'', // Blank for ease of use.  Going to use Array Index to grab the proper character
			'一', // 1
			'二', // 2
			'三', // 3
			'四', // 4
			'五', // 5
			'六', // 6
			'七', // 7
			'八', // 8
			'九', // 9
			'十' // 10
		);
		if ($flags & JapaneseNumerals::USE_FORMAL == JapaneseNumerals::USE_FORMAL) {
			$numbers[1]  = '壱'; // Formal 1
			$numbers[2]  = '弐'; // Formal 2
			$numbers[3]  = '参'; // Formal 3
			$numbers[10] = '拾'; // Formal 10
		}
		$numbers[100]  = '百'; // 100
		$numbers[1000] = '千'; // 1,000
		return $numbers;
	}
	
	protected static function getZero($flags = 0) {
		if ($flags & JapaneseNumerals::USE_FORMAL == JapaneseNumerals::USE_FORMAL)
			return '零'; // Formal 0
		return '〇'; // Informal 0
	}
	
	protected static function getQuartets($flags = 0) {
		// Adding to this array should have no negative consequences
		$quartets = array(
			"", // Default Quartet has no symbol
			"万", // 10^4
			"億", // 10^8
			"兆", // 10^12
			"京", // 10^16
			"垓", // 10^20
			"秭", // 10^24
			"穣", // 10^28
			"溝", // 10^32
			"澗", // 10^36
			"正", // 10^40
			"載", // 10^44
			"極", // 10^48
			"恒河沙", // 10^52
			"阿僧祇", // 10^56
			"那由他", // 10^60
			"不可思議", // 10^64
			"無量大数" // 10^68 (as high as quartets currently go?)
		);
		if ($flags & JapaneseNumerals::USE_FORMAL_TEN_THOUSAND == JapaneseNumerals::USE_FORMAL_TEN_THOUSAND)
			$quartets[1] = '萬'; // Older formal character for 10,000
		return $quartets;
	}
	
	final protected static function substr_unicode($str, $s, $l = null) {
    	return join("", array_slice(preg_split("//u", $str, -1, PREG_SPLIT_NO_EMPTY), $s, $l));
	}
}