"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crItemContainerEl = void 0;

var _react = require("react");

var _ChartContainer = _interopRequireDefault(require("../../components/zhn-containers/ChartContainer"));

var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));

var _ComponentActions = require("../actions/ComponentActions");

var _ChartActions = require("../actions/ChartActions");

const _isStr = str => typeof str === 'string';

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
    dataSource = ''
  } = dialogProps || {};
  _caption = _isStr(contCaption) ? contCaption : dialogCaption || menuTitle || 'Item Container';
  return [dataSource, _caption].filter(Boolean).join(': ');
};

const crItemContainerEl = _ref => {
  let {
    browserType,
    dialogConf,
    store
  } = _ref;

  const {
    type,
    chartContainerComp,
    contWidth
  } = dialogConf || {},
        Comp = chartContainerComp || _ChartContainer.default,
        _type = type || _BrowserConfig.default[browserType].chartContainerType,
        _caption = _crCaption(dialogConf, browserType);

  return /*#__PURE__*/(0, _react.createElement)(Comp, {
    key: _type,
    caption: _caption,
    chartType: _type,
    store,
    browserType,
    contWidth,
    onSetActive: _ComponentActions.ComponentActions.setActiveContainer,
    onCloseContainer: _ComponentActions.ComponentActions.closeChartContainer.bind(null, _type, browserType),
    onSortBy: _ChartActions.ChartActions[_ChartActions.CHAT_SORT_BY].bind(null, _type),
    updateMovingValues: _ChartActions.ChartActions[_ChartActions.CHAT_UPDATE_MOVING_VALUES].bind(null, _type),
    onCloseItem: _ChartActions.ChartActions[_ChartActions.CHAT_CLOSE],
    onRemoveAll: _ChartActions.ChartActions[_ChartActions.CHAT_REMOVE_ALL].bind(null, _type, browserType)
  });
};

exports.crItemContainerEl = crItemContainerEl;
//# sourceMappingURL=fItemContainer.js.map