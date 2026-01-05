import {
  getValue,
  fIsValueEqual
} from "../../utils/itemFn";

import {
  useRef,
  useCallback,
  getRefOptions
} from "../uiApi";

import memoIsShow from "../hoc/memoIsShow";
import { useToggle } from "../hooks/useToggle";
import { useProperty } from "../hooks/useProperty";

import useDialog from "../dialogs/hooks/useDialog";
import useModalToggle from "../dialogs/hooks/useModalToggle";

import DraggableDialog from "../zhn-moleculs/DraggableDialog";
import ShowHide from "../zhn/ShowHide";
import ValidationMessages from '../zhn/ValidationMessages';

import Toolbar from "../dialogs/Toolbar";
import SelectWithLoad from "../dialogs/SelectWithLoad";
import ModalToggleInputs from "../dialogs/modals/ModalToggleInputs";
import RowInputSelect from "../dialogs/rows/RowInputSelect";

import useInputChart from "./useInputChart";
import { crInputSelectDfProps } from "./dialogFn";

const [
  DF_REPORTER = { c: "World", v: "0"},
  REPORTER_PLACEHOLDER
] = crInputSelectDfProps([{ c: "World", v: "0"}])
, AGG_OPTIONS = [
  {c: "Total of trade partner", v: "TOTAL"},
  {c: "All 2-digit HS commodities", v: "AG2"}
]
, [
  DF_AGGREGATION,
  AGGREGATION_PLACEHOLDER
] = crInputSelectDfProps(AGG_OPTIONS)
, PERIOD_OPTIONS = (() => {
  const arr = [];
  for (let i=0; i<23; i++) {
    const _v = "" + (2023 - i);
    arr.push({c: _v, v: _v})
  }
  return arr;
})()
, [
  DF_PERIOD,
  PERIOD_PLACEHOLDER
] = crInputSelectDfProps(PERIOD_OPTIONS, 1)
, TRADE_FLOW_OPTIONS = [
  { c: "Export Value", v: { rg: "X", measure: "primaryValue" } },
  //{ c: "Calculated Export Value by Reporter Imports", v: { rg: "M", measure: "primaryValue", tfType: "t1"} },
  { c: "Import Value", v: { rg: "M", measure: "primaryValue" } },
  //{ c: "Calculated Import Value by Reporter Exports", v: { rg: "M", measure: "primaryValue", tfType: "t1" } }
]
, [
  DF_TRADE_FLOW,
  TRADE_FLOW_PLACEHOLDER
] = crInputSelectDfProps(TRADE_FLOW_OPTIONS)
, [
  DF_PARTNER = {c: "World",  v: "0"},
  PARTNER_PLACEHOLDER
] = crInputSelectDfProps([{c: "World",  v: "0"}])
, DF_FREQ = {c: "Annual",  v: "A"}
, _isItemValueAll = fIsValueEqual("all")
, _isItemValueZero = fIsValueEqual("0");

const _isAggrAll = (
  tp,
  aggr
) => _isItemValueAll(tp) &&  getValue(aggr) !== "total";

const UnDialogAgg = memoIsShow((
  props
) => {
  const {
    isShow,
    caption,
    oneURI,
    tpURI,
    msgOnNotSelected,

    toTopLayer,

    loadFn,
    onLoad,
    onShow,
  } = props
  , _refTradePartner = useRef()
  , [
    isShowToggle,
    toggleInputs,
    hideToggle,
    isShowLabels,
    toggleLabels
  ] = useModalToggle()
  , [
    isToolbar,
    menuMoreModel,
    toolbarButtons,
    validationMessages,
    setValidationMessages,
    hClose
  ] = useDialog(props, {
    toggleInputs
  })
  , [
    isFlow,
    toggleFlow
  ] = useToggle(!0)
  /*
  , [
    isPartner,
    togglePartner
  ] = useToggle()
  */
  //, [isAggr, toggleAggr] = useToggle(!0)
  , [
    setOne,
    getOne
  ] = useProperty(DF_REPORTER, DF_REPORTER)
  , [
    setTradePartner,
    getTradePartner
  ] = useProperty(DF_PARTNER, DF_PARTNER)
  , [
    setAggregation,
    getAggregation
  ] = useProperty(DF_AGGREGATION, DF_AGGREGATION)
  , [
    CHART_PLACEHOLDER,
    isInputChart,
    isPeriod,
    toggleInputChart,
    setChart,
    getChart,
    chartOptions
  ] = useInputChart(
     getTradePartner,
     getAggregation
   )
  , [
    setTradeFlow,
    getTradeFlow
  ] = useProperty(
      DF_TRADE_FLOW,
      DF_TRADE_FLOW
    )
  , [
     setPeriod,
     getPeriod
  ] = useProperty(
       DF_PERIOD,
       DF_PERIOD
    )
  /*eslint-disable react-hooks/exhaustive-deps */
  , _setTradePartner = useCallback(item => {
      setTradePartner(item)
      toggleInputChart()
  }, [])
  // setTradePartner, toggleInputChart
  , _setAggregation = useCallback(item => {
      setAggregation(item)
      toggleInputChart()
  }, [])
  // setAggregation, toggleInputChart
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const one = getOne()
    , tradePartner = getTradePartner()
    , tradeFlow = getTradeFlow()
    , three = getAggregation()
    , chart = getChart()
    , msgs = [];
    if (!one) {
      msgs.push(msgOnNotSelected("Reporter"))
    }
    if (_isItemValueAll(one)
        || _isAggrAll(tradePartner, three)) {
      msgs.push("Query All is too complex")
    }
    if (_isItemValueZero(one) && getValue(three) === "AG2") {
      msgs.push("Query World by AG2 is too complex")
    }
    if ((getValue(tradeFlow) || {}).tfType === "t1"
        && (!_isItemValueZero(tradePartner) || getValue(chart) === "SPLINE")) {
      msgs.push("Query trade flow calculated values is only for category charts of trade partner World")
    }
    if (msgs.length === 0) {
      onLoad(loadFn(props, {
        one,
        three,
        tradeFlow,
        tradePartner,
        chart,
        chType: chart,
        time: getValue(getPeriod()),
        freq: DF_FREQ,
        tradePartners: getRefOptions(_refTradePartner)
      }))
    }
    setValidationMessages(msgs)
  }, []);
  // props, loadFn, onLoad, msgOnNotSelected
  // getAggregation, getTradeFlow,
  // clearValidationMessages, setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <DraggableDialog
      isShow={isShow}
      caption={caption}
      menuModel={menuMoreModel}
      toTopLayer={toTopLayer}
      onLoad={_hLoad}
      onShow={onShow}
      onClose={hClose}
   >
     <Toolbar
        isShow={isToolbar}
        buttons={toolbarButtons}
     />
     <ModalToggleInputs
       isShow={isShowToggle}
       isShowLabels={isShowLabels}
       configs={[
         ["Trade Flow", isFlow, toggleFlow],
         /*["Partner", isPartner, togglePartner]*/
         /*["Aggregation", isAggr, toggleAggr]*/
       ]}
       onToggleLabels={toggleLabels}
       onClose={hideToggle}
     />
     <SelectWithLoad
        isShow={isShow}
        isShowLabels={isShowLabels}
        uri={oneURI}
        caption="Reporter"
        placeholder={REPORTER_PLACEHOLDER}
        onSelect={setOne}
     />
     <ShowHide isShow={isFlow}>
        <RowInputSelect
          isShowLabels={isShowLabels}
          caption="Trade Flow"
          placeholder={TRADE_FLOW_PLACEHOLDER}
          propCaption="c"
          options={TRADE_FLOW_OPTIONS}
          onSelect={setTradeFlow}
        />
     </ShowHide>
     <ShowHide isShow={!1}>
       <SelectWithLoad
          refEl={_refTradePartner}
          isShowLabels={isShowLabels}
          uri={tpURI}
          caption="Partner"
          placeholder={PARTNER_PLACEHOLDER}
          onSelect={_setTradePartner}
       />
     </ShowHide>
     <ShowHide isShow={!0}>
       <RowInputSelect
         isShowLabels={isShowLabels}
         caption="Aggregation"
         placeholder={AGGREGATION_PLACEHOLDER}
         propCaption="c"
         options={AGG_OPTIONS}
         onSelect={_setAggregation}
       />
       <ShowHide isShow={isInputChart}>
         <RowInputSelect
           isShowLabels={isShowLabels}
           caption="Chart"
           placeholder={CHART_PLACEHOLDER}
           propCaption="c"
           options={chartOptions}
           onSelect={setChart}
         />
         <ShowHide isShow={isPeriod}>
            <RowInputSelect
              isShowLabels={isShowLabels}
              //caption="Period"
              caption="For Date"
              placeholder={PERIOD_PLACEHOLDER}
              propCaption="c"
              options={PERIOD_OPTIONS}
              onSelect={setPeriod}
            />
         </ShowHide>
       </ShowHide>
     </ShowHide>
     <ValidationMessages
         validationMessages={validationMessages}
     />
  </DraggableDialog>
  );
});

export default UnDialogAgg
