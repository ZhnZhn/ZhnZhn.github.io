import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useProperty from '../hooks/useProperty';
import useDialog from '../dialogs/hooks/useDialog';

import D from '../dialogs/DialogCell';

const TYPE_OPTIONS = [
  { caption: 'Continuous Contract #1', value: 1 },
  { caption: 'Continuous Contract #2', value: 2 },
  { caption: 'Continuous Contract #3', value: 3 },
  { caption: 'Continuous Contract #4', value: 4 },
  { caption: 'Continuous Contract #5', value: 5 }
];

const FuturesWikiDialog = memoIsShow((
  props
) => {
  const {
    isShow,
    isFd,

    caption,
    futuresURI,
    msgOnNotSelected,
    msgOnNotValidFormat,
    initFromDate,
    isYmdOrEmpty,
    errNotYmdOrEmpty,

    loadFn,
    onLoad,

    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props
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
    onClose
  })
  , [setType, getType] = useProperty()
  , _refExchangeItem = useRef()
  , _refFromDate = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const msgs = []
    , _exchangeItemInst = getRefValue(_refExchangeItem)
    , { msg=[] } = _exchangeItemInst.getValidation()
    , type = getType()
    , _fromDateInst = getRefValue(_refFromDate);

    msgs.push(...msg)
    if (!type) {
      msgs.push(msgOnNotSelected('Type'))
    }
    if (isFd && !_fromDateInst.isValid()) {
      msgs.push(msgOnNotValidFormat('From Date'))
    }

    if (msgs.length === 0){
      const {
        one:exchange,
        two:item
      } = _exchangeItemInst.getValues()
      , fromDate = isFd
          ? _fromDateInst.getValue()
          : void 0;
      onLoad(loadFn(props, {
        exchange,
        item,
        type,
        fromDate
      }))
      clearValidationMessages()
    } else {
      setValidationMessages(msgs)
    }
  }, []);
  // props, onLoad, loadFn, isFd, msgOnNotSelected, msgOnNotValidFormat,
  // getType,
  // setValidationMessages, clearValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <D.DraggableDialog
       isShow={isShow}
       caption={caption}
       menuModel={menuMoreModel}
       onLoad={_hLoad}
       onShowChart={onShow}
       onFront={onFront}
       onClose={hClose}
    >
      <D.Toolbar
         isShow={isToolbar}
         buttons={toolbarButtons}
      />
      <D.SelectOneTwo
         ref={_refExchangeItem}
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={futuresURI}
         oneCaption="Exchange"
         oneOptionNames="Exchanges"
         oneJsonProp="futures"
         twoCaption="Asset"
         msgOnNotSelected={msgOnNotSelected}
      />
      <D.RowInputSelect
         isShowLabels={isShowLabels}
         caption="Type"
         options={TYPE_OPTIONS}
         onSelect={setType}
      />
      { isFd &&
        <D.RowDate
           innerRef={_refFromDate}
           isShowLabels={isShowLabels}
           title="From Date:"
           initialValue={initFromDate}
           errorMsg={errNotYmdOrEmpty}
           onTest={isYmdOrEmpty}
        />
      }
      <D.ValidationMessages
         validationMessages={validationMessages}
      />
    </D.DraggableDialog>
  );
})

export default FuturesWikiDialog
