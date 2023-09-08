"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useRefBool = _interopRequireDefault(require("../hooks/useRefBool"));
var _Model = _interopRequireDefault(require("../../constants/Model"));
var _SvgCheckBox = _interopRequireDefault(require("../zhn/SvgCheckBox"));
var _InputColor = _interopRequireDefault(require("../zhn-moleculs/InputColor"));
var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));
var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));
var _GeneralStyles = require("../styles/GeneralStyles");
var _jsxRuntime = require("react/jsx-runtime");
const CHECKED_COLOR = '#1b2836',
  DF_COLOR = '#7cb5ec',
  CL_INPUT_COLOR = 'p-r va-m',
  S_ROOT = {
    padding: '0 0 16px 16px'
  },
  _S_VALIGN_MIDDLE = {
    verticalAlign: 'middle'
  },
  S_TITLE = {
    ..._S_VALIGN_MIDDLE,
    ..._GeneralStyles.S_FONT_BOLD_NON_SELECT,
    display: 'inline-block',
    color: 'black',
    width: 100,
    padding: '0 16px 0 4px',
    textAlign: 'right'
  },
  S_CHECK_BOX = {
    ..._S_VALIGN_MIDDLE
  },
  S_SELECT = {
    ..._S_VALIGN_MIDDLE,
    marginLeft: 24
  },
  S_SELECT_OPTIONS = {
    minHeight: 100
  },
  FN_NOOP = () => {};
const SeriaRow = props => {
  const {
      seria,
      yAxisOptions,
      compIndex,
      onReg = FN_NOOP,
      onUnReg = FN_NOOP
    } = props,
    {
      color,
      name = ''
    } = seria,
    ref = (0, _uiApi.useRef)(),
    [setYAxis, getYAxis] = (0, _useProperty.default)(),
    [_refIsChecked, _hCheck, _hUnCheck] = (0, _useRefBool.default)(false),
    [_color, _setColor] = (0, _uiApi.useState)(() => color || DF_COLOR);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    getValue: () => {
      const {
          userOptions
        } = seria,
        {
          data,
          name
        } = userOptions || {};
      return {
        isChecked: (0, _uiApi.getRefValue)(_refIsChecked),
        color: _color,
        yIndex: (getYAxis() || {}).value,
        data,
        name
      };
    }
  }), [_color]);
  //seria
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    onReg(ref, compIndex);
    return () => onUnReg(compIndex);
  }, []);
  //compIndex, onReg, onUnReg
  (0, _uiApi.useEffect)(() => {
    setYAxis();
  }, [props]);
  //setYAxis
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      style: S_CHECK_BOX,
      color: CHECKED_COLOR,
      onCheck: _hCheck,
      onUnCheck: _hUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_TITLE,
      text: name
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputColor.default, {
      className: CL_INPUT_COLOR,
      model: _Model.default.palette,
      color: _color,
      setColor: _setColor
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
      placeholder: "withYAxis",
      width: "135",
      style: S_SELECT,
      optionsStyle: S_SELECT_OPTIONS,
      options: yAxisOptions,
      noFooterBts: true,
      onSelect: setYAxis
    })]
  });
};
var _default = SeriaRow;
exports.default = _default;
//# sourceMappingURL=SeriaRow.js.map