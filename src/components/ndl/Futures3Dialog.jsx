import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useProperty from '../hooks/useProperty';
import useDialog from '../dialogs/hooks/useDialog';

import D from '../dialogs/DialogCell';

const YEAR_OPTIONS = [
  { caption: '2021', value: 2021 },
  { caption: '2020', value: 2020 },
  { caption: '2019', value: 2019 },
  { caption: '2018', value: 2018 },
  { caption: '2017', value: 2017 },
  { caption: '2016', value: 2016 },
  { caption: '2015', value: 2015 },
  { caption: '2014', value: 2014 },
  { caption: '2013', value: 2013 },
  { caption: '2012', value: 2012 }
];

const Futures3Dialog = memoIsShow((
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

    toTopLayer,
    onAbout,

    loadFn,
    onLoad,
    onShow,
    onClose
  } = props
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
    onClose
  })
  , _refItemMonth = useRef()
  , _refFromDate = useRef()
  , [
    setYear,
    getYear
  ] = useProperty()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const msgs = []
    , _itemMonthInst = getRefValue(_refItemMonth)
    , { msg=[] } = _itemMonthInst.getValidation()
    , year = getYear()
    , _fromDateInst = getRefValue(_refFromDate);

    msgs.push(...msg)
    if (!year) {
      msgs.push(msgOnNotSelected('Year'))
    }
    if (isFd && !_fromDateInst.isValid()){
      msgs.push(msgOnNotValidFormat('From Date'));
    }

    if (msgs.length === 0) {
      const {
        one:item,
        two:month
      } = _itemMonthInst.getValues()
      , fromDate = isFd
          ? _fromDateInst.getValue()
          : void 0;
      onLoad(loadFn(props, {
        item,
        month,
        year,
        fromDate
      }))
    }
    setValidationMessages(msgs)
  }, []);
  // props, isFd, loadFn, onLoad, msgOnNotSelected, msgOnNotValidFormat,
  // getYear,
  // setValidationMessages
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
          ref={_refItemMonth}
          isShow={isShow}
          isShowLabels={isShowLabels}
          uri={futuresURI}
          oneCaption="Futures"
          oneOptionNames="Futures"
          oneJsonProp="futures"
          twoCaption="Month"
          msgOnNotSelected={msgOnNotSelected}
       />
       <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Year"
          options={YEAR_OPTIONS}
          onSelect={setYear}
       />
       {  isFd &&
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

export default Futures3Dialog
