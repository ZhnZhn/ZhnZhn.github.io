import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useDialog from '../dialogs/hooks/useDialog';
import checkAreDatesValid from '../dialogs/hooks/checkAreDatesValid';

import D from '../dialogs/DialogCell';

const DATA_NOTE = '*Data present not for all zip codes';
const S_TIP = {
  margin: 10,
  marginTop: 16,
  fontWeight: 'bold'
};

const _isFn = fn => typeof fn === 'function';
const _isByZipCode = item => !!item
  && item.v === 'Z';

const _reZipCode = /^\d{5}$/;
const _isZipCode = value => _reZipCode.test(value.trim());

const ZillowDialog = memoIsShow(({
  isShow,

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

  dataColumn,
  loadId,
  dfTable,
  dataSource,

  toTopLayer,
  onAbout,

  fnValue,
  onLoad,
  onShow,
  onClose
}) => {
  const [
    isShowPattern,
    togglePattern
  ] = useToggle(false)
  , [
    isShowDate,
    toggleDate
  ] = useToggle(false)
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
  , _refTypeCode = useRef()
  , _refZip = useRef()
  , _refDates = useRef()
  , [
    setMetric,
    getMetric
  ] = useProperty()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelectType = useCallback((type) => {
    togglePattern(_isByZipCode(type))
  }, [])
  // togglePattern
  , _hLoad = useCallback(() => {
    const msgs = []
    , metric = getMetric()
    , _typeCodeInst = getRefValue(_refTypeCode)
    , { one } = _typeCodeInst.getValues()
    , _zipCodeInst = getRefValue(_refZip);

    if (!metric) {
      msgs.push(msgOnNotSelected(oneCaption));
    }
    if (_isByZipCode(one)) {
      if (!_zipCodeInst.isValid()){
        msgs.push('Zip Code is not valid')
      }
    } else {
      const { msg=[] } = _typeCodeInst.getValidation();
      if (msg.length !== 0) {
        msgs.push(...msg)
      }
    }
    checkAreDatesValid(_refDates, msgs)

    if (msgs.length === 0) {
      const {
        one:two,
        two:three
      } = _typeCodeInst.getValues()
      , zipCode = _zipCodeInst.getValue()
      , _hasZipCode = _isByZipCode(two)
      , _three = !_hasZipCode
          ? three
          : { v: zipCode, c: zipCode }
      , value = _isFn(fnValue)
          ? fnValue(metric.v, _three.v)
          : void 0
      , _datesInst = getRefValue(_refDates);

      onLoad({
        ..._datesInst.getValues(),
        title: `${two.c}: ${_three.c}`,
        subtitle: metric.c,
        itemCaption: _three.c,
        isKeyFeature: _hasZipCode,
        value,
        dataColumn,
        loadId,
        dfTable,
        dataSource
      })
    }
    setValidationMessages(msgs)
  }, []);
  // oneCaption, msgOnNotSelected,
  // fnValue, dataColumn, loadId, dataSource, onLoad,
  // getMetric,
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
      <D.SelectWithLoad
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={oneURI}
         jsonProp={oneJsonProp}
         caption={oneCaption}
         optionNames="Items"
         onSelect={setMetric}
      />
      <D.SelectOneTwo
         ref={_refTypeCode}
         isShow={isShow}
         isShowLabels={isShowLabels}
         isHideTwo={isShowPattern}
         uri={twoURI}
         oneCaption={twoCaption}
         oneJsonProp={twoJsonProp}
         twoCaption={threeCaption}
         propCaption="c"
         msgOnNotSelected={msgOnNotSelected}
         onSelectOne={_hSelectType}
      />
      <D.ShowHide isShow={isShowPattern}>
         <D.RowPattern
            ref={_refZip}
            isShowLabels={isShowLabels}
            caption="*Zip Code"
            placeholder="Zip Code, 5 Digits"
            onTest={_isZipCode}
            errorMsg="5 digits format is required"
         />
      </D.ShowHide>
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
      <D.ShowHide isShow={isShowPattern}>
        <div style={S_TIP}>
          {DATA_NOTE}
        </div>
      </D.ShowHide>
      <D.ValidationMessages
         validationMessages={validationMessages}
      />
    </D.DraggableDialog>
  );
});

export default ZillowDialog
