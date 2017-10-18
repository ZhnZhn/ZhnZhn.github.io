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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  INIT: 'modal-root',
  SHOWING: 'modal-root show-modal',
  HIDING: 'modal-root hide-modal'
};

var STYLE = {
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
  (0, _inherits3.default)(ModalDialogContainer, _Component);

  function ModalDialogContainer(props) {
    (0, _classCallCheck3.default)(this, ModalDialogContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalDialogContainer.__proto__ || Object.getPrototypeOf(ModalDialogContainer)).call(this));

    _this.wasClosing = true;
    return _this;
  }

  (0, _createClass3.default)(ModalDialogContainer, [{
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
        _className = CL.INIT;
        _style = STYLE.HIDE;
        this.wasClosing = false;
      } else {
        _className = isShow ? CL.SHOWING : CL.HIDING;
        _style = isShow ? STYLE.SHOW : STYLE.HIDE_BACKGROUND;
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
}(_react.Component), _class.defaultProps = {
  timeout: 450
}, _temp);
process.env.NODE_ENV !== "production" ? ModalDialogContainer.propTypes = {
  isShow: _propTypes2.default.bool,
  timeout: _propTypes2.default.number,
  onClose: _propTypes2.default.func
} : void 0;
exports.default = ModalDialogContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-containers\ModalDialogContainer.js.map