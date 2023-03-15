"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _RowCheckBoxView = _interopRequireDefault(require("./RowCheckBoxView"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const DF_ON_TOGGLE = () => {};
const RowCheckBox3 = _ref => {
  let {
    onToggle = DF_ON_TOGGLE,
    ...restProps
  } = _ref;
  const [_hCheck, _hUnCheck] = (0, _uiApi.useMemo)(() => [() => {
    onToggle(true);
  }, () => {
    onToggle(false);
  }], [onToggle]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBoxView.default, {
    ...restProps,
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
  value: PropTypes.bool,

  onToggle: PropTypes.func
}
*/
var _default = RowCheckBox3;
exports.default = _default;
//# sourceMappingURL=RowCheckBox3.js.map