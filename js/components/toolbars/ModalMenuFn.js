"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _dateFn = require("../../utils/dateFn");
var _menuModelFn = require("../menuModelFn");
var _ModalSlider = _interopRequireDefault(require("../zhn-modal-slider/ModalSlider"));
var _ModalMenu = require("./ModalMenu.Style");
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_SLIDER = (0, _styleFn.crElementBorderCn)();
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
  return !(from === to && to === EPOCH_DMY);
};
const _crModelMore = (props, isItemZoom) => (0, _menuModelFn.crSliderMenu)(_styleFn.CL_ROW_PANE_TOPIC, 180, 2, {
  p0: [(0, _menuModelFn.crSubItem)("p1", "Chart"), (0, _uiApi.isFn)(props.onAddToWatch) ? (0, _menuModelFn.crItem)("Add To", props.onAddToWatch) : void 0, _isMinMax(props.config) ? (0, _menuModelFn.crItem)("MinMax", props.onMinMax, false) : void 0, isItemZoom ? (0, _menuModelFn.crItem)("Zoom", props.onZoom) : void 0, (0, _menuModelFn.crItem)("Copy", props.onCopy), (0, _menuModelFn.crItem)("PasteTo", props.onPasteTo)].filter(Boolean),
  p1: [(0, _menuModelFn.crItem)("x2 Height", props.onX2H, false), (0, _menuModelFn.crItem)("Full Screen", props.onFullScreen), (0, _menuModelFn.crItem)("Export As", props.onExport), (0, _menuModelFn.crItem)("Print", props.onPrint)]
});
const ModalMenuFn = props => {
  const {
      getChart,
      style,
      isShow,
      onClose
    } = props,
    _isItemZoom = _isZoom(getChart)
    /*eslint-disable react-hooks/exhaustive-deps*/,
    _model = (0, _uiApi.useMemo)(() => _crModelMore(props, _isItemZoom), [_isItemZoom]);
  /*eslint-enable react-hooks/exhaustive-deps*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.default, {
    isShow: isShow,
    className: CL_MENU_SLIDER,
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    model: _model,
    onClose: onClose
  });
};
var _default = exports.default = ModalMenuFn;
//# sourceMappingURL=ModalMenuFn.js.map