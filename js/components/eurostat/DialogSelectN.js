'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _ModalToggle = require('./ModalToggle');

var _ModalToggle2 = _interopRequireDefault(_ModalToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_MAP_FREQUENCY = 'M';

var _crIsId = function _crIsId(id) {
  return 'is' + id + 'Select';
};

var _crIsToggleInit = function _crIsToggleInit(selectProps) {
  var _isToggleInit = {};
  selectProps.forEach(function (item) {
    _isToggleInit[_crIsId(item.id)] = true;
  });
  return _isToggleInit;
};

var DialogSelectN = (_dec = _Decorators2.default.dialog, _dec(_class = (0, _withForDate2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(DialogSelectN, _Component);

  function DialogSelectN(props) {
    (0, _classCallCheck3.default)(this, DialogSelectN);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogSelectN.__proto__ || Object.getPrototypeOf(DialogSelectN)).call(this, props));

    _this._toggleStateBy = function (propName) {
      _this.setState(function (prevState) {
        return (0, _defineProperty3.default)({}, propName, !prevState[propName]);
      });
    };

    _this._isCategory = function () {
      return _RouterOptions2.default.isCategory(_this.chartType);
    };

    _this._updateForDate = function () {
      _this.date = void 0;

      var _this$props$dfProps = _this.props.dfProps,
          dfProps = _this$props$dfProps === undefined ? {} : _this$props$dfProps,
          mapFrequency = dfProps.mapFrequency,
          mapDateDf = dfProps.mapDateDf,
          _frequency = mapFrequency || DF_MAP_FREQUENCY,
          dateConfig = (0, _crDateConfig2.default)(_frequency, mapDateDf);

      _this.setState((0, _extends3.default)({
        isShowDate: true
      }, dateConfig));
    };

    _this._hSelectChartType = function (chartType) {
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

    _this._hSelectDate = function (date) {
      _this.date = date;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          selectProps = _this$props.selectProps,
          _max = selectProps.length,
          msg = [];


      var i = _this._isCategory() ? 1 : 0;
      for (; i < _max; i++) {
        if (!_this._items[i]) {
          msg.push(msgOnNotSelected(selectProps[i].caption));
        }
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var chartType = _this.chartType,
          colorComp = _this.colorComp,
          dialogOptions = _this.dialogOptions,
          seriaColor = colorComp ? colorComp.getColor() : void 0,
          date = _this._getDateWithForDate(),
          isCategory = _RouterOptions2.default.isCategory(chartType),
          items = isCategory ? _this._items.slice(1) : _this._items;

      return _this.props.loadFn(_this.props, {
        items: items,
        dialogOptions: dialogOptions,
        chartType: chartType, seriaColor: seriaColor,
        isCategory: isCategory,
        date: date
        /*
        selectOptions: [
          compSelect1.getOptions(),
          compSelect2.getOptions()
        ]
        */
      });
    };

    _this._hClose = function () {
      _this._handleWithValidationClose();
    };

    _this._hSelect = function (id, index, item) {
      if (item) {
        item.id = id;
      }
      _this._items[index] = item;
    };

    _this._refSelect = function (id, comp) {
      _this._compSelect[id] = comp;
    };

    _this._renderSelects = function (selectProps, isShow, isShowLabels) {
      return selectProps.map(function (item, index) {
        var id = item.id,
            restItem = (0, _objectWithoutProperties3.default)(item, ['id']);

        var _isShow = _this.state[_crIsId(id)];
        return _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { key: id, isShow: _isShow },
          _react2.default.createElement(_DialogCell2.default.SelectWithLoad, (0, _extends3.default)({}, restItem, {
            ref: _this._refSelect.bind(null, id),
            isShow: isShow,
            isShowLabels: isShowLabels,
            onSelect: _this._hSelect.bind(null, id, index)
          }))
        );
      });
    };

    _this._items = [];
    _this._compSelect = {};
    //this.date = undefined;
    //this.chartType = undefined;

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this._toggleChart = _this._toggleStateBy.bind(_this, 'isShowChart');
    _this._toggleDate = _this._toggleStateBy.bind(_this, 'isShowDate');

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true, isOptions: true, isToggle: true });
    _this._commandButtons = _this._crCommandsWithLoad(_this);
    _this._chartOptions = _RouterOptions2.default.crOptions(props);

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState(), {
      isOptions: false,
      isToggle: false,
      isShowChart: true,
      isShowDate: false
    }, (0, _crDateConfig2.default)('EMPTY'), _crIsToggleInit(props.selectProps));
    return _this;
  }
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    selectProps: PropTypes.arrayOf(
       PropTypes.shape({
          id: PropTypes.string,
          caption: PropTypes.string,
          uri: PropTypes.string,
          jsonProp: PropTypes.string
       })
    ),
      noDate: PropTypes.string,
    dfProps: PropTypes.shape({
      mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
      mapDateDf: PropTypes.number,
    }),
    msgOnNotSelected: PropTypes.func,
      onShow: PropTypes.func,
    onFront: PropTypes.func,
    loadFn: PropTypes.func,
      descrUrl: PropTypes.string,
    onClickInfo: PropTypes.func,
      onClose: PropTypes.func,
    onLoad: PropTypes.func
  
  }
  */

  (0, _createClass3.default)(DialogSelectN, [{
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
          selectProps = _props.selectProps,
          noDate = _props.noDate,
          noForDate = _props.noForDate,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isOptions = _state.isOptions,
          isToggle = _state.isToggle,
          isShowLabels = _state.isShowLabels,
          isShowChart = _state.isShowChart,
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
          onClose: this._hClose
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
        _react2.default.createElement(_ModalToggle2.default, {
          isShow: isToggle,
          noForDate: noForDate,
          selectProps: selectProps,
          isShowChart: isShowChart,
          isShowDate: isShowDate,
          crIsId: _crIsId,
          onToggle: this._toggleStateBy,
          toggleChart: this._toggleChart,
          toggleDate: this._toggleDate,
          onClose: this._hideToggleWithToolbar
        }),
        this._renderSelects(selectProps, isShow, isShowLabels),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowChart },
          _react2.default.createElement(_DialogCell2.default.RowChart, {
            isShowLabels: isShowLabels,
            options: this._chartOptions,
            onSelectChart: this._hSelectChartType,
            onRegColor: this._onRegColor
          })
        ),
        !noDate && _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'For Date',
            placeholder: dateDefault,
            options: dateOptions,
            onSelect: this._hSelectDate
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogSelectN;
}(_react.Component), _class2.defaultProps = {
  selectProps: []
}, _temp)) || _class) || _class);
exports.default = DialogSelectN;
//# sourceMappingURL=DialogSelectN.js.map