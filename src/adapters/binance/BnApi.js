import dt from '../../utils/DateUtils'

const C = {
  URL: 'https://api.binance.com/api/v3/klines?interval=1d'
}

const _isArr = Array.isArray;

const _crDays = ({ fromDate }) => {
  const _d = dt.getDaysFromYmd(fromDate);
  return _d < 1001 ? _d : 1000;
};

const _setCaption = (option, _to) => {
  const { title } = option;
  option.title = title.replace(')',`/${_to})`)
  option.subtitle = ''
}

const BnApi = {
  getRequestUrl(option){
    const { items } = option
    , _symbol = items[0].s
    , _to = items[1].v
    , _limit = _crDays(option)
    _setCaption(option, _to)
    return `${C.URL}&symbol=${_symbol}${_to}&limit=${_limit}`;
  },

  checkResponse(json, option){
    if (_isArr(json)) {
      return true;
    }
    throw {
      errCaption: "Response Empty",
    };
  }
}

export default BnApi
