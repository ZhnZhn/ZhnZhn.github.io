"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Type = require("../../constants/Type");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _MenuMore = _interopRequireDefault(require("../dialogs/MenuMore"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _dec, _dec2, _dec3, _class, _temp;

var S = {
  BT_ROOT: {
    color: 'rgb(35, 47, 59)'
  }
};
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
var TRADE_FILTER_OPTIONS = [{
  caption: 'Default : Empty Filter',
  value: Filter.DEFAULT
}, {
  caption: 'Import - Trade (USD)',
  value: 'Import - Trade (USD)'
}, {
  caption: 'Import - Weight (Kg)',
  value: 'Import - Weight (Kg)'
}, {
  caption: 'Export - Trade (USD)',
  value: 'Export - Trade (USD)'
}, {
  caption: 'Export - Weight (Kg)',
  value: 'Export - Weight (Kg)'
}, {
  caption: 'Re-Import - Trade (USD)',
  value: 'Re-Import - Trade (USD)'
}, {
  caption: 'Re-Export - Trade (USD)',
  value: 'Re-Export - Trade (USD)'
}];
var CHART_TYPE_OPTIONS = [{
  caption: 'Default : Area',
  value: _Type.ChartType.AREA
}, {
  caption: 'Semi Donut : Total Top90, On Every Year : Recent 2 Years',
  value: _Type.ChartType.SEMI_DONUT
}, {
  caption: 'Stacked Area : Total Top90, On Recent Year',
  value: _Type.ChartType.STACKED_AREA
}, {
  caption: 'Stacked Area Percent : Total Top90, On Recent Year',
  value: _Type.ChartType.STACKED_AREA_PERCENT
}, {
  caption: 'Stacked Column : Total Top90, On Recent Year',
  value: _Type.ChartType.STACKED_COLUMN
}, {
  caption: 'Stacked Column Percent : Total Top90, On Recent Year',
  value: _Type.ChartType.STACKED_COLUMN_PERCENT
}, {
  caption: 'Tree Map : On Recent Year',
  value: _Type.ChartType.TREE_MAP
}];
var UNCommodityTradeDialog = (_dec = _Decorators["default"].withToolbar, _dec2 = _Decorators["default"].withValidationLoad, _dec3 = _Decorators["default"].withInitialState, _dec(_class = _dec2(_class = _dec3(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(UNCommodityTradeDialog, _Component);

  function UNCommodityTradeDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.country = null
    //this.chapter = null
    //this.tradeFilter = null
    //this.subheading = null
    //this.optionTrades = null
    //this.chartType = null

    _this._initTrade = function () {
      _this.subheading = void 0;
      _this.optionTrades = void 0;

      _this.setState({
        optionTrades: [],
        placeholderTrade: Placeholder.TRADE.INIT,
        isLoadingTradeFailed: false
      });
    };

    _this._filterTrade = function () {
      var options;

      if (_this.tradeFilter && _this.optionTrades) {
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
      } else {
        options = _this.optionTrades;
      }

      return options;
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
      _this.setState({
        isShowFilter: !_this.state.isShowFilter
      });
    };

    _this._handlerClickDate = function () {
      _this.setState({
        isShowDate: !_this.state.isShowDate
      });
    };

    _this._handlerClickChartType = function () {
      _this.setState({
        isShowChartType: !_this.state.isShowChartType
      });
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

      _this.setState({
        optionTrades: _this._filterTrade()
      });
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

      _this.setState({
        isLoadingTrade: true
      });
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
      _this.setState({
        isLoadingTrade: false,
        isLoadingTradeFailed: true
      });
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
          _title = _this.tradeFilter ? _this.country.caption + ":" + _this.tradeFilter.caption : "" + _this.country.caption,
          _sliceItems = !(!_this.chartType || _this.chartType.value === _Type.ChartType.AREA) ? _this._createSpliceItems() : void 0;

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
        return {
          caption: caption,
          value: value
        };
      });
    };

    _this._handlerClose = function () {
      _this._handleWithValidationClose();
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true
    });

    _this.toolbarButtons.push({
      caption: 'A',
      title: 'Toggle All Input',
      onClick: _this._handlerClickAll
    }, {
      caption: 'F',
      title: 'Toggle Filter Input',
      onClick: _this._handlerClickFilter
    }, {
      caption: 'D',
      title: 'Toggle Date Input',
      onClick: _this._handlerClickDate
    }, {
      caption: 'C',
      title: 'Toggle ChartType Input',
      onClick: _this._handlerClickChartType
    });

    _this._commandButtons = [_react["default"].createElement(_DialogCell["default"].Button.Flat, {
      key: "meta",
      rootStyle: S.BT_ROOT,
      caption: "Load Meta",
      title: "First Load Meta, then Load Item",
      onClick: _this._handlerLoadMeta
    }), _react["default"].createElement(_DialogCell["default"].Button.Load, {
      key: "load",
      onClick: _this._handlerLoadData
    })];
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowFilter: false,
      isShowChartType: false,
      isLoadingTrade: false,
      isLoadingTradeFailed: false,
      optionTrades: [],
      placeholderTrade: Placeholder.TRADE.INIT
    });
    return _this;
  }

  var _proto = UNCommodityTradeDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        isShow = _this$props3.isShow,
        onShow = _this$props3.onShow,
        onFront = _this$props3.onFront,
        countryURI = _this$props3.countryURI,
        countryJsonProp = _this$props3.countryJsonProp,
        commodityURI = _this$props3.commodityURI,
        commodityJsonProp = _this$props3.commodityJsonProp,
        initFromDate = _this$props3.initFromDate,
        initToDate = _this$props3.initToDate,
        msgOnNotValidFormat = _this$props3.msgOnNotValidFormat,
        onTestDate = _this$props3.onTestDate,
        _this$state2 = this.state,
        isToolbar = _this$state2.isToolbar,
        isShowLabels = _this$state2.isShowLabels,
        isShowFilter = _this$state2.isShowFilter,
        isShowDate = _this$state2.isShowDate,
        isShowChartType = _this$state2.isShowChartType,
        isLoadingTrade = _this$state2.isLoadingTrade,
        isLoadingTradeFailed = _this$state2.isLoadingTradeFailed,
        optionTrades = _this$state2.optionTrades,
        placeholderTrade = _this$state2.placeholderTrade,
        validationMessages = _this$state2.validationMessages;
    return _react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: "United Nations Commodity Trade",
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handlerClose
    }, _react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: countryURI,
      jsonProp: countryJsonProp,
      caption: "Country:",
      optionNames: "Countries",
      onSelect: this._handlerSelectCountry
    }), _react["default"].createElement(_DialogCell["default"].SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: commodityURI,
      jsonProp: commodityJsonProp,
      caption: "Chapter:",
      optionNames: "Chapters",
      onSelect: this._handlerSelectChapter
    }), _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowFilter
    }, _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Filter Trade:",
      options: TRADE_FILTER_OPTIONS,
      placeholder: "Filter...",
      onSelect: this._handlerSelectTradeFilter
    })), _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Subheading:",
      options: optionTrades,
      optionNames: "Meta",
      isLoading: isLoadingTrade,
      isLoadingFailed: isLoadingTradeFailed,
      placeholder: placeholderTrade,
      onLoadOption: this._handlerLoadMeta,
      onSelect: this._handlerSelectTrade
    }), _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, _react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: this._refDates,
      isShowLabels: isShowLabels,
      initFromDate: initFromDate,
      initToDate: initToDate,
      msgOnNotValidFormat: msgOnNotValidFormat,
      onTestDate: onTestDate
    })), _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowChartType
    }, _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Chart Type:",
      options: CHART_TYPE_OPTIONS,
      onSelect: this._handlerSelectChartType
    })), _react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return UNCommodityTradeDialog;
}(_react.Component), _temp)) || _class) || _class) || _class);
var _default = UNCommodityTradeDialog;
exports["default"] = _default;
//# sourceMappingURL=UNCommodityTradeDialog.js.map