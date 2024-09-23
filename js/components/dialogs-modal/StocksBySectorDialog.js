"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _itemStore = require("../../flux/stores/itemStore");
var _Buttons = require("../dialogs/Buttons");
var _RowInputSelect = _interopRequireDefault(require("../dialogs/rows/RowInputSelect"));
var _RowChart = _interopRequireDefault(require("../dialogs/rows/RowChart"));
var _ChartOptionsFn = require("../dialogs/ChartOptionsFn");
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ToolbarButtonCircle = _interopRequireDefault(require("../zhn/ToolbarButtonCircle"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _NasdaqLink = _interopRequireDefault(require("../native-links/NasdaqLink"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ROOT_NOT_LABELS = {
    width: 280
  },
  S_CAPTION = {
    display: 'inline-block',
    maxWidth: 295
  },
  S_LINK_SHOW_HIDE = {
    marginBottom: 10
  },
  S_LINK_ROOT = {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 5px 0 5px',
    lineHeight: 1.5,
    fontWeight: 'bold'
  },
  S_LINK_CAPTION = {
    color: '#1b75bb',
    display: 'inline-block',
    width: 100,
    paddingRight: 5,
    textAlign: 'right',
    fontSize: '16px'
  },
  S_LINK = {
    paddingTop: 0
  },
  S_LINK_NOT_LABELS = {
    marginLeft: 8
  };
const TS = 'TIME_SERIES',
  ADJUSTED = 'ADJUSTED',
  AV_DATA_FEEDS = [{
    c: 'Daily Adjusted (100)',
    r: `${TS}_DAILY_${ADJUSTED}&outputsize=compact`
  }, {
    c: 'Weekly Adjusted',
    r: `${TS}_WEEKLY_${ADJUSTED}`
  }, {
    c: 'Monthly Adjusted',
    r: `${TS}_MONTHLY_${ADJUSTED}`
  }].map(_ref => {
    let {
      c,
      r
    } = _ref;
    return {
      caption: `Alpha Vantage: ${c}`,
      value: 'AL',
      route: r,
      dfProps: {
        dfFn: 'EOD',
        dfSubId: 'I'
      }
    };
  }),
  DATA_SOURCE_OPTIONS = [...AV_DATA_FEEDS];
const DF_DATA_SOURCE = DATA_SOURCE_OPTIONS[0];
const _isFn = fn => typeof fn === 'function';
const CHART_OPTIONS = (0, _ChartOptionsFn.crChartOptions)(void 0, 't1a');
const StocksBySectorDialog = (0, _memoIsShow.default)(_ref2 => {
  let {
    isShow,
    data,
    onClose
  } = _ref2;
  const refSeriaColor = (0, _uiApi.useRef)(),
    [isShowLabels, toggleLabels] = (0, _useToggle.default)(true),
    [isShowLink, toggleLink] = (0, _useToggle.default)(),
    _refToolbarButtons = (0, _uiApi.useRef)([{
      caption: 'L',
      title: 'Click to toggle labels',
      onClick: toggleLabels
    }, {
      caption: 'O',
      title: 'Click to toggle options',
      onClick: toggleLink
    }]),
    [setDataSource, getDataSource] = (0, _useProperty.default)(),
    [setChartType, getChartType] = (0, _useProperty.default)(),
    _hShow = (0, _useEventCallback.default)(() => {
      if (data && _isFn(data.onShow)) {
        data.onShow();
      }
    }),
    _hLoad = (0, _useEventCallback.default)(() => {
      const {
          item,
          browserType,
          chartContainerType,
          dialogProps
        } = data || {},
        {
          id,
          text
        } = item || {},
        {
          caption,
          value,
          route,
          dfProps
        } = getDataSource() || DF_DATA_SOURCE;
      if (id) {
        const _chartTypeItem = getChartType();
        (0, _itemStore.loadItem)({
          chartType: chartContainerType,
          browserType
        }, {
          id,
          item,
          items: [{
            c: text,
            v: id
          }, {
            c: caption,
            v: route
          }],
          title: text,
          value: id,
          loadId: value,
          _itemKey: `${id}_${value}`,
          linkFn: 'NASDAQ',
          dataSource: caption,
          ...dialogProps,
          ...dfProps,
          // seriaColor, seriaWidth
          ...(0, _uiApi.getInputValue)(refSeriaColor),
          seriaType: _chartTypeItem ? _chartTypeItem.value : void 0
        });
      }
      onClose();
    }),
    _refCommandButtons = (0, _uiApi.useRef)([/*#__PURE__*/(0, _jsxRuntime.jsx)(_Buttons.ButtonLoad, {
      onClick: _hLoad
    }, "load"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Buttons.ButtonShow, {
      onClick: _hShow
    }, "show")]);
  const {
      item
    } = data || {},
    {
      text
    } = item || {},
    _style = isShowLabels ? null : S_ROOT_NOT_LABELS,
    _linkStyle = isShowLabels ? S_LINK : {
      ...S_LINK,
      ...S_LINK_NOT_LABELS
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: text,
    style: _style,
    styleCaption: S_CAPTION,
    isShow: isShow,
    commandButtons: (0, _uiApi.getRefValue)(_refCommandButtons),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.default, {
      buttons: (0, _uiApi.getRefValue)(_refToolbarButtons)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      isShowLabels: isShowLabels,
      caption: "Source",
      placeholder: DF_DATA_SOURCE.caption,
      options: DATA_SOURCE_OPTIONS,
      onSelect: setDataSource
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowChart.default, {
      refSeriaColor: refSeriaColor,
      isShowLabels: isShowLabels,
      options: CHART_OPTIONS,
      onSelectChart: setChartType
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowLink,
      style: S_LINK_SHOW_HIDE,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_LINK_ROOT,
        children: [isShowLabels && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_LINK_CAPTION,
          children: "Link:"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NasdaqLink.default, {
          style: _linkStyle,
          item: item,
          caption: "NASDAQ"
        })]
      })
    })]
  });
});
var _default = exports.default = StocksBySectorDialog;
//# sourceMappingURL=StocksBySectorDialog.js.map