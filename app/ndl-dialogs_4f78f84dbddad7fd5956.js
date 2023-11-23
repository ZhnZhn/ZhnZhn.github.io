"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[875],{6235:(o,e,t)=>{t.d(e,{T:()=>l,V:()=>r});var a=t(9916),n=t(5893);const i={color:"#607d8b"},s={color:"#232f3b"},l=o=>{let{onClick:e}=o;return(0,n.jsx)(a.Z,{style:i,caption:"Load",title:"Load Item to Container",onClick:e})},r=o=>{let{onClick:e}=o;return(0,n.jsx)(a.Z,{style:s,caption:"Show",title:"Show Item Container",onClick:e})}},5091:(o,e,t)=>{t.d(e,{Z:()=>n});var a=t(9999);const n=(o,e)=>{const t=(0,a.eA)(o);if(t){const{isValid:o,datesMsg:a}=t.getValidation();o||e.push(a)}}},16:(o,e,t)=>{t.d(e,{Z:()=>n});var a=t(5091);const n=(o,e,t)=>{const n=o.reduce(((o,t)=>(t[0]||o.push(e(t[1])),o)),[]);return(0,a.Z)(t,n),n}},1426:(o,e,t)=>{t.r(e),t.d(e,{default:()=>K});var a=t(9999),n=t(6016),i=t(1926),s=t(6612),l=t(5868),r=t(3683),c=t(6490),d=t(157),u=t(1868),p=t(16),h=t(6485),S=t(9916),g=t(4868),m=t(6235),w=t(5893);const T={color:"#232f3b"},Z="First Load Meta",v="Select...",C="Default Empty",b="Import - Trade (USD)",L="Export - Trade (USD)",x="Re-Import - Trade (USD)",D="Re-Export - Trade (USD)",j=o=>({caption:o,value:o}),y=[{caption:"Default: Empty Filter",value:C},j(b),j("Import - Weight (Kg)"),j(L),j("Export - Weight (Kg)"),j(x),j(D)],F=[{caption:"Default: Area",value:h.rb},{caption:"Semi Donut: Total Top90, On Every Year: Recent 2 Years",value:h.yE},{caption:"Stacked Area: Total Top90, On Recent Year",value:h.m3},{caption:"Stacked Area Percent: Total Top90, On Recent Year",value:h.VJ},{caption:"Stacked Column: Total Top90, On Recent Year",value:h.q_},{caption:"Stacked Column Percent: Total Top90, On Recent Year",value:h.P0},{caption:"Tree Map: On Recent Year",value:h.ri}],O=o=>e=>-1!==e.caption.indexOf(o),f=(o,e)=>{let t;if(o&&e){const a=o.value;a!==C&&(t=e.filter(O(a)),a===b&&(t=t.filter(O(x))),a===L&&(t=t.filter(O(D))))}return t||e},I=o=>!o||o.value===h.rb,V="Click to toggle",R={optionTrades:[],placeholderTrade:Z,isLoadingTradeFailed:!1,isLoadingTrade:!1},A=(0,n.Z)((o=>{const{isShow:e,countryURI:t,countryJsonProp:n,commodityURI:C,commodityJsonProp:b,initFromDate:L,initToDate:x,onTestDate:D,msgOnNotValidFormat:j,msgOnNotSelected:O,dataColumn:A,loadId:M,dataSource:N,toTopLayer:k,onAbout:Y,fnValue:E,onLoad:P,onShow:U,onClose:J}=o,[$,K]=(0,c.Z)(Y),[W,H]=(0,i.Z)(!0),[B,_]=(0,i.Z)(!1),[q,Q]=(0,i.Z)(!1),[z,G]=(0,i.Z)(!1),X=(0,s.Z)((()=>[(0,d.Z)("L",`${V} input labels`,H),(0,d.Z)("F",`${V} filter input`,_),(0,d.Z)("D",`${V} date input`,Q),(0,d.Z)("C",`${V} chart type input`,G),(0,d.Z)("A","About datasource",Y)])),[oo,eo,to]=(0,u.Z)(J),[ao,no]=(0,a.eJ)(R),{isLoadingTrade:io,isLoadingTradeFailed:so,optionTrades:lo,placeholderTrade:ro}=ao,[co,uo]=(0,a.eJ)(!0),po=(0,a.sO)(),[ho,So]=(0,l.Z)(),[go,mo]=(0,l.Z)(),[wo,To]=(0,l.Z)(),[Zo,vo]=(0,l.Z)(),[Co,bo]=(0,l.Z)(),[Lo,xo]=(0,l.Z)(),Do=(0,a.I4)((()=>{Zo(),Co(),no(R)}),[]),jo=(0,a.I4)((o=>{ho(o),Do()}),[]),yo=(0,a.I4)((o=>{go(o),Do()}),[]),Fo=(0,a.I4)((o=>{Lo(o);const e=I(o);uo(e),_(!e)}),[]),Oo=(0,a.I4)((()=>{const o=So(),e=mo(),t=[[o,"Country"],[e,"Chapter"]],n=(0,p.Z)(t,O,po);0===n.length&&(P({...(0,a.eA)(po).getValues(),loadId:M,isLoadMeta:!0,value:E(e.value,o.value),onLoad:o=>{Co(o),no({optionTrades:f(To(),bo()),isLoadingTrade:!1,isLoadingTradeFailed:!1,placeholderTrade:v})},onCancel:()=>no((o=>({...o,isLoadingTrade:!1,isLoadingTradeFailed:!1,placeholderTrade:v}))),onFailed:()=>no((o=>({...o,isLoadingTrade:!1,isLoadingTradeFailed:!0})))}),no((o=>({...o,isLoadingTrade:!0})))),eo(n)}),[]),fo=(0,r.Z)((()=>{const o=[],e=xo(),t=vo(),n=To();if(I(e)?t||o.push(O("Subheading")):(ro===Z&&o.push(Z),n||o.push(O("Trade Filter"))),0===o.length){const o=So(),i=mo(),s=t?t.value:A,l=e?e.value:h.rb,r=n?`${o.caption}:${n.caption}`:`${o.caption}`,c=I(e)?void 0:((o,e)=>{const t=o.value.length+2;return e.map((o=>{let{value:e,caption:a}=o;return a=a.substring(0,a.length-t),{caption:a,value:e}}))})(n,lo);P({...(0,a.eA)(po).getValues(),value:E(i.value,o.value),dataColumn:s,seriaType:l,sliceItems:c,title:r,subtitle:i.caption,loadId:M,dataSource:N})}eo(o)})),Io=(0,a.Ye)((()=>[(0,w.jsx)(S.Z,{style:T,caption:"Load Meta",title:"First Load Meta, then Load Item",onClick:Oo},"meta"),(0,w.jsx)(m.T,{onClick:fo},"load")]),[]);return(0,w.jsxs)(g.Z.DraggableDialog,{isShow:e,caption:"United Nations Commodity Trade",menuModel:K,commandButtons:Io,toTopLayer:k,onShow:U,onClose:to,children:[(0,w.jsx)(g.Z.Toolbar,{isShow:$,buttons:X}),(0,w.jsx)(g.Z.SelectWithLoad,{isShow:e,isShowLabels:W,uri:t,jsonProp:n,caption:"Country:",optionNames:"Countries",onSelect:jo}),(0,w.jsx)(g.Z.SelectWithLoad,{isShow:e,isShowLabels:W,uri:C,jsonProp:b,caption:"Chapter:",optionNames:"Chapters",onSelect:yo}),(0,w.jsx)(g.Z.ShowHide,{isShow:B,children:(0,w.jsx)(g.Z.RowInputSelect,{isShowLabels:W,caption:"Filter Trade:",options:y,placeholder:"Filter...",onSelect:wo})}),(0,w.jsx)(g.Z.ShowHide,{isShow:co,children:(0,w.jsx)(g.Z.RowInputSelect,{isShowLabels:W,caption:"Subheading:",options:lo,optionNames:"Meta",isLoading:io,isLoadingFailed:so,placeholder:ro,onLoadOption:Oo,onSelect:Zo})}),(0,w.jsx)(g.Z.ShowHide,{isShow:q,children:(0,w.jsx)(g.Z.DatesFragment,{ref:po,isShowLabels:W,initFromDate:L,initToDate:x,msgOnNotValidFormat:j,onTestDate:D})}),(0,w.jsx)(g.Z.ShowHide,{isShow:z,children:(0,w.jsx)(g.Z.RowInputSelect,{isShowLabels:W,caption:"Chart Type:",options:F,onSelect:Fo})}),(0,w.jsx)(g.Z.ValidationMessages,{validationMessages:oo})]})}));var M=t(7286);const N=[{caption:"2021",value:2021},{caption:"2020",value:2020},{caption:"2019",value:2019},{caption:"2018",value:2018},{caption:"2017",value:2017},{caption:"2016",value:2016},{caption:"2015",value:2015},{caption:"2014",value:2014},{caption:"2013",value:2013},{caption:"2012",value:2012}],k=(0,n.Z)((o=>{const{isShow:e,isFd:t,caption:n,futuresURI:i,msgOnNotSelected:s,msgOnNotValidFormat:r,initFromDate:c,isYmdOrEmpty:d,errNotYmdOrEmpty:u,toTopLayer:p,onAbout:h,loadFn:S,onLoad:m,onShow:T,onClose:Z}=o,[v,C,b,L,x,D,j]=(0,M.Z)({onAbout:h,onClose:Z}),y=(0,a.sO)(),F=(0,a.sO)(),[O,f]=(0,l.Z)(),I=(0,a.I4)((()=>{const e=[],n=(0,a.eA)(y),{msg:i=[]}=n.getValidation(),l=f(),c=(0,a.eA)(F);if(e.push(...i),l||e.push(s("Year")),t&&!c.isValid()&&e.push(r("From Date")),0===e.length){const{one:e,two:a}=n.getValues(),i=t?c.getValue():void 0;m(S(o,{item:e,month:a,year:l,fromDate:i}))}D(e)}),[]);return(0,w.jsxs)(g.Z.DraggableDialog,{isShow:e,caption:n,menuModel:b,toTopLayer:p,onLoad:I,onShow:T,onClose:j,children:[(0,w.jsx)(g.Z.Toolbar,{isShow:v,buttons:L}),(0,w.jsx)(g.Z.SelectOneTwo,{ref:y,isShow:e,isShowLabels:C,uri:i,oneCaption:"Futures",oneOptionNames:"Futures",oneJsonProp:"futures",twoCaption:"Month",msgOnNotSelected:s}),(0,w.jsx)(g.Z.RowInputSelect,{isShowLabels:C,caption:"Year",options:N,onSelect:O}),t&&(0,w.jsx)(g.Z.RowDate,{innerRef:F,isShowLabels:C,title:"From Date:",initialValue:c,errorMsg:u,onTest:d}),(0,w.jsx)(g.Z.ValidationMessages,{validationMessages:x})]})})),Y=[{caption:"Continuous Contract #1",value:1},{caption:"Continuous Contract #2",value:2},{caption:"Continuous Contract #3",value:3},{caption:"Continuous Contract #4",value:4},{caption:"Continuous Contract #5",value:5}],E=(0,n.Z)((o=>{const{isShow:e,isFd:t,caption:n,futuresURI:i,msgOnNotSelected:s,msgOnNotValidFormat:r,initFromDate:c,isYmdOrEmpty:d,errNotYmdOrEmpty:u,toTopLayer:p,onAbout:h,loadFn:S,onLoad:m,onShow:T,onClose:Z}=o,[v,C,b,L,x,D,j]=(0,M.Z)({onAbout:h,onClose:Z}),[y,F]=(0,l.Z)(),O=(0,a.sO)(),f=(0,a.sO)(),I=(0,a.I4)((()=>{const e=[],n=(0,a.eA)(O),{msg:i=[]}=n.getValidation(),l=F(),c=(0,a.eA)(f);if(e.push(...i),l||e.push(s("Type")),t&&!c.isValid()&&e.push(r("From Date")),0===e.length){const{one:e,two:a}=n.getValues(),i=t?c.getValue():void 0;m(S(o,{exchange:e,item:a,type:l,fromDate:i}))}D(e)}),[]);return(0,w.jsxs)(g.Z.DraggableDialog,{isShow:e,caption:n,menuModel:b,toTopLayer:p,onLoad:I,onShow:T,onClose:j,children:[(0,w.jsx)(g.Z.Toolbar,{isShow:v,buttons:L}),(0,w.jsx)(g.Z.SelectOneTwo,{ref:O,isShow:e,isShowLabels:C,uri:i,oneCaption:"Exchange",oneOptionNames:"Exchanges",oneJsonProp:"futures",twoCaption:"Asset",msgOnNotSelected:s}),(0,w.jsx)(g.Z.RowInputSelect,{isShowLabels:C,caption:"Type",options:Y,onSelect:y}),t&&(0,w.jsx)(g.Z.RowDate,{innerRef:f,isShowLabels:C,title:"From Date:",initialValue:c,errorMsg:u,onTest:d}),(0,w.jsx)(g.Z.ValidationMessages,{validationMessages:x})]})}));var P=t(5091);const U=[{caption:"Thousand Barrels per day (kb/d)",value:"KD"},{caption:"Thousand Barrels (kbbl)",value:"KB"},{caption:"Thousand Kilolitres (kl)",value:"KL"},{caption:"Thousand Metric Tons (kmt)",value:"KT"},{caption:"Conversion factor barrels/ktons",value:"BK"}],J=U[0],$=[{caption:"AreaSpline",value:h.rb},{caption:"Yearly by Month",value:h.Qh}],K={UNCommodityTrade:A,Futures3:k,FuturesWiki:E,JodiWorldOil:(0,n.Z)((o=>{let{isShow:e,caption:t,oneCaption:n,oneURI:s,oneJsonProp:r,parentCaption:c,parentChildURI:d,parentJsonProp:u,childCaption:p,msgOnNotSelected:h,initFromDate:S,initToDate:m,msgOnNotValidFormat:T,onTestDate:Z,dataColumn:v,loadId:C,dataSource:b,toTopLayer:L,onAbout:x,fnValue:D,onLoad:j,onShow:y,onClose:F}=o;const[O,f]=(0,i.Z)(!1),[I,V]=(0,i.Z)(!1),[R,A,N,k,Y,E,K]=(0,M.Z)({onAbout:x,onClose:F,toggleDate:f,toggleOptions:V}),[W,H]=(0,l.Z)(),[B,_]=(0,l.Z)(),[q,Q]=(0,l.Z)(),z=(0,a.sO)(),G=(0,a.sO)(),X=(0,a.I4)((()=>{const o=[],e=H(),t=(0,a.eA)(z),{msg:n=[]}=t.getValidation(),i=_()||J;if(e||o.push(h("Country")),o.push(...n),(0,P.Z)(G,o),0===o.length){const o=(0,a.eA)(G),{one:n,two:s}=t.getValues(),{value:l}=Q()||{};j({...o.getValues(),value:D(e.value,n.value,s.value,i.value),title:`${e.caption}: ${n.caption}`,subtitle:`${s.caption}: ${i.caption}`,seriaType:l,dataColumn:v,loadId:C,dataSource:b})}E(o)}),[]);return(0,w.jsxs)(g.Z.DraggableDialog,{isShow:e,caption:t,menuModel:N,toTopLayer:L,onLoad:X,onShow:y,onClose:K,children:[(0,w.jsx)(g.Z.Toolbar,{isShow:R,buttons:k}),(0,w.jsx)(g.Z.SelectWithLoad,{isShow:e,isShowLabels:A,uri:s,jsonProp:r,caption:n,optionNames:"Items",onSelect:W}),(0,w.jsx)(g.Z.SelectOneTwo,{ref:z,isShow:e,isShowLabels:A,uri:d,oneCaption:c,oneJsonProp:u,twoCaption:p,msgOnNotSelected:h}),(0,w.jsx)(g.Z.RowInputSelect,{isShowLabels:A,caption:"Units",options:U,onSelect:B}),(0,w.jsx)(g.Z.ShowHide,{isShow:O,children:(0,w.jsx)(g.Z.DatesFragment,{ref:G,isShowLabels:A,initFromDate:S,initToDate:m,msgOnNotValidFormat:T,onTestDate:Z})}),(0,w.jsx)(g.Z.ShowHide,{isShow:I,children:(0,w.jsx)(g.Z.RowInputSelect,{isShowLabels:A,caption:"Chart Type",placeholder:"Default: AreaSpline",options:$,onSelect:q})}),(0,w.jsx)(g.Z.ValidationMessages,{validationMessages:Y})]})}))}}}]);