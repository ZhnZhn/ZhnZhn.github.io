import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi'

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';
import useValidationMessages from '../dialogs/hooks/useValidationMessages';

import D from '../dialogs/DialogCell';

const TRADE_FLOW_OPTIONS = [
  { caption: "Export Value", value: { rg: 2, measure: "TradeValue" } },
  { caption: "Export Weight", value: { rg: 2, measure: "NetWeight" } },
  { caption: "Export Quantity", value: { rg: 2, measure: "TradeQuantity" } },
  { caption: "Export Average Value Per Weight", value: { rg: 2, measure: "avgPerWeight" } },
  { caption: "Export Average Value Per Quantity", value: { rg: 2, measure: "avgPerQuantity" } },
  { caption: "Import Value", value: { rg: 1, measure: "TradeValue" } },
  { caption: "Import Weight", value: { rg: 1, measure: "NetWeight" } },
  { caption: "Import Quantity", value: { rg: 1, measure: "TradeQuantity" } },
  { caption: "Import Average Value Per Weight", value: { rg: 1, measure: "avgPerWeight" } },
  { caption: "Import Average Value Per Quantity", value: { rg: 1, measure: "avgPerQuantity" } }
];

const UnDialog5 = memoIsShow((
  props
) => {
   const {
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

     loadFn,
     onLoad,

     onShow,
     onFront,
     onClose,
     onClickInfo
   } = props
   , [
     isToolbar,
     menuMoreModel
   ] = useMenuMore(onClickInfo)
   , [
     isShowLabels,
     toggleLabels
   ] = useToggle(true)
   , [
     isShowOptions,
     toggleOptions
   ] = useToggle(false)
   , _toolbarButtons = useToolbar({
     toggleLabels,
     toggleOptions,
     onClickInfo
   })
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
     validationMessages,
     setValidationMessages,
     clearValidationMessages,
     _hClose
   ] = useValidationMessages(onClose)
   /*eslint-disable react-hooks/exhaustive-deps */
   , _hLoad = useCallback(() => {
     const _groupItemInst = getRefValue(_refGroupItem)
     , { msg=[] } = _groupItemInst.getValidation();
     if (msg.length === 0) {
       const {
         one:two,
         two:three
       } = _groupItemInst.getValues();
       onLoad(loadFn(props, {
         one: getOne(),
         two,
         three,
         tradeFlow: getTradeFlow()
       }))
       clearValidationMessages()
     } else {
       setValidationMessages(msg)
     }
   }, [])
   // props, loadFn, onLoad,
   // getOne, getTradeFlow,
   // clearValidationMessages, setValidationMessages
   /*eslint-enable react-hooks/exhaustive-deps */

   return (
     <D.DraggableDialog
       isShow={isShow}
       caption={caption}
       menuModel={menuMoreModel}
       onLoad={_hLoad}
       onShowChart={onShow}
       onFront={onFront}
       onClose={_hClose}
    >
      <D.Toolbar
         isShow={isToolbar}
         buttons={_toolbarButtons}
      />
      <D.SelectWithLoad
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={oneURI}
         jsonProp={oneJsonProp}
         caption={oneCaption}
         placeholder="Default: All"
         onSelect={setOne}
      />
      <D.SelectOneTwo
         ref={_refGroupItem}
         isShow={isShow}
         isShowLabels={isShowLabels}
         uri={twoURI}
         oneCaption={twoCaption}
         oneJsonProp={twoJsonProp}
         twoCaption={threeCaption}
         msgOnNotSelected={msgOnNotSelected}
      />
      <D.ShowHide isShow={isShowOptions}>
        <D.RowInputSelect
          isShowLabels={isShowLabels}
          caption="Trade Flow"
          placeholder="Default: Export Value"
          options={TRADE_FLOW_OPTIONS}
          onSelect={setTradeFlow}
        />
      </D.ShowHide>
      <D.ValidationMessages
          validationMessages={validationMessages}
      />
   </D.DraggableDialog>
  );
})

export default UnDialog5
