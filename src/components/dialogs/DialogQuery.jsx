import {
  useRef,
  useState,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useEventCallback from '../hooks/useEventCallback';
import useDialog from './hooks/useDialog';
import useDialogOptions from './hooks/useDialogOptions';

import { crDialogChartOptions } from './ChartOptionsFn';
import D from './DialogCell';

const ERR_MSG = 'Empty or Id format is not valid'
, S_ID_CAPTION = { width: 85 }
, S_ID_ROOT = { width: 270 };

const _isStrNotBlank = str => typeof str === 'string'
  && str.trim();

const _testId = (value) => _isStrNotBlank(value)
  && _isStrNotBlank(value.split('/')[2]);

const CHART_OPTIONS = crDialogChartOptions({
  chartsType: 't2'
});

const DialogQuery = memoIsShow((
  props
) => {
  const {
    isShow,
    noDate,

    caption,
    oneCaption,
    onePlaceholder,
    initFromDate,
    initToDate,
    msgOnNotValidFormat,
    onTestDate,

    loadFn,
    onLoad,

    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props
  , [
    chartType,
    setChartType
  ] = useState('SPLINE')
  , [
    isShowDate,
    toggleDate
  ] = useToggle(true)
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
    toolbarButtons
  ] = useDialog({
    onClickInfo,
    onClose,
    toggleOptions,
    toggleDate: noDate ? void 0 : toggleDate
  })
  , _refIdInput = useRef()
  , _refDates = useRef()
  , _refColorComp = useRef()
  , _onRegColor = useCallback(comp => {
    _refColorComp.current = comp
  }, [])
  , _hLoad = useEventCallback(() => {
     const _idInputInst = getRefValue(_refIdInput)
     if (_idInputInst && _idInputInst.isValid()){
       const _value = _idInputInst.getValue()
       , _colorCompInst = getRefValue(_refColorComp)
       , {
         seriaColor,
         seriaWidth
       } = _colorCompInst
         ? _colorCompInst.getConf()
         : {};
       onLoad(loadFn(props, {
         items: [{ c: _value, v: _value }],
         dialogOptions: getRefValue(refDialogOptions),
         chartType,
         seriaColor,
         seriaWidth
       }));
     } else {
       _idInputInst.showErrMsg()
     }
  });

  return (
    <D.DraggableDialog
      isShow={isShow}
      menuModel={menuMoreModel}
      caption={caption}
      onLoad={_hLoad}
      onShowChart={onShow}
      onFront={onFront}
      onClose={onClose}
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
      <D.RowPattern
        ref={_refIdInput}
        isShow={isShow}
        isShowLabels={isShowLabels}
        captionStyle={S_ID_CAPTION}
        rootStyle={S_ID_ROOT}
        placeholder={onePlaceholder}
        caption={oneCaption}
        onTest={_testId}
        errorMsg={ERR_MSG}
      />
      <D.RowChartDate
        chartType={chartType}
        isShowLabels={isShowLabels}
        isShowChart={true}
        labelStyle={S_ID_CAPTION}
        selectWidth={S_ID_ROOT.width}
        chartOptions={CHART_OPTIONS}
        onSelectChart={setChartType}
        onRegColor={_onRegColor}
        noDate={noDate}
      />
      {
        !noDate &&
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
      }
   </D.DraggableDialog>
  );
});

export default DialogQuery
