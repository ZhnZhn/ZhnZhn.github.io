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

var _dec, _class, _temp;

var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore;
var unitOptions = [{
  "caption": "Thousand Barrels per day (kb/d)",
  "value": "KD"
}, {
  "caption": "Thousand Barrels (kbbl)",
  "value": "KB"
}, {
  "caption": "Thousand Kilolitres (kl)",
  "value": "KL"
}, {
  "caption": "Thousand Metric Tons (kmt)",
  "value": "KT"
}, {
  "caption": "Conversion factor barrels/ktons",
  "value": "BK"
}];
var chartOptions = [{
  caption: "AreaSpline",
  value: "AREA"
}, {
  caption: "Yearly by Month",
  value: "YEARLY"
}];
var JodiWorldOilDialog = (_dec = Decor.dialog, _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(JodiWorldOilDialog, _Component);

  function JodiWorldOilDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.country = null
    //this.product = null
    //this.flow = null
    //this.units = null
    //this.chartType = undefined

    _this._hSelectCountry = function (country) {
      _this.country = country;
    };

    _this._hSelectUnits = function (units) {
      _this.units = units;
    };

    _this._hSelectChartType = function (chartType) {
      _this.chartType = chartType;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var msgOnNotSelected = _this.props.msgOnNotSelected;
      var msg = [];

      if (!_this.country) {
        msg.push(msgOnNotSelected('Country'));
      }

      var _this$productFlow$get = _this.productFlow.getValidation(),
          isValid1 = _this$productFlow$get.isValid,
          msg1 = _this$productFlow$get.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      if (!_this.units) {
        _this.units = unitOptions[0];
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
      var _this$productFlow$get2 = _this.productFlow.getValues(),
          product = _this$productFlow$get2.one,
          flow = _this$productFlow$get2.two,
          _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          seriaType = _this.chartType ? _this.chartType.value : void 0,
          _this$props = _this.props,
          fnValue = _this$props.fnValue,
          dataColumn = _this$props.dataColumn,
          loadId = _this$props.loadId,
          dataSource = _this$props.dataSource;

      return {
        value: fnValue(_this.country.value, product.value, flow.value, _this.units.value),
        title: _this.country.caption + ": " + product.caption,
        subtitle: flow.caption + ": " + _this.units.caption,
        fromDate: fromDate,
        toDate: toDate,
        dataColumn: dataColumn,
        seriaType: seriaType,
        loadId: loadId,
        dataSource: dataSource
      };
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._refProductFlow = function (c) {
      return _this.productFlow = c;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
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

  var _proto = JodiWorldOilDialog.prototype;

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
        parentCaption = _this$props2.parentCaption,
        parentChildURI = _this$props2.parentChildURI,
        parentJsonProp = _this$props2.parentJsonProp,
        childCaption = _this$props2.childCaption,
        msgOnNotSelected = _this$props2.msgOnNotSelected,
        initFromDate = _this$props2.initFromDate,
        initToDate = _this$props2.initToDate,
        msgOnNotValidFormat = _this$props2.msgOnNotValidFormat,
        onTestDate = _this$props2.onTestDate,
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
      onSelect: this._hSelectCountry
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].SelectOneTwo, {
      ref: this._refProductFlow,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: parentChildURI,
      oneCaption: parentCaption,
      oneJsonProp: parentJsonProp,
      twoCaption: childCaption,
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Units",
      options: unitOptions,
      onSelect: this._hSelectUnits
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: this._refDates,
      isShowLabels: isShowLabels,
      initFromDate: initFromDate,
      initToDate: initToDate,
      msgOnNotValidFormat: msgOnNotValidFormat,
      onTestDate: onTestDate
    })), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowOptions
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Chart Type",
      placeholder: "Default: AreaSpline",
      options: chartOptions,
      onSelect: this._hSelectChartType
    })), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return JodiWorldOilDialog;
}(_react.Component), _temp)) || _class);
var _default = JodiWorldOilDialog;
exports["default"] = _default;
//# sourceMappingURL=JodiWorldOilDialog.js.map