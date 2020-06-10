"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _withThemeRef = _interopRequireDefault(require("../hoc/withThemeRef"));

var _utils = require("../zhn-utils/utils");

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

//import PropTypes from "prop-types";
var TH_ID = 'MODAL_DIALOG';
var CL = {
  MD: 'modal-dialog',
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};
var S = (0, _extends2["default"])({}, _Dialog["default"], {
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

var ModalDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ModalDialog, _Component);

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
    var _this;

    _this = _Component.call(this, props) || this;
    _this.wasClosing = false;

    _this._renderCommandButton = function () {
      var _this$props = _this.props,
          commandButtons = _this$props.commandButtons,
          withoutClose = _this$props.withoutClose;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: S.COMMAND_DIV
      }, commandButtons, !withoutClose && /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
        key: "close",
        style: S.BT,
        caption: "Close",
        title: "Close Modal Dialog",
        onClick: _this._hClose
      }));
    };

    _this.wasClosing = false;
    _this._rootNode = null;
    _this._refRootNode = _this._refRootNode.bind((0, _assertThisInitialized2["default"])(_this));
    _this._hKeyDown = _this._hKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this._hClose = _this._hClose.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = ModalDialog.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.focus();
  };

  _proto._hasHiddenStill = function _hasHiddenStill(nextProps) {
    return !this.props.isShow && !nextProps.isShow;
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      if (nextProps.isNotUpdate || this._hasHiddenStill(nextProps)) {
        return false;
      }
    }

    return true;
  };

  _proto._hasShowed = function _hasShowed(prevProps) {
    return !prevProps.isShow && this.props.isShow;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;

    if (this.wasClosing) {
      setTimeout(function () {
        _this2.setState({});
      }, this.props.timeout);
    } else if (this._hasShowed(prevProps)) {
      this.focus();
    }
  };

  _proto._hClick = function _hClick(event) {
    event.stopPropagation();
  };

  _proto._hKeyDown = function _hKeyDown(evt) {
    if ((0, _utils.isKeyEscape)(evt)) {
      evt.preventDefault();
      evt.stopPropagation();

      this._hClose();
    }
  };

  _proto._hClose = function _hClose() {
    this.props.onClose();
    this.focusPrev();
  };

  _proto._refRootNode = function _refRootNode(n) {
    this._rootNode = n;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        theme = _this$props2.theme,
        isShow = _this$props2.isShow,
        isWithButton = _this$props2.isWithButton,
        style = _this$props2.style,
        caption = _this$props2.caption,
        styleCaption = _this$props2.styleCaption,
        children = _this$props2.children,
        TS = theme.getStyle(TH_ID);

    var _className, _style;

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
      /*#__PURE__*/

      /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
      _react["default"].createElement("div", {
        ref: this._refRootNode,
        role: "dialog",
        tabIndex: "-1",
        "aria-label": caption,
        "aria-hidden": !isShow,
        className: CL.MD + " " + _className,
        style: (0, _extends2["default"])({}, S.ROOT_DIV, S.ROOT_DIV_MODAL, style, _style, TS.ROOT, TS.EL_BORDER),
        onClick: this._hClick,
        onKeyDown: this._hKeyDown
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: (0, _extends2["default"])({}, S.CAPTION_DIV, TS.EL)
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: styleCaption
      }, caption), /*#__PURE__*/_react["default"].createElement(_SvgClose["default"], {
        style: S.SVG_CLOSE,
        onClose: this._hClose
      })), /*#__PURE__*/_react["default"].createElement("div", null, children), isWithButton && this._renderCommandButton())
    );
  };

  _proto.focus = function focus() {
    this._prevFocused = document.activeElement;
    (0, _utils.focusNode)(this._rootNode);
  };

  _proto.focusPrev = function focusPrev() {
    (0, _utils.focusNode)(this._prevFocused);
    this._prevFocused = null;
  };

  return ModalDialog;
}(_react.Component);

ModalDialog.defaultProps = {
  isWithButton: true,
  isNotUpdate: false,
  timeout: 450,
  onClose: function onClose() {}
};

var _default = (0, _withThemeRef["default"])(ModalDialog);

exports["default"] = _default;
//# sourceMappingURL=ModalDialog.js.map