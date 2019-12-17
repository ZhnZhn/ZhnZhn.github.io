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

var yearOptions = [{
  caption: '2020',
  value: 2020
}, {
  caption: '2019',
  value: 2019
}, {
  caption: '2018',
  value: 2018
}, {
  caption: '2017',
  value: 2017
}, {
  caption: '2016',
  value: 2016
}, {
  caption: '2015',
  value: 2015
}, {
  caption: '2014',
  value: 2014
}, {
  caption: '2013',
  value: 2013
}, {
  caption: '2012',
  value: 2012
}];
var Futures3Dialog = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Futures3Dialog, _Component);

  function Futures3Dialog(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.year = undefined

    _this._handleSelectYear = function (year) {
      _this.year = year;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          msgOnNotValidFormat = _this$props.msgOnNotValidFormat,
          isContinious = _this$props.isContinious;
      var msg = [];

      var _this$itemMonth$getVa = _this.itemMonth.getValidation(),
          isValid1 = _this$itemMonth$getVa.isValid,
          msg1 = _this$itemMonth$getVa.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      if (!_this.year) {
        msg.push(msgOnNotSelected('Year'));
      }

      if (isContinious && !_this.fromDate.isValid()) {
        msg.push(msgOnNotValidFormat('From Date'));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$itemMonth$getVa2 = _this.itemMonth.getValues(),
          item = _this$itemMonth$getVa2.one,
          month = _this$itemMonth$getVa2.two,
          isContinious = _this.props.isContinious,
          fromDate = isContinious ? _this.fromDate.getValue() : undefined;

      return _this.props.loadFn(_this.props, {
        item: item,
        month: month,
        year: _this.year,
        fromDate: fromDate
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._refItemMonth = function (c) {
      return _this.itemMonth = c;
    };

    _this._refFromDate = function (c) {
      return _this.fromDate = c;
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

  var _proto = Futures3Dialog.prototype;

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
        isShow = _this$props2.isShow,
        caption = _this$props2.caption,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        futuresURI = _this$props2.futuresURI,
        msgOnNotSelected = _this$props2.msgOnNotSelected,
        isContinious = _this$props2.isContinious,
        initFromDate = _this$props2.initFromDate,
        onTestDateOrEmpty = _this$props2.onTestDateOrEmpty,
        msgTestDateOrEmpty = _this$props2.msgTestDateOrEmpty,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
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
    }), _react["default"].createElement(_DialogCell["default"].SelectOneTwo, {
      ref: this._refItemMonth,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: futuresURI,
      oneCaption: "Futures",
      oneOptionNames: "Futures",
      oneJsonProp: "futures",
      twoCaption: "Month",
      msgOnNotSelected: msgOnNotSelected
    }), _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Year",
      options: yearOptions,
      onSelect: this._handleSelectYear
    }), isContinious && _react["default"].createElement(_DialogCell["default"].RowDate, {
      ref: this._refFromDate,
      isShowLabels: isShowLabels,
      labelTitle: "From Date:",
      initValue: initFromDate,
      errorMsg: msgTestDateOrEmpty,
      onTestDate: onTestDateOrEmpty
    }), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return Futures3Dialog;
}(_react.Component), _temp)) || _class);
var _default = Futures3Dialog;
exports["default"] = _default;
//# sourceMappingURL=Futures3Dialog.js.map