'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateUtils = {

	//YYYY-MM-DD valid format
	isYmd: function isYmd(str) {
		var nForecastDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		if (typeof str !== 'string') {
			return false;
		}
		var _str = str.trim();
		if (_str.length !== 10) {
			return false;
		}

		// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
		var m = _str.match(/(\d{4})-(\d{2})-(\d{2})/);

		// STR IS NOT FIT m IS NOT OBJECT
		if (m === null || (typeof m === 'undefined' ? 'undefined' : (0, _typeof3.default)(m)) !== 'object' || m.length !== 4) {
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
	isYmdOrEmpty: function isYmdOrEmpty(str) {
		return str === '' ? true : DateUtils.isYmd(str);
	},
	getFromDate: function getFromDate() {
		var yearMinus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

		var dNow = new Date();
		return dNow.getUTCFullYear() - yearMinus + "-" + ("0" + (dNow.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + dNow.getUTCDate()).slice(-2);
	},
	getToDate: function getToDate() {
		return DateUtils.getFromDate(0);
	},
	formatTo: function formatTo(mlsUTC) {
		if (typeof mlsUTC !== 'number' || !isFinite(mlsUTC)) {
			return '';
		}
		var d = new Date(mlsUTC);
		if (d.toString() === 'Invalid Date') {
			return '';
		}
		return ("0" + d.getUTCDate()).slice(-2) + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + d.getUTCFullYear();
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
		    y = _str$toString$split2$3 === undefined ? 1970 : _str$toString$split2$3;

		if (DateUtils.isYmd(y + '-' + m + '-' + d)) {
			return Date.UTC(y, parseInt(m, 10) - 1, d);
		} else {
			return 0;
		}
	},
	isDmy: function isDmy(str) {
		var _str = str || '',
		    _str$toString$split3 = _str.toString().split('-'),
		    _str$toString$split4 = (0, _slicedToArray3.default)(_str$toString$split3, 3),
		    _str$toString$split4$ = _str$toString$split4[0],
		    d = _str$toString$split4$ === undefined ? 10 : _str$toString$split4$,
		    _str$toString$split4$2 = _str$toString$split4[1],
		    m = _str$toString$split4$2 === undefined ? 10 : _str$toString$split4$2,
		    _str$toString$split4$3 = _str$toString$split4[2],
		    y = _str$toString$split4$3 === undefined ? 1970 : _str$toString$split4$3;

		return DateUtils.isYmd(y + '-' + m + '-' + d);
	}
};

exports.default = DateUtils;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\DateUtils.js.map