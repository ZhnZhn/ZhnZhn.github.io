'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ALL: 'all',
  BU_ALL_PARAMS: 'p=0&max=3000',
  NU_ALL_PARAMS: 'p=0',
  //rg=2 Export
  BU_PREFIX: 'https://comtrade.un.org/api/get?fmt=JSON&head=M&freq=A&px=H4&ps=recent',
  //BASE_URL: 'https://comtrade.un.org/api/get?fmt=JSON&r=68&freq=A&px=H4&cc=100850&rg=2&ps=2010'
  NU_PREFIX: 'https://comtrade.un.org/db/dqBasicQueryResults.aspx?px=H4&y=2016&so=1001',

  DF_RG: 2,
  DF_MEASURE: 'NetWeight'
};

var UnComtradeApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$one = option.one,
        one = _option$one === undefined ? C.ALL : _option$one,
        two = option.two,
        _option$rg = option.rg,
        rg = _option$rg === undefined ? 2 : _option$rg;

    if (one !== C.ALL) {
      option.nativeHref = C.NU_PREFIX + '&r=' + one + '&cc=' + two;
      return C.BU_PREFIX + '&rg=' + rg + '&r=' + one + '&cc=' + two;
    } else {
      option.nativeHref = C.NU_PREFIX + '&' + C.NU_ALL_PARAMS + '&r=' + one + '&cc=' + two;
      return C.BU_PREFIX + '&' + C.BU_ALL_PARAMS + '&rg=' + rg + '&r=' + one + '&cc=' + two;
    }
  },
  checkResponse: function checkResponse(json) {
    return true;
  },
  addPropsTo: function addPropsTo(option) {
    var one = option.one,
        v = option.v,
        _option$rg2 = option.rg,
        rg = _option$rg2 === undefined ? C.DF_RG : _option$rg2,
        _option$measure = option.measure,
        measure = _option$measure === undefined ? C.DF_MEASURE : _option$measure;


    if (!one) {
      var arr = v.substring(3).split('_');
      Object.assign(option, {
        one: arr[0],
        two: arr[1]
      });
    }

    Object.assign(option, { rg: rg, measure: measure });
  }
};

exports.default = UnComtradeApi;
//# sourceMappingURL=Api.js.map