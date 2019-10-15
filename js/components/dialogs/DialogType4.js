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

var HAS_SECOND_Y_AXIS = 'hasSecondYAxis';
var CAPTION_YAXIS = 'Add Seria with Second YAxis';

var DialogType4 = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec4 = _Decorators2.default.withInitialState, _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function (_Component) {
  (0, _inherits3.default)(DialogType4, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
      oneCaption: PropTypes.string,
    oneNames: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,
      twoCaption: PropTypes.string,
    twoNames: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,
      noDate: PropTypes.bool,
    noOptions: PropTypes.bool,
      initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,
      loadFn: PropTypes.func
  }
  */

  function DialogType4(props) {
    (0, _classCallCheck3.default)(this, DialogType4);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType4.__proto__ || Object.getPrototypeOf(DialogType4)).call(this, props));

    _this._handleClickOptions = function () {
      _this.setState(function (prevState) {
        return {
          isShowOptions: !prevState.isShowOptions
        };
      });
    };

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
    };

    _this._handleSelectThree = function (three) {
      _this.three = three;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          oneCaption = _this$props.oneCaption,
          twoCaption = _this$props.twoCaption,
          threeURI = _this$props.threeURI,
          threeCaption = _this$props.threeCaption,
          msgOnNotSelected = _this$props.msgOnNotSelected;

      var msg = [];

      if (!_this.one) {
        msg.push(msgOnNotSelected(oneCaption));
      }
      if (!_this.two) {
        msg.push(msgOnNotSelected(twoCaption));
      }
      if (threeURI && !_this.three) {
        msg.push(msgOnNotSelected(threeCaption));
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
        two: _this.two,
        three: _this.three,
        fromDate: fromDate, toDate: toDate,
        hasSecondYAxis: _this[HAS_SECOND_Y_AXIS]
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._handleMode = function (propName, value) {
      _this[propName] = value;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    var noDate = props.noDate,
        noOptions = props.noOptions;

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: noDate });
    if (noOptions !== true) {
      _this.toolbarButtons.push({
        caption: 'O', title: 'Toggle Options Input',
        onClick: _this._handleClickOptions
      });
    }
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState(), {
      isShowOptions: false
    });
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
      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          onFront = _props.onFront,
          oneCaption = _props.oneCaption,
          oneNames = _props.oneNames,
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          isWithOneInput = _props.isWithOneInput,
          twoCaption = _props.twoCaption,
          twoNames = _props.twoNames,
          twoURI = _props.twoURI,
          twoJsonProp = _props.twoJsonProp,
          isWithInputTwo = _props.isWithInputTwo,
          threeCaption = _props.threeCaption,
          threeNames = _props.threeNames,
          threeURI = _props.threeURI,
          threeJsonProp = _props.threeJsonProp,
          isWithInputThree = _props.isWithInputThree,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          noDate = _props.noDate,
          noOptions = _props.noOptions,
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
          optionNames: oneNames,
          isWithInput: isWithOneInput,
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          jsonProp: twoJsonProp,
          caption: twoCaption,
          optionNames: twoNames,
          isWithInput: isWithInputTwo,
          onSelect: this._handleSelectTwo
        }),
        threeURI && _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: threeURI,
          jsonProp: threeJsonProp,
          caption: threeCaption,
          optionNames: threeNames,
          isWithInput: isWithInputThree,
          onSelect: this._handleSelectThree
        }),
        noDate !== true && _react2.default.createElement(
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
        noOptions !== true && _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowOptions },
          _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
            initValue: false,
            caption: CAPTION_YAXIS,
            onCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, true),
            onUnCheck: this._handleMode.bind(null, HAS_SECOND_Y_AXIS, false)
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogType4;
}(_react.Component)) || _class) || _class) || _class) || _class);
exports.default = DialogType4;
//# sourceMappingURL=DialogType4.js.map