"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _getDocs = function _getDocs(json) {
  return ((json || {}).series || {}).docs || {};
};

var _getByPropName = function _getByPropName(json, propName) {
  return _getDocs(json)[0][propName] || '';
};

var _fGetByPropName = function _fGetByPropName(propName) {
  return function (json) {
    return _getByPropName(json, propName);
  };
};

var fnSelector = {
  getPeriodAndValue: function getPeriodAndValue(json) {
    return {
      period: _getByPropName(json, 'period') || [],
      value: _getByPropName(json, 'value')
    };
  },
  getTitle: _fGetByPropName('dataset_name'),
  getSubtitle: _fGetByPropName('series_name'),
  getIndexedAt: _fGetByPropName('indexed_at')
};
var _default = fnSelector;
exports["default"] = _default;
//# sourceMappingURL=fnSelector.js.map