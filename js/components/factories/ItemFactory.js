"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _ChartActions = _interopRequireWildcard(require("../../flux/actions/ChartActions"));

var _Type = require("../../constants/Type");

var _Items = _interopRequireDefault(require("../items/Items"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  crValueMoving,
  crId
} = _ChartFn.default;

const _getIdKey = (config, index) => {
  const {
    zhConfig
  } = config,
        {
    id,
    key
  } = zhConfig || {};
  return [id || "Id:" + index, key || id || crId()];
};

const _fAddToWatch = (caption, config) => () => _ComponentActions.default.showAddToWatch({
  caption,
  config
});

const _fOnPasteToDialog = store => {
  return toChart => _ComponentActions.default.showPasteTo({
    toChart,
    fromChart: store.getCopyFromChart()
  });
};

const _crAreaChart = function (_ref) {
  let {
    config,
    index,
    chartType,
    props,
    store
  } = _ref;

  const [id, key] = _getIdKey(config, index);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Items.default.AreaChart, {
    chartType: chartType,
    caption: id,
    config: config,
    onSetActive: _ComponentActions.default.setActiveCheckbox,
    onAddToWatch: _fAddToWatch(id, config),
    ...props,
    crValueMoving: crValueMoving,
    onToTop: _ChartActions.default[_ChartActions.CHAT_TO_TOP].bind(null, chartType, id),
    onCopy: _ChartActions.default[_ChartActions.CHAT_COPY],
    onPasteTo: _fOnPasteToDialog(store),
    onZoom: _ComponentActions.default.zoom
  }, key);
};

const _crMapChart = function (_ref2) {
  let {
    config,
    index,
    chartType,
    props
  } = _ref2;

  const [id, key] = _getIdKey(config, index);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Items.default.MapChart, {
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
  [_Type.CIT_EUROSTAT_MAP]: _crMapChart,
  [_Type.CIT_TABLE]: _fItem(_Items.default.Table),
  [_Type.CIT_ALPHA_PERF]: _fItem(_Items.default.AlphaPerf),
  [_Type.CIT_INFO_ITEM]: _fItem(_Items.default.InfoItem),
  [_Type.CIT_TW_LIST]: _fItem(_Items.default.TwList)
};
const ItemFactory = {
  /* { config, index, chartType, props, store } */
  crItem(itemOptions) {
    const {
      config
    } = itemOptions,
          {
      zhCompType
    } = config || {},
          _crItem = _rCrItem[zhCompType] || _rCrItem.DF;

    return _crItem(itemOptions);
  }

};
var _default = ItemFactory;
exports.default = _default;
//# sourceMappingURL=ItemFactory.js.map