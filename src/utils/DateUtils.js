
const MIN_YEAR = 1990;

const _pad2 = n => n<10 ? '0'+n : ''+n;

const DateUtils = {

  //YYYY-MM-DD valid format
	isYmd(str, nForecastDate=0){
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
		 if( (m[1].length < 4) || m[1] < MIN_YEAR || m[1] > thisYear + nForecastDate) { return false; }
		// MONTH CHECK
		 if( (m[2].length < 2) || m[2] < 1 || m[2] > 12) { return false;}
		// DAY CHECK
		 if( (m[3].length < 2) || m[3] < 1 || m[3] > 31) { return false;}

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
		if (DateUtils.isYmd(`${y}-${m}-${d}`)){
			return Date.UTC(y, (parseInt(m, 10)-1), d)
		} else {
			return 0;
		}
 },

 isDmy(str){
	 const _str = str || ''
	 , [ d=10, m=10, y=MIN_YEAR-1 ] = _str.toString().split('-');
	 return DateUtils.isYmd(`${y}-${m}-${d}`);
 },

 ymdToUTC: (dateStr) => {
	 const _arr = dateStr.split('-')
			 , _len = _arr.length;
	 if (_len === 3) {
		 return Date.UTC( _arr[0], (parseInt(_arr[1], 10)-1), _arr[2] );
	 } else if ( _len === 2 && _arr[1] !== ''){
		 const _m = parseInt(_arr[1], 10)
				 , _d = (new Date(_arr[0], _m, 0)).getDate();
		 return Date.UTC( _arr[0], _m - 1, _d );
	 } else if ( _len === 1) {
		 return Date.UTC( _arr[0], 11, 31 );
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
 }

};

export default DateUtils;
