'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithLoadOptions = require('../dialogs/WithLoadOptions');

var _WithLoadOptions2 = _interopRequireDefault(_WithLoadOptions);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

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

var UNCommodityTradeDialog = _react2.default.createClass(_extends({
  displayName: 'UNCommodityTradeDialog'
}, _WithLoadOptions2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.country = null;
    this.chapter = null;
    this.tradeFilter = null;
    this.subheading = null;
    this.optionTrades = null;
    this.chartType = null;

    this.toolbarButtons = [{ caption: 'I', onClick: this._handlerClickInfo }, { caption: 'A', onClick: this._handlerClickAll }, { caption: 'F', onClick: this._handlerClickFilter }, { caption: 'D', onClick: this._handlerClickDate }, { caption: 'C', onClick: this._handlerClickChartType }];

    return {
      isShowFilter: false,
      isShowDate: true,
      isShowChartType: false,

      isLoadingCountries: false,
      isLoadingCountriesFailed: false,
      optionCountries: [],

      isLoadingCommodities: false,
      isLoadingCommoditiesFailed: false,
      optionCommodities: [],

      optionTradeFilter: [{ caption: 'Default : Empty Filter', value: Filter.DEFAULT }, { caption: 'Import - Trade (USD)', value: 'Import - Trade (USD)' }, { caption: 'Import - Weight (Kg)', value: 'Import - Weight (Kg)' }, { caption: 'Export - Trade (USD)', value: 'Export - Trade (USD)' }, { caption: 'Export - Weight (Kg)', value: 'Export - Weight (Kg)' }, { caption: 'Re-Import - Trade (USD)', value: 'Re-Import - Trade (USD)' }, { caption: 'Re-Export - Trade (USD)', value: 'Re-Export - Trade (USD)' }],
      isLoadingTrade: false,
      isLoadingTradeFailed: false,
      optionTrades: [],
      placeholderTrade: Placeholder.TRADE.INIT,

      optionChartTypes: [{ caption: 'Default : Area', value: _Type.ChartType.AREA }, { caption: 'Semi Donut : Total Top90, On Every Year : Recent 2 Years', value: _Type.ChartType.SEMI_DONUT }, { caption: 'Stacked Area : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_AREA }, { caption: 'Stacked Area Percent : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_AREA_PERCENT }, { caption: 'Stacked Column : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_COLUMN }, { caption: 'Stacked Column Percent : Total Top90, On Recent Year', value: _Type.ChartType.STACKED_COLUMN_PERCENT }, { caption: 'Tree Map : On Recent Year', value: _Type.ChartType.TREE_MAP }],

      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    this._handlerLoadCountry();
    this._handlerLoadChapter();
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }
    return true;
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.state.isLoadingCountriesFailed && this.props.isShow) {
        this._handlerLoadCountry();
      }
      if (this.state.isLoadingCommoditiesFailed && this.props.isShow) {
        this._handlerLoadChapter();
      }
    }
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _initTrade: function _initTrade() {
    this.subheading = null;
    this.optionTrades = null;
    this.setState({
      optionTrades: [],
      placeholderTrade: Placeholder.TRADE.INIT,
      isLoadingTradeFailed: false
    });
  },
  _filterTrade: function _filterTrade() {
    var _this = this;

    var options = void 0;
    if (this.tradeFilter && this.optionTrades) {
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
      options = this.optionTrades;
    }
    return options;
  },
  _handlerClickInfo: function _handlerClickInfo() {
    _ComponentActions2.default.showModalDialog(_Type.ModalDialog.DESCRIPTION, {
      descrUrl: this.props.descrUrl
    });
  },
  _handlerClickAll: function _handlerClickAll() {
    var _state = this.state;
    var isShowFilter = _state.isShowFilter;
    var isShowDate = _state.isShowDate;
    var isShowChartType = _state.isShowChartType;
    var _isShow = isShowFilter || isShowDate || isShowChartType ? false : true;
    this.setState({
      isShowFilter: _isShow,
      isShowDate: _isShow,
      isShowChartType: _isShow
    });
  },
  _handlerClickFilter: function _handlerClickFilter() {
    this.setState({ isShowFilter: !this.state.isShowFilter });
  },
  _handlerClickDate: function _handlerClickDate() {
    this.setState({ isShowDate: !this.state.isShowDate });
  },
  _handlerClickChartType: function _handlerClickChartType() {
    this.setState({ isShowChartType: !this.state.isShowChartType });
  },
  _handlerLoadCountry: function _handlerLoadCountry() {
    var _props = this.props;
    var countryURI = _props.countryURI;
    var countryJsonProp = _props.countryJsonProp;

    this._handlerWithLoadOptions('optionCountries', 'isLoadingCountries', 'isLoadingCountriesFailed', countryURI, countryJsonProp);
  },
  _handlerLoadChapter: function _handlerLoadChapter() {
    var _props2 = this.props;
    var commodityURI = _props2.commodityURI;
    var commodityJsonProp = _props2.commodityJsonProp;

    this._handlerWithLoadOptions('optionCommodities', 'isLoadingCommodities', 'isLoadingCommoditiesFailed', commodityURI, commodityJsonProp);
  },
  _handlerSelectCountry: function _handlerSelectCountry(country) {
    this.country = country;
    this._initTrade();
  },
  _handlerSelectChapter: function _handlerSelectChapter(chapter) {
    this.chapter = chapter;
    this._initTrade();
  },
  _handlerSelectTradeFilter: function _handlerSelectTradeFilter(filter) {
    this.tradeFilter = filter;
    this.setState({ optionTrades: this._filterTrade() });
  },
  _handlerSelectTrade: function _handlerSelectTrade(trade) {
    this.subheading = trade;
  },
  _handlerSelectChartType: function _handlerSelectChartType(chartType) {
    this.chartType = chartType;
  },
  _handlerLoadMeta: function _handlerLoadMeta() {
    this._handlerWithValidationLoad(this._createMetaValidationMessages(), this._createLoadMetaOption, this._loadMeta);
  },
  _loadMeta: function _loadMeta(option) {
    this.props.onLoad(option);
    this.setState({ isLoadingTrade: true });
  },
  _createMetaValidationMessages: function _createMetaValidationMessages() {
    var msg = [];
    if (!this.country) {
      msg.push(this.props.msgOnNotSelected('Country'));
    }
    if (!this.chapter) {
      msg.push(this.props.msgOnNotSelected('Subheading'));
    }

    var _datesFragment$getVal = this.datesFragment.getValidation();

    var isValid = _datesFragment$getVal.isValid;
    var datesMsg = _datesFragment$getVal.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadMetaOption: function _createLoadMetaOption() {
    var _datesFragment$getVal2 = this.datesFragment.getValues();

    var fromDate = _datesFragment$getVal2.fromDate;
    var toDate = _datesFragment$getVal2.toDate;
    var fnValue = this.props.fnValue;

    return {
      value: fnValue(this.chapter.value, this.country.value),
      fromDate: fromDate,
      toDate: toDate,
      isLoadMeta: true,
      onLoad: this._setOptionTrades,
      onFailed: this._loadMetaOptionFailed
    };
  },
  _setOptionTrades: function _setOptionTrades(optionTrades) {
    this.optionTrades = optionTrades;
    this.setState({
      optionTrades: this._filterTrade(),
      isLoadingTrade: false,
      isLoadingTradeFailed: false,
      placeholderTrade: Placeholder.TRADE.SELECT
    });
  },
  _loadMetaOptionFailed: function _loadMetaOptionFailed() {
    this.setState({ isLoadingTrade: false, isLoadingTradeFailed: true });
  },
  _handlerLoadData: function _handlerLoadData() {
    this._handlerWithValidationLoad(this._createDataValidationMessages(), this._createLoadDataOption);
  },
  _createDataValidationMessages: function _createDataValidationMessages() {
    var msg = [];
    if (!this.chartType || this.chartType.value === _Type.ChartType.AREA) {
      if (!this.subheading) {
        msg.push(this.props.msgOnNotSelected('Subheading'));
      }
    } else {
      if (!this.tradeFilter) {
        msg.push(this.props.msgOnNotSelected('Trade Filter'));
      }
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadDataOption: function _createLoadDataOption() {
    var _datesFragment$getVal3 = this.datesFragment.getValues();

    var fromDate = _datesFragment$getVal3.fromDate;
    var toDate = _datesFragment$getVal3.toDate;
    var _dataColumn = this.subheading ? this.subheading.value : this.props.dataColumn;
    var fnValue = this.props.fnValue;
    var _chartType = this.chartType ? this.chartType.value : undefined;
    var _title = this.tradeFilter ? this.country.caption + ':' + this.tradeFilter.caption : '' + this.country.caption;
    return {
      value: fnValue(this.chapter.value, this.country.value),
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: _dataColumn,
      seriaType: _chartType,
      sliceItems: this._createSpliceItems(),
      title: _title,
      subtitle: this.chapter.caption
    };
  },
  _createSpliceItems: function _createSpliceItems() {
    var _filterLength = this.tradeFilter.value.length + 2;
    return this.state.optionTrades.map(function (item, index) {
      var value = item.value;
      var caption = item.caption;

      caption = caption.substring(0, caption.length - _filterLength);
      return { caption: caption, value: value };
    });
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createMetaValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this2 = this;

    var _props3 = this.props;
    var isShow = _props3.isShow;
    var onShow = _props3.onShow;
    var onClose = _props3.onClose;
    var initFromDate = _props3.initFromDate;
    var initToDate = _props3.initToDate;
    var msgOnNotValidFormat = _props3.msgOnNotValidFormat;
    var onTestDate = _props3.onTestDate;
    var _state2 = this.state;
    var isShowFilter = _state2.isShowFilter;
    var isShowDate = _state2.isShowDate;
    var isShowChartType = _state2.isShowChartType;
    var optionCountries = _state2.optionCountries;
    var isLoadingCountries = _state2.isLoadingCountries;
    var isLoadingCountriesFailed = _state2.isLoadingCountriesFailed;
    var optionCommodities = _state2.optionCommodities;
    var isLoadingCommodities = _state2.isLoadingCommodities;
    var isLoadingCommoditiesFailed = _state2.isLoadingCommoditiesFailed;
    var optionTradeFilter = _state2.optionTradeFilter;
    var isLoadingTrade = _state2.isLoadingTrade;
    var isLoadingTradeFailed = _state2.isLoadingTradeFailed;
    var optionTrades = _state2.optionTrades;
    var placeholderTrade = _state2.placeholderTrade;
    var optionChartTypes = _state2.optionChartTypes;
    var validationMessages = _state2.validationMessages;
    var _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load Meta',
      onClick: this._handlerLoadMeta
    }), _react2.default.createElement(_ToolBarButton2.default, {
      key: 'b',
      type: 'TypeC',
      caption: 'Load Data',
      onClick: this._handlerLoadData
    })];

    return _react2.default.createElement(
      _ZhDialog2.default,
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
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Country:',
        options: optionCountries,
        optionNames: 'Countries',
        isLoading: isLoadingCountries,
        isLoadingFailed: isLoadingCountriesFailed,
        onLoadOption: this._handlerLoadCountry,
        onSelect: this._handlerSelectCountry
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Chapter:',
        options: optionCommodities,
        optionNames: 'Chapters',
        isLoading: isLoadingCommodities,
        isLoadingFailed: isLoadingCommoditiesFailed,
        onLoadOption: this._handlerLoadChapter,
        onSelect: this._handlerSelectChapter
      }),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowFilter },
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'Filter Trade:',
          options: optionTradeFilter,
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
          options: optionChartTypes,
          onSelect: this._handlerSelectChartType
        })
      ),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = UNCommodityTradeDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\UNCommodityTradeDialog.js.map