"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _MenuBrowserDynamic = _interopRequireDefault(require("../zhn/MenuBrowserDynamic2"));

var SourceBrowserDynamic2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(SourceBrowserDynamic2, _Component);

  function SourceBrowserDynamic2() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SourceBrowserDynamic2.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  _proto.render = function render() {
    return _react["default"].createElement(_MenuBrowserDynamic["default"], this.props);
  };

  return SourceBrowserDynamic2;
}(_react.Component);

var _default = SourceBrowserDynamic2;
exports["default"] = _default;
//# sourceMappingURL=SourceBrowserDynamic2.js.map