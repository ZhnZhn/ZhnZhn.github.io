"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useProperty2 = _interopRequireDefault(require("../hooks/useProperty"));

var _IndicatorBuilder = _interopRequireDefault(require("../../charts/IndicatorBuilder"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu.Style"));

var _A = _interopRequireDefault(require("../zhn/A"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var addCategoryRateTo = _IndicatorBuilder["default"].addCategoryRateTo,
    addCategoryDiffTo = _IndicatorBuilder["default"].addCategoryDiffTo;
var DF_COLOR = '#2b908f';
var OC_COLOR = 'black';
var S = {
  PANE: {
    width: 160,
    margin: 8
  },
  COLOR: {
    display: 'inline-block',
    paddingLeft: 10
  },
  //OC
  ROOT_OC: {
    lineHeight: 'unset',
    paddingBottom: 4,
    marginLeft: -8
  },
  OC: {
    display: 'inline-block',
    height: 32,
    paddingTop: 4,
    width: 'auto',
    paddingRight: 8
  },
  CAPTION: {
    color: OC_COLOR
  },
  //COLOR
  NONE: {
    display: 'none'
  },
  COLOR_INPUT: {
    marginBottom: 2
  }
};

var _useRowType1 = function _useRowType1(mathFn, getChart) {
  var _useState = (0, _react.useState)(false),
      is = _useState[0],
      setIs = _useState[1],
      _useProperty = (0, _useProperty2["default"])(DF_COLOR),
      setColor = _useProperty[0],
      getColor = _useProperty[1],
      _onPlus = function _onPlus() {
    setIs(mathFn(getChart(), getColor()));
  },
      compAfter = is ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgPlus, {
    style: S.INLINE,
    onClick: _onPlus
  });

  return [compAfter, setColor];
};

var RowType1 = function RowType1(_ref) {
  var caption = _ref.caption,
      mathFn = _ref.mathFn,
      getChart = _ref.getChart;

  var _useRowType = _useRowType1(mathFn, getChart),
      compAfter = _useRowType[0],
      onColor = _useRowType[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].OpenClose, {
    caption: caption,
    style: S.ROOT_OC,
    ocStyle: S.OC,
    captionStyle: S.CAPTION,
    openColor: OC_COLOR,
    CompAfter: compAfter,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputColor, {
      styleRoot: S.COLOR,
      styleCaption: S.NONE,
      styleInput: S.COLOR_INPUT,
      initValue: DF_COLOR,
      onEnter: onColor
    })
  });
};

var ModalMenuInd2 = function ModalMenuInd2(_ref2) {
  var style = _ref2.style,
      isShow = _ref2.isShow,
      onClose = _ref2.onClose,
      getChart = _ref2.getChart;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup["default"], {
    style: (0, _extends2["default"])({}, _ModalMenu["default"].ROOT, style),
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RowType1, {
        caption: "Rate (S1/S2)",
        mathFn: addCategoryRateTo,
        getChart: getChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RowType1, {
        caption: "Diff (S1-S2)",
        mathFn: addCategoryDiffTo,
        getChart: getChart
      })]
    })
  });
};

var _default = ModalMenuInd2;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuInd2.js.map