
const MIN_YEAR = 1999;

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

	formatTo(mlsUTC){
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
			 , [ d=10, m=10, y=1970 ] = _str.toString().split('-');
		return DateUtils.isYmd(`${y}-${m}-${d}`);
 },

 ymdToUTC: (str) => {	  
    const arrDate = str.split('-');
    return  Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]);
 }


};

export default DateUtils;
