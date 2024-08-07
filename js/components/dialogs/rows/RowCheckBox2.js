"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _RowCheckBox = _interopRequireDefault(require("./RowCheckBox1"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const RowCheckBox2 = _ref => {
  let {
    onToggle,
    id,
    ...restProps
  } = _ref;
  const [onCheck, onUnCheck] = (0, _uiApi.useMemo)(() => [() => onToggle(true, id), () => onToggle(false, id)], [onToggle, id]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
    ...restProps,
    onCheck: onCheck,
    onUnCheck: onUnCheck
  });
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  color: PropTypes.string,

  initialValue: PropTypes.bool,
  onToggle: PropTypes.func
  id: PropTypes.string
}
*/
var _default = exports.default = RowCheckBox2;
//# sourceMappingURL=RowCheckBox2.js.map