(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[138],{6196:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>Ie});var s=o(9679),n=o(9468),i=o(4706),a=o(8804),r=o(4827);var c=o(5893);const l={position:"absolute",top:80,left:"45%",zIndex:10,display:"block",width:32,height:32,opacity:1,transition:"opacity 800ms ease-out"},u={borderColor:"#f44336",animation:"none"},d={opacity:0},p=({style:e,status:t})=>{const o=(e=>{const[t,o]=(0,s.useState)(!1);return(0,s.useEffect)((()=>{e||setTimeout((()=>o(!0)),1e3)}),[e]),t})(t),n="L"===t?l:"F"===t?u:d;return o?null:(0,c.jsx)("span",{style:{...l,...e,...n},"data-loader":"circle"})},h=e=>"is"+e+"Select",m=(e,t,{isShowLabels:o,isRow:s,fSelect:n})=>{const{id:i,caption:a,options:l,placeholder:u}=e,d=!s[h(i)];return(0,c.jsx)(r.Z.ShowHide,{isShow:d,children:(0,c.jsx)(r.Z.RowInputSelect,{isShowLabels:o,caption:a,placeholder:u,options:l,onSelect:n(t)})},i)};var f=o(1926),g=o(7753);const C=()=>{const e=(0,s.useRef)([]),t=(0,s.useCallback)((t=>o=>{e.current[t]=o?{...o}:void 0}),[]);return[e,t]},w=(e,t,o)=>({caption:e,title:t,onClick:o}),S=(e,t,o,n)=>{const[i,a]=(0,f.Z)(!0),l=(0,s.useMemo)((()=>[w("L","Click to toggle input labels",e),w("T","Toggle Inputs",t),w("O","Chart Options",o),w("A","About Datasource",n)]),[]);return[(0,s.useMemo)((()=>(0,c.jsx)(r.Z.Toolbar,{isShow:i,buttons:l})),[i]),a]},y="row__pane-topic not-selected",b=(e,t,o=!0)=>({cn:y,onClick:t,name:e,isClose:o}),v=(e,t)=>(0,s.useMemo)((()=>({titleCl:y,pageWidth:175,maxPages:1,p0:[b("Toggle ToolBar",e),b("About Datasource",t)]})),[]),O=e=>{const[t,o]=(0,s.useState)(e);return[t,(0,s.useCallback)((()=>o((e=>!e))),[]),(0,s.useCallback)((()=>o(!1)),[])]},I=()=>{const e=(0,s.useRef)({}),[t,o,n]=O(!1),i=(0,s.useCallback)((t=>{e.current[t]=!e.current[t]}),[]);return[(0,s.useMemo)((()=>(0,c.jsx)(r.Z.ModalOptions,{isShow:t,toggleOption:i,onClose:n})),[t]),e,o]},T=e=>{const[t,o]=(0,s.useState)({isShowChart:!0,isShowDate:!1}),n=(0,s.useCallback)((e=>{o((t=>(t[e]=!t[e],{...t})))}),[]);return(0,s.useEffect)((()=>{const t={};let s=!1;e.forEach((e=>{e.dfItem&&(s=!0,t[h(e.id)]=!0)})),o((e=>s?{...e,...t}:e))}),[e]),[t,o,n]},D=(e=[])=>{const t=(0,s.useRef)(e),o=(0,s.useCallback)((e=>{t.current.push(e)}),[]),n=(0,s.useCallback)((e=>{t.current=t.current.filter((t=>t!==e))}),[]);return[t,o,n]},x=e=>{const[t,o,n]=O(!1),[i,a,l]=T(e),{isShowChart:u,isShowDate:d}=i,[p,m,f]=D();return[(0,s.useMemo)((()=>(0,c.jsx)(r.Z.ModalToggle,{isShow:t,selectProps:e,isShowChart:u,isShowDate:d,crIsId:h,onToggle:l,onCheckCaption:m,onUnCheckCaption:f,onClose:n})),[t,e,u,d]),p,i,a,o]};const k=class{constructor(e=5e3){this.mls=e,this.isLoading=!1}start(e){return!this.isLoading&&(this.loadingUrl=e,this.isLoading=!0,this.timeoutId=setTimeout((()=>{e===this.loadingUrl&&(this.isLoading=!1)}),this.mls),!0)}stop(){this.isLoading=!1,clearTimeout(this.timeoutId)}},F="time",M="Geo Entity",L=(e,t,o)=>({caption:e,slice:{[t]:o}}),j=e=>e?e.charAt(0).toUpperCase()+e.substring(1):"",E=Object.keys,Z=e=>(e||"").split("_").map(j).join(" "),q=(e,t)=>{const{label:o}=e||{};return E(o||{}).map((e=>({caption:o[e],value:e,id:t})))},A=e=>{const t=[null],o=[];return E(e).forEach((s=>{if(s!==F){const n=e[s],{label:i,category:a}=n||{},r={c:Z(i),v:s,options:q(a,s)};"s_adj"===s?(r.c="Seasonal Adjustment",r.options=(e=>e.options.map((e=>(e.sc=e.value,e.caption=e.caption+" ("+e.value+")",e))))(r),o.push(r)):"geo"===s?(r.c=M,t[0]=r):t.push(r)}})),{dims:t.filter(Boolean).concat(o),timeId:F}},P=({values:e,id:t})=>(e||[]).map((e=>L(e.text,t,e.id))),R=e=>{const t=[];let o;return e.forEach((e=>{const{time:s,text:n="",id:i}=e;s?(o=i,t.dateOptions=e.values.map((({id:e,text:t})=>({caption:t,value:e}))).reverse()):t.push({c:j(n),v:i,options:P(e)})})),{mapFrequency:"Y",dims:t,timeId:o}},_=Array.isArray,U={month:"M",quarter:"K"},B=["Tid","Year","Month","Vuosi","Vuosineljännes"],Q=(e,t)=>!_(e)||!_(t)||e.length!==t.length,W=({values:e,valueTexts:t,code:o})=>{if(!Q(e,t))return t.map(((t,s)=>L(t,o,e[s])))},Y=e=>{const t=[];let o,s="Y";return e.forEach((e=>{const{code:n,time:i}=e,a=e.text||"";((e,t)=>!e&&-1===B.indexOf(t)&&-1===(t+"").indexOf("TLIST("))(i,n)?t.push({c:j(a),v:n,options:W(e)}):(o=n,s=U[a.toLowerCase()],t.dateOptions=(({values:e,valueTexts:t})=>{if(Q(e,t))return;const o=[];return t.forEach(((t,s)=>{o.push({caption:t,value:e[s]})})),o.reverse()})(e))})),{mapFrequency:s,dims:t,timeId:o}},H=(e,t)=>fetch(e,t).then((e=>{const{status:t,statusText:o}=e;if(t>=200&&t<400)return e.json();if(403===t)throw Error("HTTP Code 403: Forbitten.\nMaybe, require API key.");throw Error("HTTP Code: "+t+" "+o)})),N=Array.isArray,V=e=>{const t=[],{variables:o,dimension:s,source:n}=e;return((e,t)=>e&&"Eurostat"===t)(s,n)?A(s):N(o)?(i=o[0])&&i.id&&i.text&&!N(i.valueTexts)&&N(i.values)?R(o):Y(o):{dims:t,timeId:undefined,mapFrequency:"Y"};var i},z=e=>H(e).then(V),G=e=>"M"===e?"2019M01":"S"===e?"2019S1":"Q"===e?"2019Q1":"2019",K=({dfNonTime:e,mapFrequency:t,dfId:o},s)=>{const n=[s,e?"":"time="+G(t)].filter(Boolean).join("&");return"https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"+o+(n?"?"+n:"")},J={DF:({proxy:e="",baseMeta:t,dfId:o})=>""+e+t+"/"+o,EU_STAT:K},X=e=>e.dimUrl||(e=>(J[e.loadId]||J.DF)(e))(e),$=(e,t,o)=>({id:e,caption:t,options:o}),ee=(e,t)=>{const o=t?((e,t)=>{const o=Object.create(null);return e.forEach((e=>{o[e.v]=e})),t.map((({v:e,c:t})=>$(e,t,o[e].options)))})(e,t):(e=>e.map((({c:e,v:t,options:o})=>$(t,e,o))))(e);return o.dateOptions=e.dateOptions,(e=>{e.forEach(((e,t)=>{const{options:o}=e;if(1===o.length){const t=o[0];e.placeholder=t.caption,e.dfItem=t,e.isRow=!1}}))})(o),o},te=(e,t)=>{const o=X(t),s=t.dims;return e.start(o),z(o).then((({dims:e,mapFrequency:t,timeId:o})=>{if(!(e=>{const t=e.length;let o=0;for(;o<t&&e[o].options;o++);return o===t})(e))throw{errMsg:"Loaded dims without options"};return{timeId:o,mapFrequency:t,configs:ee(e,s)}}))},oe=e=>(e.options||[]).length,se=(e,t)=>{const{dfQ:o}=t,s=K(t,o[0]),n=K(t,o[1]);let i=[];return e.start(s),z(s).then((({dims:e})=>{i=i.concat(e)})).then((()=>{return e=5e3,new Promise((t=>{setTimeout((()=>t()),e)}));var e})).then((()=>(e.stop(),e.start(n),z(n)))).then((({dims:e,mapFrequency:t,timeId:o})=>(i=(e=>{const t=Object.create(null);return e.forEach((e=>{const o=e.v,s=t[o];(!s||oe(s)<oe(e))&&(t[o]=e)})),Object.keys(t).map((e=>t[e]))})(i.concat(e)),{timeId:"time",mapFrequency:t,configs:ee(i)})))},ne=Array.isArray,ie=new k,ae=({errMsg:e,message:t})=>({errMsg:e||t}),re=e=>{if(ie.isLoading)return Promise.resolve({errMsg:"Another dialog are still loading"});{const t=(e=>{const{dfQ:t}=e;return ne(t)?2===t.length?se:void 0:te})(e);return t?t(ie,e).catch(ae).finally((()=>ie.stop())):Promise.resolve({errMsg:"Incorrect dialog configuration"})}},ce=e=>{const t=(0,s.useRef)();return(0,s.useEffect)((()=>{t.current=e}),[e]),t.current},{crOptions:le}=i.Z,{crDateConfig:ue}=r.Z,de=(e,t)=>({caption:e,value:t}),pe=({dims:e,proxy:t,baseMeta:o,loadId:s,mapFrequency:n,dfProps:i},a)=>{re({dims:e,proxy:t,baseMeta:o,loadId:s,mapFrequency:n,...i}).then(a).catch((e=>{a({errMsg:e.message})}))},he=()=>({isLoading:!0,isLoadFailed:!1}),me=e=>e.map((e=>e.options)),fe=e=>{const t=[];return e.forEach((e=>{(e.options||[]).length>1&&t.push(de(e.caption,e.id))})),t},ge=e=>{const{chartsType:t,mapFrequency:o,mapDateDf:n,dfProps:i={}}=e,a=i.mapFrequency||o||"M",r=i.mapDateDf||n,[{isLoading:c,isLoadFailed:l},u]=(0,s.useState)(he),[d,p]=(0,s.useState)([]),[h,m]=(0,s.useState)((()=>({configs:[],selectOptions:[],mapFrequency:o,chartOptions:le(e),dateOptions:[]}))),f=(0,s.useCallback)((({configs:e,timeId:o,mapFrequency:s,errMsg:n})=>{if(e){const n=s||a,[i,c]=((e,t,o)=>{const{dateOptions:s}=e;if(s)return[s,s[0]];const{dateOptions:n,dateDefault:i}=ue(t,o);return[n,de(i,i)]})(e,n,r);u({isLoading:!1,isLoadFailed:!1}),m({timeId:o,configs:e,selectOptions:me(e),mapFrequency:n,dimOptions:fe(e),chartOptions:le({configs:e,chartsType:t}),dateOptions:i,dateDf:c})}else u({isLoading:!1,isLoadFailed:!0}),p([n])}),[t,a,r]),g=((e,t)=>{const o=ce(e);return t&&!o.isShow&&e.isShow})(e,l);return(0,s.useEffect)((()=>{pe(e,f)}),[]),(0,s.useEffect)((()=>{g&&(pe(e,f),u(he))}),[g,e,f]),[h,c,l,d,p,m]},Ce=e=>(0,s.useMemo)((()=>[(0,c.jsx)(r.Z.Button.Load,{onClick:e},"load")]),[e]),we=(e,t,o)=>{e((e=>e[t]!==o?(e[t]=o,{...e}):e))},Se=(e,t)=>e?"L":t?"F":void 0,ye={height:50,width:"100%"},{isCategory:be}=i.Z,ve=n.Z.wideWidth(),Oe=(e,t)=>e.isShow===t.isShow,Ie={StatN:(0,s.memo)((e=>{const{isShow:t,caption:o,onShow:n,onFront:i,loadFn:l,onLoad:u,msgOnNotSelected:d,onClickInfo:h,onClose:w}=e,y=!e.dims&&!e.notDim,[b,O]=C(),[T,D]=(0,g.Z)(),[k,F]=(0,g.Z)(),[L,j]=(0,g.Z)(),[E,Z,q,A,P,R]=ge(e),{configs:_,selectOptions:U,chartType:B,chartOptions:Q,dimOptions:W,dateOptions:Y,dateDf:H={},timeId:N}=E,[V,z]=(0,f.Z)(ve),[G,K,J]=I(),[X,$,ee,te,oe]=x(_),{isShowDate:se,isShowChart:ne}=ee,[ie,ae]=S(z,oe,J,h),re=(0,s.useCallback)((()=>{w(),P([])}),[]),ce=(0,s.useCallback)((()=>{const t=[];if(q)return t.push("Dims for request haven't been loaded.\nClose, open dialog for trying load again."),t;if(Z)return t.push("Dims is loading"),t;const o=be(B),{dim:s}=B||{},n=((e,t,o,s)=>n=>{o.forEach(((o,i)=>{const{caption:a}=o;n(a)&&!s[i]&&e.push(t(a))}))})(t,d,_,b.current);if(!y||!o){const i=e.notDim?M:s;return n((e=>!(o&&e===i))),t}if(o){const e=L.current;if(!e)return t.push("Dim isn't selected"),t;n((t=>t!==e.caption))}return t}),[q,Z,_,B,d]),le=(0,s.useCallback)((e=>{const t=!!be(e)&&(k.current=null,!0);we(te,"isShowDate",t),we(R,"chartType",e)}),[]),ue=(0,s.useCallback)((()=>{((e,t)=>{e.forEach(((e,o)=>{const{dfItem:s}=e;s&&t(o)(s)}))})(_,O);const t=ce();if(0===t.length){const{seriaColor:t,seriaWidth:o}=T.current?T.current.getConf():{},s=((e,t)=>e.dfC||(t||{}).value)(e,L.current),n=((e,t)=>e.dfC||!t?"":t.caption||"")(e,L.current),i=l({...e},{timeId:N,dfC:s,dfTitle:n,time:(k.current||H).value,dialogOptions:K.current,chartType:B,seriaColor:t,seriaWidth:o,items:b.current,titles:$.current,selectOptions:U});u(i)}P(t)}),[ce,H,N,B,_,U]),de=Ce(ue),pe=v(ae,h),he=Se(Z,q);return(0,c.jsxs)(r.Z.DraggableDialog,{isShow:t,caption:o,menuModel:pe,commandButtons:de,onShowChart:n,onFront:i,onClose:re,children:[ie,G,X,(0,c.jsx)(p,{status:he}),he?(0,c.jsx)("div",{style:ye}):(0,c.jsx)(a.Z,{items:_,crItem:m,isShowLabels:V,isRow:ee,fSelect:O}),(0,c.jsx)(r.Z.RowChartDate,{chartType:B,isShowLabels:V,isShowChart:ne,chartOptions:Q,onSelectChart:le,onRegColor:D,isShowDate:se,dateDefault:H.caption,dateOptions:Y,onSelecDate:F,isDim:y,dimOptions:W,onSelecDim:j}),(0,c.jsx)(r.Z.ValidationMessages,{validationMessages:A})]})}),Oe)}}}]);