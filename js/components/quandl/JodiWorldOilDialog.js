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

var _dec, _dec2, _dec3, _dec4, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unitOptions = [{ "caption": "Thousand Barrels per day (kb/d)", "value": "KD" }, { "caption": "Thousand Barrels (kbbl)", "value": "KB" }, { "caption": "Thousand Kilolitres (kl)", "value": "KL" }, { "caption": "Thousand Metric Tons (kmt)", "value": "KT" }, { "caption": "Conversion factor barrels/ktons", "value": "BK" }];

var chartTypes = [{ caption: "AreaSpline", value: "AREA" }, { caption: "Yearly by Month", value: "YEARLY" }];

var JodiWorldOilDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec4 = _Decorators2.default.withInitialState, _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function (_Component) {
  (0, _inherits3.default)(JodiWorldOilDialog, _Component);

  function JodiWorldOilDialog(props) {
    (0, _classCallCheck3.default)(this, JodiWorldOilDialog);

    //this.country = null
    //this.product = null
    //this.flow = null
    //this.units = null
    //this.chartType = undefined

    var _this = (0, _possibleConstructorReturn3.default)(this, (JodiWorldOilDialog.__proto__ || Object.getPrototypeOf(JodiWorldOilDialog)).call(this, props));

    _this._hClickOptions = function () {
      _this.setState(function (prevState) {
        return {
          isShowOptions: !prevState.isShowOptions
        };
      });
    };

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
        title: _this.country.caption + ': ' + product.caption,
        subtitle: flow.caption + ': ' + _this.units.caption,
        fromDate: fromDate, toDate: toDate,
        dataColumn: dataColumn, seriaType: seriaType, loadId: loadId,
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

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: _this._hClickOptions
    });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState(), {
      isShowDate: false,
      isShowOptions: false
    });
    return _this;
  }

  (0, _createClass3.default)(JodiWorldOilDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        if (this.props.isShow === nextProps.isShow) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          onFront = _props.onFront,
          oneCaption = _props.oneCaption,
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          parentCaption = _props.parentCaption,
          parentChildURI = _props.parentChildURI,
          parentJsonProp = _props.parentJsonProp,
          childCaption = _props.childCaption,
          msgOnNotSelected = _props.msgOnNotSelected,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          isShowDate = _state.isShowDate,
          isShowOptions = _state.isShowOptions,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          caption: caption,
          menuModel: this._menuMore,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.Toolbar, {
          isShow: isToolbar,
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: oneURI,
          jsonProp: oneJsonProp,
          caption: oneCaption,
          optionNames: 'Items',
          onSelect: this._hSelectCountry
        }),
        _react2.default.createElement(_DialogCell2.default.SelectOneTwo, {
          ref: this._refProductFlow,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: parentChildURI,
          oneCaption: parentCaption,
          oneJsonProp: parentJsonProp,
          twoCaption: childCaption,
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: 'Units',
          options: unitOptions,
          onSelect: this._hSelectUnits
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.DatesFragment, {
            ref: this._refDates,
            isShowLabels: isShowLabels,
            initFromDate: initFromDate,
            initToDate: initToDate,
            msgOnNotValidFormat: msgOnNotValidFormat,
            onTestDate: onTestDate
          })
        ),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowOptions },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'Chart Type',
            placeholder: 'Default: AreaSpline',
            options: chartTypes,
            onSelect: this._hSelectChartType
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return JodiWorldOilDialog;
}(_react.Component)) || _class) || _class) || _class) || _class);
exports.default = JodiWorldOilDialog;
//# sourceMappingURL=JodiWorldOilDialog.js.map