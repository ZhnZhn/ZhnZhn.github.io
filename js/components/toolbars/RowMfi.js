"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _RowType = _interopRequireDefault(require("./RowType2"));

var _IndicatorBuilder = _interopRequireDefault(require("../../charts/IndicatorBuilder"));

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

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType["default"], {
    forwardRef: _refPeriod,
    caption: "MFI",
    initValue: 30,
    configs: mfiConfs,
    onAdd: _onAddMfi,
    onRemove: _onRemoveMfi
  });
};

var _default = RowMfi;
exports["default"] = _default;
//# sourceMappingURL=RowMfi.js.map