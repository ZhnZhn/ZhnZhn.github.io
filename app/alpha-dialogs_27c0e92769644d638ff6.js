"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[57],{4176:(o,e,t)=>{t.r(e),t.d(e,{default:()=>I});var n=t(9999),r=t(6016),a=t(1926),s=t(5861),i=t(5868),l=t(6490),c=t(9643),d=t(1887),h=t(5893);const p=Number.isNaN,u=o=>""===(o+"").trim(),S=o=>!u(o),w=(o,e)=>t=>{if(u(t))return!0;const n=parseInt((t+"").trim(),10);return!p(n)&&n>o&&n<e},b=w(0,201),Z=w(250,2500),g=(o,e)=>{switch(o){case"MACD":return"MACD(12, 24, 9)";case"STOCH":return"STOCH(5, 3, 3, SMA)";default:return o+" ("+e+")"}},A=(o,e)=>(0,n.VP)(o)&&(0,n.d9)(o)||e,x=(0,r.Z)((o=>{let{isShow:e,caption:t,oneURI:r,oneJsonProp:p,oneCaption:u,toTopLayer:w,onAbout:x,loadId:L,onLoad:f,onShow:y,onClose:C}=o;const[T,I]=(0,l.Z)(x),[j,m]=(0,a.Z)(),[D,k]=(0,a.Z)(!0),M=(0,c.Z)({toggleLabels:k,toggleOptions:m,onAbout:x}),P=(0,n.sO)(),N=(0,n.sO)(),R=(0,n.sO)(),[O,v,E]=(0,s.Z)(!1),[V,_]=(0,i.Z)(),H=(0,n.I4)((()=>{const o=A(N,30),e=A(R,501),t=A(P),r=(_()||{}).value||"SMA";f({loadId:L,indicator:r,ticket:t,period:o,forDays:e,value:g(r,o),hasSecondYAxis:(0,n.eA)(O)})}),[]);return(0,h.jsxs)(d.Z.DraggableDialog,{isShow:e,caption:t,menuModel:I,toTopLayer:w,onLoad:H,onShow:y,onClose:C,children:[(0,h.jsx)(d.Z.Toolbar,{isShow:T,buttons:M}),(0,h.jsx)(d.Z.RowPattern,{ref:P,isShowLabels:D,caption:"Stock",placeholder:"Nyse or Nasdaq Symbol",onTest:S,errorMsg:"Not Empty"}),(0,h.jsx)(d.Z.SelectWithLoad,{isShow:e,isShowLabels:D,uri:r,jsonProp:p,caption:u,optionNames:"Items",placeholder:"Default: SMA (30)",onSelect:V}),(0,h.jsxs)(d.Z.ShowHide,{isShow:j,children:[(0,h.jsx)(d.Z.RowPattern,{ref:N,isShowLabels:D,caption:"Period",placeholder:"Default: 30",onTest:b,errorMsg:"Number in range 1-200"}),(0,h.jsx)(d.Z.RowPattern,{ref:R,isShowLabels:D,caption:"For Days",placeholder:"Default: 501 (2 Years)",onTest:Z,errorMsg:"Number in range 250-2500"})]}),(0,h.jsx)(d.Z.RowCheckBox,{initValue:!1,caption:"Add Seria with Second YAxis",onCheck:v,onUnCheck:E})]})})),L={width:300},f={paddingRight:16},y=(0,r.Z)((o=>{let{isShow:e,caption:t,toTopLayer:r,onAbout:a,loadId:s,dfSubId:i,onLoad:p,onShow:u,onClose:S}=o;const[w,b]=(0,l.Z)(a),Z=(0,c.Z)({onAbout:a}),g=(0,n.I4)((()=>{p({loadId:s,dfSubId:i,indicator:"SECTOR"})}),[]);return(0,h.jsxs)(d.Z.DraggableDialog,{isShow:e,style:L,caption:t,menuModel:b,toTopLayer:r,onLoad:g,onShow:u,onClose:S,children:[(0,h.jsx)(d.Z.Toolbar,{isShow:w,buttons:Z}),(0,h.jsx)(d.Z.RowText,{style:f,caption:"AV:",text:"Sector Performances"})]})}));var C=t(6612),T=t(1291);const I={Indicator:x,Sector:y,Search:(0,r.Z)((o=>{let{isShow:e,caption:t,getKey:n,loadId:r,toTopLayer:s,onAbout:i,onError:p,onClose:u}=o;const[S,w]=(0,l.Z)(i),[b,Z]=(0,a.Z)(!0),g=(0,c.Z)({toggleLabels:Z,onAbout:i}),A=(0,C.Z)((()=>({...T.Z,onError:p,crUrlOptions:()=>{const o=n(r);if(o)return{apiKey:o};p("API key from Alpha Vantage is required","Without API Key")}})));return(0,h.jsxs)(d.Z.DraggableDialog,{isShow:e,caption:t,menuModel:w,toTopLayer:s,onClose:u,children:[(0,h.jsx)(d.Z.Toolbar,{isShow:S,buttons:g}),(0,h.jsx)(d.Z.RowInputSearch,{isShowLabels:b,caption:"Token",searchApi:A})]})}))}}}]);