'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnForMonthSelect = function _fnForMonthSelect() {
	var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

	var options = [],
	    dNow = new Date(Date.now());

	var dateDefault = void 0,
	    y = dNow.getUTCFullYear(),
	    m = dNow.getUTCMonth(),
	    i = void 0;

	for (i = 0; i < 10; i++) {
		m = m - 1;
		if (m > -1) {
			options.push({
				caption: y + 'M' + (m + 1 > 9 ? m + 1 : '0' + (m + 1)),
				value: y + 'M' + (m + 1 > 9 ? m + 1 : '0' + (m + 1))
			});
		} else {
			m = 11;
			y = y - 1;
			options.push({
				caption: y + 'M12',
				value: y + 'M12'
			});
		}
		if (i === mapDateDf) {
			dateDefault = y + 'M' + (m + 1 > 9 ? m + 1 : '0' + (m + 1));
		}
	}

	return { options: options, dateDefault: dateDefault };
};

var _fnForQuarterSelect = function _fnForQuarterSelect() {
	var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	var options = [],
	    dNow = new Date(Date.now());

	var dateDefault = void 0,
	    y = dNow.getUTCFullYear(),
	    m = dNow.getUTCMonth(),
	    _c = Math.floor((m + 1) / 3),
	    qNow = _c === 4 ? 4 : _c + 1;

	qNow = qNow - 1;
	var i = void 0;
	for (i = 0; i < 4; i++) {
		if (qNow < 1) {
			y = y - 1;qNow = 4;
		}

		options.push({
			caption: y + 'Q' + qNow,
			value: y + 'Q' + qNow
		});

		if (i === mapDateDf) {
			dateDefault = y + 'Q' + qNow;
		}

		qNow = qNow - 1;
	}

	return { options: options, dateDefault: dateDefault };
};

var _fnForYearSelect = function _fnForYearSelect() {
	var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	var options = [],
	    dNow = new Date(Date.now());

	var dateDefault = void 0,
	    y = dNow.getUTCFullYear(),
	    i = void 0;
	for (i = 0; i < 8; i++) {
		options.push({
			caption: '' + y,
			value: '' + y
		});
		if (i === mapDateDf) {
			dateDefault = '' + y;
		}
		y = y - 1;
	}

	return { options: options, dateDefault: dateDefault };
};

var DateUtils = {
	isValidDate: function isValidDate(str) {
		var nForecastDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		// STRING FORMAT yyyy-mm-dd

		if (Object.prototype.toString.call(str) !== "[object String]" || !str || str.trim().length !== 10) {
			return false;
		}

		// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
		var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

		// STR IS NOT FIT m IS NOT OBJECT
		if (m === null || (typeof m === 'undefined' ? 'undefined' : (0, _typeof3.default)(m)) !== 'object') {
			return false;
		}

		// CHECK m TYPE
		if ((typeof m === 'undefined' ? 'undefined' : (0, _typeof3.default)(m)) !== 'object' && m !== null && m.size !== 3) {
			return false;
		}

		var thisYear = new Date().getFullYear();
		var minYear = 1999;

		// YEAR CHECK
		if (m[1].length < 4 || m[1] < minYear || m[1] > thisYear + nForecastDate) {
			return false;
		}
		// MONTH CHECK
		if (m[2].length < 2 || m[2] < 1 || m[2] > 12) {
			return false;
		}
		// DAY CHECK
		if (m[3].length < 2 || m[3] < 1 || m[3] > 31) {
			return false;
		}

		return true;
	},
	isValidDateOrEmpty: function isValidDateOrEmpty(str) {
		if (str === '') {
			return true;
		} else {
			return DateUtils.isValidDate(str);
		}
	},
	getFromDate: function getFromDate(yearMinus) {
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
	},
	getToDate: function getToDate() {
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
	},
	formatTo: function formatTo(millisUTC) {
		var d = new Date(millisUTC);
		return ("0" + d.getUTCDate()).slice(-2) + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + d.getUTCFullYear();
	},
	createEurostatSelect: function createEurostatSelect() {
		var frequency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'M';
		var mapDateDf = arguments[1];

		if (frequency === 'M') {
			return _fnForMonthSelect(mapDateDf);
		} else if (frequency === 'Q') {
			return _fnForQuarterSelect(mapDateDf);
		} else if (frequency === 'Y') {
			return _fnForYearSelect(mapDateDf);
		}
	},
	dmyToUTC: function dmyToUTC(str) {
		var _str = str || '',
		    _str$toString$split = _str.toString().split('-'),
		    _str$toString$split2 = (0, _slicedToArray3.default)(_str$toString$split, 3),
		    _str$toString$split2$ = _str$toString$split2[0],
		    d = _str$toString$split2$ === undefined ? 10 : _str$toString$split2$,
		    _str$toString$split2$2 = _str$toString$split2[1],
		    m = _str$toString$split2$2 === undefined ? 10 : _str$toString$split2$2,
		    _str$toString$split2$3 = _str$toString$split2[2],
		    y = _str$toString$split2$3 === undefined ? 1000 : _str$toString$split2$3;

		if (DateUtils.isValidDate(y + '-' + m + '-' + d)) {
			return Date.UTC(y, parseInt(m, 10) - 1, d);
		} else {
			return 0;
		}
	},
	isFormatDmy: function isFormatDmy(str) {
		var _str = str || '',
		    _str$toString$split3 = _str.toString().split('-'),
		    _str$toString$split4 = (0, _slicedToArray3.default)(_str$toString$split3, 3),
		    _str$toString$split4$ = _str$toString$split4[0],
		    d = _str$toString$split4$ === undefined ? 10 : _str$toString$split4$,
		    _str$toString$split4$2 = _str$toString$split4[1],
		    m = _str$toString$split4$2 === undefined ? 10 : _str$toString$split4$2,
		    _str$toString$split4$3 = _str$toString$split4[2],
		    y = _str$toString$split4$3 === undefined ? 1000 : _str$toString$split4$3;

		return DateUtils.isValidDate(y + '-' + m + '-' + d);
	}
};

exports.default = DateUtils;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\DateUtils.js.map