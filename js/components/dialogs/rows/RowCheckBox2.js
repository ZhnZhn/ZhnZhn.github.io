"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _RowCheckBoxView = _interopRequireDefault(require("./RowCheckBoxView"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const RowCheckBox2 = props => {
  const {
      onToggle,
      id
    } = props,
    [_value, _setValue] = (0, _uiApi.useState)(() => !!props.initialValue),
    [_hCheck, _hUnCheck] = (0, _uiApi.useMemo)(() => [() => {
      onToggle(id, true);
      _setValue(true);
    }, () => {
      onToggle(id, false);
      _setValue(false);
    }], [onToggle, id]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBoxView.default, {
    style: props.style,
    caption: props.caption,
    captionStyle: props.captionStyle,
    checkedColor: props.checkedColor,
    value: _value,
    hCheck: _hCheck,
    hUnCheck: _hUnCheck
  });
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  checkedColor: PropTypes.string,
  initialValue: PropTypes.bool,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  onToggle: PropTypes.func
  id: PropTypes.string
}
*/
var _default = RowCheckBox2;
exports.default = _default;
//# sourceMappingURL=RowCheckBox2.js.map