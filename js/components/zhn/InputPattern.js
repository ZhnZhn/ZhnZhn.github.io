"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));

var _SvgClear = _interopRequireDefault(require("./SvgClear"));

var _Input = _interopRequireDefault(require("./Input.Style"));

//import PropTypes from "prop-types";
var S = {
  INPUT: (0, _extends2["default"])({}, _Input["default"].INPUT, {
    width: 'calc(100% - 50px)',
    paddingLeft: 0,
    marginLeft: 10,
    marginBottom: 5
  }),
  INPUT_BORDER: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1
  },
  BT_CLEAR: {
    "float": 'right',
    position: 'relative',
    top: 4,
    right: 7
  }
};

var ErrMsg = function ErrMsg(_ref) {
  var msg = _ref.msg;
  return msg ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _Input["default"].ERR_MSG,
    children: msg
  }) : null;
};

var _crInitialState = function _crInitialState(initValue) {
  return {
    initValue: initValue,
    value: initValue,
    errorInput: void 0,
    isValid: true
  };
};

var _getIsValidColor = function _getIsValidColor(isValid) {
  return isValid ? '#1b75bb' : '#f44336';
};

var _crInputStyle = function _crInputStyle(isValid) {
  return (0, _extends2["default"])({}, S.INPUT_BORDER, {
    borderBottomColor: _getIsValidColor(isValid)
  });
};

var _crBtClearStyle = function _crBtClearStyle(isValid) {
  return (0, _extends2["default"])({}, S.BT_CLEAR, {
    stroke: _getIsValidColor(isValid)
  });
};

var _onTest = function _onTest() {
  return true;
},
    _onClear = function _onClear() {};

var InputPattern = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var rootStyle = _ref2.rootStyle,
      inputStyle = _ref2.inputStyle,
      _ref2$maxLength = _ref2.maxLength,
      maxLength = _ref2$maxLength === void 0 ? 64 : _ref2$maxLength,
      _ref2$initValue = _ref2.initValue,
      initValue = _ref2$initValue === void 0 ? '' : _ref2$initValue,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? 'Input Pattern' : _ref2$placeholder,
      errorMsg = _ref2.errorMsg,
      _ref2$onTest = _ref2.onTest,
      onTest = _ref2$onTest === void 0 ? _onTest : _ref2$onTest,
      onEnter = _ref2.onEnter,
      _ref2$isClearBlank = _ref2.isClearBlank,
      isClearBlank = _ref2$isClearBlank === void 0 ? false : _ref2$isClearBlank,
      _ref2$onClear = _ref2.onClear,
      onClear = _ref2$onClear === void 0 ? _onClear : _ref2$onClear;

  var _refInput = (0, _react.useRef)(),
      _refGetValue = (0, _react.useRef)(),
      _refIsValid = (0, _react.useRef)(),
      _useState = (0, _react.useState)(function () {
    return _crInitialState(initValue);
  }),
      state = _useState[0],
      setState = _useState[1],
      value = state.value,
      isValid = state.isValid,
      errorInput = state.errorInput,
      _hChangeValue = (0, _react.useCallback)(function (event) {
    var value = event.target.value;
    setState(onTest(value) ? {
      value: value,
      isValid: true,
      errorInput: void 0
    } : {
      value: value,
      isValid: false
    });
  }, [onTest]),
      _hKeyDown = (0, _useInputKeyDown["default"])({
    onEnter: onEnter,
    onDelete: function onDelete() {
      return setState(_crInitialState(initValue));
    }
  }, [initValue, onEnter]),
      _hClear = (0, _react.useCallback)(function () {
    onClear();

    _refInput.current.focus();

    var _initValue = isClearBlank ? '' : initValue;

    setState(_crInitialState(_initValue));
  }, [initValue, onClear, isClearBlank]);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    if (state.initValue !== initValue) {
      setState(_crInitialState(initValue));
    }
  }, [initValue]);
  /*state.initValue*/

  /*eslint-enable react-hooks/exhaustive-deps */

  _refGetValue.current = function () {
    return (value || '').trim();
  };

  _refIsValid.current = function () {
    return onTest(value);
  };

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getValue: function getValue() {
        return _refGetValue.current();
      },
      isValid: function isValid() {
        return _refIsValid.current();
      },
      focus: function focus() {
        return _refInput.current.focus();
      },
      showErrMsg: function showErrMsg() {
        return setState(function (prevState) {
          return (0, _extends2["default"])({}, prevState, {
            isValid: false,
            errorInput: errorMsg
          });
        });
      }
    };
  }, [errorMsg]);

  var _inputStyle = _crInputStyle(isValid),
      _btClearStyle = _crBtClearStyle(isValid);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, _Input["default"].ROOT, rootStyle),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "text",
      style: (0, _extends2["default"])({}, S.INPUT, inputStyle, _inputStyle),
      ref: _refInput,
      name: "text-date" //autoComplete="new-text-date"
      ,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: false,
      placeholder: placeholder,
      value: value,
      maxLength: maxLength,
      onChange: _hChangeValue,
      onKeyDown: _hKeyDown
    }), value || errorInput ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClear["default"], {
      style: _btClearStyle,
      onClick: _hClear
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(ErrMsg, {
      msg: errorInput
    })]
  });
});
/*
InputPattern.propTypes = {
  rootStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  initValue: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  errorMsg: PropTypes.string,
  onTest: PropTypes.func,
  onEnter: PropTypes.func,
  onClear: PropTypes.func
}
*/

var _default = InputPattern;
exports["default"] = _default;
//# sourceMappingURL=InputPattern.js.map