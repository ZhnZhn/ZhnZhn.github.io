import {
  isEstat,
  isEmber,
  isEia
} from '../../../constants/LoadType';

const YEAR_MAX = 12
, BI_YEAR_MAX = 24
, Q_YEAR_MAX = 4
, M_YEAR_MAX = 3;

const _loopFn = (
  fn,
  n,
  initialNumber=0
) => {
  for (let i=initialNumber; i<n; i++){
		fn(i)
	}
};

const _crDateOption = (
  caption,
  value=caption
) => ({
  caption,
  value
});

const _getDfDate = (
  dateOptions,
  dfIndex
) => typeof dfIndex === 'number'
  ? (dateOptions[dfIndex] || {}).value || ''
  : '';

// [dateOptions, dateDefault]
const _crDateConfig = (
  dateOptions=[],
  mapDateDf
) => [
  dateOptions,
  _getDfDate(dateOptions, mapDateDf)
];

const _addYearMonthsTo = (
  dateOptions,
  y,
  delimeter
) => {
	let m = (new Date()).getUTCMonth()
	, _m, _caption;
	for(let i=0; i<12; i++){
		m = m - 1;
		if (m > -1){
			_m = (m+1>9) ? m+1 : '0'+(m+1);
			_caption = `${y}${delimeter}${_m}`
		} else {
			m = 11;
			y = y - 1;
			_caption = `${y}${delimeter}12`;
		}
		dateOptions.push(_crDateOption(_caption))
	}
};


const _addYearQuartesTo = (
  dateOptions,
  y,
  delimeter
) => {
  const m = (new Date()).getUTCMonth()
  , _c = Math.floor( (m + 1) / 3);
  let qNow = ( _c === 4 ) ? 3 : _c ;

  for (let i=0; i<4; i++){
    if (qNow < 1) { y = y - 1; qNow = 4; }
    dateOptions.push(_crDateOption(
      `${y}${delimeter}${qNow}`
    ))
    qNow = qNow - 1;
  }
};

const _crYearMonthConfig = (
  loadId,
  mapDateDf=2
) => {
	const dateOptions = []
  , y = (new Date()).getUTCFullYear()
  , _delimeter = isEstat(loadId) || isEmber(loadId) || isEia(loadId)
      ? '-'
      : 'M';
  for(let i=0; i<M_YEAR_MAX; i++){
    _addYearMonthsTo(dateOptions, y-i, _delimeter);
  }
	return _crDateConfig(dateOptions, mapDateDf);
};

const _crYearQuarterConfig = (
  loadId,
  mapDateDf=1,
  delimeter
) => {
	const dateOptions = []
  , y = (new Date()).getUTCFullYear()
  , _delimeter = isEstat(loadId)
     ? '-'+delimeter
     : delimeter;
  for(let i=0; i<Q_YEAR_MAX; i++){
    _addYearQuartesTo(dateOptions, y-i, _delimeter)
  }
	return _crDateConfig(dateOptions, mapDateDf);
};


const _crYearBiAnnualConfig = (
  loadId,
  mapDateDf=3
) => {
  const dateOptions = []
  , _delimeter = isEstat(loadId)
       ? '-S'
       : 'S';
  let y = (new Date()).getUTCFullYear();
  for(let i=0; i<BI_YEAR_MAX; i++){
    dateOptions.push(
      _crDateOption(`${y}${_delimeter}2`),
      _crDateOption(`${y}${_delimeter}1`),
    )
    y = y - 1;
  }
  return _crDateConfig(dateOptions, mapDateDf);
};

const _crYearConfig = (
  loadId,
  mapDateDf=1
) => {
	const dateOptions = []
  , yNow = (new Date()).getUTCFullYear() - 1;
  _loopFn(y => {
    dateOptions.push(_crDateOption(''+y));
  }, YEAR_MAX, yNow - YEAR_MAX)
	return _crDateConfig(
    dateOptions.reverse(),
    mapDateDf - 1
  );
};

const _hmCr = {
  M: _crYearMonthConfig,

  Q: _crYearQuarterConfig,
  K: _crYearQuarterConfig,

  S: _crYearBiAnnualConfig,
  Y: _crYearConfig,
  EMPTY: _crDateConfig,

  DF: _crYearConfig,
};

const crDateConfig = (
  frequency='M',
  mapDateDf,
  loadId
) => (_hmCr[frequency] || _hmCr.DF)(
    loadId,
    mapDateDf,
    frequency
  );

export default crDateConfig
