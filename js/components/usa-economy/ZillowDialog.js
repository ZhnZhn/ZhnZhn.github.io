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

var _dec, _class, _temp;

var DATA_NOTE = '*Data present not for all zip codes';
var S = {
  TIP: {
    margin: 10,
    marginTop: 16,
    fontWeight: 'bold'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isByZipCode = function _isByZipCode(item) {
  return item && item.value === 'Z';
};

var _loadFn = function _loadFn(props, options) {
  var fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      zipCode = options.zipCode,
      _hasZipCode = _isByZipCode(two),
      _three = !_hasZipCode ? three : {
    value: zipCode,
    caption: zipCode
  },
      _value = _isFn(fnValue) ? fnValue(one.value, two.value, _three.value) : void 0;

  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: two.caption + ": " + _three.caption,
    subtitle: one.caption,
    dataSource: dataSource,
    isKeyFeature: _hasZipCode
  };
};

var _reZipCode = /^\d{5}$/;

var _isZipCode = function _isZipCode(value) {
  return _reZipCode.test(value.trim());
};

var ZillowDialog = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ZillowDialog, _Component);

  function ZillowDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hSelectMetric = function (metric) {
      _this.metric = metric;
    };

    _this._handleSelectType = function (type) {
      if (_isByZipCode(type)) {
        _this.setState({
          isShowPattern: true
        });
      } else {
        _this.setState({
          isShowPattern: false
        });
      }
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var oneCaption = _this.props.oneCaption;
      var msg = [];

      if (!_this.metric) {
        msg.push(_this.props.msgOnNotSelected(oneCaption));
      }

      var _this$inputTypeCode$g = _this.inputTypeCode.getValues(),
          one = _this$inputTypeCode$g.one;

      if (_isByZipCode(one)) {
        if (!_this.inputZipCode.isValid()) {
          msg = msg.concat('Zip Code is not valid');
        }
      } else {
        var _this$inputTypeCode$g2 = _this.inputTypeCode.getValidation(),
            isValid1 = _this$inputTypeCode$g2.isValid,
            msg1 = _this$inputTypeCode$g2.msg;

        if (!isValid1) {
          msg = msg.concat(msg1);
        }
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
      var _this$inputTypeCode$g3 = _this.inputTypeCode.getValues(),
          two = _this$inputTypeCode$g3.one,
          three = _this$inputTypeCode$g3.two,
          _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          zipCode = _this.inputZipCode.getValue();

      return _loadFn(_this.props, {
        one: _this.metric,
        two: two,
        three: three,
        fromDate: fromDate,
        toDate: toDate,
        zipCode: zipCode
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._refTypeCode = function (c) {
      return _this.inputTypeCode = c;
    };

    _this._refZip = function (n) {
      return _this.inputZipCode = n;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowPattern: false
    });
    return _this;
  }

  var _proto = ZillowDialog.prototype;

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
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate,
        isShowPattern = _this$state.isShowPattern,
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
      onSelect: this._hSelectMetric
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].SelectOneTwo, {
      ref: this._refTypeCode,
      isShow: isShow,
      isShowLabels: isShowLabels,
      isHideTwo: isShowPattern,
      uri: twoURI,
      oneCaption: twoCaption,
      oneJsonProp: twoJsonProp,
      twoCaption: threeCaption,
      msgOnNotSelected: msgOnNotSelected,
      onSelectOne: this._handleSelectType
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowPattern
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowPattern, {
      ref: this._refZip,
      isShowLabels: isShowLabels,
      caption: "*Zip Code",
      placeholder: "Zip Code, 5 Digits",
      onTest: _isZipCode,
      errorMsg: "5 digits format is required"
    })), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
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
      isShow: isShowPattern
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: S.TIP
    }, DATA_NOTE)), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return ZillowDialog;
}(_react.Component), _temp)) || _class);
var _default = ZillowDialog;
exports["default"] = _default;
//# sourceMappingURL=ZillowDialog.js.map