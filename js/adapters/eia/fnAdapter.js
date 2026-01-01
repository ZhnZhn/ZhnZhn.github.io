"use strict";

exports.__esModule = true;
exports.getResponseData = exports.crTitle = exports.crData = exports.crConfOption = void 0;
var _arrFn = require("../../utils/arrFn");
var _isTypeFn = require("../../utils/isTypeFn");
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
    name: (0, _arrFn.joinByColon)(option.title, option.subtitle),
    description: response.description || (response.data[0] || {})["series-description"] || ''
  };
};
const crTitle = _ref3 => {
  let {
    items = [],
    dfTitle
  } = _ref3;
  return {
    title: (0, _arrFn.joinByColon)((0, _AdapterFn.getCaption)(items[0]), dfTitle),
    subtitle: (0, _arrFn.joinByColon)((0, _AdapterFn.getCaption)(items[1]), (0, _AdapterFn.getCaption)(items[2]))
  };
};
exports.crTitle = crTitle;
const _toNumber = str => {
  const _n = parseFloat(str);
  return (0, _isTypeFn.isNumber)(_n) ? _n : null;
};
const getResponseData = json => ((json || {}).response || {}).data;
exports.getResponseData = getResponseData;
const crData = (json, _ref4) => {
  let {
    dfData
  } = _ref4;
  return getResponseData(json).map(item => [(0, _AdapterFn.ymdToUTC)(item.period), _toNumber(item[dfData])]);
};
exports.crData = crData;
const crConfOption = (option, json) => ({
  zhConfig: _crZhConfig(json, option),
  info: _crInfo(json, option)
});
exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map