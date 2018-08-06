'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var T = {
  T1: 't1',
  T2: 't2',
  T3: 't3',
  T3B: 't3b',
  T3A: 't3a',
  T3A2: 't3a2',
  T4: 't4',
  DF3: 'df3'
};

var V = {
  A: 'AREA',
  A_Y: 'AREA_YEARLY',
  S: 'SPLINE',
  S_C: 'COLUMN',
  M: 'MAP',
  C: 'COLUMN_SET',
  C_C: 'COLUMN_CLUSTER',
  C_2: 'COLUMN_BY_2',
  B: 'BAR_SET',
  B_C: 'BAR_CLUSTER',
  B_2: 'BAR_BY_2',
  TM: 'TREE_MAP',
  TM_C: 'TREE_MAP_CLUSTER',
  TM_2: 'TREE_MAP_2',
  TM_2_C: 'TREE_MAP_2_CLUSTER'
};

var C = {
  EMPTY: ''
};

var _crDF = function _crDF() {
  return [{ caption: 'Default: Spline', value: V.S }, { caption: 'Area', value: V.A }, { caption: 'Column', value: V.S_C }, { caption: 'Bar: All Countries', value: V.B }, { caption: 'Column: All Countries', value: V.C }, { caption: 'Map: All Countries', value: V.M, compType: _Type.CompItemType.EUROSTAT_MAP }];
};

var _crDF3 = function _crDF3() {
  return [{ caption: 'Default: Spline', value: V.S }, { caption: 'Column', value: V.S_C }, { caption: 'Bar: All Countries', value: V.B }, { caption: 'Column: All Countries', value: V.C }];
};

var _crT1 = function _crT1() {
  return [{ caption: 'Default: Spline', value: V.S }];
};

var _crT2 = function _crT2() {
  return [{ caption: 'Default: Spline', value: V.S }, { caption: 'Column', value: V.S_C }, { caption: 'Yearly by Months', value: V.A_Y }];
};

var _crT3All = function _crT3All(oneCaption) {
  return [{
    caption: 'Column: By ' + oneCaption,
    value: V.C,
    dim: oneCaption
  }, {
    caption: 'Column: By ' + oneCaption + ': Cluster',
    value: V.C_C,
    dim: oneCaption
  }, {
    caption: 'Bar: By ' + oneCaption,
    value: V.B,
    dim: oneCaption
  }, {
    caption: 'Bar: By ' + oneCaption + ': Cluster',
    value: V.B_C,
    dim: oneCaption
  }];
};

var _crT3 = function _crT3(oneCaption) {
  return [{ caption: 'Default: Spline', value: V.A }].concat((0, _toConsumableArray3.default)(_crT3All(oneCaption)));
};

var _crT3B = function _crT3B(oneCaption) {
  return [{ caption: 'Default: Spline', value: V.A }, { caption: 'Yearly by Months', value: V.A_Y }].concat((0, _toConsumableArray3.default)(_crT3All(oneCaption)));
};

var _crT3A = function _crT3A(oneCaption) {
  return [].concat((0, _toConsumableArray3.default)(_crT3(oneCaption)), [{
    caption: 'TreeMap: By ' + oneCaption,
    value: V.TM,
    dim: oneCaption
  }, {
    caption: 'TreeMap: By ' + oneCaption + ': Cluster',
    value: V.TM_C,
    dim: oneCaption
  }]);
};
var _crT3A2 = function _crT3A2(oneCaption) {
  return [].concat((0, _toConsumableArray3.default)(_crT3A(oneCaption)), [{
    caption: 'TreeMap: By ' + oneCaption + ': Depth 2',
    value: V.TM_2,
    dim: oneCaption
  }, {
    caption: 'TreeMap: By ' + oneCaption + ': Depth 2: Cluster',
    value: V.TM_2_C,
    dim: oneCaption
  }]);
};

var _crT4 = function _crT4(oneCaption, twoCaption) {
  return [].concat((0, _toConsumableArray3.default)(_crT3(oneCaption)), [{
    caption: 'Column: By ' + twoCaption,
    value: V.C_2,
    dim: twoCaption
  }, {
    caption: 'Bar: By ' + twoCaption,
    value: V.B_2,
    dim: twoCaption
  }]);
};

var CATEGORY_TYPES = [V.M, V.C, V.C_C, V.C_2, V.B, V.B_C, V.B_2, V.TM, V.TM_C, V.TM_2, V.TM_2_C];

var _crCaptions = function _crCaptions(_ref) {
  var dims = _ref.dims,
      _ref$oneCaption = _ref.oneCaption,
      oneCaption = _ref$oneCaption === undefined ? C.EMPTY : _ref$oneCaption,
      _ref$twoCaption = _ref.twoCaption,
      twoCaption = _ref$twoCaption === undefined ? C.EMPTY : _ref$twoCaption;

  if (Array.isArray(dims)) {
    return dims.map(function (dim) {
      return dim.c || C.EMPTY;
    });
  } else {
    return [oneCaption, twoCaption];
  }
};

var RouterOptions = {
  crOptions: function crOptions(option) {
    var chartsType = option.chartsType,
        _captions = _crCaptions(option);

    switch (chartsType) {
      case T.T1:
        return _crT1();
      case T.T2:
        return _crT2();
      case T.T3:
        return _crT3(_captions[0]);
      case T.T3B:
        return _crT3B(_captions[0]);
      case T.T3A:
        return _crT3A(_captions[0]);
      case T.T3A2:
        return _crT3A2(_captions[0]);
      case T.T4:
        return _crT4(_captions[0], _captions[1]);
      case T.DF3:
        return _crDF3();
      default:
        return _crDF();
    }
  },
  isCategory: function isCategory(chartType) {
    if (!chartType) {
      return false;
    }
    return CATEGORY_TYPES.indexOf(chartType.value) !== -1;
  }
};

exports.default = RouterOptions;
//# sourceMappingURL=RouterOptions.js.map