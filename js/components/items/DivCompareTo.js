"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SpanLabel = _interopRequireDefault(require("../zhn-span/SpanLabel"));

var _DateField = _interopRequireDefault(require("../zhn/DateField"));

var S = {
  ROW_INPUT: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  DATE_FIELD: {
    width: 120,
    marginLeft: 8,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  DIV_MSG: {
    marginTop: 6
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

var DivCompareTo = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var initialValue = _ref.initialValue,
      msgErr = _ref.msgErr,
      onTest = _ref.onTest,
      onEnter = _ref.onEnter;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    style: S.ROW_INPUT
  }, /*#__PURE__*/_react["default"].createElement(_SpanLabel["default"], {
    label: "CompareTo:"
  }), /*#__PURE__*/_react["default"].createElement(_DateField["default"], {
    ref: ref,
    rootStyle: S.DATE_FIELD,
    initialValue: initialValue,
    placeholder: "DD-MM-YYYY",
    errorMsg: "DD-MM-YYYY",
    onTest: onTest,
    onEnter: onEnter
  })), msgErr && /*#__PURE__*/_react["default"].createElement("div", {
    style: S.DIV_MSG
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: S.MSG
  }, msgErr)));
});

var _default = DivCompareTo;
exports["default"] = _default;
//# sourceMappingURL=DivCompareTo.js.map