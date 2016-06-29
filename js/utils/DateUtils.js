'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var DateUtils = {};

DateUtils.isValidDate = function isValidDate(str) {
	// STRING FORMAT yyyy-mm-dd
	if (str == "" || str == null) {
		return false;
	}

	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
	var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

	// STR IS NOT FIT m IS NOT OBJECT
	if (m === null || (typeof m === 'undefined' ? 'undefined' : _typeof(m)) !== 'object') {
		return false;
	}

	// CHECK m TYPE
	if ((typeof m === 'undefined' ? 'undefined' : _typeof(m)) !== 'object' && m !== null && m.size !== 3) {
		return false;
	}

	var ret = true; //RETURN VALUE
	var thisYear = new Date().getFullYear(); //YEAR NOW
	var minYear = 1999; //MIN YEAR

	// YEAR CHECK
	if (m[1].length < 4 || m[1] < minYear || m[1] > thisYear) {
		ret = false;
	}
	// MONTH CHECK
	if (m[2].length < 2 || m[2] < 1 || m[2] > 12) {
		ret = false;
	}
	// DAY CHECK
	if (m[3].length < 2 || m[3] < 1 || m[3] > 31) {
		ret = false;
	}

	return ret;
};

DateUtils.getFromDate = function (yearMinus) {
	var dateNow = new Date(),
	    yearTo = dateNow.getUTCFullYear();

	var monthTo = dateNow.getUTCMonth() + 1;
	if (monthTo < 10) {
		monthTo = "0" + monthTo;
	}

	var dayTo = dateNow.getUTCDate();
	if (dayTo < 10) {
		dayTo = "0" + dayTo;
	}

	return yearTo - yearMinus + "-" + monthTo + "-" + dayTo;
};

DateUtils.getToDate = function () {
	var dateNow = new Date(),
	    yearTo = dateNow.getUTCFullYear();

	var monthTo = dateNow.getUTCMonth() + 1;
	if (monthTo < 10) {
		monthTo = "0" + monthTo;
	}

	var dayTo = dateNow.getUTCDate();
	if (dayTo < 10) {
		dayTo = "0" + dayTo;
	}

	return yearTo + "-" + monthTo + "-" + dayTo;
};

DateUtils.formatTo = function (millisUTC) {
	var d = new Date(millisUTC);
	return ("0" + d.getUTCDate()).slice(-2) + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + d.getUTCFullYear();
};

exports.default = DateUtils;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\DateUtils.js.map