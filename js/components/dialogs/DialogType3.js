"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _MenuMore = _interopRequireDefault(require("./MenuMore"));

var _Decorators = _interopRequireDefault(require("./decorators/Decorators"));

var _dec, _class, _class2, _temp;

var DF_TIMEOUT = 4000;
var transformOptions = [{
  caption: "NO EFFECT: z[t]=y[t]",
  value: "none"
}, {
  caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]",
  value: "diff"
}, {
  caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]",
  value: "rdiff"
}, {
  caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]",
  value: "rdiff_from"
}, {
  caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100",
  value: "normalize"
}];
var DialogType3 = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DialogType3, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    itemCaption: PropTypes.string,
    optionURI: PropTypes.string,
    optionsJsonProp: PropTypes.string,
    optionNames: PropTypes.string,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,
      descrUrl: PropTypes.string,
    isTransform: PropTypes.bool,
    onClickInfo: PropTypes.func,
    loadFn: PropTypes.func
  }
  */
  function DialogType3(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.one = undefined
    //this.transform = undefined

    _this._handleClickTransform = function () {
      _this.setState(function (prevState) {
        return {
          isShowTransform: !prevState.isShowTransform
        };
      });
    };

    _this._handleSelectTransform = function (option) {
      _this.transform = option;
    };

    _this._clearLoaded = function (one) {
      if (_this.isLoaded && _this.one === one) {
        _this.isLoaded = false;
      }
    };

    _this._handleSelectStock = function (one) {
      if (one && _this.one === one && !_this.isLoaded) {
        _this._handleLoad();

        _this.isLoaded = true;
        setTimeout(_this._clearLoaded, DF_TIMEOUT, one);
      } else {
        _this.one = one;
        _this.isLoaded = false;
      }
    };

    _this._handleLoad = function () {
      //event.target.focus();
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          oneCaption = _this$props.oneCaption,
          itemCaption = _this$props.itemCaption;
      var msg = [];

      if (!_this.one) {
        msg.push(msgOnNotSelected(oneCaption || itemCaption));
      }

      if (_this.datesFragment) {
        var _this$datesFragment$g = _this.datesFragment.getValidation(),
            isValid = _this$datesFragment$g.isValid,
            datesMsg = _this$datesFragment$g.datesMsg;

        if (!isValid) {
          msg = msg.concat(datesMsg);
        }
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _ref = _this.datesFragment ? _this.datesFragment.getValues() : {},
          fromDate = _ref.fromDate,
          toDate = _ref.toDate;

      return _this.props.loadFn(_this.props, {
        one: _this.one,
        fromDate: fromDate,
        toDate: toDate,
        transform: _this.transform
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this.isLoaded = false;
    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    var noDate = props.noDate,
        isTransform = props.isTransform;
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: noDate
    });

    if (isTransform) {
      _this.toolbarButtons.push({
        caption: 'T',
        onClick: _this._handleClickTransform
      });
    }

    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowTransform: false
    });
    return _this;
  }

  var _proto = DialogType3.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        caption = _this$props2.caption,
        isShow = _this$props2.isShow,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        oneURI = _this$props2.oneURI,
        optionURI = _this$props2.optionURI,
        optionsJsonProp = _this$props2.optionsJsonProp,
        oneCaption = _this$props2.oneCaption,
        itemCaption = _this$props2.itemCaption,
        optionNames = _this$props2.optionNames,
        onePlaceholder = _this$props2.onePlaceholder,
        isWithInputStock = _this$props2.isWithInputStock,
        noDate = _this$props2.noDate,
        initFromDate = _this$props2.initFromDate,
        initToDate = _this$props2.initToDate,
        msgOnNotValidFormat = _this$props2.msgOnNotValidFormat,
        onTestDate = _this$props2.onTestDate,
        _oneCaption = oneCaption || itemCaption,
        _oneURI = oneURI || optionURI,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowTransform = _this$state.isShowTransform,
        isShowDate = _this$state.isShowDate,
        validationMessages = _this$state.validationMessages;

    return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      menuModel: this._menuMore,
      caption: caption,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      placeholder: onePlaceholder,
      uri: _oneURI,
      jsonProp: optionsJsonProp,
      caption: _oneCaption,
      optionNames: optionNames,
      isWithInput: isWithInputStock,
      onSelect: this._handleSelectStock
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowTransform
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Transform",
      options: transformOptions,
      onSelect: this._handleSelectTransform
    })), !noDate && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: function ref(c) {
        return _this2.datesFragment = c;
      },
      isShowLabels: isShowLabels,
      initFromDate: initFromDate,
      initToDate: initToDate,
      msgOnNotValidFormat: msgOnNotValidFormat,
      onTestDate: onTestDate
    })), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogType3;
}(_react.Component), _class2.defaultProps = {
  itemCaption: 'Stock',
  optionNames: 'Stocks'
}, _temp)) || _class);
var _default = DialogType3;
exports["default"] = _default;
//# sourceMappingURL=DialogType3.js.map