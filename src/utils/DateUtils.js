
const MIN_YEAR = 1990;
const DAY_IN_MLS = 1000*60*60*24;

const _isNaN = Number.isNaN || isNaN;
const _isStr = str => typeof str === 'string';
const _pad2 = n => n<10 ? '0'+n : ''+n;

const _isLikelyQuarter = (str) => _isStr(str)
  && str[0].toUpperCase() === 'Q';


const _toIntMonth = str => parseInt(str, 10)-1;

const DateUtils = {

  //YYYY-MM-DD valid format
	isYmd(str, nForecastDate=0, minYear=MIN_YEAR){
     if (typeof str !== 'string') {
			 return false;
		 }
		 const _str = str.trim();
		 if (_str.length !== 10) {
			 return false;
		 }

		 // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
		 const m = _str.match(/(\d{4})-(\d{2})-(\d{2})/);

		 // STR IS NOT FIT m IS NOT OBJECT
		 if( m === null || typeof m !== 'object' || m.length!==4) {
			 return false;
		 }

		 const thisYear = new Date().getFullYear();

		// YEAR CHECK
		 if( (m[1].length < 4) || m[1] < minYear || m[1] > thisYear + nForecastDate) {
       return false;
     }
		// MONTH CHECK
		 if( (m[2].length < 2) || m[2] < 1 || m[2] > 12) {
       return false;
     }
		// DAY CHECK
		 if( (m[3].length < 2) || m[3] < 1 || m[3] > 31) {
       return false;
     }

		 return true;
	},

	isYmdOrEmpty(str){
		return (str === '')
		  ? true
			: DateUtils.isYmd(str);
	},

	getFromDate(yearMinus=2){
		const dNow = new Date();
		return (dNow.getUTCFullYear()-yearMinus)
		   + "-" + ("0"+(dNow.getUTCMonth() + 1)).slice(-2)
			 + "-" + ("0"+dNow.getUTCDate()).slice(-2);
	},

	getToDate(){
		return DateUtils.getFromDate(0);
	},

	mlsToDmy(mlsUTC){
		if (typeof mlsUTC !== 'number'
		    || !isFinite(mlsUTC)
		) {
			return '';
		}
		const d = new Date(mlsUTC);
		if (d.toString() === 'Invalid Date') {
			return '';
		}
	  return ("0" + d.getUTCDate()).slice(-2)
	         + "-" + ("0" + (d.getUTCMonth() + 1) ).slice(-2)
	         + "-" + d.getUTCFullYear() ;
	},

 dmyToUTC(str){
	  const _str = str || ''
		, [ d=10, m=10, y=1970 ] = _str.toString().split('-');
    return DateUtils.isYmd(`${y}-${m}-${d}`)
      ? Date.UTC(y, _toIntMonth(m), d)
      : 0;
 },

 dmyToMls(str){
	 const _str = str || ''
	 , [ d, m, y ] = _str.toString().split('-');
	 return Date.UTC(y, (parseInt(m, 10)-1), d);
 },

 isDmyPeriod: (from, to) => DateUtils
   .dmyToMls(from) <= DateUtils.dmyToMls(to),

 isDmy(str, minYear=MIN_YEAR){
	 const _str = str || ''
	 , [ d=10, m=10, y=minYear-1 ] = _str.toString().split('-');
	 return DateUtils.isYmd(`${y}-${m}-${d}`, 0, minYear);
 },

 ymdToUTC: (dateStr, option={}) => {
	 const _dateStr = dateStr || ''
   , _arr = _dateStr.split('-')
	 , _len = _arr.length
   , [yearStr, mStr, dStr] = _arr;
	 if (_len === 3) {
		 return Date.UTC(yearStr, _toIntMonth(mStr), dStr);
	 } else if ( _len === 2 && mStr !== ''){
		 const _m = parseInt(mStr, 10);
		 if (!_isNaN(_m)) {
				const _d = (new Date(yearStr, _m, 0)).getDate();
		    return Date.UTC(yearStr, _m - 1, _d);
		 // YYYY-Q format
	   } else if (_isLikelyQuarter(_arr[1])) {
			  const _q = parseInt(_arr[1][1], 10);
				return !_isNaN(_q)
				  ? Date.UTC( _arr[0], _q*3 - 1, 30)
					: _q;
		 } else {
			 return _m;
		 }
	 } else if ( _len === 1) {
     const { y=0 } = option
     , _y = parseInt(yearStr, 10) - y;
		 return !_isNaN(_y)
       ? Date.UTC(_y, 11, 31)
       : _y;
	 }
 },
 ymdtToUTC(dateStr) {
	 const _arr = dateStr.split('-')
			 , _d = _arr[2].split(' ')[0];
	 return Date.UTC(
		 _arr[0], (parseInt(_arr[1], 10)-1), _d
	 );
 },
 ymdhmsToUTC(dateStr) {
	 const _dtArr = dateStr.split(' ')
	 , _ymdArr = _dtArr[0].split('-')
	 , _hmsArr = _dtArr[1].split(':');
	 return Date.UTC(
		 _ymdArr[0], (parseInt(_ymdArr[1], 10)-1), _ymdArr[2],
		 _hmsArr[0], _hmsArr[1], _hmsArr[2]
	 );
 },

 getUTCTime: (ms) => {
	 if (!Number.isInteger(ms)) {
     return '';
   }
   const _d = new Date(ms);
   return `${_pad2(_d.getUTCHours())}:${_pad2(_d.getUTCMinutes())}`;
 },

  addToDmy: (dmy, month) => {
	 if (!DateUtils.isDmy(dmy))	{
		 return new Date(0);
	 }
	 if (!Number.isInteger(month))	{
		 return new Date(DateUtils.dmyToUTC(dmy));
	 }
   const _to = new Date(DateUtils.dmyToUTC(dmy));
   return new Date(_to.setUTCMonth(_to.getUTCMonth()+month));
 },

 getYTDfromDmy: (dmy) => {
	 const _year = dmy.split('-')[2];
	 return DateUtils.dmyToUTC(`01-01-${_year}`)
 },

 getDaysFromYmd: ymd => {
   const _fromMls = DateUtils.ymdToUTC(ymd);
   return Math.ceil(((new Date()).getTime() - _fromMls)/DAY_IN_MLS);
 }

};

export default DateUtils;
