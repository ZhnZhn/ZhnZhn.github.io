"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));

var _ChartActions = require("../../flux/actions/ChartActions");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

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
const IEX_CLOUD_DATA_FEEDS = [{
  a: '1 Month',
  b: '1m'
}, {
  a: '3 Months',
  b: '3m'
}, {
  a: '6 Months',
  b: '6m'
}, {
  a: '1 Year',
  b: '1y'
}, {
  a: '2 Years',
  b: '2y'
}].map(_ref => {
  let {
    a,
    b
  } = _ref;
  return {
    caption: 'IEX Cloud: ' + a,
    value: 'IEX',
    dfProps: {
      dfType: 'chart',
      dfPeriod: b
    }
  };
}),
      TS = 'TIME_SERIES',
      AV_DATA_FEEDS = [{
  c: 'Daily (100)',
  r: TS + "_DAILY&outputsize=compact"
}, {
  c: 'Weekly Adjusted',
  r: TS + "_WEEKLY_ADJUSTED"
}, {
  c: 'Monthly Adjusted',
  r: TS + "_MONTHLY_ADJUSTED"
}].map(_ref2 => {
  let {
    c,
    r
  } = _ref2;
  return {
    caption: "Alpha Vantage: " + c,
    value: 'AL',
    route: r,
    dfProps: {
      dfFn: 'EOD',
      dfSubId: 'I'
    }
  };
}),
      DATA_SOURCE_OPTIONS = [...AV_DATA_FEEDS, ...IEX_CLOUD_DATA_FEEDS];
const DF_DATA_SOURCE = DATA_SOURCE_OPTIONS[0];

const _isFn = fn => typeof fn === 'function';

const StocksBySectorDialog = (0, _memoIsShow.default)(_ref3 => {
  let {
    isShow,
    data,
    onClose
  } = _ref3;

  const [isShowLabels, toggleLabels] = (0, _useToggle.default)(true),
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
      _ChartActions.ChartActions[_ChartActions.CHAT_LOAD]({
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
        _itemKey: id + "_" + value,
        linkFn: 'NASDAQ',
        dataSource: caption,
        ...dialogProps,
        ...dfProps
      });
    }

    onClose();
  }),
        _refCommandButtons = (0, _uiApi.useRef)([/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Load, {
    onClick: _hLoad
  }, "load"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Show, {
    onClick: _hShow
  }, "show")]);

  const {
    item
  } = data || {},
        {
    text
  } = item || {},
        _style = isShowLabels ? null : S_ROOT_NOT_LABELS,
        _linkStyle = isShowLabels ? S_LINK : { ...S_LINK,
    ...S_LINK_NOT_LABELS
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: text,
    style: _style,
    styleCaption: S_CAPTION,
    isShow: isShow,
    commandButtons: (0, _uiApi.getRefValue)(_refCommandButtons),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ToolbarButtonCircle, {
      buttons: (0, _uiApi.getRefValue)(_refToolbarButtons)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Source",
      placeholder: DF_DATA_SOURCE.caption,
      options: DATA_SOURCE_OPTIONS,
      onSelect: setDataSource
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
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
var _default = StocksBySectorDialog;
exports.default = _default;
//# sourceMappingURL=StocksBySectorDialog.js.map