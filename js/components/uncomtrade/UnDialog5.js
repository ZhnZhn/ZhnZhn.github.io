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

var TRADE_FLOW = [{ caption: "Export Value", value: { rg: 2, measure: "TradeValue" } }, { caption: "Export Weight", value: { rg: 2, measure: "NetWeight" } }, { caption: "Export Average Price", value: { rg: 2, measure: "avgPrice" } }, { caption: "Import Value", value: { rg: 1, measure: "TradeValue" } }, { caption: "Import Weight", value: { rg: 1, measure: "NetWeight" } }, { caption: "Import Average Price", value: { rg: 1, measure: "avgPrice" } }];

var UnDialog5 = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(UnDialog5, _Component);

  function UnDialog5(props) {
    (0, _classCallCheck3.default)(this, UnDialog5);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UnDialog5.__proto__ || Object.getPrototypeOf(UnDialog5)).call(this));

    _this._handleClickOptions = function () {
      _this.setState({
        isShowOptions: !_this.state.isShowOptions
      });
    };

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTradeFlow = function (tradeFlow) {
      _this.tradeFlow = tradeFlow;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var msg = [];

      var _this$parentChild$get = _this.parentChild.getValidation(),
          isValid1 = _this$parentChild$get.isValid,
          msg1 = _this$parentChild$get.msg;

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
      var _this$parentChild$get2 = _this.parentChild.getValues(),
          two = _this$parentChild$get2.parent,
          three = _this$parentChild$get2.child;

      return _this.props.loadFn(_this.props, {
        one: _this.one, two: two, three: three,
        tradeFlow: _this.tradeFlow
        //hasSecondYAxis: this[HAS_SECOND_Y_AXIS]
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._handleMode = function (propName, value) {
      _this[propName] = value;
    };

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: _this._handleClickOptions
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

  (0, _createClass3.default)(UnDialog5, [{
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
          twoCaption = _props.twoCaption,
          twoURI = _props.twoURI,
          twoJsonProp = _props.twoJsonProp,
          threeCaption = _props.threeCaption,
          msgOnNotSelected = _props.msgOnNotSelected,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          nForecastDate = _props.nForecastDate,
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
          placeholder: 'Default: All',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectParentChild, {
          ref: function ref(c) {
            return _this2.parentChild = c;
          },
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          parentCaption: twoCaption,
          parentOptionNames: 'Items',
          parentJsonProp: twoJsonProp,
          childCaption: threeCaption,
          msgOnNotSelected: msgOnNotSelected
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
            nForecastDate: nForecastDate,
            msgOnNotValidFormat: msgOnNotValidFormat,
            onTestDate: onTestDate
          })
        ),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowOptions },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'Trade Flow',
            options: TRADE_FLOW,
            placeholder: 'Default: Export Value',
            onSelect: this._handleSelectTradeFlow
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return UnDialog5;
}(_react.Component)) || _class) || _class);
exports.default = UnDialog5;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\uncomtrade\UnDialog5.js.map