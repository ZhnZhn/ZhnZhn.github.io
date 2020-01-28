"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ChartContainer = _interopRequireDefault(require("../../components/zhn-containers/ChartContainer"));

var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../actions/ChartActions"));

var _crCaption = function _crCaption(dialogConf, browserType) {
  var _caption = dialogConf.chartContainerCaption || dialogConf.contFullCaption || _BrowserConfig["default"][browserType].contFullCaption;

  if (_caption) {
    return _caption;
  }

  var _ref = dialogConf.dialogProps || {},
      _ref$dataSource = _ref.dataSource,
      dataSource = _ref$dataSource === void 0 ? '' : _ref$dataSource;

  _caption = dialogConf.contCaption || dialogConf.dialogCaption || dialogConf.menuTitle || 'Chart Container';
  return dataSource && dataSource.length > 0 ? dataSource + ": " + _caption : _caption;
};

var fItemContainer = {
  crItemContainerEl: function crItemContainerEl(_ref2) {
    var browserType = _ref2.browserType,
        dialogConf = _ref2.dialogConf,
        store = _ref2.store;

    var _ref3 = dialogConf || {},
        type = _ref3.type,
        chartContainerComp = _ref3.chartContainerComp,
        contWidth = _ref3.contWidth,
        Comp = chartContainerComp || _ChartContainer["default"],
        _type = type || _BrowserConfig["default"][browserType].chartContainerType,
        _caption = _crCaption(dialogConf, browserType);

    return _react["default"].createElement(Comp, {
      key: _type,
      store: store,
      caption: _caption,
      chartType: _type,
      browserType: browserType,
      contWidth: contWidth,
      onSetActive: _ComponentActions["default"].setActiveContainer,
      onCloseContainer: _ComponentActions["default"].closeChartContainer.bind(null, _type, browserType),
      onSortBy: _ChartActions["default"].sortBy.bind(null, _type),
      updateMovingValues: _ChartActions["default"].updateMovingValues.bind(null, _type),
      onCloseItem: _ChartActions["default"].closeChart,
      onRemoveAll: _ChartActions["default"].removeAll.bind(null, _type, browserType)
    });
  }
};
var _default = fItemContainer;
exports["default"] = _default;
//# sourceMappingURL=fItemContainer.js.map