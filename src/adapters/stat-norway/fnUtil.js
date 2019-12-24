
import compose from '../../utils/compose'

const fnUtil = {
  compose,
  toUTC: (str) => {
      if (str.indexOf('M') !== -1) {
        const arrDate = str.split('M')
            , _month = parseInt(arrDate[1], 10)-1
            , _day = (_month === 1) ? 28 : 30

        return Date.UTC(arrDate[0], _month, _day);
      } else if (str.indexOf('Q') !== -1) {
        const arrDate = str.split('Q')
            , _month = (parseInt(arrDate[1], 10)*3) - 1

        return Date.UTC(arrDate[0], _month, 30);
      } else if (str.indexOf('K') !== -1) {
        const arrDate = str.split('K')
            , _month = (parseInt(arrDate[1], 10)*3) - 1

        return Date.UTC(arrDate[0], _month, 30);
      } else {
        return Date.UTC(str, 11, 31);
      }
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
