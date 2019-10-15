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

var _dec, _dec2, _dec3, _dec4, _class, _class2, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _crDateConfig = require('./crDateConfig');

var _crDateConfig2 = _interopRequireDefault(_crDateConfig);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _withForDate = require('./withForDate');

var _withForDate2 = _interopRequireDefault(_withForDate);

var _RouterOptions = require('./RouterOptions');

var _RouterOptions2 = _interopRequireDefault(_RouterOptions);

var _ModalOptions = require('./ModalOptions');

var _ModalOptions2 = _interopRequireDefault(_ModalOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAP_FREQUENCY_DF = 'M';

var DialogEurostat3A = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec4 = _Decorators2.default.withInitialState, _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _withForDate2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(DialogEurostat3A, _Component);

  function DialogEurostat3A(props) {
    (0, _classCallCheck3.default)(this, DialogEurostat3A);

    //this.one = undefined;
    //this.two = undefined;
    //this.three = undefined;
    //this.date = undefined;
    //this.chartType = undefined;

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogEurostat3A.__proto__ || Object.getPrototypeOf(DialogEurostat3A)).call(this, props));

    _this._isCategory = function () {
      return _RouterOptions2.default.isCategory(_this.chartType);
    };

    _this._updateForDate = function () {
      _this.date = undefined;
      var _this$props$dfProps = _this.props.dfProps,
          dfProps = _this$props$dfProps === undefined ? {} : _this$props$dfProps,
          mapFrequency = dfProps.mapFrequency,
          mapDateDf = dfProps.mapDateDf;

      var _frequency = _this.two ? mapFrequency : MAP_FREQUENCY_DF,
          dateConfig = _frequency ? (0, _crDateConfig2.default)(_frequency, mapDateDf) : (0, _crDateConfig2.default)('EMPTY');

      _this.setState((0, _extends3.default)({
        isShowDate: true
      }, dateConfig));
    };

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTwo = function (two) {
      _this.two = two;
      if (_this._isCategory()) {
        _this._updateForDate();
      }
    };

    _this._handleSelectThree = function (three) {
      _this.three = three;
    };

    _this._handleSelectChartType = function (chartType) {
      _this.chartType = chartType;
      if (_this._isCategory()) {
        _this._updateForDate();
      } else {
        _this.setState({ isShowDate: false });
      }
    };

    _this._onRegColor = function (comp) {
      _this.colorComp = comp;
    };

    _this._handleSelectDate = function (date) {
      _this.date = date;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          oneCaption = _this$props.oneCaption,
          twoCaption = _this$props.twoCaption,
          threeCaption = _this$props.threeCaption,
          msgOnNotSelected = _this$props.msgOnNotSelected;

      var msg = [];

      if (!_this._isCategory() && !_this.one) {
        msg.push(msgOnNotSelected(oneCaption));
      }
      if (!_this.two) {
        msg.push(msgOnNotSelected(twoCaption));
      }
      if (!_this.three) {
        msg.push(msgOnNotSelected(threeCaption));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var one = _this.one,
          two = _this.two,
          three = _this.three,
          dialogOptions = _this.dialogOptions,
          chartType = _this.chartType,
          colorComp = _this.colorComp,
          compSelect1 = _this.compSelect1,
          compSelect2 = _this.compSelect2,
          seriaColor = colorComp ? colorComp.getColor() : undefined,
          date = _this._getDateWithForDate();

      return _this.props.loadFn(_this.props, {
        one: one,
        group: two,
        metric: three,
        dialogOptions: dialogOptions,
        chartType: chartType, seriaColor: seriaColor,
        date: date,
        selectOptions: [compSelect1.getOptions(), compSelect2.getOptions()]
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._refSelect1 = function (comp) {
      _this.compSelect1 = comp;
    };

    _this._refSelect2 = function (comp) {
      _this.compSelect2 = comp;
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { isOptions: true });
    _this._commandButtons = _this._crCommandsWithLoad(_this);
    _this._chartOptions = _RouterOptions2.default.crOptions(props);

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState(), {
      isOptions: false,
      isShowDate: false
    }, (0, _crDateConfig2.default)('EMPTY'));
    return _this;
  }
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
      oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,
      twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,
      threeCaption: PropTypes.string,
    threeURI: PropTypes.string,
    threeJsonProp: PropTypes.string,
      noDate: PropTypes.string,
      mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,
      msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */

  (0, _createClass3.default)(DialogEurostat3A, [{
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
          threeURI = _props.threeURI,
          threeJsonProp = _props.threeJsonProp,
          noDate = _props.noDate,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isOptions = _state.isOptions,
          isShowLabels = _state.isShowLabels,
          isShowDate = _state.isShowDate,
          dateDefault = _state.dateDefault,
          dateOptions = _state.dateOptions,
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
        _react2.default.createElement(_ModalOptions2.default, {
          isShow: isOptions,
          toggleOption: this._toggleOptionWithToolbar,
          onClose: this._hideOptionsWithToolbar
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          ref: this._refSelect1,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: oneURI,
          jsonProp: oneJsonProp,
          caption: oneCaption,
          optionNames: 'Countries',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          ref: this._refSelect2,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          jsonProp: twoJsonProp,
          caption: twoCaption,
          optionNames: 'Items',
          onSelect: this._handleSelectTwo
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: threeURI,
          jsonProp: threeJsonProp,
          caption: threeCaption,
          optionNames: 'Metrics',
          onSelect: this._handleSelectThree
        }),
        _react2.default.createElement(_DialogCell2.default.RowChart, {
          isShowLabels: isShowLabels,
          options: this._chartOptions,
          onSelectChart: this._handleSelectChartType,
          onRegColor: this._onRegColor
        }),
        !noDate && _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'For Date',
            placeholder: dateDefault,
            options: dateOptions,
            onSelect: this._handleSelectDate
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogEurostat3A;
}(_react.Component), _class2.defaultProps = {
  oneCaption: 'Country',
  oneJsonProp: 'countries',
  twoCaption: 'Item',
  twoJsonProp: 'items',
  threeCaption: 'Metric',
  threeJsonProp: 'items'
}, _temp)) || _class) || _class) || _class) || _class) || _class);
exports.default = DialogEurostat3A;
//# sourceMappingURL=DialogEurostat3A.js.map