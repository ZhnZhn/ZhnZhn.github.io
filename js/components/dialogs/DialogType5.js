"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Type = require("../../constants/Type");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _MenuMore = _interopRequireDefault(require("./MenuMore"));

var _Decorators = _interopRequireDefault(require("./decorators/Decorators"));

var _dec, _class, _temp;

var HAS_SECOND_Y_AXIS = 'hasSecondYAxis';
var CHART_TYPE_OPTIONS = [{
  caption: 'Default: Area',
  value: _Type.ChartType.AREA
}, {
  caption: 'Scatter: Label Up',
  value: _Type.ChartType.SCATTER_UP
}, {
  caption: 'Scatter: Label Down',
  value: _Type.ChartType.SCATTER_DOWN
}];
var DialogType5 = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DialogType5, _Component);

  function DialogType5(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var oneCaption = _this.props.oneCaption;
      var msg = [];

      if (!_this.one) {
        msg.push(_this.props.msgOnNotSelected(oneCaption));
      }

      var _this$twoThree$getVal = _this.twoThree.getValidation(),
          isValid1 = _this$twoThree$getVal.isValid,
          msg1 = _this$twoThree$getVal.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      var _this$datesFragment$g = _this.datesFragment.getValidation(),
          isValid = _this$datesFragment$g.isValid,
          datesMsg = _this$datesFragment$g.datesMsg;

      if (!isValid) {
        msg = msg.concat(datesMsg);
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$twoThree$getVal2 = _this.twoThree.getValues(),
          two = _this$twoThree$getVal2.one,
          three = _this$twoThree$getVal2.two,
          _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          seriaType = _this.chartType ? _this.chartType.value : undefined;

      return _this.props.loadFn(_this.props, {
        one: _this.one,
        two: two,
        three: three,
        fromDate: fromDate,
        toDate: toDate,
        hasSecondYAxis: _this[HAS_SECOND_Y_AXIS],
        seriaType: seriaType
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._handleMode = function (propName, value) {
      _this[propName] = value;
    };

    _this._handlerSelectChartType = function (item) {
      _this.chartType = item;
    };

    _this._refTwoThree = function (c) {
      return _this.twoThree = c;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      isShowOptions: true
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowDate: false,
      isShowOptions: false
    });
    return _this;
  }

  var _proto = DialogType5.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        caption = _this$props.caption,
        isShow = _this$props.isShow,
        onShow = _this$props.onShow,
        onFront = _this$props.onFront,
        oneCaption = _this$props.oneCaption,
        oneURI = _this$props.oneURI,
        oneJsonProp = _this$props.oneJsonProp,
        twoCaption = _this$props.twoCaption,
        twoURI = _this$props.twoURI,
        twoJsonProp = _this$props.twoJsonProp,
        threeCaption = _this$props.threeCaption,
        msgOnNotSelected = _this$props.msgOnNotSelected,
        initFromDate = _this$props.initFromDate,
        initToDate = _this$props.initToDate,
        nForecastDate = _this$props.nForecastDate,
        msgOnNotValidFormat = _this$props.msgOnNotValidFormat,
        onTestDate = _this$props.onTestDate,
        isChartType = _this$props.isChartType,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate,
        isShowOptions = _this$state.isShowOptions,
        validationMessages = _this$state.validationMessages;
    return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
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
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: "Items",
      onSelect: this._handleSelectOne
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].SelectOneTwo, {
      ref: this._refTwoThree,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: twoURI,
      oneCaption: twoCaption,
      oneJsonProp: twoJsonProp,
      twoCaption: threeCaption,
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: this._refDates,
      isShowLabels: isShowLabels,
      initFromDate: initFromDate,
      initToDate: initToDate,
      nForecastDate: nForecastDate,
      msgOnNotValidFormat: msgOnNotValidFormat,
      onTestDate: onTestDate
    })), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowOptions
    }, isChartType && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Chart Type:",
      options: CHART_TYPE_OPTIONS,
      onSelect: this._handlerSelectChartType
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: false,
      caption: "Add Seria with Second YAxis",
      onCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true),
      onUnCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)
    })), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return DialogType5;
}(_react.Component), _temp)) || _class);
var _default = DialogType5;
exports["default"] = _default;
//# sourceMappingURL=DialogType5.js.map