"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Link = _interopRequireDefault(require("./Link"));

var _jsxRuntime = require("react/jsx-runtime");

const EURONEXT_BASE = 'https://www.euronext.com/en/products/equities/',
      DF_CAPTION = 'Euronext Link';

const _crLinkId = (isin, market) => isin && market ? isin + "-" + market : void 0;

const EuronextLink = ({
  item,
  caption
}) => {
  const {
    c = '',
    isin,
    market
  } = item || {},
        _linkId = _crLinkId(isin, market);

  return _linkId ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    caption: (caption || DF_CAPTION) + " " + c,
    href: "" + EURONEXT_BASE + _linkId
  }) : null;
};

var _default = EuronextLink;
exports.default = _default;
//# sourceMappingURL=EuronextLink.js.map