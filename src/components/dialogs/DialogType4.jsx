import {
  useRef,
  useCallback
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';
import useValidationMessages from '../dialogs/hooks/useValidationMessages';
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

    loadFn,
    onLoad,

    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props
  , [
    isToolbar,
    _menuMore
  ] = useMenuMore(onClickInfo)
  , [isShowLabels, toggleLabels] = useToggle(true)
  , [isShowDate, toggleDate] = useToggle(true)
  , _toolbarButtons = useToolbar({
    toggleLabels,
    toggleDate: noDate ? void 0 : toggleDate,
    onClickInfo
  })
  , [
    validationMessages,
    setValidationMessages,
    clearValidationMessages,
    _hClose
  ] = useValidationMessages(onClose)
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
       menuModel={_menuMore}
       onLoad={_hLoad}
       onShowChart={onShow}
       onFront={onFront}
       onClose={_hClose}
     >
        <D.Toolbar
          isShow={isToolbar}
          buttons={_toolbarButtons}
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
