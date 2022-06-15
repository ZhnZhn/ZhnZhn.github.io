import {
  useState,
  useRef,
  useCallback,
  useMemo,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useRefInit from '../hooks/useRefInit';
import useProperty from '../hooks/useProperty';
import useEventCallback from '../hooks/useEventCallback';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useValidationMessages from '../dialogs/hooks/useValidationMessages';
import crValidationMessages from '../dialogs/hooks/crValidationMessages';

import {
  CHT_AREA,
  CHT_SEMI_DONUT,
  CHT_STACKED_AREA,
  CHT_STACKED_AREA_PERCENT,
  CHT_STACKED_COLUMN,
  CHT_STACKED_COLUMN_PERCENT,
  CHT_TREE_MAP
} from '../../constants/ChartType';

import D from '../dialogs/DialogCell'


const S_BT = { color: '#232f3b' }
, PLACEHOLDER_INITIAL = 'First Load Meta'
, PLACEHOLDER_SELECT = 'Select...'
, FILTER_DEFAULT = 'Default Empty'
, FILTER_IMPORT = 'Import - Trade (USD)'
, FILTER_EXPORT = 'Export - Trade (USD)'
, FILTER_REIMPORT = 'Re-Import - Trade (USD)'
, FILTER_REEXPORT = 'Re-Export - Trade (USD)'

, _crFilterItem = caption => ({
  caption,
  value: caption
})

, TRADE_FILTER_OPTIONS = [
  { caption: 'Default: Empty Filter', value: FILTER_DEFAULT },
  _crFilterItem(FILTER_IMPORT),
  _crFilterItem('Import - Weight (Kg)'),
  _crFilterItem(FILTER_EXPORT),
  _crFilterItem('Export - Weight (Kg)'),
  _crFilterItem(FILTER_REIMPORT),
  _crFilterItem(FILTER_REEXPORT)
]

const CHART_TYPE_OPTIONS = [
  { caption: 'Default: Area', value: CHT_AREA },
  { caption: 'Semi Donut: Total Top90, On Every Year: Recent 2 Years', value: CHT_SEMI_DONUT },
  { caption: 'Stacked Area: Total Top90, On Recent Year', value: CHT_STACKED_AREA },
  { caption: 'Stacked Area Percent: Total Top90, On Recent Year', value: CHT_STACKED_AREA_PERCENT },
  { caption: 'Stacked Column: Total Top90, On Recent Year', value: CHT_STACKED_COLUMN },
  { caption: 'Stacked Column Percent: Total Top90, On Recent Year', value: CHT_STACKED_COLUMN_PERCENT },
  { caption: 'Tree Map: On Recent Year', value: CHT_TREE_MAP }
]

const _fFilterBy = filterValue =>
  item => item.caption.indexOf(filterValue) !== -1;

const _filterTrade = (
  tradeFilter,
  optionTrades
) => {
  let options;
  if (tradeFilter && optionTrades){
    const filterValue = tradeFilter.value;
    if (filterValue !== FILTER_DEFAULT){
      options = optionTrades.filter(_fFilterBy(filterValue))
      if (filterValue === FILTER_IMPORT){
         options = options.filter(_fFilterBy(FILTER_REIMPORT))
      }
      if (filterValue === FILTER_EXPORT){
         options = options.filter(_fFilterBy(FILTER_REEXPORT))
      }
    }
  }
  return options || optionTrades;
};

const _crSliceItems = (
  tradeFilter,
  optionTrades
) => {
   const _filterLength = tradeFilter.value.length + 2;
   return optionTrades.map(({value, caption}) => {
      caption = caption.substring(0, (caption.length - _filterLength));
      return {
        caption,
        value
      };
  });
};

const _isNotCategoryChart = chartType =>
 !chartType || chartType.value === CHT_AREA

const CLICK_TO_TOGGLE = 'Click to toggle';

const _crToolbarItem = (
  caption,
  title,
  onClick
) => ({
  caption,
  title,
  onClick
});

const INITIAL_STATE = {
  optionTrades: [],
  placeholderTrade: PLACEHOLDER_INITIAL,
  isLoadingTradeFailed: false,
  isLoadingTrade: false
};


const UNCommodityTradeDialog = memoIsShow((
  props
) => {
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

    fnValue,
    onLoad,

    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props
  , [
    isToolbar,
    _menuMore
  ] = useMenuMore(onClickInfo)
  , [isShowLabels, toggleLabels] = useToggle(true)
  , [isShowFilter, toggleFilter] = useToggle(false)
  , [isShowDate, toggleDate] = useToggle(false)
  , [isShowChartType, toggleChartType] = useToggle(false)
  , _toolbarButtons = useRefInit(() => [
    _crToolbarItem('L', `${CLICK_TO_TOGGLE} input labels`, toggleLabels),
    _crToolbarItem('F', `${CLICK_TO_TOGGLE} filter input`, toggleFilter),
    _crToolbarItem('D', `${CLICK_TO_TOGGLE} date input`, toggleDate),
    _crToolbarItem('C', `${CLICK_TO_TOGGLE} chart type input`, toggleChartType),
    _crToolbarItem('A', 'About datasource', onClickInfo)
  ])
  , [
    validationMessages,
    setValidationMessages,
    clearValidationMessages,
  ] = useValidationMessages()
  , [state, setState] = useState(INITIAL_STATE)
  , {
    isLoadingTrade,
    isLoadingTradeFailed,
    optionTrades,
    placeholderTrade,
  } = state
  , [isShowSubheading, setIsShowSubheading] = useState(true)
  , _refDates = useRef()
  , [setCountry, getCountry] = useProperty()
  , [setChapter, getChapter] = useProperty()
  , [setTradeFilter, getTradeFilter] = useProperty()
  , [setSubheading, getSubheading] = useProperty()
  , [setOptionTrades, getOptionTrades] = useProperty()
  , [setChartType, getChartType] = useProperty()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _initTrade = useCallback(() => {
    setSubheading()
    setOptionTrades()
    setState(INITIAL_STATE)
  }, [])
  // setSubheading, setOptionTrades
  , _hSelectCountry = useCallback((country) => {
    setCountry(country)
    _initTrade()
  }, [])
  // setCountry, _initTrade
  , _hSelectChapter = useCallback((chapter) => {
    setChapter(chapter)
    _initTrade()
  }, [])
  // setChapter, _initTrade
  , _hSelectChartType = useCallback(chartType => {
    setChartType(chartType)
    const _is = _isNotCategoryChart(chartType);
    setIsShowSubheading(_is)
    toggleFilter(!_is)
  }, [])
  // setChartType, toggleFilter
  , _hLoadMeta = useCallback(() => {
    const country = getCountry()
    , chapter = getChapter()
    , _configs = [
      [country, 'Country'],
      [chapter, 'Chapter']
    ]
    , msgs = crValidationMessages(_configs, msgOnNotSelected, _refDates)

    if (msgs.length === 0){
      onLoad({
        ...getRefValue(_refDates).getValues(),
        loadId,
        isLoadMeta: true,
        value: fnValue(chapter.value, country.value),
        onLoad: (optionTrades) => {
          setOptionTrades(optionTrades)
          setState({
            optionTrades: _filterTrade(
              getTradeFilter(),
              getOptionTrades()
            ),
            isLoadingTrade: false,
            isLoadingTradeFailed: false,
            placeholderTrade: PLACEHOLDER_SELECT
          })
        },
        onCancel: () => setState(prevState => ({
          ...prevState,
          isLoadingTrade: false,
          isLoadingTradeFailed: false,
          placeholderTrade: PLACEHOLDER_SELECT
        })),
        onFailed: () => setState(prevState => ({
          ...prevState,
          isLoadingTrade: false,
          isLoadingTradeFailed: true
        }))
      })

      setState(prevState => ({
        ...prevState,
        isLoadingTrade: true
      }))
      clearValidationMessages()
    } else {
      setValidationMessages(msgs)
    }
  }, [])
  // onLoad, fnValue, loadId, msgOnNotSelected,
  // getChapter, getCountry, getOptionTrades, getTradeFilter,
  // clearValidationMessages, setValidationMessages
  , _hLoadData = useEventCallback(() => {
    const msgs = []
    , chartType = getChartType()
    , subheading = getSubheading()
    , tradeFilter = getTradeFilter();

    if (_isNotCategoryChart(chartType)) {
      if (!subheading)  {
        msgs.push(msgOnNotSelected('Subheading'));
      }
    } else {
      if (placeholderTrade === PLACEHOLDER_INITIAL){
        msgs.push(PLACEHOLDER_INITIAL);
      }
      if (!tradeFilter) {
        msgs.push(msgOnNotSelected('Trade Filter'));
      }
    }

    if (msgs.length === 0) {
      const country = getCountry()
      , chapter = getChapter()
      , _dataColumn = subheading
         ? subheading.value
         : dataColumn
      , _chartType = chartType
         ? chartType.value
         : CHT_AREA
      , title = tradeFilter
         ? `${country.caption}:${tradeFilter.caption}`
         : `${country.caption}`
      , sliceItems = _isNotCategoryChart(chartType)
         ? void 0
         : _crSliceItems(tradeFilter, optionTrades);
        onLoad({
          ...getRefValue(_refDates).getValues(),
          value: fnValue(chapter.value, country.value),
          dataColumn: _dataColumn,
          seriaType: _chartType,
          sliceItems,
          title,
          subtitle: chapter.caption,
          loadId,
          dataSource
        })
      clearValidationMessages()
    } else {
      setValidationMessages(msgs)
    }
  })
  , _commandButtons = useMemo(() => [
    <D.Button.Flat
      key="meta"
      style={S_BT}
      caption="Load Meta"
      title="First Load Meta, then Load Item"
      onClick={_hLoadMeta}
    />,
    <D.Button.Load
       key="load"
       onClick={_hLoadData}
     />
  ], [])
  // _hLoadMeta, _hLoadData
  , _hClose = useCallback(() => {
    onClose()
    clearValidationMessages()
  }, [])
  // onClose, clearValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <D.DraggableDialog
      isShow={isShow}
      caption="United Nations Commodity Trade"
      menuModel={_menuMore}
      commandButtons={_commandButtons}
      onShowChart={onShow}
      onFront={onFront}
      onClose={_hClose}
   >
      <D.Toolbar
        isShow={isToolbar}
        buttons={_toolbarButtons}
      />
      <D.SelectWithLoad
        isShow={isShow}
        isShowLabels={isShowLabels}
        uri={countryURI}
        jsonProp={countryJsonProp}
        caption="Country:"
        optionNames="Countries"
        onSelect={_hSelectCountry}
      />
      <D.SelectWithLoad
        isShow={isShow}
        isShowLabels={isShowLabels}
        uri={commodityURI}
        jsonProp={commodityJsonProp}
        caption="Chapter:"
        optionNames="Chapters"
        onSelect={_hSelectChapter}
      />
      <D.ShowHide isShow={isShowFilter}>
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Filter Trade:"
          options={TRADE_FILTER_OPTIONS}
          placeholder="Filter..."
          onSelect={setTradeFilter}
        />
      </D.ShowHide>
      <D.ShowHide isShow={isShowSubheading}>
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Subheading:"
          options={optionTrades}
          optionNames="Meta"
          isLoading={isLoadingTrade}
          isLoadingFailed={isLoadingTradeFailed}
          placeholder={placeholderTrade}
          onLoadOption={_hLoadMeta}
          onSelect={setSubheading}
        />
      </D.ShowHide>
      <D.ShowHide isShow={isShowDate}>
        <D.DatesFragment
          ref={_refDates}
          isShowLabels={isShowLabels}
          initFromDate={initFromDate}
          initToDate={initToDate}
          msgOnNotValidFormat={msgOnNotValidFormat}
          onTestDate={onTestDate}
        />
      </D.ShowHide>
      <D.ShowHide isShow={isShowChartType}>
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Chart Type:"
          options={CHART_TYPE_OPTIONS}
          onSelect={_hSelectChartType}
        />
      </D.ShowHide>
      <D.ValidationMessages
         validationMessages={validationMessages}
      />
    </D.DraggableDialog>
  )
})

export default UNCommodityTradeDialog
