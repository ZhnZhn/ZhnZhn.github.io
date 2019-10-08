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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ELEMENT';
//import PropTypes from "prop-types";

var ButtonTab = function (_Component) {
  (0, _inherits3.default)(ButtonTab, _Component);

  /*
  static propTypes = {
    style : PropTypes.object,
    isShow : PropTypes.bool,
    caption : PropTypes.string,
    onClick : PropTypes.func
  }
  */

  function ButtonTab(props) {
    (0, _classCallCheck3.default)(this, ButtonTab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ButtonTab.__proto__ || Object.getPrototypeOf(ButtonTab)).call(this));

    _this._handleClick = function () {
      _this.props.onClick();
      _this.setState({ isShow: !_this.state.isShow });
    };

    _this.state = {
      isShow: props.isShow
    };
    return _this;
  }

  (0, _createClass3.default)(ButtonTab, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps && nextProps.isShow !== this.state.isShow) {
        this.setState({ isShow: nextProps.isShow });
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
          onClick: this._handleClick
        },
        caption,
        children
      );
    }
  }]);
  return ButtonTab;
}(_react.Component);

exports.default = (0, _withTheme2.default)(ButtonTab);
//# sourceMappingURL=ButtonTab.js.map