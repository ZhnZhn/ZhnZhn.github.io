"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;
var _assign = Object.assign;

var _getType = function _getType(chartInst) {
  var _chartInst$userOption, _chartInst$userOption2, _chartInst$userOption3;

  return (_chartInst$userOption = chartInst == null ? void 0 : (_chartInst$userOption2 = chartInst.userOptions) == null ? void 0 : (_chartInst$userOption3 = _chartInst$userOption2.chart) == null ? void 0 : _chartInst$userOption3.type) != null ? _chartInst$userOption : void 0;
};

var _isCategoryChart = function _isCategoryChart(chartInst) {
  var _type = _getType(chartInst);

  return _type === 'bar' || _type === 'column';
};

var _isCategoryData = function _isCategoryData(data) {
  return _isArr(data) && data[0] && data[0].c;
};

var _isCategoryCase = function _isCategoryCase(chartInst, data) {
  return _isCategoryChart(chartInst) && _isCategoryData(data);
};

var _getCategories = function _getCategories(chartInst) {
  var _chartInst$userOption4, _chartInst$userOption5, _chartInst$userOption6;

  return (_chartInst$userOption4 = chartInst == null ? void 0 : (_chartInst$userOption5 = chartInst.userOptions) == null ? void 0 : (_chartInst$userOption6 = _chartInst$userOption5.xAxis) == null ? void 0 : _chartInst$userOption6.categories) != null ? _chartInst$userOption4 : void 0;
};

var _crCategoriesHm = function _crCategoriesHm(categories) {
  var _hm = {};
  var i = 0;

  for (; i < categories.length; i++) {
    _hm[categories[i]] = i;
  }

  return _hm;
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _orderByHm = function _orderByHm(data, hm, length) {
  var _data = new Array(length);

  var item,
      categoryIndex,
      i = 0;

  for (; i < data.length; i++) {
    item = data[i];
    categoryIndex = hm[item.c];

    if (_isNumber(categoryIndex)) {
      _data[categoryIndex] = item;
    }
  }

  return _data;
};

var _trToCategory = function _trToCategory(chartInst, data) {
  var _categories = _getCategories(chartInst);

  if (!_isArr(_categories)) {
    return data;
  }

  var _hmCategories = _crCategoriesHm(_categories),
      _length = _categories.length,
      _data = _orderByHm(data, _hmCategories, _length);

  return _data;
};

var trIfCategoryCase = function trIfCategoryCase(chartInst, data, seriaOption) {
  return _isCategoryCase(chartInst, data) ? [_trToCategory(chartInst, data), _assign(seriaOption, {
    type: void 0,
    point: {
      events: {
        mouseOver: null
      }
    }
  })] : [data, seriaOption];
};

var _default = trIfCategoryCase;
exports["default"] = _default;
//# sourceMappingURL=trIfCategoryCase.js.map