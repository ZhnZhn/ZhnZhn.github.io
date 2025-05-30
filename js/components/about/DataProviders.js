"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _Color = require("../styles/Color");
var _ProviderLinks = _interopRequireDefault(require("../links/ProviderLinks"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _SpanToken = require("../zhn/SpanToken");
var _jsxRuntime = require("react/jsx-runtime");
const CL_NOTE_BR = "provider__note__br",
  OPEN_COLOR_L2 = _Color.GREEN_COLOR,
  S_ROOT_CHILD = {
    borderLeftStyle: 'solid',
    borderLeftWidth: 2,
    marginLeft: -5,
    paddingLeft: 8
  },
  S_OC_L2 = {
    paddingTop: 6,
    lineHeight: 1.8
  },
  S_PL_4 = {
    paddingLeft: 4
  },
  S_PT_4 = {
    paddingTop: 4
  },
  S_PROVIDER = {
    display: 'inline-block',
    padding: '0 8px'
  },
  S_PR_4 = {
    paddingRight: 4
  },
  S_NOTE = {
    padding: '8px 4px 4px 6px',
    lineHeight: 1.4
  },
  S_SETTINGS = {
    color: '#607d8b'
  };
const _isArr = Array.isArray;
const DP = [_ProviderLinks.default.DBnomics, _ProviderLinks.default.EI, _ProviderLinks.default.Ember, _ProviderLinks.default.IRENA, _ProviderLinks.default.Eurostat, _ProviderLinks.default.FaoStat, _ProviderLinks.default.WorldBank, _ProviderLinks.default.BOC, _ProviderLinks.default.Insee, _ProviderLinks.default.ONS, _ProviderLinks.default.StatNorway, _ProviderLinks.default.StatSweden, _ProviderLinks.default.StatFinland, _ProviderLinks.default.StatDenmark, _ProviderLinks.default.StatIreland, _ProviderLinks.default.FSO, _ProviderLinks.default.OECD, [_ProviderLinks.default.Bsl, '25'], _ProviderLinks.default.CryptoCompare, _ProviderLinks.default.CoinCap, _ProviderLinks.default.CoinGecko, _ProviderLinks.default.CoinMetrics, _ProviderLinks.default.CoinLore, _ProviderLinks.default.Coinpaprika, _ProviderLinks.default.Binance, _ProviderLinks.default.Bitget, _ProviderLinks.default.Bitstamp, _ProviderLinks.default.Coinbase],
  DP_KEY = [_ProviderLinks.default.Ndl, _ProviderLinks.default.AlphaVantage, _ProviderLinks.default.Fmp, _ProviderLinks.default.Tw, _ProviderLinks.default.Plg, _ProviderLinks.default.Intrinio, _ProviderLinks.default.WTO, [_ProviderLinks.default.Bsl, '500'], _ProviderLinks.default.Eia, _ProviderLinks.default.Bea],
  DP_PR = [_ProviderLinks.default.Ndl, _ProviderLinks.default.BIS, _ProviderLinks.default.ECB, _ProviderLinks.default.SNB, _ProviderLinks.default.UnComtrade, _ProviderLinks.default.WTO, _ProviderLinks.default.Bitfinex, _ProviderLinks.default.CryptoCom, _ProviderLinks.default.GateIo, _ProviderLinks.default.Kraken, _ProviderLinks.default.KuCoin, _ProviderLinks.default.OKX, _ProviderLinks.default.Bybit, _ProviderLinks.default.HTX];
const LinkPer = _ref => {
  let {
    Comp,
    per
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SpanToken.MarkBlack, {
      children: ["\xA0(", per, ")"]
    })]
  });
};
const LinkList = _ref2 => {
  let {
    list
  } = _ref2;
  return list.map((CompOrConfig, index) => {
    const _isConfig = _isArr(CompOrConfig);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: (0, _styleFn.crStyle2)(S_PROVIDER, _isConfig && S_PR_4),
      children: _isConfig ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkPer, {
        Comp: CompOrConfig[0],
        per: CompOrConfig[1]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(CompOrConfig, {})
    }, index);
  });
};
const _crListCaption = (items, captionSuffix) => `(${items.length}) ${captionSuffix}:`;
const DataProviders = _ref3 => {
  let {
    isClose
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    isClose: isClose,
    caption: "Data Providers (All 49):",
    childStyle: S_ROOT_CHILD,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
          list: DP
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose.default, {
        caption: _crListCaption(DP_KEY, 'Required API Key'),
        style: S_OC_L2,
        openColor: OPEN_COLOR_L2,
        childStyle: S_PL_4,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: S_PT_4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
            list: DP_KEY
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "Note:\xA0"
            }), "This product uses the Bureau of Economic Analysis (BEA) Data API but is not endorsed or certified by BEA.\xA0"]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "Note:\xA0"
            }), "User API key from data provider required for request.\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {
              className: CL_NOTE_BR
            }), "Can be set in ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: S_SETTINGS,
              children: "SETTINGS\xA0[s]"
            }), "."]
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose.default, {
        caption: _crListCaption(DP_PR, 'Required Local Http Proxy'),
        style: S_OC_L2,
        openColor: OPEN_COLOR_L2,
        childStyle: S_PL_4,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: S_PT_4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
            list: DP_PR
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.MarkBlack, {
              children: "Note:\xA0"
            }), "Local Http Proxy is required for data APIs without CORS.\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {
              className: CL_NOTE_BR
            }), "Could be set in ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: S_SETTINGS,
              children: "SETTINGS\xA0[s]"
            }), "."]
          })
        })]
      })]
    })
  });
};
var _default = exports.default = DataProviders;
//# sourceMappingURL=DataProviders.js.map