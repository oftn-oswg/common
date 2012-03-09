// #dependency From function requires https://github.com/silentmatt/javascript-biginteger/blob/master/biginteger.js
var JapaneseNumerals = new function () {
		this.USE_FORMAL = 1;
		this.USE_FORMAL_MAN = 2;
		this.USE_FORMAL_THEN_THOUSAND = this.USE_FORMAL_MAN;

		this.to = function (left, right, flags) {
			if (flags === undefined) flags = 0;

			left = "" + left;

			var numbers = this.getNumbers(flags);
			var zero = this.getZero(flags);
			var quartets = this.getQuartets(flags);

			var data_array = [];
			var data_string = "";
			var decimal_string = "";
			var t;

			if (right !== undefined) decimal_string = "" + right;

			t = Math.ceil(left.length / 4) * 4 - left.length;
			left = new Array(t + 1).join("0") + left;

			var i = 4;
			var len = left.length;
			while (i <= len) {
				data_array.push(left.substr(i * -1, 4));
				i += 4;
			}

			for (i = 0, len = data_array.length; i < len; ++i) {
				var v = data_array[i];
				var temp_string = "";

				if (parseInt(v, 10) === 0) continue;

				// Each of the below "Place"s are per-quartet places
				// Ones Place
				temp_string = numbers[v.substr(-1, 1)];

				// Tens Place
				if (v.substr(-2, 1) == 1) temp_string = numbers[10] + temp_string;
				else if (v.substr(-2, 1) != 0) temp_string = numbers[v.substr(-2, 1)] + numbers[10] + temp_string;

				// Hundreds Places
				if (v.substr(-3, 1) == 1) temp_string = numbers[100] + temp_string;
				else if (v.substr(-3, 1) != 0) temp_string = numbers[v.substr(-3, 1)] + numbers[100] + temp_string;

				// Thousands Place
				if (v.substr(-4, 1) == 1) temp_string = numbers[1000] + temp_string;
				else if (v.substr(-4, 1) != 0) temp_string = numbers[v.substr(-4, 1)] + numbers[1000] + temp_string;

				data_string = temp_string + quartets[i] + data_string;
			}

			if (data_string == "") data_string = zero;

			if (decimal_string != "") {
				var decimal_array = decimal_string.split('');
				numbers[0] = this.getZero(flags);
				for (i = 0, len = decimal_array.length; i < len; ++i)
				decimal_array[i] = numbers[decimal_array[i]];
				decimal_string = decimal_array.join('');

				data_string = data_string + '・' + decimal_string;
			}

			return data_string;
		};

		this.from = function (num) {
			var definitionTable = this.getDefinitionTables();
			var numbers = definitionTable.numbers;
			var myriads = definitionTable.myriads;
			var len = num.length;
			var myriad = 0;
			var temp = 1;
			var temp2 = 0;
			var result = BigInteger(0);

			for (var i = 0; i < len; ++i) {
				var parse = num.substr(i, 1);
				if (numbers[parse] !== undefined && parseInt(numbers[parse], 10) < 10) {
					temp = parseInt(numbers[parse], 10);
					temp2 = temp;
				} else if (numbers[parse] !== undefined) {
					myriad += temp * parseInt(numbers[parse], 10);
					temp = 1;
					temp2 = 0;
				} else {
					for (var j in myriads) {
						if (j.substr(0, 1) == parse) {
							i += j.length - 1;
							if (myriad == 0) myriad = temp;
							result = result.add(BigInteger(myriad).multiply(BigInteger(myriads[j])));
							myriad = 0;
							temp = 1;
							temp2 = 0;
							break;
						}
					}
				}
			}
			result = result.add(temp2);
			result = result.add(myriad);

			return result.toString();
		};

		this.getDefinitionTables = function () {
			var temp = this.getNumbers();
			temp[0] = this.getZero();
			var numbers = {};
			for (var i in temp) {
				numbers[temp[i]] = i;
			}
			numbers["壱"] = "1";
			numbers["弐"] = "2";
			numbers["参"] = "3";
			numbers["拾"] = "10";
			numbers[this.getZero(1)] = "0";

			temp = this.getQuartets();
			var quartets = {};
			for (var i in temp) {
				if (temp[i] === "") continue;
				quartets[temp[i]] = BigInteger(1).exp10(i * 4).toString();
			}
			quartets["萬"] = "10000";

			return {
				"numbers": numbers,
				"myriads": quartets
			};
		};

		this.getNumbers = function (flags) {
			if (flags === undefined) flags = 0;

			var numbers = {
				0: '',
				// Blank for ease of use.  Going to use Array Index to grab the proper character
				1: '一',
				2: '二',
				3: '三',
				4: '四',
				5: '五',
				6: '六',
				7: '七',
				8: '八',
				9: '九',
				10: '十',
			};
			if ((flags & this.USE_FORMAL) == this.USE_FORMAL) {
				numbers[1] = "壱";
				numbers[2] = "弐";
				numbers[3] = "参";
				numbers[10] = "拾";
			}
			numbers[100] = "百";
			numbers[1000] = "千";

			return numbers;
		};

		this.getZero = function (flags) {
			if (flags === undefined) flags = 0;

			if ((flags & this.USE_FORMAL) == this.USE_FORMAL) return "零";
			return "〇";
		};

		this.getQuartets = function (flags) {
			if (flags === undefined) flags = 0;

			var quartets = ["", // Default Quartet has no symbol
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
			];
			if ((flags & this.USE_FORMAL_MAN) == this.USE_FORMAL_MAN) quartets[1] = '萬'; // Older formal character for 10,000
			return quartets;
		};
	};