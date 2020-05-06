
import compose from '../../utils/compose'

const _toMonthUTC = str => {
  const arrDate = str.split('M')
  , _month = parseInt(arrDate[1], 10)-1
  , _day = (_month === 1) ? 28 : 30;
  return Date.UTC(arrDate[0], _month, _day);
};

const _toQuarterUTC = (quaterChart, str) => {
  const arrDate = str.split(quaterChart)
  , _month = (parseInt(arrDate[1], 10)*3) - 1;
  return Date.UTC(arrDate[0], _month, 30);
};

const _toYearUTC = str => Date.UTC(str, 11, 31);

const fnUtil = {
  compose,
  toUTC: (str) => {
    str = str.toUpperCase()
    if (str.indexOf('M') !== -1) {
      return _toMonthUTC(str);
    }
    if (str.indexOf('Q') !== -1) {
      return _toQuarterUTC('Q', str);
    }
    if (str.indexOf('K') !== -1) {
      return _toQuarterUTC('K', str);
    }
    return _toYearUTC(str);
  },

  toYMD: (str) => {
    const ms = fnUtil.toUTC(str)
        , d = new Date(ms);
    return d.getUTCFullYear()
      + "-" + ("0" + (d.getUTCMonth() + 1) ).slice(-2)
      + "-" + ("0" + d.getUTCDate()).slice(-2);
  }
}

export default fnUtil
