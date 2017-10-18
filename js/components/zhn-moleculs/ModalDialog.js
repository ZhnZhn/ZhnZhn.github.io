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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Dialog = require('./Dialog.Style');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};

var S = (0, _extends3.default)({}, _Dialog2.default, {
  ROOT_DIV_MODAL: {
    position: 'absolute',
    top: '20%',
    left: '40%',
    display: 'block',
    zIndex: 10
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  }
});

var ModalDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ModalDialog, _Component);

  function ModalDialog(props) {
    (0, _classCallCheck3.default)(this, ModalDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalDialog.__proto__ || Object.getPrototypeOf(ModalDialog)).call(this));

    _this._renderCommandButton = function () {
      var _this$props = _this.props,
          commandButtons = _this$props.commandButtons,
          withoutClose = _this$props.withoutClose,
          onClose = _this$props.onClose;

      return _react2.default.createElement(
        'div',
        { style: S.COMMAND_DIV },
        commandButtons,
        !withoutClose && _react2.default.createElement(_FlatButton2.default, {
          rootStyle: S.BT_ROOT,
          caption: 'Close',
          title: 'Close Modal Dialog',
          onClick: onClose
        })
      );
    };

    _this.wasClosing = false;
    return _this;
  }

  (0, _createClass3.default)(ModalDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        if (nextProps.isNotUpdate) {
          return false;
        }
      }
      return true;
    }
  }, {
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
    key: '_handleClickDialog',
    value: function _handleClickDialog(event) {
      event.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          isWithButton = _props.isWithButton,
          style = _props.style,
          caption = _props.caption,
          styleCaption = _props.styleCaption,
          children = _props.children,
          onClose = _props.onClose;


      var _className = void 0,
          _style = void 0;

      if (this.wasClosing) {
        _style = S.HIDE;
        this.wasClosing = false;
      } else {
        _className = isShow ? CL.SHOWING : CL.HIDING;
        _style = isShow ? S.SHOW : S.HIDE_POPUP;
        if (!isShow) {
          this.wasClosing = true;
        }
      }

      return _react2.default.createElement(
        'div',
        {
          className: _className,
          style: (0, _extends3.default)({}, S.ROOT_DIV, S.ROOT_DIV_MODAL, style, _style),
          onClick: this._handleClickDialog
        },
        _react2.default.createElement(
          'div',
          { style: S.CAPTION_DIV },
          _react2.default.createElement(
            'span',
            { style: styleCaption },
            caption
          ),
          _react2.default.createElement(_SvgClose2.default, { onClose: onClose })
        ),
        _react2.default.createElement(
          'div',
          null,
          children
        ),
        isWithButton && this._renderCommandButton()
      );
    }
  }]);
  return ModalDialog;
}(_react.Component), _class.defaultProps = {
  isWithButton: true,
  isNotUpdate: false,
  timeout: 450
}, _temp);
process.env.NODE_ENV !== "production" ? ModalDialog.propTypes = {
  isShow: _propTypes2.default.bool,
  isWithButton: _propTypes2.default.bool,
  isNotUpdate: _propTypes2.default.bool,
  withoutClose: _propTypes2.default.bool,
  commandButtons: _propTypes2.default.arrayOf(_propTypes2.default.element),
  timeout: _propTypes2.default.number,
  caption: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onClose: _propTypes2.default.func
} : void 0;
exports.default = ModalDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-moleculs\ModalDialog.js.map