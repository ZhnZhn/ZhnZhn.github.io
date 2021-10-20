import { memo, useRef, useCallback } from 'react';

import has from '../has';
import ChartTypes from '../dialogs/ChartTypes';
import SpinnerLoading from '../zhn/SpinnerLoading';
import ItemStack from '../zhn/ItemStack';
import D from '../dialogs/DialogCell';
import crSelectItem from './crSelectItem';

import useToggle from '../hooks/useToggle';
import useRefSet from './useRefSet';
import useToolbar from './useToolbar';
import useMenuMore from './useMenuMore';
import useModalOptions from './useModalOptions';
import useModalToggle from './useModalToggle';
import useLoadDims from './useLoadDims';
import useCommandButtons from './useCommandButtons';

const MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again."
, MSG_DIMS_LOADING = "Dims is loading"

, S_SPINNER_LOADING = { margin: '16px auto 32px' }
, S_SPINNER_FAILED = {
  borderColor: '#f44336',
  animation: 'none'
};

const { isCategory } = ChartTypes
, IS_SHOW_LABELS = has.wideWidth()
, _arePropsEqual = (prevProps, props) =>
  prevProps.isShow === props.isShow;

const _crDfC = (props, dim) => {
  const { dfC } = props
  if (dfC) { return dfC; }
  return (dim || {}).value;
};

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

const _crSpinnerStyle = (isLoading, isLoadFailed) =>
 isLoading
   ? S_SPINNER_LOADING
   : isLoadFailed
     ? {...S_SPINNER_LOADING, ...S_SPINNER_FAILED}
     : void 0;

const DialogStatN = memo((props) => {
  const {
    isShow,
    caption,
    onShow,
    onFront,

    loadFn, onLoad,

    dims,
    //chartsType,
    //mapFrequency:initialMf,
    //mapDateDf,

    msgOnNotSelected,

    onClickInfo,
    onClose
  } = props;
  const _isDim = !props.dims
  , _refItems = useRef([])
  , _fSelect = useCallback(index => (item) => {
      _refItems.current[index] = item
         ? {...item}
         : void 0
  }, [])
  , [_refColorComp, _onRegColor] = useRefSet()
  , [_refDate, _hSelectDate] = useRefSet()
  , [_refDim, _hSelectDim] = useRefSet()
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
      onClickInfo
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

        const _isCategory = isCategory(chartType)
        , { dim } = chartType || {}
        , _addErrMsgTo = _fAddErrMsgTo(msg, msgOnNotSelected, configs, _refItems.current);

        //For dims case and not category case
        if (dims || !_isCategory) {
          _addErrMsgTo(caption => !(_isCategory && caption === dim))
          return msg;
        }
        //For category case
        if (_isCategory) {
          const _dimItem = _refDim.current;
          if (!_dimItem) {
            msg.push("Dim isn't selected")
            return msg;
          }
          _addErrMsgTo(caption => caption !== _dimItem.caption)
        }
        return msg;
   }, [isLoadFailed, isLoading, configs, chartType, msgOnNotSelected])
   //_refDim, dims
   , _hSelectChartType = useCallback(chartType => {
       let _isShowDate = false;
       if (isCategory(chartType)) {
         _refDate.current = null
         _isShowDate = true
       }
       setIsRow(is => {
        is.isShowDate = _isShowDate
        return {...is};
       })
       setState(prevState => ({
        ...prevState,
        chartType
       }))
   }, [])
   //setIsRow, setState
   /*eslint-enable react-hooks/exhaustive-deps */
   /*eslint-disable react-hooks/exhaustive-deps */
   , _hLoad = useCallback(() => {
     const validationMessages = _crValidationMessages();
     if (validationMessages.length === 0){
       const { seriaColor, seriaWidth } = _refColorComp.current
          ? _refColorComp.current.getConf()
          : {}
       , dfC = _crDfC(props, _refDim.current)
       , dfTitle = _crDfTitle(props, _refDim.current)
       , loadOpt = loadFn(
           {...props}, {
           timeId, dfC, dfTitle,
           time: (_refDate.current || dateDf).value,
           dialogOptions: _refDialogOptions.current,
           chartType, seriaColor, seriaWidth,
           items: _refItems.current,
           titles: _refTitles.current,
           selectOptions: selectOptions
         }
       );
       onLoad(loadOpt)
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
  , _menuMore = useMenuMore(toggleToolBar, onClickInfo)

  , _spinnerStyle = _crSpinnerStyle(isLoading, isLoadFailed);

  return (
    <D.DraggableDialog
       isShow={isShow}
       caption={caption}
       menuModel={_menuMore}
       commandButtons={_commandButtons}
       onShowChart={onShow}
       onFront={onFront}
       onClose={_hClose}
    >
       {_toolbarEl}
       {_modalOptionsEl}
       {_modalToggleEl}
       {
         _spinnerStyle
           ? <SpinnerLoading style={_spinnerStyle} />
           : <ItemStack
                items={configs}
                crItem={crSelectItem}
                isShowLabels={isShowLabels}
                isRow={isRow}
                fSelect={_fSelect}
             />
       }
       <D.RowChartDate
         chartType={chartType}
         isShowLabels={isShowLabels}
         isShowChart={isShowChart}
         chartOptions={chartOptions}
         onSelectChart={_hSelectChartType}
         onRegColor={_onRegColor}
         isShowDate={isShowDate}
         dateDefault={dateDf.caption}
         dateOptions={dateOptions}
         onSelecDate={_hSelectDate}
         isDim={_isDim}
         dimOptions={dimOptions}
         onSelecDim={_hSelectDim}
       />
       <D.ValidationMessages
           validationMessages={validationMessages}
       />
    </D.DraggableDialog>
  );
}, _arePropsEqual)

export default DialogStatN
