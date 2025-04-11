import {
  useRef,
  useCallback,
  getRefOptions
} from "../uiApi";

import {
  getV
} from "../../utils/getPropertyFn";

import memoIsShow from "../hoc/memoIsShow";
import { useToggle } from "../hooks/useToggle";
import useProperty from "../hooks/useProperty";
import useDialog from "../dialogs/hooks/useDialog";

import useInputToggle from "./useInputToggle";
import useInputChart from "./useInputChart";
import { crInputSelectDfProps } from "./dialogFn";

import D from "../dialogs/DialogCell";
import ModalInputToggle from "./ModalInputToggle";

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
, DF_FREQ = {c: "Annual",  v: "A"};

const _isAggrAll = (
  tp,
  aggr
) => getV(tp) === "all" &&  getV(aggr) !== "total";

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
    onAbout,

    loadFn,
    onLoad,
    onShow,
    onClose
  } = props
  , _refTradePartner = useRef()
  , [
    isShowToggle,
    toggleInputs,
    hideToggle
  ] = useInputToggle()
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
    toggleInputs
  })
  , [
    isFlow,
    toggleFlow
  ] = useToggle(true)
  /*
  , [
    isPartner,
    togglePartner
  ] = useToggle()
  */
  //, [isAggr, toggleAggr] = useToggle(true)
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
    if (one && getV(one) === "all"
        || _isAggrAll(tradePartner, three)) {
      msgs.push("Query All is too complex")
    }
    if (one && getV(one) === "0" && getV(three) === "AG2") {
      msgs.push("Query World by AG2 is too complex")
    }
    if ((getV(tradeFlow) || {}).tfType === "t1"
        && (getV(tradePartner) !== "0" || getV(chart) === "SPLINE")) {
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
        time: getV(getPeriod()),
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
     <ModalInputToggle
       isShow={isShowToggle}
       configs={[
         ["Trade Flow", isFlow, toggleFlow],
         /*["Partner", isPartner, togglePartner]*/
         /*["Aggregation", isAggr, toggleAggr]*/
       ]}
       onClose={hideToggle}
     />
     <D.SelectWithLoad
        isShow={isShow}
        isShowLabels={isShowLabels}
        uri={oneURI}
        caption="Reporter"
        placeholder={REPORTER_PLACEHOLDER}
        onSelect={setOne}
     />
     <D.ShowHide isShow={isFlow}>
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Trade Flow"
          placeholder={TRADE_FLOW_PLACEHOLDER}
          propCaption="c"
          options={TRADE_FLOW_OPTIONS}
          onSelect={setTradeFlow}
        />
     </D.ShowHide>
     <D.ShowHide isShow={false}>
       <D.SelectWithLoad
          refEl={_refTradePartner}
          isShowLabels={isShowLabels}
          uri={tpURI}
          caption="Partner"
          placeholder={PARTNER_PLACEHOLDER}
          onSelect={_setTradePartner}
       />
     </D.ShowHide>
     <D.ShowHide isShow={true}>
       <D.RowInputSelect
         isShowLabels={isShowLabels}
         caption="Aggregation"
         placeholder={AGGREGATION_PLACEHOLDER}
         propCaption="c"
         options={AGG_OPTIONS}
         onSelect={_setAggregation}
       />
       <D.ShowHide isShow={isInputChart}>
         <D.RowInputSelect
           isShowLabels={isShowLabels}
           caption="Chart"
           placeholder={CHART_PLACEHOLDER}
           propCaption="c"
           options={chartOptions}
           onSelect={setChart}
         />
         <D.ShowHide isShow={isPeriod}>
            <D.RowInputSelect
              isShowLabels={isShowLabels}
              //caption="Period"
              caption="For Date"
              placeholder={PERIOD_PLACEHOLDER}
              propCaption="c"
              options={PERIOD_OPTIONS}
              onSelect={setPeriod}
            />
         </D.ShowHide>
       </D.ShowHide>
     </D.ShowHide>
     <D.ValidationMessages
         validationMessages={validationMessages}
     />
  </D.DraggableDialog>
  );
});

export default UnDialogAgg
