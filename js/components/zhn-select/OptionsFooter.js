"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));

var _CL = _interopRequireDefault(require("./CL"));

var S = {
  BT_CIRCLE: {
    backgroundColor: '#949ab4'
  }
};

var OptionsFooter = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var indexActiveOption = _ref.indexActiveOption,
      nFiltered = _ref.nFiltered,
      nAll = _ref.nAll,
      onStepDown = _ref.onStepDown,
      onStepUp = _ref.onStepUp,
      onClear = _ref.onClear;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _CL["default"].FOOTER + " " + _CL["default"].NOT_SELECTED
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _CL["default"].FOOTER_INDEX
  }, /*#__PURE__*/_react["default"].createElement("span", {
    ref: ref
  }, indexActiveOption), /*#__PURE__*/_react["default"].createElement("span", null, ": ", nFiltered, ": ", nAll)), /*#__PURE__*/_react["default"].createElement("span", {
    className: _CL["default"].FOOTER_BTS
  }, /*#__PURE__*/_react["default"].createElement(_ButtonCircle["default"], {
    className: _CL["default"].FOOTER_MARGIN,
    style: S.BT_CIRCLE,
    caption: "Dn",
    onClick: onStepDown
  }), /*#__PURE__*/_react["default"].createElement(_ButtonCircle["default"], {
    className: _CL["default"].FOOTER_MARGIN,
    style: S.BT_CIRCLE,
    caption: "Up",
    onClick: onStepUp
  }), /*#__PURE__*/_react["default"].createElement(_ButtonCircle["default"], {
    style: S.BT_CIRCLE,
    caption: "CL",
    onClick: onClear
  })));
});

var _default = OptionsFooter;
exports["default"] = _default;
//# sourceMappingURL=OptionsFooter.js.map