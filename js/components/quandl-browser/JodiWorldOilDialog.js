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

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('../dialogs/SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _SelectParentChild = require('../dialogs/SelectParentChild');

var _SelectParentChild2 = _interopRequireDefault(_SelectParentChild);

var _Button = require('../dialogs/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _withToolbar = require('../dialogs/decorators/withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

var _withValidationLoad = require('../dialogs/decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unitOptions = [{ "caption": "Thousand Barrels per day (kb/d)", "value": "KD" }, { "caption": "Thousand Barrels (kbbl)", "value": "KB" }, { "caption": "Thousand Kilolitres (kl)", "value": "KL" }, { "caption": "Thousand Metric Tons (kmt)", "value": "KT" }, { "caption": "Conversion factor barrels/ktons", "value": "BK" }];

var JodiWorldOilDialog = (0, _withToolbar2.default)(_class = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(JodiWorldOilDialog, _Component);

  function JodiWorldOilDialog(props) {
    (0, _classCallCheck3.default)(this, JodiWorldOilDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (JodiWorldOilDialog.__proto__ || Object.getPrototypeOf(JodiWorldOilDialog)).call(this));

    _this._handleSelectCountry = function (country) {
      _this.country = country;
    };

    _this._handleSelectUnits = function (units) {
      _this.units = units;
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
          _this$props = _this.props,
          fnValue = _this$props.fnValue,
          dataColumn = _this$props.dataColumn,
          loadId = _this$props.loadId,
          dataSource = _this$props.dataSource;

      return {
        value: fnValue(_this.country.value, product.value, flow.value, _this.units.value),
        fromDate: fromDate,
        toDate: toDate,
        dataColumn: dataColumn,
        loadId: loadId,
        title: _this.country.caption + ':' + product.caption,
        subtitle: flow.caption + ':' + _this.units.caption,
        dataSource: dataSource
      };
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this.country = null;
    _this.product = null;
    _this.flow = null;
    _this.units = null;

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isShowDate: true,
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
          isShowDate = _state.isShowDate,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_SelectWithLoad2.default, {
          isShow: isShow,
          uri: oneURI,
          jsonProp: oneJsonProp,
          caption: oneCaption,
          optionNames: 'Items',
          onSelect: this._handleSelectCountry
        }),
        _react2.default.createElement(_SelectParentChild2.default, {
          ref: function ref(c) {
            return _this2.productFlow = c;
          },
          isShow: isShow,
          uri: parentChildURI,
          parentCaption: parentCaption,
          parentOptionNames: 'Items',
          parentJsonProp: parentJsonProp,
          childCaption: childCaption,
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'Units',
          options: unitOptions,
          onSelect: this._handleSelectUnits
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowDate },
          _react2.default.createElement(_DatesFragment2.default, {
            ref: function ref(c) {
              return _this2.datesFragment = c;
            },
            initFromDate: initFromDate,
            initToDate: initToDate,
            msgOnNotValidFormat: msgOnNotValidFormat,
            onTestDate: onTestDate
          })
        ),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return JodiWorldOilDialog;
}(_react.Component)) || _class) || _class;

exports.default = JodiWorldOilDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\JodiWorldOilDialog.js.map