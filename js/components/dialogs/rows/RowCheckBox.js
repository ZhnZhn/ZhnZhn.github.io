"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useTheme = _interopRequireDefault(require("../../hooks/useTheme"));

var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));

var _SvgCheckBox = _interopRequireDefault(require("../../zhn/SvgCheckBox"));

//import PropTypes from "prop-types";
var CL = "bt-chb",
    TH_ID = 'ROW_CHECKBOX',
    CHECKED_COLOR = '#1b2836';
var S = {
  ROOT: {
    paddingTop: 6,
    paddingLeft: 16
  },
  CAPTION: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 12,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED: {
    color: CHECKED_COLOR
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn == 'function';
},
    _isUndefined = function _isUndefined(v) {
  return typeof v === 'undefined';
},
    _isBool = function _isBool(bool) {
  return typeof bool === 'boolean';
};

var _crCheckedStyle = function _crCheckedStyle(color) {
  return {
    color: color
  };
};

var RowCheckBox = function RowCheckBox(_ref) {
  var style = _ref.style,
      _ref$checkedColor = _ref.checkedColor,
      checkedColor = _ref$checkedColor === void 0 ? CHECKED_COLOR : _ref$checkedColor,
      value = _ref.value,
      initValue = _ref.initValue,
      caption = _ref.caption,
      captionStyle = _ref.captionStyle,
      onCheck = _ref.onCheck,
      onUnCheck = _ref.onUnCheck,
      onToggle = _ref.onToggle;

  var _useState = (0, _react.useState)(function () {
    return _isUndefined(value) ? !!initValue : void 0;
  }),
      valueState = _useState[0],
      setValueState = _useState[1],
      _isValueState = (0, _useRefInit["default"])(function () {
    return _isBool(valueState);
  }),
      _value = _isValueState ? valueState : value,
      _hCheck = (0, _react.useCallback)(function () {
    if (_isFn(onCheck)) {
      onCheck();
    } else if (_isFn(onToggle)) {
      onToggle(true);
    }

    if (_isValueState) {
      setValueState(true);
    }
  }, [onCheck, onToggle, _isValueState]),
      _hUnCheck = (0, _react.useCallback)(function () {
    if (_isFn(onUnCheck)) {
      onUnCheck();
    } else if (_isFn(onToggle)) {
      onToggle(false);
    }

    if (_isValueState) {
      setValueState(false);
    }
  }, [onUnCheck, onToggle, _isValueState]),
      _hToggle = (0, _react.useCallback)(function () {
    if (_value) {
      _hUnCheck();
    } else {
      _hCheck();
    }
  }, [_value, _hUnCheck, _hCheck]),
      TS = (0, _useTheme["default"])(TH_ID);

  var _style = _value ? (0, _extends2["default"])({}, captionStyle, _crCheckedStyle(checkedColor)) : captionStyle;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.ROOT, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], {
      value: _value,
      color: checkedColor,
      checkedColor: TS.CHECKED_COLOR,
      onCheck: _hCheck,
      onUnCheck: _hUnCheck
    }), caption && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL,
      tabIndex: "-1",
      style: (0, _extends2["default"])({}, S.CAPTION, _style),
      onClick: _hToggle,
      children: caption
    })]
  });
};
/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  checkedColor: PropTypes.string,
  initValue: PropTypes.bool,
  value: PropTypes.bool,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  onToggle: PropTypes.func
}
*/


var _default = RowCheckBox;
exports["default"] = _default;
//# sourceMappingURL=RowCheckBox.js.map