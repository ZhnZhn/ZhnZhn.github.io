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

var _dec, _dec2, _class, _class2, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

var CHART_TYPE_OPTIONS = [{ caption: 'Default: Area', value: _Type.ChartType.AREA }, { caption: 'Scatter: Label Up', value: _Type.ChartType.SCATTER_UP }, { caption: 'Scatter: Label Down', value: _Type.ChartType.SCATTER_DOWN }];

var DialogType5A = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(DialogType5A, _Component);

  function DialogType5A(props) {
    (0, _classCallCheck3.default)(this, DialogType5A);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType5A.__proto__ || Object.getPrototypeOf(DialogType5A)).call(this));

    _initialiseProps.call(_this);

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

  (0, _createClass3.default)(DialogType5A, [{
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
          threeURI = _props.threeURI,
          threeJsonProp = _props.threeJsonProp,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          nForecastDate = _props.nForecastDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          isChartType = _props.isChartType,
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
          caption: oneCaption,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: oneURI,
          jsonProp: oneJsonProp,
          onSelect: this._hSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          caption: twoCaption,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          jsonProp: twoJsonProp,
          onSelect: this._hSelectTwo
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          caption: threeCaption,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: threeURI,
          jsonProp: threeJsonProp,
          onSelect: this._hSelectThree
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
          isChartType && _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'Chart Type:',
            options: CHART_TYPE_OPTIONS,
            onSelect: this._handlerSelectChartType
          }),
          _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
            initValue: false,
            caption: 'Add Seria with Second YAxis',
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
  return DialogType5A;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._handleClickOptions = function () {
    _this3.setState({
      isShowOptions: !_this3.state.isShowOptions
    });
  };

  this._hSelectOne = function (one) {
    _this3.one = one;
  };

  this._hSelectTwo = function (two) {
    _this3.two = two;
  };

  this._hSelectThree = function (three) {
    _this3.three = three;
  };

  this._handleLoad = function () {
    _this3._handleWithValidationLoad(_this3._createValidationMessages(), _this3._createLoadOption);
  };

  this._createValidationMessages = function () {
    var _props2 = _this3.props,
        oneCaption = _props2.oneCaption,
        twoCaption = _props2.twoCaption,
        threeCaption = _props2.threeCaption,
        msgOnNotSelected = _props2.msgOnNotSelected;

    var msg = [];

    if (!_this3.one) {
      msg.push(msgOnNotSelected(oneCaption));
    }
    if (!_this3.two) {
      msg.push(msgOnNotSelected(twoCaption));
    }
    if (!_this3.three) {
      msg.push(msgOnNotSelected(threeCaption));
    }

    var _datesFragment$getVal = _this3.datesFragment.getValidation(),
        isValid = _datesFragment$getVal.isValid,
        datesMsg = _datesFragment$getVal.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }

    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  };

  this._createLoadOption = function () {
    var one = _this3.one,
        two = _this3.two,
        three = _this3.three,
        datesFragment = _this3.datesFragment,
        chartType = _this3.chartType,
        props = _this3.props,
        _datesFragment$getVal2 = datesFragment.getValues(),
        fromDate = _datesFragment$getVal2.fromDate,
        toDate = _datesFragment$getVal2.toDate,
        seriaType = chartType ? chartType.value : undefined;

    return props.loadFn((0, _extends3.default)({ fnValueType: 'Type5A' }, props), {
      one: one, two: two, three: three,
      fromDate: fromDate, toDate: toDate,
      hasSecondYAxis: _this3[HAS_SECOND_Y_AXIS],
      seriaType: seriaType
    });
  };

  this._handleClose = function () {
    _this3._handleWithValidationClose();
  };

  this._handleMode = function (propName, value) {
    _this3[propName] = value;
  };

  this._handlerSelectChartType = function (item) {
    _this3.chartType = item;
  };
}, _temp)) || _class) || _class);
exports.default = DialogType5A;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs-ext\DialogType5A.js.map