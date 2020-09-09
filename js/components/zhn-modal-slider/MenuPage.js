"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));

var _MenuItemList = _interopRequireDefault(require("./MenuItemList"));

var _fFocus = function _fFocus(ref) {
  return function () {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };
};

var MenuPage = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(MenuPage, _Component);

  function MenuPage() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this._refTitle = /*#__PURE__*/_react["default"].createRef();
    _this._refFirst = /*#__PURE__*/_react["default"].createRef();

    _this._hClickTitle = function () {
      var _this$props = _this.props,
          pageNumber = _this$props.pageNumber,
          onPrevPage = _this$props.onPrevPage;
      onPrevPage(pageNumber);
    };

    _this._focus = function () {
      var _this$props2 = _this.props,
          pageCurrent = _this$props2.pageCurrent,
          pageNumber = _this$props2.pageNumber;

      if (pageCurrent === pageNumber) {
        if (_this._refTitle.current) {
          setTimeout(_fFocus(_this._refTitle), 1000);
        } else if (_this._refFirst.current) {
          setTimeout(_fFocus(_this._refFirst), 1000);
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
    var _this$props3 = this.props,
        style = _this$props3.style,
        title = _this$props3.title,
        items = _this$props3.items,
        titleCl = _this$props3.titleCl,
        itemCl = _this$props3.itemCl,
        pageNumber = _this$props3.pageNumber,
        onNextPage = _this$props3.onNextPage,
        onClose = _this$props3.onClose,
        children = _this$props3.children;
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: style
    }, /*#__PURE__*/_react["default"].createElement(_MenuTitle["default"], {
      ref: this._refTitle,
      titleCl: titleCl,
      title: title,
      onClick: this._hClickTitle
    }), /*#__PURE__*/_react["default"].createElement(_MenuItemList["default"], {
      ref: this._refFirst,
      items: items,
      itemCl: itemCl || titleCl,
      pageNumber: pageNumber,
      onNextPage: onNextPage,
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