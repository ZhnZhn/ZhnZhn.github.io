"use strict";

exports.__esModule = true;
exports.crItem = void 0;
var _uiApi = require("../uiApi");
var _ChartFn = require("../../charts/ChartFn");
var _ComponentActions = require("../../flux/actions/ComponentActions");
var _chartCheckBoxLogic = require("../../flux/stores/chartCheckBoxLogic");
var _itemStore = require("../../flux/stores/itemStore");
var _propertyFromChart = require("../../flux/stores/propertyFromChart");
var _CompItemType = require("../../constants/CompItemType");
var _Items = require("../items/Items");
var _jsxRuntime = require("react/jsx-runtime");
const _getIdKey = (config, index) => {
  const {
      zhConfig
    } = config,
    {
      id,
      key
    } = zhConfig || {};
  return [id || `Id:${index}`, key || id || (0, _ChartFn.crId)()];
};
const _fAddToWatch = (caption, config) => () => (0, _ComponentActions.showAddToWatch)({
  caption,
  config
});
const _fOnPasteToDialog = () => toChart => (0, _ComponentActions.showPasteTo)({
  toChart,
  fromChart: (0, _propertyFromChart.getCopyFromChart)()
});
const _crAreaChart = _ref => {
  let {
    config,
    index,
    chartType,
    props
  } = _ref;
  const [id, key] = _getIdKey(config, index);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Items.ChartItem, {
    chartType: chartType,
    caption: id,
    config: config,
    onSetActive: _chartCheckBoxLogic.setActiveCheckbox,
    onAddToWatch: _fAddToWatch(id, config),
    ...props,
    crValueMoving: _ChartFn.crValueMoving,
    onToTop: (0, _uiApi.bindTo)(_itemStore.moveToTop, chartType, id),
    onCopy: _propertyFromChart.copyChart,
    onPasteTo: _fOnPasteToDialog(),
    onZoom: _ComponentActions.showZoom
  }, key);
};
const _crMapChart = _ref2 => {
  let {
    config,
    index,
    chartType,
    props
  } = _ref2;
  const [id, key] = _getIdKey(config, index);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Items.MapChartItem, {
    chartType: chartType,
    caption: id,
    config: config,
    ...props
  }, key);
};
const _fItem = Comp => _ref3 => {
  let {
    config = {},
    props
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    config: config,
    ...props
  }, config.id);
};
const _rCrItem = {
  DF: _crAreaChart,
  [_CompItemType.CIT_EUROSTAT_MAP]: _crMapChart,
  [_CompItemType.CIT_TABLE]: _fItem(_Items.TableItem),
  [_CompItemType.CIT_ALPHA_PERF]: _fItem(_Items.AlphaPerfItem),
  [_CompItemType.CIT_INFO_ITEM]: _fItem(_Items.InfoItem),
  [_CompItemType.CIT_TW_LIST]: _fItem(_Items.TwListItem)
};

/* { config, index, chartType, props, store } */
const crItem = itemOptions => {
  const {
      config
    } = itemOptions,
    {
      zhCompType
    } = config || {},
    _crItem = _rCrItem[zhCompType] || _rCrItem.DF;
  return _crItem(itemOptions);
};
exports.crItem = crItem;
//# sourceMappingURL=ItemFactory.js.map