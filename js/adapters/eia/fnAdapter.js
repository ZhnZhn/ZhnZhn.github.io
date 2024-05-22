"use strict";

exports.__esModule = true;
exports.crTitle = exports.crData = exports.crConfOption = void 0;
var _AdapterFn = require("../AdapterFn");
const _crZhConfig = (json, _ref) => {
  let {
    dataSource,
    key
  } = _ref;
  return {
    id: key,
    key,
    dataSource
  };
};
const _crInfo = (_ref2, option) => {
  let {
    response
  } = _ref2;
  return {
    name: (0, _AdapterFn.joinBy)(': ', option.title, option.subtitle),
    description: response.description || (response.data[0] || {})["series-description"] || ''
  };
};
const crTitle = _ref3 => {
  let {
    items = [],
    dfTitle
  } = _ref3;
  const _s1 = (0, _AdapterFn.getCaption)(items[0]),
    _s2 = (0, _AdapterFn.getCaption)(items[1]),
    _s3 = (0, _AdapterFn.getCaption)(items[2]),
    _subtitle = "" + _s2 + (_s3 ? ':' : '') + " " + _s3;
  return {
    title: _s1 + ": " + dfTitle,
    subtitle: _subtitle
  };
};
exports.crTitle = crTitle;
const _toNumber = str => {
  const _n = parseFloat(str);
  return (0, _AdapterFn.isNumber)(_n) ? _n : null;
};
const crData = (json, _ref4) => {
  let {
    dfData
  } = _ref4;
  return json.response.data.map(item => [(0, _AdapterFn.ymdToUTC)(item.period), _toNumber(item[dfData])]);
};
exports.crData = crData;
const crConfOption = (option, json) => ({
  zhConfig: _crZhConfig(json, option),
  info: _crInfo(json, option)
});
exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map