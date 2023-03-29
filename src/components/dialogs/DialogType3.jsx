import {
  useRef,
  useCallback
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useDialog from './hooks/useDialog';
import crValidationMessages from './hooks/crValidationMessages';
import getFromToDates from './hooks/getFromToDates';

import D from './DialogCell'

const DialogType3 = memoIsShow((
  props
) => {
  const {
    isShow,
    isWithInputStock,
    noDate,

    caption,
    itemCaption='Stock',
    oneCaption=itemCaption,
    oneURI,
    optionURI,
    optionsJsonProp,
    optionNames='Stocks',
    onePlaceholder,

    msgOnNotSelected,
    msgOnNotValidFormat,
    initFromDate,
    initToDate,
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
    isToolbar,
    isShowLabels,
    menuMoreModel,
    toolbarButtons,
    validationMessages,
    setValidationMessages,
    hClose
  ] = useDialog({
    onAbout,
    onClose,
    toggleDate
  })
  , [
    setItem,
    getItem
  ] = useProperty()
  , _refDates = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
     const one = getItem()
     , _msgs = crValidationMessages(
        [[one, oneCaption]],
        msgOnNotSelected,
        _refDates
     );

     if (_msgs.length === 0) {
       onLoad(loadFn(props, {
          one,
          ...getFromToDates(_refDates)
       }))
     }
     setValidationMessages(_msgs)
  }, [])
  // getItem, msgOnNotSelected, oneCaption,
  // loadFn, onLoad
  // setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */
  , _oneURI = oneURI || optionURI;

  return (
    <D.DraggableDialog
      isShow={isShow}
      menuModel={menuMoreModel}
      caption={caption}
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
        placeholder={onePlaceholder}
        uri={_oneURI}
        jsonProp={optionsJsonProp}
        caption={oneCaption}
        optionNames={optionNames}
        isWithInput={isWithInputStock}
        onSelect={setItem}
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
      <D.ValidationMessages
         validationMessages={validationMessages}
      />
   </D.DraggableDialog>
  );
})

export default DialogType3
