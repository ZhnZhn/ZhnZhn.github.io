import {
  isDateDelimeterDash,
  isEstat
} from '../../../constants/LoadType';

const YEAR_MAX = 25
, BI_YEAR_MAX = 25
, Q_YEAR_MAX = 12
, M_YEAR_MAX = 6;

const _getCurrentDate = () => new Date()
, _getYear = date => date.getUTCFullYear()
, _getCurrentYear = () => _getYear(_getCurrentDate())
, _getMonth = date => date.getUTCMonth()
, _getCurrentMonth = () => _getMonth(_getCurrentDate());

const _crArrByFn = (
  fn,
  fromValue,
  n
) => {
  const arr = [];
  for(let i=0; i<n; i++) {
    fn(arr, fromValue-i)
  }
  return arr;
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
	let m = _getCurrentMonth()
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

const _addCurrentMonthIfTo = (
  dateOptions,
  currentDate,
  delimeter
) => {
  const currentMonth = _getMonth(currentDate);
  currentDate.setDate(currentDate.getDate() + 1)

  const _m = _getMonth(currentDate)
  , _nextMonthOption = _m === currentMonth
      ? void 0
      : _crDateOption(`${_getYear(currentDate)}${delimeter}${_m}`);
  if (_nextMonthOption) {
    dateOptions.unshift(_nextMonthOption)
  }
};

const _crYearMonthConfig = (
  loadId,
  mapDateDf=2
) => {
	const currentDate = _getCurrentDate()
  , _delimeter = isDateDelimeterDash(loadId)
      ? '-'
      : 'M'
  , dateOptions = _crArrByFn((arr, y) => {
    _addYearMonthsTo(arr, y, _delimeter);
  }, _getYear(currentDate), M_YEAR_MAX);

  if (isEstat(loadId)) {
    _addCurrentMonthIfTo(
      dateOptions,
      currentDate,
      _delimeter
    )
  }

	return _crDateConfig(dateOptions, mapDateDf);
};

const _addYearQuartesTo = (
  dateOptions,
  y,
  delimeter
) => {
  const m = _getCurrentMonth()
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

const _crYearQuarterConfig = (
  loadId,
  mapDateDf=1,
  delimeter
) => {
	const _delimeter = isDateDelimeterDash(loadId)
     ? '-'+delimeter
     : delimeter
  , dateOptions = _crArrByFn((arr, y) => {
    _addYearQuartesTo(arr, y, _delimeter)
  }, _getCurrentYear(), Q_YEAR_MAX);

	return _crDateConfig(dateOptions, mapDateDf);
};


const _crYearBiAnnualConfig = (
  loadId,
  mapDateDf=3
) => {
  const _delimeter = isEstat(loadId)
    ? '-S'
    : 'S'
  , dateOptions = _crArrByFn((arr, y) => {
      arr.push(
        _crDateOption(`${y}${_delimeter}2`),
        _crDateOption(`${y}${_delimeter}1`)
      )
  }, _getCurrentYear(), BI_YEAR_MAX);

  return _crDateConfig(dateOptions, mapDateDf);
};

const _crYearConfig = (
  loadId,
  mapDateDf=1
) => {
	const dateOptions = _crArrByFn((arr, y) => {
    arr.push(_crDateOption(''+y));
  }, _getCurrentYear() - 1, YEAR_MAX);

	return _crDateConfig(
    dateOptions,
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
