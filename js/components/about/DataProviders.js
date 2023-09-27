"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Color = require("../styles/Color");
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _ProviderLinks = _interopRequireDefault(require("../links/ProviderLinks"));
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
  S_CHILD_STYLE = {
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
  S_MAX_WIDTH = {
    maxWidth: 450
  },
  S_SETTINGS = {
    color: '#607d8b'
  },
  S_BLACK = {
    color: 'black'
  };
const _isArr = Array.isArray;
const DP = [_ProviderLinks.default.DBnomics, _ProviderLinks.default.EI, _ProviderLinks.default.Ember, _ProviderLinks.default.IRENA, _ProviderLinks.default.Eurostat, _ProviderLinks.default.FaoStat, _ProviderLinks.default.WorldBank, _ProviderLinks.default.Insee, _ProviderLinks.default.ONS, _ProviderLinks.default.StatNorway, _ProviderLinks.default.StatSweden, _ProviderLinks.default.StatFinland, _ProviderLinks.default.StatDenmark, _ProviderLinks.default.StatIreland, [_ProviderLinks.default.Bsl, '25'], _ProviderLinks.default.CryptoCompare, _ProviderLinks.default.CoinGecko, _ProviderLinks.default.CoinMetrics, _ProviderLinks.default.CoinLore, _ProviderLinks.default.Coinpaprika, _ProviderLinks.default.Binance, _ProviderLinks.default.Bitstamp],
  DP_KEY = [[_ProviderLinks.default.Ndl, '50 000'], _ProviderLinks.default.AlphaVantage, _ProviderLinks.default.Iex, _ProviderLinks.default.Fmp, _ProviderLinks.default.Tw, _ProviderLinks.default.Intrinio, _ProviderLinks.default.Bea, [_ProviderLinks.default.Bsl, '500'], _ProviderLinks.default.Eia],
  DP_PR = [[_ProviderLinks.default.Ndl, '50'], _ProviderLinks.default.UnComtrade, _ProviderLinks.default.Bitfinex];
const LinkPer = _ref => {
  let {
    Comp,
    per
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      style: S_BLACK,
      children: ["\xA0(", per, ")"]
    })]
  });
};
const LinkList = _ref2 => {
  let {
    list
  } = _ref2;
  return list.map((CompOrConfig, index) => {
    const _isConfig = _isArr(CompOrConfig),
      _linkComp = _isConfig ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkPer, {
        Comp: CompOrConfig[0],
        per: CompOrConfig[1]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(CompOrConfig, {}),
      style = _isConfig ? {
        ...S_PROVIDER,
        ...S_PR_4
      } : S_PROVIDER;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: style,
      children: _linkComp
    }, index);
  });
};
const _crListCaption = (items, captionSuffix) => "(" + items.length + ") " + captionSuffix + ":";
const DataProviders = _ref3 => {
  let {
    isClose
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    isClose: isClose,
    caption: "Data Providers (All 32):",
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
        childStyle: S_CHILD_STYLE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: S_PT_4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
            list: DP_KEY
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: S_BLACK,
              children: "Note:\xA0"
            }), "User API key from data provider required for request.\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {
              className: CL_NOTE_BR
            }), "Can be set in ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: S_SETTINGS,
              children: "SETTINGS\xA0[s]"
            }), "."]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            style: S_MAX_WIDTH,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: S_BLACK,
              children: "Note:\xA0"
            }), "This product uses the Bureau of Economic Analysis (BEA) Data API but is not endorsed or certified by BEA."]
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose.default, {
        caption: _crListCaption(DP_PR, 'Required Local Http Proxy'),
        style: S_OC_L2,
        openColor: OPEN_COLOR_L2,
        childStyle: S_CHILD_STYLE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: S_PT_4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
            list: DP_PR
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: S_BLACK,
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