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

var _dec, _dec2, _dec3, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeOptions = [{ caption: 'Continuous Contract #1', value: 1 }, { caption: 'Continuous Contract #2', value: 2 }, { caption: 'Continuous Contract #3', value: 3 }, { caption: 'Continuous Contract #4', value: 4 }, { caption: 'Continuous Contract #5', value: 5 }];

var FuturesWikiDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec(_class = _dec2(_class = _dec3(_class = function (_Component) {
  (0, _inherits3.default)(FuturesWikiDialog, _Component);

  function FuturesWikiDialog(props) {
    (0, _classCallCheck3.default)(this, FuturesWikiDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FuturesWikiDialog.__proto__ || Object.getPrototypeOf(FuturesWikiDialog)).call(this));

    _this._handleSelectType = function (type) {
      _this.type = type;
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
      _this._handleWithValidationClose();
    };

    _this._refExchangeItem = function (c) {
      return _this.exchangeItem = c;
    };

    _this._refFromDate = function (c) {
      return _this.fromDate = c;
    };

    _this.type = undefined;

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = {
      isToolbar: true,
      isShowLabels: true,
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
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
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
        _react2.default.createElement(_DialogCell2.default.SelectParentChild, {
          ref: this._refExchangeItem,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: futuresURI,
          parentCaption: 'Exchange',
          parentOptionNames: 'Exchanges',
          parentJsonProp: 'futures',
          childCaption: 'Asset',
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: 'Type',
          options: typeOptions,
          onSelect: this._handleSelectType
        }),
        isContinious && _react2.default.createElement(_DialogCell2.default.RowDate, {
          ref: this._refFromDate,
          isShowLabels: isShowLabels,
          labelTitle: 'From Date:',
          initValue: initFromDate,
          errorMsg: msgTestDateOrEmpty,
          onTestDate: onTestDateOrEmpty
        }),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return FuturesWikiDialog;
}(_react.Component)) || _class) || _class) || _class);
exports.default = FuturesWikiDialog;
//# sourceMappingURL=FuturesWikiDialog.js.map