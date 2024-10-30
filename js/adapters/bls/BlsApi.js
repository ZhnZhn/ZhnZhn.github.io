"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = 'https://api.bls.gov/publicAPI',
  TS_DATA = 'timeseries/data',
  NATIVE_URL = 'https://data.bls.gov/timeseries';
const _fCrId321 = idPrefix => items => `${idPrefix}${items[2].v}R${items[1].v}${items[0].v}`;
const _crSeriaIdRoutes = {
    CU: _fCrId321('CU'),
    CW: _fCrId321('CW')
  },
  _crDfSeriaId = items => items[0].v,
  _getCrSeriaId = (0, _AdapterFn.crGetRoute)(_crSeriaIdRoutes, _crDfSeriaId);
const _getSeriaId = _ref => {
  let {
    items = [],
    dfCode
  } = _ref;
  return _getCrSeriaId(dfCode)(items);
};
const _addNativeLinkTo = (option, seriaId) => {
  (0, _AdapterFn.assign)(option, {
    linkItem: {
      caption: 'U.S. BLS Data Link',
      href: `${NATIVE_URL}/${seriaId}`
    }
  });
};
const _crCaptionImpl = (title, subtitle) => ({
    title,
    subtitle
  }),
  _crCaption321 = (dfTitle, items) => _crCaptionImpl(`${dfTitle}, ${items[2].c}`, `${items[1].c}: ${items[0].c}`),
  _routesCrCaption = {
    CU: _crCaption321,
    CW: _crCaption321
  },
  _crDfCaption = (dfTitle, items, option) => _crCaptionImpl(dfTitle || option.subtitle, option.title),
  _getCrCaption = (0, _AdapterFn.crGetRoute)(_routesCrCaption, _crDfCaption);
const _crCaption = option => _getCrCaption(option.dfCode)(option.dfTitle, option.items, option);
const _setCaptionTo = option => {
  const {
    title
  } = option;
  (0, _AdapterFn.assign)(option, {
    itemCaption: title,
    ..._crCaption(option)
  });
};
const _crQueryKey = _ref2 => {
  let {
    apiKey
  } = _ref2;
  return apiKey ? `?registrationkey=${apiKey}` : '';
};
const _crQueryPeriod = (queryKey, _ref3) => {
  let {
    fromDate
  } = _ref3;
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
      return;
    }
    throw (0, _AdapterFn.crError)('', message[0]);
  }
};
var _default = exports.default = BlsApi;
//# sourceMappingURL=BlsApi.js.map