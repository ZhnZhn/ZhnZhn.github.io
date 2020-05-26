"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

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
    borderLeft: "1px dashed " + _Color["default"].YELLOW,
    marginLeft: -5,
    paddingLeft: 8
  },
  OPEN_CLOSE: {
    paddingTop: 6,
    lineHeight: 1.8
  },
  CHILD_STYLE: {
    borderLeft: "1px dotted " + _Color["default"].GREEN,
    marginLeft: 2,
    paddingLeft: 6
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
  var isClose = _ref.isClose,
      ocCaptionStyle = _ref.ocCaptionStyle;
  return _react["default"].createElement(_OpenClose["default"], {
    isClose: isClose,
    caption: "Data Providers (All 20):",
    captionStyle: ocCaptionStyle,
    rootStyle: (0, _extends2["default"])({}, _About["default"].LINE_HEIGHT, {}, _About["default"].P_BOTTOM),
    childStyle: ST.ROOT_CHILD,
    openColor: _Color["default"].YELLOW
  }, _react["default"].createElement("div", null, _react["default"].createElement("p", null, _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Quandl, null), _react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "\xA0(50 per day)")), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].DbNomics, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Eurostat, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].UnComtrade, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].WorldBank, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Insee, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].StatNorway, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].StatSweden, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].StatFinland, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Bsl, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].CryptoCompare, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].CoinGecko, null))), _react["default"].createElement(_OpenClose["default"], {
    caption: "(8) Required API key:",
    captionStyle: ocCaptionStyle,
    rootStyle: ST.OPEN_CLOSE,
    childStyle: ST.CHILD_STYLE,
    isClose: true,
    openColor: OPEN_COLOR_L2
  }, _react["default"].createElement("p", {
    style: ST.P4
  }, _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Quandl, null), _react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "\xA0(50 000 per day)")), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Barchart, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].AlphaVantage, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Iex, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Bea, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Eia, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Fmp, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].Intrinio, null))), _react["default"].createElement("div", {
    style: ST.NOTE
  }, _react["default"].createElement("p", null, _react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "Note:\xA0"), "User API key from data provider required for request.\xA0", _react["default"].createElement("br", {
    className: CL.BR
  }), "Can be set in ", _react["default"].createElement("span", {
    style: ST.SETTINGS
  }, "SETTINGS\xA0[s]"), ".")), _react["default"].createElement("div", {
    style: ST.NOTE
  }, _react["default"].createElement("p", {
    style: ST.MAX_WIDTH
  }, _react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "Note:\xA0"), "This product uses the Bureau of Economic Analysis (BEA) Data API but is not endorsed or certified by BEA."))), _react["default"].createElement(_OpenClose["default"], {
    caption: "(2) Required Https Proxy:",
    captionStyle: ocCaptionStyle,
    rootStyle: ST.OPEN_CLOSE,
    childStyle: ST.CHILD_STYLE,
    isClose: true,
    openColor: OPEN_COLOR_L2
  }, _react["default"].createElement("p", {
    style: ST.P4
  }, _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].FaoStat, null)), _react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, _react["default"].createElement(_ProviderLinks["default"].CryptoCompare, null), _react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "\xA0(Coin Inform.)"))), _react["default"].createElement("div", {
    style: ST.NOTE
  }, _react["default"].createElement("p", null, _react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "Note:\xA0"), "Https Proxy is required for CORS Http API services.\xA0", _react["default"].createElement("br", {
    className: CL.BR
  }), "By default set. Can be changed in ", _react["default"].createElement("span", {
    style: ST.SETTINGS
  }, "SETTINGS\xA0[s]"), ".")))));
};

var _default = DataProviders;
exports["default"] = _default;
//# sourceMappingURL=DataProviders.js.map