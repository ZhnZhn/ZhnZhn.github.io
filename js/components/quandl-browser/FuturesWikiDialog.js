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

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _withValidationLoad = require('../dialogs/decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeOptions = [{ caption: 'Continuous Contract #1', value: 1 }, { caption: 'Continuous Contract #2', value: 2 }, { caption: 'Continuous Contract #3', value: 3 }, { caption: 'Continuous Contract #4', value: 4 }, { caption: 'Continuous Contract #5', value: 5 }];

var FuturesWikiDialog = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(FuturesWikiDialog, _Component);

  function FuturesWikiDialog(props) {
    (0, _classCallCheck3.default)(this, FuturesWikiDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FuturesWikiDialog.__proto__ || Object.getPrototypeOf(FuturesWikiDialog)).call(this));

    _this._handleClickInfo = function () {
      var _this$props = _this.props,
          descrUrl = _this$props.descrUrl,
          onClickInfo = _this$props.onClickInfo;

      onClickInfo({ descrUrl: descrUrl });
    };

    _this._handleSelectType = function (type) {
      _this.type = type;
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

      var _this$exchangeItem$ge = _this.exchangeItem.getValidation(),
          isValid1 = _this$exchangeItem$ge.isValid,
          msg1 = _this$exchangeItem$ge.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      if (!_this.type) {
        msg.push(msgOnNotSelected('Type'));
      }

      if (isContinious && !_this.fromDate.isValid()) {
        msg.push(msgOnNotValidFormat('From Date'));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$exchangeItem$ge2 = _this.exchangeItem.getValues(),
          exchange = _this$exchangeItem$ge2.parent,
          item = _this$exchangeItem$ge2.child,
          isContinious = _this.props.isContinious,
          fromDate = isContinious ? _this.fromDate.getValue() : undefined;

      return _this.props.loadFn(_this.props, { exchange: exchange, item: item, type: _this.type, fromDate: fromDate });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this._renderFromDate = function (initFromDate, onTestDate, msgTestDate) {
      return _react2.default.createElement(_DialogCell2.default.RowDate, {
        ref: function ref(c) {
          return _this.fromDate = c;
        },
        labelTitle: 'From Date:',
        initValue: initFromDate,
        errorMsg: msgTestDate,
        onTestDate: onTestDate
      });
    };

    _this.type = undefined;
    _this.toolbarButtons = [{
      caption: 'I', title: 'Information About Dataset',
      onClick: _this._handleClickInfo
    }];
    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad })];
    _this.state = {
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(FuturesWikiDialog, [{
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
          onFront = _props.onFront,
          futuresURI = _props.futuresURI,
          msgOnNotSelected = _props.msgOnNotSelected,
          isContinious = _props.isContinious,
          initFromDate = _props.initFromDate,
          onTestDateOrEmpty = _props.onTestDateOrEmpty,
          msgTestDateOrEmpty = _props.msgTestDateOrEmpty,
          validationMessages = this.state.validationMessages;


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
        _react2.default.createElement(_DialogCell2.default.SelectParentChild, {
          ref: function ref(c) {
            return _this2.exchangeItem = c;
          },
          isShow: isShow,
          uri: futuresURI,
          parentCaption: 'Exchange',
          parentOptionNames: 'Exchanges',
          parentJsonProp: 'futures',
          childCaption: 'Asset',
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          caption: 'Type',
          options: typeOptions,
          onSelect: this._handleSelectType
        }),
        isContinious && this._renderFromDate(initFromDate, onTestDateOrEmpty, msgTestDateOrEmpty),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return FuturesWikiDialog;
}(_react.Component)) || _class;

exports.default = FuturesWikiDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\FuturesWikiDialog.js.map