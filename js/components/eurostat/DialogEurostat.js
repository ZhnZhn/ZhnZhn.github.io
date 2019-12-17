"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _MenuMore = _interopRequireDefault(require("../dialogs/MenuMore"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _dec, _class, _class2, _temp;

var DialogEurostat = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(DialogEurostat, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
      oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,
      twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,
      msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */
  function DialogEurostat(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.one = undefined;
    //this.two = undefined;

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          oneCaption = _this$props.oneCaption,
          twoCaption = _this$props.twoCaption;
      var msg = [];

      if (!_this.one) {
        msg.push(_this.props.msgOnNotSelected(oneCaption));
      }

      if (!_this.two) {
        msg.push(_this.props.msgOnNotSelected(twoCaption));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      return _this.props.loadFn(_this.props, {
        one: _this.one,
        two: _this.two
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState());
    return _this;
  }

  var _proto = DialogEurostat.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        caption = _this$props2.caption,
        isShow = _this$props2.isShow,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        oneCaption = _this$props2.oneCaption,
        oneURI = _this$props2.oneURI,
        oneJsonProp = _this$props2.oneJsonProp,
        twoCaption = _this$props2.twoCaption,
        twoURI = _this$props2.twoURI,
        twoJsonProp = _this$props2.twoJsonProp,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        validationMessages = _this$state.validationMessages;
    return _react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      caption: caption,
      isShow: isShow,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose
    }, _react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: "Items",
      onSelect: this._handleSelectOne
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: twoURI,
      jsonProp: twoJsonProp,
      caption: twoCaption,
      optionNames: "Items",
      onSelect: this._handleSelectTwo
    }), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogEurostat;
}(_react.Component), _class2.defaultProps = {
  oneCaption: 'Item',
  oneJsonProp: 'items',
  twoCaption: 'Metric',
  twoJsonProp: 'metrics'
}, _temp)) || _class);
var _default = DialogEurostat;
exports["default"] = _default;
//# sourceMappingURL=DialogEurostat.js.map