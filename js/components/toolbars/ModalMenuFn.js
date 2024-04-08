"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _dateFn = require("../../utils/dateFn");
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _SubMenuItem = _interopRequireDefault(require("./SubMenuItem"));
var _ModalMenu = require("./ModalMenu.Style");
var _jsxRuntime = require("react/jsx-runtime");
const _isMinMax = config => ((config.yAxis || {}).plotLines || []).length > 0;
const EPOCH_DMY = '01-01-1970';
const _isZoom = getChart => {
  if (!(0, _uiApi.isFn)(getChart)) {
    return false;
  }
  const chart = getChart();
  if (!chart || !(0, _uiApi.isFn)(chart.zhGetFromToDates)) {
    return false;
  }
  const {
    from,
    to
  } = chart.zhGetFromToDates({
    format: _dateFn.mlsToDmy
  });
  return from === to && to === EPOCH_DMY ? false : true;
};
const ModalMenuFn = _ref => {
  let {
    style,
    isShow,
    onClose,
    config,
    getChart,
    onAddToWatch,
    onX2H,
    onMinMax,
    onZoom,
    onCopy,
    onPasteTo
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: isShow,
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: _ModalMenu.S_MODAL_MENU_PANE,
      children: [(0, _uiApi.isFn)(onAddToWatch) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem.default, {
        caption: "Add To",
        onClick: onAddToWatch
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem.default, {
        caption: "x2H",
        onClick: onX2H
      }), _isMinMax(config) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem.default, {
        caption: "MinMax",
        initialIsActive: true,
        onClick: onMinMax
      }), _isZoom(getChart) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem.default, {
        caption: "Zoom",
        onClick: onZoom,
        onClose: onClose
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem.default, {
        caption: "Copy",
        onClick: onCopy,
        onClose: onClose
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem.default, {
        caption: "PasteTo",
        onClick: onPasteTo,
        onClose: onClose
      })]
    })
  });
};
var _default = exports.default = ModalMenuFn;
//# sourceMappingURL=ModalMenuFn.js.map