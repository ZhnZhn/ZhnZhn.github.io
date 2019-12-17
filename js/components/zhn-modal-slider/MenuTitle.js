"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _MenuAriaItem = _interopRequireDefault(require("./MenuAriaItem"));

var S = {
  ITEM: {
    position: 'relative'
  },
  PREV_PAGE: {
    position: 'absolute',
    top: 0,
    left: '16px'
  },
  TITLE: {
    paddingLeft: '16px'
  }
};

var MenuTitle =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuTitle, _Component);

  function MenuTitle() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MenuTitle.prototype;

  /*
  static propTypes = {
    baseTitleCl: PropTypes.string,
    title: PropTypes.string,
    pageNumber: PropTypes.number,
    onPrevPage: PropTypes.func,
    onReg: PropTypes.func
  }
  */
  _proto.render = function render() {
    var _this$props = this.props,
        baseTitleCl = _this$props.baseTitleCl,
        title = _this$props.title,
        pageNumber = _this$props.pageNumber,
        onPrevPage = _this$props.onPrevPage,
        onReg = _this$props.onReg;

    if (!title) {
      return null;
    }

    return _react["default"].createElement(_MenuAriaItem["default"], {
      className: baseTitleCl,
      style: S.ITEM,
      onClick: onPrevPage.bind(null, pageNumber),
      onReg: onReg
    }, _react["default"].createElement("span", {
      style: S.PREV_PAGE
    }, '<'), _react["default"].createElement("span", {
      style: S.TITLE
    }, title));
  };

  return MenuTitle;
}(_react.Component);

var _default = MenuTitle;
exports["default"] = _default;
//# sourceMappingURL=MenuTitle.js.map