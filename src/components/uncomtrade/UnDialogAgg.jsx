import { useCallback } from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useDialog from '../dialogs/hooks/useDialog';
import useInputToggle from './useInputToggle';

import D from '../dialogs/DialogCell';
import ModalInputToggle from './ModalInputToggle';

const AGG_OPTIONS = [
  {c: "Total", v: "total"},
  {c: "All 2-digit HS commodities", v: "AG2"}
]
, DF_AGGREGATION = AGG_OPTIONS[0]
, PERIOD_OPTIONS = (() => {
  const arr = [];
  for (let i=0; i<22; i++) {
    const _v = '' + (2021 - i);
    arr.push({c: _v, v: _v})
  }
  return arr;
})()
, DF_PERIOD = PERIOD_OPTIONS[0]
, TRADE_FLOW_OPTIONS = [
  { c: "Export Value", v: { rg: 2, measure: "TradeValue" } },
  { c: "Import Value", v: { rg: 1, measure: "TradeValue" } },
]
, CHART_OPTIONS = [
  { c: "TreeMap (60, 90)", v: "TREE_MAP"},
  { c: "Bar (60, 90)", v: "BAR"}
]
, DF_TRADE_FLOW = TRADE_FLOW_OPTIONS[0]
, DF_PARTNER = {c: "World",  v: "0"}
, DF_FREQ = {c: "Annual",  v: "A"};

const _isPeriod = (
  tp,
  aggr
) => !(tp.v !== 'all' && aggr.v === 'total');

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
  , [isFlow, toggleFlow] = useToggle(true)
  , [isPartner, togglePartner] = useToggle(true)
  , [isAggr, toggleAggr] = useToggle(true)
  , [isPeriod, togglePeriod] = useToggle(false)
  , [setOne, getOne] = useProperty()
  , [setTradePartner, getTradePartner] = useProperty()
  , [setAggregation, getAggregation] = useProperty()
  , [setTradeFlow, getTradeFlow] = useProperty()
  , [setChart, getChart] = useProperty()
  , [setPeriod, getPeriod] = useProperty()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _setTradePartner = useCallback((item) => {
    setTradePartner(item)
    togglePeriod(_isPeriod(
      item || DF_PARTNER,
      getAggregation() || DF_AGGREGATION
    ))
  }, [])
  // setTradePartner, togglePeriod
  , _setAggregation = useCallback(item => {
    setAggregation(item)
    togglePeriod(_isPeriod(
      getTradePartner() || DF_PARTNER,
      item || DF_AGGREGATION
    ))
  }, [])
  // setAggregation, togglePeriod
  /*eslint-enable react-hooks/exhaustive-deps */
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(() => {
    const one = getOne()
    , tradePartner = getTradePartner() || DF_PARTNER
    , three = getAggregation() || DF_AGGREGATION
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
        tradeFlow: getTradeFlow() || DF_TRADE_FLOW,
        tradePartner,
        period: getPeriod() || DF_PERIOD,
        chart: getChart(),
        freq: DF_FREQ
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
         ['Partner', isPartner, togglePartner],
         ['Aggregation', isAggr, toggleAggr]
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
          isShowLabels={isShowLabels}
          uri={tpURI}
          caption="Partner"
          placeholder="Default: World"
          onSelect={_setTradePartner}
       />
     </D.ShowHide>
     <D.ShowHide isShow={isAggr}>
       <D.RowInputSelect
         isShowLabels={isShowLabels}
         caption="Aggregation"
         placeholder="Default: Total"
         propCaption="c"
         options={AGG_OPTIONS}
         onSelect={_setAggregation}
       />
       <D.ShowHide isShow={isPeriod}>
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
