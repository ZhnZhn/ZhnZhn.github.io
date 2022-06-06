//import PropTypes from "prop-types";
import {
  useRef,
  useCallback
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';

import useMenuMore from './hooks/useMenuMore';
import useToolbar from './hooks/useToolbar';
import useValidationMessages from './hooks/useValidationMessages';
import checkAreDatesValid from './hooks/checkAreDatesValid';
import getFromToDates from './hooks/getFromToDates';

import D from './DialogCell'

const TRANSFORM_OPTIONS = [
  { caption: "NO EFFECT: z[t]=y[t]", value: "none" },
  { caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]", value: "diff" },
  { caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]", value: "rdiff" },
  { caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]", value: "rdiff_from" },
  { caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100", value: "normalize" }
];

const DialogType3 = memoIsShow((
  props
) => {
  const {
    isShow,
    isTransform,
    isWithInputStock,
    noDate,

    caption,
    oneCaption,
    itemCaption='Stock',
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

    loadFn,
    onLoad,

    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props
  , [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onClickInfo)
  , [
    isShowLabels,
    toggleLabels
  ] = useToggle(true)
  , [
    isShowTransform,
    toggleTransform
  ] = useToggle()
  , [
    isShowDate,
    toggleDate
  ] = useToggle(true)
  , _toolbarButtons = useToolbar({
    toggleLabels,
    toggleTransform: isTransform
       ? toggleTransform : void 0,
    toggleDate,
    onClickInfo
  })
  , [
    setItem,
    getItem
  ] = useProperty()
  , [
    setTransform,
    getTransform
  ] = useProperty()
  , [
    validationMessages,
    setValidationMessages,
    clearValidationMessages
  ] = useValidationMessages()
  , _refDates = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
     const _crVm = () => {
       const msgs = [];
       if (!getItem()) {
         msgs.push(msgOnNotSelected(oneCaption || itemCaption));
       }
       checkAreDatesValid(_refDates, msgs)
       return msgs;
     }
     , _validationMessages = _crVm();

     if (_validationMessages.length === 0) {
       onLoad(loadFn(props, {
          one: getItem(),
          transform: getTransform(),
          ...getFromToDates(_refDates)
       }))
       clearValidationMessages()
     } else {
       setValidationMessages(_validationMessages)
     }
  }, [])
  // getItem, msgOnNotSelected, oneCaption, itemCaption,
  // getTransform, loadFn, onLoad
  // clearValidationMessages, setValidationMessages
  , _hClose = useCallback(() => {
    onClose()
    clearValidationMessages()
  }, [])
  // onClose, clearValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */
  , _oneCaption = oneCaption || itemCaption
  , _oneURI = oneURI || optionURI;

  return (
    <D.DraggableDialog
      isShow={isShow}
      menuModel={menuMoreModel}
      caption={caption}
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
        placeholder={onePlaceholder}
        uri={_oneURI}
        jsonProp={optionsJsonProp}
        caption={_oneCaption}
        optionNames={optionNames}
        isWithInput={isWithInputStock}
        onSelect={setItem}
      />
      <D.ShowHide isShow={isShowTransform}>
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Transform"
          options={TRANSFORM_OPTIONS}
          onSelect={setTransform}
        />
      </D.ShowHide>
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

/*
DialogType3.propTypes = {
  isShow: PropTypes.bool,
  caption: PropTypes.string,
  itemCaption: PropTypes.string,
  optionURI: PropTypes.string,
  optionsJsonProp: PropTypes.string,
  optionNames: PropTypes.string,
  initFromDate: PropTypes.string,
  initToDate: PropTypes.string,
  msgOnNotValidFormat: PropTypes.func,
  onTestDate: PropTypes.func,
  onShow: PropTypes.func,

  descrUrl: PropTypes.string,
  isTransform: PropTypes.bool,
  onClickInfo: PropTypes.func,
  loadFn: PropTypes.func
}
*/

export default DialogType3
