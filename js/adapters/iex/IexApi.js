"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));

const API_URL = 'https://cloud.iexapis.com/stable/stock',
      DF_SYMBOL = 'AAPL',
      DF_PERIOD = '1m'; //company, stats: symbol/dfType

const _crUrlType1 = option => {
  const {
    items = [],
    dfType
  } = option,
        value = (0, _AdapterFn.getValue)(items[0]);
  option.value = value;
  return API_URL + "/" + value + "/" + dfType;
};

const _urlDividends = option => {
  const {
    items = [],
    dfPeriod
  } = option,
        value = (0, _AdapterFn.getValue)(items[0]);
  option.value = value;
  return API_URL + "/" + value + "/dividends/" + dfPeriod;
};

const _urlChart = option => {
  const {
    items = [],
    one,
    two,
    value,
    dfPeriod
  } = option // one, two deprecated option remains for watch compatibility
  // value, dfPeriod for stock by sector
  ,
        symbol = one || value || (0, _AdapterFn.getValue)(items[0], {
    dfValue: DF_SYMBOL
  }),
        period = two || dfPeriod || (0, _AdapterFn.getValue)(items[1], {
    dfValue: DF_PERIOD
  });
  (0, _AdapterFn.assign)(option, {
    symbol,
    period
  });
  return API_URL + "/" + symbol + "/chart/" + period;
};

const _crUrlMarketList = option => {
  const {
    items = []
  } = option,
        value = (0, _AdapterFn.getValue)(items[0]);
  return {
    url: API_URL + "/market/list/" + value,
    q: 'listLimit=20&displayPercent=true'
  };
};

const _rUrl = {
  DF: _urlChart,
  [_ItemTypes.default.DIV]: _urlDividends,
  [_ItemTypes.default.CHART]: _urlChart,
  [_ItemTypes.default.COM]: _crUrlType1,
  [_ItemTypes.default.STA]: _crUrlType1,
  [_ItemTypes.default.ML]: _crUrlMarketList
};
const IexApi = {
  getRequestUrl(option) {
    const {
      dfType,
      apiKey
    } = option,
          _url = (_rUrl[dfType] || _rUrl.DF)(option);

    return _url.q ? _url.url + "?" + _url.q + "&token=" + apiKey : _url + "?token=" + apiKey;
  },

  checkResponse(json) {
    if (!json) {
      throw (0, _AdapterFn.crError)();
    }

    return true;
  }

};
var _default = IexApi;
exports.default = _default;
//# sourceMappingURL=IexApi.js.map