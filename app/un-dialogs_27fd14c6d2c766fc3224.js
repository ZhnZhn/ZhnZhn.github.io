"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[673],{4376:(e,o,a)=>{a.r(o),a.d(o,{default:()=>g});var t=a(9999),r=a(6016),n=a(1926),i=a(5868),s=a(7286),l=a(1837),u=a(5893);const p=[{caption:"Export Value",value:{rg:2,measure:"TradeValue"}},{caption:"Export Weight",value:{rg:2,measure:"NetWeight"}},{caption:"Export Quantity",value:{rg:2,measure:"TradeQuantity"}},{caption:"Export Average Value Per Weight",value:{rg:2,measure:"avgPerWeight"}},{caption:"Export Average Value Per Quantity",value:{rg:2,measure:"avgPerQuantity"}},{caption:"Import Value",value:{rg:1,measure:"TradeValue"}},{caption:"Import Weight",value:{rg:1,measure:"NetWeight"}},{caption:"Import Quantity",value:{rg:1,measure:"TradeQuantity"}},{caption:"Import Average Value Per Weight",value:{rg:1,measure:"avgPerWeight"}},{caption:"Import Average Value Per Quantity",value:{rg:1,measure:"avgPerQuantity"}}],g={UnDialog5:(0,r.Z)((e=>{const{isShow:o,caption:a,oneCaption:r,oneURI:g,oneJsonProp:c,twoCaption:h,twoURI:w,twoJsonProp:d,threeCaption:v,msgOnNotSelected:m,toTopLayer:S,onAbout:x,loadFn:b,onLoad:P,onShow:V,onClose:Z}=e,[y,C]=(0,n.Z)(!1),[I,T,W,j,A,L,Q,f]=(0,s.Z)({onAbout:x,onClose:Z,toggleOptions:C}),E=(0,t.sO)(),[D,O]=(0,i.Z)(),[k,N]=(0,i.Z)(),_=(0,t.I4)((()=>{const o=(0,t.eA)(E),{msg:a=[]}=o.getValidation();if(0===a.length){const{one:a,two:t}=o.getValues();P(b(e,{one:O(),two:a,three:t,tradeFlow:N()})),Q()}else L(a)}),[]);return(0,u.jsxs)(l.Z.DraggableDialog,{isShow:o,caption:a,menuModel:W,toTopLayer:S,onLoad:_,onShow:V,onClose:f,children:[(0,u.jsx)(l.Z.Toolbar,{isShow:I,buttons:j}),(0,u.jsx)(l.Z.SelectWithLoad,{isShow:o,isShowLabels:T,uri:g,jsonProp:c,caption:r,placeholder:"Default: All",onSelect:D}),(0,u.jsx)(l.Z.SelectOneTwo,{ref:E,isShow:o,isShowLabels:T,uri:w,oneCaption:h,oneJsonProp:d,twoCaption:v,msgOnNotSelected:m}),(0,u.jsx)(l.Z.ShowHide,{isShow:y,children:(0,u.jsx)(l.Z.RowInputSelect,{isShowLabels:T,caption:"Trade Flow",placeholder:"Default: Export Value",options:p,onSelect:k})}),(0,u.jsx)(l.Z.ValidationMessages,{validationMessages:A})]})}))}}}]);