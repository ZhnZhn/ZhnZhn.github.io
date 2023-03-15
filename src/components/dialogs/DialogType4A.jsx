import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useRefBool from '../hooks/useRefBool';
import useDialog from './hooks/useDialog';
import checkAreDatesValid from './hooks/checkAreDatesValid';

import D from './DialogCell';

const INITIAL_IS_SECOND_YAXIS = false;

const DialogType4A = memoIsShow((
  props
) => {
  const {
    isShow,

    caption,
    oneCaption,
    oneURI,
    oneJsonProp,
    twoCaption,
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
  ] = useToggle(true)
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
  , _refDates = useRef()
  , _refOneTwo = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const _oneTwoInst = getRefValue(_refOneTwo)
    , { msg=[] } = _oneTwoInst.getValidation()
    checkAreDatesValid(_refDates, msg)
    if (msg.length === 0){
      onLoad(loadFn(props, {
        ..._oneTwoInst.getValues(),
        ...getRefValue(_refDates).getValues(),
        hasSecondYAxis: getRefValue(refSecondYAxis)
      }))
      clearValidationMessages()
    } else {
      setValidationMessages(msg)
    }
  }, []);
  // props, loadFn, onLoad,
  // refSecondYAxis,
  // setValidationMessages, clearValidationMessages
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
       <D.SelectOneTwo
         ref={_refOneTwo}
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={oneURI}
         oneCaption={oneCaption}
         oneJsonProp={oneJsonProp}
         twoCaption={twoCaption}
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
         <D.RowCheckBox1
           initValue={INITIAL_IS_SECOND_YAXIS}
           caption="Add Seria with Second YAxis"
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

export default DialogType4A
