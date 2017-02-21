'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HIDE_PERIOD = 300000,
    ANIMATION_PERIOD = 1100,
    MSG = 'Can website collect statistics, by using session cookies from Google Analytics with anonymizeIp, for better experience ?',
    BTN_OK_TITLE = "OK",
    BTN_NO_TITLE = "NO, not today.";

var STYLE = {
  ROOT__SHOW: {
    opacity: '0.9',
    //top : '52px'
    bottom: '0px'
  },
  ROOT_HIDE: {
    display: 'none'
  }
};

var ConsentCookiePopup = function (_Component) {
  _inherits(ConsentCookiePopup, _Component);

  function ConsentCookiePopup(props) {
    _classCallCheck(this, ConsentCookiePopup);

    var _this = _possibleConstructorReturn(this, (ConsentCookiePopup.__proto__ || Object.getPrototypeOf(ConsentCookiePopup)).call(this));

    _this._startHidingAnimation = function () {
      _this.hideID = setTimeout(_this._hidePopup, ANIMATION_PERIOD);
      _this.setState({ isOpacity: true });
    };

    _this._hidePopup = function () {
      _this.setState({ isDisplay: false });
    };

    _this._handleClickOk = function () {
      if (!_this.hideId) {
        clearTimeout(_this.timeID);
        _this.props.onAnswerYes();
        _this._startHidingAnimation();
      }
    };

    _this._handleClickNo = function () {
      if (!_this.hideId) {
        clearTimeout(_this.timeID);
        _this.props.onAnswerNo();
        _this._startHidingAnimation();
      }
    };

    _this.timeID = undefined;
    _this.hideID = undefined;
    _this.state = {
      isOpacity: true,
      isDisplay: true
    };
    return _this;
  }

  _createClass(ConsentCookiePopup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timeID = setTimeout(function () {
        _this2.props.onNoAnswer();
        _this2._startHidingAnimation();
      }, HIDE_PERIOD);

      setTimeout(function () {
        _this2.setState({ isOpacity: false });
      }, 500);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isOpacity = _state.isOpacity,
          isDisplay = _state.isDisplay,
          _opacityStyle = isOpacity ? undefined : STYLE.ROOT__SHOW,
          _displayStyle = isDisplay ? undefined : STYLE.ROOT_HIDE;

      return _react2.default.createElement(
        'div',
        {
          className: 'consent',
          style: Object.assign({}, _opacityStyle, _displayStyle)
        },
        _react2.default.createElement(
          'p',
          { className: 'consent__msg' },
          MSG
        ),
        _react2.default.createElement(
          'div',
          { className: 'consent__row' },
          _react2.default.createElement(
            'span',
            {
              className: 'consent__btn',
              onClick: this._handleClickOk
            },
            BTN_OK_TITLE
          ),
          _react2.default.createElement(
            'span',
            {
              className: 'consent__btn',
              onClick: this._handleClickNo
            },
            BTN_NO_TITLE
          )
        )
      );
    }
  }]);

  return ConsentCookiePopup;
}(_react.Component);

exports.default = ConsentCookiePopup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ConsentCookiePopup.js.map