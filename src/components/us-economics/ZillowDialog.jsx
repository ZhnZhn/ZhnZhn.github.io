import {
  useRef,
  useCallback,
  getRefValue
} from "../uiApi";

import memoIsShow from "../hoc/memoIsShow";
import { useToggle } from "../hooks/useToggle";
import { useProperty } from "../hooks/useProperty";
import useDialog from "../dialogs/hooks/useDialog";
import checkAreDatesValid from "../dialogs/hooks/checkAreDatesValid";

import D from "../dialogs/DialogCell";

const DATA_NOTE = "*Data present not for all zip codes";
const S_TIP = {
  margin: 10,
  marginTop: 16,
  fontWeight: "bold"
};

const _isByZipCode = item => !!item
  && item.v === "Z";

const _reZipCode = /^\d{5}$/;
const _isZipCode = value => _reZipCode.test(value.trim());

const ZillowDialog = memoIsShow(props => {
  const {
    isShow,

    //caption,
    oneCaption,
    //oneURI,
    //twoCaption,
    //twoURI,
    //threeCaption,
    msgOnNotSelected,
    //initFromDate,
    //initToDate,
    //msgOnNotValidFormat,
    //onTestDate,

    loadId,
    dfTable,
    dfIdFn,
    dataSource,

    //toTopLayer,

    onLoad,
    onShow
  } = props
  , [
    isShowPattern,
    togglePattern
  ] = useToggle(!1)
  , [
    isShowDate,
    toggleDate
  ] = useToggle(!1)
  , [
    isToolbar,
    isShowLabels,
    menuMoreModel,
    toolbarButtons,
    validationMessages,
    setValidationMessages,
    hClose
  ] = useDialog(props, {
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
        msgs.push("Zip Code is not valid")
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
      , _datesInst = getRefValue(_refDates);

      onLoad({
        ..._datesInst.getValues(),
        items: [metric, _three],
        title: `${two.c}: ${_three.c}`,
        subtitle: metric.c,
        itemCaption: _three.c,
        isKeyFeature: _hasZipCode,
        loadId,
        dfTable,
        dfIdFn,
        dataSource
      })
    }
    setValidationMessages(msgs)
  }, []);
  // oneCaption, msgOnNotSelected,
  // loadId, dfTable, dfIdFn, dataSource, onLoad,
  // getMetric,
  // setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <D.DraggableDialog
       isShow={isShow}
       caption={props.caption}
       menuModel={menuMoreModel}
       toTopLayer={props.toTopLayer}
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
         uri={props.oneURI}
         caption={oneCaption}
         onSelect={setMetric}
      />
      <D.SelectOneTwo
         refEl={_refTypeCode}
         isShow={isShow}
         isShowLabels={isShowLabels}
         isHideTwo={isShowPattern}
         uri={props.twoURI}
         oneCaption={props.twoCaption}
         twoCaption={props.threeCaption}
         propCaption="c"
         msgOnNotSelected={msgOnNotSelected}
         onSelectOne={_hSelectType}
      />
      <D.ShowHide isShow={isShowPattern}>
         <D.RowPattern
            refEl={_refZip}
            isShowLabels={isShowLabels}
            caption="*Zip Code"
            placeholder="Zip Code, 5 Digits"
            onTest={_isZipCode}
            errorMsg="5 digits format is required"
         />
      </D.ShowHide>
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
