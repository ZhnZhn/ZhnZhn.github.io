"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

//import PropTypes from "prop-types";
var CL = "bt-sub-item";
var S = {
  ACTIVE: {
    fontWeight: 'bold'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SubMenuItem = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SubMenuItem, _Component);

  /*
  static propTypes = {
    caption: PropTypes.string,
    initialIsActive: PropTypes.bool,
    isNotActive: PropTypes.bool,
    onClick: PropTypes.func,
    onClose: PropTypes.func
  }
  */
  function SubMenuItem(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClick = function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onClose = _this$props.onClose;
      onClick();

      _this.setState(function (prev) {
        return {
          isActive: !prev.isActive
        };
      }, function () {
        if (_isFn(onClose)) {
          onClose();
        }
      });
    };

    _this.state = {
      isActive: props.initialIsActive
    };
    return _this;
  }

  var _proto = SubMenuItem.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        caption = _this$props2.caption,
        isNotActive = _this$props2.isNotActive,
        onClick = _this$props2.onClick;

    if (!_isFn(onClick)) {
      return null;
    }

    var isActive = this.state.isActive,
        _style = isActive && !isNotActive ? S.ACTIVE : null;

    return /*#__PURE__*/_react["default"].createElement("button", {
      className: CL,
      style: _style,
      onClick: this._hClick
    }, caption);
  };

  return SubMenuItem;
}(_react.Component);

SubMenuItem.defaultProps = {
  initialIsActive: false
};
var _default = SubMenuItem;
exports["default"] = _default;
//# sourceMappingURL=SubMenuItem.js.map