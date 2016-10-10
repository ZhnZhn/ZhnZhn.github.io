'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HIDE_PERIOD = 15000,
    ANIMATION_PERIOD = 1100,
    MSG = 'This website uses cookies to collect statistics for better experience.',
    BTN_TITLE = 'Got it!';

var STYLE = {
  ROOT__SHOW: {
    opacity: '1',
    top: '52px'
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
      _this._startHidingAnimation();
    }, HIDE_PERIOD);

    setTimeout(function () {
      _this.setState({ isOpacity: false });
    }, 0);
  },
  _startHidingAnimation: function _startHidingAnimation() {
    this.hideID = setTimeout(this._hidePopup, ANIMATION_PERIOD);
    this.setState({ isOpacity: true });
  },
  _hidePopup: function _hidePopup() {
    this.setState({ isDisplay: false });
  },
  _handlerClickBtn: function _handlerClickBtn() {
    if (!this.hideId) {
      clearTimeout(this.timeID);
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
        'p',
        { className: 'consent__row' },
        _react2.default.createElement(
          'span',
          {
            className: 'consent__btn',
            onClick: this._handlerClickBtn
          },
          BTN_TITLE
        )
      )
    );
  }
});

exports.default = ConsentCookiePopup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ConsentCookiePopup.js.map