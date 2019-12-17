"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _MenuBrowserDynamic = _interopRequireDefault(require("../zhn/MenuBrowserDynamic"));

var SourceBrowserDynamic =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(SourceBrowserDynamic, _Component);

  function SourceBrowserDynamic() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SourceBrowserDynamic.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  _proto.render = function render() {
    return _react["default"].createElement(_MenuBrowserDynamic["default"], this.props);
  };

  return SourceBrowserDynamic;
}(_react.Component);

var _default = SourceBrowserDynamic;
exports["default"] = _default;
//# sourceMappingURL=SourceBrowserDynamic.js.map