"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemList = _interopRequireDefault(require("../zhn/ItemList"));
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const EUROSTAT_DATA = 'Eurostat Data',
  DATA_URL = 'https://ec.europa.eu/eurostat',
  _crBrowserHref = dataset => DATA_URL + "/databrowser/view/" + dataset + "/default/table?lang=en",
  _crDatabaseNodeHref = dataset => DATA_URL + "/data/database?node_code=" + dataset;
const _crToolLinks = dataset => dataset ? [{
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
  return item ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemList.default, {
    items: _crLinks(item),
    crItem: _crLink
  }) : null;
};
var _default = EsLink;
exports.default = _default;
//# sourceMappingURL=EsLink.js.map