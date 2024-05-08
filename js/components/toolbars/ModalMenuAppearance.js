"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox1"));
var _RowCaptionInput = _interopRequireDefault(require("./RowCaptionInput"));
var _ModalMenu = require("./ModalMenu.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_CHB = {
    padding: 0
  },
  S_ROW_INPUT = {
    paddingTop: 5,
    paddingLeft: 5
  },
  S_CAPTION_STYLE = {
    width: void 0
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
    [_enableCategoryLabels, _disableCategoryLabels, _onPointWidth] = (0, _uiApi.useMemo)(() => [() => {
      getChart().zhDataLabels(true);
    }, () => {
      getChart().zhDataLabels(false);
    }, () => {
      const pointWidth = parseFloat((0, _uiApi.getInputValue)(_refPointWidth));
      if (pointWidth > 0 && pointWidth < 21) {
        getChart().zhSetPointWidth(pointWidth);
      }
    }], []);
  // getChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: _ModalMenu.S_MENU_PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
        caption: "Data Labels",
        style: S_CHB,
        chbCn: _styleFn.CL_CHB_BLACK,
        btCn: _styleFn.CL_BLACK,
        onCheck: _enableCategoryLabels,
        onUnCheck: _disableCategoryLabels
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCaptionInput.default, {
        refEl: _refPointWidth,
        caption: "Point Width",
        isBtAdd: false,
        style: S_ROW_INPUT,
        captionStyle: S_CAPTION_STYLE,
        initValue: 4,
        maxLength: 2,
        onAdd: _onPointWidth
      })]
    })
  });
};
var _default = exports.default = ModalMenuAppearance;
//# sourceMappingURL=ModalMenuAppearance.js.map