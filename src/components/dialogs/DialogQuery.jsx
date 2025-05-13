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
  IfTrue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import { useToggle } from '../hooks/useToggle';
import useEventCallback from '../hooks/useEventCallback';
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
    //onShow,

    onAbout,
    onClose
  } = props
  , [
    chartType,
    setChartType
  ] = useState(CHT_SPLINE)
  , [
    isShowDate,
    toggleDate
  ] = useToggle(!0)
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
    onAbout,
    onClose,
    toggleOptions,
    toggleDate: noDate ? void 0 : toggleDate
  })
  , _refIdInput = useRef()
  , _refDates = useRef()
  , _refSeriaColor = useRef()
  , _hLoad = useEventCallback(() => {
     const _idInputInst = getRefValue(_refIdInput)
     if (_idInputInst && _idInputInst.isValid()){
       const _value = _idInputInst.getValue();
       props.onLoad(props.loadFn(props, {
         // seriaColor, seriaWidth
         ...getInputValue(_refSeriaColor),
         items: [{ c: _value, v: _value }],
         dialogOptions: getRefValue(refDialogOptions),
         chartType
       }));
     } else {
       _idInputInst.showErrMsg()
     }
  });

  return (
    <D.DraggableDialog
      isShow={props.isShow}
      menuModel={menuMoreModel}
      caption={props.caption}
      toTopLayer={props.toTopLayer}
      onLoad={_hLoad}
      onShow={props.onShow}
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
        refEl={_refIdInput}
        isShowLabels={isShowLabels}
        style={S_ID_ROOT}
        captionStyle={S_ID_CAPTION}
        placeholder={props.onePlaceholder}
        caption={props.oneCaption}
        onTest={_testId}
        errorMsg={ERR_MSG}
      />
      <D.RowChartDate
        refSeriaColor={_refSeriaColor}
        chartType={chartType}
        isShowLabels={isShowLabels}
        isShowChart={true}
        labelStyle={S_ID_CAPTION}
        selectWidth={S_ID_ROOT.width}
        chartOptions={CHART_OPTIONS}
        onSelectChart={setChartType}
        noDate={noDate}
      />
      <IfTrue v={!noDate}>
        <D.ShowHide isShow={isShowDate}>
          <D.InputPeriod
            refEl={_refDates}
            isShowLabels={isShowLabels}
            initFromDate={props.initFromDate}
            initToDate={props.initToDate}
            msgOnNotValidFormat={props.msgOnNotValidFormat}
            onTestDate={props.onTestDate}
          />
        </D.ShowHide>
      </IfTrue>
   </D.DraggableDialog>
  );
});

export default DialogQuery
