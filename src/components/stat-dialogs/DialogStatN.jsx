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

const DialogStatN = memo((props) => {
  const {
    isShow,
    caption,
    onShow,
    onFront,

    loadFn, onLoad,

    //chartsType,
    //mapFrequency:initialMf,
    //mapDateDf,

    msgOnNotSelected,

    onClickInfo,
    onClose
  } = props;
  const _refItems = useRef([])
  , _fSelect = useCallback(index => (item) => {
      _refItems.current[index] = item
         ? {...item}
         : void 0
  }, [])
  , [_refColorComp, _onRegColor] = useRefSet()
  , [_refDate, _hSelectDate] = useRefSet()
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
      dateOptions,
      dateDefault,
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
   /*eslint-enable react-hooks/exhaustive-deps */
   , _crValidationMessages = useCallback(() => {
        const msg = []
        , _isCategory = isCategory(chartType)
        , { dim } = chartType || {};
        if (isLoadFailed) {
          msg.push(MSG_DIMS_NOT_LOADED)
          return msg;
        }
        if (isLoading) {
          msg.push(MSG_DIMS_LOADING)
          return msg;
        }
        configs.forEach((config, index) => {
           const { caption } = config;
           if (!(_isCategory && caption === dim)) {
             if (!_refItems.current[index]) {
               msg.push(msgOnNotSelected(caption))
             }
           }
        })
        return msg;
   }, [isLoadFailed, isLoading, configs, chartType, msgOnNotSelected])
   /*eslint-disable react-hooks/exhaustive-deps */
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
   , _handleLoad = useCallback(() => {
     const validationMessages = _crValidationMessages();
     if (validationMessages.length === 0){
       const { seriaColor, seriaWidth } = _refColorComp.current
          ? _refColorComp.current.getConf()
          : {}
       , _props = { ...props, timeId }
       , loadOpt = loadFn(
          _props, {
           dialogOptions: _refDialogOptions.current,
           chartType, seriaColor, seriaWidth,
           date: _refDate.current,
           dateDefault,
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
    dateDefault,
    timeId,
    chartType,
    selectOptions
  ])
  //loadFn, onLoad, props
  /*eslint-enable react-hooks/exhaustive-deps */
  , _commandButtons = useCommandButtons(_handleLoad)
  , _menuMore = useMenuMore(toggleToolBar, onClickInfo);

  const _spinnerStyle = isLoading
    ? S_SPINNER_LOADING
    : isLoadFailed
       ? {...S_SPINNER_LOADING, ...S_SPINNER_FAILED}
       : void 0;
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
         dateDefault={dateDefault}
         dateOptions={dateOptions}
         onSelecDate={_hSelectDate}
       />
       <D.ValidationMessages
           validationMessages={validationMessages}
       />
    </D.DraggableDialog>
  );
}, _arePropsEqual)

export default DialogStatN
