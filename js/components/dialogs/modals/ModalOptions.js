"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));

var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox"));

var _Style = _interopRequireDefault(require("./Style"));

var ModalOptions = function ModalOptions(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? _Style["default"].CL : _ref$className,
      toggleOption = _ref.toggleOption,
      onClose = _ref.onClose;

  var _toggleZoomMinMax = (0, _react.useCallback)(function (is) {
    return toggleOption('isNotZoomToMinMax', is);
  }, [toggleOption]),
      _toggleFilterZero = (0, _react.useCallback)(function (is) {
    return toggleOption('isFilterZero', is);
  }, [toggleOption]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup["default"], {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _Style["default"].ROOT, style),
    className: className,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
      initValue: false,
      style: _Style["default"].ROW_CHB,
      caption: "Not Zoom to Min-Max",
      onToggle: _toggleZoomMinMax
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {
      initValue: false,
      style: _Style["default"].ROW_CHB,
      caption: "Filter Trim Zero Values",
      onToggle: _toggleFilterZero
    })]
  });
};

var _default = ModalOptions;
exports["default"] = _default;
//# sourceMappingURL=ModalOptions.js.map