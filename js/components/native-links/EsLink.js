"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _ItemList = _interopRequireDefault(require("../zhn/ItemList"));

var _Link = _interopRequireDefault(require("./Link"));

var EUROSTAT_DATA = 'Eurostat Data',
    HTTPS = 'https://',
    EUROSTAT = 'eurostat',
    HREF_TOKEN = 'ec.europa.eu',
    _crExploreHref = function _crExploreHref(dataset) {
  return HTTPS + "appsso." + EUROSTAT + "." + HREF_TOKEN + "/nui/show.do?lang=en&dataset=" + dataset;
},
    _crBrowserHref = function _crBrowserHref(dataset) {
  return "" + HTTPS + HREF_TOKEN + "/" + EUROSTAT + "/databrowser/view/" + dataset + "/default/table?lang=en";
},
    _crDatabaseNodeHref = function _crDatabaseNodeHref(dataset) {
  return "" + HTTPS + HREF_TOKEN + "/" + EUROSTAT + "/data/database?node_code=" + dataset;
};

var _crToolLinks = function _crToolLinks(dataset) {
  return dataset ? [{
    caption: EUROSTAT_DATA + " Explore",
    href: _crExploreHref(dataset)
  }, {
    caption: EUROSTAT_DATA + " Browser",
    href: _crBrowserHref(dataset)
  }, {
    caption: EUROSTAT_DATA + "base Node",
    href: _crDatabaseNodeHref(dataset)
  }] : [];
};

var _crLinks = function _crLinks(_ref) {
  var href = _ref.href,
      dataset = _ref.dataset;

  var _links = _crToolLinks(dataset);

  return _links.length > 0 ? _links : void 0;
};

var _crLink = function _crLink(item) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], (0, _extends2["default"])({}, item));
};

var EsLink = function EsLink(_ref2) {
  var item = _ref2.item;

  if (!item) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemList["default"], {
    items: _crLinks(item),
    crItem: _crLink
  });
};

var _default = EsLink;
exports["default"] = _default;
//# sourceMappingURL=EsLink.js.map