"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

  return /*#__PURE__*/_react["default"].createElement("ul", {
    style: S.ROOT
  }, item.href && /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    caption: "Eurostat Raw Data Link",
    href: item.href
  })), item.dataset && /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    caption: "Eurostat Dataset Viewer",
    href: "" + URL + item.dataset
  })));
};

var _default = EsLink;
exports["default"] = _default;
//# sourceMappingURL=EsLink.js.map