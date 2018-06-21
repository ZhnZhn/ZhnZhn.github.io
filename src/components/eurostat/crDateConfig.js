
const _nowDate = () => new Date();

const _getDfDate = (dateOptions, dfIndex) => {
  return (dateOptions[dfIndex] || {}).value;
}

const _addYearMonthsTo = (dateOptions, y) => {
	let m = _nowDate().getUTCMonth()
	  , _m, _caption, i;
	for(i=0; i<12; i++){
		m = m - 1;
		if (m > -1){
			_m = (m+1>9) ? m+1 : '0'+(m+1);
			_caption = `${y}M${_m}`
		} else {
			m = 11;
			y = y - 1;
			_caption = `${y}M12`;
		}
		dateOptions.push({
			caption: _caption,
			value: _caption
		})
	}
};

const _addYearQuartesTo = (dateOptions, y, delimeter) => {
  const m = _nowDate().getUTCMonth()
      , _c = Math.floor( (m + 1) / 3);
  let qNow = ( _c === 4 ) ? 3 : _c ;

  let i;
  for (i=0; i<4; i++){
    if (qNow < 1) { y = y - 1; qNow = 4; }
    dateOptions.push({
      caption: `${y}${delimeter}${qNow}`,
      value: `${y}${delimeter}${qNow}`
    })
    qNow = qNow - 1;
  }
};


const _yearMonthConfig = (mapDateDf=2) => {
	const dateOptions = []
			, y = _nowDate().getUTCFullYear();
  _addYearMonthsTo(dateOptions, y);
	_addYearMonthsTo(dateOptions, y-1)
  const dateDefault = _getDfDate(dateOptions, mapDateDf)

	return { dateOptions, dateDefault };
}

const _yearQuarterConfig = (mapDateDf=1, delimeter='Q') => {
	const dateOptions = []
      , y = _nowDate().getUTCFullYear();

  _addYearQuartesTo(dateOptions, y, delimeter)
  _addYearQuartesTo(dateOptions, y-1, delimeter)

  const dateDefault = _getDfDate(dateOptions, mapDateDf);

	return { dateOptions, dateDefault };
};


const _yearBiAnnualConfig = (mapDateDf=3) => {
  const dateOptions = [];
  let y = _nowDate().getUTCFullYear()
    , i = 0;
  for(;i<4;i++){
    dateOptions.push(
      { caption: `${y}S2`, value: `${y}S2`},
      { caption: `${y}S1`, value: `${y}S1`}
    )
    y = y - 1;
  }
  return {
    dateOptions,
    dateDefault: _getDfDate(dateOptions, mapDateDf)
   };
};


const _yearConfig = function(mapDateDf=1){
	const dateOptions = []
	    , dNow = _nowDate();

	let y = dNow.getUTCFullYear()
  , i;
	for (i=0; i<8; i++){
		dateOptions.push({
			caption: ''+y,
			value: ''+y
		});
		y = y - 1;
	}
  const dateDefault = _getDfDate(dateOptions, mapDateDf)

	return { dateOptions, dateDefault };
}

const  PLACEHOLDER = 'Before Select Metric';
const _emptyConfig = () => ({
  dateDefault: PLACEHOLDER,
  dateOptions: []
});

const crDateConfig = (frequency='M', mapDateDf) => {
   switch (frequency){
     case 'M': return _yearMonthConfig(mapDateDf);
     case 'Q': case 'K':
       return _yearQuarterConfig(mapDateDf, frequency);
     case 'S': return _yearBiAnnualConfig();
     case 'Y': return _yearConfig(mapDateDf);
     case 'EMPTY': return _emptyConfig();
     default: return _yearConfig(mapDateDf);
   }
}

export default crDateConfig
