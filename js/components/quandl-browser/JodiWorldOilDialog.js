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

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unitOptions = [{ "caption": "Thousand Barrels per day (kb/d)", "value": "KD" }, { "caption": "Thousand Barrels (kbbl)", "value": "KB" }, { "caption": "Thousand Kilolitres (kl)", "value": "KL" }, { "caption": "Thousand Metric Tons (kmt)", "value": "KT" }, { "caption": "Conversion factor barrels/ktons", "value": "BK" }];

var chartTypes = [{ caption: "AreaSpline", value: "AREA" }, { caption: "Yearly by Month", value: "YEARLY" }];

var JodiWorldOilDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(JodiWorldOilDialog, _Component);

  function JodiWorldOilDialog(props) {
    (0, _classCallCheck3.default)(this, JodiWorldOilDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (JodiWorldOilDialog.__proto__ || Object.getPrototypeOf(JodiWorldOilDialog)).call(this));

    _this._hClickOptions = function () {
      _this.setState({ isShowOptions: !_this.state.isShowOptions });
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
          product = _this$productFlow$get2.parent,
          flow = _this$productFlow$get2.child,
          _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          seriaType = _this.chartType ? _this.chartType.value : undefined,
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

    _this.country = null;
    _this.product = null;
    _this.flow = null;
    _this.units = null;
    _this.chartType = undefined;

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: _this._hClickOptions
    });

    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isShowLabels: true,
      isShowDate: false,
      isShowOptions: false,
      validationMessages: []
    };
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
      var _this2 = this;

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
          isShowLabels = _state.isShowLabels,
          isShowDate = _state.isShowDate,
          isShowOptions = _state.isShowOptions,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.ToolbarButtonCircle, {
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
        _react2.default.createElement(_DialogCell2.default.SelectParentChild, {
          ref: function ref(c) {
            return _this2.productFlow = c;
          },
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: parentChildURI,
          parentCaption: parentCaption,
          parentOptionNames: 'Items',
          parentJsonProp: parentJsonProp,
          childCaption: childCaption,
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
            ref: function ref(c) {
              return _this2.datesFragment = c;
            },
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
}(_react.Component)) || _class) || _class);
exports.default = JodiWorldOilDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\JodiWorldOilDialog.js.map