"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _Row = require("./Row.Style");
var _jsxRuntime = require("react/jsx-runtime");
const DF_COLOR = '#2b908f',
  _S_OC = {
    ..._Row.S_OC,
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
    compAfter = is ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    caption: caption,
    className: _styleFn.CL_OPEN_CLOSE_BLACK,
    style: _Row.S_ROOT_OC,
    ocStyle: _S_OC,
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