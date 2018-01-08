'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Browser = require('../zhn/Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _BrowserCaption = require('../zhn/BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _MenuSlider = require('./MenuSlider');

var _MenuSlider2 = _interopRequireDefault(_MenuSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  BROWSER: {
    paddingRight: '0'
  },
  SCROLL_DIV: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px',
    paddingBottom: '4px'
  }
};

var BrowserSlider = function (_Component) {
  (0, _inherits3.default)(BrowserSlider, _Component);

  function BrowserSlider(props) {
    (0, _classCallCheck3.default)(this, BrowserSlider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BrowserSlider.__proto__ || Object.getPrototypeOf(BrowserSlider)).call(this));

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          showAction = _this$props.showAction;

      if (actionType === showAction && data === browserType) {
        _this._handleShow();
      }
    };

    _this._handleHide = function () {
      _this.setState({ isShow: false });
    };

    _this._handleShow = function () {
      _this.setState({ isShow: true });
    };

    _this.state = {
      isShow: props.isInitShow ? true : false
    };
    return _this;
  }

  (0, _createClass3.default)(BrowserSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.isShow === nextState.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var caption = this.props.caption,
          isShow = this.state.isShow;

      return _react2.default.createElement(
        _Browser2.default,
        { isShow: isShow, style: S.BROWSER },
        _react2.default.createElement(_BrowserCaption2.default, {
          caption: caption,
          onClose: this._handleHide
        }),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: S.SCROLL_DIV },
          _react2.default.createElement(_MenuSlider2.default, this.props)
        )
      );
    }
  }]);
  return BrowserSlider;
}(_react.Component);

exports.default = BrowserSlider;
//# sourceMappingURL=BrowserSlider.js.map