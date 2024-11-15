"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useChartMethods = _interopRequireDefault(require("./useChartMethods"));
var _useChartToolBar = _interopRequireDefault(require("./useChartToolBar"));
var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_WITH_SCROLL_X = "with-scroll-x",
  CL_SCROLL_X = (0, _styleFn.crWithScrollCn)(CL_WITH_SCROLL_X),
  CL_BT_R = `${CL_WITH_SCROLL_X}__bt-r`,
  S_BT_R = {
    left: 440,
    width: 36
  };
const _isHrzScrollable = nodeEl => nodeEl && nodeEl.scrollWidth > nodeEl.clientWidth;
const _scrollNodeToLeft = (ref, left) => {
  const nodeEl = (0, _uiApi.getRefValue)(ref);
  if (_isHrzScrollable(nodeEl)) {
    if ((0, _uiApi.isFn)(nodeEl.scroll)) {
      nodeEl.scroll({
        left,
        behavior: "smooth"
      });
    } else {
      nodeEl.scrollLeft = left;
    }
  }
};
const ChartToolbar = _ref => {
  let {
    hasError,
    config,
    onMiniChart,
    getChart,
    onAddMfi,
    onRemoveMfi,
    onClickLegend,
    onAddToWatch,
    onCopy,
    onPasteTo,
    onZoom,
    onClickInfo
  } = _ref;
  const _refToolbar = (0, _uiApi.useRef)(),
    chartHandlers = (0, _useChartMethods.default)(getChart, onZoom, onCopy, onPasteTo),
    [_crModalMenuLeftStyle, _hClickR] = (0, _uiApi.useMemo)(() => [(isShow, style) => {
      if (!isShow) {
        return;
      }
      const nodeEl = (0, _uiApi.getRefValue)(_refToolbar),
        {
          scrollLeft
        } = nodeEl || {};
      return (0, _uiApi.isNumber)(scrollLeft) ? {
        left: style.left - scrollLeft
      } : void 0;
    }, () => {
      _scrollNodeToLeft(_refToolbar, 0);
    }], []);
  const [_btInfo, _btTabIndicator, _btAppearance, _btLegend, _btFn, _btTabMini, _modalMenuArr] = (0, _useChartToolBar.default)(hasError, _crModalMenuLeftStyle, config, getChart, onClickInfo, onClickLegend, onAddToWatch, onAddMfi, onRemoveMfi, onMiniChart, chartHandlers);
  if (hasError) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: _refToolbar,
      className: CL_SCROLL_X,
      children: _btInfo
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [_modalMenuArr, /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: _refToolbar,
      className: CL_SCROLL_X,
      children: [_btTabIndicator, _btAppearance, _btLegend, _btFn, _btInfo, _btTabMini, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
        is: !!_btTabMini,
        className: CL_BT_R,
        style: S_BT_R,
        caption: ">",
        onClick: _hClickR
      })]
    })]
  });
};

/*
ChartToolbar.propTypes = {
  hasError: PropTypes.bool,

  style: PropTypes.object,
  config: PropTypes.object,

  getChart: PropTypes.func,

  onMiniChart: PropTypes.func,
  onAddMfi: PropTypes.func,
  onRemoveMfi: PropTypes.func,
  onClickLegend: PropTypes.func,
  onAddToWatch: PropTypes.func,
  onCopy: PropTypes.func,
  onPasteTo: PropTypes.func,
  onZoom: PropTypes.func,
  onClickInfo: PropTypes.func
}
*/
var _default = exports.default = ChartToolbar;
//# sourceMappingURL=ChartToolBar.js.map