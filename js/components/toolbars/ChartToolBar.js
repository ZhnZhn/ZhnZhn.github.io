"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useChartMethods = _interopRequireDefault(require("./useChartMethods"));
var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));
var _ModalMenuIndicator = _interopRequireDefault(require("./ModalMenuIndicator"));
var _ModalMenuInd = _interopRequireDefault(require("./ModalMenuInd2"));
var _ModalMenuFn = _interopRequireDefault(require("./ModalMenuFn"));
var _ModalMenuMini = _interopRequireDefault(require("./ModalMenuMini"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_WITH_SCROLL_X = "with-scroll-x",
  CL_BT_R = CL_WITH_SCROLL_X + "__bt-r",
  S_BT_IND = {
    left: 8
  },
  S_M_IND = {
    top: 60,
    left: 5
  },
  S_BT_LEGEND = {
    left: 115
  },
  S_BT_FN = {
    left: 190
  },
  S_M_FN = {
    top: 60,
    left: 150
  },
  S_BT_ADD = {
    left: 250
  },
  S_BT_MINI = {
    left: 350,
    width: 68
  },
  S_M_MINI = {
    top: 60,
    left: 290
  },
  S_BT_R = {
    left: 440,
    width: 36
  };
const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';
const _isArr = Array.isArray;
const _isHrzScrollable = node => node && node.scrollWidth > node.clientWidth;
const _scrollNodeToLeft = (ref, left) => {
  const node = (0, _uiApi.getRefValue)(ref);
  if (_isHrzScrollable(node)) {
    if (_isFn(node.scroll)) {
      node.scroll({
        left,
        behavior: 'smooth'
      });
    } else {
      node.scrollLeft = left;
    }
  }
};
const LINE_TYPES = ['area', 'spline', 'line'];
const _isColumnCategoryConfig = function (_temp) {
  let {
    type,
    categories
  } = _temp === void 0 ? {} : _temp;
  return type === 'category' && _isArr(categories);
};
const _isIndicatorTab = (_ref, isWithoutIndicator) => {
  let {
    series,
    xAxis
  } = _ref;
  return !isWithoutIndicator && _isArr(series) && series[0] && (LINE_TYPES.indexOf(series[0].type) !== -1 || _isColumnCategoryConfig(xAxis));
};
const _crModalMenuStyle = (ref, left) => {
  const node = (0, _uiApi.getRefValue)(ref);
  return node && _isNumber(node.scrollLeft) ? {
    left: left - node.scrollLeft
  } : void 0;
};
const ChartToolbar = _ref2 => {
  let {
    hasError,
    style,
    config = {},
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
  } = _ref2;
  const _refToolbar = (0, _uiApi.useRef)(),
    {
      onClick2H,
      onMinMax,
      onZoomChart,
      onCopyChart,
      onPasteToChart
    } = (0, _useChartMethods.default)(getChart, onZoom, onCopy, onPasteTo),
    [isShowInd, toggleInd] = (0, _useToggle.default)(false),
    [isShowFn, toggleFn] = (0, _useToggle.default)(false),
    [isShowMini, toggleMini] = (0, _useToggle.default)(false),
    _hClickR = (0, _uiApi.useCallback)(() => {
      _scrollNodeToLeft(_refToolbar, 0);
    }, []);
  const {
      zhConfig,
      info,
      zhMiniConfigs
    } = config,
    {
      isWithoutIndicator,
      itemConf,
      legend
    } = zhConfig || {},
    _modalMenuArr = [];
  const _btInfo = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
    is: !!info,
    caption: "Info",
    onClick: onClickInfo
  });
  if (hasError) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: _refToolbar,
      className: CL_WITH_SCROLL_X,
      style: style,
      children: _btInfo
    });
  }
  let _btTabIndicator = null;
  if (_isIndicatorTab(config, isWithoutIndicator)) {
    let _tabIndCaption = "Indicator";
    if (_isColumnCategoryConfig(config.xAxis)) {
      _tabIndCaption = "Math";
      _modalMenuArr.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuInd.default, {
        isShow: isShowInd,
        style: S_M_IND,
        config: config,
        getChart: getChart,
        onClose: toggleInd
      }, "menu_ind"));
    } else {
      _modalMenuArr.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuIndicator.default, {
        isShow: isShowInd,
        style: S_M_IND,
        config: config,
        getChart: getChart,
        onAddMfi: onAddMfi,
        onRemoveMfi: onRemoveMfi,
        onClose: toggleInd
      }, "menu_ind"));
    }
    _btTabIndicator = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
      style: S_BT_IND,
      caption: _tabIndCaption,
      isShow: isShowInd,
      isMenu: true,
      onClick: toggleInd
    });
  }
  const _btLegend = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
    is: !!legend,
    style: S_BT_LEGEND,
    caption: "Legend",
    onClick: onClickLegend
  });
  const _btAdd = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
    is: !!itemConf,
    style: S_BT_ADD,
    caption: "Add",
    onClick: onAddToWatch
  });
  let _btTabMini = null;
  if (zhMiniConfigs && zhMiniConfigs.length) {
    _btTabMini = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
      style: S_BT_MINI,
      caption: "Mini",
      isShow: isShowMini,
      isMenu: true,
      onClick: toggleMini
    });
    const _miniStyle = isShowMini ? _crModalMenuStyle(_refToolbar, S_M_MINI.left) : void 0;
    _modalMenuArr.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuMini.default, {
      isShow: isShowMini,
      style: {
        ...S_M_MINI,
        ..._miniStyle
      },
      configs: zhMiniConfigs,
      onClickItem: onMiniChart,
      onClose: toggleMini
    }, "menu_mini"));
  }
  const _fnStyle = isShowFn ? _crModalMenuStyle(_refToolbar, S_BT_FN.left) : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuFn.default, {
      isShow: isShowFn,
      style: {
        ...S_M_FN,
        ..._fnStyle
      },
      config: config,
      getChart: getChart,
      onX2H: onClick2H,
      onMinMax: onMinMax,
      onZoom: onZoomChart,
      onCopy: onCopyChart,
      onPasteTo: onPasteToChart,
      onClose: toggleFn
    }), _modalMenuArr, /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: _refToolbar,
      className: CL_WITH_SCROLL_X,
      style: style,
      children: [_btTabIndicator, _btLegend, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
        style: S_BT_FN,
        caption: "Fn",
        isShow: isShowFn,
        isMenu: true,
        onClick: toggleFn
      }), _btAdd, _btInfo, _btTabMini, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
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
var _default = ChartToolbar;
exports.default = _default;
//# sourceMappingURL=ChartToolBar.js.map