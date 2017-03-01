'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var ModalDialogContainer = (_temp = _class = function (_Component) {
  _inherits(ModalDialogContainer, _Component);

  function ModalDialogContainer(props) {
    _classCallCheck(this, ModalDialogContainer);

    var _this = _possibleConstructorReturn(this, (ModalDialogContainer.__proto__ || Object.getPrototypeOf(ModalDialogContainer)).call(this));

    _this.wasClosing = true;
    return _this;
  }

  _createClass(ModalDialogContainer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.wasClosing) {
        setTimeout(function () {
          _this2.setState({});
        }, this.props.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          children = _props.children,
          onClose = _props.onClose;

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
  }]);

  return ModalDialogContainer;
}(_react.Component), _class.propTypes = {
  isShow: _react.PropTypes.bool,
  timeout: _react.PropTypes.number,
  onClose: _react.PropTypes.func
}, _class.defaultProps = {
  timeout: 450
}, _temp);
exports.default = ModalDialogContainer;
//# sourceMappingURL=ModalDialogContainer.js.map