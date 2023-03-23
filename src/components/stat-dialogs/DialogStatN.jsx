import {
  useRef,
  useCallback,
  getRefValue,
  getInputValue
} from '../uiApi';

import { isWideWidth } from '../has';
import { isCategoryItem } from '../dialogs/ChartOptionsFn';

import ItemStack from '../zhn/ItemStack';
import D from '../dialogs/DialogCell';
import Spinner from './Spinner';
import crSelectItem from './crSelectItem';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';
import useDialogOptions from '../dialogs/hooks/useDialogOptions';
import useRefByIndex from './useRefByIndex';
import useModalToggle from './useModalToggle';
import useLoadDims from './useLoadDims';

import updateStateIf from './updateStateIf'
import crSpinnerStatus from './crSpinnerStatus';

import { GEO_ENTITY } from './dimensions/EsConfig';

const MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again."
, MSG_DIMS_LOADING = "Dims is loading"
, S_DIV_LOADING = { height: 50, width: '100%' };

const IS_SHOW_LABELS = isWideWidth();

const _crDfC = (props, dim) => props.dfC
  || (dim || {}).value;

const _crDfTitle = (props, dim) => {
  if (props.dfC || !dim) { return ""; }
  return dim.caption || "";
};

const _fAddErrMsgTo = (
  msg,
  msgOnNotSelected,
  configs,
  items
) => is => {
  configs.forEach((config, index) => {
    const { caption } = config;
    if (is(caption) && !items[index]){
      msg.push(msgOnNotSelected(caption))
    }
  })
};

const _addDfValuesFrom = (
  configs,
  fSelectItem
) => {
  configs.forEach((config, index) => {
    const { dfItem } = config;
    if (dfItem) {
      fSelectItem(index)(dfItem)
    }
  })
};

const DialogStatN = memoIsShow((props) => {
  const {
    isShow,
    caption,

    //dims,
    //chartsType,
    //mapFrequency:initialMf,
    //mapDateDf,

    dfProps,

    msgOnNotSelected,


    toTopLayer,
    onAbout,

    loadFn,
    onLoad,
    onShow,
    onClose
  } = props
  , {
    dfRt
  } = dfProps || {};
  const _isDim = !props.dims && !props.notDim
  , [
    _refItems,
    _fSelectItem
  ] = useRefByIndex()
  , _refSeriaColor = useRef()
  , [
    setDate,
    getDate
  ] = useProperty()
  , [
    setDim,
    getDim
  ] = useProperty()
  , [
    _setRoundTo,
    _getRoundTo
  ] = useProperty(dfRt)
  , [
      state,
      isLoading,
      isLoadFailed,
      validationMessages,
      setValidationMessages,
      setState
  ] = useLoadDims(props)
  , {
      configs,
      selectOptions,
      chartType,
      chartOptions,
      dimOptions,
      dateOptions,
      dateDf={},
      timeId,
   } = state
  , [
    isShowLabels,
    toggleLabels
  ] = useToggle(IS_SHOW_LABELS)
  , [
    _modalToggleEl,
    _refTitles,
    isRow,
    toggleIsRow,
    toggleInputs
  ] = useModalToggle(configs)
  , {
    isShowDate,
    isShowChart
  } = isRow
  , [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onAbout)
  , [
    refDialogOptions,
    isShowOptions,
    toggleOptions,
    hideOptions,
    toggleDialogOption
  ] = useDialogOptions()
  , toolbarButtons = useToolbar({
     toggleLabels,
     toggleInputs,
     toggleOptions,
     onAbout
  })
   /*eslint-disable react-hooks/exhaustive-deps */
   , _hClose = useCallback(() => {
     onClose()
     setValidationMessages([])
   }, [])
   //onClose
   , _crValidationMessages = useCallback(() => {
        const msg = [];
        if (isLoadFailed) {
          msg.push(MSG_DIMS_NOT_LOADED)
          return msg;
        }
        if (isLoading) {
          msg.push(MSG_DIMS_LOADING)
          return msg;
        }

        const _isCategory = isCategoryItem(chartType)
        , { dim } = chartType || {}
        , _addErrMsgTo = _fAddErrMsgTo(msg, msgOnNotSelected, configs, getRefValue(_refItems));

        //For dims case and not category case
        if (!_isDim || !_isCategory) {
          const _filterCaption = props.notDim
            ? GEO_ENTITY
            : dim;
          _addErrMsgTo(caption => !(_isCategory && caption === _filterCaption))
          return msg;
        }
        //For category case
        if (_isCategory) {
          const _dimItem = getDim();
          if (!_dimItem) {
            msg.push("Dim isn't selected")
            return msg;
          }
          _addErrMsgTo(caption => caption !== _dimItem.caption)
        }
        return msg;
   }, [isLoadFailed, isLoading, configs, chartType, msgOnNotSelected])
   //getDim, _isDim
   , _hSelectChartType = useCallback(chartType => {
       toggleIsRow({
         isShowDate: isCategoryItem(chartType)
       })
       updateStateIf(setState, 'chartType', chartType)
   }, [])
   // toggleInputs, setState
   /*eslint-enable react-hooks/exhaustive-deps */
   /*eslint-disable react-hooks/exhaustive-deps */
   , _hLoad = useCallback(() => {
     _addDfValuesFrom(configs, _fSelectItem)
     const validationMessages = _crValidationMessages();
     if (validationMessages.length === 0){
       const _dimItem = getDim();
       onLoad(loadFn(
         {...props}, {
         //seriaColor, seriaWidth
         ...getInputValue(_refSeriaColor),
         chartType,
         timeId,
         selectOptions,
         isCategory: isCategoryItem(chartType),
         dfC: _crDfC(props, _dimItem),
         dfTitle: _crDfTitle(props, _dimItem),
         time: (getDate() || dateDf).value,
         dialogOptions: getRefValue(refDialogOptions),
         items: getRefValue(_refItems),
         titles: getRefValue(_refTitles),
         _rt: _getRoundTo()
      }))
    }
    setValidationMessages(validationMessages)
  }, [
    _crValidationMessages,
    dateDf,
    timeId,
    chartType,
    configs,
    selectOptions
  ])
  //loadFn, onLoad, props
  /*eslint-enable react-hooks/exhaustive-deps */
  , _spinnerStatus = crSpinnerStatus(isLoading, isLoadFailed);

  return (
    <D.DraggableDialog
       isShow={isShow}
       caption={caption}
       menuModel={menuMoreModel}
       toTopLayer={toTopLayer}
       onLoad={_hLoad}
       onShow={onShow}
       onClose={_hClose}
    >
       <D.Toolbar
         isShow={isToolbar}
         buttons={toolbarButtons}
       />
       <D.ModalOptions
         isShow={isShowOptions}
         dfRt={dfRt}
         onRoundTo={_setRoundTo}
         toggleOption={toggleDialogOption}
         onClose={hideOptions}
       />
       {_modalToggleEl}
       <Spinner status={_spinnerStatus} />
       {
         _spinnerStatus
           ? <div style={S_DIV_LOADING} />
           : <ItemStack
                items={configs}
                crItem={crSelectItem}
                isShowLabels={isShowLabels}
                isRow={isRow}
                fSelect={_fSelectItem}
             />
       }
       <D.RowChartDate
         refSeriaColor={_refSeriaColor}
         chartType={chartType}
         isShowLabels={isShowLabels}
         isShowChart={isShowChart}
         chartOptions={chartOptions}
         onSelectChart={_hSelectChartType}
         isShowDate={isShowDate}
         dateDefault={dateDf.caption}
         dateOptions={dateOptions}
         onSelectDate={setDate}
         isDim={_isDim}
         dimOptions={dimOptions}
         onSelectDim={setDim}
       />
       <D.ValidationMessages
           validationMessages={validationMessages}
       />
    </D.DraggableDialog>
  );
})

export default DialogStatN
