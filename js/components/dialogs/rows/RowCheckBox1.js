"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));
var _RowCheckBoxView = _interopRequireDefault(require("./RowCheckBoxView"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const _isFn = fn => typeof fn == 'function',
  _isUndefined = v => typeof v === 'undefined',
  _isBool = bool => typeof bool === 'boolean';
const RowCheckBox1 = _ref => {
  let {
    value,
    initValue,
    onCheck,
    onUnCheck,
    onToggle,
    ...restProps
  } = _ref;
  const [valueState, setValueState] = (0, _uiApi.useState)(() => _isUndefined(value) ? !!initValue : void 0),
    _isValueState = (0, _useRefInit.default)(() => _isBool(valueState)),
    _value = _isValueState ? valueState : value,
    _hCheck = (0, _uiApi.useCallback)(() => {
      if (_isFn(onCheck)) {
        onCheck();
      } else if (_isFn(onToggle)) {
        onToggle(true);
      }
      if (_isValueState) {
        setValueState(true);
      }
    }, [onCheck, onToggle, _isValueState]),
    _hUnCheck = (0, _uiApi.useCallback)(() => {
      if (_isFn(onUnCheck)) {
        onUnCheck();
      } else if (_isFn(onToggle)) {
        onToggle(false);
      }
      if (_isValueState) {
        setValueState(false);
      }
    }, [onUnCheck, onToggle, _isValueState]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBoxView.default, {
    ...restProps,
    value: _value,
    hCheck: _hCheck,
    hUnCheck: _hUnCheck
  });
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  color: PropTypes.string,

  initValue: PropTypes.bool,
  value: PropTypes.bool,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  onToggle: PropTypes.func
}
*/
var _default = RowCheckBox1;
exports.default = _default;
//# sourceMappingURL=RowCheckBox1.js.map