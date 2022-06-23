"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));

var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox"));

var _Style = require("./Style");

var _jsxRuntime = require("react/jsx-runtime");

const PROP_NAMES = ['isNotZoomToMinMax', 'isFilterZero', 'isLogarithmic'];

const ModalOptions = _ref => {
  let {
    isShow,
    style,
    className = _Style.CL_POPUP_MENU,
    toggleOption,
    onClose
  } = _ref;
  const [_toggleZoomMinMax, _toggleFilterZero, _toggleLogarithmic] = (0, _react.useMemo)(() => PROP_NAMES.map(propName => is => toggleOption(propName, is)), [toggleOption]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
    isShow: isShow,
    style: { ..._Style.S_MODAL_POPUP,
      ...style
    },
    className: className,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      initValue: false,
      style: _Style.S_ROW_CHB,
      caption: "Not Zoom to Min-Max",
      onToggle: _toggleZoomMinMax
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      initValue: false,
      style: _Style.S_ROW_CHB,
      caption: "Filter Trim Zero Values",
      onToggle: _toggleFilterZero
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      initValue: false,
      style: _Style.S_ROW_CHB,
      caption: "Logarithmic Scale",
      onToggle: _toggleLogarithmic
    })]
  });
};

var _default = ModalOptions;
exports.default = _default;
//# sourceMappingURL=ModalOptions.js.map