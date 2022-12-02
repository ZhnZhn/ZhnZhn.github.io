"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));

var _useMenuMore = _interopRequireDefault(require("../dialogs/hooks/useMenuMore"));

var _crToolbarItem = _interopRequireDefault(require("../dialogs/hooks/crToolbarItem"));

var _useValidationMessages = _interopRequireDefault(require("../dialogs/hooks/useValidationMessages"));

var _crValidationMessages = _interopRequireDefault(require("../dialogs/hooks/crValidationMessages"));

var _ChartType = require("../../constants/ChartType");

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _Buttons = require("../dialogs/Buttons");

var _jsxRuntime = require("react/jsx-runtime");

const S_BT = {
  color: '#232f3b'
},
      PLACEHOLDER_INITIAL = 'First Load Meta',
      PLACEHOLDER_SELECT = 'Select...',
      FILTER_DEFAULT = 'Default Empty',
      FILTER_IMPORT = 'Import - Trade (USD)',
      FILTER_EXPORT = 'Export - Trade (USD)',
      FILTER_REIMPORT = 'Re-Import - Trade (USD)',
      FILTER_REEXPORT = 'Re-Export - Trade (USD)',
      _crFilterItem = caption => ({
  caption,
  value: caption
}),
      TRADE_FILTER_OPTIONS = [{
  caption: 'Default: Empty Filter',
  value: FILTER_DEFAULT
}, _crFilterItem(FILTER_IMPORT), _crFilterItem('Import - Weight (Kg)'), _crFilterItem(FILTER_EXPORT), _crFilterItem('Export - Weight (Kg)'), _crFilterItem(FILTER_REIMPORT), _crFilterItem(FILTER_REEXPORT)];

const CHART_TYPE_OPTIONS = [{
  caption: 'Default: Area',
  value: _ChartType.CHT_AREA
}, {
  caption: 'Semi Donut: Total Top90, On Every Year: Recent 2 Years',
  value: _ChartType.CHT_SEMI_DONUT
}, {
  caption: 'Stacked Area: Total Top90, On Recent Year',
  value: _ChartType.CHT_STACKED_AREA
}, {
  caption: 'Stacked Area Percent: Total Top90, On Recent Year',
  value: _ChartType.CHT_STACKED_AREA_PERCENT
}, {
  caption: 'Stacked Column: Total Top90, On Recent Year',
  value: _ChartType.CHT_STACKED_COLUMN
}, {
  caption: 'Stacked Column Percent: Total Top90, On Recent Year',
  value: _ChartType.CHT_STACKED_COLUMN_PERCENT
}, {
  caption: 'Tree Map: On Recent Year',
  value: _ChartType.CHT_TREE_MAP
}];

const _fFilterBy = filterValue => item => item.caption.indexOf(filterValue) !== -1;

const _filterTrade = (tradeFilter, optionTrades) => {
  let options;

  if (tradeFilter && optionTrades) {
    const filterValue = tradeFilter.value;

    if (filterValue !== FILTER_DEFAULT) {
      options = optionTrades.filter(_fFilterBy(filterValue));

      if (filterValue === FILTER_IMPORT) {
        options = options.filter(_fFilterBy(FILTER_REIMPORT));
      }

      if (filterValue === FILTER_EXPORT) {
        options = options.filter(_fFilterBy(FILTER_REEXPORT));
      }
    }
  }

  return options || optionTrades;
};

const _crSliceItems = (tradeFilter, optionTrades) => {
  const _filterLength = tradeFilter.value.length + 2;

  return optionTrades.map(_ref => {
    let {
      value,
      caption
    } = _ref;
    caption = caption.substring(0, caption.length - _filterLength);
    return {
      caption,
      value
    };
  });
};

const _isNotCategoryChart = chartType => !chartType || chartType.value === _ChartType.CHT_AREA;

const CLICK_TO_TOGGLE = 'Click to toggle';
const INITIAL_STATE = {
  optionTrades: [],
  placeholderTrade: PLACEHOLDER_INITIAL,
  isLoadingTradeFailed: false,
  isLoadingTrade: false
};
const UNCommodityTradeDialog = (0, _memoIsShow.default)(props => {
  const {
    isShow,
    countryURI,
    countryJsonProp,
    commodityURI,
    commodityJsonProp,
    initFromDate,
    initToDate,
    onTestDate,
    msgOnNotValidFormat,
    msgOnNotSelected,
    dataColumn,
    loadId,
    dataSource,
    toTopLayer,
    onAbout,
    fnValue,
    onLoad,
    onShow,
    onClose
  } = props,
        [isToolbar, _menuMore] = (0, _useMenuMore.default)(onAbout),
        [isShowLabels, toggleLabels] = (0, _useToggle.default)(true),
        [isShowFilter, toggleFilter] = (0, _useToggle.default)(false),
        [isShowDate, toggleDate] = (0, _useToggle.default)(false),
        [isShowChartType, toggleChartType] = (0, _useToggle.default)(false),
        _toolbarButtons = (0, _useRefInit.default)(() => [(0, _crToolbarItem.default)('L', CLICK_TO_TOGGLE + " input labels", toggleLabels), (0, _crToolbarItem.default)('F', CLICK_TO_TOGGLE + " filter input", toggleFilter), (0, _crToolbarItem.default)('D', CLICK_TO_TOGGLE + " date input", toggleDate), (0, _crToolbarItem.default)('C', CLICK_TO_TOGGLE + " chart type input", toggleChartType), (0, _crToolbarItem.default)('A', 'About datasource', onAbout)]),
        [validationMessages, setValidationMessages, clearValidationMessages] = (0, _useValidationMessages.default)(),
        [state, setState] = (0, _uiApi.useState)(INITIAL_STATE),
        {
    isLoadingTrade,
    isLoadingTradeFailed,
    optionTrades,
    placeholderTrade
  } = state,
        [isShowSubheading, setIsShowSubheading] = (0, _uiApi.useState)(true),
        _refDates = (0, _uiApi.useRef)(),
        [setCountry, getCountry] = (0, _useProperty.default)(),
        [setChapter, getChapter] = (0, _useProperty.default)(),
        [setTradeFilter, getTradeFilter] = (0, _useProperty.default)(),
        [setSubheading, getSubheading] = (0, _useProperty.default)(),
        [setOptionTrades, getOptionTrades] = (0, _useProperty.default)(),
        [setChartType, getChartType] = (0, _useProperty.default)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _initTrade = (0, _uiApi.useCallback)(() => {
    setSubheading();
    setOptionTrades();
    setState(INITIAL_STATE);
  }, []) // setSubheading, setOptionTrades
  ,
        _hSelectCountry = (0, _uiApi.useCallback)(country => {
    setCountry(country);

    _initTrade();
  }, []) // setCountry, _initTrade
  ,
        _hSelectChapter = (0, _uiApi.useCallback)(chapter => {
    setChapter(chapter);

    _initTrade();
  }, []) // setChapter, _initTrade
  ,
        _hSelectChartType = (0, _uiApi.useCallback)(chartType => {
    setChartType(chartType);

    const _is = _isNotCategoryChart(chartType);

    setIsShowSubheading(_is);
    toggleFilter(!_is);
  }, []) // setChartType, toggleFilter
  ,
        _hLoadMeta = (0, _uiApi.useCallback)(() => {
    const country = getCountry(),
          chapter = getChapter(),
          _configs = [[country, 'Country'], [chapter, 'Chapter']],
          msgs = (0, _crValidationMessages.default)(_configs, msgOnNotSelected, _refDates);

    if (msgs.length === 0) {
      onLoad({ ...(0, _uiApi.getRefValue)(_refDates).getValues(),
        loadId,
        isLoadMeta: true,
        value: fnValue(chapter.value, country.value),
        onLoad: optionTrades => {
          setOptionTrades(optionTrades);
          setState({
            optionTrades: _filterTrade(getTradeFilter(), getOptionTrades()),
            isLoadingTrade: false,
            isLoadingTradeFailed: false,
            placeholderTrade: PLACEHOLDER_SELECT
          });
        },
        onCancel: () => setState(prevState => ({ ...prevState,
          isLoadingTrade: false,
          isLoadingTradeFailed: false,
          placeholderTrade: PLACEHOLDER_SELECT
        })),
        onFailed: () => setState(prevState => ({ ...prevState,
          isLoadingTrade: false,
          isLoadingTradeFailed: true
        }))
      });
      setState(prevState => ({ ...prevState,
        isLoadingTrade: true
      }));
      clearValidationMessages();
    } else {
      setValidationMessages(msgs);
    }
  }, []) // onLoad, fnValue, loadId, msgOnNotSelected,
  // getChapter, getCountry, getOptionTrades, getTradeFilter,
  // clearValidationMessages, setValidationMessages
  ,
        _hLoadData = (0, _useEventCallback.default)(() => {
    const msgs = [],
          chartType = getChartType(),
          subheading = getSubheading(),
          tradeFilter = getTradeFilter();

    if (_isNotCategoryChart(chartType)) {
      if (!subheading) {
        msgs.push(msgOnNotSelected('Subheading'));
      }
    } else {
      if (placeholderTrade === PLACEHOLDER_INITIAL) {
        msgs.push(PLACEHOLDER_INITIAL);
      }

      if (!tradeFilter) {
        msgs.push(msgOnNotSelected('Trade Filter'));
      }
    }

    if (msgs.length === 0) {
      const country = getCountry(),
            chapter = getChapter(),
            _dataColumn = subheading ? subheading.value : dataColumn,
            _chartType = chartType ? chartType.value : _ChartType.CHT_AREA,
            title = tradeFilter ? country.caption + ":" + tradeFilter.caption : "" + country.caption,
            sliceItems = _isNotCategoryChart(chartType) ? void 0 : _crSliceItems(tradeFilter, optionTrades);

      onLoad({ ...(0, _uiApi.getRefValue)(_refDates).getValues(),
        value: fnValue(chapter.value, country.value),
        dataColumn: _dataColumn,
        seriaType: _chartType,
        sliceItems,
        title,
        subtitle: chapter.caption,
        loadId,
        dataSource
      });
      clearValidationMessages();
    } else {
      setValidationMessages(msgs);
    }
  }),
        _commandButtons = (0, _uiApi.useMemo)(() => [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: S_BT,
    caption: "Load Meta",
    title: "First Load Meta, then Load Item",
    onClick: _hLoadMeta
  }, "meta"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Buttons.ButtonLoad, {
    onClick: _hLoadData
  }, "load")], []) // _hLoadMeta, _hLoadData
  ,
        _hClose = (0, _uiApi.useCallback)(() => {
    onClose();
    clearValidationMessages();
  }, []); // onClose, clearValidationMessages

  /*eslint-enable react-hooks/exhaustive-deps */


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: "United Nations Commodity Trade",
    menuModel: _menuMore,
    commandButtons: _commandButtons,
    toTopLayer: toTopLayer,
    onShow: onShow,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: countryURI,
      jsonProp: countryJsonProp,
      caption: "Country:",
      optionNames: "Countries",
      onSelect: _hSelectCountry
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: commodityURI,
      jsonProp: commodityJsonProp,
      caption: "Chapter:",
      optionNames: "Chapters",
      onSelect: _hSelectChapter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowFilter,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Filter Trade:",
        options: TRADE_FILTER_OPTIONS,
        placeholder: "Filter...",
        onSelect: setTradeFilter
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowSubheading,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Subheading:",
        options: optionTrades,
        optionNames: "Meta",
        isLoading: isLoadingTrade,
        isLoadingFailed: isLoadingTradeFailed,
        placeholder: placeholderTrade,
        onLoadOption: _hLoadMeta,
        onSelect: setSubheading
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
        ref: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowChartType,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Chart Type:",
        options: CHART_TYPE_OPTIONS,
        onSelect: _hSelectChartType
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = UNCommodityTradeDialog;
exports.default = _default;
//# sourceMappingURL=UNCommodityTradeDialog.js.map