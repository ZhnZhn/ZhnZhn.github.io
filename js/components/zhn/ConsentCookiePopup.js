'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ConsentCookiePopup = _react2.default.createClass({
  displayName: 'ConsentCookiePopup',
  getInitialState: function getInitialState() {
    this.timeID = undefined;
    this.hideID = undefined;
    return {
      isOpacity: true,
      isDisplay: true
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.timeID = setTimeout(function () {
      _this.props.onNoAnswer();
      _this._startHidingAnimation();
    }, HIDE_PERIOD);

    setTimeout(function () {
      _this.setState({ isOpacity: false });
    }, 500);
  },
  _startHidingAnimation: function _startHidingAnimation() {
    this.hideID = setTimeout(this._hidePopup, ANIMATION_PERIOD);
    this.setState({ isOpacity: true });
  },
  _hidePopup: function _hidePopup() {
    this.setState({ isDisplay: false });
  },
  _handlerClickOk: function _handlerClickOk() {
    if (!this.hideId) {
      clearTimeout(this.timeID);
      this.props.onAnswerYes();
      this._startHidingAnimation();
    }
  },
  _handlerClickNo: function _handlerClickNo() {
    if (!this.hideId) {
      clearTimeout(this.timeID);
      this.props.onAnswerNo();
      this._startHidingAnimation();
    }
  },
  render: function render() {
    var _state = this.state;
    var isOpacity = _state.isOpacity;
    var isDisplay = _state.isDisplay;
    var _opacityStyle = isOpacity ? undefined : STYLE.ROOT__SHOW;
    var _displayStyle = isDisplay ? undefined : STYLE.ROOT_HIDE;

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
            onClick: this._handlerClickOk
          },
          BTN_OK_TITLE
        ),
        _react2.default.createElement(
          'span',
          {
            className: 'consent__btn',
            onClick: this._handlerClickNo
          },
          BTN_NO_TITLE
        )
      )
    );
  }
});

exports.default = ConsentCookiePopup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ConsentCookiePopup.js.map