import {
  useRef,
  useCallback,
  getRefValue,
  getRefOptions
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useDialog from '../dialogs/hooks/useDialog';
import useInputToggle from './useInputToggle';

import D from '../dialogs/DialogCell';
import ModalInputToggle from './ModalInputToggle';
import { crInputSelectDfProps } from './dialogFn';

const TRADE_FLOW_OPTIONS = [
  { c: "Export Value", v: { rg: 'X', measure: "primaryValue" } },
  { c: "Export Weight", v: { rg: 'X', measure: "netWgt" } },
  { c: "Export Quantity", v: { rg: 'X', measure: "qty" } },
  { c: "Export Average Value Per Weight", v: { rg: 'X', measure: "avgPerWeight" } },
  { c: "Export Average Value Per Quantity", v: { rg: 'X', measure: "avgPerQuantity" } },
  { c: "Import Value", v: { rg: 'M', measure: "primaryValue" } },
  { c: "Import Weight", v: { rg: 'M', measure: "netWgt" } },
  { c: "Import Quantity", v: { rg: 'M', measure: "qty" } },
  { c: "Import Average Value Per Weight", v: { rg: 'M', measure: "avgPerWeight" } },
  { c: "Import Average Value Per Quantity", v: { rg: 'M', measure: "avgPerQuantity" } }
]
, [
  DF_TRADE_FLOW,
  TRADE_FLOW_PLACEHOLDER
] = crInputSelectDfProps(TRADE_FLOW_OPTIONS)
, [
  DF_REPORTER = { c: 'All', v: 'all'},
  REPORTER_PLACEHOLDER
] = crInputSelectDfProps([{ c: 'All', v: 'all'}])
, FREQUENCY_OPTIONS = [
  {c: "Annual",  v: "A"},
  {c: "Monthly", v: "M"}
]
, [
  DF_FREQ,
  FREQUENCY_PLACEHOLDER
] = crInputSelectDfProps(FREQUENCY_OPTIONS);

const UnDialog5 = memoIsShow((
  props
) => {
   const {
     isShow,
     caption,
     oneURI,
     twoURI,
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
   , [isHeading, toggleHeading] = useToggle(true)
   , [isPartner, togglePartner] = useToggle(false)
   , [isFlow, toggleFlow] = useToggle(true)
   //, [isFreq, toggleFreq] = useToggle(false)
   , _refTradePartner = useRef()
   , _refGroupItem = useRef()
   , [
     setOne,
     getOne
   ] = useProperty()
   , [
     setTradeFlow,
     getTradeFlow
   ] = useProperty()
   , [
     setTradePartner,
     getTradePartner
   ] = useProperty()

   /*eslint-disable no-unused-vars*/
   , [
     setFreq,
     getFreq
   ] = useProperty()
   /*eslint-enable no-unused-vars*/

   /*eslint-disable react-hooks/exhaustive-deps */
   , _hLoad = useCallback(() => {
     const _groupItemInst = getRefValue(_refGroupItem)
     , { msg=[] } = _groupItemInst.getValidation()
     , one = getOne() || DF_REPORTER
     , _oneValue = one.v
     , tradePartner = getTradePartner()
     , _tradePartnerValue = tradePartner && tradePartner.v
     , freq = getFreq() || DF_FREQ;
     if (_oneValue === 'all' && _tradePartnerValue === 'all') {
       msg.push('Query All to All is too complex')
     }
     if (_oneValue === 'all' && freq.v === 'M') {
       msg.push('Query All Monthly is too complex')
     }
     if (msg.length === 0) {
       const {
         one:two,
         two:three
       } = _groupItemInst.getValues()
       onLoad(loadFn(props, {
         one,
         two,
         three,
         tradeFlow: getTradeFlow() || DF_TRADE_FLOW,
         tradePartner,
         freq,
         tradePartners: getRefOptions(_refTradePartner)
       }))
     }
     setValidationMessages(msg)
   }, [])
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
          ['Partner', isPartner, togglePartner],
          ['Heading', isHeading, toggleHeading],
          ['Trade Flow', isFlow, toggleFlow],
          /*['Frequency', isFreq, toggleFreq]*/
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
      <D.ShowHide isShow={isPartner}>
        <D.SelectWithLoad
           refEl={_refTradePartner}
           isShowLabels={isShowLabels}
           uri={tpURI}
           caption="Partner"
           placeholder="Default: World"
           onSelect={setTradePartner}
        />
      </D.ShowHide>
      <D.ShowHide isShow={isHeading}>
        <D.SelectOneTwo
           refEl={_refGroupItem}
           isShow={isShow}
           isShowLabels={isShowLabels}
           uri={twoURI}
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
      <D.ValidationMessages
          validationMessages={validationMessages}
      />
   </D.DraggableDialog>
  );
})

export default UnDialog5
