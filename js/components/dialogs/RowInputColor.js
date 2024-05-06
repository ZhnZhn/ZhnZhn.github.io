"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Model = _interopRequireDefault(require("../../constants/Model"));
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));
var _ModalPalette = _interopRequireDefault(require("../zhn-moleculs/ModalPalette"));
var _crCaption = _interopRequireDefault(require("./fns/crCaption"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_INPUT_COLOR = 'p-r va-b';
const DF_COLOR = '#90ed7d';
const S_ROOT = {
    padding: '6px 6px 6px 0'
  },
  S_CAPTION = {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  S_INPUT_TEXT = {
    width: 80,
    margin: '0 8px 2px 5px'
  };
const NOOP = () => {};
const RowInputColor = _ref => {
  let {
    style,
    captionStyle,
    inputStyle,
    caption,
    initValue = DF_COLOR,
    onEnter = NOOP
  } = _ref;
  const _refCellColor = (0, _uiApi.useRef)(),
    [value, setValue] = (0, _uiApi.useState)(initValue),
    [isShowPallete, setIsShowPallette] = (0, _uiApi.useState)(false),
    _hEnter = (0, _uiApi.useCallback)(value => {
      onEnter(value);
      setValue(value);
    }, [onEnter]),
    _hClickPallete = (0, _uiApi.useCallback)((color, event) => {
      if (event.target === _refCellColor.current) {
        setIsShowPallette(is => !is);
      }
    }, []),
    _hClosePalette = (0, _uiApi.useCallback)(() => {
      setIsShowPallette(false);
    }, []);
  (0, _uiApi.useEffect)(() => setValue(initValue), [initValue]);
  const _caption = (0, _crCaption.default)(caption);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [_caption && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          ...S_CAPTION,
          ...captionStyle
        },
        children: _caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
        style: {
          ...S_INPUT_TEXT,
          ...inputStyle
        },
        initValue: value,
        maxLength: 20,
        onEnter: _hEnter
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor.default, {
      refEl: _refCellColor,
      className: CL_INPUT_COLOR,
      color: value,
      onClick: _hClickPallete,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPalette.default, {
        isShow: isShowPallete,
        model: _Model.default.palette,
        onClickCell: _hEnter,
        onClose: _hClosePalette
      })
    })]
  });
};

/*
RowInputColor.propTypes = {
  style: PropTypes.object,
  captionStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/
var _default = exports.default = RowInputColor;
//# sourceMappingURL=RowInputColor.js.map