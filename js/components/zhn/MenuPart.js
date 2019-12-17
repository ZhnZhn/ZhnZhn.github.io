"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _isKeyEnter = _interopRequireDefault(require("./isKeyEnter"));

var _LabelNew = _interopRequireDefault(require("./LabelNew"));

var _MenuBadge = _interopRequireDefault(require("./MenuBadge"));

var _OpenClose = _interopRequireDefault(require("./OpenClose"));

//import PropTypes from 'prop-types'
var CL_ROW = "row__topic not-selected";

var MenuPart =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuPart, _Component);

  function MenuPart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.hKeyDown = function (onClick, event) {
      if ((0, _isKeyEnter["default"])(event)) {
        onClick();
      }
    };

    _this._renderMenuItems = function (items) {
      return items.map(function (item, index) {
        var title = item.title,
            counter = item.counter,
            isNew = item.isNew,
            onClick = item.onClick;
        return _react["default"].createElement("div", {
          key: index,
          className: CL_ROW,
          onClick: onClick,
          tabIndex: "0",
          role: "menuitem",
          onKeyDown: _this.hKeyDown.bind(null, onClick)
        }, title, counter !== 0 ? _react["default"].createElement(_MenuBadge["default"], {
          counter: counter,
          isOpen: item.isOpen,
          onClick: item.onBadgeClick,
          onBadgeClose: item.onBadgeClose
        }) : null, isNew ? _react["default"].createElement(_LabelNew["default"], null) : null);
      });
    };

    return _this;
  }

  var _proto = MenuPart.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        caption = _this$props.caption,
        isInitOpen = _this$props.isInitOpen,
        items = _this$props.items,
        _isClose = isInitOpen === true ? false : true;

    return _react["default"].createElement(_OpenClose["default"], {
      caption: caption,
      isClose: _isClose
    }, this._renderMenuItems(items));
  };

  return MenuPart;
}(_react.Component);

var _default = MenuPart;
exports["default"] = _default;
//# sourceMappingURL=MenuPart.js.map