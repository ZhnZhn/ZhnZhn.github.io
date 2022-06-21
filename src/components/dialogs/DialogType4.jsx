import {
  useRef,
  useCallback
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useDialog from '../dialogs/hooks/useDialog';
import crValidationMessages from '../dialogs/hooks/crValidationMessages';
import getFromToDates from '../dialogs/hooks/getFromToDates';

import D from './DialogCell';

const DialogType4 = memoIsShow((
  props
) => {
  const {
    isShow,
    noDate,

    caption,
    oneCaption,
    oneNames,
    oneURI,
    oneJsonProp,
    isWithOneInput,
    twoCaption,
    twoNames,
    twoURI,
    twoJsonProp,
    isWithInputTwo,
    threeCaption,
    threeNames,
    threeURI,
    threeJsonProp,
    isWithInputThree,
    initFromDate,
    initToDate,
    msgOnNotSelected,
    msgOnNotValidFormat,
    onTestDate,

    toTopLayer,
    onClickInfo,

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
    isToolbar,
    isShowLabels,
    menuMoreModel,
    toolbarButtons,
    validationMessages,
    setValidationMessages,
    clearValidationMessages,
    hClose
  ] = useDialog({
    onClickInfo,
    onClose,
    toggleDate: noDate ? void 0 : toggleDate
  })
  , [setOne, getOne] = useProperty()
  , [setTwo, getTwo] = useProperty()
  , [setThree, getThree] = useProperty()
  , _refDates = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const one = getOne()
    , two = getTwo()
    , three = getThree()
    , _configs = [
      [one, oneCaption],
      [two, twoCaption],
      threeURI ? [three, threeCaption] : void 0
    ].filter(Boolean)
    , msgs = crValidationMessages(
      _configs,
      msgOnNotSelected,
      _refDates
    )
    if (msgs.length === 0) {
      onLoad(loadFn(props, {
        one,
        two,
        three,
        ...getFromToDates(_refDates)
      }))
      clearValidationMessages()
    } else {
      setValidationMessages(msgs)
    }
  }, []);
  // props, oneCaption, twoCaption, threeCaption, threeURI, loadFn, onLoad
  // getOne, getTwo, getThree
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
           isWithInput={isWithOneInput}
           uri={oneURI}
           jsonProp={oneJsonProp}
           caption={oneCaption}
           optionNames={oneNames}
           onSelect={setOne}
         />
         <D.SelectWithLoad
           isShow={isShow}
           isShowLabels={isShowLabels}
           isWithInput={isWithInputTwo}
           uri={twoURI}
           jsonProp={twoJsonProp}
           caption={twoCaption}
           optionNames={twoNames}
           onSelect={setTwo}
         />
         { threeURI &&
           <D.SelectWithLoad
             isShow={isShow}
             isShowLabels={isShowLabels}
             isWithInput={isWithInputThree}
             uri={threeURI}
             jsonProp={threeJsonProp}
             caption={threeCaption}
             optionNames={threeNames}
             onSelect={setThree}
           />
         }
         {
           (noDate !== true) &&
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
         <D.ValidationMessages
             validationMessages={validationMessages}
         />
    </D.DraggableDialog>
  );
})

export default DialogType4
