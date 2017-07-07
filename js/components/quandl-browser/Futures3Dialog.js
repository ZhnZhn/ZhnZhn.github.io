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

var _SelectParentChild = require('../dialogs/SelectParentChild');

var _SelectParentChild2 = _interopRequireDefault(_SelectParentChild);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _RowDate = require('../dialogs/RowDate');

var _RowDate2 = _interopRequireDefault(_RowDate);

var _Button = require('../dialogs/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _withValidationLoad = require('../dialogs/decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yearOptions = [{ caption: '2017', value: 2017 }, { caption: '2016', value: 2016 }, { caption: '2015', value: 2015 }, { caption: '2014', value: 2014 }, { caption: '2013', value: 2013 }, { caption: '2012', value: 2012 }];

var Futures3Dialog = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(Futures3Dialog, _Component);

  function Futures3Dialog(props) {
    (0, _classCallCheck3.default)(this, Futures3Dialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Futures3Dialog.__proto__ || Object.getPrototypeOf(Futures3Dialog)).call(this));

    _this._handleClickInfo = function () {
      var _this$props = _this.props,
          descrUrl = _this$props.descrUrl,
          onClickInfo = _this$props.onClickInfo;

      onClickInfo({ descrUrl: descrUrl });
    };

    _this._handleSelectYear = function (year) {
      _this.year = year;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props2 = _this.props,
          msgOnNotSelected = _this$props2.msgOnNotSelected,
          msgOnNotValidFormat = _this$props2.msgOnNotValidFormat,
          isContinious = _this$props2.isContinious;

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
          item = _this$itemMonth$getVa2.parent,
          month = _this$itemMonth$getVa2.child,
          isContinious = _this.props.isContinious,
          fromDate = isContinious ? _this.fromDate.getValue() : undefined;

      return _this.props.loadFn(_this.props, { item: item, month: month, year: _this.year, fromDate: fromDate });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this._renderFromDate = function (initFromDate, onTestDate, msgTestDate) {
      return _react2.default.createElement(_RowDate2.default, {
        ref: function ref(c) {
          return _this.fromDate = c;
        },
        labelTitle: 'From Date:',
        initValue: initFromDate,
        errorMsg: msgTestDate,
        onTestDate: onTestDate
      });
    };

    _this.year = undefined;
    _this.toolbarButtons = [{
      caption: 'I', title: 'Information About Dataset',
      onClick: _this._handleClickInfo
    }];
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Load, { onClick: _this._handleLoad })];
    _this.state = {
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(Futures3Dialog, [{
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
          isShow = _props.isShow,
          caption = _props.caption,
          onShow = _props.onShow,
          futuresURI = _props.futuresURI,
          msgOnNotSelected = _props.msgOnNotSelected,
          isContinious = _props.isContinious,
          initFromDate = _props.initFromDate,
          onTestDateOrEmpty = _props.onTestDateOrEmpty,
          msgTestDateOrEmpty = _props.msgTestDateOrEmpty,
          validationMessages = this.state.validationMessages;


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onClose: this._handleClose
        },
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_SelectParentChild2.default, {
          ref: function ref(c) {
            return _this2.itemMonth = c;
          },
          isShow: isShow,
          uri: futuresURI,
          parentCaption: 'Futures',
          parentOptionNames: 'Futures',
          parentJsonProp: 'futures',
          childCaption: 'Month',
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'Year',
          options: yearOptions,
          onSelect: this._handleSelectYear
        }),
        isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return Futures3Dialog;
}(_react.Component)) || _class;

exports.default = Futures3Dialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\Futures3Dialog.js.map