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

var _Type = require('../../constants/Type');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('../dialogs/SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _withValidationLoad = require('../dialogs/decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Placeholder = {
  TRADE: {
    INIT: 'First Load Meta',
    SELECT: 'Select...'
  }
};
var Filter = {
  DEFAULT: 'Default Empty',
  IMPORT: 'Import - Trade (USD)',
  EXPORT: 'Export - Trade (USD)',
  REIMPORT: 'Re-Import - Trade (USD)',
  REEXPORT: 'Re-Export - Trade (USD)'
};

var TRADE_FILTER_OPTIONS = [{ caption: 'Default : Empty Filter', value: Filter.DEFAULT }, { caption: 'Import - Trade (USD)', value: 'Import - Trade (USD)' }, { caption: 'Import - Weight (Kg)', value: 'Import - Weight (Kg)' }, { caption: 'Export - Trade (USD)', value: 'Export - Trade (USD)' }, { caption: 'Export - Weight (Kg)', value: 'Export - Weight (Kg)' }, { caption: 'Re-Import - Trade (USD)', value: 'Re-Import - Trade (USD)' }, { caption: 'Re-Export - Trade (USD)', value: 'Re-Export - Trade (USD)' }];

var CHART_TYPE_OPTIONS = [{ caption: 'Default : Area', value: _Type.ChartType.AREA }, { caption: 'Semi Donut : Total Top90, On Every Year : Recent 2 Years', value: _Type.ChartType.SEMI_DONUT }, { caption: 'Stacked Area : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_AREA }, { caption: 'Stacked Area Percent : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_AREA_PERCENT }, { caption: 'Stacked Column : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_COLUMN }, { caption: 'Stacked Column Percent : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_COLUMN_PERCENT }, { caption: 'Tree Map : On Recent Year', value: _Type.ChartType.TREE_MAP }];

var UNCommodityTradeDialog = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(UNCommodityTradeDialog, _Component);

  function UNCommodityTradeDialog(props) {
    (0, _classCallCheck3.default)(this, UNCommodityTradeDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UNCommodityTradeDialog.__proto__ || Object.getPrototypeOf(UNCommodityTradeDialog)).call(this));

    _this._initTrade = function () {
      _this.subheading = null;
      _this.optionTrades = null;
      _this.setState({
        optionTrades: [],
        placeholderTrade: Placeholder.TRADE.INIT,
        isLoadingTradeFailed: false
      });
    };

    _this._filterTrade = function () {
      var options = void 0;
      if (_this.tradeFilter && _this.optionTrades) {
        (function () {
          var filterValue = _this.tradeFilter.value;
          if (filterValue !== Filter.DEFAULT) {
            options = _this.optionTrades.filter(function (item, index) {
              return item.caption.indexOf(filterValue) !== -1;
            });
            if (filterValue === Filter.IMPORT) {
              options = options.filter(function (item, index) {
                return item.caption.indexOf(Filter.REIMPORT) === -1;
              });
            }
            if (filterValue === Filter.EXPORT) {
              options = options.filter(function (item, index) {
                return item.caption.indexOf(Filter.REEXPORT) === -1;
              });
            }
          } else {
            options = _this.optionTrades;
          }
        })();
      } else {
        options = _this.optionTrades;
      }
      return options;
    };

    _this._handlerClickInfo = function () {
      _ComponentActions2.default.showModalDialog(_Type.ModalDialog.DESCRIPTION, {
        descrUrl: _this.props.descrUrl
      });
    };

    _this._handlerClickAll = function () {
      var _this$state = _this.state,
          isShowFilter = _this$state.isShowFilter,
          isShowDate = _this$state.isShowDate,
          isShowChartType = _this$state.isShowChartType,
          _isShow = isShowFilter || isShowDate || isShowChartType ? false : true;

      _this.setState({
        isShowFilter: _isShow,
        isShowDate: _isShow,
        isShowChartType: _isShow
      });
    };

    _this._handlerClickFilter = function () {
      _this.setState({ isShowFilter: !_this.state.isShowFilter });
    };

    _this._handlerClickDate = function () {
      _this.setState({ isShowDate: !_this.state.isShowDate });
    };

    _this._handlerClickChartType = function () {
      _this.setState({ isShowChartType: !_this.state.isShowChartType });
    };

    _this._handlerSelectCountry = function (country) {
      _this.country = country;
      _this._initTrade();
    };

    _this._handlerSelectChapter = function (chapter) {
      _this.chapter = chapter;
      _this._initTrade();
    };

    _this._handlerSelectTradeFilter = function (filter) {
      _this.tradeFilter = filter;
      _this.setState({ optionTrades: _this._filterTrade() });
    };

    _this._handlerSelectTrade = function (trade) {
      _this.subheading = trade;
    };

    _this._handlerSelectChartType = function (chartType) {
      _this.chartType = chartType;
    };

    _this._handlerLoadMeta = function () {
      _this._handleWithValidationLoad(_this._createMetaValidationMessages(), _this._createLoadMetaOption, _this._loadMeta);
    };

    _this._loadMeta = function (option) {
      _this.props.onLoad(option);
      _this.setState({ isLoadingTrade: true });
    };

    _this._createMetaValidationMessages = function () {
      var msg = [];
      if (!_this.country) {
        msg.push(_this.props.msgOnNotSelected('Country'));
      }
      if (!_this.chapter) {
        msg.push(_this.props.msgOnNotSelected('Subheading'));
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

    _this._createLoadMetaOption = function () {
      var _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          _this$props = _this.props,
          loadId = _this$props.loadId,
          fnValue = _this$props.fnValue;

      return {
        value: fnValue(_this.chapter.value, _this.country.value),
        fromDate: fromDate,
        toDate: toDate,
        isLoadMeta: true,
        onLoad: _this._setOptionTrades,
        onCancel: _this._loadMetaOptionCancel,
        onFailed: _this._loadMetaOptionFailed,
        loadId: loadId
      };
    };

    _this._setOptionTrades = function (optionTrades) {
      _this.optionTrades = optionTrades;
      _this.setState({
        optionTrades: _this._filterTrade(),
        isLoadingTrade: false,
        isLoadingTradeFailed: false,
        placeholderTrade: Placeholder.TRADE.SELECT
      });
    };

    _this._loadMetaOptionCancel = function () {
      _this.setState({
        isLoadingTrade: false,
        isLoadingTradeFailed: false,
        placeholderTrade: Placeholder.TRADE.SELECT
      });
    };

    _this._loadMetaOptionFailed = function () {
      _this.setState({ isLoadingTrade: false, isLoadingTradeFailed: true });
    };

    _this._handlerLoadData = function () {
      _this._handleWithValidationLoad(_this._createDataValidationMessages(), _this._createLoadDataOption);
    };

    _this._createDataValidationMessages = function () {
      var msg = [];
      if (!_this.chartType || _this.chartType.value === _Type.ChartType.AREA) {
        if (!_this.subheading) {
          msg.push(_this.props.msgOnNotSelected('Subheading'));
        }
      } else {
        var placeholderTrade = _this.state.placeholderTrade;

        if (placeholderTrade === Placeholder.TRADE.INIT) {
          msg.push(Placeholder.TRADE.INIT);
        }
        if (!_this.tradeFilter) {
          msg.push(_this.props.msgOnNotSelected('Trade Filter'));
        }
      }
      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadDataOption = function () {
      var _this$datesFragment$g3 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g3.fromDate,
          toDate = _this$datesFragment$g3.toDate,
          _dataColumn = _this.subheading ? _this.subheading.value : _this.props.dataColumn,
          _this$props2 = _this.props,
          loadId = _this$props2.loadId,
          fnValue = _this$props2.fnValue,
          dataSource = _this$props2.dataSource,
          _chartType = _this.chartType ? _this.chartType.value : _Type.ChartType.AREA,
          _title = _this.tradeFilter ? _this.country.caption + ':' + _this.tradeFilter.caption : '' + _this.country.caption,
          _sliceItems = !(!_this.chartType || _this.chartType.value === _Type.ChartType.AREA) ? _this._createSpliceItems() : undefined;

      return {
        value: fnValue(_this.chapter.value, _this.country.value),
        fromDate: fromDate,
        toDate: toDate,
        dataColumn: _dataColumn,
        seriaType: _chartType,
        sliceItems: _sliceItems,
        title: _title,
        subtitle: _this.chapter.caption,
        loadId: loadId,
        dataSource: dataSource
      };
    };

    _this._createSpliceItems = function () {
      var _filterLength = _this.tradeFilter.value.length + 2;
      return _this.state.optionTrades.map(function (item, index) {
        var value = item.value,
            caption = item.caption;

        caption = caption.substring(0, caption.length - _filterLength);
        return { caption: caption, value: value };
      });
    };

    _this._handlerClose = function () {
      _this._handleWithValidationClose(_this._createMetaValidationMessages);
      _this.props.onClose();
    };

    _this.country = null;
    _this.chapter = null;
    _this.tradeFilter = null;
    _this.subheading = null;
    _this.optionTrades = null;
    _this.chartType = null;

    _this.toolbarButtons = [{ caption: 'I', onClick: _this._handlerClickInfo }, { caption: 'A', onClick: _this._handlerClickAll }, { caption: 'F', onClick: _this._handlerClickFilter }, { caption: 'D', onClick: _this._handlerClickDate }, { caption: 'C', onClick: _this._handlerClickChartType }];
    _this.state = {
      isShowFilter: false,
      isShowDate: true,
      isShowChartType: false,
      isLoadingTrade: false,
      isLoadingTradeFailed: false,
      optionTrades: [],
      placeholderTrade: Placeholder.TRADE.INIT,
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(UNCommodityTradeDialog, [{
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
          isShow = _props.isShow,
          onShow = _props.onShow,
          countryURI = _props.countryURI,
          countryJsonProp = _props.countryJsonProp,
          commodityURI = _props.commodityURI,
          commodityJsonProp = _props.commodityJsonProp,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isShowFilter = _state.isShowFilter,
          isShowDate = _state.isShowDate,
          isShowChartType = _state.isShowChartType,
          isLoadingTrade = _state.isLoadingTrade,
          isLoadingTradeFailed = _state.isLoadingTradeFailed,
          optionTrades = _state.optionTrades,
          placeholderTrade = _state.placeholderTrade,
          validationMessages = _state.validationMessages,
          _commandButtons = [_react2.default.createElement(_ActionButton2.default, {
        key: 'a',
        type: 'TypeC',
        caption: 'Load Meta',
        onClick: this._handlerLoadMeta
      }), _react2.default.createElement(_ActionButton2.default, {
        key: 'b',
        type: 'TypeC',
        caption: 'Load Data',
        onClick: this._handlerLoadData
      })];


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: 'United Nations Commodity Trade',
          isShow: isShow,
          commandButtons: _commandButtons,
          onShowChart: onShow,
          onClose: this._handlerClose
        },
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_SelectWithLoad2.default, {
          isShow: isShow,
          uri: countryURI,
          jsonProp: countryJsonProp,
          caption: 'Country:',
          optionNames: 'Countries',
          onSelect: this._handlerSelectCountry
        }),
        _react2.default.createElement(_SelectWithLoad2.default, {
          isShow: isShow,
          uri: commodityURI,
          jsonProp: commodityJsonProp,
          caption: 'Chapter:',
          optionNames: 'Chapters',
          onSelect: this._handlerSelectChapter
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowFilter },
          _react2.default.createElement(_RowInputSelect2.default, {
            caption: 'Filter Trade:',
            options: TRADE_FILTER_OPTIONS,
            placeholder: 'Filter...',
            onSelect: this._handlerSelectTradeFilter
          })
        ),
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'Subheading:',
          options: optionTrades,
          optionNames: 'Meta',
          isLoading: isLoadingTrade,
          isLoadingFailed: isLoadingTradeFailed,
          placeholder: placeholderTrade,
          onLoadOption: this._handlerLoadMeta,
          onSelect: this._handlerSelectTrade

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
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowChartType },
          _react2.default.createElement(_RowInputSelect2.default, {
            caption: 'Chart Type:',
            options: CHART_TYPE_OPTIONS,
            onSelect: this._handlerSelectChartType
          })
        ),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return UNCommodityTradeDialog;
}(_react.Component)) || _class;

exports.default = UNCommodityTradeDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\UNCommodityTradeDialog.js.map