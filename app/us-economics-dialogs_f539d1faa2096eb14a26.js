"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[399],{5091:(o,e,t)=>{t.d(e,{Z:()=>a});var s=t(1768);const a=(o,e)=>{const t=(0,s.eA)(o);if(t){const{isValid:o,datesMsg:s}=t.getValidation();o||e.push(s)}}},4146:(o,e,t)=>{t.r(e),t.d(e,{default:()=>g});var s=t(1768),a=t(6016),i=t(1926),n=t(5868),l=t(7286),r=t(5091),d=t(4868),p=t(5893);const c={margin:10,marginTop:16,fontWeight:"bold"},h=o=>!!o&&"Z"===o.value,u=/^\d{5}$/,w=o=>u.test(o.trim()),g={Zillow:(0,a.Z)((o=>{let{isShow:e,caption:t,oneCaption:a,oneURI:u,oneJsonProp:g,twoCaption:S,twoURI:Z,twoJsonProp:m,threeCaption:b,msgOnNotSelected:f,initFromDate:C,initToDate:j,msgOnNotValidFormat:v,onTestDate:D,dataColumn:V,loadId:x,dataSource:T,toTopLayer:L,onAbout:O,fnValue:I,onLoad:A,onShow:F,onClose:y}=o;const[M,N]=(0,i.Z)(!1),[P,k]=(0,i.Z)(!1),[H,_,J,R,U,W,q]=(0,l.Z)({onAbout:O,onClose:y,toggleDate:k}),z=(0,s.sO)(),K=(0,s.sO)(),$=(0,s.sO)(),[B,E]=(0,n.Z)(),G=(0,s.I4)((o=>{N(h(o))}),[]),Q=(0,s.I4)((()=>{const o=[],e=E(),t=(0,s.eA)(z),{one:i}=t.getValues(),n=(0,s.eA)(K);if(e||o.push(f(a)),h(i))n.isValid()||o.push("Zip Code is not valid");else{const{msg:e=[]}=t.getValidation();0!==e.length&&o.push(...e)}if((0,r.Z)($,o),0===o.length){const{one:o,two:e}=t.getValues(),a=n.getValue(),l=h(o),r=l?{value:a,caption:a}:e,d="function"==typeof I?I(i.value,o.value,r.value):void 0,p=(0,s.eA)($);A({...p.getValues(),title:o.caption+": "+r.caption,subtitle:i.caption,isKeyFeature:l,value:d,dataColumn:V,loadId:x,dataSource:T})}W(o)}),[]);return(0,p.jsxs)(d.Z.DraggableDialog,{isShow:e,caption:t,menuModel:J,toTopLayer:L,onLoad:Q,onShow:F,onClose:q,children:[(0,p.jsx)(d.Z.Toolbar,{isShow:H,buttons:R}),(0,p.jsx)(d.Z.SelectWithLoad,{isShow:e,isShowLabels:_,uri:u,jsonProp:g,caption:a,optionNames:"Items",onSelect:B}),(0,p.jsx)(d.Z.SelectOneTwo,{ref:z,isShow:e,isShowLabels:_,isHideTwo:M,uri:Z,oneCaption:S,oneJsonProp:m,twoCaption:b,msgOnNotSelected:f,onSelectOne:G}),(0,p.jsx)(d.Z.ShowHide,{isShow:M,children:(0,p.jsx)(d.Z.RowPattern,{ref:K,isShowLabels:_,caption:"*Zip Code",placeholder:"Zip Code, 5 Digits",onTest:w,errorMsg:"5 digits format is required"})}),(0,p.jsx)(d.Z.ShowHide,{isShow:P,children:(0,p.jsx)(d.Z.DatesFragment,{ref:$,isShowLabels:_,initFromDate:C,initToDate:j,msgOnNotValidFormat:v,onTestDate:D})}),(0,p.jsx)(d.Z.ShowHide,{isShow:M,children:(0,p.jsx)("div",{style:c,children:"*Data present not for all zip codes"})}),(0,p.jsx)(d.Z.ValidationMessages,{validationMessages:U})]})}))}}}]);