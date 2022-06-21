import {
  useRef,
  useCallback,
  getRefValue,
  getInputValue
} from '../uiApi';

import has from '../has';
import { isCategoryItem } from '../dialogs/ChartOptionsFn';

import ItemStack from '../zhn/ItemStack';
import D from '../dialogs/DialogCell';
import Spinner from './Spinner';
import crSelectItem from './crSelectItem';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useRefByIndex from './useRefByIndex';
import useToolbar from './useToolbar';
import useMenuMore from './useMenuMore';
import useModalOptions from './useModalOptions';
import useModalToggle from './useModalToggle';
import useLoadDims from './useLoadDims';
import useCommandButtons from './useCommandButtons';

import updateStateIf from './updateStateIf'
import crSpinnerStatus from './crSpinnerStatus';

import { GEO_ENTITY } from './dimensions/EsConfig';

const MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again."
, MSG_DIMS_LOADING = "Dims is loading"
, S_DIV_LOADING = { height: 50, width: '100%' };

const IS_SHOW_LABELS = has.wideWidth()

const _crDfC = (props, dim) => props.dfC
  || (dim || {}).value;

const _crDfTitle = (props, dim) => {
  if (props.dfC || !dim) { return ""; }
  return dim.caption || "";
};

const _fAddErrMsgTo = (msg, msgOnNotSelected, configs, items) =>
 is => {
  configs.forEach((config, index) => {
    const { caption } = config;
    if (is(caption) && !items[index]){
      msg.push(msgOnNotSelected(caption))
    }
  })
};

const _addDfValuesFrom = (configs, fSelectItem) => {
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

    msgOnNotSelected,

    toTopLayer,
    onAbout,

    loadFn,
    onLoad,
    onShow,
    onClose
  } = props;
  const _isDim = !props.dims && !props.notDim
  , [_refItems, _fSelectItem] = useRefByIndex()
  , _refSeriaColor = useRef()
  , [setDate, getDate] = useProperty()
  , [setDim, getDim] = useProperty()
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
  , [isShowLabels, _toggleLabels] = useToggle(IS_SHOW_LABELS)
  , [_modalOptionsEl, _refDialogOptions, _toggleOptions] = useModalOptions()
  , [_modalToggleEl, _refTitles, isRow, setIsRow, _toggleInputs] = useModalToggle(configs)
  , {isShowDate, isShowChart} = isRow
  , [_toolbarEl, toggleToolBar] = useToolbar(
      _toggleLabels,
      _toggleInputs,
      _toggleOptions,
      onAbout
   )
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
       const _isShowDate = isCategoryItem(chartType)
         ? (setDate(), true)
         : false;
       updateStateIf(setIsRow, 'isShowDate', _isShowDate)
       updateStateIf(setState, 'chartType', chartType)
   }, [])
   //setDate, setIsRow, setState
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
         dfC: _crDfC(props, _dimItem),
         dfTitle: _crDfTitle(props, _dimItem),
         time: (getDate() || dateDf).value,
         dialogOptions: getRefValue(_refDialogOptions),
         items: getRefValue(_refItems),
         titles: getRefValue(_refTitles)
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
  , _commandButtons = useCommandButtons(_hLoad)
  , _menuMore = useMenuMore(toggleToolBar, onAbout)
  , _spinnerStatus = crSpinnerStatus(isLoading, isLoadFailed);

  return (
    <D.DraggableDialog
       isShow={isShow}
       caption={caption}
       menuModel={_menuMore}
       commandButtons={_commandButtons}
       toTopLayer={toTopLayer}
       onShow={onShow}
       onClose={_hClose}
    >
       {_toolbarEl}
       {_modalOptionsEl}
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
         onSelecDate={setDate}
         isDim={_isDim}
         dimOptions={dimOptions}
         onSelecDim={setDim}
       />
       <D.ValidationMessages
           validationMessages={validationMessages}
       />
    </D.DraggableDialog>
  );
})

export default DialogStatN
