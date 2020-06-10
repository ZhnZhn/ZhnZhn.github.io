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
  return /*#__PURE__*/_react["default"].createElement(_OpenClose["default"], {
    isClose: isClose,
    caption: "Data Providers (All 21):",
    captionStyle: ocCaptionStyle,
    rootStyle: (0, _extends2["default"])({}, _About["default"].LINE_HEIGHT, _About["default"].P_BOTTOM),
    childStyle: ST.ROOT_CHILD,
    openColor: _Color["default"].YELLOW
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Quandl, null), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "\xA0(50 per day)")), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].DbNomics, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Eurostat, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].UnComtrade, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].WorldBank, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Insee, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].StatNorway, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].StatSweden, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].StatFinland, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Bsl, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].CryptoCompare, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].CoinGecko, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Coinpaprika, null))), /*#__PURE__*/_react["default"].createElement(_OpenClose["default"], {
    caption: "(8) Required API key:",
    captionStyle: ocCaptionStyle,
    rootStyle: ST.OPEN_CLOSE,
    childStyle: ST.CHILD_STYLE,
    isClose: true,
    openColor: OPEN_COLOR_L2
  }, /*#__PURE__*/_react["default"].createElement("p", {
    style: ST.P4
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Quandl, null), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "\xA0(50 000 per day)")), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Barchart, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].AlphaVantage, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Iex, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Bea, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Eia, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Fmp, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].Intrinio, null))), /*#__PURE__*/_react["default"].createElement("div", {
    style: ST.NOTE
  }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "Note:\xA0"), "User API key from data provider required for request.\xA0", /*#__PURE__*/_react["default"].createElement("br", {
    className: CL.BR
  }), "Can be set in ", /*#__PURE__*/_react["default"].createElement("span", {
    style: ST.SETTINGS
  }, "SETTINGS\xA0[s]"), ".")), /*#__PURE__*/_react["default"].createElement("div", {
    style: ST.NOTE
  }, /*#__PURE__*/_react["default"].createElement("p", {
    style: ST.MAX_WIDTH
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "Note:\xA0"), "This product uses the Bureau of Economic Analysis (BEA) Data API but is not endorsed or certified by BEA."))), /*#__PURE__*/_react["default"].createElement(_OpenClose["default"], {
    caption: "(2) Required Https Proxy:",
    captionStyle: ocCaptionStyle,
    rootStyle: ST.OPEN_CLOSE,
    childStyle: ST.CHILD_STYLE,
    isClose: true,
    openColor: OPEN_COLOR_L2
  }, /*#__PURE__*/_react["default"].createElement("p", {
    style: ST.P4
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].FaoStat, null)), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].PROVIDER
  }, /*#__PURE__*/_react["default"].createElement(_ProviderLinks["default"].CryptoCompare, null), /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "\xA0(Coin Inform.)"))), /*#__PURE__*/_react["default"].createElement("div", {
    style: ST.NOTE
  }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: _About["default"].BLACK
  }, "Note:\xA0"), "Https Proxy is required for CORS Http API services.\xA0", /*#__PURE__*/_react["default"].createElement("br", {
    className: CL.BR
  }), "By default set. Can be changed in ", /*#__PURE__*/_react["default"].createElement("span", {
    style: ST.SETTINGS
  }, "SETTINGS\xA0[s]"), ".")))));
};

var _default = DataProviders;
exports["default"] = _default;
//# sourceMappingURL=DataProviders.js.map