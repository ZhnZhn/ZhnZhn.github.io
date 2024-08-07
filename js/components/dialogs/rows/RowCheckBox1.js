"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useBool = require("../../hooks/useBool");
var _RowCheckBoxView = _interopRequireDefault(require("./RowCheckBoxView"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const DF_FN = () => {};
const RowCheckBox1 = _ref => {
  let {
    initialValue,
    onCheck = DF_FN,
    onUnCheck = DF_FN,
    ...restProps
  } = _ref;
  const [value, setTrue, setFalse] = (0, _useBool.useBool)(initialValue),
    _hCheck = (0, _uiApi.useCallback)(() => {
      onCheck();
      setTrue();
    }, [onCheck, setTrue]),
    _hUnCheck = (0, _uiApi.useCallback)(() => {
      onUnCheck();
      setFalse();
    }, [onUnCheck, setFalse]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBoxView.default, {
    ...restProps,
    value: value,
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

  initialValue: PropTypes.bool,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func
}
*/
var _default = exports.default = RowCheckBox1;
//# sourceMappingURL=RowCheckBox1.js.map