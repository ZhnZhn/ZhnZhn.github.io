"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ModalPopup = require("../zhn-moleculs/ModalPopup");
var _crModalPopup = _interopRequireDefault(require("./crModalPopup"));
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _RowCaptionInput = _interopRequireDefault(require("./RowCaptionInput"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MENU_PANE = {
    margin: "12px 0 10px 10px"
  },
  S_INPUT_SWITCH = {
    padding: '0 12px 14px 0'
  },
  S_CAPTION_STYLE = {
    width: void 0,
    paddingRight: 4
  };
const ModalMenuAppearanceView = _ref => {
  let {
    style,
    isShow,
    onClose,
    getChart,
    config
  } = _ref;
  const [refFirstItem, _refPointWidth] = (0, _ModalPopup.useModalPopup)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    [_toggleDataLabels, _onPointWidth] = (0, _uiApi.useMemo)(() => [is => getChart().zhDataLabels(is), () => {
      const pointWidth = parseFloat((0, _uiApi.getInputValue)(_refPointWidth));
      if (pointWidth > 0 && pointWidth < 21) {
        getChart().zhSetPointWidth(pointWidth);
      }
    }], []);
  // getChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_MENU_PANE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
      refEl: refFirstItem,
      caption: "Data Labels",
      style: S_INPUT_SWITCH,
      onToggle: _toggleDataLabels
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCaptionInput.default, {
      refEl: _refPointWidth,
      caption: "Point Width",
      isBtAdd: !1,
      captionStyle: S_CAPTION_STYLE,
      initValue: 4,
      min: 1,
      max: 99,
      onAdd: _onPointWidth
    })]
  });
};
var _default = exports.default = (0, _crModalPopup.default)(ModalMenuAppearanceView);
//# sourceMappingURL=ModalMenuAppearance.js.map