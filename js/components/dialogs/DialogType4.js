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

var _dec, _class, _temp;

var HAS_SECOND_Y_AXIS = 'hasSecondYAxis';
var CAPTION_YAXIS = 'Add Seria with Second YAxis';
var DialogType4 = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(DialogType4, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
      oneCaption: PropTypes.string,
    oneNames: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,
      twoCaption: PropTypes.string,
    twoNames: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,
      noDate: PropTypes.bool,
    noOptions: PropTypes.bool,
      initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,
      loadFn: PropTypes.func
  }
  */
  function DialogType4(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
    };

    _this._handleSelectThree = function (three) {
      _this.three = three;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          oneCaption = _this$props.oneCaption,
          twoCaption = _this$props.twoCaption,
          threeURI = _this$props.threeURI,
          threeCaption = _this$props.threeCaption,
          msgOnNotSelected = _this$props.msgOnNotSelected;
      var msg = [];

      if (!_this.one) {
        msg.push(msgOnNotSelected(oneCaption));
      }

      if (!_this.two) {
        msg.push(msgOnNotSelected(twoCaption));
      }

      if (threeURI && !_this.three) {
        msg.push(msgOnNotSelected(threeCaption));
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
        two: _this.two,
        three: _this.three,
        fromDate: fromDate,
        toDate: toDate,
        hasSecondYAxis: _this[HAS_SECOND_Y_AXIS]
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._handleMode = function (propName, value) {
      _this[propName] = value;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    var noDate = props.noDate,
        noOptions = props.noOptions;
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: noDate,
      isShowOptions: !noOptions
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowOptions: false
    });
    return _this;
  }

  var _proto = DialogType4.prototype;

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
        oneNames = _this$props2.oneNames,
        oneURI = _this$props2.oneURI,
        oneJsonProp = _this$props2.oneJsonProp,
        isWithOneInput = _this$props2.isWithOneInput,
        twoCaption = _this$props2.twoCaption,
        twoNames = _this$props2.twoNames,
        twoURI = _this$props2.twoURI,
        twoJsonProp = _this$props2.twoJsonProp,
        isWithInputTwo = _this$props2.isWithInputTwo,
        threeCaption = _this$props2.threeCaption,
        threeNames = _this$props2.threeNames,
        threeURI = _this$props2.threeURI,
        threeJsonProp = _this$props2.threeJsonProp,
        isWithInputThree = _this$props2.isWithInputThree,
        initFromDate = _this$props2.initFromDate,
        initToDate = _this$props2.initToDate,
        msgOnNotValidFormat = _this$props2.msgOnNotValidFormat,
        onTestDate = _this$props2.onTestDate,
        noDate = _this$props2.noDate,
        noOptions = _this$props2.noOptions,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate,
        isShowOptions = _this$state.isShowOptions,
        validationMessages = _this$state.validationMessages;
    return _react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
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
      optionNames: oneNames,
      isWithInput: isWithOneInput,
      onSelect: this._handleSelectOne
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: twoURI,
      jsonProp: twoJsonProp,
      caption: twoCaption,
      optionNames: twoNames,
      isWithInput: isWithInputTwo,
      onSelect: this._handleSelectTwo
    }), threeURI && _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: threeURI,
      jsonProp: threeJsonProp,
      caption: threeCaption,
      optionNames: threeNames,
      isWithInput: isWithInputThree,
      onSelect: this._handleSelectThree
    }), noDate !== true && _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, _react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: this._refDates,
      isShowLabels: isShowLabels,
      initFromDate: initFromDate,
      initToDate: initToDate,
      msgOnNotValidFormat: msgOnNotValidFormat,
      onTestDate: onTestDate
    })), noOptions !== true && _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowOptions
    }, _react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: false,
      caption: CAPTION_YAXIS,
      onCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true),
      onUnCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)
    })), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogType4;
}(_react.Component), _temp)) || _class);
var _default = DialogType4;
exports["default"] = _default;
//# sourceMappingURL=DialogType4.js.map