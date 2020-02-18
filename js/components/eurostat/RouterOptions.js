"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var V = {
  A: 'AREA',
  A_Y: 'AREA_YEARLY',
  S: 'SPLINE',
  L: 'LINE',
  S_C: 'COLUMN',
  M: 'MAP',
  C: 'COLUMN_SET',
  C_C: 'COLUMN_CLUSTER',
  C_2: 'COLUMN_BY_2',
  B: 'BAR_SET',
  B_C: 'BAR_CLUSTER',
  B_2: 'BAR_BY_2',
  B_L: 'BAR_WITH_LABELS',
  D: 'DOT_SET',
  TM: 'TREE_MAP',
  TM_C: 'TREE_MAP_CLUSTER',
  TM_2: 'TREE_MAP_2',
  TM_2_C: 'TREE_MAP_2_CLUSTER'
};
var CATEGORY_TYPES = [V.M, V.C, V.C_C, V.C_2, V.B, V.B_C, V.B_2, V.B_L, V.D, V.TM, V.TM_C, V.TM_2, V.TM_2_C];
var C = {
  EMPTY: ''
};

var _crItem = function _crItem(confArr) {
  return {
    caption: confArr[0],
    value: confArr[1],
    dim: confArr[2],
    compType: confArr[3]
  };
};

var _crItems = function _crItems(arr) {
  return arr.map(_crItem);
};

var _isMonthly = function _isMonthly(mapFrequency) {
  return !mapFrequency || mapFrequency === 'M';
};

var _crDF3 = function _crDF3(mapFrequency) {
  return _crItems([['Default: Spline', V.S], ['Line', V.L], _isMonthly(mapFrequency) && ['Yearly by Months', V.A_Y], ['Area', V.A], ['Column', V.S_C], ['Bar: All Countries', V.B], ['Bar+Labels: All Countries', V.B_L], ['Column: All Countries', V.C], ['Dots: All Countries', V.D]].filter(Boolean));
};

var _crDF = function _crDF(captions, mapFrequency) {
  return _crDF3(mapFrequency).concat(_crItems([['Map: All Countries', V.M, void 0, _Type.CompItemType.EUROSTAT_MAP]]));
};

var _crT1 = function _crT1() {
  return [_crItem(['Default: Spline', V.S])];
};

var _crT2 = function _crT2() {
  return [_crItem(['Default: Spline', V.S]), _crItem(['Line', V.L]), _crItem(['Area', V.A]), _crItem(['Column', V.S_C])];
};

var _crT2A = function _crT2A() {
  return [].concat(_crT2(), [_crItem(['Yearly by Months', V.A_Y])]);
};

var _crT3All = function _crT3All(oneCaption) {
  return _crItems([["Column: By " + oneCaption, V.C, oneCaption], ["Column: By " + oneCaption + ": Cluster", V.C_C, oneCaption], ["Bar: By " + oneCaption, V.B, oneCaption], ["Bar: By " + oneCaption + ": Cluster", V.B_C, oneCaption]]);
};

var _crT3 = function _crT3(_ref) {
  var oneCaption = _ref[0];
  return [_crItem(['Default: Spline', V.S])].concat(_crT3All(oneCaption));
};

var _crT3B = function _crT3B(_ref2) {
  var oneCaption = _ref2[0];
  return [_crItem(['Default: Spline', V.S]), _crItem(['Yearly by Months', V.A_Y])].concat(_crT3All(oneCaption));
};

var _crT3A = function _crT3A(_ref3) {
  var oneCaption = _ref3[0];
  return [].concat(_crT3([oneCaption]), [_crItem(["TreeMap: By " + oneCaption, V.TM, oneCaption]), _crItem(["TreeMap: By " + oneCaption + ": Cluster", V.TM_C, oneCaption])]);
};

var _crT3A2 = function _crT3A2(_ref4) {
  var oneCaption = _ref4[0];
  return [].concat(_crT3A([oneCaption]), [_crItem(["TreeMap: By " + oneCaption + ": Depth 2", V.TM_2, oneCaption]), _crItem(["TreeMap: By " + oneCaption + ": Depth 2: Cluster", V.TM_2_C, oneCaption])]);
};

var _crT4 = function _crT4(_ref5) {
  var oneCaption = _ref5[0],
      twoCaption = _ref5[1];
  return [].concat(_crT3([oneCaption]), [_crItem(["Column: By " + twoCaption, V.C_2, twoCaption]), _crItem(["Bar: By " + twoCaption, V.B_2, twoCaption])]);
};

var _r = {
  DF: _crDF,
  t1: _crT1,
  t2: _crT2,
  t2a: _crT2A,
  t3: _crT3,
  t3b: _crT3B,
  t3a: _crT3A,
  t3a2: _crT3A2,
  t4: _crT4,
  df3: _crDF3
};

var _crCaptions = function _crCaptions(_ref6) {
  var dims = _ref6.dims,
      _ref6$oneCaption = _ref6.oneCaption,
      oneCaption = _ref6$oneCaption === void 0 ? C.EMPTY : _ref6$oneCaption,
      _ref6$twoCaption = _ref6.twoCaption,
      twoCaption = _ref6$twoCaption === void 0 ? C.EMPTY : _ref6$twoCaption;
  return Array.isArray(dims) ? dims.map(function (dim) {
    return dim.c || C.EMPTY;
  }) : [oneCaption, twoCaption];
};

var RouterOptions = {
  crOptions: function crOptions(dialogOption, _temp) {
    var _ref7 = _temp === void 0 ? {} : _temp,
        mapFrequency = _ref7.mapFrequency;

    var chartsType = dialogOption.chartsType,
        mF = dialogOption.mapFrequency,
        _dialogOption$dfProps = dialogOption.dfProps,
        dfProps = _dialogOption$dfProps === void 0 ? {} : _dialogOption$dfProps,
        _mapFrequency = mapFrequency || mF || dfProps.mapFrequency,
        _captions = _crCaptions(dialogOption),
        _crOptions = _r[chartsType] || _r.DF;

    return _crOptions(_captions, _mapFrequency);
  },
  isCategory: function isCategory(chartType) {
    if (!chartType) {
      return false;
    }

    return CATEGORY_TYPES.indexOf(chartType.value) !== -1;
  }
};
var _default = RouterOptions;
exports["default"] = _default;
//# sourceMappingURL=RouterOptions.js.map