"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[138],{1081:(e,t,o)=>{o.r(t),o.d(t,{default:()=>Te});var s=o(9999),n=o(9468),i=o(9620),a=o(8804),r=o(6623),c=o(9679);var l=o(5893);const u={position:"absolute",top:80,left:"45%",zIndex:10,display:"block",width:32,height:32,opacity:1,transition:"opacity 800ms ease-out"},d={borderColor:"#f44336",animation:"none"},p={opacity:0},h=e=>{let{style:t,status:o}=e;const s=(e=>{const[t,o]=(0,c.useState)(!1);return(0,c.useEffect)((()=>{e||setTimeout((()=>o(!0)),1e3)}),[e]),t})(o),n="L"===o?u:"F"===o?d:p;return s?null:(0,l.jsx)("span",{style:{...u,...t,...n},"data-loader":"circle"})},m=e=>"is"+e+"Select",f=(e,t,o)=>{let{isShowLabels:s,isRow:n,fSelect:i}=o;const{id:a,caption:c,options:u,placeholder:d}=e,p=!n[m(a)];return(0,l.jsx)(r.Z.ShowHide,{isShow:p,children:(0,l.jsx)(r.Z.RowInputSelect,{isShowLabels:s,caption:c,placeholder:d,options:u,onSelect:i(t)})},a)};var g=o(6016),y=o(1926),S=o(5868);const w=()=>{const e=(0,c.useRef)([]),t=(0,c.useCallback)((t=>o=>{e.current[t]=o?{...o}:void 0}),[]);return[e,t]},v=(e,t,o)=>({caption:e,title:t,onClick:o}),C=(e,t,o,s)=>{const[n,i]=(0,y.Z)(!0),a=(0,c.useMemo)((()=>[v("L","Click to toggle input labels",e),v("T","Toggle Inputs",t),v("O","Chart Options",o),v("A","About Datasource",s)]),[]);return[(0,c.useMemo)((()=>(0,l.jsx)(r.Z.Toolbar,{isShow:n,buttons:a})),[n]),i]},b="row__pane-topic not-selected",I=function(e,t,o){return void 0===o&&(o=!0),{cn:b,onClick:t,name:e,isClose:o}},O=(e,t)=>(0,c.useMemo)((()=>({titleCl:b,pageWidth:175,maxPages:1,p0:[I("Toggle ToolBar",e),I("About Datasource",t)]})),[]),T=e=>{const[t,o]=(0,c.useState)(e);return[t,(0,c.useCallback)((()=>o((e=>!e))),[]),(0,c.useCallback)((()=>o(!1)),[])]},D=()=>{const e=(0,c.useRef)({}),[t,o,s]=T(!1),n=(0,c.useCallback)((t=>{e.current[t]=!e.current[t]}),[]);return[(0,c.useMemo)((()=>(0,l.jsx)(r.Z.ModalOptions,{isShow:t,toggleOption:n,onClose:s})),[t]),e,o]};var x=o(1821);const L=e=>{const[t,o]=(0,c.useState)({isShowChart:!0,isShowDate:!1}),s=(0,c.useCallback)((e=>{o((t=>(t[e]=!t[e],{...t})))}),[]);return(0,c.useEffect)((()=>{const t={};let s=!1;e.forEach((e=>{e.dfItem&&(s=!0,t[m(e.id)]=!0)})),o((e=>s?{...e,...t}:e))}),[e]),[t,o,s]},M=e=>{const[t,o,s]=T(!1),[n,i,a]=L(e),{isShowChart:u,isShowDate:d}=n,[p,h,f]=(0,x.Z)();return[(0,c.useMemo)((()=>(0,l.jsx)(r.Z.ModalToggle,{isShow:t,selectProps:e,isShowChart:u,isShowDate:d,crIsId:m,onToggle:a,onCheckCaption:h,onUnCheckCaption:f,onClose:s})),[t,e,u,d]),p,n,i,o]};const F=class{constructor(e){void 0===e&&(e=5e3),this.mls=e,this.isLoading=!1}start(e){return!this.isLoading&&(this.loadingUrl=e,this.isLoading=!0,this.timeoutId=setTimeout((()=>{e===this.loadingUrl&&(this.isLoading=!1)}),this.mls),!0)}stop(){this.isLoading=!1,clearTimeout(this.timeoutId)}},j="time",k="Geo Entity",E=(e,t,o)=>({caption:e,slice:{[t]:o}}),q=e=>e?e.charAt(0).toUpperCase()+e.substring(1):"",A=Object.keys,Z=e=>(e||"").split("_").map(q).join(" "),P=(e,t)=>{const{label:o}=e||{};return A(o||{}).map((e=>({caption:o[e],value:e,id:t})))},_=e=>{const t=[null],o=[];return A(e).forEach((s=>{if(s!==j){const n=e[s],{label:i,category:a}=n||{},r={c:Z(i),v:s,options:P(a,s)};"s_adj"===s?(r.c="Seasonal Adjustment",r.options=(e=>e.options.map((e=>(e.sc=e.value,e.caption=e.caption+" ("+e.value+")",e))))(r),o.push(r)):"geo"===s?(r.c=k,t[0]=r):t.push(r)}})),{dims:t.filter(Boolean).concat(o),timeId:j}},R=e=>{let{values:t,id:o}=e;return(t||[]).map((e=>E(e.text,o,e.id)))},U=e=>{const t=[];let o;return e.forEach((e=>{const{time:s,text:n="",id:i}=e;s?(o=i,t.dateOptions=e.values.map((e=>{let{id:t,text:o}=e;return{caption:o,value:t}})).reverse()):t.push({c:q(n),v:i,options:R(e)})})),{mapFrequency:"Y",dims:t,timeId:o}},B=Array.isArray,Q={month:"M",quarter:"K"},Y=["Tid","Year","Month","Vuosi","Vuosineljännes"],H=(e,t)=>!B(e)||!B(t)||e.length!==t.length,K=e=>{let{values:t,valueTexts:o,code:s}=e;if(!H(t,o))return o.map(((e,o)=>E(e,s,t[o])))},N=e=>{const t=[];let o,s="Y";return e.forEach((e=>{const{code:n,time:i}=e,a=e.text||"";((e,t)=>!e&&-1===Y.indexOf(t)&&-1===(t+"").indexOf("TLIST("))(i,n)?t.push({c:q(a),v:n,options:K(e)}):(o=n,s=Q[a.toLowerCase()],t.dateOptions=(e=>{let{values:t,valueTexts:o}=e;if(H(t,o))return;const s=[];return o.forEach(((e,o)=>{s.push({caption:e,value:t[o]})})),s.reverse()})(e))})),{mapFrequency:s,dims:t,timeId:o}},V=(e,t)=>fetch(e,t).then((e=>{const{status:t,statusText:o}=e;if(t>=200&&t<400)return e.json();if(403===t)throw Error("HTTP Code 403: Forbitten.\nMaybe, require API key.");throw Error("HTTP Code: "+t+" "+o)})),W=Array.isArray,z=e=>{const t=[],{variables:o,dimension:s,source:n}=e;return((e,t)=>e&&"Eurostat"===t)(s,n)?_(s):W(o)?(i=o[0])&&i.id&&i.text&&!W(i.valueTexts)&&W(i.values)?U(o):N(o):{dims:t,timeId:undefined,mapFrequency:"Y"};var i},G=e=>V(e).then(z),J=e=>"M"===e?"2019M01":"S"===e?"2019S1":"Q"===e?"2019Q1":"2019",X=(e,t)=>{let{dfNonTime:o,mapFrequency:s,dfId:n}=e;const i=[t,o?"":"time="+J(s)].filter(Boolean).join("&");return"https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"+n+(i?"?"+i:"")},$={DF:e=>{let{proxy:t="",baseMeta:o,dfId:s}=e;return""+t+o+"/"+s},EU_STAT:X},ee=e=>e.dimUrl||(e=>($[e.loadId]||$.DF)(e))(e),te=(e,t,o)=>({id:e,caption:t,options:o}),oe=(e,t)=>{const o=t?((e,t)=>{const o=Object.create(null);return e.forEach((e=>{o[e.v]=e})),t.map((e=>{let{v:t,c:s}=e;return te(t,s,o[t].options)}))})(e,t):(e=>e.map((e=>{let{c:t,v:o,options:s}=e;return te(o,t,s)})))(e);return o.dateOptions=e.dateOptions,(e=>{e.forEach(((e,t)=>{const{options:o}=e;if(1===o.length){const t=o[0];e.placeholder=t.caption,e.dfItem=t,e.isRow=!1}}))})(o),o},se=(e,t)=>{const o=ee(t),s=t.dims;return e.start(o),G(o).then((e=>{let{dims:t,mapFrequency:o,timeId:n}=e;if(!(e=>{const t=e.length;let o=0;for(;o<t&&e[o].options;o++);return o===t})(t))throw{errMsg:"Loaded dims without options"};return{timeId:n,mapFrequency:o,configs:oe(t,s)}}))},ne=e=>(e.options||[]).length,ie=(e,t)=>{const{dfQ:o}=t,s=X(t,o[0]),n=X(t,o[1]);let i=[];return e.start(s),G(s).then((e=>{let{dims:t}=e;i=i.concat(t)})).then((()=>{return e=5e3,new Promise((t=>{setTimeout((()=>t()),e)}));var e})).then((()=>(e.stop(),e.start(n),G(n)))).then((e=>{let{dims:t,mapFrequency:o,timeId:s}=e;return i=(e=>{const t=Object.create(null);return e.forEach((e=>{const o=e.v,s=t[o];(!s||ne(s)<ne(e))&&(t[o]=e)})),Object.keys(t).map((e=>t[e]))})(i.concat(t)),{timeId:"time",mapFrequency:o,configs:oe(i)}}))},ae=Array.isArray,re=new F,ce=e=>{let{errMsg:t,message:o}=e;return{errMsg:t||o}},le=e=>{if(re.isLoading)return Promise.resolve({errMsg:"Another dialog are still loading"});{const t=(e=>{const{dfQ:t}=e;return ae(t)?2===t.length?ie:void 0:se})(e);return t?t(re,e).catch(ce).finally((()=>re.stop())):Promise.resolve({errMsg:"Incorrect dialog configuration"})}},ue=e=>{const t=(0,c.useRef)();return(0,c.useEffect)((()=>{t.current=e}),[e]),t.current},{crDateConfig:de}=r.Z,pe=(e,t)=>({caption:e,value:t}),he=(e,t)=>{let{dims:o,proxy:s,baseMeta:n,loadId:i,mapFrequency:a,dfProps:r}=e;le({dims:o,proxy:s,baseMeta:n,loadId:i,mapFrequency:a,...r}).then(t).catch((e=>{t({errMsg:e.message})}))},me=()=>({isLoading:!0,isLoadFailed:!1}),fe=e=>e.map((e=>e.options)),ge=e=>{const t=[];return e.forEach((e=>{(e.options||[]).length>1&&t.push(pe(e.caption,e.id))})),t},ye=e=>{const{chartsType:t,mapFrequency:o,mapDateDf:s,dfProps:n={}}=e,a=n.mapFrequency||o||"M",r=n.mapDateDf||s,[{isLoading:l,isLoadFailed:u},d]=(0,c.useState)(me),[p,h]=(0,c.useState)([]),[m,f]=(0,c.useState)((()=>({configs:[],selectOptions:[],mapFrequency:o,chartOptions:(0,i.kK)(e),dateOptions:[]}))),g=(0,c.useCallback)((e=>{let{configs:o,timeId:s,mapFrequency:n,errMsg:c}=e;if(o){const e=n||a,[c,l]=((e,t,o)=>{const{dateOptions:s}=e;if(s)return[s,s[0]];const{dateOptions:n,dateDefault:i}=de(t,o);return[n,pe(i,i)]})(o,e,r);d({isLoading:!1,isLoadFailed:!1}),f({timeId:s,configs:o,selectOptions:fe(o),mapFrequency:e,dimOptions:ge(o),chartOptions:(0,i.kK)({configs:o,chartsType:t,mapFrequency:e}),dateOptions:c,dateDf:l})}else d({isLoading:!1,isLoadFailed:!0}),h([c])}),[t,a,r]),y=((e,t)=>{const o=ue(e);return t&&!o.isShow&&e.isShow})(e,u);return(0,c.useEffect)((()=>{he(e,g)}),[]),(0,c.useEffect)((()=>{y&&(he(e,g),d(me))}),[y,e,g]),[m,l,u,p,h,f]},Se=e=>(0,c.useMemo)((()=>[(0,l.jsx)(r.Z.Button.Load,{onClick:e},"load")]),[e]),we=(e,t,o)=>{e((e=>e[t]!==o?(e[t]=o,{...e}):e))},ve=(e,t)=>e?"L":t?"F":void 0,Ce={height:50,width:"100%"},be=n.Z.wideWidth(),Ie=(e,t)=>e.dfC||(t||{}).value,Oe=(e,t)=>e.dfC||!t?"":t.caption||"",Te={StatN:(0,g.Z)((e=>{const{isShow:t,caption:o,msgOnNotSelected:n,toTopLayer:c,onAbout:u,loadFn:d,onLoad:p,onShow:m,onClose:g}=e,v=!e.dims&&!e.notDim,[b,I]=w(),T=(0,s.sO)(),[x,L]=(0,S.Z)(),[F,j]=(0,S.Z)(),[E,q,A,Z,P,_]=ye(e),{configs:R,selectOptions:U,chartType:B,chartOptions:Q,dimOptions:Y,dateOptions:H,dateDf:K={},timeId:N}=E,[V,W]=(0,y.Z)(be),[z,G,J]=D(),[X,$,ee,te,oe]=M(R),{isShowDate:se,isShowChart:ne}=ee,[ie,ae]=C(W,oe,J,u),re=(0,s.I4)((()=>{g(),P([])}),[]),ce=(0,s.I4)((()=>{const t=[];if(A)return t.push("Dims for request haven't been loaded.\nClose, open dialog for trying load again."),t;if(q)return t.push("Dims is loading"),t;const o=(0,i.vi)(B),{dim:a}=B||{},r=((e,t,o,s)=>n=>{o.forEach(((o,i)=>{const{caption:a}=o;n(a)&&!s[i]&&e.push(t(a))}))})(t,n,R,(0,s.eA)(b));if(!v||!o){const s=e.notDim?k:a;return r((e=>!(o&&e===s))),t}if(o){const e=j();if(!e)return t.push("Dim isn't selected"),t;r((t=>t!==e.caption))}return t}),[A,q,R,B,n]),le=(0,s.I4)((e=>{const t=!!(0,i.vi)(e)&&(x(),!0);we(te,"isShowDate",t),we(_,"chartType",e)}),[]),ue=(0,s.I4)((()=>{((e,t)=>{e.forEach(((e,o)=>{const{dfItem:s}=e;s&&t(o)(s)}))})(R,I);const t=ce();if(0===t.length){const t=j();p(d({...e},{...(0,s.d9)(T),chartType:B,timeId:N,selectOptions:U,dfC:Ie(e,t),dfTitle:Oe(e,t),time:(L()||K).value,dialogOptions:(0,s.eA)(G),items:(0,s.eA)(b),titles:(0,s.eA)($)}))}P(t)}),[ce,K,N,B,R,U]),de=Se(ue),pe=O(ae,u),he=ve(q,A);return(0,l.jsxs)(r.Z.DraggableDialog,{isShow:t,caption:o,menuModel:pe,commandButtons:de,toTopLayer:c,onShow:m,onClose:re,children:[ie,z,X,(0,l.jsx)(h,{status:he}),he?(0,l.jsx)("div",{style:Ce}):(0,l.jsx)(a.Z,{items:R,crItem:f,isShowLabels:V,isRow:ee,fSelect:I}),(0,l.jsx)(r.Z.RowChartDate,{refSeriaColor:T,chartType:B,isShowLabels:V,isShowChart:ne,chartOptions:Q,onSelectChart:le,isShowDate:se,dateDefault:K.caption,dateOptions:H,onSelecDate:x,isDim:v,dimOptions:Y,onSelecDim:F}),(0,l.jsx)(r.Z.ValidationMessages,{validationMessages:Z})]})}))}}}]);