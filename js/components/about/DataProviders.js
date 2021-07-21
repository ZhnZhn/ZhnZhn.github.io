"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _Color = _interopRequireDefault(require("../styles/Color"));

var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));

var _ProviderLinks = _interopRequireDefault(require("../links/ProviderLinks"));

var _About = _interopRequireDefault(require("./About.Style"));

var CL = {
  BR: "provider__note__br"
};
var OPEN_COLOR_L2 = _Color["default"].GREEN;
var ST = {
  ROOT_CHILD: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 2,
    marginLeft: -5,
    paddingLeft: 8
  },
  OC_L1: (0, _extends2["default"])({}, _About["default"].LINE_HEIGHT, _About["default"].P_BOTTOM),
  OC_L2: {
    paddingTop: 6,
    lineHeight: 1.8
  },
  CHILD_STYLE: {
    paddingLeft: 4
  },
  P4: {
    paddingTop: 4
  },
  NOTE: {
    padding: '8px 4px 4px 6px',
    lineHeight: 1.4
  },
  MAX_WIDTH: {
    maxWidth: 450
  },
  SETTINGS: {
    color: '#607d8b'
  }
};
var _isArr = Array.isArray;
var DP = [[_ProviderLinks["default"].Quandl, '50'], _ProviderLinks["default"].DbNomics, _ProviderLinks["default"].Eurostat, _ProviderLinks["default"].UnComtrade, _ProviderLinks["default"].WorldBank, _ProviderLinks["default"].Insee, _ProviderLinks["default"].ONS, _ProviderLinks["default"].StatNorway, _ProviderLinks["default"].StatSweden, _ProviderLinks["default"].StatFinland, [_ProviderLinks["default"].Bsl, '25'], _ProviderLinks["default"].CryptoCompare, _ProviderLinks["default"].CoinGecko, _ProviderLinks["default"].CoinMetrics, _ProviderLinks["default"].CoinLore, _ProviderLinks["default"].Coinpaprika, _ProviderLinks["default"].Binance, _ProviderLinks["default"].Bitstamp],
    DP_KEY = [[_ProviderLinks["default"].Quandl, '50 000'], _ProviderLinks["default"].AlphaVantage, _ProviderLinks["default"].Iex, _ProviderLinks["default"].Fmp, _ProviderLinks["default"].Tw, _ProviderLinks["default"].Intrinio, _ProviderLinks["default"].Bea, [_ProviderLinks["default"].Bsl, '500'], _ProviderLinks["default"].Eia],
    DP_PR = [_ProviderLinks["default"].FaoStat, _ProviderLinks["default"].Bitfinex];

var LinkPer = function LinkPer(_ref) {
  var Comp = _ref.Comp,
      per = _ref.per;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      style: _About["default"].BLACK,
      children: ["\xA0(", per, ")"]
    })]
  });
};

var LinkList = function LinkList(_ref2) {
  var list = _ref2.list;
  return list.map(function (CompOrConfig, index) {
    var _isConfig = _isArr(CompOrConfig),
        _linkComp = _isConfig ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkPer, {
      Comp: CompOrConfig[0],
      per: CompOrConfig[1]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(CompOrConfig, {}),
        style = _isConfig ? (0, _extends2["default"])({}, _About["default"].PROVIDER, _About["default"].PR_4) : _About["default"].PROVIDER;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: style,
      children: _linkComp
    }, index);
  });
};

var DataProviders = function DataProviders(_ref3) {
  var isClose = _ref3.isClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose["default"], {
    isClose: isClose,
    caption: "Data Providers (All 27):",
    style: ST.OC_L1,
    childStyle: ST.ROOT_CHILD,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
          list: DP
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose["default"], {
        caption: "(9) Required API Key:",
        style: ST.OC_L2,
        openColor: OPEN_COLOR_L2,
        childStyle: ST.CHILD_STYLE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: ST.P4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
            list: DP_KEY
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: ST.NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Note:\xA0"
            }), "User API key from data provider required for request.\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {
              className: CL.BR
            }), "Can be set in ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: ST.SETTINGS,
              children: "SETTINGS\xA0[s]"
            }), "."]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: ST.NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: ST.MAX_WIDTH,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Note:\xA0"
            }), "This product uses the Bureau of Economic Analysis (BEA) Data API but is not endorsed or certified by BEA."]
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose["default"], {
        caption: "(2) Required Local Http Proxy:",
        style: ST.OC_L2,
        openColor: OPEN_COLOR_L2,
        childStyle: ST.CHILD_STYLE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: ST.P4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
            list: DP_PR
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: ST.NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Note:\xA0"
            }), "Local Http Proxy is required for CORS Http API services.\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {
              className: CL.BR
            }), "Could be set in ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: ST.SETTINGS,
              children: "SETTINGS\xA0[s]"
            }), "."]
          })
        })]
      })]
    })
  });
};

var _default = DataProviders;
exports["default"] = _default;
//# sourceMappingURL=DataProviders.js.map