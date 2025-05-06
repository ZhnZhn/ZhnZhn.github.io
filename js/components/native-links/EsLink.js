"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemList = _interopRequireDefault(require("../zhn/ItemList"));
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const EUROSTAT_DATA = 'Eurostat Data',
  DATA_URL = 'https://ec.europa.eu/eurostat',
  _crBrowserHref = dataset => `${DATA_URL}/databrowser/view/${dataset}/default/table?lang=en`,
  _crDatabaseNodeHref = dataset => `${DATA_URL}/data/database?node_code=${dataset}`;
const _crToolLinks = dataset => dataset ? [[`${EUROSTAT_DATA} Browser`, _crBrowserHref(dataset)], [`${EUROSTAT_DATA}base Node`, _crDatabaseNodeHref(dataset)]] : void 0;
const _crLink = _ref => {
  let [caption, href] = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    href: href,
    children: caption
  });
};
const S_UL = {
  lineHeight: 2
};
const EsLink = _ref2 => {
  let {
    item
  } = _ref2;
  return item ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemList.default, {
    style: S_UL,
    items: _crToolLinks(item.dataset),
    crItem: _crLink
  }) : null;
};
var _default = exports.default = EsLink;
//# sourceMappingURL=EsLink.js.map