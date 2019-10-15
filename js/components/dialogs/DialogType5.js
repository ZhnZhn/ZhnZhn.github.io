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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('./MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('./decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HAS_SECOND_Y_AXIS = 'hasSecondYAxis';

var CHART_TYPE_OPTIONS = [{ caption: 'Default: Area', value: _Type.ChartType.AREA }, { caption: 'Scatter: Label Up', value: _Type.ChartType.SCATTER_UP }, { caption: 'Scatter: Label Down', value: _Type.ChartType.SCATTER_DOWN }];

var DialogType5 = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec4 = _Decorators2.default.withInitialState, _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function (_Component) {
  (0, _inherits3.default)(DialogType5, _Component);

  function DialogType5(props) {
    (0, _classCallCheck3.default)(this, DialogType5);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType5.__proto__ || Object.getPrototypeOf(DialogType5)).call(this, props));

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

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var oneCaption = _this.props.oneCaption;

      var msg = [];

      if (!_this.one) {
        msg.push(_this.props.msgOnNotSelected(oneCaption));
      }

      var _this$twoThree$getVal = _this.twoThree.getValidation(),
          isValid1 = _this$twoThree$getVal.isValid,
          msg1 = _this$twoThree$getVal.msg;

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
      var _this$twoThree$getVal2 = _this.twoThree.getValues(),
          two = _this$twoThree$getVal2.one,
          three = _this$twoThree$getVal2.two,
          _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          seriaType = _this.chartType ? _this.chartType.value : undefined;

      return _this.props.loadFn(_this.props, {
        one: _this.one, two: two, three: three, fromDate: fromDate, toDate: toDate,
        hasSecondYAxis: _this[HAS_SECOND_Y_AXIS],
        seriaType: seriaType
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._handleMode = function (propName, value) {
      _this[propName] = value;
    };

    _this._handlerSelectChartType = function (item) {
      _this.chartType = item;
    };

    _this._refTwoThree = function (c) {
      return _this.twoThree = c;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this.toolbarButtons.push({
      caption: 'O', title: 'Toggle Options Input',
      onClick: _this._handleClickOptions
    });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState(), {
      isShowDate: false,
      isShowOptions: false
    });
    return _this;
  }

  (0, _createClass3.default)(DialogType5, [{
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
          isChartType = _props.isChartType,
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
          optionNames: 'Items',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectOneTwo, {
          ref: this._refTwoThree,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          oneCaption: twoCaption,
          oneJsonProp: twoJsonProp,
          twoCaption: threeCaption,
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.DatesFragment, {
            ref: this._refDates,
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
  return DialogType5;
}(_react.Component)) || _class) || _class) || _class) || _class);
exports.default = DialogType5;
//# sourceMappingURL=DialogType5.js.map