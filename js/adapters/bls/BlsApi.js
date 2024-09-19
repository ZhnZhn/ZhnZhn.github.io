"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crFn = require("../crFn");
const API_URL = 'https://api.bls.gov/publicAPI',
  TS_DATA = 'timeseries/data',
  NATIVE_URL = 'https://data.bls.gov/timeseries';
const _assign = Object.assign;
const _fCrId321 = idPrefix => items => `${idPrefix}${items[2].v}R${items[1].v}${items[0].v}`;
const _hmCrId = (0, _crFn.crHm)({
  CU: _fCrId321('CU'),
  CW: _fCrId321('CW')
});
const _getSeriaId = _ref => {
  let {
    items = [],
    dfCode
  } = _ref;
  const _crId = _hmCrId[dfCode];
  return _crId ? _crId(items) : items[0].v;
};
const _addNativeLinkTo = (option, seriaId) => {
  _assign(option, {
    linkItem: {
      caption: 'U.S. BLS Data Link',
      href: `${NATIVE_URL}/${seriaId}`
    }
  });
};
const _crCaption321 = (dfTitle, items) => ({
  title: `${dfTitle}, ${items[2].c}`,
  subtitle: `${items[1].c}: ${items[0].c}`
});
const _hmCrCaption = (0, _crFn.crHm)({
  CU: _crCaption321,
  CW: _crCaption321
});
const _crCaption = _ref2 => {
  let {
    dfCode,
    dfTitle,
    title,
    subtitle,
    items
  } = _ref2;
  const _crC = _hmCrCaption[dfCode];
  return _crC ? _crC(dfTitle, items) : {
    title: dfTitle || subtitle,
    subtitle: title
  };
};
const _setCaptionTo = option => {
  const {
    title
  } = option;
  _assign(option, {
    itemCaption: title,
    ..._crCaption(option)
  });
};
const _crQueryKey = _ref3 => {
  let {
    apiKey
  } = _ref3;
  return apiKey ? `?registrationkey=${apiKey}` : '';
};
const _crQueryPeriod = (queryKey, _ref4) => {
  let {
    fromDate
  } = _ref4;
  if (!queryKey) {
    return '';
  }
  const _startyear = parseInt((0, _AdapterFn.getYear)(fromDate), 10),
    _endyear = parseInt((0, _AdapterFn.getCurrentYear)(), 10);
  if ((0, _AdapterFn.isNumber)(_startyear) && (0, _AdapterFn.isNumber)(_endyear) && _endyear - _startyear < 21) {
    return `&startyear=${_startyear}&endyear=${_endyear}`;
  }
  return '';
};
const BlsApi = {
  getRequestUrl(option) {
    const seriaId = _getSeriaId(option),
      _queryKey = _crQueryKey(option),
      _v = _queryKey ? 'v2' : 'v1',
      _queryPeriod = _crQueryPeriod(_queryKey, option);
    _addNativeLinkTo(option, seriaId);
    _setCaptionTo(option);
    return `${API_URL}/${_v}/${TS_DATA}/${seriaId}${_queryKey}${_queryPeriod}`;
  },
  checkResponse(json) {
    const {
        Results,
        message = []
      } = json || {},
      {
        series
      } = Results || {},
      _s = (series || [])[0];
    if (_s && (0, _AdapterFn.isArr)(_s.data)) {
      return json;
    }
    throw (0, _AdapterFn.crError)('', message[0]);
  }
};
var _default = exports.default = BlsApi;
//# sourceMappingURL=BlsApi.js.map