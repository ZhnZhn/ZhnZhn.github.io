'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassNames = {
  INIT: 'modal-root',
  SHOWING: 'modal-root show-modal',
  HIDING: 'modal-root hide-modal'
};

var Styles = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_BACKGROUND: {
    backgroundColor: 'rgba(0,0,0, 0)'
  }
};

var ModalDialogContainer = _react2.default.createClass({
  displayName: 'ModalDialogContainer',

  propTypes: {
    isShow: _react2.default.PropTypes.bool,
    timeout: _react2.default.PropTypes.number,
    onClose: _react2.default.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      timeout: 450
    };
  },
  getInitialState: function getInitialState() {
    this.wasClosing = true;
    return {};
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this = this;

    if (this.wasClosing) {
      setTimeout(function () {
        _this.setState({});
      }, this.props.timeout);
    }
  },
  render: function render() {
    var _props = this.props;
    var isShow = _props.isShow;
    var children = _props.children;
    var onClose = _props.onClose;

    var _className = void 0,
        _style = void 0;
    if (this.wasClosing) {
      _className = ClassNames.INIT;
      _style = Styles.HIDE;
      this.wasClosing = false;
    } else {
      _className = isShow ? ClassNames.SHOWING : ClassNames.HIDING;
      _style = isShow ? Styles.SHOW : Styles.HIDE_BACKGROUND;
      if (!isShow) {
        this.wasClosing = true;
      }
    }

    return _react2.default.createElement(
      'div',
      { className: _className, style: _style, onClick: onClose },
      children
    );
  }
});

exports.default = ModalDialogContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ModalDialogContainer.js.map