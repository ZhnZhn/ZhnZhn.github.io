"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _TableItem = _interopRequireDefault(require("./TableItem"));

var S = {
  TH_MORE: {
    textAlign: 'left',
    paddingLeft: '12px'
  }
};

var AlphaPerfItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(AlphaPerfItem, _Component);

  function AlphaPerfItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AlphaPerfItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        config = _this$props.config,
        onCloseItem = _this$props.onCloseItem;
    return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_TableItem["default"], {
      thMoreStyle: S.TH_MORE,
      config: config.m,
      onCloseItem: onCloseItem
    }), _react["default"].createElement(_TableItem["default"], {
      thMoreStyle: S.TH_MORE,
      config: config.y,
      onCloseItem: onCloseItem
    }));
  };

  return AlphaPerfItem;
}(_react.Component);

var _default = AlphaPerfItem;
exports["default"] = _default;
//# sourceMappingURL=AlphaPerfItem.js.map