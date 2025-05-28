import {
  isStrNotBlank
} from '../../utils/isTypeFn';

import {
  CHT_SPLINE
} from '../../constants/ChartType';

import {
  useRef,
  useState,
  getRefValue,
  getInputValue,
  //IfTrue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
//import { useToggle } from '../hooks/useToggle';
import useEventCallback from '../hooks/useEventCallback';

import useToggleLabels from './hooks/useToggleLabels';
import useDialog from './hooks/useDialog';
import useDialogOptions from './hooks/useDialogOptions';

import { crChartOptions } from './ChartOptionsFn';
import D from './DialogCell';

const ERR_MSG = 'Empty or Id format is not valid'
, S_ID_CAPTION = { width: 85 }
, S_ID_ROOT = { width: 270 };

const _testId = (
  value
) => isStrNotBlank(value)
  && isStrNotBlank(value.split('/')[2]);

const CHART_OPTIONS = crChartOptions(void 0, 't2');

const DialogQuery = memoIsShow((
  props
) => {
  const {
    //isShow,
    noDate,

    //caption,
    //oneCaption,
    //onePlaceholder,
    //initFromDate,
    //initToDate,
    //msgOnNotValidFormat,
    //onTestDate,

    //toTopLayer,

    //loadFn,
    //onLoad,
    //onShow
  } = props
  , [
    _chartType,
    _setChartType
  ] = useState(CHT_SPLINE)
  /*
  , [
    _isShowDate,
    _toggleDate
  ] = useToggle(!0)
  */
  , [
    _refDialogOptions,
    _isShowOptions,
    _toggleOptions,
    _hideOptions,
    _toggleDialogOption
  ] = useDialogOptions()
  , [
    _isShowLabels,
    _toggleLabels
  ] = useToggleLabels()
  , [
    _isToolbar,
    _menuMoreModel,
    _toolbarButtons
  ] = useDialog(props, {
    toggleOptions: _toggleOptions,
  }, _toggleLabels)
  , _refIdInput = useRef()
  //, _refDates = useRef()
  , _refSeriaColor = useRef()
  , _hLoad = useEventCallback(() => {
     const _idInputInst = getRefValue(_refIdInput)
     if (_idInputInst && _idInputInst.isValid()){
       const _value = _idInputInst.getValue();
       props.onLoad(props.loadFn(props, {
         // seriaColor, seriaWidth
         ...getInputValue(_refSeriaColor),
         items: [{ c: _value, v: _value }],
         dialogOptions: getRefValue(_refDialogOptions),
         chartType: _chartType
       }));
     } else {
       _idInputInst.showErrMsg()
     }
  });

  return (
    <D.DraggableDialog
      isShow={props.isShow}
      menuModel={_menuMoreModel}
      caption={props.caption}
      toTopLayer={props.toTopLayer}
      onLoad={_hLoad}
      onShow={props.onShow}
      onClose={props.onClose}
    >
      <D.Toolbar
        isShow={_isToolbar}
        buttons={_toolbarButtons}
      />
      <D.ModalOptions
        isShow={_isShowOptions}
        toggleOption={_toggleDialogOption}
        onClose={_hideOptions}
      />
      <D.RowPattern
        refEl={_refIdInput}
        isShowLabels={_isShowLabels}
        style={S_ID_ROOT}
        captionStyle={S_ID_CAPTION}
        placeholder={props.onePlaceholder}
        caption={props.oneCaption}
        onTest={_testId}
        errorMsg={ERR_MSG}
      />
      <D.RowChartDate
        refSeriaColor={_refSeriaColor}
        chartType={_chartType}
        isShowLabels={_isShowLabels}
        isShowChart={!0}
        labelStyle={S_ID_CAPTION}
        selectWidth={S_ID_ROOT.width}
        chartOptions={CHART_OPTIONS}
        onSelectChart={_setChartType}
        noDate={noDate}
      />
      {/*
      <IfTrue v={!noDate}>
        <D.ShowHide isShow={_isShowDate}>
          <D.InputPeriod
            refEl={_refDates}
            isShowLabels={_isShowLabels}
            initFromDate={props.initFromDate}
            initToDate={props.initToDate}
            msgOnNotValidFormat={props.msgOnNotValidFormat}
            onTestDate={props.onTestDate}
          />
        </D.ShowHide>
      </IfTrue>
      */}
   </D.DraggableDialog>
  );
});

export default DialogQuery
