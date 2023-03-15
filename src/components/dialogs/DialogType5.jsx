import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useRefBool from '../hooks/useRefBool';
import useDialog from './hooks/useDialog';
import checkAreDatesValid from './hooks/checkAreDatesValid';

import {
  CHT_AREA,
  CHT_SCATTER_UP,
  CHT_SCATTER_DOWN
} from '../../constants/ChartType';

import D from './DialogCell';

const INITIAL_IS_SECOND_YAXIS = false;

const CHART_TYPE_OPTIONS = [
  { caption: 'Default: Area', value: CHT_AREA },
  { caption: 'Scatter: Label Up', value: CHT_SCATTER_UP },
  { caption: 'Scatter: Label Down', value: CHT_SCATTER_DOWN }
];

const DialogType5 = memoIsShow((
  props
) => {
  const {
    isShow,
    isChartType,

    caption,
    oneCaption,
    oneURI,
    oneJsonProp,
    twoCaption,
    twoURI,
    twoJsonProp,
    threeCaption,
    msgOnNotSelected,
    initFromDate,
    initToDate,
    msgOnNotValidFormat,
    onTestDate,

    toTopLayer,
    onAbout,

    loadFn,
    onLoad,
    onShow,
    onClose
  } = props
  , [
    isShowDate,
    toggleDate
  ] = useToggle(false)
  , [
    isShowOptions,
    toggleOptions
  ] = useToggle(false)
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
    onAbout,
    onClose,
    toggleDate,
    toggleOptions
  })
  , [
    refSecondYAxis,
    hCheckSecondYAxis,
    hUnCheckSecondYAxis
  ] = useRefBool(INITIAL_IS_SECOND_YAXIS)
  , [
    setOne,
    getOne
  ] = useProperty()
  , [
    setChartType,
    getChartType
  ] = useProperty()
  , _refDates = useRef()
  , _refTwoThree = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const msgs = []
    , one = getOne()
    , _twoThreeInst = getRefValue(_refTwoThree)
    , { msg=[] } = _twoThreeInst.getValidation();
    if (!one) {
      msgs.push(msgOnNotSelected(oneCaption));
    }
    msgs.push(...msg)
    checkAreDatesValid(_refDates, msgs)

    if (msgs.length === 0){
      const {
        one:two,
        two: three
      } = _twoThreeInst.getValues()
      , { value:seriaType } = getChartType() || {};
      onLoad(loadFn(props, {
        ...getRefValue(_refDates).getValues(),
        one,
        two,
        three,
        seriaType,
        hasSecondYAxis: getRefValue(refSecondYAxis)
      }))
      clearValidationMessages()
    } else {
      setValidationMessages(msgs)
    }
  }, []);
  // props, loadFn, onLoad, oneCaption, msgOnNotSelected,
  // refSecondYAxis, getChartType, getOne,
  // clearValidationMessages, setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

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
      <D.SelectWithLoad
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={oneURI}
         jsonProp={oneJsonProp}
         caption={oneCaption}
         optionNames="Items"
         onSelect={setOne}
      />
      <D.SelectOneTwo
         ref={_refTwoThree}
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={twoURI}
         oneCaption={twoCaption}
         oneJsonProp={twoJsonProp}
         twoCaption={threeCaption}
         msgOnNotSelected={msgOnNotSelected}
      />

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
      <D.ShowHide isShow={isShowOptions}>
        {
          isChartType &&
          <D.RowInputSelect
             isShowLabels={isShowLabels}
             caption="Chart Type:"
             options={CHART_TYPE_OPTIONS}
             onSelect={setChartType}
          />
        }
        <D.RowCheckBox1          
          caption="Add Seria with Second YAxis"
          initialValue={INITIAL_IS_SECOND_YAXIS}
          onCheck={hCheckSecondYAxis}
          onUnCheck={hUnCheckSecondYAxis}
        />
      </D.ShowHide>
      <D.ValidationMessages
          validationMessages={validationMessages}
      />
    </D.DraggableDialog>
  );
});

export default DialogType5
