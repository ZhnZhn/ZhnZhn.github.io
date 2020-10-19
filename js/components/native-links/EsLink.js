"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Link = _interopRequireDefault(require("./Link"));

var URL = 'https://appsso.eurostat.ec.europa.eu/nui/show.do?lang=en&dataset=';
var S = {
  ROOT: {
    listStyle: 'none'
  }
};

var EsLink = function EsLink(_ref) {
  var item = _ref.item;

  if (!item) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
    style: S.ROOT,
    children: [item.href && /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
        caption: "Eurostat Raw Data Link",
        href: item.href
      })
    }), item.dataset && /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
        caption: "Eurostat Dataset Viewer",
        href: "" + URL + item.dataset
      })
    })]
  });
};

var _default = EsLink;
exports["default"] = _default;
//# sourceMappingURL=EsLink.js.map