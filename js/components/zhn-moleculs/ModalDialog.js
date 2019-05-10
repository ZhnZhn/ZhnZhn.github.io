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
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withThemeRef = require('../hoc/withThemeRef');

var _withThemeRef2 = _interopRequireDefault(_withThemeRef);

var _utils = require('../zhn-utils/utils');

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Dialog = require('./Dialog.Style');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'MODAL_DIALOG';

var CL = {
  MD: 'modal-dialog',
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};

var S = (0, _extends3.default)({}, _Dialog2.default, {
  ROOT_DIV_MODAL: {
    display: 'block',
    position: 'absolute',
    top: '20%',
    //left: '30%',
    left: '50%',
    width: 380,
    marginLeft: -190,
    zIndex: 10
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  }
});

var ModalDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ModalDialog, _Component);

  /*
   static propTypes = {
     isShow: PropTypes.bool,
     isWithButton: PropTypes.bool,
     isNotUpdate: PropTypes.bool,
     withoutClose: PropTypes.bool,
     style: PropTypes.object,
     caption: PropTypes.string,
     timeout: PropTypes.number,
     commandButtons: PropTypes.arrayOf(PropTypes.element),
     onClose: PropTypes.func
   }
   */
  function ModalDialog(props) {
    (0, _classCallCheck3.default)(this, ModalDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalDialog.__proto__ || Object.getPrototypeOf(ModalDialog)).call(this, props));

    _this.wasClosing = false;

    _this._renderCommandButton = function () {
      var _this$props = _this.props,
          commandButtons = _this$props.commandButtons,
          withoutClose = _this$props.withoutClose;

      return _react2.default.createElement(
        'div',
        { style: S.COMMAND_DIV },
        commandButtons,
        !withoutClose && _react2.default.createElement(_FlatButton2.default, {
          key: 'close',
          rootStyle: S.BT_ROOT,
          caption: 'Close',
          title: 'Close Modal Dialog',
          onClick: _this._hClose
        })
      );
    };

    _this.wasClosing = false;

    _this._rootNode = null;
    _this._refRootNode = _this._refRootNode.bind(_this);

    _this._hKeyDown = _this._hKeyDown.bind(_this);
    _this._hClose = _this._hClose.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ModalDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.focus();
    }
  }, {
    key: '_hasHiddenStill',
    value: function _hasHiddenStill(nextProps) {
      return !this.props.isShow && !nextProps.isShow;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        if (nextProps.isNotUpdate || this._hasHiddenStill(nextProps)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: '_hasShowed',
    value: function _hasShowed(prevProps) {
      return !prevProps.isShow && this.props.isShow;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.wasClosing) {
        setTimeout(function () {
          _this2.setState({});
        }, this.props.timeout);
      } else if (this._hasShowed(prevProps)) {
        this.focus();
      }
    }
  }, {
    key: '_hClick',
    value: function _hClick(event) {
      event.stopPropagation();
    }
  }, {
    key: '_hKeyDown',
    value: function _hKeyDown(evt) {
      if ((0, _utils.isKeyEscape)(evt)) {
        evt.preventDefault();
        evt.stopPropagation();
        this._hClose();
      }
    }
  }, {
    key: '_hClose',
    value: function _hClose() {
      this.props.onClose();
      this.focusPrev();
    }
  }, {
    key: '_refRootNode',
    value: function _refRootNode(n) {
      this._rootNode = n;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isShow = _props.isShow,
          isWithButton = _props.isWithButton,
          style = _props.style,
          caption = _props.caption,
          styleCaption = _props.styleCaption,
          children = _props.children,
          TS = theme.getStyle(TH_ID);


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
      return (
        /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
        _react2.default.createElement(
          'div',
          {
            ref: this._refRootNode,
            role: 'dialog',
            tabIndex: '-1',
            'aria-label': caption,
            'aria-hidden': !isShow,
            className: CL.MD + ' ' + _className,
            style: (0, _extends3.default)({}, S.ROOT_DIV, S.ROOT_DIV_MODAL, style, _style, TS.ROOT, TS.EL_BORDER),
            onClick: this._hClick,
            onKeyDown: this._hKeyDown
          },
          _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, S.CAPTION_DIV, TS.EL) },
            _react2.default.createElement(
              'span',
              { style: styleCaption },
              caption
            ),
            _react2.default.createElement(_SvgClose2.default, {
              style: S.SVG_CLOSE,
              onClose: this._hClose
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            children
          ),
          isWithButton && this._renderCommandButton()
        )
      );
    }
  }, {
    key: 'focus',
    value: function focus() {
      this._prevFocused = document.activeElement;
      (0, _utils.focusNode)(this._rootNode);
    }
  }, {
    key: 'focusPrev',
    value: function focusPrev() {
      (0, _utils.focusNode)(this._prevFocused);
      this._prevFocused = null;
    }
  }]);
  return ModalDialog;
}(_react.Component), _class.defaultProps = {
  isWithButton: true,
  isNotUpdate: false,
  timeout: 450,
  onClose: function onClose() {}
}, _temp);
exports.default = (0, _withThemeRef2.default)(ModalDialog);
//# sourceMappingURL=ModalDialog.js.map