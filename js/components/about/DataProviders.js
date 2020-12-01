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

var DataProviders = function DataProviders(_ref) {
  var isClose = _ref.isClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose["default"], {
    isClose: isClose,
    caption: "Data Providers (All 24):",
    style: ST.OC_L1,
    childStyle: ST.ROOT_CHILD,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: _About["default"].PROVIDER,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Quandl, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].BLACK,
            children: "\xA0(50 per day)"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].DbNomics, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Eurostat, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].UnComtrade, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].WorldBank, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Insee, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].ONS, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].StatNorway, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].StatSweden, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].StatFinland, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Bsl, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].CryptoCompare, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].CoinGecko, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].CoinMetrics, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Coinpaprika, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: _About["default"].PROVIDER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Binance, {})
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose["default"], {
        caption: "(8) Required API Key:",
        style: ST.OC_L2,
        openColor: OPEN_COLOR_L2,
        childStyle: ST.CHILD_STYLE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          style: ST.P4,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            style: _About["default"].PROVIDER,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Quandl, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "\xA0(50 000 per day)"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Barchart, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].AlphaVantage, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Iex, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Bea, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Eia, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Fmp, {})
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].Intrinio, {})
          })]
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
        caption: "(1) Required Https Proxy:",
        style: ST.OC_L2,
        openColor: OPEN_COLOR_L2,
        childStyle: ST.CHILD_STYLE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          style: ST.P4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: _About["default"].PROVIDER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProviderLinks["default"].FaoStat, {})
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: ST.NOTE,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: _About["default"].BLACK,
              children: "Note:\xA0"
            }), "Https Proxy is required for CORS Http API services.\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {
              className: CL.BR
            }), "By default set. Can be changed in ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
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