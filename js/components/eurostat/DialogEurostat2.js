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

var DialogEurostat2 = (_dec = _Decorators2.default.dialog, _dec(_class = (0, _withForDate2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(DialogEurostat2, _Component);

  function DialogEurostat2(props) {
    (0, _classCallCheck3.default)(this, DialogEurostat2);

    //this.one = undefined;
    //this.two = undefined;
    //this.date = undefined;
    //this.chartType = undefined;

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogEurostat2.__proto__ || Object.getPrototypeOf(DialogEurostat2)).call(this, props));

    _this._isCategory = function () {
      return _RouterOptions2.default.isCategory(_this.chartType);
    };

    _this._updateForDate = function () {
      _this.date = null;
      var frequency = _this.two ? _this.props.mapFrequency ? _this.props.mapFrequency : _this.two.mapFrequency ? _this.two.mapFrequency : MAP_FREQUENCY_DF : null,
          mapDateDf = _this.props.mapDateDf,
          dateConfig = frequency ? (0, _crDateConfig2.default)(frequency, mapDateDf) : (0, _crDateConfig2.default)('EMPTY');


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
          twoCaption = _this$props.twoCaption;

      var msg = [];

      if (!_this._isCategory()) {
        if (!_this.one) {
          msg.push(_this.props.msgOnNotSelected(oneCaption));
        }
      }
      if (!_this.two) {
        msg.push(_this.props.msgOnNotSelected(twoCaption));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var one = _this.one,
          two = _this.two,
          dialogOptions = _this.dialogOptions,
          chartType = _this.chartType,
          colorComp = _this.colorComp,
          compSelect1 = _this.compSelect1,
          compSelect2 = _this.compSelect2,
          seriaColor = colorComp ? colorComp.getColor() : undefined,
          date = _this._getDateWithForDate();

      return _this.props.loadFn(_this.props, {
        one: one, two: two, dialogOptions: dialogOptions,
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
      mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,
      msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */

  (0, _createClass3.default)(DialogEurostat2, [{
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
          noDate = _props.noDate,
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
          optionNames: 'Items',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          ref: this._refSelect2,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          jsonProp: twoJsonProp,
          caption: twoCaption,
          optionNames: 'Metrics',
          onSelect: this._handleSelectTwo
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
  return DialogEurostat2;
}(_react.Component), _class2.defaultProps = {
  oneCaption: 'Item',
  oneJsonProp: 'items',
  twoCaption: 'Metric',
  twoJsonProp: 'metrics'
}, _temp)) || _class) || _class);
exports.default = DialogEurostat2;
//# sourceMappingURL=DialogEurostat2.js.map