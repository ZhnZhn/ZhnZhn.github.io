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

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _withToolbar = require('./decorators/withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogType4 = (0, _withToolbar2.default)(_class = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(DialogType4, _Component);

  function DialogType4(props) {
    (0, _classCallCheck3.default)(this, DialogType4);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType4.__proto__ || Object.getPrototypeOf(DialogType4)).call(this));

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          oneCaption = _this$props.oneCaption,
          twoCaption = _this$props.twoCaption,
          msgOnNotSelected = _this$props.msgOnNotSelected;

      var msg = [];

      if (!_this.one) {
        msg.push(msgOnNotSelected(oneCaption));
      }
      if (!_this.two) {
        msg.push(msgOnNotSelected(twoCaption));
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
      var _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate;

      return _this.props.loadFn(_this.props, { one: _this.one, two: _this.two, fromDate: fromDate, toDate: toDate });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this.one = undefined;
    _this.two = undefined;
    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this.state = {
      isShowDate: true,
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(DialogType4, [{
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
          oneCaption = _props.oneCaption,
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          twoCaption = _props.twoCaption,
          twoURI = _props.twoURI,
          twoJsonProp = _props.twoJsonProp,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isShowDate = _state.isShowDate,
          validationMessages = _state.validationMessages,
          _commandButtons = [_react2.default.createElement(_ActionButton2.default, {
        key: 'a',
        type: 'TypeC',
        caption: 'Load',
        onClick: this._handleLoad
      })];


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: _commandButtons,
          onShowChart: onShow,
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
          optionNames: 'Stocks',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_SelectWithLoad2.default, {
          isShow: isShow,
          uri: twoURI,
          jsonProp: twoJsonProp,
          caption: twoCaption,
          optionNames: 'Indicators',
          onSelect: this._handleSelectTwo
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
  return DialogType4;
}(_react.Component)) || _class) || _class;

process.env.NODE_ENV !== "production" ? DialogType4.propTypes = {
  isShow: _react.PropTypes.bool,
  caption: _react.PropTypes.string,

  oneCaption: _react.PropTypes.string,
  oneURI: _react.PropTypes.string,
  oneJsonProp: _react.PropTypes.string,
  twoCaption: _react.PropTypes.string,
  twoURI: _react.PropTypes.string,
  twoJsonProp: _react.PropTypes.string,

  initFromDate: _react.PropTypes.string,
  initToDate: _react.PropTypes.string,
  msgOnNotValidFormat: _react.PropTypes.func,
  onTestDate: _react.PropTypes.func,
  onShow: _react.PropTypes.func,

  loadFn: _react.PropTypes.func
} : void 0;
exports.default = DialogType4;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogType4.js.map