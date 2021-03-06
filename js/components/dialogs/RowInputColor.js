"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _Model = _interopRequireDefault(require("../../constants/Model"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));

var _ModalPalette = _interopRequireDefault(require("../zhn-moleculs/ModalPalette"));

//import PropTypes from "prop-types";
var CL_INPUT_COLOR = 'p-r va-b';
var DF_COLOR = '#90ed7d';
var S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 80,
    marginRight: 8,
    marginBottom: 2,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var _onEnter = function _onEnter() {};

var _crCaption = function _crCaption(caption) {
  return caption && caption.indexOf(':') === -1 ? caption + ":" : caption;
};

var RowInputColor = function RowInputColor(_ref) {
  var style = _ref.style,
      captionStyle = _ref.captionStyle,
      inputStyle = _ref.inputStyle,
      caption = _ref.caption,
      _ref$initValue = _ref.initValue,
      initValue = _ref$initValue === void 0 ? DF_COLOR : _ref$initValue,
      _ref$onEnter = _ref.onEnter,
      onEnter = _ref$onEnter === void 0 ? _onEnter : _ref$onEnter;

  var _refCellColor = (0, _react.useRef)(),
      _useState = (0, _react.useState)(initValue),
      value = _useState[0],
      setValue = _useState[1],
      _useState2 = (0, _react.useState)(false),
      isShowPallete = _useState2[0],
      setIsShowPallette = _useState2[1],
      _hEnter = (0, _react.useCallback)(function (value) {
    onEnter(value);
    setValue(value);
  }, [onEnter]),
      _hClickPallete = (0, _react.useCallback)(function (color, event) {
    if (event.target === _refCellColor.current) {
      setIsShowPallette(function (is) {
        return !is;
      });
    }
  }, []),
      _hClosePalette = (0, _react.useCallback)(function () {
    setIsShowPallette(false);
  }, []);

  (0, _react.useEffect)(function () {
    return setValue(initValue);
  }, [initValue]);

  var _caption = _crCaption(caption);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.ROOT, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [_caption && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: (0, _extends2["default"])({}, S.CAPTION, captionStyle),
        children: _caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
        style: (0, _extends2["default"])({}, S.INPUT_TEXT, inputStyle),
        initValue: value,
        maxLength: 20,
        onEnter: _hEnter
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor["default"], {
      ref: _refCellColor,
      className: CL_INPUT_COLOR,
      color: value,
      onClick: _hClickPallete,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPalette["default"], {
        isShow: isShowPallete,
        model: _Model["default"].palette,
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


var _default = RowInputColor;
exports["default"] = _default;
//# sourceMappingURL=RowInputColor.js.map