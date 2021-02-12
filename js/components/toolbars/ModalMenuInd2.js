"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useProperty3 = _interopRequireDefault(require("../hooks/useProperty"));

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

var RowType1 = function RowType1(_ref) {
  var caption = _ref.caption,
      is = _ref.is,
      onPlus = _ref.onPlus,
      onColor = _ref.onColor;

  var _compAfter = is ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgPlus, {
    style: S.INLINE,
    onClick: onPlus
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].OpenClose, {
    caption: caption,
    style: S.ROOT_OC,
    ocStyle: S.OC,
    captionStyle: S.CAPTION,
    openColor: OC_COLOR,
    CompAfter: _compAfter,
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

  var _useState = (0, _react.useState)(false),
      isRate = _useState[0],
      setIsRate = _useState[1],
      _useProperty = (0, _useProperty3["default"])(DF_COLOR),
      setRateColor = _useProperty[0],
      getRateColor = _useProperty[1],
      _useState2 = (0, _react.useState)(false),
      isDiff = _useState2[0],
      setIsDiff = _useState2[1],
      _useProperty2 = (0, _useProperty3["default"])(DF_COLOR),
      setDiffColor = _useProperty2[0],
      getDiffColor = _useProperty2[1],
      _hRate = function _hRate() {
    var chart = getChart(),
        hasAdded = addCategoryRateTo(chart, getRateColor());
    setIsRate(hasAdded);
  },
      _hDiff = function _hDiff() {
    var chart = getChart(),
        hasAdded = addCategoryDiffTo(chart, getDiffColor());
    setIsDiff(hasAdded);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup["default"], {
    style: (0, _extends2["default"])({}, _ModalMenu["default"].ROOT, style),
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RowType1, {
        caption: "Rate (S1/S2)",
        is: isRate,
        onPlus: _hRate,
        onColor: setRateColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RowType1, {
        caption: "Diff (S1-S2)",
        is: isDiff,
        onPlus: _hDiff,
        onColor: setDiffColor
      })]
    })
  });
};

var _default = ModalMenuInd2;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuInd2.js.map