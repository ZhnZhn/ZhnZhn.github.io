'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ELEMENT';

var ButtonTab = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ButtonTab, _Component);

  function ButtonTab(props) {
    (0, _classCallCheck3.default)(this, ButtonTab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ButtonTab.__proto__ || Object.getPrototypeOf(ButtonTab)).call(this, props));

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

  /*
  static propTypes = {
    style : PropTypes.object,
    isShow : PropTypes.bool,
    notUpdatable : PropTypes.bool
    caption : PropTypes.string,
    onClick : PropTypes.func
  }
  */

  (0, _createClass3.default)(ButtonTab, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.isUpdatable && this.props !== nextProps) {
        var _isShow = !!nextProps.isShow;
        if (_isShow !== this.state.isShow) {
          this.setState({ isShow: _isShow });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          caption = _props.caption,
          style = _props.style,
          children = _props.children,
          TS = theme.getStyle(TH_ID),
          _rootClass = this.state.isShow ? 'button-tab button-tab--show not-selected' : 'button-tab not-selected';

      return _react2.default.createElement(
        'div',
        {
          className: _rootClass,
          style: (0, _extends3.default)({}, style, TS.BG),
          onClick: this._hClick
        },
        caption,
        children
      );
    }
  }]);
  return ButtonTab;
}(_react.Component), _class.defaultProps = {
  isUpdatable: true
}, _temp);
exports.default = (0, _withTheme2.default)(ButtonTab);
//# sourceMappingURL=ButtonTab.js.map