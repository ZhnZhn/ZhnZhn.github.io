"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _RowCheckBoxView = _interopRequireDefault(require("./RowCheckBoxView"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const RowCheckBox2 = _ref => {
  let {
    initialValue,
    onToggle,
    id,
    ...restProps
  } = _ref;
  const [_value, _setValue] = (0, _uiApi.useState)(() => !!initialValue),
    [_hCheck, _hUnCheck] = (0, _uiApi.useMemo)(() => [() => {
      onToggle(true, id);
      _setValue(true);
    }, () => {
      onToggle(false, id);
      _setValue(false);
    }], [onToggle, id]);
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
  checkedColor: PropTypes.string,

  initialValue: PropTypes.bool,
  onToggle: PropTypes.func
  id: PropTypes.string
}
*/
var _default = RowCheckBox2;
exports.default = _default;
//# sourceMappingURL=RowCheckBox2.js.map