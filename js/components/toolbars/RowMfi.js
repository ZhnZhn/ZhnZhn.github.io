"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _IndicatorBuilder = _interopRequireDefault(require("../../charts/IndicatorBuilder"));

var _RowCaptionInput = _interopRequireDefault(require("./RowCaptionInput"));

var _SeriaConfigs = _interopRequireDefault(require("./SeriaConfigs"));

var crMfiConfig = _IndicatorBuilder["default"].crMfiConfig;

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
      mfiConfs = _useState[0],
      setMfiConfs = _useState[1],
      _onAddMfi = function _onAddMfi() {
    var _period = _refPeriod.current.getValue(),
        _id = _crId(_period);

    if (!_isInArrObjWithId(mfiConfs, _id)) {
      var chart = getChart(),
          config = crMfiConfig(chart, _period, _id);

      if (config) {
        onAddMfi(config, _id);
        setMfiConfs([].concat(mfiConfs, [_crMfiConfig(_id)]));
      }
    }
  },
      _onRemoveMfi = function _onRemoveMfi(id) {
    onRemoveMfi(id);
    setMfiConfs(mfiConfs.filter(function (d) {
      return d.id !== id;
    }));
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_RowCaptionInput["default"], {
    caption: "MFI",
    forwardRef: _refPeriod,
    initValue: 14,
    onAdd: _onAddMfi
  }), /*#__PURE__*/_react["default"].createElement(_SeriaConfigs["default"], {
    configs: mfiConfs,
    onRemove: _onRemoveMfi
  }));
};

var _default = RowMfi;
exports["default"] = _default;
//# sourceMappingURL=RowMfi.js.map