"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ChartConfigFn = require("../ChartConfigFn");

const _isArr = Array.isArray;
const _assign = Object.assign;

const _getType = chartInst => {
  var _chartInst$userOption, _chartInst$userOption2, _chartInst$userOption3;

  return (_chartInst$userOption = chartInst == null ? void 0 : (_chartInst$userOption2 = chartInst.userOptions) == null ? void 0 : (_chartInst$userOption3 = _chartInst$userOption2.chart) == null ? void 0 : _chartInst$userOption3.type) != null ? _chartInst$userOption : void 0;
};

const _isCategoryChart = chartInst => {
  const _type = _getType(chartInst);

  return _type === 'bar' || _type === 'column';
};

const _isCategoryData = data => _isArr(data) && data[0] && data[0].c;

const _isCategoryCase = (chartInst, data) => _isCategoryChart(chartInst) && _isCategoryData(data);

const _getCategories = chartInst => {
  var _chartInst$userOption4, _chartInst$userOption5, _chartInst$userOption6;

  return (_chartInst$userOption4 = chartInst == null ? void 0 : (_chartInst$userOption5 = chartInst.userOptions) == null ? void 0 : (_chartInst$userOption6 = _chartInst$userOption5.xAxis) == null ? void 0 : _chartInst$userOption6.categories) != null ? _chartInst$userOption4 : void 0;
};

const _crDataHm = data => data.reduce((hm, p) => {
  hm[p.c] = p;
  return hm;
}, {});

const _crDataOrderedByCategories = (hmData, categories) => categories.reduce((data, category) => {
  data.push(hmData[category] || {
    c: category,
    y: null
  });
  return data;
}, []);

const _trToCategory = (chartInst, data) => {
  const _categories = _getCategories(chartInst);

  if (!_isArr(_categories)) {
    return data;
  }

  const _hmData = _crDataHm(data);

  return _crDataOrderedByCategories(_hmData, _categories);
};

const crYAxisSeria = (chartInst, options) => {
  const {
    data
  } = options;

  if (_isCategoryCase(chartInst, data)) {
    return _assign(options, {
      data: _trToCategory(chartInst, data),
      type: void 0,
      point: {
        events: {
          mouseOver: null
        }
      }
    });
  } else if (options.type === 'columnrange') {
    return options;
  }

  return (0, _ChartConfigFn.crSeriaConfig)(options);
};

var _default = crYAxisSeria;
exports.default = _default;
//# sourceMappingURL=crYAxisSeria.js.map