"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _has = require("../has");
var _useToggle = require("../hooks/useToggle");
var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));
var _ModalMenuFn = _interopRequireDefault(require("./ModalMenuFn"));
var _ModalMenuIndicator = _interopRequireDefault(require("./ModalMenuIndicator"));
var _ModalMenuInd = _interopRequireDefault(require("./ModalMenuInd2"));
var _ModalMenuAppearance = _interopRequireDefault(require("./ModalMenuAppearance"));
var _ModalMenuMini = _interopRequireDefault(require("./ModalMenuMini"));
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
const _isArr = Array.isArray,
  MODAL_POPUP_STYLE_TOP = (0, _has.isWideWidth)() ? 75 : 65,
  _crModalPopupStyle = left => ({
    top: MODAL_POPUP_STYLE_TOP,
    left
  }),
  _crLeftStyle = left => ({
    left
  }),
  S_BT_IND = _crLeftStyle(8),
  S_M_IND = _crModalPopupStyle(5),
  S_BT_APPEARANCE = _crLeftStyle(95),
  S_M_APPEARANCE = _crModalPopupStyle(75),
  S_BT_LEGEND = _crLeftStyle(115),
  S_BT_FN_APPEARANCE = _crLeftStyle(230),
  S_BT_FN = _crLeftStyle(190),
  S_M_FN = _crModalPopupStyle(175),
  S_BT_MINI = {
    left: 350,
    width: 68
  },
  S_M_MINI = _crModalPopupStyle(290);
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
const useChartToolBar = (hasError, _crModalMenuLeftStyle, config, getChart, onClickInfo, onClickLegend, onAddToWatch, onAddMfi, onRemoveMfi, onMiniChart, chartHandlers) => {
  const {
      zhConfig,
      info,
      zhMiniConfigs
    } = config || {},
    {
      isWithoutIndicator,
      itemConf,
      legend
    } = zhConfig || {},
    [isShowInd, toggleInd] = (0, _useToggle.useToggle)(),
    [isShowAppearance, toggleAppearance] = (0, _useToggle.useToggle)(),
    [isShowFn, toggleFn] = (0, _useToggle.useToggle)(),
    [isShowMini, toggleMini] = (0, _useToggle.useToggle)(),
    _modalMenuArr = [];
  const _btInfo = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
    is: !!info,
    caption: "Info",
    onClick: onClickInfo
  });
  if (hasError) {
    return [_btInfo];
  }
  _modalMenuArr.push(/*#__PURE__*/(0, _react.createElement)(_ModalMenuFn.default, {
    ...chartHandlers,
    isShow: isShowFn,
    style: {
      ...S_M_FN,
      ..._crModalMenuLeftStyle(isShowFn, S_BT_FN)
    },
    config: config,
    getChart: getChart,
    onAddToWatch: itemConf ? onAddToWatch : void 0,
    onClose: toggleFn,
    key: "fn"
  }));
  const _btLegend = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
    is: !!legend,
    style: S_BT_LEGEND,
    caption: "Legend",
    onClick: onClickLegend
  });
  let _btTabIndicator = null,
    _btAppearance = null;
  if (_isIndicatorTab(config, isWithoutIndicator)) {
    let _tabIndCaption = "Indicator";
    if (_isColumnCategoryConfig(config.xAxis)) {
      _tabIndCaption = "Math";
      _modalMenuArr.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuInd.default, {
        isShow: isShowInd,
        style: S_M_IND,
        config: config,
        getChart: getChart,
        onClose: toggleInd
      }, "ind2"));
      _modalMenuArr.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuAppearance.default, {
        isShow: isShowAppearance,
        style: S_M_APPEARANCE,
        config: config,
        getChart: getChart,
        onClose: toggleAppearance
      }, "appearance"));
      _btAppearance = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
        style: S_BT_APPEARANCE,
        caption: "Appearance",
        isMenu: true,
        onClick: toggleAppearance
      });
    } else {
      _modalMenuArr.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuIndicator.default, {
        isShow: isShowInd,
        style: S_M_IND,
        config: config,
        getChart: getChart,
        onAddMfi: onAddMfi,
        onRemoveMfi: onRemoveMfi,
        onClose: toggleInd
      }, "ind"));
    }
    _btTabIndicator = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
      style: S_BT_IND,
      caption: _tabIndCaption,
      isMenu: true,
      onClick: toggleInd
    });
  }
  let _btTabMini = null;
  if (zhMiniConfigs && zhMiniConfigs.length) {
    _btTabMini = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
      style: S_BT_MINI,
      caption: "Mini",
      isMenu: true,
      onClick: toggleMini
    });
    _modalMenuArr.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenuMini.default, {
      isShow: isShowMini,
      style: {
        ...S_M_MINI,
        ..._crModalMenuLeftStyle(isShowMini, S_M_MINI)
      },
      configs: zhMiniConfigs,
      onClickItem: onMiniChart,
      onClose: toggleMini
    }, "mini"));
  }
  const _btFn = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
    style: _btAppearance ? S_BT_FN_APPEARANCE : S_BT_FN,
    caption: "Fn",
    isMenu: true,
    onClick: toggleFn
  });
  return [_btInfo, _btTabIndicator, _btAppearance, _btLegend, _btFn, _btTabMini, _modalMenuArr];
};
var _default = exports.default = useChartToolBar;
//# sourceMappingURL=useChartToolBar.js.map