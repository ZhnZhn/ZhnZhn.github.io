'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IndicatorBuilder = require('../../charts/IndicatorBuilder');

var _IndicatorBuilder2 = _interopRequireDefault(_IndicatorBuilder);

var _RowCaptionInput = require('./RowCaptionInput');

var _RowCaptionInput2 = _interopRequireDefault(_RowCaptionInput);

var _SeriaConfigs = require('./SeriaConfigs');

var _SeriaConfigs2 = _interopRequireDefault(_SeriaConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crMfiConfig = _IndicatorBuilder2.default.crMfiConfig;


var _isInArrObjWithId = function _isInArrObjWithId(arrObj, id) {
  return !!arrObj.find(function (obj) {
    return obj.id === id;
  });
};

var _crMfiConfig = function _crMfiConfig(id) {
  return {
    id: id,
    color: '#90ed7d'
  };
};

var _crId = function _crId(period) {
  return 'MFI(' + period + ')';
};

var RowMfi = function RowMfi(_ref) {
  var getChart = _ref.getChart,
      onAddMfi = _ref.onAddMfi,
      onRemoveMfi = _ref.onRemoveMfi;
  var _refPeriod = (0, _react.useRef)(),
      _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      mfiConfs = _useState2[0],
      setMfiConfs = _useState2[1],
      _onAddMfi = function _onAddMfi() {
    var _period = _refPeriod.current.getValue(),
        _id = _crId(_period);
    if (!_isInArrObjWithId(mfiConfs, _id)) {
      var chart = getChart(),
          config = crMfiConfig(chart, _period, _id);
      if (config) {
        onAddMfi(config, _id);
        setMfiConfs([].concat((0, _toConsumableArray3.default)(mfiConfs), [_crMfiConfig(_id)]));
      }
    }
  },
      _onRemoveMfi = function _onRemoveMfi(id) {
    onRemoveMfi(id);
    setMfiConfs(mfiConfs.filter(function (d) {
      return d.id !== id;
    }));
  };

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(_RowCaptionInput2.default, {
      caption: 'MFI',
      forwardRef: _refPeriod,
      initValue: 14,
      onAdd: _onAddMfi
    }),
    _react2.default.createElement(_SeriaConfigs2.default, {
      configs: mfiConfs,
      onRemove: _onRemoveMfi
    })
  );
};

exports.default = RowMfi;
//# sourceMappingURL=RowMfi.js.map