"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _Model = _interopRequireDefault(require("../../constants/Model"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));

var _ModalPalette = _interopRequireDefault(require("../zhn-moleculs/ModalPalette"));

//import PropTypes from "prop-types";
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
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var _onEnter = function _onEnter() {};

var RowInputColor = function RowInputColor(_ref) {
  var styleRoot = _ref.styleRoot,
      styleCaption = _ref.styleCaption,
      styleInput = _ref.styleInput,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? 'Color:' : _ref$caption,
      _ref$initValue = _ref.initValue,
      initValue = _ref$initValue === void 0 ? '#90ed7d' : _ref$initValue,
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

  var _caption = caption.indexOf(':') !== -1 ? caption : caption + ":",
      _cellColorStyle = (0, _react.useMemo)(function () {
    return (0, _extends2["default"])({}, S.COLOR, {
      backgroundColor: value
    });
  }, [value]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.ROOT, styleRoot)
  }, /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.CAPTION, styleCaption)
  }, _caption), /*#__PURE__*/_react["default"].createElement(_InputText["default"], {
    style: (0, _extends2["default"])({}, S.INPUT_TEXT, styleInput),
    initValue: value,
    maxLength: 20,
    onEnter: _hEnter
  })), /*#__PURE__*/_react["default"].createElement(_CellColor["default"], {
    ref: _refCellColor,
    style: _cellColorStyle,
    onClick: _hClickPallete
  }, /*#__PURE__*/_react["default"].createElement(_ModalPalette["default"], {
    isShow: isShowPallete,
    model: _Model["default"].palette,
    onClickCell: _hEnter,
    onClose: _hClosePalette
  })));
};
/*
RowInputColor.propTypes = {
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/


var _default = RowInputColor;
exports["default"] = _default;
//# sourceMappingURL=RowInputColor.js.map