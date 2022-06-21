//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useMemo,
  useCallback,
  getRefValue,
  getInputValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useToggleState from '../hooks/useToggleState';
import useProperty from '../hooks/useProperty';
import useEventCallback from '../hooks/useEventCallback';
import useDialog from './hooks/useDialog';
import useDialogOptions from './hooks/useDialogOptions';
import useTitles from './hooks/useTitles';

import {
  crChartOptions,
  isCategoryItem
} from './ChartOptionsFn';
import D from './DialogCell'
import SelectList from './SelectList'

const {
  crDateConfig
} = D
, DF_INIT_FROM_DATE = '2010-01-01'
, DF_MAP_FREQUENCY = 'EMPTY'
, DF_SELECT_PROPS  = []
, TABLE_ID = 'table';

const _crIsId = id => `is${id}Select`;

const _crIsToggleInit = (
  selectProps
) => selectProps
 .reduce((toggleConfig, item) => {
    toggleConfig[_crIsId(item.id)] = true
    return toggleConfig;
 }, {});

const _isRequireUpdateChartConfig = (
  prevState,
  mapFrequency,
  mapDateDf
) => prevState._mapFrequency !== mapFrequency
  || prevState._mapDateDf !== mapDateDf;

const _getValidValue = (
  ref,
  dfValue
) => {
  const _compInst = getRefValue(ref);
  return  _compInst && _compInst.isValid()
    ? _compInst.getValue()
    : dfValue;
};

const DialogSelectN = memoIsShow((
  props
) => {
  const {
    isCh=true,
    isShow,
    isOpt,
    isFd,
    selectProps=DF_SELECT_PROPS,
    dfProps,
    chartsType,
    msgOnNotSelected,

    caption,
    noDate,
    initFromDate=DF_INIT_FROM_DATE,
    errNotYmdOrEmpty,
    isYmdOrEmpty,

    toTopLayer,
    onClickInfo,

    loadFn,
    onLoad,
    onShow,
    onClose,
  } = props
  , {
    mapFrequency=DF_MAP_FREQUENCY,
    mapDateDf
  } = dfProps || {}
  , [
    isShowFd,
    toggleIsShowFd
  ] = useToggle(false)
  , [
    isShowChart,
    toggleIsShowChart
  ] = useToggle(true)
  , [
    chartConfig,
    setChartConfig
  ] = useState({
    _mapFrequency: mapFrequency,
    _mapDateDf: mapDateDf,
    chartType: void 0
  })
  , {
    _mapFrequency,
    _mapDateDf,
    chartType
  } = chartConfig
  , _hSelectChartType = useCallback(chartType => {
    setChartConfig(prevState => ({
      ...prevState,
      chartType
    }))
    if (isCategoryItem(chartType)) {
      toggleIsShowFd(false)
    }
  }, [toggleIsShowFd])
  , [
    isToggle,
    toggleInputs
  ] = useToggle(false)
  , _hideToggle = useCallback(() => {
    toggleInputs(false)
  }, [toggleInputs])
  , [
    refDialogOptions,
    isShowOptions,
    toggleOptions,
    hideOptions,
    toggleDialogOption
  ] = useDialogOptions()
  , [
    isToolbar,
    isShowLabels,
    menuMoreModel,
    toolbarButtons,
    validationMessages,
    setValidationMessages,
    clearValidationMessages,
    hClose
  ] = useDialog({
    onClickInfo,
    onClose,
    toggleInputs: isFd || selectProps.length > 1
       ? toggleInputs : void 0,
    toggleOptions: isOpt || isCh
       ? toggleOptions : void 0
  })
  , [
    _isShowConfig,
    _toggleStateBy
  ] = useToggleState(() => _crIsToggleInit(selectProps))
  , _isShowById = useCallback(id =>
      _isShowConfig[_crIsId(id)],
      [_isShowConfig]
    )
  , {
    _chartOptions,
    dateDefault,
    dateOptions
  } = useMemo(() => ({
    _chartOptions: crChartOptions(selectProps, chartsType, _mapFrequency)
    , ...crDateConfig(_mapFrequency, _mapDateDf)
  }), [selectProps, chartsType, _mapFrequency, _mapDateDf])
  , _refItems = useRef([])
  , [
    refTitles,
    addTitleIndex,
    removeTitleIndex
  ] = useTitles()
  , _refFromDate = useRef()
  , [
    setDate,
    getDate
  ] = useProperty()
  , _getDate = useCallback(() => (getDate() || {}).value
    || dateDefault
  , [dateDefault, getDate])
  , _refSeriaColor = useRef()
  , _hSelect = useCallback((id, index, item) => {
    getRefValue(_refItems)[index] = item
    if (item) {
      item.id = id
      if (id === TABLE_ID) {
        const _mapFrequency = item.mapFrequency
          || mapFrequency
        , _mapDateDf = item.mapDateDf
          || mapDateDf;
        setChartConfig(prevState => _isRequireUpdateChartConfig(
              prevState,
              _mapFrequency,
              _mapDateDf
            )
          ? (setDate(), {
              _mapFrequency,
              _mapDateDf,
              chartType: void 0
            })
          : prevState
        )
      }
    }
  }, [mapFrequency, mapDateDf, setDate])
  , _hLoad = useEventCallback(() => {
      const msgs = []
      , _items = getRefValue(_refItems);
      let i = isCategoryItem(chartType) ? 1 : 0;
      for(; i<selectProps.length; i++) {
        if (!_items[i]) {
          msgs.push(msgOnNotSelected(selectProps[i].caption))
        }
      }

      if (msgs.length === 0) {
        onLoad(loadFn(props, {
          // seriaColor, seriaWidth
          ...getInputValue(_refSeriaColor),
          items: [...getRefValue(_refItems)],
          titles: getRefValue(refTitles),
          dialogOptions: getRefValue(refDialogOptions),
          isCategory: isCategoryItem(chartType),
          fromDate: _getValidValue(_refFromDate, ''),
          date: _getDate(),
          chartType
        }))
        clearValidationMessages()
      } else {
        setValidationMessages(msgs)
      }
  })
  , _isCategory = isCategoryItem(chartType)
  , _isRowFd = isFd && !_isCategory
  , _isShowDate = isShowChart && _isCategory;

  return (
    <D.DraggableDialog
      isShow={isShow}
      caption={caption}
      menuModel={menuMoreModel}
      toTopLayer={toTopLayer}
      onLoad={_hLoad}
      onShow={onShow}      
      onClose={hClose}
   >
      <D.Toolbar
        isShow={isToolbar}
        buttons={toolbarButtons}
      />
      <D.ModalOptions
        isShow={isShowOptions}
        toggleOption={toggleDialogOption}
        onClose={hideOptions}
      />
      <D.ModalToggle
        isShow={isToggle}
        selectProps={selectProps}
        isFd={_isRowFd}
        isShowFd={isShowFd}
        isCh={isCh}
        isShowChart={isShowChart}
        crIsId={_crIsId}
        onToggle={_toggleStateBy}
        onCheckCaption={addTitleIndex}
        onUnCheckCaption={removeTitleIndex}
        onToggleFd={toggleIsShowFd}
        onToggleChart={toggleIsShowChart}
        onClose={_hideToggle}
      />
      <SelectList
        isShow={isShow}
        isShowLabels={isShowLabels}
        selectProps={selectProps}
        isShowById={_isShowById}
        hSelect={_hSelect}
      />
      { _isRowFd && <D.ShowHide isShow={isShowFd}>
          <D.RowDate
            innerRef={_refFromDate}
            isShowLabels={isShowLabels}
            title="From Date:"
            initialValue={initFromDate}
            errorMsg={errNotYmdOrEmpty}
            onTest={isYmdOrEmpty}
          />
        </D.ShowHide>
      }
      { isCh && <D.RowChartDate
          refSeriaColor={_refSeriaColor}
          chartType={chartType}
          isShowLabels={isShowLabels}
          isShowChart={isShowChart}
          chartOptions={_chartOptions}
          onSelectChart={_hSelectChartType}
          noDate={noDate}
          isShowDate={_isShowDate}
          dateDefault={dateDefault}
          dateOptions={dateOptions}
          onSelecDate={setDate}
        />
      }
      <D.ValidationMessages
        validationMessages={validationMessages}
      />
    </D.DraggableDialog>
  );
})

/*
DialogSelectN.propTypes = {
  isShow: PropTypes.bool,
  isOpt: PropTypes.bool,
  isCh: PropTypes.bool,
  isFd: PropTypes.bool,
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

  loadFn: PropTypes.func,
  onLoad: PropTypes.func,

  onShow: PropTypes.func,
  onFront: PropTypes.func,
  onClose: PropTypes.func,
  onClickInfo: PropTypes.func,
}
*/

export default DialogSelectN
