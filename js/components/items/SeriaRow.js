"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useRefBool = _interopRequireDefault(require("../hooks/useRefBool"));

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _Model = _interopRequireDefault(require("../../constants/Model"));

var _SvgCheckBox = _interopRequireDefault(require("../zhn/SvgCheckBox"));

var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));

var _ModalPalette = _interopRequireDefault(require("../zhn-moleculs/ModalPalette"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));

var _jsxRuntime = require("react/jsx-runtime");

const TH_ID = 'ROW_CHECKBOX',
      CHECKED_COLOR = '#1b2836',
      DF_COLOR = '#7cb5ec',
      CL_INPUT_COLOR = 'p-r va-m',
      S_ROOT = {
  padding: '0 0 16px 16px'
},
      S_TITLE = {
  display: 'inline-block',
  color: '##1b75bb',
  width: 100,
  padding: '0 16px 0 4px',
  verticalAlign: 'middle',
  textAlign: 'right',
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none'
},
      S_CHECK_BOX = {
  verticalAlign: 'middle'
},
      S_SELECT = {
  marginLeft: 24,
  verticalAlign: 'middle'
},
      S_SELECT_OPTIONS = {
  minHeight: 100
},
      FN_NOOP = () => {};

const SeriaRow = props => {
  const {
    seria = {},
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
        [_color, _setColor] = (0, _uiApi.useState)(() => color || DF_COLOR),
        [isShowPallete, _hOpenPallete, _hClosePalette] = (0, _useBool.default)(false),
        TS = (0, _useTheme.default)(TH_ID);
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
  }), [_color]); //seria

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    onReg(ref, compIndex);
    return () => onUnReg(compIndex);
  }, []); //compIndex, onReg, onUnReg

  (0, _uiApi.useEffect)(() => {
    setYAxis();
  }, [props]); //setYAxis

  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      style: S_CHECK_BOX,
      color: CHECKED_COLOR,
      checkedColor: TS.CHECKED_COLOR,
      onCheck: _hCheck,
      onUnCheck: _hUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_TITLE,
      text: name
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor.default, {
      className: CL_INPUT_COLOR,
      color: _color,
      onClick: _hOpenPallete,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPalette.default, {
        isShow: isShowPallete,
        model: _Model.default.palette,
        onClickCell: _setColor,
        onClose: _hClosePalette
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
      placeholder: "withYAxis",
      width: "150",
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