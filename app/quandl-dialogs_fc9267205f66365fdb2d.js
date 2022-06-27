"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[861],{7915:(o,e,t)=>{t.r(e),t.d(e,{default:()=>U});var a=t(9999),n=t(6016),i=t(1926),s=t(6612),l=t(5868),r=t(3683),u=t(6490),p=t(157),c=t(1868),d=t(16),h=t(6485),S=t(6623),g=t(5893);const m={color:"#232f3b"},w="First Load Meta",T="Select...",Z="Default Empty",v="Import - Trade (USD)",C="Export - Trade (USD)",L="Re-Import - Trade (USD)",b="Re-Export - Trade (USD)",x=o=>({caption:o,value:o}),D=[{caption:"Default: Empty Filter",value:Z},x(v),x("Import - Weight (Kg)"),x(C),x("Export - Weight (Kg)"),x(L),x(b)],F=[{caption:"Default: Area",value:h.rb},{caption:"Semi Donut: Total Top90, On Every Year: Recent 2 Years",value:h.yE},{caption:"Stacked Area: Total Top90, On Recent Year",value:h.m3},{caption:"Stacked Area Percent: Total Top90, On Recent Year",value:h.VJ},{caption:"Stacked Column: Total Top90, On Recent Year",value:h.q_},{caption:"Stacked Column Percent: Total Top90, On Recent Year",value:h.P0},{caption:"Tree Map: On Recent Year",value:h.ri}],j=o=>e=>-1!==e.caption.indexOf(o),O=(o,e)=>{let t;if(o&&e){const a=o.value;a!==Z&&(t=e.filter(j(a)),a===v&&(t=t.filter(j(L))),a===C&&(t=t.filter(j(b))))}return t||e},y=o=>!o||o.value===h.rb,f={optionTrades:[],placeholderTrade:w,isLoadingTradeFailed:!1,isLoadingTrade:!1},I=(0,n.Z)((o=>{const{isShow:e,countryURI:t,countryJsonProp:n,commodityURI:Z,commodityJsonProp:v,initFromDate:C,initToDate:L,onTestDate:b,msgOnNotValidFormat:x,msgOnNotSelected:j,dataColumn:I,loadId:V,dataSource:R,toTopLayer:A,onAbout:M,fnValue:N,onLoad:k,onShow:Y,onClose:E}=o,[P,U]=(0,u.Z)(M),[J,K]=(0,i.Z)(!0),[B,W]=(0,i.Z)(!1),[H,_]=(0,i.Z)(!1),[q,Q]=(0,i.Z)(!1),z=(0,s.Z)((()=>[(0,p.Z)("L","Click to toggle input labels",K),(0,p.Z)("F","Click to toggle filter input",W),(0,p.Z)("D","Click to toggle date input",_),(0,p.Z)("C","Click to toggle chart type input",Q),(0,p.Z)("A","About datasource",M)])),[G,X,$]=(0,c.Z)(),[oo,eo]=(0,a.eJ)(f),{isLoadingTrade:to,isLoadingTradeFailed:ao,optionTrades:no,placeholderTrade:io}=oo,[so,lo]=(0,a.eJ)(!0),ro=(0,a.sO)(),[uo,po]=(0,l.Z)(),[co,ho]=(0,l.Z)(),[So,go]=(0,l.Z)(),[mo,wo]=(0,l.Z)(),[To,Zo]=(0,l.Z)(),[vo,Co]=(0,l.Z)(),Lo=(0,a.I4)((()=>{mo(),To(),eo(f)}),[]),bo=(0,a.I4)((o=>{uo(o),Lo()}),[]),xo=(0,a.I4)((o=>{co(o),Lo()}),[]),Do=(0,a.I4)((o=>{vo(o);const e=y(o);lo(e),W(!e)}),[]),Fo=(0,a.I4)((()=>{const o=po(),e=ho(),t=[[o,"Country"],[e,"Chapter"]],n=(0,d.Z)(t,j,ro);0===n.length?(k({...(0,a.eA)(ro).getValues(),loadId:V,isLoadMeta:!0,value:N(e.value,o.value),onLoad:o=>{To(o),eo({optionTrades:O(go(),Zo()),isLoadingTrade:!1,isLoadingTradeFailed:!1,placeholderTrade:T})},onCancel:()=>eo((o=>({...o,isLoadingTrade:!1,isLoadingTradeFailed:!1,placeholderTrade:T}))),onFailed:()=>eo((o=>({...o,isLoadingTrade:!1,isLoadingTradeFailed:!0})))}),eo((o=>({...o,isLoadingTrade:!0}))),$()):X(n)}),[]),jo=(0,r.Z)((()=>{const o=[],e=Co(),t=wo(),n=go();if(y(e)?t||o.push(j("Subheading")):(io===w&&o.push(w),n||o.push(j("Trade Filter"))),0===o.length){const o=po(),i=ho(),s=t?t.value:I,l=e?e.value:h.rb,r=n?o.caption+":"+n.caption:""+o.caption,u=y(e)?void 0:((o,e)=>{const t=o.value.length+2;return e.map((o=>{let{value:e,caption:a}=o;return a=a.substring(0,a.length-t),{caption:a,value:e}}))})(n,no);k({...(0,a.eA)(ro).getValues(),value:N(i.value,o.value),dataColumn:s,seriaType:l,sliceItems:u,title:r,subtitle:i.caption,loadId:V,dataSource:R}),$()}else X(o)})),Oo=(0,a.Ye)((()=>[(0,g.jsx)(S.Z.Button.Flat,{style:m,caption:"Load Meta",title:"First Load Meta, then Load Item",onClick:Fo},"meta"),(0,g.jsx)(S.Z.Button.Load,{onClick:jo},"load")]),[]),yo=(0,a.I4)((()=>{E(),$()}),[]);return(0,g.jsxs)(S.Z.DraggableDialog,{isShow:e,caption:"United Nations Commodity Trade",menuModel:U,commandButtons:Oo,toTopLayer:A,onShow:Y,onClose:yo,children:[(0,g.jsx)(S.Z.Toolbar,{isShow:P,buttons:z}),(0,g.jsx)(S.Z.SelectWithLoad,{isShow:e,isShowLabels:J,uri:t,jsonProp:n,caption:"Country:",optionNames:"Countries",onSelect:bo}),(0,g.jsx)(S.Z.SelectWithLoad,{isShow:e,isShowLabels:J,uri:Z,jsonProp:v,caption:"Chapter:",optionNames:"Chapters",onSelect:xo}),(0,g.jsx)(S.Z.ShowHide,{isShow:B,children:(0,g.jsx)(S.Z.RowInputSelect,{isShowLabels:J,caption:"Filter Trade:",options:D,placeholder:"Filter...",onSelect:So})}),(0,g.jsx)(S.Z.ShowHide,{isShow:so,children:(0,g.jsx)(S.Z.RowInputSelect,{isShowLabels:J,caption:"Subheading:",options:no,optionNames:"Meta",isLoading:to,isLoadingFailed:ao,placeholder:io,onLoadOption:Fo,onSelect:mo})}),(0,g.jsx)(S.Z.ShowHide,{isShow:H,children:(0,g.jsx)(S.Z.DatesFragment,{ref:ro,isShowLabels:J,initFromDate:C,initToDate:L,msgOnNotValidFormat:x,onTestDate:b})}),(0,g.jsx)(S.Z.ShowHide,{isShow:q,children:(0,g.jsx)(S.Z.RowInputSelect,{isShowLabels:J,caption:"Chart Type:",options:F,onSelect:Do})}),(0,g.jsx)(S.Z.ValidationMessages,{validationMessages:G})]})}));var V=t(7286);const R=[{caption:"2021",value:2021},{caption:"2020",value:2020},{caption:"2019",value:2019},{caption:"2018",value:2018},{caption:"2017",value:2017},{caption:"2016",value:2016},{caption:"2015",value:2015},{caption:"2014",value:2014},{caption:"2013",value:2013},{caption:"2012",value:2012}],A=(0,n.Z)((o=>{const{isShow:e,isFd:t,caption:n,futuresURI:i,msgOnNotSelected:s,msgOnNotValidFormat:r,initFromDate:u,isYmdOrEmpty:p,errNotYmdOrEmpty:c,toTopLayer:d,onAbout:h,loadFn:m,onLoad:w,onShow:T,onClose:Z}=o,[v,C,L,b,x,D,F,j]=(0,V.Z)({onAbout:h,onClose:Z}),O=(0,a.sO)(),y=(0,a.sO)(),[f,I]=(0,l.Z)(),A=(0,a.I4)((()=>{const e=[],n=(0,a.eA)(O),{msg:i=[]}=n.getValidation(),l=I(),u=(0,a.eA)(y);if(e.push(...i),l||e.push(s("Year")),t&&!u.isValid()&&e.push(r("From Date")),0===e.length){const{one:e,two:a}=n.getValues(),i=t?u.getValue():void 0;w(m(o,{item:e,month:a,year:l,fromDate:i})),F()}else D(e)}),[]);return(0,g.jsxs)(S.Z.DraggableDialog,{isShow:e,caption:n,menuModel:L,toTopLayer:d,onLoad:A,onShow:T,onClose:j,children:[(0,g.jsx)(S.Z.Toolbar,{isShow:v,buttons:b}),(0,g.jsx)(S.Z.SelectOneTwo,{ref:O,isShow:e,isShowLabels:C,uri:i,oneCaption:"Futures",oneOptionNames:"Futures",oneJsonProp:"futures",twoCaption:"Month",msgOnNotSelected:s}),(0,g.jsx)(S.Z.RowInputSelect,{isShowLabels:C,caption:"Year",options:R,onSelect:f}),t&&(0,g.jsx)(S.Z.RowDate,{innerRef:y,isShowLabels:C,title:"From Date:",initialValue:u,errorMsg:c,onTest:p}),(0,g.jsx)(S.Z.ValidationMessages,{validationMessages:x})]})})),M=[{caption:"Continuous Contract #1",value:1},{caption:"Continuous Contract #2",value:2},{caption:"Continuous Contract #3",value:3},{caption:"Continuous Contract #4",value:4},{caption:"Continuous Contract #5",value:5}],N=(0,n.Z)((o=>{const{isShow:e,isFd:t,caption:n,futuresURI:i,msgOnNotSelected:s,msgOnNotValidFormat:r,initFromDate:u,isYmdOrEmpty:p,errNotYmdOrEmpty:c,toTopLayer:d,onAbout:h,loadFn:m,onLoad:w,onShow:T,onClose:Z}=o,[v,C,L,b,x,D,F,j]=(0,V.Z)({onAbout:h,onClose:Z}),[O,y]=(0,l.Z)(),f=(0,a.sO)(),I=(0,a.sO)(),R=(0,a.I4)((()=>{const e=[],n=(0,a.eA)(f),{msg:i=[]}=n.getValidation(),l=y(),u=(0,a.eA)(I);if(e.push(...i),l||e.push(s("Type")),t&&!u.isValid()&&e.push(r("From Date")),0===e.length){const{one:e,two:a}=n.getValues(),i=t?u.getValue():void 0;w(m(o,{exchange:e,item:a,type:l,fromDate:i})),F()}else D(e)}),[]);return(0,g.jsxs)(S.Z.DraggableDialog,{isShow:e,caption:n,menuModel:L,toTopLayer:d,onLoad:R,onShow:T,onClose:j,children:[(0,g.jsx)(S.Z.Toolbar,{isShow:v,buttons:b}),(0,g.jsx)(S.Z.SelectOneTwo,{ref:f,isShow:e,isShowLabels:C,uri:i,oneCaption:"Exchange",oneOptionNames:"Exchanges",oneJsonProp:"futures",twoCaption:"Asset",msgOnNotSelected:s}),(0,g.jsx)(S.Z.RowInputSelect,{isShowLabels:C,caption:"Type",options:M,onSelect:O}),t&&(0,g.jsx)(S.Z.RowDate,{innerRef:I,isShowLabels:C,title:"From Date:",initialValue:u,errorMsg:c,onTest:p}),(0,g.jsx)(S.Z.ValidationMessages,{validationMessages:x})]})}));var k=t(5091);const Y=[{caption:"Thousand Barrels per day (kb/d)",value:"KD"},{caption:"Thousand Barrels (kbbl)",value:"KB"},{caption:"Thousand Kilolitres (kl)",value:"KL"},{caption:"Thousand Metric Tons (kmt)",value:"KT"},{caption:"Conversion factor barrels/ktons",value:"BK"}],E=Y[0],P=[{caption:"AreaSpline",value:h.rb},{caption:"Yearly by Month",value:h.Qh}],U={UNCommodityTrade:I,Futures3:A,FuturesWiki:N,JodiWorldOil:(0,n.Z)((o=>{let{isShow:e,caption:t,oneCaption:n,oneURI:s,oneJsonProp:r,parentCaption:u,parentChildURI:p,parentJsonProp:c,childCaption:d,msgOnNotSelected:h,initFromDate:m,initToDate:w,msgOnNotValidFormat:T,onTestDate:Z,dataColumn:v,loadId:C,dataSource:L,toTopLayer:b,onAbout:x,fnValue:D,onLoad:F,onShow:j,onClose:O}=o;const[y,f]=(0,i.Z)(!1),[I,R]=(0,i.Z)(!1),[A,M,N,U,J,K,B,W]=(0,V.Z)({onAbout:x,onClose:O,toggleDate:f,toggleOptions:R}),[H,_]=(0,l.Z)(),[q,Q]=(0,l.Z)(),[z,G]=(0,l.Z)(),X=(0,a.sO)(),$=(0,a.sO)(),oo=(0,a.I4)((()=>{const o=[],e=_(),t=(0,a.eA)(X),{msg:n=[]}=t.getValidation(),i=Q()||E;if(e||o.push(h("Country")),o.push(...n),(0,k.Z)(o,$),0===o.length){const o=(0,a.eA)($),{one:n,two:s}=t.getValues(),{value:l}=G()||{};F({...o.getValues(),value:D(e.value,n.value,s.value,i.value),title:e.caption+": "+n.caption,subtitle:s.caption+": "+i.caption,seriaType:l,dataColumn:v,loadId:C,dataSource:L}),B()}else K(o)}),[]);return(0,g.jsxs)(S.Z.DraggableDialog,{isShow:e,caption:t,menuModel:N,toTopLayer:b,onLoad:oo,onShow:j,onClose:W,children:[(0,g.jsx)(S.Z.Toolbar,{isShow:A,buttons:U}),(0,g.jsx)(S.Z.SelectWithLoad,{isShow:e,isShowLabels:M,uri:s,jsonProp:r,caption:n,optionNames:"Items",onSelect:H}),(0,g.jsx)(S.Z.SelectOneTwo,{ref:X,isShow:e,isShowLabels:M,uri:p,oneCaption:u,oneJsonProp:c,twoCaption:d,msgOnNotSelected:h}),(0,g.jsx)(S.Z.RowInputSelect,{isShowLabels:M,caption:"Units",options:Y,onSelect:q}),(0,g.jsx)(S.Z.ShowHide,{isShow:y,children:(0,g.jsx)(S.Z.DatesFragment,{ref:$,isShowLabels:M,initFromDate:m,initToDate:w,msgOnNotValidFormat:T,onTestDate:Z})}),(0,g.jsx)(S.Z.ShowHide,{isShow:I,children:(0,g.jsx)(S.Z.RowInputSelect,{isShowLabels:M,caption:"Chart Type",placeholder:"Default: AreaSpline",options:P,onSelect:z})}),(0,g.jsx)(S.Z.ValidationMessages,{validationMessages:J})]})}))}}}]);