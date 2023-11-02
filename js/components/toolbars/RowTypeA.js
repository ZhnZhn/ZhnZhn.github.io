"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _A = _interopRequireDefault(require("../zhn/A"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const DF_COLOR = '#2b908f',
  S_ROOT_OC = {
    lineHeight: 'unset',
    paddingBottom: 4,
    marginLeft: -8
  },
  S_OC = {
    display: 'inline-block',
    height: 32,
    paddingTop: 4,
    width: 'auto',
    paddingRight: 8,
    marginRight: 6
  },
  S_INPUT_COLOR = {
    paddingLeft: 10
  };
const _useRowTypeA = (mathFn, getChart, dfColor) => {
  const [is, setIs] = (0, _uiApi.useState)(false),
    [setColor, getColor] = (0, _useProperty.default)(dfColor),
    _onPlus = () => {
      setIs(mathFn(getChart(), getColor()));
    },
    compAfter = is ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgPlus, {
      onClick: _onPlus
    });
  return [compAfter, setColor];
};
const RowTypeA = _ref => {
  let {
    caption,
    dfColor = DF_COLOR,
    mathFn,
    getChart
  } = _ref;
  const [compAfter, onColor] = _useRowTypeA(mathFn, getChart, dfColor);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.OpenClose, {
    caption: caption,
    className: _styleFn.CL_OC_BLACK,
    style: S_ROOT_OC,
    ocStyle: S_OC,
    CompAfter: compAfter,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputColor, {
      style: S_INPUT_COLOR,
      initValue: dfColor,
      onEnter: onColor
    })
  });
};
var _default = exports.default = RowTypeA;
//# sourceMappingURL=RowTypeA.js.map