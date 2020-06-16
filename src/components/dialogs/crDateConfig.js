
const C = {
  DF_PLACEHOLDER: 'Before Select Metric',
  YEAR_MAX: 12,
  BI_YEAR_MAX: 24,
  Q_YEAR_MAX: 4,
  M_YEAR_MAX: 3
};

const _getDfDate = (dateOptions, dfIndex) => {
  return (dateOptions[dfIndex] || {}).value;
};

const _addYearMonthsTo = (dateOptions, y) => {
	let m = (new Date()).getUTCMonth()
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
  const m = (new Date()).getUTCMonth()
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

const _crDateConfig = (dateOptions, mapDateDf) => ({
  dateOptions,
  dateDefault: _getDfDate(dateOptions, mapDateDf)
});

const _yearMonthConfig = (mapDateDf=2) => {
	const dateOptions = []
			, y = (new Date()).getUTCFullYear();
  for(let i=0; i<C.M_YEAR_MAX; i++){
    _addYearMonthsTo(dateOptions, y-i);
  }
	return _crDateConfig(dateOptions, mapDateDf);
};

const _yearQuarterConfig = (mapDateDf=1, delimeter='Q') => {
	const dateOptions = []
      , y = (new Date()).getUTCFullYear();
  for(let i=0; i<C.Q_YEAR_MAX; i++){
    _addYearQuartesTo(dateOptions, y-i, delimeter)
  }
	return _crDateConfig(dateOptions, mapDateDf);
};


const _yearBiAnnualConfig = (mapDateDf=3) => {
  const dateOptions = [];
  let y = (new Date()).getUTCFullYear()
  for(let i=0; i<C.BI_YEAR_MAX; i++){
    dateOptions.push(
      { caption: `${y}S2`, value: `${y}S2`},
      { caption: `${y}S1`, value: `${y}S1`}
    )
    y = y - 1;
  }
  return _crDateConfig(dateOptions, mapDateDf);
};

const _yearConfig = function(mapDateDf=1){
	const dateOptions = [];
  let y = (new Date()).getUTCFullYear();
	for (let i=0; i<C.YEAR_MAX; i++){
		dateOptions.push({
			caption: ''+y,
			value: ''+y
		});
		y = y - 1;
	}
	return _crDateConfig(dateOptions, mapDateDf);
}

const _emptyConfig = () => ({
  dateDefault: C.DF_PLACEHOLDER,
  dateOptions: []
});

const crDateConfig = (frequency='M', mapDateDf) => {
   switch (frequency){
     case 'M':
       return _yearMonthConfig(mapDateDf);
     case 'Q':
     case 'K':
       return _yearQuarterConfig(mapDateDf, frequency);
     case 'S':
       return _yearBiAnnualConfig();
     case 'Y':
       return _yearConfig(mapDateDf);
     case 'EMPTY':
       return _emptyConfig();
     default:
       return _yearConfig(mapDateDf);
   }
}

export default crDateConfig
