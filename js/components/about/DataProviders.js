"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _Color = require("../styles/Color");
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _SpanToken = require("../zhn/SpanToken");
var _ProviderLinks = require("../links/ProviderLinks");
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
const DP = [_ProviderLinks.LINK_DBNOMICS, _ProviderLinks.LINK_EI, _ProviderLinks.LINK_EMBER, _ProviderLinks.LINK_IRENA, _ProviderLinks.LINK_EUROSTAT, _ProviderLinks.LINK_FAOSTAT, _ProviderLinks.LINK_WORLBANK, _ProviderLinks.LINK_BOC, _ProviderLinks.LINK_STAT_FRANCE, _ProviderLinks.LINK_STAT_UK, _ProviderLinks.LINK_STAT_NORWAY, _ProviderLinks.LINK_STAT_SWEDEN, _ProviderLinks.LINK_STAT_FINLAND, _ProviderLinks.LINK_STAT_DENMARK, _ProviderLinks.LINK_STAT_IRELAND, _ProviderLinks.LINK_STAT_SWISS, _ProviderLinks.LINK_OECD, [_ProviderLinks.LINK_BLS, '25'], _ProviderLinks.LINK_CRYPTO_COMPARE, _ProviderLinks.LINK_COIN_CAP, _ProviderLinks.LINK_COIN_GECKO, _ProviderLinks.LINK_COIN_METRICS, _ProviderLinks.LINK_COIN_LORE, _ProviderLinks.LINK_COINPAPRIKA, _ProviderLinks.LINK_BINANCE, _ProviderLinks.LINK_BITGET, _ProviderLinks.LINK_BITSTAMP, _ProviderLinks.LINK_COINBASE],
  DP_KEY = [_ProviderLinks.LINK_NDL, _ProviderLinks.LINK_AV, _ProviderLinks.LINK_FMP, _ProviderLinks.LINK_TW, _ProviderLinks.LINK_MSV, _ProviderLinks.LINK_INTRINIO, _ProviderLinks.LINK_WTO, [_ProviderLinks.LINK_BLS, '500'], _ProviderLinks.LINK_EIA, _ProviderLinks.LINK_BEA],
  DP_PR = [_ProviderLinks.LINK_NDL, _ProviderLinks.LINK_BIS, _ProviderLinks.LINK_ECB, _ProviderLinks.LINK_SNB, _ProviderLinks.LINK_UNCOMTRADE, _ProviderLinks.LINK_WTO, _ProviderLinks.LINK_BITFINEX, _ProviderLinks.LINK_CRYPTOCOM, _ProviderLinks.LINK_GATEIO, _ProviderLinks.LINK_KRAKEN, _ProviderLinks.LINK_KUCOIN, _ProviderLinks.LINK_OKX, _ProviderLinks.LINK_BYBIT, _ProviderLinks.LINK_HTX];
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
const _crListCaption = (items, captionSuffix) => "(" + items.length + ") " + captionSuffix + ":";
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