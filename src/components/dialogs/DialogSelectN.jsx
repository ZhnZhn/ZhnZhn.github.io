//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useCallback,
  getRefValue,
  getInputValue,
  getInputValidValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useToggleClose from '../hooks/useToggleClose';
import useToggleState from '../hooks/useToggleState';
import useProperty from '../hooks/useProperty';
import useEventCallback from '../hooks/useEventCallback';
import useDialog from './hooks/useDialog';
import useDialogOptions from './hooks/useDialogOptions';
import useTitles from './hooks/useTitles';
import useChartConfig from './hooks/useChartConfig';

import { isCategoryItem } from './ChartOptionsFn';
import D from './DialogCell';
import SelectList from './SelectList';

import {
  crIsId,
  crIsToggleInit,
  getItemValue
} from './dialogFn';

const DF_INIT_FROM_DATE = '2010-01-01'
, DF_SELECT_PROPS  = []
, TABLE_ID = 'table';

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
    loadId,

    toTopLayer,
    onAbout,

    loadFn,
    onLoad,
    onShow,
    onClose,
  } = props
  , {
    dfRt
  } = dfProps || {}
  , [
    isShowFd,
    toggleIsShowFd
  ] = useToggle()
  , [
    isShowChart,
    toggleIsShowChart
  ] = useToggle(true)
  , [
    chartType,
    setChartType
  ] = useState()
  , _hSelectChartType = useCallback(chartType => {
      setChartType(chartType)
      if (isCategoryItem(chartType)) {
        toggleIsShowFd(false)
      }
  }, [toggleIsShowFd])
  , [
    setPropertyDate,
    getPropertyDate
  ] = useProperty()

  /*eslint-disable react-hooks/exhaustive-deps */
  , _onUpdateChartConfig = useCallback(() => {
     setPropertyDate()
     setChartType()
  }, [])
  // setPropertyDate
  /*eslint-enable react-hooks/exhaustive-deps */

  , [
    _chartOptions,
    dateOptions,
    dateDefault,
    setChartConfigFromItem
  ] = useChartConfig(
     selectProps,
     chartsType,
     loadId,
     dfProps,
    _onUpdateChartConfig
  )
  , [
    isToggle,
    toggleInputs,
    _hideToggle
  ] = useToggleClose()
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
    hClose
  ] = useDialog({
    onAbout,
    onClose,
    toggleInputs: isFd || selectProps.length > 1
       ? toggleInputs
       : void 0,
    toggleOptions: isOpt || isCh
       ? toggleOptions
       : void 0
  })
  , [
    _isShowConfig,
    _toggleStateBy
  ] = useToggleState(
     () => crIsToggleInit(selectProps)
  )
  , _isShowById = useCallback(
      id => _isShowConfig[crIsId(id)],
      [_isShowConfig]
    )
  , _refItems = useRef([])
  , [
    refTitles,
    addTitleIndex,
    removeTitleIndex
  ] = useTitles()
  , [
    _setPropertyRoundTo,
    _getPropertyRoundTo
  ] = useProperty(dfRt)
  , _refFromDate = useRef()
  , _refSeriaColor = useRef()

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelect = useCallback((id, index, item) => {
     getRefValue(_refItems)[index] = item
     if (item) {
       item.id = id
       if (id === TABLE_ID) {
         setChartConfigFromItem(item)
       }
     }
  }, [])
  // setChartConfigFromItem
  /*eslint-enable react-hooks/exhaustive-deps */

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
          chartType,
          isCategory: isCategoryItem(chartType),
          items: [...getRefValue(_refItems)],
          titles: getRefValue(refTitles),
          dialogOptions: getRefValue(refDialogOptions),
          fromDate: getInputValidValue(_refFromDate, ''),
          date: getItemValue(getPropertyDate()) || dateDefault,
          _rt: _getPropertyRoundTo()
        }))
      }
      setValidationMessages(msgs)
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
        dfRt={dfRt}
        onRoundTo={_setPropertyRoundTo}
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
        crIsId={crIsId}
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
          onSelectDate={setPropertyDate}
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
