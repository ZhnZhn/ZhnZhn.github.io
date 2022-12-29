"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemList = _interopRequireDefault(require("../zhn/ItemList"));
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const EUROSTAT_DATA = 'Eurostat Data',
  HTTPS = 'https://',
  EUROSTAT = 'eurostat',
  HREF_TOKEN = 'ec.europa.eu',
  _crExploreHref = dataset => HTTPS + "appsso." + EUROSTAT + "." + HREF_TOKEN + "/nui/show.do?lang=en&dataset=" + dataset,
  _crBrowserHref = dataset => "" + HTTPS + HREF_TOKEN + "/" + EUROSTAT + "/databrowser/view/" + dataset + "/default/table?lang=en",
  _crDatabaseNodeHref = dataset => "" + HTTPS + HREF_TOKEN + "/" + EUROSTAT + "/data/database?node_code=" + dataset;
const _crToolLinks = dataset => dataset ? [{
  caption: EUROSTAT_DATA + " Explore",
  href: _crExploreHref(dataset)
}, {
  caption: EUROSTAT_DATA + " Browser",
  href: _crBrowserHref(dataset)
}, {
  caption: EUROSTAT_DATA + "base Node",
  href: _crDatabaseNodeHref(dataset)
}] : [];
const _crLinks = _ref => {
  let {
    href,
    dataset
  } = _ref;
  const _links = _crToolLinks(dataset);
  return _links.length > 0 ? _links : void 0;
};
const _crLink = item => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
  ...item
});
const EsLink = _ref2 => {
  let {
    item
  } = _ref2;
  if (!item) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemList.default, {
    items: _crLinks(item),
    crItem: _crLink
  });
};
var _default = EsLink;
exports.default = _default;
//# sourceMappingURL=EsLink.js.map