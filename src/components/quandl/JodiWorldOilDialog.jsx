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

import {
  CHT_AREA,
  CHT_YEARLY
} from '../../constants/ChartType';
import D from '../dialogs/DialogCell';

const UNIT_OPTIONS = [
  { caption: "Thousand Barrels per day (kb/d)", value: "KD" },
  { caption: "Thousand Barrels (kbbl)", value: "KB" },
  { caption: "Thousand Kilolitres (kl)", value: "KL" },
  { caption: "Thousand Metric Tons (kmt)", value: "KT" },
  { caption: "Conversion factor barrels/ktons", value: "BK" }
]
, DF_UNITS = UNIT_OPTIONS[0]
, CHART_OPTIONS = [
  { caption: "AreaSpline", value: CHT_AREA },
  { caption: "Yearly by Month", value: CHT_YEARLY }
];

const JodiWorldOilDialog = memoIsShow(({
  isShow,

  caption,
  oneCaption,
  oneURI,
  oneJsonProp,
  parentCaption,
  parentChildURI,
  parentJsonProp,
  childCaption,
  msgOnNotSelected,
  initFromDate,
  initToDate,
  msgOnNotValidFormat,
  onTestDate,

  dataColumn,
  loadId,
  dataSource,

  fnValue,
  onLoad,

  onShow,
  onFront,
  onClose,
  onClickInfo
}) => {
  const [
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
    onClickInfo,
    onClose,
    toggleDate,
    toggleOptions
  })
  , [setCountry, getCountry] = useProperty()
  , [setUnits, getUnits] = useProperty()
  , [setChartType, getChartType] = useProperty()
  , _refProductFlow = useRef()
  , _refDates = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const msgs = []
    , country = getCountry()
    , _productFlowInst = getRefValue(_refProductFlow)
    , { msg=[] } = _productFlowInst.getValidation()
    , units = getUnits() || DF_UNITS;

    if (!country) {
      msgs.push(msgOnNotSelected('Country'))
    }
    msgs.push(...msg)
    checkAreDatesValid(msgs, _refDates)

    if (msgs.length === 0) {
      const _datesInst = getRefValue(_refDates)
      , {
        one:product,
        two:flow
      } = _productFlowInst.getValues()
      , { value:seriaType } = getChartType() || {};

      onLoad({
        ..._datesInst.getValues(),
        value: fnValue(country.value, product.value, flow.value, units.value),
        title: `${country.caption}: ${product.caption}`,
        subtitle: `${flow.caption}: ${units.caption}`,
        seriaType,
        dataColumn,
        loadId,
        dataSource
      })
      clearValidationMessages()
    } else {
      setValidationMessages(msgs)
    }
  }, []);
  // dataColumn, loadId, dataSource, msgOnNotSelected, fnValue, onLoad
  // getCountry, getUnits, getChartType
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
      <D.SelectWithLoad
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={oneURI}
         jsonProp={oneJsonProp}
         caption={oneCaption}
         optionNames="Items"
         onSelect={setCountry}
      />
      <D.SelectOneTwo
         ref={_refProductFlow}
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={parentChildURI}
         oneCaption={parentCaption}
         oneJsonProp={parentJsonProp}
         twoCaption={childCaption}
         msgOnNotSelected={msgOnNotSelected}
      />
      <D.RowInputSelect
        isShowLabels={isShowLabels}
        caption="Units"
        options={UNIT_OPTIONS}
        onSelect={setUnits}
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
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Chart Type"
          placeholder="Default: AreaSpline"
          options={CHART_OPTIONS}
          onSelect={setChartType}
        />
      </D.ShowHide>
      <D.ValidationMessages
          validationMessages={validationMessages}
      />
    </D.DraggableDialog>
  );
});

export default JodiWorldOilDialog
