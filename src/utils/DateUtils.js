
const _fnForMonthSelect = function(mapDateDf=2){
	const options = []
	, dNow = new Date(Date.now())

	let dateDefault
	, y = dNow.getUTCFullYear()
	, m = dNow.getUTCMonth()
	, i;

	for(i=0; i<10; i++){
		m = m - 1;
		if (m > -1){
			options.push({
				caption: `${y}M${ (m+1>9) ? m+1 : '0'+(m+1)}`,
				value : `${y}M${ (m+1>9) ? m+1 : '0'+(m+1)}`
			})
		} else {
			m = 11;
			y = y - 1;
			options.push({
				caption: `${y}M12`,
				value : `${y}M12`
			})
		}
		if (i === mapDateDf){
			dateDefault = `${y}M${ (m+1>9) ? m+1 : '0'+(m+1)}`
		}
	}

	return { options, dateDefault };
}

const _fnForQuarterSelect = function(mapDateDf=1, delimeter='Q'){
	const options = []
	, dNow = new Date(Date.now())

	let dateDefault
	, y = dNow.getUTCFullYear()
	, m = dNow.getUTCMonth()
	, _c = Math.floor( (m + 1) / 3)
	, qNow = ( _c === 4 )
	      ? 4
				: _c + 1;

	qNow = qNow - 1;
	let i;
	for (i=0; i<4; i++){
		 if (qNow < 1) { y = y - 1; qNow = 4; }

		 options.push({
			 caption : `${y}${delimeter}${qNow}`,
			 value : `${y}${delimeter}${qNow}`
		 })

		 if (i === mapDateDf) {
		    dateDefault = `${y}${delimeter}${qNow}`
		 }

		 qNow = qNow - 1;
	}

	return { options, dateDefault };
};

const _fnForYearSelect = function(mapDateDf=1){
	const options = []
	, dNow = new Date(Date.now())

	let dateDefault
	, y = dNow.getUTCFullYear()
  , i;
	for (i=0; i<8; i++){
		options.push({
			caption: ''+y,
			value: ''+y
		});
		if ( i === mapDateDf) {
			dateDefault = ''+y;
		}
		y = y - 1;
	}

	return { options, dateDefault };
}

const DateUtils = {

	isValidDate(str, nForecastDate=0){
		 // STRING FORMAT yyyy-mm-dd

		 if ( Object.prototype.toString.call(str) !== "[object String]" ||
	        !str || str.trim().length !== 10 ) {
		    return false;
		 }

		 // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
		 let m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

		 // STR IS NOT FIT m IS NOT OBJECT
		 if( m === null || typeof m !== 'object') { return false; }

		 // CHECK m TYPE
		 if (typeof m !== 'object' && m !== null && m.size!==3) { return false; }

		 let thisYear = new Date().getFullYear();
		 let minYear = 1999;

		// YEAR CHECK
		 if( (m[1].length < 4) || m[1] < minYear || m[1] > thisYear + nForecastDate) { return false; }
		// MONTH CHECK
		 if( (m[2].length < 2) || m[2] < 1 || m[2] > 12) { return false;}
		// DAY CHECK
		 if( (m[3].length < 2) || m[3] < 1 || m[3] > 31) { return false;}

		 return true;
	},

	isValidDateOrEmpty(str){
		if ( str === '') {
			return true;
		} else {
			return DateUtils.isValidDate(str);
		}
	},

	getFromDate(yearMinus){
		const dateNow = new Date()
		    , yearTo = dateNow.getUTCFullYear();

		let monthTo = dateNow.getUTCMonth() + 1;
		if ( monthTo<10 ){
			monthTo = "0" + monthTo;
		}

		let dayTo = dateNow.getUTCDate();
		if ( dayTo<10 ){
			dayTo = "0" + dayTo;
		}

		return (yearTo-yearMinus) + "-" + monthTo + "-" + dayTo;
	},

	getToDate(){
		const dateNow = new Date()
		    , yearTo = dateNow.getUTCFullYear();

		let monthTo = dateNow.getUTCMonth() + 1;
		if ( monthTo<10 ){
			monthTo = "0" + monthTo;
		}

		let dayTo = dateNow.getUTCDate();
		if ( dayTo<10 ){
			dayTo = "0" + dayTo;
		}

		return yearTo + "-" + monthTo + "-" + dayTo;
	},

	formatTo(millisUTC){
	  const d = new Date(millisUTC);
	  return ("0" + d.getUTCDate()).slice(-2)
	         + "-" + ("0" + (d.getUTCMonth() + 1) ).slice(-2)
	         + "-" + d.getUTCFullYear() ;
	},

	createEurostatSelect(frequency='M', mapDateDf){
		 if (frequency === 'M'){
			 return _fnForMonthSelect(mapDateDf);
		 } else if ( frequency === 'Q'){
			 return _fnForQuarterSelect(mapDateDf);
		 } else if ( frequency === 'K') {
			 return _fnForQuarterSelect(mapDateDf, 'K');
		 } else if ( frequency === 'Y'){
			 return _fnForYearSelect(mapDateDf);
		 }
	},

 dmyToUTC(str){
	  const _str = str || ''
		    , [ d=10, m=10, y=1970 ] = _str.toString().split('-');
		if (DateUtils.isValidDate(`${y}-${m}-${d}`)){
			return Date.UTC(y, (parseInt(m, 10)-1), d)
		} else {
			return 0;
		}
 },

 isFormatDmy(str){
	 const _str = str || ''
			 , [ d=10, m=10, y=1000 ] = _str.toString().split('-');
		return DateUtils.isValidDate(`${y}-${m}-${d}`);
 }

};

export default DateUtils;
