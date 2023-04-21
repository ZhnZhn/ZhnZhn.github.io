import {
  useRef,
  useCallback,
  getRefOptions
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useDialog from '../dialogs/hooks/useDialog';

import useInputToggle from './useInputToggle';
import useToggleInputChart from './useToggleInputChart';

import D from '../dialogs/DialogCell';
import ModalInputToggle from './ModalInputToggle';

const AGG_OPTIONS = [
  {c: "Total of trade partner", v: "TOTAL"},
  {c: "All 2-digit HS commodities", v: "AG2"}
]
, DF_AGGREGATION = AGG_OPTIONS[0]
, PERIOD_OPTIONS = (() => {
  const arr = [];
  for (let i=0; i<22; i++) {
    const _v = '' + (2022 - i);
    arr.push({c: _v, v: _v})
  }
  return arr;
})()
, DF_PERIOD = PERIOD_OPTIONS[1]
, TRADE_FLOW_OPTIONS = [
  { c: "Export Value", v: { rg: 'X', measure: "primaryValue" } },
  { c: "Import Value", v: { rg: 'M', measure: "primaryValue" } },
]
, CHART_OPTIONS = [
  { c: "TreeMap (60, 90)", v: "TREE_MAP"},
  { c: "Bar (60, 90)", v: "BAR"}
]
, DF_TRADE_FLOW = TRADE_FLOW_OPTIONS[0]
, DF_PARTNER = {c: "World",  v: "0"}
, DF_FREQ = {c: "Annual",  v: "A"};

const _isAggrAll = (
  tp,
  aggr
) => tp.v === 'all' &&  aggr.v !== 'total';

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
  , [
    isPartner,
    togglePartner
  ] = useToggle()
  //, [isAggr, toggleAggr] = useToggle(true)
  , [
    setOne,
    getOne
  ] = useProperty()
  , [
    setTradePartner,
    getTradePartner
  ] = useProperty(DF_PARTNER, DF_PARTNER)
  , [
    setAggregation,
    getAggregation
  ] = useProperty(DF_AGGREGATION, DF_AGGREGATION)
  , [
    isInputChart,
    toggleInputChart
  ] = useToggleInputChart(
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
  , [setChart, getChart] = useProperty()
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
    , three = getAggregation()
    , msgs = [];
    if (!one) {
      msgs.push(msgOnNotSelected('Reporter'))
    }
    if (one && one.v === 'all'
        || _isAggrAll(tradePartner, three)) {
      msgs.push('Query All is too complex')
    }
    if (msgs.length === 0) {
      onLoad(loadFn(props, {
        one,
        three,
        tradeFlow: getTradeFlow(),
        tradePartner,
        period: getPeriod(),
        chart: getChart(),
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
         ['Trade Flow', isFlow, toggleFlow],
         ['Partner', isPartner, togglePartner]
         /*['Aggregation', isAggr, toggleAggr]*/
       ]}
       onClose={hideToggle}
     />
     <D.SelectWithLoad
        isShow={isShow}
        isShowLabels={isShowLabels}
        uri={oneURI}
        caption="Reporter"
        onSelect={setOne}
     />
     <D.ShowHide isShow={isFlow}>
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Trade Flow"
          placeholder="Default: Export Value"
          propCaption="c"
          options={TRADE_FLOW_OPTIONS}
          onSelect={setTradeFlow}
        />
     </D.ShowHide>
     <D.ShowHide isShow={isPartner}>
       <D.SelectWithLoad
          ref={_refTradePartner}
          isShowLabels={isShowLabels}
          uri={tpURI}
          caption="Partner"
          placeholder="Default: World"
          onSelect={_setTradePartner}
       />
     </D.ShowHide>
     <D.ShowHide isShow={true}>
       <D.RowInputSelect
         isShowLabels={isShowLabels}
         caption="Aggregation"
         placeholder="Default: Total of trade partner"
         propCaption="c"
         options={AGG_OPTIONS}
         onSelect={_setAggregation}
       />
       <D.ShowHide isShow={isInputChart}>
         <D.RowInputSelect
           isShowLabels={isShowLabels}
           caption="Chart"
           placeholder="Default: TreeMap (60,90)"
           propCaption="c"
           options={CHART_OPTIONS}
           onSelect={setChart}
         />
         <D.RowInputSelect
           isShowLabels={isShowLabels}
           caption="Period"
           placeholder="Default: 2021"
           propCaption="c"
           options={PERIOD_OPTIONS}
           onSelect={setPeriod}
         />
       </D.ShowHide>
     </D.ShowHide>
     <D.ValidationMessages
         validationMessages={validationMessages}
     />
  </D.DraggableDialog>
  );
});

export default UnDialogAgg
