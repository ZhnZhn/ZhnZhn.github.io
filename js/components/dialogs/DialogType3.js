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

var _dec, _class, _class2, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('./MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('./decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_TIMEOUT = 4000;

var transformOptions = [{ caption: "NO EFFECT: z[t]=y[t]", value: "none" }, { caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]", value: "diff" }, { caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]", value: "rdiff" }, { caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]", value: "rdiff_from" }, { caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100", value: "normalize" }];

var DialogType3 = (_dec = _Decorators2.default.dialog, _dec(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(DialogType3, _Component);

  function DialogType3(props) {
    (0, _classCallCheck3.default)(this, DialogType3);

    //this.one = undefined
    //this.transform = undefined
    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType3.__proto__ || Object.getPrototypeOf(DialogType3)).call(this, props));

    _this._handleClickTransform = function () {
      _this.setState(function (prevState) {
        return {
          isShowTransform: !prevState.isShowTransform
        };
      });
    };

    _this._handleSelectTransform = function (option) {
      _this.transform = option;
    };

    _this._clearLoaded = function (one) {
      if (_this.isLoaded && _this.one === one) {
        _this.isLoaded = false;
      }
    };

    _this._handleSelectStock = function (one) {
      if (one && _this.one === one && !_this.isLoaded) {
        _this._handleLoad();
        _this.isLoaded = true;
        setTimeout(_this._clearLoaded, DF_TIMEOUT, one);
      } else {
        _this.one = one;
        _this.isLoaded = false;
      }
    };

    _this._handleLoad = function () {
      //event.target.focus();
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          oneCaption = _this$props.oneCaption,
          itemCaption = _this$props.itemCaption;

      var msg = [];

      if (!_this.one) {
        msg.push(msgOnNotSelected(oneCaption || itemCaption));
      }

      if (_this.datesFragment) {
        var _this$datesFragment$g = _this.datesFragment.getValidation(),
            isValid = _this$datesFragment$g.isValid,
            datesMsg = _this$datesFragment$g.datesMsg;

        if (!isValid) {
          msg = msg.concat(datesMsg);
        }
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _ref = _this.datesFragment ? _this.datesFragment.getValues() : {},
          fromDate = _ref.fromDate,
          toDate = _ref.toDate;

      return _this.props.loadFn(_this.props, {
        one: _this.one,
        fromDate: fromDate, toDate: toDate,
        transform: _this.transform
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this.isLoaded = false;

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    var noDate = props.noDate,
        isTransform = props.isTransform;

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: noDate });
    if (isTransform) {
      _this.toolbarButtons.push({
        caption: 'T', onClick: _this._handleClickTransform
      });
    }
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState(), {
      isShowTransform: false
    });
    return _this;
  }
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    itemCaption: PropTypes.string,
    optionURI: PropTypes.string,
    optionsJsonProp: PropTypes.string,
    optionNames: PropTypes.string,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,
      descrUrl: PropTypes.string,
    isTransform: PropTypes.bool,
    onClickInfo: PropTypes.func,
    loadFn: PropTypes.func
  }
  */

  (0, _createClass3.default)(DialogType3, [{
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
          oneURI = _props.oneURI,
          optionURI = _props.optionURI,
          optionsJsonProp = _props.optionsJsonProp,
          oneCaption = _props.oneCaption,
          itemCaption = _props.itemCaption,
          optionNames = _props.optionNames,
          onePlaceholder = _props.onePlaceholder,
          isWithInputStock = _props.isWithInputStock,
          noDate = _props.noDate,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _oneCaption = oneCaption || itemCaption,
          _oneURI = oneURI || optionURI,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          isShowTransform = _state.isShowTransform,
          isShowDate = _state.isShowDate,
          validationMessages = _state.validationMessages;

      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          menuModel: this._menuMore,
          caption: caption,
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
          placeholder: onePlaceholder,
          uri: _oneURI,
          jsonProp: optionsJsonProp,
          caption: _oneCaption,
          optionNames: optionNames,
          isWithInput: isWithInputStock,
          onSelect: this._handleSelectStock
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowTransform },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'Transform',
            options: transformOptions,
            onSelect: this._handleSelectTransform
          })
        ),
        !noDate && _react2.default.createElement(
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
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogType3;
}(_react.Component), _class2.defaultProps = {
  itemCaption: 'Stock',
  optionNames: 'Stocks'
}, _temp)) || _class);
exports.default = DialogType3;
//# sourceMappingURL=DialogType3.js.map