"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _RowCaptionInput = _interopRequireDefault(require("./RowCaptionInput"));
var _ModalMenu = require("./ModalMenu.Style");
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
const ModalMenuAppearance = _ref => {
  let {
    style,
    isShow,
    onClose,
    getChart,
    config
  } = _ref;
  /*eslint-disable react-hooks/exhaustive-deps */
  const _refPointWidth = (0, _uiApi.useRef)(),
    [_toggleDataLabels, _onPointWidth] = (0, _uiApi.useMemo)(() => [is => getChart().zhDataLabels(is), () => {
      const pointWidth = parseFloat((0, _uiApi.getInputValue)(_refPointWidth));
      if (pointWidth > 0 && pointWidth < 21) {
        getChart().zhSetPointWidth(pointWidth);
      }
    }], []);
  // getChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_MENU_PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
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
    })
  });
};
var _default = exports.default = ModalMenuAppearance;
//# sourceMappingURL=ModalMenuAppearance.js.map