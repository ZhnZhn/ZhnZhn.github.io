import {
  useRef,
  useState,
  useCallback,
  getRefValue,
  getRefOptions,
  getInputValue
} from "../uiApi";

import {
  CHT_BAR_SET,
  CHT_TREE_MAP,
  CHT_DOT_SET
} from "../../constants/ChartType";

import {
  getV
} from "../../utils/getPropertyFn";

import memoIsShow from "../hoc/memoIsShow";
import { useToggle } from "../hooks/useToggle";
import { useProperty } from "../hooks/useProperty";
import useDialog from "../dialogs/hooks/useDialog";
import useInputToggle from "./useInputToggle";

import D from "../dialogs/DialogCell";
import crDateConfig from "../dialogs/fns/crDateConfig";
import ModalInputToggle from "./ModalInputToggle";
import { crInputSelectDfProps } from "./dialogFn";

const TRADE_FLOW_OPTIONS = [
  { c: "Export Value", v: { rg: "X", measure: "primaryValue" } },
  { c: "Export Weight", v: { rg: "X", measure: "netWgt" } },
  { c: "Export Quantity", v: { rg: "X", measure: "qty" } },
  { c: "Export Average Value Per Weight", v: { rg: "X", measure: "avgPerWeight" } },
  { c: "Export Average Value Per Quantity", v: { rg: "X", measure: "avgPerQuantity" } },
  { c: "Import Value", v: { rg: "M", measure: "primaryValue" } },
  { c: "Import Weight", v: { rg: "M", measure: "netWgt" } },
  { c: "Import Quantity", v: { rg: "M", measure: "qty" } },
  { c: "Import Average Value Per Weight", v: { rg: "M", measure: "avgPerWeight" } },
  { c: "Import Average Value Per Quantity", v: { rg: "M", measure: "avgPerQuantity" } }
]
, [
  DF_TRADE_FLOW,
  TRADE_FLOW_PLACEHOLDER
] = crInputSelectDfProps(TRADE_FLOW_OPTIONS)
, [
  DF_REPORTER = { c: "World", v: "0"},
  REPORTER_PLACEHOLDER
] = crInputSelectDfProps([{ c: "World", v: "0"}])
, FREQUENCY_OPTIONS = [
  {c: "Annual",  v: "A"},
  {c: "Monthly", v: "M"}
]
, [
  DF_FREQ,
  FREQUENCY_PLACEHOLDER
] = crInputSelectDfProps(FREQUENCY_OPTIONS)
, _crOptionItem = (caption, value) => ({
  caption,
  value
})
, CHART_OPTIONS = [
  _crOptionItem("Bar (60, 90): By Partners", CHT_BAR_SET),
  _crOptionItem("Tree Map (60, 90): By Partners", CHT_TREE_MAP),
  _crOptionItem("Dots: By Partners", CHT_DOT_SET)
]
, [
    DF_CHART,
    CHART_PLACEHOLDER
  ] = crInputSelectDfProps(CHART_OPTIONS)
, [
  DATE_OPTIONS,
] = crDateConfig("Y", 2)
, [
  DATE_DF,
  DATE_PLACEHOLDER
] = crInputSelectDfProps(DATE_OPTIONS, 1)
, _crTwoUri = dfId => `./data/uncomtrade/${dfId}.json`;

const UnDialog5 = memoIsShow((
  props
) => {
   const {
     isShow,
     caption,
     oneURI,
     tpURI,
     dfProps,
     msgOnNotSelected,

     toTopLayer,
     onAbout,

     loadFn,
     onLoad,
     onShow,
     onClose
   } = props
   , { dfId } = dfProps || {}
   , [
     seriaType,
     setSeriaType
   ] = useState(DF_CHART)
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
   , [isHeading, toggleHeading] = useToggle(true)
   /*, [isPartner, togglePartner] = useToggle(false)*/
   , [isFlow, toggleFlow] = useToggle(true)
   , [isChart, toggleChart] = useToggle(false)
   //, [isFreq, toggleFreq] = useToggle(false)
   , _refTradePartner = useRef()
   , _refGroupItem = useRef()
   , _refSeriaColor = useRef()
   , [
     setOne,
     getOne
   ] = useProperty(DF_REPORTER, DF_REPORTER)
   , [
     setTradeFlow,
     getTradeFlow
   ] = useProperty(DF_TRADE_FLOW, DF_TRADE_FLOW)
   , getTradePartner = useProperty()[1]
   , [
     setPropertyTime,
     getPropertyTime
   ] = useProperty(DATE_DF, DATE_DF)

   /*eslint-disable no-unused-vars*/
   , [
     setFreq,
     getFreq
   ] = useProperty(DF_FREQ, DF_FREQ)
   /*eslint-enable no-unused-vars*/

   /*eslint-disable react-hooks/exhaustive-deps */
   , _hLoad = useCallback(() => {
     const _groupItemInst = getRefValue(_refGroupItem)
     , { msg=[] } = _groupItemInst.getValidation()
     , one = getOne()
     , _oneValue = getV(one)
     , tradePartner = getTradePartner()
     , _tradePartnerValue = getV(tradePartner)
     , freq = getFreq();
     if (_oneValue === "all" && _tradePartnerValue === "all") {
       msg.push("Query All to All is too complex")
     }
     if (_oneValue === "all" && getV(freq) === "M") {
       msg.push("Query All Monthly is too complex")
     }
     if (msg.length === 0) {
       const {
         one:two,
         two:three
       } = _groupItemInst.getValues()
       onLoad(loadFn(props, {
         ...getInputValue(_refSeriaColor),
         one,
         two,
         three,
         tradeFlow: getTradeFlow(),
         tradePartner,
         freq,
         chType: seriaType,
         time: getV(getPropertyTime()),
         tradePartners: getRefOptions(_refTradePartner)
       }))
     }
     setValidationMessages(msg)
   }, [seriaType])
   // props, loadFn, onLoad,
   // getOne, getTradeFlow,
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
      <ModalInputToggle
        isShow={isShowToggle}
        configs={[
          /*["Partner", isPartner, togglePartner],*/
          ["Heading", isHeading, toggleHeading],
          ["Trade Flow", isFlow, toggleFlow],
          ["Chart", isChart, toggleChart]
          /*["Frequency", isFreq, toggleFreq]*/
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
      <D.ShowHide isShow={false}>
        <D.SelectWithLoad
           refEl={_refTradePartner}
           isShowLabels={isShowLabels}
           uri={tpURI}
           caption="Partner"
           placeholder="Default: World"
           //onSelect={setTradePartner}
        />
      </D.ShowHide>
      <D.ShowHide isShow={isHeading}>
        <D.SelectOneTwo
           refEl={_refGroupItem}
           isShow={isShow}
           isShowLabels={isShowLabels}
           uri={_crTwoUri(dfId)}
           oneCaption="Heading"
           twoCaption="Subheading"
           msgOnNotSelected={msgOnNotSelected}
        />
      </D.ShowHide>
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
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Frequency"
          placeholder={FREQUENCY_PLACEHOLDER}
          propCaption="c"
          options={FREQUENCY_OPTIONS}
          //onSelect={setFreq}
        />
      </D.ShowHide>
      <D.RowChartDate
         isShowChart={isChart}
         isShowDate={isChart}
         refSeriaColor={_refSeriaColor}
         chartType={seriaType}
         isShowLabels={isShowLabels}
         chartOptions={CHART_OPTIONS}
         chartDefault={CHART_PLACEHOLDER}
         onSelectChart={setSeriaType}
         dateDefault={DATE_PLACEHOLDER}
         dateOptions={DATE_OPTIONS}
         onSelectDate={setPropertyTime}
      />
      <D.ValidationMessages
          validationMessages={validationMessages}
      />
   </D.DraggableDialog>
  );
})

export default UnDialog5
