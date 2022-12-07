"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[138],{4853:(t,e,o)=>{o.r(e),o.d(e,{default:()=>bt});var s=o(9999),n=o(9468),i=o(9620),a=o(8804),r=o(8910),c=o(9679);var l=o(5893);const d={position:"absolute",top:80,left:"45%",zIndex:10,display:"block",width:32,height:32,opacity:1,transition:"opacity 800ms ease-out"},u={borderColor:"#f44336",animation:"none"},p={opacity:0},h=t=>{let{style:e,status:o}=t;const s=(t=>{const[e,o]=(0,c.useState)(!1);return(0,c.useEffect)((()=>{t||setTimeout((()=>o(!0)),1e3)}),[t]),e})(o),n="L"===o?d:"F"===o?u:p;return s?null:(0,l.jsx)("span",{style:{...d,...e,...n},"data-loader":"circle"})},m=t=>"is"+t+"Select",f=(t,e,o)=>{let{isShowLabels:s,isRow:n,fSelect:i}=o;const{id:a,caption:c,options:d,placeholder:u}=t,p=!n[m(a)];return(0,l.jsx)(r.Z.ShowHide,{isShow:p,children:(0,l.jsx)(r.Z.RowInputSelect,{isShowLabels:s,caption:c,placeholder:u,options:d,onSelect:i(e)})},a)};var g=o(6016),y=o(1926),S=o(5868),w=o(6490),v=o(9643),b=o(8463);const I=()=>{const t=(0,c.useRef)([]),e=(0,c.useCallback)((e=>o=>{t.current[e]=o?{...o}:void 0}),[]);return[t,e]};var C=o(1821);const O=t=>{const[e,o]=(0,c.useState)({isShowChart:!0,isShowDate:!1}),s=(0,c.useCallback)((t=>{o((e=>(e[t]=!e[t],{...e})))}),[]);return(0,c.useEffect)((()=>{const e={};let s=!1;t.forEach((t=>{t.dfItem&&(s=!0,e[m(t.id)]=!0)})),o((t=>s?{...t,...e}:t))}),[t]),[e,o,s]},T=t=>{const[e,o]=(0,c.useState)(t);return[e,(0,c.useCallback)((()=>o((t=>!t))),[]),(0,c.useCallback)((()=>o(!1)),[])]},D=t=>{const[e,o,s]=T(!1),[n,i,a]=O(t),{isShowChart:d,isShowDate:u}=n,[p,h,f]=(0,C.Z)();return[(0,c.useMemo)((()=>(0,l.jsx)(r.Z.ModalToggle,{isShow:e,selectProps:t,isShowChart:d,isShowDate:u,crIsId:m,onToggle:a,onCheckCaption:h,onUnCheckCaption:f,onClose:s})),[e,t,d,u]),p,n,i,o]};const L=class{constructor(t){void 0===t&&(t=5e3),this.mls=t,this.isLoading=!1}start(t){return!this.isLoading&&(this.loadingUrl=t,this.isLoading=!0,this.timeoutId=setTimeout((()=>{t===this.loadingUrl&&(this.isLoading=!1)}),this.mls),!0)}stop(){this.isLoading=!1,clearTimeout(this.timeoutId)}},x="time",F="Geo Entity",j=(t,e,o)=>({caption:t,slice:{[e]:o}}),M=t=>t?t.charAt(0).toUpperCase()+t.substring(1):"",E=Object.keys,q=t=>(t||"").split("_").map(M).join(" "),Z=(t,e)=>{const{label:o}=t||{};return E(o||{}).map((t=>({caption:o[t],value:t,id:e})))},k=t=>{const e=[null],o=[];return E(t).forEach((s=>{if(s!==x){const n=t[s],{label:i,category:a}=n||{},r={c:q(i),v:s,options:Z(a,s)};"s_adj"===s?(r.c="Seasonal Adjustment",r.options=(t=>t.options.map((t=>(t.sc=t.value,t.caption=t.caption+" ("+t.value+")",t))))(r),o.push(r)):"geo"===s?(r.c=F,e[0]=r):e.push(r)}})),{dims:e.filter(Boolean).concat(o),timeId:x}},A=t=>{let{values:e,id:o}=t;return(e||[]).map((t=>j(t.text,o,t.id)))},P=t=>{const e=[];let o;return t.forEach((t=>{const{time:s,text:n="",id:i}=t;s?(o=i,e.dateOptions=t.values.map((t=>{let{id:e,text:o}=t;return{caption:o,value:e}})).reverse()):e.push({c:M(n),v:i,options:A(t)})})),{mapFrequency:"Y",dims:e,timeId:o}},R=Array.isArray,_={month:"M",quarter:"K"},U=["Tid","Year","Month","Vuosi","Vuosineljännes"],Q=(t,e)=>!R(t)||!R(e)||t.length!==e.length,Y=t=>{let{values:e,valueTexts:o,code:s}=t;if(!Q(e,o))return o.map(((t,o)=>j(t,s,e[o])))},H=t=>{const e=[];let o,s="Y";return t.forEach((t=>{const{code:n,time:i}=t,a=t.text||"";((t,e)=>!t&&-1===U.indexOf(e)&&-1===(e+"").indexOf("TLIST("))(i,n)?e.push({c:M(a),v:n,options:Y(t)}):(o=n,s=_[a.toLowerCase()],e.dateOptions=(t=>{let{values:e,valueTexts:o}=t;if(Q(e,o))return;const s=[];return o.forEach(((t,o)=>{s.push({caption:t,value:e[o]})})),s.reverse()})(t))})),{mapFrequency:s,dims:e,timeId:o}},K=(t,e)=>fetch(t,e).then((t=>{const{status:e,statusText:o}=t;if(e>=200&&e<400)return t.json();if(403===e)throw Error("HTTP Code 403: Forbitten.\nMaybe, require API key.");throw Error("HTTP Code: "+e+" "+o)})),N=Array.isArray,V=t=>{const e=[],{variables:o,dimension:s,source:n}=t;return((t,e)=>t&&"Eurostat"===e)(s,n)?k(s):N(o)?(i=o[0])&&i.id&&i.text&&!N(i.valueTexts)&&N(i.values)?P(o):H(o):{dims:e,timeId:undefined,mapFrequency:"Y"};var i},B=t=>K(t).then(V),z=t=>"M"===t?"2019M01":"S"===t?"2019S1":"Q"===t?"2019Q1":"2019",G=(t,e)=>{let{dfNonTime:o,mapFrequency:s,dfId:n}=t;const i=[e,o?"":"time="+z(s)].filter(Boolean).join("&");return"https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"+n+(i?"?"+i:"")},W={DF:t=>{let{proxy:e="",baseMeta:o,dfId:s}=t;return""+e+o+"/"+s},EU_STAT:G},J=t=>t.dimUrl||(t=>(W[t.loadId]||W.DF)(t))(t),X=(t,e,o)=>({id:t,caption:e,options:o}),$=(t,e)=>{const o=e?((t,e)=>{const o=Object.create(null);return t.forEach((t=>{o[t.v]=t})),e.map((t=>{let{v:e,c:s}=t;return X(e,s,o[e].options)}))})(t,e):(t=>t.map((t=>{let{c:e,v:o,options:s}=t;return X(o,e,s)})))(t);return o.dateOptions=t.dateOptions,(t=>{t.forEach(((t,e)=>{const{options:o}=t;if(1===o.length){const e=o[0];t.placeholder=e.caption,t.dfItem=e,t.isRow=!1}}))})(o),o},tt=(t,e)=>{const o=J(e),s=e.dims;return t.start(o),B(o).then((t=>{let{dims:e,mapFrequency:o,timeId:n}=t;if(!(t=>{const e=t.length;let o=0;for(;o<e&&t[o].options;o++);return o===e})(e))throw{errMsg:"Loaded dims without options"};return{timeId:n,mapFrequency:o,configs:$(e,s)}}))},et=t=>(t.options||[]).length,ot=(t,e)=>{const{dfQ:o}=e,s=G(e,o[0]),n=G(e,o[1]);let i=[];return t.start(s),B(s).then((t=>{let{dims:e}=t;i=i.concat(e)})).then((()=>{return t=5e3,new Promise((e=>{setTimeout((()=>e()),t)}));var t})).then((()=>(t.stop(),t.start(n),B(n)))).then((t=>{let{dims:e,mapFrequency:o,timeId:s}=t;return i=(t=>{const e=Object.create(null);return t.forEach((t=>{const o=t.v,s=e[o];(!s||et(s)<et(t))&&(e[o]=t)})),Object.keys(e).map((t=>e[t]))})(i.concat(e)),{timeId:"time",mapFrequency:o,configs:$(i)}}))},st=Array.isArray,nt=new L,it=t=>{let{errMsg:e,message:o}=t;return{errMsg:e||o}},at=t=>{if(nt.isLoading)return Promise.resolve({errMsg:"Another dialog are still loading"});{const e=(t=>{const{dfQ:e}=t;return st(e)?2===e.length?ot:void 0:tt})(t);return e?e(nt,t).catch(it).finally((()=>nt.stop())):Promise.resolve({errMsg:"Incorrect dialog configuration"})}},rt=t=>{const e=(0,c.useRef)();return(0,c.useEffect)((()=>{e.current=t}),[t]),e.current},{crDateConfig:ct}=r.Z,lt=(t,e)=>({caption:t,value:e}),dt=(t,e)=>{let{dims:o,proxy:s,baseMeta:n,loadId:i,mapFrequency:a,dfProps:r}=t;at({dims:o,proxy:s,baseMeta:n,loadId:i,mapFrequency:a,...r}).then(e).catch((t=>{e({errMsg:t.message})}))},ut=()=>({isLoading:!0,isLoadFailed:!1}),pt=t=>t.map((t=>t.options)),ht=t=>{const e=[];return t.forEach((t=>{(t.options||[]).length>1&&e.push(lt(t.caption,t.id))})),e},mt=t=>{const{chartsType:e,mapFrequency:o,mapDateDf:s,dfProps:n={}}=t,a=n.mapFrequency||o||"M",r=n.mapDateDf||s,[{isLoading:l,isLoadFailed:d},u]=(0,c.useState)(ut),[p,h]=(0,c.useState)([]),[m,f]=(0,c.useState)((()=>({configs:[],selectOptions:[],mapFrequency:o,chartOptions:(0,i.kK)(t),dateOptions:[]}))),g=(0,c.useCallback)((t=>{let{configs:o,timeId:s,mapFrequency:n,errMsg:c}=t;if(o){const t=n||a,[c,l]=((t,e,o)=>{const{dateOptions:s}=t;if(s)return[s,s[0]];const{dateOptions:n,dateDefault:i}=ct(e,o);return[n,lt(i,i)]})(o,t,r);u({isLoading:!1,isLoadFailed:!1}),f({timeId:s,configs:o,selectOptions:pt(o),mapFrequency:t,dimOptions:ht(o),chartOptions:(0,i.kK)({configs:o,chartsType:e,mapFrequency:t}),dateOptions:c,dateDf:l})}else u({isLoading:!1,isLoadFailed:!0}),h([c])}),[e,a,r]),y=((t,e)=>{const o=rt(t);return e&&!o.isShow&&t.isShow})(t,d);return(0,c.useEffect)((()=>{dt(t,g)}),[]),(0,c.useEffect)((()=>{y&&(dt(t,g),u(ut))}),[y,t,g]),[m,l,d,p,h,f]},ft=(t,e,o)=>{t((t=>t[e]!==o?(t[e]=o,{...t}):t))},gt=(t,e)=>t?"L":e?"F":void 0,yt={height:50,width:"100%"},St=n.Z.wideWidth(),wt=(t,e)=>t.dfC||(e||{}).value,vt=(t,e)=>t.dfC||!e?"":e.caption||"",bt={StatN:(0,g.Z)((t=>{const{isShow:e,caption:o,msgOnNotSelected:n,toTopLayer:c,onAbout:d,loadFn:u,onLoad:p,onShow:m,onClose:g}=t,C=!t.dims&&!t.notDim,[O,T]=I(),L=(0,s.sO)(),[x,j]=(0,S.Z)(),[M,E]=(0,S.Z)(),[q,Z,k,A,P,R]=mt(t),{configs:_,selectOptions:U,chartType:Q,chartOptions:Y,dimOptions:H,dateOptions:K,dateDf:N={},timeId:V}=q,[B,z]=(0,y.Z)(St),[G,W,J,X,$]=D(_),{isShowDate:tt,isShowChart:et}=J,[ot,st]=(0,w.Z)(d),[nt,it,at,rt,ct]=(0,b.Z)(),lt=(0,v.Z)({toggleLabels:z,toggleInputs:$,toggleOptions:at,onAbout:d}),dt=(0,s.I4)((()=>{g(),P([])}),[]),ut=(0,s.I4)((()=>{const e=[];if(k)return e.push("Dims for request haven't been loaded.\nClose, open dialog for trying load again."),e;if(Z)return e.push("Dims is loading"),e;const o=(0,i.vi)(Q),{dim:a}=Q||{},r=((t,e,o,s)=>n=>{o.forEach(((o,i)=>{const{caption:a}=o;n(a)&&!s[i]&&t.push(e(a))}))})(e,n,_,(0,s.eA)(O));if(!C||!o){const s=t.notDim?F:a;return r((t=>!(o&&t===s))),e}if(o){const t=E();if(!t)return e.push("Dim isn't selected"),e;r((e=>e!==t.caption))}return e}),[k,Z,_,Q,n]),pt=(0,s.I4)((t=>{const e=!!(0,i.vi)(t)&&(x(),!0);ft(X,"isShowDate",e),ft(R,"chartType",t)}),[]),ht=(0,s.I4)((()=>{((t,e)=>{t.forEach(((t,o)=>{const{dfItem:s}=t;s&&e(o)(s)}))})(_,T);const e=ut();if(0===e.length){const e=E();p(u({...t},{...(0,s.d9)(L),chartType:Q,timeId:V,selectOptions:U,dfC:wt(t,e),dfTitle:vt(t,e),time:(j()||N).value,dialogOptions:(0,s.eA)(nt),items:(0,s.eA)(O),titles:(0,s.eA)(W)}))}P(e)}),[ut,N,V,Q,_,U]),bt=gt(Z,k);return(0,l.jsxs)(r.Z.DraggableDialog,{isShow:e,caption:o,menuModel:st,toTopLayer:c,onLoad:ht,onShow:m,onClose:dt,children:[(0,l.jsx)(r.Z.Toolbar,{isShow:ot,buttons:lt}),(0,l.jsx)(r.Z.ModalOptions,{isShow:it,toggleOption:ct,onClose:rt}),G,(0,l.jsx)(h,{status:bt}),bt?(0,l.jsx)("div",{style:yt}):(0,l.jsx)(a.Z,{items:_,crItem:f,isShowLabels:B,isRow:J,fSelect:T}),(0,l.jsx)(r.Z.RowChartDate,{refSeriaColor:L,chartType:Q,isShowLabels:B,isShowChart:et,chartOptions:Y,onSelectChart:pt,isShowDate:tt,dateDefault:N.caption,dateOptions:K,onSelecDate:x,isDim:C,dimOptions:H,onSelecDim:M}),(0,l.jsx)(r.Z.ValidationMessages,{validationMessages:A})]})}))}}}]);