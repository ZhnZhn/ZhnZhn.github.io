"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _MenuSlider = _interopRequireDefault(require("./MenuSlider"));

var CL_SCROLL = 'scroll-container-y';
var S = {
  BROWSER: {
    paddingRight: '0'
  },
  SCROLL_DIV: {
    height: '92%'
  }
};

var BrowserSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(BrowserSlider, _Component);

  function BrowserSlider(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          showAction = _this$props.showAction;

      if (actionType === showAction && data === browserType) {
        _this._handleShow();
      }
    };

    _this._handleHide = function () {
      _this.setState({
        isShow: false
      });
    };

    _this._handleShow = function () {
      _this.setState({
        isShow: true
      });
    };

    _this.state = {
      isShow: props.isInitShow ? true : false
    };
    return _this;
  }

  var _proto = BrowserSlider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isShow === nextState.isShow) {
      return false;
    }

    return true;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var caption = this.props.caption,
        isShow = this.state.isShow;
    return _react["default"].createElement(_Comp["default"].Browser, {
      isShow: isShow,
      style: S.BROWSER
    }, _react["default"].createElement(_Comp["default"].BrowserCaption, {
      caption: caption,
      onClose: this._handleHide
    }), _react["default"].createElement(_Comp["default"].ScrollPane, {
      className: CL_SCROLL,
      style: S.SCROLL_DIV
    }, _react["default"].createElement(_MenuSlider["default"], this.props)));
  };

  return BrowserSlider;
}(_react.Component);

var _default = BrowserSlider;
exports["default"] = _default;
//# sourceMappingURL=BrowserSlider.js.map