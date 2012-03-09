import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Set;

public class JapaneseNumerals {
	static final int FLAG_USE_FORMAL = 1;
	static final int FLAG_USE_FORMAL_TEN_THOUSAND = 2;
	static final int FLAG_USE_FORMAL_MAN = 2;

	public static String to(Integer num) {
		return to(num.toString());
	}

	public static String to(String num) {
		return to(num, 0);
	}

	public static String to(Integer num, int flags) {
		return to(num.toString(), flags);
	}

	public static String to(String num, int flags) {
		return to(num, null, flags);
	}

	public static String to(Double num) {
		return to(num, 0);
	}

	public static String to(Double num, int flags) {
		Double right = num - num.intValue();
		return to(num.intValue(), right.toString().substring(2), flags);
	}

	public static String to(Integer left, String right) {
		return to(left.toString(), right);
	}

	public static String to(String left, String right) {
		return to(left, right, 0);
	}

	public static String to(Integer left, String right, int flags) {
		return to(left.toString(), right, flags);
	}

	public static String to(String left, String right, int flags) {
		String data_string = "";
		String decimal_string = "";

		Hashtable<String, String> numbers = getNumbers(flags);
		String zero = getZero(flags);
		String[] quartets = getQuartets(flags);

		if (right != "" && right != null)
			decimal_string = right;

		int t = 4 - (left.length() % 4);
		for (int i = 0; i < t; ++i)
			left = "0" + left;

		int i = 4;
		int c = 0;
		String[] data_array = new String[(left.length() / 4)];
		while (i <= left.length()) {
			int s = left.length() - i;
			if (s < 0)
				s = 0;
			data_array[c] = left.substring(s, s + 4);
			++c;
			i += 4;
		}

		c = 0;
		for (String v : data_array) {
			if (v.equals("0000")) {
				++c;
				continue;
			}
			String temp_string = "";

			temp_string = numbers.get(v.substring(v.length() - 1, v.length()));

			if (v.substring(v.length() - 2, v.length() - 1).equals("1"))
				temp_string = numbers.get("10") + temp_string;
			else if (!v.substring(v.length() - 2, v.length() - 1).equals("0"))
				temp_string = numbers.get(v.substring(v.length() - 2,
						v.length() - 1))
						+ numbers.get("10") + temp_string;

			if (v.substring(v.length() - 3, v.length() - 2).equals("1"))
				temp_string = numbers.get("100") + temp_string;
			else if (!v.substring(v.length() - 3, v.length() - 2).equals("0"))
				temp_string = numbers.get(v.substring(v.length() - 3,
						v.length() - 2))
						+ numbers.get("100") + temp_string;

			if (v.substring(v.length() - 4, v.length() - 3).equals("1"))
				temp_string = numbers.get("1000") + temp_string;
			else if (!v.substring(v.length() - 4, v.length() - 3).equals("0"))
				temp_string = numbers.get(v.substring(v.length() - 4,
						v.length() - 3))
						+ numbers.get("1000") + temp_string;

			data_string = temp_string + quartets[c] + data_string;
			++c;
		}

		if (data_string.equals(""))
			data_string = data_string + zero;

		if (!decimal_string.equals("")) {
			Hashtable<String, String> decimal_convert = getNumbers(flags);
			Set<String> keySet = decimal_convert.keySet();
			String[] keys = new String[keySet.size()];
			keySet.toArray(keys);
			decimal_string = decimal_string.replace("0", getZero(flags));
			for (String key : keys) {
				decimal_string = decimal_string.replace(key.toString(),
						decimal_convert.get(key));
			}
			data_string = data_string + "・" + decimal_string;
		}
		return data_string;
	}

	/*
	 * UNDER CONSTRUCTION FOR JapaneseNumerals.from();
	 * 
	 * protected static ArrayList<Hashtable<String, String>>
	 * getDefinitionTables() { ArrayList<Hashtable<String, String>> table = new
	 * ArrayList<Hashtable<String, String>>(); for (int i = 0; i < 2; ++i)
	 * table.add(new Hashtable<String, String>());
	 * 
	 * Hashtable<String, String> numbers = getNumbers(0); Set<String> keySet =
	 * numbers.keySet(); String[] keys = (String[]) keySet.toArray(); for
	 * (String key : keys) { table.get(0).put(numbers.get(key), key); }
	 * table.get(0).put("0", getZero(0)); table.get(0).put("0", getZero(1));
	 * 
	 * return table; }
	 */

	protected static Hashtable<String, String> getNumbers(int flags) {
		Hashtable<String, String> numbers = new Hashtable<String, String>();
		numbers.put("0", "");
		if ((flags & FLAG_USE_FORMAL) == FLAG_USE_FORMAL) {
			numbers.put("1", "壱");
			numbers.put("2", "弐");
			numbers.put("3", "参");
			numbers.put("10", "拾");
		} else {
			numbers.put("1", "一");
			numbers.put("2", "二");
			numbers.put("3", "三");
			numbers.put("10", "十");
		}
		numbers.put("4", "四");
		numbers.put("5", "五");
		numbers.put("6", "六");
		numbers.put("7", "七");
		numbers.put("8", "八");
		numbers.put("9", "九");
		numbers.put("100", "百");
		numbers.put("1000", "千");
		return numbers;
	}

	protected static String getZero(int flags) {
		if ((flags & FLAG_USE_FORMAL) == FLAG_USE_FORMAL)
			return "零";
		return "〇";
	}

	protected static String[] getQuartets(int flags) {
		String[] quartets = new String[18];
		quartets[0] = ""; // 10^0 - Default Quartet has no symbol
		quartets[1] = "万"; // 10^4
		quartets[2] = "億"; // 10^8
		quartets[3] = "兆"; // 10^12
		quartets[4] = "京"; // 10^16
		quartets[5] = "垓"; // 10^20
		quartets[6] = "秭"; // 10^24
		quartets[7] = "穣"; // 10^28
		quartets[8] = "溝"; // 10^32
		quartets[9] = "澗"; // 10^36
		quartets[10] = "正"; // 10^40
		quartets[11] = "載"; // 10^44
		quartets[12] = "極"; // 10^48
		quartets[13] = "恒河沙"; // 10^52
		quartets[14] = "阿僧祇"; // 10^56
		quartets[15] = "那由他"; // 10^60
		quartets[16] = "不可思議"; // 10^64
		quartets[17] = "無量大数"; // 10^68 (as high as quartets currently go?)

		if ((flags & FLAG_USE_FORMAL_MAN) == FLAG_USE_FORMAL_MAN)
			quartets[1] = "萬";

		return quartets;
	}
}