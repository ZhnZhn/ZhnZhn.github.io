"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

//import PropTypes from "prop-types";
var TH_ID = 'ELEMENT';

var ButtonTab =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ButtonTab, _Component);

  /*
  static propTypes = {
    style : PropTypes.object,
    isShow : PropTypes.bool,
    notUpdatable : PropTypes.bool
    caption : PropTypes.string,
    onClick : PropTypes.func
  }
  */
  function ButtonTab(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClick = function () {
      var _this$props = _this.props,
          isUpdatable = _this$props.isUpdatable,
          onClick = _this$props.onClick;
      onClick();

      if (isUpdatable) {
        _this.setState(function (prevState) {
          return {
            isShow: !prevState.isShow
          };
        });
      }
    };

    _this.state = {
      isShow: !!props.isShow
    };
    return _this;
  }
  /*
  componentDidUpdate(prevProps){
     if (prevProps !== this.props) {
       const _isShow = !!this.props.isShow;
       if ( _isShow !== this.state.isShow ) {
         this.setState({ isShow: _isShow })
       }
     }
  }
  */


  var _proto = ButtonTab.prototype;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isUpdatable && this.props !== nextProps) {
      var _isShow = !!nextProps.isShow;

      if (_isShow !== this.state.isShow) {
        this.setState({
          isShow: _isShow
        });
      }
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        theme = _this$props2.theme,
        caption = _this$props2.caption,
        style = _this$props2.style,
        children = _this$props2.children,
        TS = theme.getStyle(TH_ID),
        _rootClass = this.state.isShow ? 'button-tab button-tab--show not-selected' : 'button-tab not-selected';

    return _react["default"].createElement("div", {
      className: _rootClass,
      style: (0, _extends2["default"])({}, style, {}, TS.BG),
      onClick: this._hClick
    }, caption, children);
  };

  return ButtonTab;
}(_react.Component);

ButtonTab.defaultProps = {
  isUpdatable: true
};

var _default = (0, _withTheme["default"])(ButtonTab);

exports["default"] = _default;
//# sourceMappingURL=ButtonTab.js.map