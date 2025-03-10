"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crItemContainerEl = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _arrFn = require("../../utils/arrFn");
var _bindTo = require("../../utils/bindTo");
var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));
var _ChartContainer = _interopRequireDefault(require("../../components/zhn-containers/ChartContainer"));
var _settingStore = require("../stores/settingStore");
var _contCheckBoxLogic = require("../stores/contCheckBoxLogic");
var _compStore = require("../stores/compStore");
var _itemStore = require("../stores/itemStore");
var _jsxRuntime = require("react/jsx-runtime");
const _crCaption = (dialogConf, browserType) => {
  let _caption = dialogConf.contFullCaption || _BrowserConfig.default[browserType].contFullCaption;
  if (_caption) {
    return _caption;
  }
  const {
      contCaption,
      dialogCaption,
      menuTitle,
      dialogProps
    } = dialogConf,
    {
      ds,
      dataSource
    } = dialogProps || {};
  _caption = (0, _isTypeFn.isStr)(contCaption) ? contCaption : dialogCaption || menuTitle || "Item Container";
  return (0, _arrFn.joinByColon)(ds || dataSource, _caption);
};
const crItemContainerEl = _ref => {
  let {
    browserType,
    dialogConf
  } = _ref;
  const {
      type,
      chartContainerComp,
      contWidth
    } = dialogConf || {},
    _chartType = type || _BrowserConfig.default[browserType].chartContainerType,
    Comp = chartContainerComp || _ChartContainer.default;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    chartType: _chartType,
    caption: _crCaption(dialogConf, browserType),
    browserType: browserType,
    contWidth: contWidth,
    isAdminMode: _settingStore.isAdminMode,
    onSetActive: (0, _bindTo.bindTo)(_contCheckBoxLogic.setActiveContainer, _chartType, browserType),
    onCloseContainer: (0, _bindTo.bindTo)(_compStore.closeChartContainer, _chartType, browserType),
    onSortBy: (0, _bindTo.bindTo)(_itemStore.sortItemsBy, _chartType),
    updateMovingValues: (0, _bindTo.bindTo)(_itemStore.updateMv, _chartType),
    onCloseItem: _itemStore.closeChartItem,
    onRemoveAll: (0, _bindTo.bindTo)(_itemStore.removeItemsAll, _chartType, browserType)
  }, _chartType);
};
exports.crItemContainerEl = crItemContainerEl;
//# sourceMappingURL=fItemContainer.js.map