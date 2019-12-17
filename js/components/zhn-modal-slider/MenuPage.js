"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));

var _MenuItemList = _interopRequireDefault(require("./MenuItemList"));

var MenuPage =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuPage, _Component);

  function MenuPage() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._onRegTitle = function (n) {
      return _this._titleNode = n;
    };

    _this._onRegFirst = function (n) {
      return _this._firstNode = n;
    };

    _this._focusTitle = function () {
      return _this._titleNode.focus();
    };

    _this._focusFirst = function () {
      return _this._firstNode.focus();
    };

    _this._focus = function () {
      var _this$props = _this.props,
          pageCurrent = _this$props.pageCurrent,
          pageNumber = _this$props.pageNumber;

      if (pageCurrent === pageNumber) {
        if (_this._titleNode) {
          setTimeout(_this._focusTitle, 1000);
        } else if (_this._firstNode) {
          setTimeout(_this._focusFirst, 1000);
        }
      }
    };

    return _this;
  }

  var _proto = MenuPage.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._focus();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        style = _this$props2.style,
        title = _this$props2.title,
        items = _this$props2.items,
        baseTitleCl = _this$props2.baseTitleCl,
        itemCl = _this$props2.itemCl,
        pageNumber = _this$props2.pageNumber,
        onNextPage = _this$props2.onNextPage,
        onPrevPage = _this$props2.onPrevPage,
        onClose = _this$props2.onClose,
        children = _this$props2.children;
    return _react["default"].createElement("div", {
      style: style
    }, _react["default"].createElement(_MenuTitle["default"], {
      baseTitleCl: baseTitleCl,
      title: title,
      pageNumber: pageNumber,
      onPrevPage: onPrevPage,
      onReg: this._onRegTitle
    }), _react["default"].createElement(_MenuItemList["default"], {
      items: items,
      itemCl: itemCl || baseTitleCl,
      pageNumber: pageNumber,
      onNextPage: onNextPage,
      onReg: this._onRegFirst,
      onClose: onClose
    }), children);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this._focus();
    }
  };

  return MenuPage;
}(_react.Component);

MenuPage.defaultProps = {
  items: []
};
var _default = MenuPage;
exports["default"] = _default;
//# sourceMappingURL=MenuPage.js.map