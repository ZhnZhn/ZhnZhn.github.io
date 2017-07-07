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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};

var STYLE = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  },
  ROOT_DIV: {
    position: 'absolute',
    top: '20%',
    left: '40%',
    display: 'block',
    backgroundColor: '#4D4D4D',
    border: 'solid 2px #232F3B',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10
  },
  CAPTON_DIV: {
    padding: '5px',
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px'
  },
  COMMAND_DIV: {
    cursor: 'default',
    float: 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  },
  BT_ROOT: {
    color: 'rgb(35, 47, 59)'
  }
};

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
        { style: STYLE.COMMAND_DIV },
        commandButtons,
        !withoutClose && _react2.default.createElement(_FlatButton2.default, {
          rootStyle: STYLE.BT_ROOT,
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
        _style = STYLE.HIDE;
        this.wasClosing = false;
      } else {
        _className = isShow ? CL.SHOWING : CL.HIDING;
        _style = isShow ? STYLE.SHOW : STYLE.HIDE_POPUP;
        if (!isShow) {
          this.wasClosing = true;
        }
      }

      return _react2.default.createElement(
        'div',
        {
          className: _className,
          style: (0, _extends3.default)({}, STYLE.ROOT_DIV, style, _style),
          onClick: this._handleClickDialog
        },
        _react2.default.createElement(
          'div',
          { style: STYLE.CAPTON_DIV },
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
  isShow: _react.PropTypes.bool,
  isWithButton: _react.PropTypes.bool,
  isNotUpdate: _react.PropTypes.bool,
  withoutClose: _react.PropTypes.bool,
  commandButtons: _react.PropTypes.arrayOf(_react.PropTypes.element),
  timeout: _react.PropTypes.number,
  caption: _react.PropTypes.string,
  style: _react.PropTypes.object,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = ModalDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-moleculs\ModalDialog.js.map