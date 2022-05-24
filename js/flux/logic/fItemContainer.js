"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crItemContainerEl = void 0;

var _react = require("react");

var _ChartContainer = _interopRequireDefault(require("../../components/zhn-containers/ChartContainer"));

var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));

var _ComponentActions = _interopRequireDefault(require("../actions/ComponentActions"));

var _ChartActions = _interopRequireWildcard(require("../actions/ChartActions"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    onSetActive: _ComponentActions.default.setActiveContainer,
    onCloseContainer: _ComponentActions.default.closeChartContainer.bind(null, _type, browserType),
    onSortBy: _ChartActions.default[_ChartActions.CHAT_SORT_BY].bind(null, _type),
    updateMovingValues: _ChartActions.default[_ChartActions.CHAT_UPDATE_MOVING_VALUES].bind(null, _type),
    onCloseItem: _ChartActions.default[_ChartActions.CHAT_CLOSE],
    onRemoveAll: _ChartActions.default[_ChartActions.CHAT_REMOVE_ALL].bind(null, _type, browserType)
  });
};

exports.crItemContainerEl = crItemContainerEl;
//# sourceMappingURL=fItemContainer.js.map